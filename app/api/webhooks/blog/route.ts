import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { z } from 'zod';
import { revalidatePath, revalidateTag } from 'next/cache';

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

    // 3. Prepare Data
    const slug = validatedData.slug || generateSlug(validatedData.title);
    
    // Bilingual Fallbacks
    const title_ka = validatedData.title_ka || validatedData.title;
    const content_ka = validatedData.content_ka || validatedData.content;
    const excerpt_ka = validatedData.excerpt_ka || validatedData.excerpt || '';
    const excerpt = validatedData.excerpt || '';
    
    // Handle featured_image: convert empty string to null, validate URL
    let featuredImage = validatedData.featured_image;
    if (featuredImage === '' || featuredImage === null || featuredImage === undefined) {
      featuredImage = null;
    } else if (typeof featuredImage === 'string') {
      // Validate it's a proper URL
      try {
        new URL(featuredImage);
      } catch {
        featuredImage = null; // Invalid URL, set to null
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
        ${validatedData.content}, ${content_ka},
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
    // Handle unique constraint violation for slug
    if ((error as any).code === '23505') { // Postgres unique violation code
       return NextResponse.json({ error: 'Slug already exists. Please provide a unique slug or title.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
