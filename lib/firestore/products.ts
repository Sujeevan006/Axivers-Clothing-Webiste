import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query, where } from 'firebase/firestore';
import type { Product } from '@/types/product';
import { normalizeProduct } from '@/services/productService';

const PRODUCTS_COLLECTION = 'products';

// Fetch all active products from Firestore
export async function getProductsFromFirestore(): Promise<Product[]> {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), where('active', '==', true));
    const querySnapshot = await getDocs(q);
    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push(normalizeProduct(docSnap.data(), docSnap.id));
    });
    return products;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

// Fetch single active product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists() && docSnap.data().active !== false) {
      return normalizeProduct(docSnap.data(), docSnap.id);
    }
    return null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}
