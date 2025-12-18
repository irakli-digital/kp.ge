#!/usr/bin/env npx tsx

/**
 * Blog Article Import Script
 *
 * Imports markdown articles from /seo-strategy/articles/ into the database
 * with automatic image optimization and S3 upload.
 *
 * - If slug exists: UPDATES the existing post
 * - If slug is new: CREATES a new post
 *
 * Usage:
 *   npm run import-article <filename.md>    # Import single article
 *   npm run import-articles                 # Import all articles
 */

import { readFileSync, readdirSync, existsSync, renameSync, mkdirSync, copyFileSync } from 'fs';
import { join, basename } from 'path';
import matter from 'gray-matter';
import sharp from 'sharp';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { neon } from '@neondatabase/serverless';
import { marked } from 'marked';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Paths
const PROJECT_ROOT = process.cwd();
const ARTICLES_DIR = join(PROJECT_ROOT, 'seo-strategy', 'articles');
const IMAGES_DIR = join(PROJECT_ROOT, 'seo-strategy', 'images');
const PUBLISHED_DIR = join(PROJECT_ROOT, 'seo-strategy', 'published');

// S3 Configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'eu-central-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const S3_BUCKET = process.env.AWS_S3_BUCKET || 'mype-uploads';
const S3_BASE_URL = process.env.AWS_S3_BASE_URL || `https://${S3_BUCKET}.s3.eu-central-1.amazonaws.com`;

// Database
const sql = neon(process.env.DATABASE_URL!);

interface ArticleFrontmatter {
  slug: string;
  title_ka: string;
  title_en?: string;
  excerpt_ka: string;
  excerpt_en?: string;
  featured_image?: string;
  schema_keywords?: string[];
  author?: string;
  published?: boolean;
}

interface ExistingPost {
  id: number;
  featured_image: string | null;
}

/**
 * Optimize image and upload to S3
 */
async function processAndUploadImage(imagePath: string): Promise<string | null> {
  if (!existsSync(imagePath)) {
    console.log(`  ⚠️  Image not found: ${imagePath}`);
    return null;
  }

  try {
    console.log(`  📷 Processing image: ${basename(imagePath)}`);

    // Read and optimize image
    const imageBuffer = readFileSync(imagePath);
    const optimizedBuffer = await sharp(imageBuffer)
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 85 })
      .toBuffer();

    // Generate S3 key
    const timestamp = Date.now();
    const originalName = basename(imagePath).replace(/\.[^/.]+$/, '');
    const s3Key = `images/blog/${timestamp}-${originalName}.webp`;

    // Upload to S3
    await s3Client.send(new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: s3Key,
      Body: optimizedBuffer,
      ContentType: 'image/webp',
      CacheControl: 'public, max-age=31536000', // 1 year cache
    }));

    const imageUrl = `${S3_BASE_URL}/${s3Key}`;
    console.log(`  ✅ Uploaded to S3: ${imageUrl}`);

    return imageUrl;
  } catch (error) {
    console.error(`  ❌ Failed to process image:`, error);
    return null;
  }
}

/**
 * Get existing post by slug
 */
async function getExistingPost(slug: string): Promise<ExistingPost | null> {
  const result = await sql`SELECT id, featured_image FROM posts WHERE slug = ${slug} LIMIT 1`;
  return result.length > 0 ? result[0] as ExistingPost : null;
}

/**
 * Import a single article (creates or updates)
 */
async function importArticle(filename: string): Promise<boolean> {
  const filePath = join(ARTICLES_DIR, filename);

  if (!existsSync(filePath)) {
    console.error(`❌ Article not found: ${filePath}`);
    return false;
  }

  console.log(`\n📄 Processing: ${filename}`);

  // Read and parse markdown
  const fileContent = readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as ArticleFrontmatter;

  // Validate required fields
  if (!frontmatter.slug) {
    console.error('  ❌ Missing required field: slug');
    return false;
  }
  if (!frontmatter.title_ka) {
    console.error('  ❌ Missing required field: title_ka');
    return false;
  }

  const slug = frontmatter.slug;

  // Check if post already exists
  const existingPost = await getExistingPost(slug);
  const isUpdate = existingPost !== null;

  if (isUpdate) {
    console.log(`  📝 Found existing post (ID: ${existingPost.id}) - will UPDATE`);
  } else {
    console.log(`  🆕 New post - will CREATE`);
  }

  // Process featured image if specified
  let featuredImageUrl: string | null = null;
  if (frontmatter.featured_image) {
    const imagePath = join(IMAGES_DIR, frontmatter.featured_image);
    if (existsSync(imagePath)) {
      featuredImageUrl = await processAndUploadImage(imagePath);
    } else if (isUpdate && existingPost.featured_image) {
      // Keep existing image if no new image provided
      console.log(`  📷 Keeping existing image: ${existingPost.featured_image}`);
      featuredImageUrl = existingPost.featured_image;
    }
  } else if (isUpdate && existingPost.featured_image) {
    // Keep existing image if none specified in frontmatter
    featuredImageUrl = existingPost.featured_image;
  }

  // Convert markdown to HTML
  const contentHtml = await marked(content);

  // Prepare data
  const postData = {
    title: frontmatter.title_en || frontmatter.title_ka,
    title_ka: frontmatter.title_ka,
    slug: slug,
    content: contentHtml,
    content_ka: contentHtml,
    excerpt: frontmatter.excerpt_en || frontmatter.excerpt_ka || '',
    excerpt_ka: frontmatter.excerpt_ka || '',
    author: frontmatter.author || 'Mypen.ge',
    published: frontmatter.published !== false,
    featured_image: featuredImageUrl,
    schema_keywords: frontmatter.schema_keywords || null,
  };

  try {
    if (isUpdate) {
      // UPDATE existing post
      console.log('  💾 Updating database...');

      await sql`
        UPDATE posts SET
          title = ${postData.title},
          title_ka = ${postData.title_ka},
          content = ${postData.content},
          content_ka = ${postData.content_ka},
          excerpt = ${postData.excerpt},
          excerpt_ka = ${postData.excerpt_ka},
          author = ${postData.author},
          published = ${postData.published},
          featured_image = ${postData.featured_image},
          schema_keywords = ${postData.schema_keywords},
          updated_at = NOW()
        WHERE slug = ${slug}
      `;

      console.log(`  ✅ Updated post: ID ${existingPost.id}`);

      // Copy to published folder (keep original in articles for future edits)
      const publishedPath = join(PUBLISHED_DIR, filename);
      copyFileSync(filePath, publishedPath);
      console.log(`  📁 Copied to published/`);

    } else {
      // INSERT new post
      console.log('  💾 Inserting into database...');

      const result = await sql`
        INSERT INTO posts (
          title, title_ka, slug,
          content, content_ka,
          excerpt, excerpt_ka,
          author, published,
          featured_image, schema_keywords,
          published_at
        ) VALUES (
          ${postData.title}, ${postData.title_ka}, ${postData.slug},
          ${postData.content}, ${postData.content_ka},
          ${postData.excerpt}, ${postData.excerpt_ka},
          ${postData.author}, ${postData.published},
          ${postData.featured_image}, ${postData.schema_keywords},
          NOW()
        )
        RETURNING id, slug
      `;

      const insertedPost = result[0];
      console.log(`  ✅ Created post: ID ${insertedPost.id}`);

      // Move to published folder
      const publishedPath = join(PUBLISHED_DIR, filename);
      renameSync(filePath, publishedPath);
      console.log(`  📁 Moved to published/`);
    }

    console.log(`\n🎉 Success! View at: https://mypen.ge/blog/${slug}`);
    return true;

  } catch (error: any) {
    console.error('  ❌ Database error:', error.message);
    return false;
  }
}

/**
 * Import all articles in the articles folder
 */
async function importAllArticles(): Promise<void> {
  if (!existsSync(ARTICLES_DIR)) {
    console.error(`❌ Articles directory not found: ${ARTICLES_DIR}`);
    process.exit(1);
  }

  const files = readdirSync(ARTICLES_DIR)
    .filter(f => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('📂 No markdown files found in articles folder.');
    return;
  }

  console.log(`\n🚀 Found ${files.length} article(s) to process...\n`);

  let createCount = 0;
  let updateCount = 0;
  let failCount = 0;

  for (const file of files) {
    const existingPost = await getExistingPost(
      matter(readFileSync(join(ARTICLES_DIR, file), 'utf-8')).data.slug
    );

    const success = await importArticle(file);
    if (success) {
      if (existingPost) {
        updateCount++;
      } else {
        createCount++;
      }
    } else {
      failCount++;
    }
  }

  console.log(`\n📊 Import complete: ${createCount} created, ${updateCount} updated, ${failCount} failed`);
}

/**
 * Main entry point
 */
async function main(): Promise<void> {
  // Ensure directories exist
  if (!existsSync(PUBLISHED_DIR)) {
    mkdirSync(PUBLISHED_DIR, { recursive: true });
  }
  if (!existsSync(IMAGES_DIR)) {
    mkdirSync(IMAGES_DIR, { recursive: true });
  }

  const args = process.argv.slice(2);

  if (args.includes('--all') || args.length === 0) {
    await importAllArticles();
  } else {
    // Import specific file(s)
    for (const filename of args) {
      if (!filename.startsWith('--')) {
        await importArticle(filename);
      }
    }
  }
}

// Run
main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
