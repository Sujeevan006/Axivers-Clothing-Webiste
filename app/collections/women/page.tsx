import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: "Women's Collection — Axivers Athletic Luxury",
  description:
    "Discover the Axivers Women's Collection. Effortless silhouettes, cloud-soft modal drape, and minimalist design engineered for feminine form and all-day versatility.",
};

const config: CollectionConfig = {
  collectionKey: 'women',
  title: "Women's Collection",
  tagline: "Effortless Drape. Cloud-Soft Hand Feel.",
  description:
    "Minimalist elegance designed for fluid movement. Featuring relaxed shoulder lines, refined necklines, and our proprietary cotton-modal textile that never clings.",
  bannerImage: '/images/cat-women-bg.png',
  badge: "Women's Apparel",
};

export default function WomensCollectionPage() {
  return <CollectionPage config={config} />;
}
