import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { getProducts, serializeProduct } from '@/services/productService';
import { productsDatabase } from '../data/products';

export const metadata: Metadata = {
  title: 'Core Collection — Axivers Essentials',
  description:
    'Explore the Axivers Core Collection. Engineered athletic luxury garments crafted from 60/40 Cotton-Modal yarns in Sri Lanka.',
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
      <div className="pt-32 pb-24 text-center bg-[#09090b] text-white min-h-screen">
        <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading catalog...</p>
      </div>
    }>
      <ProductsPage initialProducts={initialProducts} />
    </Suspense>
  );
}
