import { Hero } from './components/Hero';
import { BrandIntro } from './components/BrandIntro';
import { FlagshipHighlight } from './components/FlagshipHighlight';
import { CraftsmanshipDetails } from './components/CraftsmanshipDetails';
import { FabricStory } from './components/FabricStory';
import { MadeInSriLankaStory } from './components/MadeInSriLankaStory';
import { EditorialGallery } from './components/EditorialGallery';
import { EarlyAccessSection } from './components/EarlyAccessSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Premium Editorial Hero Section */}
      <Hero />

      {/* 2. Introduction to Axivers & Brand Philosophy */}
      <BrandIntro />

      {/* 3. Signature Flagship T-Shirt Highlight */}
      <FlagshipHighlight />

      {/* 4. Product Details & Craftsmanship Highlights */}
      <CraftsmanshipDetails />

      {/* 5. Fabric & Comfort Story (180 GSM Mercerized Cotton) */}
      <FabricStory />

      {/* 6. Made in Sri Lanka Brand Story */}
      <MadeInSriLankaStory />

      {/* 7. Editorial Lifestyle Gallery */}
      <EditorialGallery />

      {/* 8. Newsletter / Early-Access Signup */}
      <EarlyAccessSection />
    </>
  );
}
