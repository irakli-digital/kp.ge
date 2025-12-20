require('dotenv').config({ path: '.env' });
const { Pool } = require('pg');

// Video ID mapping based on topic relevance
const VIDEO_MAPPING = {
  // SILO 1: Mental Health
  'anxiety': 'PYOOzr2rdnM', // სტრესი, სტრესის მართვა #29
  'understanding-depression-symptoms': 'vyu3Es5B1_o', // დეპრესია, დედობა #25
  'antidepressants-overview-uses-types': 'vyu3Es5B1_o', // დეპრესია #25
  'social-anxiety-disorder-explained': 'eoHyQ7T0fQ8', // ემოციური ინტელექტი #34
  'social-anxiety-disorder': 'PYOOzr2rdnM', // სტრესი, სტრესის მართვა #29
  'social-anxiety-disorder-overview': 'eoHyQ7T0fQ8', // ემოციური ინტელექტი #34
  'fear': 'jz5DtxINxFY', // მაძიებლის გზა, შიშები #46

  // SILO 2: Self-Development
  'tvitshefaseba-pirovnuli-girebuleba-cxovrebis-xarisxi': 'v6g1Ou8y0a8', // თვითშეფასება #33
  'low-self-esteem-signs-and-solutions': 'v6g1Ou8y0a8', // თვითშეფასება #33
  'low-self-esteem-improvement-tips': 'v6g1Ou8y0a8', // თვითშეფასება #33
  'self-development-skills-15-essential-skills-2023': '2EUJUTO8PfQ', // პიროვნული განვითარება #27
  'self-development-skills-2025': '2EUJUTO8PfQ', // პიროვნული განვითარება #27

  // SILO 3: Psychology Education
  'introduction-to-psychology': 'nZx3z2mHWDs', // როგორ განვითარდა ადამიანი #31
  'psychology-degree-options': 'SP2uxTGomwQ', // განათლების სისტემა #63
  'famous-psychology-experiments': 'q7kIFLK-kNs', // შენი ტვინი გატყუებს? #66
  '25-best-psychology-books-2024': 'I4hIocEA3t4', // ლიტერატურის ისტორია #32

  // SILO 4: Aggression
  'understanding-aggression-types-management': 'g_bg9rO6jbw', // აგრესია #35
  'understanding-aggression-emotions': 'g_bg9rO6jbw', // აგრესია #35
  'understanding-aggression-emotions-management': 'eoHyQ7T0fQ8', // ემოციური ინტელექტი #34

  // SILO 5: Cognitive
  'why-intelligence-is-not-the-same-for-everyone': 'q7kIFLK-kNs', // შენი ტვინი გატყუებს? #66
  'learning-styles-jung-theory': 'WbOABM3aqEQ', // მედიტაცია, ფსიქოანალიზი #45
};

async function updateVideoIds() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('🎬 Updating YouTube video IDs in articles...\n');

  const client = await pool.connect();

  try {
    let updatedCount = 0;
    let notFoundCount = 0;

    for (const [slug, videoId] of Object.entries(VIDEO_MAPPING)) {
      // Replace [VIDEO_ID] with actual video ID
      const result = await client.query(`
        UPDATE posts
        SET
          content = REPLACE(content, '[VIDEO_ID]', $1),
          content_ka = REPLACE(content_ka, '[VIDEO_ID]', $1),
          updated_at = NOW()
        WHERE slug = $2
        AND (content LIKE '%[VIDEO_ID]%' OR content_ka LIKE '%[VIDEO_ID]%')
        RETURNING slug
      `, [videoId, slug]);

      if (result.rows.length > 0) {
        console.log(`✅ Updated: ${slug}`);
        console.log(`   🎬 Video: https://youtube.com/watch?v=${videoId}`);
        updatedCount++;
      } else {
        // Check if article exists but already has video
        const existsCheck = await client.query(
          'SELECT slug FROM posts WHERE slug = $1',
          [slug]
        );

        if (existsCheck.rows.length > 0) {
          console.log(`⏭️  Already has video: ${slug}`);
        } else {
          console.log(`❌ Not found: ${slug}`);
          notFoundCount++;
        }
      }
    }

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('📊 Update Summary:');
    console.log(`   ✅ Updated: ${updatedCount} articles`);
    console.log(`   ❌ Not found: ${notFoundCount} articles`);
    console.log('='.repeat(50));

    // List unique videos used
    const uniqueVideos = [...new Set(Object.values(VIDEO_MAPPING))];
    console.log(`\n🎬 Unique videos embedded: ${uniqueVideos.length}`);

  } finally {
    client.release();
    await pool.end();
  }
}

updateVideoIds().catch(console.error);
