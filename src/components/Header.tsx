import React from 'react';
import logoDark from '../assets/LogoDarkHorizontal tr.png';
import logoWhite from '../assets/LogoWhiteHorizontal tr.png';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  isHeroVisible: boolean;
}

export const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, isHeroVisible }) => {
  // If hero is visible, header is transparent with white text and white logo.
  // When scrolled past hero, it becomes white with dark text and dark logo.
  const isDarkBg = isHeroVisible;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isDarkBg
          ? 'bg-transparent text-brand-light border-b border-transparent py-6'
          : 'bg-brand-light/90 backdrop-blur-md text-brand-dark border-b border-brand-dark/10 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Navigation Links (Left) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-display uppercase tracking-widest font-medium">
          <a
            href="#shop"
            className="hover:opacity-60 transition-opacity relative group py-2"
          >
            Shop
            <span className={`absolute bottom-0 left-0 w-full h-[1px] ${isDarkBg ? 'bg-brand-light' : 'bg-brand-dark'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
          </a>
          <a
            href="#fabric"
            className="hover:opacity-60 transition-opacity relative group py-2"
          >
            Fabric
            <span className={`absolute bottom-0 left-0 w-full h-[1px] ${isDarkBg ? 'bg-brand-light' : 'bg-brand-dark'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
          </a>
          <a
            href="#about"
            className="hover:opacity-60 transition-opacity relative group py-2"
          >
            About
            <span className={`absolute bottom-0 left-0 w-full h-[1px] ${isDarkBg ? 'bg-brand-light' : 'bg-brand-dark'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></span>
          </a>
        </nav>

        {/* Mobile Menu Icon (Left) */}
        <div className="md:hidden flex items-center">
          <button className="focus:outline-none hover:opacity-60 transition-opacity" aria-label="Menu">
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <a href="#" className="flex items-center">
            <img
              src={isDarkBg ? logoWhite : logoDark}
              alt="axivers"
              className="h-7 sm:h-8 w-auto object-contain transition-all duration-300"
            />
          </a>
        </div>

        {/* Shopping Cart & Actions (Right) */}
        <div className="flex items-center space-x-6">
          <button
            onClick={onCartClick}
            className="relative flex items-center focus:outline-none hover:opacity-60 transition-opacity py-2"
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
            <span
              className={`absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-none text-[9px] font-bold font-sans transition-all duration-300 ${
                isDarkBg
                  ? 'bg-brand-light text-brand-dark'
                  : 'bg-brand-dark text-brand-light'
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
