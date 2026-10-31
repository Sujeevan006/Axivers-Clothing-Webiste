import { Hero } from './components/Hero';
import { FeaturedCollection } from './components/FeaturedCollection';
import { CategoryGrid } from './components/CategoryGrid';
import { HomeEditorialFeatures } from './components/HomeEditorialFeatures';
import { FabricStory } from './components/FabricStory';
import { BestSellersSection } from './components/BestSellersSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Full-width Hero Campaign with Centered Typography & Vertical Spec Badges */}
      <Hero />

      {/* 2. Featured / New Arrivals with Landscape Cards */}
      <FeaturedCollection />

      {/* 3. Browse Collections Grid */}
      <CategoryGrid />

      {/* 4. Editorial Features: Men's & Women's Split, Flagship Piping Spotlight, Lookbook Banner & Testimonials */}
      <HomeEditorialFeatures />

      {/* 5. Signature 60/40 Cotton-Modal Fabric Feature */}
      <FabricStory />

      {/* 6. Best Sellers Section */}
      <BestSellersSection />
    </>
  );
}
