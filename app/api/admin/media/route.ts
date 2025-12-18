import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { S3Client, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

const SESSION_COOKIE_NAME = 'admin_session';

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return !!session?.value;
}

// GET - List all images from S3
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET!,
      Prefix: 'images/blog/',
    });

    const response = await s3Client.send(command);
    const bucket = process.env.AWS_S3_BUCKET;
    const region = process.env.AWS_REGION;
    const baseUrl = (process.env.AWS_S3_BASE_URL || `https://${bucket}.s3.${region}.amazonaws.com`).replace(/\/$/, '');

    console.log('S3 Base URL:', baseUrl);
    console.log('Found objects:', response.Contents?.length || 0);

    const images = (response.Contents || [])
      .filter((obj) => obj.Key && !obj.Key.endsWith('/')) // Filter out folders
      .map((obj) => ({
        key: obj.Key!,
        url: `${baseUrl}/${obj.Key}`,
        lastModified: obj.LastModified?.toISOString(),
        size: obj.Size,
      }))
      .sort((a, b) => {
        // Sort by lastModified descending (newest first)
        if (!a.lastModified || !b.lastModified) return 0;
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      });

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error listing S3 images:', error);
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 });
  }
}

// DELETE - Remove image from S3
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { key } = body;

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ error: 'Image key is required' }, { status: 400 });
    }

    // Security check: only allow deleting from images/blog/ prefix
    if (!key.startsWith('images/blog/')) {
      return NextResponse.json({ error: 'Invalid image key' }, { status: 400 });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: key,
    });

    await s3Client.send(command);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting S3 image:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
