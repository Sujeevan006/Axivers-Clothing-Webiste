import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { getProducts, serializeProduct } from '@/services/productService';

export const metadata: Metadata = {
  title: 'Shop All Garments — Axivers Athletic Luxury',
  description: 'Browse the complete catalog of Axivers athletic luxury apparel, flagship piping crewnecks, minimalist tops, and technical activewear.',
};

export default async function ShopPage() {
  const rawProducts = await getProducts({ activeOnly: true });
  const initialProducts = JSON.parse(JSON.stringify(rawProducts.map(serializeProduct)));

  return <ProductsPage initialProducts={initialProducts} />;
}
