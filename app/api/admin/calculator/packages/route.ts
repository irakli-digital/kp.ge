import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { isAuthenticated } from '@/lib/admin-auth';
import {
  getAllPackages,
  createPackage,
  updatePackage,
  deletePackage,
  setPackageFeatures,
} from '@/lib/calculator-queries';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const packages = await getAllPackages();
    return NextResponse.json({ packages });
  } catch (error) {
    console.error('Error fetching packages:', error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, name, base_price, tag, tag_classes, is_active, sort_order, features } = body;

    if (!type || !name || base_price === undefined || !tag || !tag_classes) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newPackage = await createPackage({
      type,
      name,
      base_price,
      tag,
      tag_classes,
      is_active,
      sort_order,
    });

    // Add features if provided
    if (features && Array.isArray(features)) {
      await setPackageFeatures(newPackage.id, features);
    }

    revalidateTag('calculator-packages');
    return NextResponse.json({ package: newPackage });
  } catch (error) {
    console.error('Error creating package:', error);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, type, name, base_price, tag, tag_classes, is_active, sort_order, features } = body;

    if (!id) {
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    const updatedPackage = await updatePackage(id, {
      type,
      name,
      base_price,
      tag,
      tag_classes,
      is_active,
      sort_order,
    });

    // Update features if provided
    if (features && Array.isArray(features)) {
      await setPackageFeatures(id, features);
    }

    revalidateTag('calculator-packages');
    return NextResponse.json({ package: updatedPackage });
  } catch (error) {
    console.error('Error updating package:', error);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
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
      return NextResponse.json({ error: 'Package ID is required' }, { status: 400 });
    }

    await deletePackage(parseInt(id));
    revalidateTag('calculator-packages');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting package:', error);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
