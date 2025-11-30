import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { existsSync } from 'fs';

// Ensure directories exist
const BLOG_IMAGE_DIR = join(process.cwd(), 'public', 'images', 'blog', 'content');
const OPTIMIZED_DIR = join(process.cwd(), 'public', 'images', 'blog', 'optimized');

async function ensureDirectories() {
  if (!existsSync(BLOG_IMAGE_DIR)) {
    await mkdir(BLOG_IMAGE_DIR, { recursive: true });
  }
  if (!existsSync(OPTIMIZED_DIR)) {
    await mkdir(OPTIMIZED_DIR, { recursive: true });
  }
}

function generateFilename(url: string): string {
  // Extract filename from URL or generate one
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const filename = pathname.split('/').pop() || 'image';
    // Remove query params and clean filename
    const cleanName = filename.split('?')[0].replace(/[^a-zA-Z0-9.-]/g, '-');
    // Add timestamp to ensure uniqueness
    const timestamp = Date.now();
    const ext = cleanName.includes('.') ? cleanName.split('.').pop()?.toLowerCase() : 'jpg';
    return `${timestamp}-${cleanName.replace(/\.[^/.]+$/, '')}.${ext}`;
  } catch {
    return `image-${Date.now()}.jpg`;
  }
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
    const { imageUrl } = body;

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
    }

    // Validate URL
    let url: URL;
    try {
      url = new URL(imageUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    // 3. Download Image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MypenBot/1.0)',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to download image: ${response.status} ${response.statusText}` },
        { status: 400 }
      );
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Validate it's an image
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'URL does not point to an image' }, { status: 400 });
    }

    // 4. Ensure directories exist
    await ensureDirectories();

    // 5. Generate filename
    const filename = generateFilename(imageUrl);
    const baseName = filename.replace(/\.[^/.]+$/, '');

    // 6. Save original to content directory
    const originalPath = join(BLOG_IMAGE_DIR, filename);
    await writeFile(originalPath, imageBuffer);

    // 7. Optimize and create variants using Sharp
    try {
      const image = sharp(imageBuffer);

      // Get image metadata
      const metadata = await image.metadata();
      const width = metadata.width || 1200;
      const height = metadata.height || 800;

      // Create optimized versions
      const variants = [
        { suffix: '', width: width, height: height, quality: 85 }, // Original size
        { suffix: '-thumb', width: 400, height: 225, quality: 85 }, // Thumbnail
        { suffix: '-medium', width: 800, height: null, quality: 85 }, // Medium
        { suffix: '-large', width: 1200, height: null, quality: 85 }, // Large
      ];

      for (const variant of variants) {
        let processed = image.clone().resize(variant.width, variant.height || undefined, {
          fit: 'inside',
          withoutEnlargement: true,
        });

        // Convert to WebP
        const webpPath = join(OPTIMIZED_DIR, `${baseName}${variant.suffix}.webp`);
        await processed.webp({ quality: variant.quality }).toFile(webpPath);

        // Also create JPEG fallback for original size only
        if (variant.suffix === '') {
          const jpegPath = join(OPTIMIZED_DIR, `${baseName}.jpg`);
          await image.clone().jpeg({ quality: variant.quality }).toFile(jpegPath);
        }
      }
    } catch (error) {
      console.error('Error optimizing image:', error);
      // Continue even if optimization fails
    }

    // 8. Return hosted URL
    const hostedUrl = `/images/blog/optimized/${baseName}.webp`;

    return NextResponse.json({
      success: true,
      originalUrl: imageUrl,
      hostedUrl: hostedUrl,
      filename: baseName,
    });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

