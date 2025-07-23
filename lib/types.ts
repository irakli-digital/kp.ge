export interface BlogPost {
  id: number;
  title: string;
  title_ka: string;
  slug: string;
  content: string;
  content_ka: string;
  excerpt: string | null;
  excerpt_ka: string | null;
  author: string | null;
  published_at: Date;
  updated_at: Date;
  published: boolean;
  featured_image: string | null;
}

export type BlogPostPreview = Pick<
  BlogPost,
  'id' | 'title' | 'title_ka' | 'slug' | 'excerpt' | 'excerpt_ka' | 'published_at' | 'author' | 'featured_image'
>;