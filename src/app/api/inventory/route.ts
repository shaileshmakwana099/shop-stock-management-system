import { NextResponse } from 'next/server';

// In-memory storage
let items: any[] = [];

export async function GET() {
  try {
    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newItem = {
      id: Date.now().toString(),
      name: data.name,
      stockCount: data.stockCount,
      threshold: data.minThreshold,
      costPrice: data.costPrice,
      salePrice: data.salePrice,
      arrivalDate: new Date(data.arrivalDate),
      supplierId: data.supplierId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    items.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to create item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}
