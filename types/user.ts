import { Timestamp } from 'firebase/firestore';

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin';
  active: boolean;
  createdAt?: Timestamp | string;
}
