import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase/client';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { productsDatabase } from '@/app/data/products';

export const dynamic = 'force-dynamic';

async function performSeed() {
  const seeded = [];
  for (const product of productsDatabase) {
    const { id, ...data } = product;
    await setDoc(doc(db, 'products', id), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    seeded.push(id);
  }
  return seeded;
}

export async function POST() {
  try {
    const seeded = await performSeed();
    return NextResponse.json({
      success: true,
      count: seeded.length,
      seeded,
      message: 'Products seeded successfully into Firestore.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to seed products' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const seeded = await performSeed();
    return NextResponse.json({
      success: true,
      count: seeded.length,
      seeded,
      message: 'Products seeded successfully into Firestore.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to seed products' },
      { status: 500 }
    );
  }
}
