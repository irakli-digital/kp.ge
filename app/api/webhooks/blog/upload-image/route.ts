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

    const contentType = req.headers.get('content-type') || '';

    // 2. Handle file upload (multipart/form-data) or URL-based upload (JSON)
    let imageBuffer: Buffer;
    let originalUrl: string;
    let filename: string;

    if (contentType.includes('multipart/form-data')) {
      // File upload approach
      const formData = await req.formData();
      const file = formData.get('image') as File;
      
      if (!file) {
        return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
      }

      const arrayBuffer = await file.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
      originalUrl = formData.get('originalUrl') as string || file.name;
      filename = file.name;

      console.log(`Received file upload: ${filename}, size: ${imageBuffer.length} bytes`);

    } else {
      // URL-based approach (backward compatibility)
      const body = await req.json();
      const { imageUrl } = body;

      if (!imageUrl || typeof imageUrl !== 'string' || !imageUrl.startsWith('http')) {
        return NextResponse.json({ error: 'Invalid imageUrl' }, { status: 400 });
      }

      originalUrl = imageUrl;
      
      // Download image
      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; MypenBot/1.0)',
          'Accept': 'image/*',
        },
      });

      if (!response.ok) {
        console.error(`Failed to download image ${imageUrl}: ${response.status} ${response.statusText}`);
        return NextResponse.json({ 
          error: 'Failed to download image', 
          details: `${response.status} ${response.statusText}` 
        }, { status: 500 });
      }

      imageBuffer = Buffer.from(await response.arrayBuffer());
      const responseContentType = response.headers.get('content-type') || 'image/jpeg';

      if (!responseContentType.startsWith('image/')) {
        console.error(`URL does not point to an image: ${imageUrl}, content-type: ${responseContentType}`);
        return NextResponse.json({ 
          error: 'URL does not point to an image', 
          details: `Content-Type: ${responseContentType}` 
        }, { status: 400 });
      }

      filename = imageUrl.split('/').pop()?.split('?')[0] || 'image';
      console.log(`Downloaded image from URL: ${imageUrl}, size: ${imageBuffer.length} bytes`);
    }

    // 3. Process and host image
    const hostedUrl = await processAndHostImage(imageBuffer, originalUrl, filename);

    if (!hostedUrl) {
      return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      originalUrl: originalUrl,
      hostedUrl: hostedUrl,
      fullUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://mypen.ge'}${hostedUrl}`
    });

  } catch (error) {
    console.error('Image Upload Error:', error);
    return NextResponse.json({ 
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function processAndHostImage(imageBuffer: Buffer, originalUrl: string, filename: string): Promise<string | null> {
  try {
    console.log(`processAndHostImage: Processing image, size: ${imageBuffer.length} bytes`);

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
      // Continue even if optimization fails
    }

    return `/images/blog/optimized/${baseName}.webp`;
  } catch (error) {
    console.error(`Error processing image:`, error);
    return null;
  }
}
