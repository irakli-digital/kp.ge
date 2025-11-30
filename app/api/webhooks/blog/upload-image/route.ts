import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { existsSync } from 'fs';

// Define the schema for the incoming image upload request
const imageUploadSchema = {
  imageUrl: (val: any) => typeof val === 'string' && val.startsWith('http'),
};

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

    if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
      return NextResponse.json({ error: 'Invalid imageUrl' }, { status: 400 });
    }

    // 3. Download and process image (reuse existing logic)
    const hostedUrl = await uploadAndHostImage(imageUrl);

    if (!hostedUrl) {
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      originalUrl: imageUrl,
      hostedUrl: hostedUrl,
      fullUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mypen.ge'}${hostedUrl}`
    });

  } catch (error) {
    console.error('Image Upload Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function uploadAndHostImage(imageUrl: string): Promise<string | null> {
  try {
    console.log(`uploadAndHostImage: Starting download for ${imageUrl}`);
    
    // Download image
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MypenBot/1.0)',
        'Accept': 'image/*',
      },
    });

    if (!response.ok) {
      console.error(`Failed to download image ${imageUrl}: ${response.status} ${response.statusText}`);
      return null;
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    if (!contentType.startsWith('image/')) {
      console.error(`URL does not point to an image: ${imageUrl}, content-type: ${contentType}`);
      return null;
    }

    console.log(`uploadAndHostImage: Successfully downloaded ${imageUrl}, size: ${imageBuffer.length} bytes, type: ${contentType}`);

    // Ensure directories exist
    const BLOG_IMAGE_DIR = join(process.cwd(), 'public', 'images', 'blog', 'content');
    const OPTIMIZED_DIR = join(process.cwd(), 'public', 'images', 'blog', 'optimized');
    
    if (!existsSync(BLOG_IMAGE_DIR)) {
      await mkdir(BLOG_IMAGE_DIR, { recursive: true });
    }
    if (!existsSync(OPTIMIZED_DIR)) {
      await mkdir(OPTIMIZED_DIR, { recursive: true });
    }

    // Generate filename - preserve original name as much as possible
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
