import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Signature Essential Collection — Axivers Athletic Luxury',
  description:
    'The iconic Axivers Signature Crewneck Collection. Distinctive tipped ribbing with outer white stripe and contrasting gray collar, crafted from 180 GSM mercerized cotton.',
};

const config: CollectionConfig = {
  collectionKey: 'flagship-piping',
  title: 'Signature Essential Collection',
  tagline: 'Signature Detail. Precision Craftsmanship.',
  description:
    'Our defining silhouette. Masterfully engineered with contrasting gray rib-knit collar, outer-edge white tipped cuffs, and reflective metallic-gold branding on 180 GSM mercerized cotton.',
  bannerImage: '/images/editorial-pedestal-black.png',
  badge: 'Signature Collection',
};

export default function FlagshipPipingCollectionPage() {
  return <CollectionPage config={config} />;
}
