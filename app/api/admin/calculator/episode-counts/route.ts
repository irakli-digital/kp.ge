import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isAuthenticated } from '@/lib/admin-auth';
import {
  getAllEpisodeCounts,
  createEpisodeCount,
  updateEpisodeCount,
  deleteEpisodeCount,
} from '@/lib/calculator-queries';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const episodeCounts = await getAllEpisodeCounts();
    return NextResponse.json({ episodeCounts });
  } catch (error) {
    console.error('Error fetching episode counts:', error);
    return NextResponse.json({ error: 'Failed to fetch episode counts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { count, discount_percent, label, is_active, sort_order } = body;

    if (count === undefined || discount_percent === undefined || !label) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newEpisodeCount = await createEpisodeCount({
      count,
      discount_percent,
      label,
      is_active,
      sort_order,
    });

    revalidateTag('calculator-episodes');
    return NextResponse.json({ episodeCount: newEpisodeCount });
  } catch (error) {
    console.error('Error creating episode count:', error);
    return NextResponse.json({ error: 'Failed to create episode count' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, count, discount_percent, label, is_active, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Episode count ID is required' }, { status: 400 });
    }

    const updatedEpisodeCount = await updateEpisodeCount(id, {
      count,
      discount_percent,
      label,
      is_active,
      sort_order,
    });

    revalidateTag('calculator-episodes');
    return NextResponse.json({ episodeCount: updatedEpisodeCount });
  } catch (error) {
    console.error('Error updating episode count:', error);
    return NextResponse.json({ error: 'Failed to update episode count' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Episode count ID is required' }, { status: 400 });
    }

    await deleteEpisodeCount(parseInt(id));
    revalidateTag('calculator-episodes');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting episode count:', error);
    return NextResponse.json({ error: 'Failed to delete episode count' }, { status: 500 });
  }
}
