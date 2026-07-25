import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { productsDatabase } from '../data/products';

export const metadata: Metadata = {
  title: 'Core Collection — axivers Essentials',
  description:
    'Explore the axivers Core Collection. Engineered athletic luxury garments crafted from 60/40 Cotton-Modal yarns in Sri Lanka.',
};

export default function ShopPage() {
  return <ProductsPage products={productsDatabase} />;
}
