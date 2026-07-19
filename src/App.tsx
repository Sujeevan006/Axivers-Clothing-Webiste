import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PDP } from './components/PDP';
import { FabricStory } from './components/FabricStory';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

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

  // Monitor page scrolling to shift Header theme overlay
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      // Fade header to solid light/white styling slightly before leaving the hero section fully (e.g. 85vh)
      setIsHeroVisible(window.scrollY < heroHeight * 0.85);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (size: string) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === 'piping-crewneck' && item.size === size
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += 1;
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            id: 'piping-crewneck',
            name: 'Premium Piping Crewneck',
            price: 4000,
            size: size,
            quantity: 1,
            image: '/images/pdp_front.jpg',
          },
        ];
      }
    });
    // Open drawer automatically for micro-interaction feedback
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

  const handleShopClick = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-light flex flex-col">
      {/* Sticky Premium Header */}
      <Header
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        isHeroVisible={isHeroVisible}
      />

      {/* Main Content Layout */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onShopClick={handleShopClick} />

        {/* Product Details Section (PDP) */}
        <PDP onAddToCart={handleAddToCart} />

        {/* Fabric Technical Specs Story */}
        <FabricStory />
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Slide-out Cart Panel */}
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
