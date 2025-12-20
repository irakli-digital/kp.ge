import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isAuthenticated } from '@/lib/admin-auth';
import {
  getAllDurations,
  createDuration,
  updateDuration,
  deleteDuration,
} from '@/lib/calculator-queries';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const durations = await getAllDurations();
    return NextResponse.json({ durations });
  } catch (error) {
    console.error('Error fetching durations:', error);
    return NextResponse.json({ error: 'Failed to fetch durations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { months, discount_percent, label, is_active, sort_order } = body;

    if (months === undefined || discount_percent === undefined || !label) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newDuration = await createDuration({
      months,
      discount_percent,
      label,
      is_active,
      sort_order,
    });

    revalidateTag('calculator-durations');
    return NextResponse.json({ duration: newDuration });
  } catch (error) {
    console.error('Error creating duration:', error);
    return NextResponse.json({ error: 'Failed to create duration' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, months, discount_percent, label, is_active, sort_order } = body;

    if (!id) {
      return NextResponse.json({ error: 'Duration ID is required' }, { status: 400 });
    }

    const updatedDuration = await updateDuration(id, {
      months,
      discount_percent,
      label,
      is_active,
      sort_order,
    });

    revalidateTag('calculator-durations');
    return NextResponse.json({ duration: updatedDuration });
  } catch (error) {
    console.error('Error updating duration:', error);
    return NextResponse.json({ error: 'Failed to update duration' }, { status: 500 });
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
      return NextResponse.json({ error: 'Duration ID is required' }, { status: 400 });
    }

    await deleteDuration(parseInt(id));
    revalidateTag('calculator-durations');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting duration:', error);
    return NextResponse.json({ error: 'Failed to delete duration' }, { status: 500 });
  }
}
