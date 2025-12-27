import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function addClapsColumn() {
  console.log('Adding claps column to posts table...');

  try {
    // Add claps column with default 0
    await sql`
      ALTER TABLE posts
      ADD COLUMN IF NOT EXISTS claps INTEGER DEFAULT 0
    `;
    console.log('Claps column added successfully');

    // Get all post IDs
    const posts = await sql`SELECT id FROM posts`;
    console.log(`Found ${posts.length} posts`);

    // Update each post with random claps between 20-100
    for (const post of posts) {
      const randomClaps = Math.floor(Math.random() * (100 - 20 + 1)) + 20;
      await sql`
        UPDATE posts
        SET claps = ${randomClaps}
        WHERE id = ${post.id}
      `;
      console.log(`Post ${post.id}: ${randomClaps} claps`);
    }

    console.log('All posts updated with random claps!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addClapsColumn();
