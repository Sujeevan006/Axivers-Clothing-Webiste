import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: "Men's Collection — Axivers Athletic Luxury",
  description:
    "Explore the Axivers Men's Collection. Engineered with an athletic drape, tailored shoulder lines, and our signature 60/40 cotton-modal blend for unmatched everyday comfort.",
};

const config: CollectionConfig = {
  collectionKey: 'men',
  title: "Men's Collection",
  tagline: "Tailored Athletic Fit. Uncompromised Comfort.",
  description:
    "Engineered for the modern masculine silhouette. Tapered through the torso with freedom across the chest and shoulders, crafted from our signature 60/40 cotton-modal blend.",
  bannerImage: '/images/cat-men-bg.png',
  badge: "Men's Apparel",
};

export default function MensCollectionPage() {
  return <CollectionPage config={config} />;
}
