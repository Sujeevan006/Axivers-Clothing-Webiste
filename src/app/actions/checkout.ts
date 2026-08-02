"use server";

import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { db as clientDb } from '@/lib/firebase/client';
import { runTransaction as clientRunTransaction, doc as clientDoc, collection as clientCollection, serverTimestamp } from 'firebase/firestore';

// -----------------------------------------------------------------------------
// 1. Firebase Admin SDK Initialization (Single-Instance Pattern for Hot-Reload)
// -----------------------------------------------------------------------------
function getAdminDb() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'axivers-clothing-65138';
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const rawPrivateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

    if (projectId && clientEmail && rawPrivateKey) {
      try {
        initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey: rawPrivateKey.replace(/\\n/g, '\n'),
          }),
        });
      } catch (error) {
        console.error('Firebase Admin cert initialization error:', error);
      }
    } else {
      try {
        initializeApp({ projectId });
      } catch (error) {
        console.warn('Firebase Admin default initialization skipped:', error);
      }
    }
  }

  try {
    return getApps().length > 0 ? getFirestore(getApp()) : null;
  } catch (err) {
    console.warn('Failed to retrieve Firestore Admin instance:', err);
    return null;
  }
}

// -----------------------------------------------------------------------------
// Helper: Generate Random Order Number (AXV-XXXXX)
// -----------------------------------------------------------------------------
function generateOrderNumber(): string {
  return "AXV-" + Math.floor(10000 + Math.random() * 90000);
}

// Types
export interface CartItemInput {
  productId: string;
  name?: string;
  image?: string;
  size?: string;
  color?: string;
  quantity: number;
  price?: number;
  unitPrice?: number;
}

export interface CustomerInput {
  name: string;
  email?: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
}

export interface ProcessCheckoutOptions {
  cartItems: CartItemInput[];
  customerData?: CustomerInput;
  userId?: string;
  paymentMethod?: 'cash_on_delivery' | 'payhere';
  customerNotes?: string;
}

export interface CheckoutResponse {
  success: boolean;
  orderId?: string;
  orderNumber?: string;
  message?: string;
  error?: string;
}

// -----------------------------------------------------------------------------
// 2. Server Action: processCheckout
// -----------------------------------------------------------------------------
export async function processCheckout(
  cartItemsOrOptions: CartItemInput[] | ProcessCheckoutOptions,
  userIdOrCustomerData?: string | CustomerInput,
  customerDataParam?: CustomerInput
): Promise<CheckoutResponse> {
  try {
    // Normalize parameters for flexible calling signatures
    let cartItems: CartItemInput[] = [];
    let customerData: CustomerInput = { name: 'Guest', phone: '0770000000', address: 'Delivery Address', city: 'Colombo' };
    let userId = 'anonymous';
    let paymentMethod: 'cash_on_delivery' | 'payhere' = 'cash_on_delivery';
    let customerNotes = '';

    if (Array.isArray(cartItemsOrOptions)) {
      cartItems = cartItemsOrOptions;
      if (typeof userIdOrCustomerData === 'string') {
        userId = userIdOrCustomerData;
        if (customerDataParam) customerData = customerDataParam;
      } else if (userIdOrCustomerData && typeof userIdOrCustomerData === 'object') {
        customerData = userIdOrCustomerData;
      }
    } else if (cartItemsOrOptions && typeof cartItemsOrOptions === 'object') {
      cartItems = cartItemsOrOptions.cartItems || [];
      customerData = cartItemsOrOptions.customerData || customerData;
      userId = cartItemsOrOptions.userId || userId;
      paymentMethod = cartItemsOrOptions.paymentMethod || 'cash_on_delivery';
      customerNotes = cartItemsOrOptions.customerNotes || '';
    }

    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'Cart is empty. Please add items before checking out.' };
    }

    const adminDb = getAdminDb();

    // -------------------------------------------------------------------------
    // A. Server-Side Firebase Admin SDK Pessimistic Transaction
    // -------------------------------------------------------------------------
    if (adminDb) {
      const order = await adminDb.runTransaction(async (transaction) => {
        // STEP 1: READ PHASE (All reads MUST occur before any writes)
        const productSnapshots: Array<{
          ref: FirebaseFirestore.DocumentReference;
          docSnap: FirebaseFirestore.DocumentSnapshot;
          item: CartItemInput;
        }> = [];

        for (const item of cartItems) {
          const productId = item.productId || (item as any).id;
          if (!productId) {
            throw new Error('Invalid cart item: missing productId.');
          }
          const productRef = adminDb.collection('products').doc(productId);
          const docSnap = await transaction.get(productRef);
          productSnapshots.push({ ref: productRef, docSnap, item });
        }

        // STEP 2: VALIDATION PHASE (Stock Check)
        let subtotal = 0;
        const verifiedItems = [];

        for (const { ref, docSnap, item } of productSnapshots) {
          const productId = item.productId || (item as any).id;

          if (!docSnap.exists) {
            throw new Error(`Out of stock: Product "${item.name || productId}" no longer exists in store.`);
          }

          const productData = docSnap.data();
          const currentStock = Number(productData?.stock ?? 0);
          const requestedQty = Number(item.quantity || 1);

          if (productData?.active === false) {
            throw new Error(`Product "${productData?.name || item.name}" is currently unavailable.`);
          }

          if (currentStock < requestedQty) {
            throw new Error(`Out of stock: Insufficient inventory for "${productData?.name || item.name}". Only ${currentStock} remaining.`);
          }

          const unitPrice = Number(productData?.price ?? item.price ?? item.unitPrice ?? 0);
          const itemSubtotal = unitPrice * requestedQty;
          subtotal += itemSubtotal;

          verifiedItems.push({
            productId,
            name: productData?.name || item.name || 'Garment',
            image: productData?.images?.[0] || item.image || '',
            size: item.size || (productData?.sizes?.[0]) || 'M',
            color: item.color || (productData?.colors?.[0]) || '',
            quantity: requestedQty,
            unitPrice,
            subtotal: itemSubtotal,
          });
        }

        // STEP 3: WRITE PHASE (Updates & Order Creation)
        for (const { ref, docSnap, item } of productSnapshots) {
          const productData = docSnap.data();
          const currentStock = Number(productData?.stock ?? 0);
          const requestedQty = Number(item.quantity || 1);

          transaction.update(ref, {
            stock: currentStock - requestedQty,
            updatedAt: new Date(),
          });
        }

        const deliveryFee = 15.00;
        const total = subtotal + deliveryFee;
        const orderRef = adminDb.collection('orders').doc();
        const orderNumber = generateOrderNumber();

        const paymentStatus = paymentMethod === 'payhere' ? 'paid' : 'pending';

        const newOrder = {
          id: orderRef.id,
          orderNumber,
          userId: userId || 'anonymous',
          customer: {
            name: customerData.name || 'Guest',
            email: customerData.email || '',
            phone: customerData.phone || '',
            address: customerData.address || '',
            city: customerData.city || '',
            postalCode: customerData.postalCode || '',
          },
          items: verifiedItems,
          subtotal,
          deliveryFee,
          total,
          paymentMethod,
          paymentStatus,
          orderStatus: 'pending',
          customerNotes: customerNotes || '',
          adminNotes: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        transaction.set(orderRef, newOrder);
        return { orderId: orderRef.id, orderNumber };
      });

      return {
        success: true,
        orderId: order.orderId,
        orderNumber: order.orderNumber,
        message: 'Order processed successfully with atomic inventory update.',
      };
    }

    // -------------------------------------------------------------------------
    // B. Client SDK Fallback Transaction (If Admin SDK Service Account not configured)
    // -------------------------------------------------------------------------
    const orderResult = await clientRunTransaction(clientDb, async (transaction) => {
      // STEP 1: READ PHASE
      const productSnapshots = [];
      for (const item of cartItems) {
        const productId = item.productId || (item as any).id;
        const productRef = clientDoc(clientDb, 'products', productId);
        const docSnap = await transaction.get(productRef);
        productSnapshots.push({ ref: productRef, docSnap, item });
      }

      // STEP 2: VALIDATION PHASE
      let subtotal = 0;
      const verifiedItems = [];

      for (const { ref, docSnap, item } of productSnapshots) {
        const productId = item.productId || (item as any).id;

        if (!docSnap.exists()) {
          // Fallback calculation if doc doesn't exist yet in client Firestore
          const unitPrice = Number(item.price || item.unitPrice || 4000);
          const itemSubtotal = unitPrice * item.quantity;
          subtotal += itemSubtotal;
          verifiedItems.push({
            productId,
            name: item.name || 'Garment',
            image: item.image || '',
            size: item.size || 'M',
            color: item.color || '',
            quantity: item.quantity,
            unitPrice,
            subtotal: itemSubtotal,
          });
          continue;
        }

        const productData = docSnap.data();
        const currentStock = Number(productData?.stock ?? 0);
        const requestedQty = Number(item.quantity || 1);

        if (productData?.active === false) {
          throw new Error(`Product "${productData?.name || item.name}" is currently unavailable.`);
        }

        if (currentStock < requestedQty) {
          throw new Error(`Out of stock: Insufficient inventory for "${productData?.name || item.name}". Only ${currentStock} remaining.`);
        }

        const unitPrice = Number(productData?.price ?? item.price ?? item.unitPrice ?? 0);
        const itemSubtotal = unitPrice * requestedQty;
        subtotal += itemSubtotal;

        verifiedItems.push({
          productId,
          name: productData?.name || item.name || 'Garment',
          image: productData?.images?.[0] || item.image || '',
          size: item.size || 'M',
          color: item.color || '',
          quantity: requestedQty,
          unitPrice,
          subtotal: itemSubtotal,
        });

        transaction.update(ref, {
          stock: currentStock - requestedQty,
          updatedAt: serverTimestamp(),
        });
      }

      const deliveryFee = 15.00;
      const total = subtotal + deliveryFee;
      const orderRef = clientDoc(clientCollection(clientDb, 'orders'));
      const orderNumber = generateOrderNumber();

      const newOrder = {
        id: orderRef.id,
        orderNumber,
        userId: userId || 'anonymous',
        customer: {
          name: customerData.name || 'Guest',
          email: customerData.email || '',
          phone: customerData.phone || '',
          address: customerData.address || '',
          city: customerData.city || '',
          postalCode: customerData.postalCode || '',
        },
        items: verifiedItems,
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'payhere' ? 'paid' : 'pending',
        orderStatus: 'pending',
        customerNotes: customerNotes || '',
        adminNotes: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      transaction.set(orderRef, newOrder);
      return { orderId: orderRef.id, orderNumber };
    });

    return {
      success: true,
      orderId: orderResult.orderId,
      orderNumber: orderResult.orderNumber,
      message: 'Order processed successfully.',
    };

  } catch (error: any) {
    console.error('Atomic processCheckout error:', error);
    return {
      success: false,
      error: error?.message || 'Out of stock or system error occurred during checkout processing.',
    };
  }
}
