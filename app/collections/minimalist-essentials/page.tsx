import type { Metadata } from 'next';
import { CollectionPage, CollectionConfig } from '@/app/components/CollectionPage';

export const metadata: Metadata = {
  title: 'Minimalist Essentials — Axivers Clothing',
  description:
    'Understated, everyday premium garments with clean silhouettes, refined details, and heavyweight combed cotton. Streetwear drape with architectural precision.',
};

const config: CollectionConfig = {
  collectionKey: 'minimalist-essentials',
  title: 'Minimalist Essentials',
  tagline: 'Clean Lines. Unadorned Luxury.',
  description:
    'Architectural silhouettes focused on pure form and fabric density. Featuring 240 GSM combed cotton heavyweight boxy tees and unadorned crewnecks that hold their structure.',
  bannerImage: '/images/cat-essentials-bg.png',
  badge: 'Pure Essentials',
};

export default function MinimalistEssentialsPage() {
  return <CollectionPage config={config} />;
}
