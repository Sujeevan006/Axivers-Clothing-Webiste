import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { getProducts, serializeProduct } from '@/services/productService';
import { productsDatabase } from '../data/products';

export const metadata: Metadata = {
  title: 'Core Collection — Axivers Essentials',
  description:
    'Explore the Axivers Core Collection. Engineered athletic luxury garments crafted from 60/40 Cotton-Modal yarns in Sri Lanka.',
};

export const revalidate = 60;

export default async function ProductsRoutePage() {
  let products = await getProducts({ activeOnly: true });

  if (!products || products.length === 0) {
    products = productsDatabase as any;
  }

  const initialProducts = JSON.parse(JSON.stringify(products.map(serializeProduct)));

  return <ProductsPage initialProducts={initialProducts} />;
}
