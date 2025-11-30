import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { existsSync } from 'fs';

// Define the schema for the incoming webhook data
const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  // Optional fields with defaults or fallbacks
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  author: z.string().optional().default('Mypen Team'),
  featured_image: z.preprocess(
    (val) => (val === '' || val === null || val === undefined ? null : val),
    z.string().url().nullable().optional()
  ),
  published: z.boolean().optional().default(true),
  
  // Georgian fields (optional, will fallback to English if not provided)
  title_ka: z.string().optional(),
  content_ka: z.string().optional(),
  excerpt_ka: z.string().optional(),
});

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
}

async function uploadAndHostImage(imageUrl: string): Promise<string | null> {
  try {
    // Download image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MypenBot/1.0)',
      },
    });

    if (!response.ok) {
      console.error(`Failed to download image ${imageUrl}: ${response.status}`);
      return null;
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    if (!contentType.startsWith('image/')) {
      console.error(`URL does not point to an image: ${imageUrl}`);
      return null;
    }

    // Ensure directories exist
    const BLOG_IMAGE_DIR = join(process.cwd(), 'public', 'images', 'blog', 'content');
    const OPTIMIZED_DIR = join(process.cwd(), 'public', 'images', 'blog', 'optimized');
    
    if (!existsSync(BLOG_IMAGE_DIR)) {
      await mkdir(BLOG_IMAGE_DIR, { recursive: true });
    }
    if (!existsSync(OPTIMIZED_DIR)) {
      await mkdir(OPTIMIZED_DIR, { recursive: true });
    }

    // Generate filename
    const timestamp = Date.now();
    const urlObj = new URL(imageUrl);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || 'image';
    const cleanName = filename.split('?')[0].replace(/[^a-zA-Z0-9.-]/g, '-');
    const ext = cleanName.includes('.') ? cleanName.split('.').pop()?.toLowerCase() : 'jpg';
    const baseName = `${timestamp}-${cleanName.replace(/\.[^/.]+$/, '')}`;
    const finalFilename = `${baseName}.${ext}`;

    // Save original
    const originalPath = join(BLOG_IMAGE_DIR, finalFilename);
    await writeFile(originalPath, imageBuffer);

    // Optimize with Sharp
    try {
      const image = sharp(imageBuffer);
      const metadata = await image.metadata();
      const width = metadata.width || 1200;
      const height = metadata.height || 800;

      // Create WebP versions
      const variants = [
        { suffix: '', width: width, height: height },
        { suffix: '-thumb', width: 400, height: 225 },
        { suffix: '-medium', width: 800, height: null },
        { suffix: '-large', width: 1200, height: null },
      ];

      for (const variant of variants) {
        let processed = image.clone().resize(variant.width, variant.height || undefined, {
          fit: 'inside',
          withoutEnlargement: true,
        });
        const webpPath = join(OPTIMIZED_DIR, `${baseName}${variant.suffix}.webp`);
        await processed.webp({ quality: 85 }).toFile(webpPath);
      }

      // Create JPEG fallback
      const jpegPath = join(OPTIMIZED_DIR, `${baseName}.jpg`);
      await image.clone().jpeg({ quality: 85 }).toFile(jpegPath);
    } catch (error) {
      console.error('Error optimizing image:', error);
    }

    return `/images/blog/optimized/${baseName}.webp`;
  } catch (error) {
    console.error(`Error uploading image ${imageUrl}:`, error);
    return null;
  }
}

async function replaceImageUrlsInHtml(html: string): Promise<string> {
  // Extract all image URLs from HTML
  const imageUrlRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const imageUrls = new Set<string>();
  let match;

  while ((match = imageUrlRegex.exec(html)) !== null) {
    const url = match[1];
    if (url && url.startsWith('http') && !url.includes('mypen.ge')) {
      imageUrls.add(url);
    }
  }

  // Upload and replace each image
  const urlMap = new Map<string, string>();
  
  for (const originalUrl of Array.from(imageUrls)) {
    const hostedUrl = await uploadAndHostImage(originalUrl);
    if (hostedUrl) {
      urlMap.set(originalUrl, hostedUrl);
    }
  }

  // Replace URLs in HTML
  let updatedHtml = html;
  for (const [originalUrl, hostedUrl] of urlMap.entries()) {
    const escapedUrl = originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    updatedHtml = updatedHtml.replace(new RegExp(escapedUrl, 'g'), hostedUrl);
  }

  return updatedHtml;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Security Check
    const authHeader = req.headers.get('x-n8n-webhook-secret');
    if (authHeader !== process.env.N8N_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse and Validate Body
    const body = await req.json();
    const validatedData = blogPostSchema.parse(body);

    // 3. Prepare Data - Generate unique slug with auto-numbering if exists
    let slug = validatedData.slug || generateSlug(validatedData.title);
    
    // Check if slug exists and append number if needed
    let slugExists = true;
    let attempt = 1;
    const originalSlug = slug;
    
    while (slugExists && attempt < 100) { // Max 100 attempts to prevent infinite loop
      const existingPost = await sql`
        SELECT id FROM posts WHERE slug = ${slug} LIMIT 1
      `;
      
      if (existingPost.length === 0) {
        slugExists = false;
      } else {
        attempt++;
        slug = `${originalSlug}-${attempt}`;
      }
    }
    
    // Bilingual Fallbacks
    const title_ka = validatedData.title_ka || validatedData.title;
    let content_ka = validatedData.content_ka || validatedData.content;
    let content = validatedData.content;
    const excerpt_ka = validatedData.excerpt_ka || validatedData.excerpt || '';
    const excerpt = validatedData.excerpt || '';
    
    // Replace external image URLs with hosted versions in both content and content_ka
    if (content && typeof content === 'string') {
      content = await replaceImageUrlsInHtml(content);
    }
    if (content_ka && typeof content_ka === 'string') {
      content_ka = await replaceImageUrlsInHtml(content_ka);
    }
    
    // Handle featured_image: upload if external URL, convert empty string to null
    let featuredImage = validatedData.featured_image;
    if (featuredImage === '' || featuredImage === null || featuredImage === undefined) {
      featuredImage = null;
    } else if (typeof featuredImage === 'string') {
      // If it's an external URL, upload and host it
      if (featuredImage.startsWith('http') && !featuredImage.includes('mypen.ge')) {
        const hostedUrl = await uploadAndHostImage(featuredImage);
        featuredImage = hostedUrl || null;
      } else {
        // Validate it's a proper URL or relative path
        try {
          if (featuredImage.startsWith('http')) {
            new URL(featuredImage);
          }
        } catch {
          featuredImage = null; // Invalid URL, set to null
        }
      }
    }

    // 4. Database Insertion
    // Using the same table structure as defined in schema.sql
    const result = await sql`
      INSERT INTO posts (
        title, title_ka, 
        slug, 
        content, content_ka, 
        excerpt, excerpt_ka, 
        author, 
        published, 
        featured_image,
        published_at
      )
      VALUES (
        ${validatedData.title}, ${title_ka},
        ${slug},
        ${content}, ${content_ka || content},
        ${excerpt}, ${excerpt_ka},
        ${validatedData.author},
        ${validatedData.published},
        ${featuredImage},
        NOW()
      )
      RETURNING id, slug
    `;

    // 5. Revalidate cache so new post appears immediately
    revalidatePath('/blog');
    revalidateTag('blog-posts');
    if (result[0]?.slug) {
      revalidatePath(`/blog/${result[0].slug}`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Post created successfully', 
      post: result[0] 
    });

  } catch (error) {
    console.error('Webhook Error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation Error', details: error.errors }, { status: 400 });
    }
    // Handle unique constraint violation for slug (shouldn't happen with auto-numbering, but keep as safety)
    if ((error as any).code === '23505') { // Postgres unique violation code
      // Try one more time with timestamp
      try {
        const timestampSlug = `${validatedData.slug || generateSlug(validatedData.title)}-${Date.now()}`;
        const retryResult = await sql`
          INSERT INTO posts (
            title, title_ka, slug, content, content_ka, 
            excerpt, excerpt_ka, author, published, 
            featured_image, published_at
          )
          VALUES (
            ${validatedData.title}, ${title_ka}, ${timestampSlug},
            ${content}, ${content_ka || content},
            ${excerpt}, ${excerpt_ka},
            ${validatedData.author}, ${validatedData.published},
            ${featuredImage}, NOW()
          )
          RETURNING id, slug
        `;
        
        revalidatePath('/blog');
        revalidateTag('blog-posts');
        if (retryResult[0]?.slug) {
          revalidatePath(`/blog/${retryResult[0].slug}`);
        }
        
        return NextResponse.json({ 
          success: true, 
          message: 'Post created successfully (slug auto-numbered)', 
          post: retryResult[0] 
        });
      } catch (retryError) {
        return NextResponse.json({ error: 'Slug conflict - please try again' }, { status: 409 });
      }
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
