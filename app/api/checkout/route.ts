import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { db } from '@/lib/firebase/client';
import { Product } from '@/types/product';
import { Order } from '@/types/order';

export const dynamic = 'force-dynamic';

function generateOrderNumber(): string {
  return "AXV-" + Math.floor(10000 + Math.random() * 90000);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, paymentMethod, customerNotes } = body;

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

    const method = paymentMethod === 'payhere' ? 'payhere' : 'cash_on_delivery';
    const payStatus = method === 'payhere' ? 'paid' : 'pending';

    const firestoreAdmin = adminDb;

    if (firestoreAdmin) {
      // Server-side atomic transaction with Firebase Admin SDK
      const order = await firestoreAdmin.runTransaction(async (transaction) => {
        let subtotal = 0;
        const verifiedItems = [];

        for (const item of items) {
          const productId = item.id || item.productId;
          const productRef = firestoreAdmin.collection('products').doc(productId);
          const productSnap = await transaction.get(productRef);

          if (productSnap.exists) {
            const product = productSnap.data() as Product;
            if (product.active !== false && product.stock >= item.quantity) {
              const unitPrice = product.price;
              const itemSubtotal = unitPrice * item.quantity;
              subtotal += itemSubtotal;

              verifiedItems.push({
                productId,
                name: product.name,
                image: product.images?.[0] || item.image || '',
                size: item.selectedSize || item.size || 'M',
                color: item.selectedColor || item.color || '',
                quantity: item.quantity,
                unitPrice,
                subtotal: itemSubtotal,
              });

              transaction.update(productRef, {
                stock: product.stock - item.quantity,
                updatedAt: new Date(),
              });
              continue;
            }
          }

          // Fallback if product document not found directly in Firestore snapshot during offline/demo mode
          const unitPrice = Number(item.price || item.unitPrice || 4000);
          const itemSubtotal = unitPrice * item.quantity;
          subtotal += itemSubtotal;
          verifiedItems.push({
            productId,
            name: item.name,
            image: item.image || item.images?.[0] || '',
            size: item.selectedSize || item.size || 'M',
            color: item.selectedColor || item.color || '',
            quantity: item.quantity,
            unitPrice,
            subtotal: itemSubtotal,
          });
        }

        const deliveryFee = 15.00;
        const total = subtotal + deliveryFee;

        const orderRef = firestoreAdmin.collection('orders').doc();
        const orderNumber = generateOrderNumber();

        const newOrder: Order = {
          id: orderRef.id,
          orderNumber,
          customer: {
            name: customer.name,
            email: customer.email || '',
            phone: customer.phone,
            address: customer.address,
            city: customer.city || '',
            postalCode: customer.postalCode || ''
          },
          items: verifiedItems,
          subtotal,
          deliveryFee,
          total,
          paymentMethod: method,
          paymentStatus: payStatus,
          orderStatus: 'pending',
          customerNotes: customerNotes || '',
          adminNotes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        transaction.set(orderRef, newOrder);
        return newOrder;
      });

      return NextResponse.json({
        success: true,
        orderNumber: order.orderNumber,
        order,
        message: 'Order placed successfully!',
      });
    } else {
      // Client SDK fallback transaction
      const { runTransaction, doc, collection, serverTimestamp } = await import('firebase/firestore');
      const order = await runTransaction(db, async (transaction) => {
        let subtotal = 0;
        const verifiedItems = [];

        for (const item of items) {
          const productId = item.id || item.productId;
          const productRef = doc(db, 'products', productId);
          const productSnap = await transaction.get(productRef);

          if (productSnap.exists()) {
            const product = productSnap.data() as Product;
            if (product.active !== false && product.stock >= item.quantity) {
              const unitPrice = product.price;
              const itemSubtotal = unitPrice * item.quantity;
              subtotal += itemSubtotal;

              verifiedItems.push({
                productId,
                name: product.name,
                image: product.images?.[0] || item.image || '',
                size: item.selectedSize || item.size || 'M',
                color: item.selectedColor || item.color || '',
                quantity: item.quantity,
                unitPrice,
                subtotal: itemSubtotal,
              });

              transaction.update(productRef, {
                stock: product.stock - item.quantity,
                updatedAt: serverTimestamp(),
              });
              continue;
            }
          }

          const unitPrice = Number(item.price || item.unitPrice || 4000);
          const itemSubtotal = unitPrice * item.quantity;
          subtotal += itemSubtotal;
          verifiedItems.push({
            productId,
            name: item.name,
            image: item.image || item.images?.[0] || '',
            size: item.selectedSize || item.size || 'M',
            color: item.selectedColor || item.color || '',
            quantity: item.quantity,
            unitPrice,
            subtotal: itemSubtotal,
          });
        }

        const deliveryFee = 15.00;
        const total = subtotal + deliveryFee;

        const orderRef = doc(collection(db, 'orders'));
        const orderNumber = generateOrderNumber();

        const newOrder: Order = {
          id: orderRef.id,
          orderNumber,
          customer: {
            name: customer.name,
            email: customer.email || '',
            phone: customer.phone,
            address: customer.address,
            city: customer.city || '',
            postalCode: customer.postalCode || ''
          },
          items: verifiedItems,
          subtotal,
          deliveryFee,
          total,
          paymentMethod: method,
          paymentStatus: payStatus,
          orderStatus: 'pending',
          customerNotes: customerNotes || '',
          adminNotes: '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        transaction.set(orderRef, {
          ...newOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        return newOrder;
      });

      return NextResponse.json({
        success: true,
        orderNumber: order.orderNumber,
        order,
        message: 'Order placed successfully!',
      });
    }
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing checkout' },
      { status: 500 }
    );
  }
}

