import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: 'New Arrivals — Axivers Latest Releases',
  description:
    'Discover the latest garment drops and seasonal releases from Axivers Clothing. New silhouettes in signature 60/40 cotton-modal and heavyweight combed cotton.',
};

const config: CollectionConfig = {
  title: 'New Arrivals',
  tagline: 'Fresh Drops. Contemporary Silhouettes.',
  description:
    'Explore the newest garments to emerge from our Colombo design studio. Fresh colorways, refined cuts, and limited seasonal runs engineered to elevate everyday wear.',
  bannerImage: '/images/HeroBg.png',
  badge: 'Seasonal Releases',
  filterPredicate: (p) => Boolean(p.isNewArrival || p.featured),
};

export default function NewArrivalsPage() {
  return <CollectionPage config={config} />;
}
