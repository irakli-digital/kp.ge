import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { revalidateTag } from 'next/cache';

const MAX_CLAPS_PER_VISITOR = 50;

export async function POST(request: NextRequest) {
  try {
    const { slug, visitorId, clapCount } = await request.json();

    // Validate inputs
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Invalid slug' },
        { status: 400 }
      );
    }

    if (!visitorId || typeof visitorId !== 'string') {
      return NextResponse.json(
        { error: 'Invalid visitor ID' },
        { status: 400 }
      );
    }

    if (!clapCount || typeof clapCount !== 'number' || clapCount < 1) {
      return NextResponse.json(
        { error: 'Invalid clap count' },
        { status: 400 }
      );
    }

    // Verify post exists
    const postCheck = await sql`
      SELECT id, claps FROM posts
      WHERE slug = ${slug} AND published = true
      LIMIT 1
    `;

    if (postCheck.length === 0) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Get current visitor clap count
    const visitorRecord = await sql`
      SELECT clap_count FROM visitor_claps
      WHERE visitor_id = ${visitorId} AND post_slug = ${slug}
      LIMIT 1
    `;

    const currentVisitorClaps = visitorRecord.length > 0
      ? visitorRecord[0].clap_count
      : 0;

    // Calculate how many claps we can actually add
    const remainingAllowed = MAX_CLAPS_PER_VISITOR - currentVisitorClaps;
    const acceptedClaps = Math.min(clapCount, remainingAllowed);

    if (acceptedClaps <= 0) {
      // Visitor has reached the limit - return current state
      return NextResponse.json({
        totalClaps: postCheck[0].claps,
        visitorClaps: currentVisitorClaps,
        acceptedClaps: 0,
        message: 'Clap limit reached'
      }, { status: 429 });
    }

    // UPSERT visitor_claps record
    await sql`
      INSERT INTO visitor_claps (visitor_id, post_slug, clap_count, updated_at)
      VALUES (${visitorId}, ${slug}, ${acceptedClaps}, NOW())
      ON CONFLICT (visitor_id, post_slug)
      DO UPDATE SET
        clap_count = visitor_claps.clap_count + ${acceptedClaps},
        updated_at = NOW()
    `;

    // Update total claps on posts table
    const result = await sql`
      UPDATE posts
      SET claps = claps + ${acceptedClaps}
      WHERE slug = ${slug} AND published = true
      RETURNING claps
    `;

    // Get updated visitor clap count
    const updatedVisitorRecord = await sql`
      SELECT clap_count FROM visitor_claps
      WHERE visitor_id = ${visitorId} AND post_slug = ${slug}
      LIMIT 1
    `;

    // Revalidate the blog posts cache
    revalidateTag('blog-posts');

    return NextResponse.json({
      totalClaps: result[0].claps,
      visitorClaps: updatedVisitorRecord[0].clap_count,
      acceptedClaps: acceptedClaps
    });

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
    const visitorId = searchParams.get('visitorId');

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

    let visitorClaps = 0;
    if (visitorId) {
      const visitorRecord = await sql`
        SELECT clap_count FROM visitor_claps
        WHERE visitor_id = ${visitorId} AND post_slug = ${slug}
        LIMIT 1
      `;
      visitorClaps = visitorRecord.length > 0 ? visitorRecord[0].clap_count : 0;
    }

    return NextResponse.json({
      totalClaps: result[0].claps,
      visitorClaps
    });
  } catch (error) {
    console.error('Error fetching claps:', error);
    return NextResponse.json(
      { error: 'Failed to fetch claps' },
      { status: 500 }
    );
  }
}
