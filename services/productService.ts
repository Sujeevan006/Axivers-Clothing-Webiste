import { db } from '@/lib/firebase/client';
import { Product } from '@/types/product';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  query, 
  where, 
  limit,
  onSnapshot, 
  Unsubscribe 
} from 'firebase/firestore';
import { productsDatabase } from '@/app/data/products';

const PRODUCTS_COLLECTION = 'products';

/**
 * Checks whether a product record is a test or placeholder product that must be hidden.
 */
export function isPlaceholderOrTestProduct(raw: any): boolean {
  if (!raw) return true;
  const name = String(raw.name || '').trim().toLowerCase();
  const id = String(raw.id || '').trim().toLowerCase();
  const slug = String(raw.slug || '').trim().toLowerCase();

  return (
    name === 'test' ||
    name === 'test2' ||
    name === 'test3' ||
    name.startsWith('test ') ||
    name.startsWith('test2') ||
    name.startsWith('test3') ||
    name.startsWith('premium test') ||
    name.startsWith('placeholder') ||
    id.startsWith('test') ||
    slug.startsWith('test')
  );
}

/**
 * Normalizes and safely serializes Firestore document data into a clean Product object.
 * Maps legacy/variant fields, guards against missing arrays, and converts Timestamps to ISO strings.
 */
export function normalizeProduct(data: any, fallbackId?: string): Product {
  if (!data) return data;
  const raw = { ...data };

  // Convert Timestamps to serializable string or null
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

  // Schema normalization
  const id = raw.id || fallbackId || '';
  const isTest = isPlaceholderOrTestProduct({ ...raw, id });

  const images = Array.isArray(raw.images) && raw.images.length > 0 
    ? raw.images 
    : Array.isArray(raw.imagePaths) && raw.imagePaths.length > 0
    ? raw.imagePaths
    : ['/images/flagship-tee-black.jpg'];

  // Test records are always archived/draft and inactive for customer storefront
  const active = isTest ? false : Boolean(raw.active ?? raw.isActive ?? (raw.status === 'active'));
  const status = isTest ? 'draft' : (raw.status || (active ? 'active' : 'draft'));

  const price = Number(raw.price ?? raw.priceMinor) || 400000;
  const priceMinor = Number(raw.priceMinor ?? raw.price) || price;
  const compareAtPrice = Number(raw.compareAtPrice ?? raw.compareAtPriceMinor) || 0;
  const compareAtPriceMinor = Number(raw.compareAtPriceMinor ?? raw.compareAtPrice) || compareAtPrice;
  const category = raw.category || raw.categoryId || 'flagship';
  const categoryLabel = raw.categoryLabel || (typeof category === 'string' ? category.charAt(0).toUpperCase() + category.slice(1) : 'The Signature Essential');
  const sizes = Array.isArray(raw.sizes) && raw.sizes.length > 0 ? raw.sizes : ['S', 'M', 'L', 'XL'];
  const colors = Array.isArray(raw.colors) && raw.colors.length > 0 ? raw.colors : ['Onyx Black'];
  const stock = typeof raw.stock === 'number' ? raw.stock : 50;
  const currency = raw.currency || 'LKR';
  const gender = raw.gender || 'men';
  const isNewArrival = Boolean(raw.isNewArrival ?? raw.newArrival ?? raw.featured);
  const isBestSeller = Boolean(raw.isBestSeller ?? raw.bestSeller);
  const collectionSlug = raw.collectionSlug || raw.collection || category;
  const tags = Array.isArray(raw.tags) ? raw.tags : [];

  const normalized: Product = {
    id,
    name: raw.name || 'The Signature Essential Crewneck',
    slug: raw.slug || id,
    description: raw.description || '',
    tagline: raw.tagline || '',
    category,
    categoryLabel,
    gender,
    collectionSlug,
    isNewArrival,
    isBestSeller,
    tags,
    currency,
    price,
    priceMinor,
    compareAtPrice,
    compareAtPriceMinor,
    sizes,
    colors,
    stock,
    images,
    material: raw.material || '100% Mercerized Cotton',
    fabricSpec: raw.fabricSpec || '100% Mercerized Cotton Single Jersey Knit, 180 GSM.',
    careInstructions: raw.careInstructions || 'Machine wash cold gentle inside out. Reshape collar while damp. Flat dry in shade.',
    featured: Boolean(raw.featured),
    active,
    status,
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
  };

  return JSON.parse(JSON.stringify(normalized)) as Product;
}

/**
 * Serialize helper (alias of normalizeProduct for backward compatibility)
 */
export function serializeProduct(data: any): Product {
  return normalizeProduct(data);
}

/**
 * Real-time listener for active products.
 * CRITICAL: Every query MUST include where('active', '==', true) to comply with Firestore security rules.
 */
export function subscribeToActiveProducts(
  onProductsChange: (products: Product[]) => void,
  options?: {
    category?: string;
    featuredOnly?: boolean;
    gender?: string;
    isNewArrival?: boolean;
    isBestSeller?: boolean;
  }
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
      let products: Product[] = [];
      snapshot.forEach((docSnap) => {
        const p = normalizeProduct(docSnap.data(), docSnap.id);
        if (p.active && !isPlaceholderOrTestProduct(p)) {
          products.push(p);
        }
      });

      if (products.length === 0) {
        // Fallback to local products
        products = productsDatabase
          .filter(p => p.active && !isPlaceholderOrTestProduct(p))
          .filter(p => (options?.featuredOnly ? p.featured : true))
          .filter(p => (options?.category && options.category !== 'all' ? p.category === options.category : true))
          .map(p => normalizeProduct(p));
      }

      if (options?.gender && options.gender !== 'all') {
        products = products.filter(p => p.gender === options.gender || p.gender === 'unisex');
      }
      if (options?.isNewArrival) {
        products = products.filter(p => p.isNewArrival);
      }
      if (options?.isBestSeller) {
        products = products.filter(p => p.isBestSeller);
      }
      onProductsChange(products);
    },
    (error) => {
      console.warn('Firestore snapshot subscription using local database fallback:', error?.message);
      let fallback = productsDatabase
        .filter(p => p.active && !isPlaceholderOrTestProduct(p))
        .filter(p => (options?.featuredOnly ? p.featured : true))
        .filter(p => (options?.category && options.category !== 'all' ? p.category === options.category : true))
        .map(p => normalizeProduct(p));

      if (options?.gender && options.gender !== 'all') {
        fallback = fallback.filter(p => p.gender === options.gender || p.gender === 'unisex');
      }
      if (options?.isNewArrival) {
        fallback = fallback.filter(p => p.isNewArrival);
      }
      if (options?.isBestSeller) {
        fallback = fallback.filter(p => p.isBestSeller);
      }
      onProductsChange(fallback);
    }
  );
}

/**
 * Fetch products from Firestore with optional filtering.
 */
export async function getProducts(options?: {
  category?: string;
  activeOnly?: boolean;
  featuredOnly?: boolean;
  gender?: string;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}): Promise<Product[]> {
  try {
    const colRef = collection(db, PRODUCTS_COLLECTION);
    const constraints: any[] = [where('active', '==', true)];

    if (options?.featuredOnly) {
      constraints.push(where('featured', '==', true));
    }
    if (options?.category && options.category !== 'all') {
      constraints.push(where('category', '==', options.category));
    }

    const q = query(colRef, ...constraints);
    const snapshot = await getDocs(q);

    let products: Product[] = [];
    snapshot.forEach((docSnap) => {
      const p = normalizeProduct(docSnap.data(), docSnap.id);
      if (p.active && !isPlaceholderOrTestProduct(p)) {
        products.push(p);
      }
    });

    if (products.length === 0) {
      let fallback = productsDatabase
        .filter(p => p.active && !isPlaceholderOrTestProduct(p))
        .filter(p => (options?.featuredOnly ? p.featured : true))
        .filter(p => (options?.category && options.category !== 'all' ? p.category === options.category : true))
        .map(p => normalizeProduct(p));

      if (options?.gender && options.gender !== 'all') {
        fallback = fallback.filter(p => p.gender === options.gender || p.gender === 'unisex');
      }
      if (options?.isNewArrival) {
        fallback = fallback.filter(p => p.isNewArrival);
      }
      if (options?.isBestSeller) {
        fallback = fallback.filter(p => p.isBestSeller);
      }
      return fallback;
    }

    if (options?.gender && options.gender !== 'all') {
      products = products.filter(p => p.gender === options.gender || p.gender === 'unisex');
    }
    if (options?.isNewArrival) {
      products = products.filter(p => p.isNewArrival);
    }
    if (options?.isBestSeller) {
      products = products.filter(p => p.isBestSeller);
    }

    return products;
  } catch {
    return productsDatabase
      .filter(p => p.active && !isPlaceholderOrTestProduct(p))
      .filter(p => (options?.featuredOnly ? p.featured : true))
      .filter(p => (options?.category && options.category !== 'all' ? p.category === options.category : true))
      .map(p => normalizeProduct(p));
  }
}

/**
 * Fetch a single product by ID or slug.
 */
export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, idOrSlug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const p = normalizeProduct(data, docSnap.id);
      if (p.active && !isPlaceholderOrTestProduct(p)) {
        return p;
      }
    }

    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('active', '==', true),
      where('slug', '==', idOrSlug),
      limit(1)
    );
    const slugSnap = await getDocs(q);
    if (!slugSnap.empty) {
      const firstDoc = slugSnap.docs[0];
      const p = normalizeProduct(firstDoc.data(), firstDoc.id);
      if (p.active && !isPlaceholderOrTestProduct(p)) {
        return p;
      }
    }

    const local = productsDatabase.find(
      p => (p.id === idOrSlug || p.slug === idOrSlug) && p.active && !isPlaceholderOrTestProduct(p)
    );
    return local ? normalizeProduct(local) : null;
  } catch {
    const local = productsDatabase.find(
      p => (p.id === idOrSlug || p.slug === idOrSlug) && p.active && !isPlaceholderOrTestProduct(p)
    );
    return local ? normalizeProduct(local) : null;
  }
}
