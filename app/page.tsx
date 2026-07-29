import { Hero } from './components/Hero';
import { FeaturedCollection } from './components/FeaturedCollection';
import { CategoryGrid } from './components/CategoryGrid';
import { FabricStory } from './components/FabricStory';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <CategoryGrid />
      <FabricStory />
    </>
  );
}
