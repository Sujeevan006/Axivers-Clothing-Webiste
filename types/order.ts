import { Timestamp } from 'firebase/firestore';

export interface OrderCustomer {
  name: string;
  email?: string;
  phone: string;
  address: string;
  city: string;
  postalCode?: string;
}

export interface OrderItem {
  productId: string;
  sku?: string;
  name: string;
  image?: string;
  size?: string;
  color?: string;
  quantity: number;
  unitPrice: number;           // Minor units (e.g. 400000)
  subtotal: number;            // Minor units (unitPrice * quantity)
}

export type PaymentMethod = 'cash_on_delivery' | 'payhere' | 'bank_transfer';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderEvent {
  id?: string;
  orderId: string;
  status: OrderStatus;
  description: string;
  actor: string;
  actorRole: 'customer' | 'admin' | 'system';
  customerVisible: boolean;
  timestamp: Timestamp | string | any;
}

export interface Order {
  id?: string;
  orderNumber: string;           // "AXV-XXXXX"
  customerId?: string | null;
  userId?: string | null;
  isGuest: boolean;
  customer: OrderCustomer;
  items: OrderItem[];
  currency: 'LKR';
  subtotal: number;              // Minor units
  deliveryFee: number;           // Minor units
  total: number;                 // Minor units (subtotal + deliveryFee - discount)
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  customerNotes?: string;
  adminNotes?: string;
  stockDeductionPending?: boolean;
  createdAt?: Timestamp | string | any;
  updatedAt?: Timestamp | string | any;
}
