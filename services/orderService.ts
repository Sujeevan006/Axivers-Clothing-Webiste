import { db } from '@/lib/firebase/client';
import { Order, OrderStatus, PaymentStatus } from '@/types/order';
import { Product } from '@/types/product';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  updateDoc, 
  serverTimestamp,
  runTransaction
} from 'firebase/firestore';

const ORDERS_COLLECTION = 'orders';
const PRODUCTS_COLLECTION = 'products';

/**
 * Generate a readable order number (e.g., AXV-84920)
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-5);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `AXV-${timestamp}${random.toString().slice(-2)}`;
}

/**
 * Fetch all orders for admin management
 */
export async function getOrders(): Promise<Order[]> {
  try {
    const colRef = collection(db, ORDERS_COLLECTION);
    const snapshot = await getDocs(colRef);

    const orders: Order[] = [];
    snapshot.forEach((docSnap) => {
      orders.push({
        id: docSnap.id,
        ...docSnap.data(),
      } as Order);
    });

    // Sort client-side by createdAt descending
    return orders.sort((a, b) => {
      const timeA = new Date(a.createdAt?.toDate ? a.createdAt.toDate() : a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt?.toDate ? b.createdAt.toDate() : b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

/**
 * Fetch single order by ID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Order;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching order ${id}:`, error);
    return null;
  }
}

/**
 * Update order status and payment status
 */
export async function updateOrderStatus(
  orderId: string, 
  orderStatus?: OrderStatus, 
  paymentStatus?: PaymentStatus,
  adminNotes?: string
): Promise<void> {
  try {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Order not found');

    const currentOrder = docSnap.data() as Order;
    const updates: any = { updatedAt: serverTimestamp() };

    if (orderStatus) updates.orderStatus = orderStatus;
    if (paymentStatus) updates.paymentStatus = paymentStatus;
    if (adminNotes !== undefined) updates.adminNotes = adminNotes;

    // Handle stock restoration on cancellation if moving to 'cancelled' status for the first time
    if (orderStatus === 'cancelled' && currentOrder.orderStatus !== 'cancelled') {
      await restoreOrderStock(currentOrder);
    }

    await updateDoc(docRef, updates);
  } catch (error) {
    console.error(`Error updating order status for ${orderId}:`, error);
    throw error;
  }
}

/**
 * Restores product stock when an order is cancelled
 */
async function restoreOrderStock(order: Order): Promise<void> {
  try {
    for (const item of order.items) {
      const productRef = doc(db, PRODUCTS_COLLECTION, item.productId);
      const productSnap = await getDoc(productRef);
      if (productSnap.exists()) {
        const product = productSnap.data() as Product;
        await updateDoc(productRef, {
          stock: (product.stock || 0) + item.quantity,
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.error('Error restoring stock on cancellation:', error);
  }
}
