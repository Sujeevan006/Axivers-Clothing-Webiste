import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { getProducts, serializeProduct } from '@/services/productService';
import { productsDatabase } from '../data/products';

export const metadata: Metadata = {
  title: 'Core Collection — Axivers Essentials',
  description:
    'Explore the Axivers Core Collection. Engineered athletic luxury garments crafted from 180 GSM Mercerized Cotton in Sri Lanka.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsRoutePage() {
  let products = await getProducts({ activeOnly: true });

  if (!products || products.length === 0) {
    products = productsDatabase as any;
  }

  const initialProducts = JSON.parse(JSON.stringify(products.map(serializeProduct)));

  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 text-center bg-ink text-paper min-h-screen">
        <p className="text-sm normal-case tracking-widest font-display text-zinc-500">Loading catalog...</p>
      </div>
    }>
      <ProductsPage initialProducts={initialProducts} />
    </Suspense>
  );
}
