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
  const images = Array.isArray(raw.images) && raw.images.length > 0 
    ? raw.images 
    : Array.isArray(raw.imagePaths) && raw.imagePaths.length > 0
    ? raw.imagePaths
    : ['/images/pdp_front.jpg'];

  const active = Boolean(raw.active ?? raw.isActive ?? (raw.status === 'active'));
  const price = Number(raw.price ?? raw.priceMinor) || 0;
  const priceMinor = Number(raw.priceMinor ?? raw.price) || price;
  const compareAtPrice = Number(raw.compareAtPrice ?? raw.compareAtPriceMinor) || 0;
  const compareAtPriceMinor = Number(raw.compareAtPriceMinor ?? raw.compareAtPrice) || compareAtPrice;
  const category = raw.category || raw.categoryId || 'general';
  const categoryLabel = raw.categoryLabel || (typeof category === 'string' ? category.charAt(0).toUpperCase() + category.slice(1) : 'General');
  const sizes = Array.isArray(raw.sizes) && raw.sizes.length > 0 ? raw.sizes : ['S', 'M', 'L', 'XL'];
  const colors = Array.isArray(raw.colors) ? raw.colors : [];
  const stock = typeof raw.stock === 'number' ? raw.stock : 0;
  const currency = raw.currency || 'LKR';
  const gender = raw.gender || (category === 'women' ? 'women' : category === 'men' ? 'men' : 'unisex');
  const isNewArrival = Boolean(raw.isNewArrival ?? raw.newArrival ?? raw.featured);
  const isBestSeller = Boolean(raw.isBestSeller ?? raw.bestSeller);
  const collectionSlug = raw.collectionSlug || raw.collection || category;
  const tags = Array.isArray(raw.tags) ? raw.tags : [];

  const normalized: Product = {
    id,
    name: raw.name || 'Axivers Garment',
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
    material: raw.material || '',
    fabricSpec: raw.fabricSpec || '',
    careInstructions: raw.careInstructions || '',
    featured: Boolean(raw.featured),
    active,
    status: raw.status || (active ? 'active' : 'draft'),
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
  // CRITICAL: where('active', '==', true) must always be present
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
        products.push(normalizeProduct(docSnap.data(), docSnap.id));
      });
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
      console.error('Error listening to products snapshot:', error);
      // Fallback to local products
      let fallback = productsDatabase
        .filter(p => p.active)
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
 * CRITICAL: Every query explicitly filters where('active', '==', true) to prevent permission-denied errors.
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
    // CRITICAL: Always filter active == true on the storefront
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
      products.push(normalizeProduct(docSnap.data(), docSnap.id));
    });

    if (products.length === 0) {
      // Return local database fallback (normalized)
      let fallback = productsDatabase
        .filter(p => p.active)
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
  } catch (error) {
    console.error('Error fetching products from Firestore:', error);
    return productsDatabase
      .filter(p => p.active)
      .filter(p => (options?.featuredOnly ? p.featured : true))
      .filter(p => (options?.category && options.category !== 'all' ? p.category === options.category : true))
      .map(p => normalizeProduct(p));
  }
}

/**
 * Fetch a single product by ID or slug.
 * Explicitly guards with active == true to adhere to Firestore Security Rules.
 */
export async function getProductByIdOrSlug(idOrSlug: string): Promise<Product | null> {
  try {
    // 1. Try document ID lookup
    const docRef = doc(db, PRODUCTS_COLLECTION, idOrSlug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.active !== false) {
        return normalizeProduct(data, docSnap.id);
      }
    }

    // 2. Try slug query with MANDATORY where('active', '==', true) constraint
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('active', '==', true),
      where('slug', '==', idOrSlug),
      limit(1)
    );
    const slugSnap = await getDocs(q);
    if (!slugSnap.empty) {
      const firstDoc = slugSnap.docs[0];
      return normalizeProduct(firstDoc.data(), firstDoc.id);
    }

    // 3. Fallback to local productsDatabase
    const local = productsDatabase.find(p => (p.id === idOrSlug || p.slug === idOrSlug) && p.active);
    return local ? normalizeProduct(local) : null;
  } catch (error) {
    console.error(`Error fetching product ${idOrSlug}:`, error);
    const local = productsDatabase.find(p => (p.id === idOrSlug || p.slug === idOrSlug) && p.active);
    return local ? normalizeProduct(local) : null;
  }
}
