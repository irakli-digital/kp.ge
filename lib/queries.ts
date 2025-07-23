import { sql } from './db';
import type { BlogPost, BlogPostPreview } from './types';

export async function getPublishedPosts(limit?: number): Promise<BlogPostPreview[]> {
  const result = limit
    ? await sql`
        SELECT id, title, title_ka, slug, excerpt, excerpt_ka, published_at, author, featured_image 
        FROM posts 
        WHERE published = true 
        ORDER BY published_at DESC 
        LIMIT ${limit}
      `
    : await sql`
        SELECT id, title, title_ka, slug, excerpt, excerpt_ka, published_at, author, featured_image 
        FROM posts 
        WHERE published = true 
        ORDER BY published_at DESC
      `;
  
  return result as BlogPostPreview[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const result = await sql`
    SELECT * FROM posts 
    WHERE slug = ${slug} AND published = true 
    LIMIT 1
  `;
  
  return result[0] as BlogPost || null;
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const result = await sql`
    SELECT slug FROM posts WHERE published = true
  `;
  
  return result as { slug: string }[];
}

export async function getFeaturedPosts(limit: number = 3): Promise<BlogPostPreview[]> {
  const result = await sql`
    SELECT id, title, title_ka, slug, excerpt, excerpt_ka, published_at, author, featured_image 
    FROM posts 
    WHERE published = true AND featured_image IS NOT NULL
    ORDER BY published_at DESC 
    LIMIT ${limit}
  `;
  
  return result as BlogPostPreview[];
}