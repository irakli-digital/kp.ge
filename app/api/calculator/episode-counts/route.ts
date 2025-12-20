import { NextResponse } from 'next/server';
import { getActiveEpisodeCounts } from '@/lib/calculator-queries';

export async function GET() {
  try {
    const episodeCounts = await getActiveEpisodeCounts();
    return NextResponse.json({ episodeCounts });
  } catch (error) {
    console.error('Error fetching episode counts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch episode counts' },
      { status: 500 }
    );
  }
}
