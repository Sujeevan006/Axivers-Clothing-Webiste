import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProductsPage } from '../components/ProductsPage';
import { getProducts, serializeProduct } from '@/services/productService';

export const metadata: Metadata = {
  title: 'Shop All Garments — Axivers Athletic Luxury',
  description: 'Browse the complete catalog of Axivers athletic luxury apparel, flagship piping crewnecks, minimalist tops, and technical activewear.',
};

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  const rawProducts = await getProducts({ activeOnly: true });
  const initialProducts = JSON.parse(JSON.stringify(rawProducts.map(serializeProduct)));

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
