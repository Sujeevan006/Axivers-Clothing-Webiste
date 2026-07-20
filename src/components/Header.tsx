import React from 'react';
import logo from '../assets/Logo2.png';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  isHeroVisible: boolean;
  currentView: 'landing' | 'products' | 'pdp';
  onNavigate: (view: 'landing' | 'products') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onCartClick,
  isHeroVisible,
  currentView,
  onNavigate,
}) => {
  // Transparent over the Hero. Translucent dark elsewhere.
  const isOverHero = currentView === 'landing' && isHeroVisible;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverHero
          ? 'bg-transparent text-white border-b border-transparent py-6'
          : 'bg-brand-dark/90 backdrop-blur-md text-brand-light border-b border-brand-light/10 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Navigation Links (Left) */}
        <nav className="hidden md:flex items-center space-x-8 text-md font-display font-semibold text-brand-light">
          <button
            onClick={() => onNavigate('products')}
            className={`hover:opacity-60 transition-opacity relative group py-2 cursor-pointer ${
              currentView === 'products'
                ? 'opacity-100 font-bold'
                : 'opacity-85'
            }`}
          >
            Shop
            <span
              className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-light transform ${currentView === 'products' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 transition-transform duration-300 origin-left`}
            ></span>
          </button>

          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                const specSection = document.getElementById('fabric');
                if (specSection)
                  specSection.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:opacity-60 transition-opacity relative group py-2 cursor-pointer opacity-85"
          >
            Fabric
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>

          <button
            onClick={() => {
              onNavigate('landing');
              setTimeout(() => {
                const footerSection = document.querySelector('footer');
                if (footerSection)
                  footerSection.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="hover:opacity-60 transition-opacity relative group py-2 cursor-pointer opacity-85"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
        </nav>

        {/* Mobile Menu Icon (Left) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() =>
              onNavigate(currentView === 'landing' ? 'products' : 'landing')
            }
            className="focus:outline-none hover:opacity-60 transition-opacity cursor-pointer text-xs font-display uppercase tracking-widest font-semibold text-brand-light"
          >
            {currentView === 'landing' ? 'Shop' : 'Home'}
          </button>
        </div>

        {/* Logo (Center) - Dynamic logo loading exclusively from Logo.png */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center cursor-pointer focus:outline-none"
          >
            <img
              src={logo}
              alt="axivers"
              className="h-10 sm:h-12 w-auto object-contain hover:scale-95 transition-all duration-300 transform"
            />
          </button>
        </div>

        {/* Shopping Cart & Actions (Right) */}
        <div className="flex items-center space-x-6 text-brand-light">
          {/* Cart Icon */}
          <button
            onClick={onCartClick}
            className="relative flex items-center focus:outline-none hover:opacity-60 transition-opacity py-2 cursor-pointer"
            aria-label="Open Cart"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-none text-[9px] font-bold font-sans bg-brand-light text-brand-dark transition-all duration-300">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
