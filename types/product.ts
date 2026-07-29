import { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: 'men' | 'women' | 'flagship' | 'minimalist' | 'technical' | string;
  categoryLabel?: string;
  productType?: string;
  price: number;
  compareAtPrice?: number;
  sizes: string[];
  colors?: string[];
  stock: number;
  images: string[];
  tagline?: string;
  fabricSpec?: string;
  careInstructions?: string;
  featured: boolean;
  active: boolean;
  createdAt?: Timestamp | string | any;
  updatedAt?: Timestamp | string | any;
}

