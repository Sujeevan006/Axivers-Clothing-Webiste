"use server";

import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { db as clientDb } from '@/lib/firebase/client';
import { 
  doc as clientDoc, 
  collection as clientCollection, 
  setDoc as clientSetDoc, 
  addDoc as clientAddDoc, 
  getDoc as clientGetDoc,
  serverTimestamp as clientServerTimestamp 
} from 'firebase/firestore';
import { toMinorUnits, fromMinorUnits } from '@/lib/utils/formatters';
import { DEFAULT_STORE_SETTINGS, normalizeStoreSettings, calculateDeliveryFee } from '@/services/settingsService';
import type { PaymentMethod, OrderStatus, PaymentStatus } from '@/types/order';

// -----------------------------------------------------------------------------
// 1. Firebase Admin SDK Initialization (Single-Instance Pattern)
// -----------------------------------------------------------------------------
function getAdminDb() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID || process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL;
    const rawPrivateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY;

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
      // If full credentials are not provided, do not crash; return null to trigger safe fallback
      return null;
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
  paymentMethod?: PaymentMethod;
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
    let customerData: CustomerInput = { name: 'Guest', phone: '', address: '', city: 'Colombo' };
    let userId: string | null = null;
    let paymentMethod: PaymentMethod = 'cash_on_delivery';
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
      userId = cartItemsOrOptions.userId || null;
      paymentMethod = cartItemsOrOptions.paymentMethod || 'cash_on_delivery';
      customerNotes = cartItemsOrOptions.customerNotes || '';
    }

    if (!cartItems || cartItems.length === 0) {
      return { success: false, error: 'Cart is empty. Please add items before checking out.' };
    }

    if (!customerData.name?.trim() || !customerData.phone?.trim() || !customerData.address?.trim()) {
      return { success: false, error: 'Please provide required contact and shipping details.' };
    }

    const adminDb = getAdminDb();

    // -------------------------------------------------------------------------
    // Step 1: Read Store Settings & Verify ordersEnabled
    // -------------------------------------------------------------------------
    let storeSettings = DEFAULT_STORE_SETTINGS;
    if (adminDb) {
      try {
        const settingsSnap = await adminDb.collection('settings').doc('store').get();
        if (settingsSnap.exists) {
          storeSettings = normalizeStoreSettings(settingsSnap.data());
        }
      } catch (err) {
        console.warn('Error reading store settings via Admin SDK:', err);
      }
    } else {
      try {
        const settingsSnap = await clientGetDoc(clientDoc(clientDb, 'settings', 'store'));
        if (settingsSnap.exists()) {
          storeSettings = normalizeStoreSettings(settingsSnap.data());
        }
      } catch (err) {
        console.warn('Error reading store settings via Client SDK:', err);
      }
    }

    if (storeSettings.ordersEnabled === false) {
      return {
        success: false,
        error: 'We are currently not accepting new orders due to maintenance.',
      };
    }

    // -------------------------------------------------------------------------
    // Path A: Server-Side Firebase Admin SDK Pessimistic Stock Transaction
    // -------------------------------------------------------------------------
    if (adminDb) {
      const order = await adminDb.runTransaction(async (transaction) => {
        // READ PHASE: Read all product documents first
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

        // VALIDATION PHASE: Verify inventory & calculate integer minor unit totals
        let subtotal = 0;
        const verifiedItems = [];

        for (const { ref, docSnap, item } of productSnapshots) {
          const productId = item.productId || (item as any).id;

          if (!docSnap.exists) {
            throw new Error(`Product "${item.name || productId}" is no longer available in store.`);
          }

          const productData = docSnap.data();
          const currentStock = Number(productData?.stock ?? 0);
          const requestedQty = Number(item.quantity || 1);

          if (productData?.active === false) {
            throw new Error(`Product "${productData?.name || item.name}" is currently inactive.`);
          }

          if (currentStock < requestedQty) {
            throw new Error(`Insufficient inventory for "${productData?.name || item.name}". Only ${currentStock} remaining.`);
          }

          // Price stored in minor units (e.g. 400000 = LKR 4,000.00)
          let unitPrice = Number(productData?.price ?? productData?.priceMinor ?? item.unitPrice ?? item.price ?? 0);
          if (unitPrice > 0 && unitPrice < 10000) {
            unitPrice = unitPrice * 100; // normalize to minor units if legacy major units
          }

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

        // WRITE PHASE: Atomic Stock Deductions
        for (const { ref, docSnap, item } of productSnapshots) {
          const productData = docSnap.data();
          const currentStock = Number(productData?.stock ?? 0);
          const requestedQty = Number(item.quantity || 1);

          transaction.update(ref, {
            stock: Math.max(0, currentStock - requestedQty),
            updatedAt: FieldValue.serverTimestamp(),
          });
        }

        // Calculate dynamic delivery fee (in minor units)
        const deliveryFee = calculateDeliveryFee(subtotal, storeSettings);
        const total = subtotal + deliveryFee;

        const orderRef = adminDb.collection('orders').doc();
        const orderNumber = generateOrderNumber();
        const initialPaymentStatus: PaymentStatus = paymentMethod === 'payhere' ? 'paid' : 'pending';
        const initialOrderStatus: OrderStatus = 'pending';

        const newOrder = {
          id: orderRef.id,
          orderNumber,
          customerId: userId,
          userId: userId || null,
          isGuest: !userId || userId === 'guest' || userId === 'anonymous',
          customer: {
            name: customerData.name.trim(),
            email: customerData.email?.trim() || '',
            phone: customerData.phone.trim(),
            address: customerData.address.trim(),
            city: customerData.city?.trim() || 'Colombo',
            postalCode: customerData.postalCode?.trim() || '',
          },
          items: verifiedItems,
          currency: 'LKR',
          subtotal,
          deliveryFee,
          total,
          paymentMethod,
          paymentStatus: initialPaymentStatus,
          orderStatus: initialOrderStatus,
          customerNotes: customerNotes?.trim() || '',
          adminNotes: '',
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        };

        transaction.set(orderRef, newOrder);

        // Initial Lifecycle Event
        const eventRef = orderRef.collection('events').doc();
        transaction.set(eventRef, {
          orderId: orderRef.id,
          status: initialOrderStatus,
          description: `Order placed by customer on web storefront (${paymentMethod === 'bank_transfer' ? 'Bank Transfer' : paymentMethod === 'payhere' ? 'PayHere Online' : 'Cash on Delivery'}).`,
          actor: customerData.name.trim(),
          actorRole: 'customer',
          customerVisible: true,
          timestamp: FieldValue.serverTimestamp(),
        });

        return { orderId: orderRef.id, orderNumber };
      });

      return {
        success: true,
        orderId: order.orderId,
        orderNumber: order.orderNumber,
        message: 'Order placed successfully with verified inventory.',
      };
    }

    // -------------------------------------------------------------------------
    // Path B: Client/Server Fallback (If Firebase Admin Credentials not in .env.local)
    // CRITICAL: Clients cannot write to /products/{id}.
    // We record the order in /orders (allowed by rules) and flag it for admin confirmation.
    // -------------------------------------------------------------------------
    let subtotal = 0;
    const verifiedItems = [];

    for (const item of cartItems) {
      const productId = item.productId || (item as any).id;
      let unitPrice = Number(item.price || item.unitPrice || 4000);
      if (unitPrice > 0 && unitPrice < 10000) {
        unitPrice = unitPrice * 100; // convert to minor units
      }

      // Check if product document is readable to get real price and active status
      try {
        const prodSnap = await clientGetDoc(clientDoc(clientDb, 'products', productId));
        if (prodSnap.exists()) {
          const pData = prodSnap.data();
          if (pData.active === false) {
            throw new Error(`Product "${pData.name || item.name}" is currently inactive.`);
          }
          let fetchedPrice = Number(pData.price ?? pData.priceMinor ?? unitPrice);
          if (fetchedPrice > 0 && fetchedPrice < 10000) fetchedPrice = fetchedPrice * 100;
          unitPrice = fetchedPrice;
        }
      } catch (e: any) {
        if (e?.message?.includes('inactive')) throw e;
        console.warn('Could not read product via client SDK during fallback checkout:', e);
      }

      const itemQty = Number(item.quantity || 1);
      const itemSubtotal = unitPrice * itemQty;
      subtotal += itemSubtotal;

      verifiedItems.push({
        productId,
        name: item.name || 'Garment',
        image: item.image || '',
        size: item.size || 'M',
        color: item.color || '',
        quantity: itemQty,
        unitPrice,
        subtotal: itemSubtotal,
      });
    }

    const deliveryFee = calculateDeliveryFee(subtotal, storeSettings);
    const total = subtotal + deliveryFee;

    const orderRef = clientDoc(clientCollection(clientDb, 'orders'));
    const orderNumber = generateOrderNumber();
    const initialPaymentStatus: PaymentStatus = paymentMethod === 'payhere' ? 'paid' : 'pending';
    const initialOrderStatus: OrderStatus = 'pending';

    const newOrder = {
      id: orderRef.id,
      orderNumber,
      customerId: userId,
      userId: userId || null,
      isGuest: !userId || userId === 'guest' || userId === 'anonymous',
      customer: {
        name: customerData.name.trim(),
        email: customerData.email?.trim() || '',
        phone: customerData.phone.trim(),
        address: customerData.address.trim(),
        city: customerData.city?.trim() || 'Colombo',
        postalCode: customerData.postalCode?.trim() || '',
      },
      items: verifiedItems,
      currency: 'LKR' as const,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: initialPaymentStatus,
      orderStatus: initialOrderStatus,
      customerNotes: customerNotes?.trim() || '',
      adminNotes: 'Order created via storefront client fallback. Stock deduction pending manual confirmation.',
      stockDeductionPending: true,
      createdAt: clientServerTimestamp(),
      updatedAt: clientServerTimestamp(),
    };

    // Write the order document
    await clientSetDoc(orderRef, newOrder);

    // Write the initial event in /orders/{orderId}/events subcollection
    try {
      const eventColRef = clientCollection(clientDb, 'orders', orderRef.id, 'events');
      await clientAddDoc(eventColRef, {
        orderId: orderRef.id,
        status: initialOrderStatus,
        description: `Order placed by customer on web storefront (${paymentMethod === 'bank_transfer' ? 'Bank Transfer' : paymentMethod === 'payhere' ? 'PayHere Online' : 'Cash on Delivery'}).`,
        actor: customerData.name.trim(),
        actorRole: 'customer',
        customerVisible: true,
        timestamp: clientServerTimestamp(),
      });
    } catch (eventErr) {
      console.warn('Could not record initial event in subcollection:', eventErr);
    }

    return {
      success: true,
      orderId: orderRef.id,
      orderNumber,
      message: 'Order placed successfully.',
    };

  } catch (error: any) {
    console.error('Checkout processing error:', error);
    return {
      success: false,
      error: error?.message || 'Out of stock or system error occurred during checkout processing.',
    };
  }
}
