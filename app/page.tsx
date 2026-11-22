import { Hero } from './components/Hero';
import { FeaturedCollection } from './components/FeaturedCollection';
import { BrandStatement } from './components/BrandStatement';
import { EditorialDiscovery } from './components/EditorialDiscovery';

export default function HomePage() {
  return (
    <>
      {/* SECTION 2 — Large Premium Fashion Hero */}
      <Hero />

      {/* SECTION 3 — Featured Collection (Clean Light Shopping Grid) */}
      <FeaturedCollection />

      {/* SECTION 4 — Premium Brand Statement (Refined Dark Contrast Section) */}
      <BrandStatement />

      {/* SECTION 5 — Editorial / Brand Discovery (Two Clean Editorial Tiles) */}
      <EditorialDiscovery />
    </>
  );
}