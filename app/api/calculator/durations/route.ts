import { NextResponse } from 'next/server';
import { getActiveDurations } from '@/lib/calculator-queries';

export async function GET() {
  try {
    const durations = await getActiveDurations();
    return NextResponse.json({ durations });
  } catch (error) {
    console.error('Error fetching durations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch durations' },
      { status: 500 }
    );
  }
}
