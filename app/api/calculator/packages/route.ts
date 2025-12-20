import { NextResponse } from 'next/server';
import { getActivePackages } from '@/lib/calculator-queries';

export async function GET() {
  try {
    const packages = await getActivePackages();
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    );
  }
}
