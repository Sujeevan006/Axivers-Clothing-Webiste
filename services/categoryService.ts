import { db } from '@/lib/firebase/client';
import { Category } from '@/types/category';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';

const CATEGORIES_COLLECTION = 'categories';

/**
 * Baseline fallback categories to ensure storefront UI remains fully functional
 * if the Firestore categories collection is initially empty.
 */
export const BASELINE_CATEGORIES: Category[] = [
  {
    id: 'men',
    slug: 'men',
    name: "Men's Collection",
    description: 'Tailored athletic fit & heavy drape',
    active: true,
    sortOrder: 1,
    image: '/images/pdp_front.jpg',
  },
  {
    id: 'women',
    slug: 'women',
    name: "Women's Collection",
    description: 'Sculpted silhouettes & breathable modal',
    active: true,
    sortOrder: 2,
    image: '/images/pdp_white_piping.jpg',
  },
  {
    id: 'flagship',
    slug: 'flagship',
    name: 'Flagship Piping',
    description: 'Signature inserted piping & crewneck cuts',
    active: true,
    sortOrder: 3,
    image: '/images/pdp_detail.jpg',
  },
  {
    id: 'minimalist',
    slug: 'minimalist',
    name: 'Minimalist Essentials',
    description: 'Subtle branding, monochrome aesthetics',
    active: true,
    sortOrder: 4,
    image: '/images/pdp_boxy_black.jpg',
  },
  {
    id: 'technical',
    slug: 'technical',
    name: 'Technical Garments',
    description: 'Moisture-wicking modal & high GSM structure',
    active: true,
    sortOrder: 5,
    image: '/images/pdp_polo_black.jpg',
  },
];

/**
 * Normalizes Firestore category document
 */
export function normalizeCategory(data: any, docId: string): Category {
  return {
    id: docId || data.id,
    name: data.name || 'Category',
    slug: data.slug || docId,
    description: data.description || '',
    active: data.active !== undefined ? Boolean(data.active) : true,
    sortOrder: typeof data.sortOrder === 'number' ? data.sortOrder : 99,
    image: data.image || '/images/pdp_front.jpg',
  };
}

/**
 * Fetch all active categories from Firestore ordered by sortOrder
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const colRef = collection(db, CATEGORIES_COLLECTION);
    const q = query(colRef, where('active', '==', true), orderBy('sortOrder', 'asc'));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return BASELINE_CATEGORIES;
    }

    const categories: Category[] = [];
    snapshot.forEach((docSnap) => {
      categories.push(normalizeCategory(docSnap.data(), docSnap.id));
    });

    return categories.length > 0 ? categories : BASELINE_CATEGORIES;
  } catch (error) {
    console.warn('Error fetching categories from Firestore, falling back to baseline:', error);
    return BASELINE_CATEGORIES;
  }
}

/**
 * Subscribe to real-time updates for active categories
 */
export function subscribeToCategories(
  onCategoriesChange: (categories: Category[]) => void
): Unsubscribe {
  try {
    const colRef = collection(db, CATEGORIES_COLLECTION);
    const q = query(colRef, where('active', '==', true), orderBy('sortOrder', 'asc'));

    return onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          onCategoriesChange(BASELINE_CATEGORIES);
          return;
        }
        const categories: Category[] = [];
        snapshot.forEach((docSnap) => {
          categories.push(normalizeCategory(docSnap.data(), docSnap.id));
        });
        onCategoriesChange(categories.length > 0 ? categories : BASELINE_CATEGORIES);
      },
      (error) => {
        console.warn('Categories subscription error, using baseline fallback:', error);
        onCategoriesChange(BASELINE_CATEGORIES);
      }
    );
  } catch (error) {
    console.warn('Failed to initialize categories snapshot listener:', error);
    onCategoriesChange(BASELINE_CATEGORIES);
    return () => {};
  }
}
