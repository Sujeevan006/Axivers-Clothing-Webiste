import { db } from '@/lib/firebase/client';
import { Product } from '@/types/product';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  limit,
  onSnapshot,
  Unsubscribe
} from 'firebase/firestore';
import { productsDatabase } from '@/app/data/products';

const PRODUCTS_COLLECTION = 'products';

/**
 * Safely converts Firestore Timestamp objects into plain serializable primitives for RSC compliance
 */
export function serializeProduct(data: any): Product {
  if (!data) return data;
  const raw = { ...data };

  if (raw.createdAt && typeof raw.createdAt === 'object') {
    if (typeof raw.createdAt.toDate === 'function') {
      raw.createdAt = raw.createdAt.toDate().toISOString();
    } else if (raw.createdAt.seconds !== undefined) {
      raw.createdAt = new Date(raw.createdAt.seconds * 1000).toISOString();
    } else {
      raw.createdAt = null;
    }
  }

  if (raw.updatedAt && typeof raw.updatedAt === 'object') {
    if (typeof raw.updatedAt.toDate === 'function') {
      raw.updatedAt = raw.updatedAt.toDate().toISOString();
    } else if (raw.updatedAt.seconds !== undefined) {
      raw.updatedAt = new Date(raw.updatedAt.seconds * 1000).toISOString();
    } else {
      raw.updatedAt = null;
    }
  }

  // Double-pass JSON cycle to ensure absolute plain object (no toJSON methods or class prototypes)
  return JSON.parse(JSON.stringify(raw)) as Product;
}

/**
 * Seed initial products into Firestore if the collection is empty
 */
export async function seedProductsIfEmpty(): Promise<void> {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const snap = await getDocs(query(colRef, limit(1)));
    if (snap.empty) {
      console.log('Seeding initial products into Firestore...');
      for (const p of productsDatabase) {
        const { id, ...data } = p;
        await setDoc(doc(db, PRODUCTS_COLLECTION, id), {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }
  } catch (err) {
    console.warn('Auto-seed attempt failed or skipped:', err);
  }
}

/**
 * Real-time listener for active products
 */
export function subscribeToActiveProducts(
  onProductsChange: (products: Product[]) => void,
  options?: { category?: string; featuredOnly?: boolean }
): Unsubscribe {
  const colRef = collection(db, PRODUCTS_COLLECTION);
  const constraints: any[] = [where('active', '==', true)];

  if (options?.featuredOnly) {
    constraints.push(where('featured', '==', true));
  }
  if (options?.category && options.category !== 'all') {
    constraints.push(where('category', '==', options.category));
  }

  const q = query(colRef, ...constraints);

  return onSnapshot(
    q,
    (snapshot) => {
      const products: Product[] = [];
      snapshot.forEach((docSnap) => {
        products.push(serializeProduct({ id: docSnap.id, ...docSnap.data() }));
      });
      onProductsChange(products);
    },
    (error) => {
      console.error('Error listening to products snapshot:', error);
      onProductsChange(productsDatabase.filter(p => p.active).map(serializeProduct));
    }
  );
}

/**
 * Fetch products from Firestore with optional filtering
 */
export async function getProducts(options?: {
  category?: string;
  activeOnly?: boolean;
  featuredOnly?: boolean;
}): Promise<Product[]> {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const constraints: any[] = [];

    if (options?.activeOnly) {
      constraints.push(where('active', '==', true));
    }
    if (options?.featuredOnly) {
      constraints.push(where('featured', '==', true));
    }
    if (options?.category && options.category !== 'all') {
      constraints.push(where('category', '==', options.category));
    }

    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);

    const products: Product[] = [];
    snapshot.forEach((docSnap) => {
      products.push(serializeProduct({ id: docSnap.id, ...docSnap.data() }));
    });

    if (products.length === 0 && (!options?.category || options.category === 'all')) {
      seedProductsIfEmpty();
      return productsDatabase
        .filter(p => options?.activeOnly ? p.active : true)
        .map(serializeProduct);
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return productsDatabase
      .filter(p => options?.activeOnly ? p.active : true)
      .map(serializeProduct);
  }
}

/**
 * Fetch a single product by ID or slug
 */
export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  try {
    // First try document ID lookup
    const docRef = doc(db, PRODUCTS_COLLECTION, idOrSlug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return serializeProduct({ id: docSnap.id, ...docSnap.data() });
    }

    // Secondary try slug lookup
    const q = query(collection(db, PRODUCTS_COLLECTION), where('slug', '==', idOrSlug), limit(1));
    const slugSnap = await getDocs(q);
    if (!slugSnap.empty) {
      const firstDoc = slugSnap.docs[0];
      return serializeProduct({ id: firstDoc.id, ...firstDoc.data() });
    }

    // Fallback to local productsDatabase
    const local = productsDatabase.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    return local ? serializeProduct(local) : null;
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    const local = productsDatabase.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    return local ? serializeProduct(local) : null;
  }
}

/**
 * Create a new product in Firestore
 */
export async function createProduct(productData: Omit<Product, 'id'>, customId?: string): Promise<string> {
  try {
    const dataToSave = {
      ...productData,
      featured: productData.featured ?? false,
      active: productData.active ?? true,
      stock: Number(productData.stock) || 0,
      price: Number(productData.price) || 0,
      compareAtPrice: productData.compareAtPrice ? Number(productData.compareAtPrice) : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    if (customId) {
      await setDoc(doc(db, PRODUCTS_COLLECTION, customId), dataToSave);
      return customId;
    } else {
      const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), dataToSave);
      return docRef.id;
    }
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

/**
 * Update an existing product
 */
export async function updateProduct(id: string, productData: Partial<Product>): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const dataToUpdate = {
      ...productData,
      updatedAt: serverTimestamp(),
    };
    if (dataToUpdate.stock !== undefined) dataToUpdate.stock = Number(dataToUpdate.stock);
    if (dataToUpdate.price !== undefined) dataToUpdate.price = Number(dataToUpdate.price);

    await updateDoc(docRef, dataToUpdate);
  } catch (error) {
    console.error(`Error updating product ${id}:`, error);
    throw error;
  }
}

/**
 * Delete a product from Firestore
 */
export async function deleteProduct(id: string): Promise<void> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
}


