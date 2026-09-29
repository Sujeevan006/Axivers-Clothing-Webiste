"use server";

import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { db as clientDb } from '@/lib/firebase/client';
import { doc as clientDoc, getDoc as clientGetDoc, collection as clientCollection, query as clientQuery, where as clientWhere, getDocs as clientGetDocs, limit as clientLimit } from 'firebase/firestore';

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
        console.error('Firebase Admin cert init error:', error);
      }
    } else {
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

function normalizePhone(p?: string): string {
  if (!p) return '';
  return p.replace(/[\s\-\+\(\)]/g, '').replace(/^94/, '0').trim();
}

function serializeTimestamp(ts: any): string | null {
  if (!ts) return null;
  if (typeof ts === 'string') return ts;
  if (typeof ts.toDate === 'function') {
    return ts.toDate().toISOString();
  }
  if (ts.seconds !== undefined) {
    return new Date(ts.seconds * 1000).toISOString();
  }
  if (ts._seconds !== undefined) {
    return new Date(ts._seconds * 1000).toISOString();
  }
  return null;
}

export interface TrackOrderResponse {
  success: boolean;
  order?: any;
  events?: any[];
  error?: string;
}

/**
 * Server Action: trackCustomerOrder
 * Securely verifies orderNumber and customer phone/email
 */
export async function trackCustomerOrder(
  orderNumber: string,
  phoneOrEmail: string
): Promise<TrackOrderResponse> {
  try {
    const cleanOrderNumber = orderNumber?.trim().toUpperCase();
    const cleanIdentifier = phoneOrEmail?.trim().toLowerCase();

    if (!cleanOrderNumber || !cleanIdentifier) {
      return { success: false, error: 'Please enter both your Order Number and Phone Number/Email.' };
    }

    const adminDb = getAdminDb();
    let orderDocData: any = null;
    let orderDocId: string = '';
    let eventsList: any[] = [];

    // Path A: Admin SDK available
    if (adminDb) {
      // 1. Query by orderNumber field
      const ordersRef = adminDb.collection('orders');
      const qSnap = await ordersRef.where('orderNumber', '==', cleanOrderNumber).limit(1).get();

      if (!qSnap.empty) {
        const docSnap = qSnap.docs[0];
        orderDocData = docSnap.data();
        orderDocId = docSnap.id;
      } else {
        // Fallback: try by document ID
        const docSnap = await ordersRef.doc(cleanOrderNumber).get();
        if (docSnap.exists) {
          orderDocData = docSnap.data();
          orderDocId = docSnap.id;
        }
      }

      if (orderDocData && orderDocId) {
        // Fetch customer-visible events from subcollection
        try {
          const eventsSnap = await adminDb
            .collection('orders')
            .doc(orderDocId)
            .collection('events')
            .where('customerVisible', '==', true)
            .get();

          eventsList = eventsSnap.docs.map(d => {
            const dData = d.data();
            return {
              id: d.id,
              status: dData.status || 'pending',
              description: dData.description || '',
              actor: dData.actor || 'System',
              timestamp: serializeTimestamp(dData.timestamp),
            };
          });
        } catch (evErr) {
          console.warn('Could not fetch events via Admin SDK:', evErr);
        }
      }
    } else {
      // Path B: Client SDK Fallback
      try {
        const colRef = clientCollection(clientDb, 'orders');
        const q = clientQuery(colRef, clientWhere('orderNumber', '==', cleanOrderNumber), clientLimit(1));
        const qSnap = await clientGetDocs(q);

        if (!qSnap.empty) {
          const docSnap = qSnap.docs[0];
          orderDocData = docSnap.data();
          orderDocId = docSnap.id;
        } else {
          const directSnap = await clientGetDoc(clientDoc(clientDb, 'orders', cleanOrderNumber));
          if (directSnap.exists()) {
            orderDocData = directSnap.data();
            orderDocId = directSnap.id;
          }
        }

        if (orderDocId) {
          try {
            const evCol = clientCollection(clientDb, 'orders', orderDocId, 'events');
            const evSnap = await clientGetDocs(evCol);
            eventsList = evSnap.docs
              .map(d => {
                const dData = d.data();
                return {
                  id: d.id,
                  status: dData.status || 'pending',
                  description: dData.description || '',
                  customerVisible: dData.customerVisible !== false,
                  timestamp: serializeTimestamp(dData.timestamp),
                };
              })
              .filter(e => e.customerVisible);
          } catch (evErr) {
            console.warn('Could not fetch events via client SDK:', evErr);
          }
        }
      } catch (clientErr: any) {
        console.error('Error fetching order via client SDK:', clientErr);
        return {
          success: false,
          error: 'Unable to locate order. Please ensure the Order Number and contact details are correct.',
        };
      }
    }

    if (!orderDocData) {
      return {
        success: false,
        error: `No order found with number "${cleanOrderNumber}". Please verify and try again.`,
      };
    }

    // Verify phone or email match
    const orderPhone = normalizePhone(orderDocData.customer?.phone);
    const orderEmail = (orderDocData.customer?.email || '').toLowerCase().trim();
    const inputPhone = normalizePhone(cleanIdentifier);
    const inputEmail = cleanIdentifier;

    const phoneMatches = orderPhone && inputPhone && (orderPhone.includes(inputPhone) || inputPhone.includes(orderPhone));
    const emailMatches = orderEmail && inputEmail && orderEmail === inputEmail;

    if (!phoneMatches && !emailMatches) {
      return {
        success: false,
        error: 'The provided phone number or email does not match our records for this order.',
      };
    }

    // Build default event if no subcollection events found
    if (eventsList.length === 0) {
      eventsList.push({
        id: 'initial',
        status: orderDocData.orderStatus || 'pending',
        description: `Order placed (${orderDocData.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : orderDocData.paymentMethod === 'payhere' ? 'PayHere' : 'Cash on Delivery'}).`,
        timestamp: serializeTimestamp(orderDocData.createdAt),
      });
    }

    // Sort events chronologically
    eventsList.sort((a, b) => {
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : 0;
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : 0;
      return timeA - timeB;
    });

    const serializedOrder = {
      id: orderDocId,
      orderNumber: orderDocData.orderNumber || cleanOrderNumber,
      customer: {
        name: orderDocData.customer?.name || 'Customer',
        phone: orderDocData.customer?.phone || '',
        email: orderDocData.customer?.email || '',
        address: orderDocData.customer?.address || '',
        city: orderDocData.customer?.city || '',
      },
      items: Array.isArray(orderDocData.items) ? orderDocData.items : [],
      currency: orderDocData.currency || 'LKR',
      subtotal: Number(orderDocData.subtotal) || 0,
      deliveryFee: Number(orderDocData.deliveryFee) || 0,
      total: Number(orderDocData.total) || 0,
      paymentMethod: orderDocData.paymentMethod || 'cash_on_delivery',
      paymentStatus: orderDocData.paymentStatus || 'pending',
      orderStatus: orderDocData.orderStatus || 'pending',
      customerNotes: orderDocData.customerNotes || '',
      createdAt: serializeTimestamp(orderDocData.createdAt),
      updatedAt: serializeTimestamp(orderDocData.updatedAt),
    };

    return {
      success: true,
      order: serializedOrder,
      events: eventsList,
    };

  } catch (error: any) {
    console.error('Track order server error:', error);
    return {
      success: false,
      error: error?.message || 'Failed to retrieve order details. Please try again later.',
    };
  }
}
