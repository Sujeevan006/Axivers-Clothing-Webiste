import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Best Sellers — Axivers Most Coveted Garments',
  description:
    'Our most celebrated, highly requested essentials. Discover the Flagship Contrast Piping Crewneck, Heavyweight Boxy Tee, and signature athletic silhouettes.',
};

const config: CollectionConfig = {
  collectionKey: 'best-sellers',
  title: 'Best Sellers',
  tagline: 'Most Celebrated. Tested & Proven.',
  description:
    'The foundational pieces our community returns to time and again. Enduring quality, timeless athletic proportions, and proven durability in real-world wear.',
  bannerImage: '/images/cat-piping-bg.png',
  badge: 'Customer Favorites',
};

export default function BestSellersPage() {
  return <CollectionPage config={config} />;
}
