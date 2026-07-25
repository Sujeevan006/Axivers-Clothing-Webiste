import { Hero } from './components/Hero';
import { PDP } from './components/PDP';
import { FabricStory } from './components/FabricStory';
import { productsDatabase } from './data/products';

export default function HomePage() {
  const flagshipProduct = productsDatabase[0];

  return (
    <>
      <Hero />

      {/* Flagship showcase on homepage */}
      <div id="shop" className="border-t border-brand-dark/5 dark:border-brand-light/5">
        <PDP product={flagshipProduct} />
      </div>

      {/* Technical yarn story specs */}
      <FabricStory />
    </>
  );
}
