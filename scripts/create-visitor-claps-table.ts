import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function createVisitorClapsTable() {
  try {
    // Create visitor_claps table
    await sql`
      CREATE TABLE IF NOT EXISTS visitor_claps (
        id SERIAL PRIMARY KEY,
        visitor_id VARCHAR(36) NOT NULL,
        post_slug VARCHAR(255) NOT NULL,
        clap_count INT DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(visitor_id, post_slug)
      )
    `;

    console.log('✓ Created visitor_claps table');

    // Create index for faster lookups
    await sql`
      CREATE INDEX IF NOT EXISTS idx_visitor_claps_lookup
      ON visitor_claps(visitor_id, post_slug)
    `;

    console.log('✓ Created index on visitor_claps');

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

createVisitorClapsTable();
