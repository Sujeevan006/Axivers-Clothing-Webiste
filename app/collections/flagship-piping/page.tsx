import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Flagship Piping Collection — Axivers Signature',
  description:
    'The iconic Axivers Flagship Piping Collection. Distinctive contrast piping inside sleeve cuffs and hem, crafted from 190 GSM 60/40 cotton-modal for athletic luxury.',
};

const config: CollectionConfig = {
  collectionKey: 'flagship-piping',
  title: 'Flagship Piping Collection',
  tagline: 'Signature Detail. Precision Craftsmanship.',
  description:
    'Our defining silhouette. Masterfully engineered with custom-inserted contrast piping on sleeve cuffs and hem, finished with low-profile embroidery and a sculpted drape.',
  bannerImage: '/images/cat-piping-bg.png',
  badge: 'Signature Collection',
};

export default function FlagshipPipingCollectionPage() {
  return <CollectionPage config={config} />;
}
