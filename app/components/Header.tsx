'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { StoreSettings } from '@/types/settings';
import { DEFAULT_STORE_SETTINGS, getStoreSettings, subscribeToStoreSettings } from '@/services/settingsService';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  const isLanding = pathname === '/';

  useEffect(() => {
    getStoreSettings().then((settings) => {
      if (settings) setStoreSettings(settings);
    });

    const unsubscribe = subscribeToStoreSettings((settings) => {
      if (settings) setStoreSettings(settings);
    });

    return () => unsubscribe();
  }, []);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isOverHero = isLanding && isHeroVisible;

  return (
    <>
      {/* Maintenance Alert Banner if orders are disabled */}
      {!storeSettings.ordersEnabled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-black text-xs font-display font-bold py-2 px-4 text-center tracking-wider shadow-lg flex items-center justify-center space-x-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>Store Notice: Checkouts are temporarily paused for scheduled maintenance. Browse-only mode.</span>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          !storeSettings.ordersEnabled ? 'top-8' : 'top-0'
        } ${
          isOverHero
            ? 'bg-transparent text-white border-b border-transparent py-4 sm:py-5'
            : 'bg-[#09090b]/95 backdrop-blur-md text-white border-b border-zinc-800 py-3.5 sm:py-4 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-display font-semibold text-zinc-300">
            <Link
              href="/shop"
              className={`hover:text-white transition-colors relative group py-2 cursor-pointer ${
                pathname === '/shop' || pathname === '/products'
                  ? 'text-white font-bold'
                  : 'text-zinc-300'
              }`}
            >
              Catalog
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

            <Link
              href="/track-order"
              className={`hover:text-white transition-colors relative group py-2 cursor-pointer ${
                pathname === '/track-order' ? 'text-white font-bold' : 'text-zinc-300'
              }`}
            >
              Track Order
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] bg-white transform ${
                  pathname === '/track-order' ? 'scale-x-100' : 'scale-x-0'
                } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
              ></span>
            </Link>
          </nav>

          {/* Mobile Menu Hamburger Button (Left) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-zinc-200 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
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
                className="h-8 sm:h-11 w-auto object-contain hover:scale-95 transition-all duration-300 transform"
                priority
              />
            </Link>
          </div>

          {/* Shopping Cart & Actions (Right) */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-white">
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
              <span className="absolute -top-1 -right-3.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-[10px] font-bold font-mono bg-white text-black shadow-md">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in cursor-pointer"
          />
          <div className="relative top-16 w-full bg-[#09090b] border-b border-zinc-800 p-6 space-y-5 animate-slide-up shadow-2xl">
            <nav className="flex flex-col space-y-4 text-sm uppercase tracking-widest font-display font-semibold">
              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-zinc-300 py-2 border-b border-zinc-800/80 flex items-center justify-between"
              >
                <span>Storefront Catalog</span>
                <span className="font-mono text-xs text-zinc-500">&rarr;</span>
              </Link>
              <a
                href="/#categories"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white py-2 border-b border-zinc-800/80 flex items-center justify-between"
              >
                <span>Categories</span>
                <span className="font-mono text-xs text-zinc-500">&rarr;</span>
              </a>
              <a
                href="/#fabric"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white py-2 border-b border-zinc-800/80 flex items-center justify-between"
              >
                <span>Fabric Tech</span>
                <span className="font-mono text-xs text-zinc-500">&rarr;</span>
              </a>
              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-zinc-300 hover:text-white py-2 flex items-center justify-between"
              >
                <span>Track Order</span>
                <span className="font-mono text-xs text-zinc-500">&rarr;</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
