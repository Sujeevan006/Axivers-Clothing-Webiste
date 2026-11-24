import { Hero } from './components/Hero';
import { LogoMarquee } from './components/LogoMarquee';
import { FeaturedCollection } from './components/FeaturedCollection';
import { BrandStatement } from './components/BrandStatement';
import { EditorialDiscovery } from './components/EditorialDiscovery';
import {
  StoreBenefits,
  ShopCategories,
  WardrobeStories,
  BrandValues,
  BrandWordmarks,
} from './components/HomeSections';

export default function HomePage() {
  return (
    <div className="storefront-home">
      <Hero />
      <StoreBenefits />
      <ShopCategories />
      <FeaturedCollection variant="arrivals" />
      <LogoMarquee />
      <WardrobeStories />
      <FeaturedCollection variant="featured" />
      <BrandValues />
      <FeaturedCollection variant="compact" />
      <BrandStatement />
      <BrandWordmarks />
      <EditorialDiscovery />
    </div>
  );
}
