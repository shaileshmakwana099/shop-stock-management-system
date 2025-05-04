import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newItem = await prisma.item.create({
      data: {
        name: data.name,
        stockCount: data.stockCount,
        threshold: data.minThreshold,
        costPrice: data.costPrice,
        salePrice: data.salePrice,
        arrivalDate: new Date(data.arrivalDate),
        supplier: {
          connect: {
            id: data.supplierId
          }
        },
      }
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('Failed to create item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
}