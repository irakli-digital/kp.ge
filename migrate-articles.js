require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Configure marked for consistent HTML output
marked.setOptions({
  breaks: true,
  gfm: true,
});

const ARTICLES_DIR = path.join(__dirname, 'public', 'articles-to-migrate');

async function migrateArticles() {
  // Use pg Pool for more reliable CLI connections
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('🚀 Starting article migration...\n');

  // Get all .md files
  const files = fs.readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'));
  console.log(`📁 Found ${files.length} markdown files\n`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  const client = await pool.connect();

  try {
    for (const file of files) {
      const filePath = path.join(ARTICLES_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      try {
        // Parse frontmatter and content
        const { data: frontmatter, content: markdownBody } = matter(fileContent);

        // Validate required fields
        if (!frontmatter.slug || !frontmatter.title_ka) {
          console.log(`⚠️  Skipping ${file}: Missing required frontmatter (slug or title_ka)`);
          skipCount++;
          continue;
        }

        // Convert markdown to HTML
        const htmlContent = marked(markdownBody);

        // Prepare data for insertion
        const articleData = {
          slug: frontmatter.slug,
          title: frontmatter.title_ka,
          title_ka: frontmatter.title_ka,
          content: htmlContent,
          content_ka: htmlContent,
          excerpt: frontmatter.excerpt_ka || '',
          excerpt_ka: frontmatter.excerpt_ka || '',
          author: 'KP.ge',
          published: true,
          featured_image: frontmatter.featured_image
            ? `/images/blog/${frontmatter.featured_image}`
            : null,
        };

        // Insert into database
        const result = await client.query(`
          INSERT INTO posts (
            title, title_ka, slug, content, content_ka,
            excerpt, excerpt_ka, author, published,
            featured_image, published_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
          ON CONFLICT (slug) DO NOTHING
          RETURNING id, slug
        `, [
          articleData.title,
          articleData.title_ka,
          articleData.slug,
          articleData.content,
          articleData.content_ka,
          articleData.excerpt,
          articleData.excerpt_ka,
          articleData.author,
          articleData.published,
          articleData.featured_image
        ]);

        if (result.rows.length > 0) {
          console.log(`✅ Inserted: ${frontmatter.title_ka}`);
          console.log(`   📍 /blog/${frontmatter.slug}`);
          successCount++;
        } else {
          console.log(`⏭️  Already exists: ${frontmatter.slug}`);
          skipCount++;
        }

      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error.message);
        errorCount++;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 Migration Summary:');
  console.log(`   ✅ Inserted: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log('='.repeat(50));

  if (successCount > 0) {
    console.log('\n💡 Next steps:');
    console.log('   1. Run: node refresh-blog-cache.js');
    console.log('   2. Visit: http://localhost:3000/blog');
  }
}

migrateArticles().catch(console.error);
