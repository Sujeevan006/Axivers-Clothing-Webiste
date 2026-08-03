'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const isLanding = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (!isLanding) {
        setIsHeroVisible(false);
        return;
      }
      const heroHeight = window.innerHeight;
      setIsHeroVisible(window.scrollY < heroHeight * 0.85);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  const isOverHero = isLanding && isHeroVisible;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverHero
          ? 'bg-transparent text-white border-b border-transparent py-5'
          : 'bg-[#09090b]/95 backdrop-blur-md text-white border-b border-zinc-800 py-4 shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Navigation Links (Left) */}
        <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-display font-semibold text-zinc-300">
          <Link
            href="/shop"
            className={`hover:text-white transition-colors relative group py-2 cursor-pointer ${
              pathname === '/shop' || pathname === '/products'
                ? 'text-white font-bold'
                : 'text-zinc-300'
            }`}
          >
            Home
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-white transform ${
                pathname === '/shop' || pathname === '/products'
                  ? 'scale-x-100'
                  : 'scale-x-0'
              } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
            ></span>
          </Link>

          <a
            href="/#categories"
            className="hover:text-white transition-colors relative group py-2 cursor-pointer text-zinc-300"
          >
            Categories
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>

          <a
            href="/#fabric"
            className="hover:text-white transition-colors relative group py-2 cursor-pointer text-zinc-300"
          >
            Fabric Tech
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </nav>

        {/* Mobile Menu Icon (Left) */}
        <div className="md:hidden flex items-center">
          <Link
            href={isLanding ? '/shop' : '/'}
            className="focus:outline-none hover:text-white transition-colors cursor-pointer text-xs font-display uppercase tracking-widest font-semibold text-zinc-200"
          >
            {isLanding ? 'Storefront' : 'Home'}
          </Link>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <Link
            href="/"
            className="flex items-center cursor-pointer focus:outline-none"
          >
            <Image
              src="/LogoOriginal.png"
              alt="Axivers Luxury Clothing"
              width={140}
              height={45}
              className="h-9 sm:h-11 w-auto object-contain hover:scale-95 transition-all duration-300 transform"
              priority
            />
          </Link>
        </div>

        {/* Shopping Cart & Actions (Right) */}
        <div className="flex items-center space-x-6 text-white">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center focus:outline-none hover:text-white transition-colors py-2 cursor-pointer"
            aria-label="Open Shopping Bag"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-1 -right-4 flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold font-mono bg-white text-black shadow-md">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
