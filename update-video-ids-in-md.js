const fs = require('fs');
const path = require('path');

// Video ID mapping
const VIDEO_MAPPING = {
  'anxiety': 'PYOOzr2rdnM',
  'understanding-depression-symptoms': 'vyu3Es5B1_o',
  'antidepressants-overview-uses-types': 'vyu3Es5B1_o',
  'social-anxiety-disorder-explained': 'eoHyQ7T0fQ8',
  'social-anxiety-disorder': 'PYOOzr2rdnM',
  'social-anxiety-disorder-overview': 'eoHyQ7T0fQ8',
  'fear': 'jz5DtxINxFY',
  'tvitshefaseba-pirovnuli-girebuleba-cxovrebis-xarisxi': 'v6g1Ou8y0a8',
  'low-self-esteem-signs-and-solutions': 'v6g1Ou8y0a8',
  'low-self-esteem-improvement-tips': 'v6g1Ou8y0a8',
  'self-development-skills-15-essential-skills-2023': '2EUJUTO8PfQ',
  'self-development-skills-2025': '2EUJUTO8PfQ',
  'introduction-to-psychology': 'nZx3z2mHWDs',
  'psychology-degree-options': 'SP2uxTGomwQ',
  'famous-psychology-experiments': 'q7kIFLK-kNs',
  '25-best-psychology-books-2024': 'I4hIocEA3t4',
  'understanding-aggression-types-management': 'g_bg9rO6jbw',
  'understanding-aggression-emotions': 'g_bg9rO6jbw',
  'understanding-aggression-emotions-management': 'eoHyQ7T0fQ8',
  'why-intelligence-is-not-the-same-for-everyone': 'q7kIFLK-kNs',
  'learning-styles-jung-theory': 'WbOABM3aqEQ',
};

const ARTICLES_DIR = path.join(__dirname, 'public', 'articles-to-migrate');

console.log('🎬 Updating video IDs in source markdown files...\n');

let updatedCount = 0;

for (const [slug, videoId] of Object.entries(VIDEO_MAPPING)) {
  const filePath = path.join(ARTICLES_DIR, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    if (content.includes('[VIDEO_ID]')) {
      content = content.replace(/\[VIDEO_ID\]/g, videoId);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated: ${slug}.md`);
      updatedCount++;
    } else {
      console.log(`⏭️  Already has video: ${slug}.md`);
    }
  } else {
    console.log(`❌ File not found: ${slug}.md`);
  }
}

console.log(`\n✅ Updated ${updatedCount} markdown files`);
