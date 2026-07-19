import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PDP } from './components/PDP';
import { ProductsPage } from './components/ProductsPage';
import type { Product } from './components/ProductsPage';
import { FabricStory } from './components/FabricStory';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

// Products Database representing local Sri Lankan combed yarns and modal blend collection
const productsDatabase: Product[] = [
  {
    id: 'piping-crewneck',
    name: 'Premium Piping Crewneck',
    price: 4000,
    category: 'flagship',
    categoryLabel: 'Flagship',
    tagline: 'Elevated essentials for the modern lifestyle.',
    description: 'A masterclass in modern minimalist streetwear. This deep solid black T-shirt is redefined with custom-inserted crisp white piping details inside the sleeve cuffs and along the bottom hem. Finished with clean, subtle white chest embroidery and our signature geometric back logo.',
    images: ['/images/pdp_front.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '60% Combed Ring-Spun Cotton / 40% Modal blend, heavy 190 GSM.',
    careInstructions: 'Machine wash cold inside out. Flat dry in shade. Iron low.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'white-piping-crewneck',
    name: 'White Piping Crewneck',
    price: 4000,
    category: 'flagship',
    categoryLabel: 'Flagship',
    tagline: 'Clean, light, and detailed.',
    description: 'Our flagship crewneck reimagined in crisp white cotton-modal. Features custom-inserted black piping detail on cuffs and bottom hem, and subtle black embroidered branding.',
    images: ['/images/pdp_white_piping.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '60% Combed Ring-Spun Cotton / 40% Modal blend, heavy 190 GSM.',
    careInstructions: 'Machine wash cold. Flat dry. Iron low.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'boxy-black-tee',
    name: 'Heavyweight Boxy Tee',
    price: 4200,
    category: 'minimalist',
    categoryLabel: 'Minimalist',
    tagline: 'Streetwear drape in premium heavy cotton.',
    description: 'An oversized, boxy fit tee built from high-density combed cotton. Heavyweight structure that holds its shape, detailed with a low-profile centered chest embroidery.',
    images: ['/images/pdp_boxy_black.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '100% Combed Ring-Spun Cotton, 240 GSM ultra-heavy weight.',
    careInstructions: 'Machine wash cold, air dry, do not iron print.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'polo-piping-black',
    name: 'Piping Collar Polo',
    price: 4800,
    category: 'flagship',
    categoryLabel: 'Flagship',
    tagline: 'Athletic luxury meets classic collar design.',
    description: 'A premium black polo shirt engineered for a refined athletic fit. Elevated with custom white piping detail inserted along the edge of the collar and sleeve cuffs.',
    images: ['/images/pdp_polo_black.jpg', '/images/pdp_detail.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '60% Combed Cotton / 40% Modal knit blend, breathable and structured.',
    careInstructions: 'Machine wash cold, flat dry, iron low on reverse.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'active-tech-tee',
    name: 'Active Modal Tech Tee',
    price: 4500,
    category: 'technical',
    categoryLabel: 'Technical',
    tagline: 'Moisture-wicking, cool-touch performance.',
    description: 'Engineered for active lifestyles. Built with a high-percentage beechwood modal blend, providing natural temperature regulation, fast moisture-wicking, and a silky smooth drape.',
    images: ['/images/pdp_detail.jpg', '/images/pdp_front.jpg', '/images/pdp_back.jpg'],
    fabricSpec: '30% Combed Cotton / 70% Micro-Modal yarn, quick-dry, 160 GSM lightweight.',
    careInstructions: 'Gentle wash cold, tumble dry low, do not iron logo.',
    sizes: ['S', 'M', 'L', 'XL'],
  }
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [currentView, setCurrentView] = useState<'landing' | 'products' | 'pdp'>('landing');
  const [selectedProduct, setSelectedProduct] = useState<Product>(productsDatabase[0]);

  // Force dark mode on document root on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Monitor page scrolling to shift Header transparent overlay when on Landing view
  useEffect(() => {
    const handleScroll = () => {
      if (currentView !== 'landing') {
        setIsHeroVisible(false);
        return;
      }
      const heroHeight = window.innerHeight;
      setIsHeroVisible(window.scrollY < heroHeight * 0.85);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleAddToCart = (product: Product, size: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            size: size,
            quantity: 1,
            image: product.images[0],
          },
        ];
      }
    });
    // Open drawer automatically for quick checkouts
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: string, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string, size: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const handleQuickAdd = (product: Product, size: string) => {
    handleAddToCart(product, size);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigate = (view: 'landing' | 'products') => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light flex flex-col transition-colors duration-300">
      {/* Dynamic Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        isHeroVisible={isHeroVisible}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'landing' && (
          <>
            {/* Split Screen Typographic Hero */}
            <Hero onShopClick={() => handleNavigate('products')} />

            {/* Showcase the core flagship item directly in PDP on homepage */}
            <div id="shop" className="border-t border-brand-dark/5 dark:border-brand-light/5">
              <PDP
                product={productsDatabase[0]}
                onAddToCart={handleAddToCart}
                onBackToShop={() => handleNavigate('products')}
              />
            </div>

            {/* Technical yarn story specs */}
            <FabricStory />
          </>
        )}

        {currentView === 'products' && (
          <ProductsPage
            products={productsDatabase}
            onProductClick={handleProductSelect}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {currentView === 'pdp' && (
          <PDP
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onBackToShop={() => handleNavigate('products')}
          />
        )}
      </main>

      {/* Ground Footer */}
      <Footer />

      {/* Slide-out Checkout drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
