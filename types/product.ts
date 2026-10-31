import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  tagline?: string;
  category: string;             // Category slug (e.g., "flagship", "men", "women", "minimalist", "technical")
  categoryLabel?: string;        // Human-readable (e.g., "Flagship Outerwear")
  gender?: 'men' | 'women' | 'unisex';
  collectionSlug?: string;       // Collection identifier
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  currency?: string;             // "LKR"
  price: number;                 // Stored in minor units (e.g. 400000 = LKR 4,000.00)
  priceMinor?: number;           // Mirror of price
  compareAtPrice?: number;       // Minor units (or 0)
  compareAtPriceMinor?: number;  // Mirror of compareAtPrice
  sizes: string[];               // ["S", "M", "L", "XL"]
  colors?: string[];             // ["Onyx Black", "Slate Grey"]
  stock: number;                 // Total stock
  images: string[];              // Array of image URLs
  material?: string;
  fabricSpec?: string;
  careInstructions?: string;
  featured: boolean;             // Boolean
  active: boolean;               // Must be true for storefront visibility
  status?: 'active' | 'draft' | 'archived';
  createdAt?: Timestamp | string | null;
  updatedAt?: Timestamp | string | null;
}
