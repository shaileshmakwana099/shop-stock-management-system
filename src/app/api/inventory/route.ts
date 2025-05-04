import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

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