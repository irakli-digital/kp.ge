-- Blog posts table with bilingual support
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_ka VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  content_ka TEXT NOT NULL,
  excerpt TEXT,
  excerpt_ka TEXT,
  author VARCHAR(100),
  published_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  published BOOLEAN DEFAULT false,
  featured_image VARCHAR(500)
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(published, published_at DESC);

-- Sample data (optional)
-- INSERT INTO posts (title, title_ka, slug, content, content_ka, excerpt, excerpt_ka, author, published)
-- VALUES 
-- ('Getting Started with AI', 'AI-ს დაწყება', 'getting-started-with-ai', 
--  'Content about AI...', 'AI-ს შესახებ კონტენტი...', 
--  'Learn the basics of AI', 'ისწავლეთ AI-ს საფუძვლები',
--  'Mypen Team', true);