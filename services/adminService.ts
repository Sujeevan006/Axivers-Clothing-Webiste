import { db } from '@/lib/firebase/client';
import { doc, getDoc, setDoc, serverTimestamp, collection, getDocs, limit, query } from 'firebase/firestore';
import { User } from 'firebase/auth';

const ADMINS_COLLECTION = 'admins';

/**
 * Checks whether a given user is an admin
 */
export async function checkIsAdmin(user: User | null): Promise<boolean> {
  if (!user) return false;

  try {
    // 1. Check custom claim first if available
    const idTokenResult = await user.getIdTokenResult(true);
    if (idTokenResult.claims.admin === true || idTokenResult.claims.role === 'admin') {
      return true;
    }

    // 2. Check `admins/{uid}` document in Firestore
    const adminDocRef = doc(db, ADMINS_COLLECTION, user.uid);
    const adminDoc = await getDoc(adminDocRef);

    if (adminDoc.exists() && adminDoc.data()?.active !== false) {
      return true;
    }

    // Fallback: If no admins exist yet in the database, authorize the first signed-in user as initial admin for setup
    const isFirstAdmin = await isAdminsCollectionEmpty();
    if (isFirstAdmin) {
      await setDoc(adminDocRef, {
        email: user.email || '',
        role: 'admin',
        active: true,
        createdAt: serverTimestamp(),
      });
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
}

/**
 * Checks if the admins collection is empty (useful for initial setup)
 */
async function isAdminsCollectionEmpty(): Promise<boolean> {
  try {
    const q = query(collection(db, ADMINS_COLLECTION), limit(1));
    const snap = await getDocs(q);
    return snap.empty;
  } catch {
    return false;
  }
}
