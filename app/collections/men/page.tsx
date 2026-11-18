import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: "Men's Collection — Axivers Athletic Luxury",
  description:
    "Explore the Axivers Men's Collection. Engineered with an athletic drape, tailored shoulder lines, and our signature 180 GSM mercerized cotton for refined everyday comfort.",
};

const config: CollectionConfig = {
  collectionKey: 'men',
  title: "Men's Collection",
  tagline: "Tailored Athletic Fit. Uncompromised Comfort.",
  description:
    "Engineered for the modern masculine silhouette. Clean through the torso with freedom across the chest and shoulders, crafted from 180 GSM mercerized cotton single jersey knit.",
  bannerImage: '/images/editorial-men-black.jpg',
  badge: "Men's Apparel",
};

export default function MensCollectionPage() {
  return <CollectionPage config={config} />;
}
