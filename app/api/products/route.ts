import { NextResponse } from 'next/server';
import { productsDatabase } from '../../data/products';

export async function GET() {
  try {
    return NextResponse.json(
      {
        success: true,
        count: productsDatabase.length,
        products: productsDatabase,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch inventory',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, category, tagline, description, images, fabricSpec, careInstructions, sizes } = body;

    if (!name || !price || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required product fields' },
        { status: 400 }
      );
    }

    const newProduct = {
      id: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      name,
      price: Number(price),
      category,
      categoryLabel: category.charAt(0).toUpperCase() + category.slice(1),
      tagline: tagline || '',
      description: description || '',
      images: images || ['/images/pdp_front.jpg'],
      fabricSpec: fabricSpec || '',
      careInstructions: careInstructions || '',
      sizes: sizes || ['S', 'M', 'L', 'XL'],
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Product added successfully',
        product: newProduct,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid product data' },
      { status: 400 }
    );
  }
}
