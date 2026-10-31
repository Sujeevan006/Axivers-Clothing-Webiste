'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { StoreSettings } from '@/types/settings';
import {
  DEFAULT_STORE_SETTINGS,
  getStoreSettings,
  subscribeToStoreSettings,
} from '@/services/settingsService';
import { SearchModal } from './SearchModal';

const SHOP_COLLECTIONS = [
  { name: 'Shop All', href: '/shop', subtitle: 'Explore the complete catalogue' },
  { name: "Men's Collection", href: '/collections/men', subtitle: 'Athletic luxury tailored cuts' },
  { name: "Women's Collection", href: '/collections/women', subtitle: 'Effortless drape & cloud modal' },
  { name: 'Flagship Piping', href: '/collections/flagship-piping', subtitle: 'Signature contrast piping', badge: 'Signature' },
  { name: 'Minimalist Essentials', href: '/collections/minimalist-essentials', subtitle: 'Heavyweight boxy silhouettes' },
  { name: 'Technical Garments', href: '/collections/technical', subtitle: 'Moisture-wicking performance' },
  { name: 'New Arrivals', href: '/collections/new-arrivals', subtitle: 'Latest drops & seasonal pieces', badge: 'New' },
  { name: 'Best Sellers', href: '/collections/best-sellers', subtitle: 'Most coveted garments', badge: 'Popular' },
];

const MEGA_CARDS = [
  {
    title: "Men's Athletic Luxury",
    href: '/collections/men',
    image: '/images/cat-men-bg.png',
    tag: 'Athletic Drape',
  },
  {
    title: 'Flagship Contrast Piping',
    href: '/collections/flagship-piping',
    image: '/images/cat-piping-bg.png',
    tag: 'Iconic Detail',
  },
  {
    title: "Women's Elevated Essentials",
    href: '/collections/women',
    image: '/images/cat-women-bg.png',
    tag: 'Cloud-Soft Modal',
  },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileShopOpen, setIsMobileShopOpen] = useState(true);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  const megaTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
      setIsHeroVisible(window.scrollY < heroHeight * 0.75);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLanding]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMegaMenuOpen(false);
  }, [pathname]);

  const handleMouseEnterShop = () => {
    if (megaTimeoutRef.current) clearTimeout(megaTimeoutRef.current);
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeaveShop = () => {
    megaTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 200);
  };

  const isOverHero = isLanding && isHeroVisible;

  return (
    <>
      {/* Maintenance Alert Banner if orders are disabled */}
      {!storeSettings.ordersEnabled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-black text-xs font-display font-bold py-2 px-4 text-center tracking-wider shadow-lg flex items-center justify-center space-x-2">
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>Store Notice: Checkouts are temporarily paused for scheduled maintenance. Browse-only mode.</span>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          !storeSettings.ordersEnabled ? 'top-8' : 'top-0'
        } ${
          isOverHero && !isMegaMenuOpen
            ? 'bg-transparent text-white border-b border-white/5 py-4 sm:py-5'
            : 'bg-[#09090b]/95 backdrop-blur-md text-white border-b border-zinc-800/80 py-3.5 sm:py-4 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Desktop Main Navigation */}
          <div className="flex items-center space-x-6">
            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
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

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-[11px] uppercase tracking-[0.2em] font-display font-medium text-zinc-300">
              <Link
                href="/"
                className={`py-2 transition-colors hover:text-white cursor-pointer ${
                  pathname === '/' ? 'text-white font-bold' : 'text-zinc-300'
                }`}
              >
                Home
              </Link>

              {/* SHOP WITH MEGA MENU TRIGGER */}
              <div
                className="relative py-2"
                onMouseEnter={handleMouseEnterShop}
                onMouseLeave={handleMouseLeaveShop}
              >
                <Link
                  href="/shop"
                  className={`inline-flex items-center space-x-1.5 py-2 transition-colors hover:text-white cursor-pointer ${
                    pathname.startsWith('/shop') || pathname.startsWith('/collections')
                      ? 'text-white font-bold'
                      : 'text-zinc-300'
                  }`}
                >
                  <span>Shop</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180 text-white' : 'text-zinc-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
              </div>

              <Link
                href="/fabric-technology"
                className={`py-2 transition-colors hover:text-white cursor-pointer ${
                  pathname === '/fabric-technology' ? 'text-white font-bold' : 'text-zinc-300'
                }`}
              >
                Fabric & Technology
              </Link>

              <Link
                href="/our-story"
                className={`py-2 transition-colors hover:text-white cursor-pointer ${
                  pathname === '/our-story' ? 'text-white font-bold' : 'text-zinc-300'
                }`}
              >
                Our Story
              </Link>

              <Link
                href="/lookbook"
                className={`py-2 transition-colors hover:text-white cursor-pointer ${
                  pathname === '/lookbook' ? 'text-white font-bold' : 'text-zinc-300'
                }`}
              >
                Lookbook
              </Link>

              <Link
                href="/journal"
                className={`py-2 transition-colors hover:text-white cursor-pointer ${
                  pathname.startsWith('/journal') ? 'text-white font-bold' : 'text-zinc-300'
                }`}
              >
                Journal
              </Link>
            </nav>
          </div>

          {/* Center: AXIVERS Logo */}
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center cursor-pointer focus:outline-none">
              <Image
                src="/LogoOriginal.png"
                alt="AXIVERS"
                width={130}
                height={38}
                className="h-7 sm:h-8 w-auto object-contain hover:opacity-90 transition-all duration-300"
                priority
              />
            </Link>
          </div>

          {/* Right: Utility Icons (Search, My Account, Cart) */}
          <div className="flex items-center space-x-3 sm:space-x-5 text-white">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/40"
              aria-label="Search garments"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* My Account */}
            <Link
              href="/account"
              className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/40 hidden sm:flex items-center"
              aria-label="My Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center p-1.5 text-white hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold font-mono bg-white text-black shadow-md">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* DESKTOP SHOP MEGA-MENU */}
        {isMegaMenuOpen && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-[#0c0c0e] border-b border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.9)] animate-fade-in"
            onMouseEnter={handleMouseEnterShop}
            onMouseLeave={handleMouseLeaveShop}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-12 gap-8">
              {/* Col 1: Collections Links */}
              <div className="col-span-4 space-y-4 border-r border-zinc-800/80 pr-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-display font-semibold block">
                    Garment Collections
                  </span>
                  <Link
                    href="/shop"
                    className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-1">
                  {SHOP_COLLECTIONS.map((col) => (
                    <Link
                      key={col.href}
                      href={col.href}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-900 transition-colors"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-display font-semibold uppercase tracking-wider text-white group-hover:text-zinc-200 transition-colors">
                            {col.name}
                          </span>
                          {col.badge && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono font-medium">
                              {col.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 font-light mt-0.5 line-clamp-1">
                          {col.subtitle}
                        </p>
                      </div>
                      <span className="text-xs text-zinc-600 group-hover:text-white transform transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Col 2: Visual Collection Cards */}
              <div className="col-span-8 grid grid-cols-3 gap-4">
                {MEGA_CARDS.map((card) => (
                  <Link
                    key={card.href}
                    href={card.href}
                    className="group relative h-72 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col justify-end p-5 shadow-lg hover:border-zinc-700 transition-all cursor-pointer"
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                    <div className="relative z-20 space-y-1">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-display font-medium text-zinc-400 block">
                        {card.tag}
                      </span>
                      <h4 className="text-sm font-display font-bold uppercase tracking-wider text-white group-hover:text-zinc-200 transition-colors">
                        {card.title}
                      </h4>
                      <div className="text-[11px] text-zinc-300 font-medium flex items-center space-x-1 pt-1">
                        <span>Shop Collection</span>
                        <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in cursor-pointer"
          />
          <div className="relative top-16 w-full max-h-[calc(100vh-4rem)] overflow-y-auto bg-[#0a0a0d] border-b border-zinc-800 p-6 space-y-6 shadow-2xl animate-slide-up">
            {/* Quick Search trigger */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-display tracking-wider text-zinc-400 text-left"
            >
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search garments or collections...</span>
            </button>

            {/* Nav Tree */}
            <nav className="flex flex-col space-y-2 text-xs uppercase tracking-[0.18em] font-display font-medium">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-white flex items-center justify-between"
              >
                <span>Home</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>

              {/* Shop Collapsible */}
              <div className="border-b border-zinc-900 py-2">
                <button
                  onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                  className="w-full py-2 flex items-center justify-between text-white"
                >
                  <span className="font-bold">Shop Collections</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isMobileShopOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isMobileShopOpen && (
                  <div className="pl-3 py-2 space-y-2 border-l border-zinc-800 ml-1 mt-1">
                    {SHOP_COLLECTIONS.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="py-2 text-[11px] text-zinc-400 hover:text-white flex items-center justify-between"
                      >
                        <span>{c.name}</span>
                        {c.badge && (
                          <span className="text-[8px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                            {c.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/fabric-technology"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>Fabric & Technology</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>

              <Link
                href="/our-story"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>Our Story</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>

              <Link
                href="/lookbook"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>Lookbook</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>

              <Link
                href="/journal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>Journal</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>

              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 border-b border-zinc-900 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>My Account</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>

              <Link
                href="/track-order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-3 text-zinc-300 hover:text-white flex items-center justify-between"
              >
                <span>Track Order</span>
                <span className="text-zinc-600">&rarr;</span>
              </Link>
            </nav>

            {/* Quick Customer Support links on mobile */}
            <div className="pt-4 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px] text-zinc-500 font-display uppercase tracking-wider">
              <Link href="/size-guide" onClick={() => setIsMobileMenuOpen(false)}>Size Guide</Link>
              <Link href="/shipping" onClick={() => setIsMobileMenuOpen(false)}>Shipping</Link>
              <Link href="/returns" onClick={() => setIsMobileMenuOpen(false)}>Returns</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
