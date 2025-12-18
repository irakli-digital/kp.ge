import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { sql } from '@/lib/db';

const SESSION_COOKIE_NAME = 'admin_session';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const articles = await sql`
      SELECT id, title, title_ka, slug, published, published_at, updated_at
      FROM posts
      ORDER BY updated_at DESC
    `;

    return NextResponse.json({ articles });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
  }
}

// Bulk delete articles
export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No article IDs provided' }, { status: 400 });
    }

    // Delete articles with the given IDs
    await sql`DELETE FROM posts WHERE id = ANY(${ids})`;

    // Invalidate blog cache so changes appear immediately
    revalidateTag('blog-posts');

    return NextResponse.json({ success: true, deleted: ids.length });
  } catch (error) {
    console.error('Error deleting articles:', error);
    return NextResponse.json({ error: 'Failed to delete articles' }, { status: 500 });
  }
}

// Bulk publish/unpublish articles
export async function PATCH(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { ids, published } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No article IDs provided' }, { status: 400 });
    }

    if (published) {
      // Publishing - set published_at if not already set
      await sql`
        UPDATE posts
        SET
          published = true,
          published_at = COALESCE(published_at, NOW()),
          updated_at = NOW()
        WHERE id = ANY(${ids})
      `;
    } else {
      // Unpublishing
      await sql`
        UPDATE posts
        SET
          published = false,
          updated_at = NOW()
        WHERE id = ANY(${ids})
      `;
    }

    // Invalidate blog cache so changes appear immediately
    revalidateTag('blog-posts');

    return NextResponse.json({ success: true, updated: ids.length, published });
  } catch (error) {
    console.error('Error updating articles:', error);
    return NextResponse.json({ error: 'Failed to update articles' }, { status: 500 });
  }
}
