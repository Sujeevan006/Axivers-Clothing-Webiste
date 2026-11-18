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

const MAIN_NAV_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop', hasDropdown: true },
  { name: 'Our Story', href: '/our-story' },
  { name: 'Fabric & Craftsmanship', href: '/fabric-technology' },
  { name: 'Lookbook', href: '/lookbook' },
  { name: 'Contact', href: '/contact' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(
    DEFAULT_STORE_SETTINGS,
  );

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
      {/* Maintenance / Prelaunch Notice Banner if orders are disabled */}
      {!storeSettings.ordersEnabled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#121215] text-zinc-300 border-b border-zinc-800 text-[11px] font-display py-2 px-4 text-center tracking-wider shadow-lg flex items-center justify-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span>
            Axivers Launch Preview: Browse our collection &amp; join the early-access list for our first limited release.
          </span>
        </div>
      )}

      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
          !storeSettings.ordersEnabled ? 'top-8' : 'top-0'
        } ${
          isOverHero && !isMegaMenuOpen
            ? 'bg-transparent text-white border-b border-white/5 py-4 sm:py-5'
            : 'bg-[#060606]/95 backdrop-blur-md text-white border-b border-zinc-800/80 py-3.5 sm:py-4 shadow-2xl'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Hamburger & Desktop Main Navigation */}
          <div className="flex items-center space-x-8">
            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 -ml-2 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7 text-[11px] uppercase tracking-[0.2em] font-display font-medium text-zinc-300">
              {MAIN_NAV_ITEMS.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.href}
                      className="relative py-2"
                      onMouseEnter={handleMouseEnterShop}
                      onMouseLeave={handleMouseLeaveShop}
                    >
                      <Link
                        href={item.href}
                        className={`inline-flex items-center space-x-1.5 py-2 transition-colors hover:text-white cursor-pointer ${
                          pathname.startsWith('/shop') || pathname.startsWith('/product')
                            ? 'text-white font-bold'
                            : 'text-zinc-300'
                        }`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-3 h-3 transition-transform duration-300 ${
                            isMegaMenuOpen ? 'rotate-180 text-white' : 'text-zinc-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </Link>
                    </div>
                  );
                }

                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-2 transition-colors hover:text-white cursor-pointer ${
                      isActive ? 'text-white font-bold' : 'text-zinc-300'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Center: Exact AXIVERS Logo Wordmark */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center cursor-pointer focus:outline-none"
              aria-label="Axivers Home"
            >
              <Image
                src="/brand/axivers-logo-white-clean.png"
                alt="axivers"
                width={140}
                height={28}
                className="h-6 sm:h-7 w-auto object-contain hover:opacity-90 transition-opacity"
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
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* My Account */}
            <Link
              href="/account"
              className="p-1.5 text-zinc-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-zinc-800/40 hidden sm:flex items-center"
              aria-label="My Account"
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
                  strokeWidth="1.8"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center p-1.5 text-white hover:text-zinc-200 transition-colors cursor-pointer"
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
              <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold font-mono bg-white text-black shadow-md">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>

        {/* DESKTOP SHOP MEGA-MENU */}
        {isMegaMenuOpen && (
          <div
            className="hidden lg:block absolute top-full left-0 right-0 bg-[#0c0c0e]/98 backdrop-blur-xl border-b border-zinc-800 shadow-[0_30px_60px_rgba(0,0,0,0.9)] animate-fade-in"
            onMouseEnter={handleMouseEnterShop}
            onMouseLeave={handleMouseLeaveShop}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 grid grid-cols-12 gap-8 items-center">
              {/* Col 1: Primary Garment Launch */}
              <div className="col-span-4 space-y-4 border-r border-zinc-800/80 pr-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-display font-semibold block">
                    Curated Launch
                  </span>
                  <Link
                    href="/shop"
                    className="text-[10px] uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <span>&rarr;</span>
                  </Link>
                </div>

                <div className="space-y-2">
                  <Link
                    href="/shop"
                    className="group block p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-display font-semibold uppercase tracking-wider text-white">
                        All Garments
                      </span>
                      <span className="text-xs text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light mt-1">
                      Explore our complete catalog of elevated essentials
                    </p>
                  </Link>

                  <Link
                    href="/product/flagship-tee-black"
                    className="group block p-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-900 border border-zinc-800/60 hover:border-zinc-700 transition-all"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-display font-semibold uppercase tracking-wider text-white">
                        The Signature Essential
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#c5a059]/15 text-[#c5a059] font-mono font-medium">
                        Flagship
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-light mt-1">
                      180 GSM Mercerized Cotton • Minimalist Athletic Luxury
                    </p>
                  </Link>

                  <Link
                    href="/fabric-technology"
                    className="group block p-3 rounded-xl bg-zinc-900/20 hover:bg-zinc-900 border border-zinc-800/40 hover:border-zinc-700 transition-all"
                  >
                    <span className="text-xs font-display font-medium uppercase tracking-wider text-zinc-300 group-hover:text-white">
                      Textile Innovation &amp; Specs
                    </span>
                    <p className="text-[11px] text-zinc-500 font-light mt-0.5">
                      100% Mercerized Cotton • Tipped Ribbing Detailing
                    </p>
                  </Link>
                </div>
              </div>

              {/* Col 2: Visual Spotlight of the Flagship Product */}
              <div className="col-span-8 grid grid-cols-2 gap-4">
                <Link
                  href="/product/flagship-tee-black"
                  className="group relative h-48 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col justify-end p-5 shadow-xl hover:border-zinc-700 transition-all"
                >
                  <Image
                    src="/images/flagship-tee-black.jpg"
                    alt="The Signature Essential Crewneck"
                    fill
                    sizes="33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="relative z-20 space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#c5a059] font-mono block">
                      Initial Flagship Launch
                    </span>
                    <h4 className="text-xs font-display uppercase tracking-wider font-bold text-white">
                      Signature Crewneck — Onyx Black
                    </h4>
                    <p className="text-[10px] text-zinc-300 font-light">
                      180 GSM Mercerized Cotton • LKR 4,000.00
                    </p>
                  </div>
                </Link>

                <Link
                  href="/lookbook"
                  className="group relative h-48 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex flex-col justify-end p-5 shadow-xl hover:border-zinc-700 transition-all"
                >
                  <Image
                    src="/images/editorial-men-black.jpg"
                    alt="Axivers Editorial Campaign"
                    fill
                    sizes="33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="relative z-20 space-y-1">
                    <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono block">
                      Editorial Campaign
                    </span>
                    <h4 className="text-xs font-display uppercase tracking-wider font-bold text-white">
                      Own Your Axis • Lookbook
                    </h4>
                    <p className="text-[10px] text-zinc-300 font-light">
                      Crafted in Sri Lanka, Global Quality
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 bottom-0 left-0 w-5/6 max-w-sm bg-[#060606] border-r border-zinc-800/80 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Header Logo & Close */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src="/brand/axivers-logo-white-clean.png"
                    alt="axivers"
                    width={110}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white"
                  aria-label="Close Mobile Menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-1 text-xs uppercase tracking-[0.18em] font-display font-medium">
                {MAIN_NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`py-3 px-2 rounded-lg transition-colors flex items-center justify-between ${
                      pathname === item.href
                        ? 'bg-zinc-900 text-white font-bold'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                    }`}
                  >
                    <span>{item.name}</span>
                    <span className="text-zinc-600 text-[10px]">&rarr;</span>
                  </Link>
                ))}

                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-2 text-zinc-400 hover:text-white flex items-center justify-between"
                >
                  <span>My Account</span>
                  <span className="text-zinc-600 text-[10px]">&rarr;</span>
                </Link>

                <Link
                  href="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-2 text-zinc-400 hover:text-white flex items-center justify-between"
                >
                  <span>Track Order</span>
                  <span className="text-zinc-600 text-[10px]">&rarr;</span>
                </Link>
              </nav>
            </div>

            {/* Quick Customer Support links on mobile */}
            <div className="pt-6 border-t border-zinc-900 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500 font-display uppercase tracking-wider">
                <Link href="/size-guide" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-300">
                  Size Guide
                </Link>
                <Link href="/shipping" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-300">
                  Shipping
                </Link>
                <Link href="/returns" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-300">
                  Returns
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-zinc-300">
                  Contact
                </Link>
              </div>

              <p className="text-[10px] text-zinc-600 font-light">
                &copy; {new Date().getFullYear()} Axivers Clothing (Pvt) Ltd.<br />
                Colombo, Sri Lanka
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Global Interactive Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
