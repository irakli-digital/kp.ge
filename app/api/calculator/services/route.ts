import { NextResponse } from 'next/server';
import { getActiveOneTimeServices } from '@/lib/calculator-queries';

export async function GET() {
  try {
    const services = await getActiveOneTimeServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
