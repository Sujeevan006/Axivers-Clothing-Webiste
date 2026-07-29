import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, setDoc, addDoc } from 'firebase/firestore';

export interface Product {
  id?: string;
  name: string;
  price: number;
  description: string;
  category?: string;
  images: string[];
}

const PRODUCTS_COLLECTION = 'products';

// Fetch all products from Firestore
export async function getProductsFromFirestore(): Promise<Product[]> {
  try {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products: Product[] = [];
    querySnapshot.forEach((docSnap) => {
      products.push({ id: docSnap.id, ...docSnap.data() } as Product);
    });
    return products;
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return [];
  }
}

// Fetch single product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

// Add a new product to Firestore
export async function addProductToFirestore(product: Omit<Product, 'id'>) {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), product);
    return docRef.id;
  } catch (error) {
    console.error('Error adding product to Firestore:', error);
    throw error;
  }
}
