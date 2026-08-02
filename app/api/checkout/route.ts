import { NextResponse } from 'next/server';
import { processCheckout } from '@/app/actions/checkout';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, customerNotes, userId } = body;

    if (!customer || !customer.name || !customer.phone || !customer.address) {
      return NextResponse.json(
        { success: false, error: 'Customer name, phone number, and address are required' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Cart is empty. Please add items before checking out.' },
        { status: 400 }
      );
    }

    const result = await processCheckout({
      cartItems: items.map((item: any) => ({
        productId: item.productId || item.id,
        name: item.name,
        image: item.image,
        size: item.selectedSize || item.size,
        color: item.selectedColor || item.color,
        quantity: item.quantity,
        price: item.price || item.unitPrice,
      })),
      customerData: customer,
      userId: userId || 'guest',
      paymentMethod,
      customerNotes,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Checkout failed.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderNumber: result.orderNumber,
      orderId: result.orderId,
      message: result.message || 'Order placed successfully!',
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing checkout' },
      { status: 500 }
    );
  }
}
