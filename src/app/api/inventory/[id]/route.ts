import { NextResponse } from 'next/server';
import { items, Item } from '@/lib/storage';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const item = items.find(item => item.id === params.id);

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error('Failed to get item:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const index = items.findIndex(item => item.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const updatedItem = {
      ...items[index],
      name: data.name,
      stockCount: data.stockCount,
      threshold: data.minThreshold,
      costPrice: data.costPrice,
      salePrice: data.salePrice,
      arrivalDate: new Date(data.arrivalDate),
      supplierId: data.supplierId,
      updatedAt: new Date()
    };

    items[index] = updatedItem;
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error('Failed to update item:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const index = items.findIndex(item => item.id === params.id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    items.splice(index, 1);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete item:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
