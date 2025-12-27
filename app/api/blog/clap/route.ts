import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();

    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      );
    }

    // Increment claps and return the new count
    const result = await sql`
      UPDATE posts
      SET claps = claps + 1
      WHERE slug = ${slug} AND published = true
      RETURNING claps
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Revalidate the blog posts cache
    revalidateTag('blog-posts');

    return NextResponse.json({ claps: result[0].claps });
  } catch (error) {
    console.error('Error updating claps:', error);
    return NextResponse.json(
      { error: 'Failed to update claps' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT claps FROM posts
      WHERE slug = ${slug} AND published = true
      LIMIT 1
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ claps: result[0].claps });
  } catch (error) {
    console.error('Error fetching claps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch claps' },
      { status: 500 }
    );
  }
}
