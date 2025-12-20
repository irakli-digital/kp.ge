require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

async function updateInternalLinks() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('🔗 Updating internal links in articles...\n');

  const client = await pool.connect();

  try {
    // Get all posts
    const { rows: posts } = await client.query('SELECT id, slug, content, content_ka FROM posts');
    console.log(`📄 Found ${posts.length} articles to process\n`);

    let updatedCount = 0;
    let unchangedCount = 0;

    for (const post of posts) {
      const originalContent = post.content;
      const originalContentKa = post.content_ka;

      // Replace /psychology/ with /blog/ in both content columns
      const newContent = post.content.replace(/\/psychology\//g, '/blog/');
      const newContentKa = post.content_ka.replace(/\/psychology\//g, '/blog/');

      // Check if any changes were made
      const contentChanged = newContent !== originalContent;
      const contentKaChanged = newContentKa !== originalContentKa;

      if (contentChanged || contentKaChanged) {
        // Count the replacements
        const replacements = (originalContent.match(/\/psychology\//g) || []).length;

        // Update the database
        await client.query(
          'UPDATE posts SET content = $1, content_ka = $2, updated_at = NOW() WHERE id = $3',
          [newContent, newContentKa, post.id]
        );

        console.log(`✅ Updated: ${post.slug}`);
        console.log(`   📍 Fixed ${replacements} internal link(s)`);
        updatedCount++;
      } else {
        console.log(`⏭️  No changes: ${post.slug}`);
        unchangedCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Update Summary:');
    console.log(`   ✅ Updated: ${updatedCount} articles`);
    console.log(`   ⏭️  Unchanged: ${unchangedCount} articles`);
    console.log('='.repeat(50));

    if (updatedCount > 0) {
      console.log('\n💡 Internal links now point to /blog/[slug]');
      console.log('   Run: node refresh-blog-cache.js to update cache');
    }

  } finally {
    client.release();
    await pool.end();
  }
}

updateInternalLinks().catch(console.error);
