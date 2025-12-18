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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const articleId = Number(id);

  try {
    const result = await sql`
      SELECT * FROM posts WHERE id = ${articleId}
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ article: result[0] });
  } catch (error) {
    console.error('Error fetching article:', error);
    return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const articleId = Number(id);

  try {
    const body = await request.json();
    const {
      title,
      title_ka,
      content,
      content_ka,
      excerpt,
      excerpt_ka,
      published
    } = body;

    // If publishing, also set published_at
    if (published) {
      await sql`
        UPDATE posts
        SET
          title = ${title},
          title_ka = ${title_ka},
          content = ${content},
          content_ka = ${content_ka},
          excerpt = ${excerpt},
          excerpt_ka = ${excerpt_ka},
          published = ${published},
          published_at = COALESCE(published_at, NOW()),
          updated_at = NOW()
        WHERE id = ${articleId}
      `;
    } else {
      await sql`
        UPDATE posts
        SET
          title = ${title},
          title_ka = ${title_ka},
          content = ${content},
          content_ka = ${content_ka},
          excerpt = ${excerpt},
          excerpt_ka = ${excerpt_ka},
          published = ${published},
          updated_at = NOW()
        WHERE id = ${articleId}
      `;
    }

    // Invalidate blog cache so changes appear immediately
    revalidateTag('blog-posts');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating article:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

// Quick toggle publish status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const articleId = Number(id);

  try {
    const body = await request.json();
    const { published } = body;

    if (published) {
      // Publishing - set published_at if not already set
      await sql`
        UPDATE posts
        SET
          published = true,
          published_at = COALESCE(published_at, NOW()),
          updated_at = NOW()
        WHERE id = ${articleId}
      `;
    } else {
      // Unpublishing - just set published to false
      await sql`
        UPDATE posts
        SET
          published = false,
          updated_at = NOW()
        WHERE id = ${articleId}
      `;
    }

    // Invalidate blog cache so changes appear immediately
    revalidateTag('blog-posts');

    return NextResponse.json({ success: true, published });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return NextResponse.json({ error: 'Failed to update status' }, { status: 500 });
  }
}
