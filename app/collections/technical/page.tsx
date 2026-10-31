import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Technical Garments — Axivers Athletic Performance',
  description:
    'Garments designed around comfort, breathability, and contemporary athletic lifestyles. Engineered with modal micro-knit yarns for moisture management and dynamic mobility.',
};

const config: CollectionConfig = {
  collectionKey: 'technical',
  title: 'Technical Garments',
  tagline: 'High Performance. Seamless Athletic Drape.',
  description:
    'Textile engineering meets athletic luxury. Built with micro-mesh breathability, high yarn resilience, and thermoregulating modal fibers suited for active metropolitan life.',
  bannerImage: '/images/cat-technical-bg.png',
  badge: 'Performance Knit',
};

export default function TechnicalCollectionPage() {
  return <CollectionPage config={config} />;
}
