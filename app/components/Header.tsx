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

const SHOP_CATEGORIES = [
  { name: 'All Garments', href: '/shop', desc: 'Explore the complete minimal collection' },
  { name: 'The Signature Essential', href: '/product/flagship-tee-black', desc: '180 GSM Mercerized Cotton Crewneck' },
  { name: 'Lookbook', href: '/lookbook', desc: 'Editorial campaign & styling study' },
];

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  const shopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setIsMobileMenuOpen(false);
    setIsShopDropdownOpen(false);
  }, [pathname]);

  const handleMouseEnterShop = () => {
    if (shopTimeoutRef.current) clearTimeout(shopTimeoutRef.current);
    setIsShopDropdownOpen(true);
  };

  const handleMouseLeaveShop = () => {
    shopTimeoutRef.current = setTimeout(() => {
      setIsShopDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      {/* Launch Preview / Maintenance Notice Banner if orders are disabled */}
      {!storeSettings.ordersEnabled && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#060606] text-zinc-300 border-b border-zinc-800 text-[11px] font-display py-2 px-4 text-center tracking-wider shadow-sm flex items-center justify-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span>
            Axivers Launch Preview: Browse the collection &amp; join the early-access list.
          </span>
        </div>
      )}

      {/* SECTION 1 — MINIMAL HEADER (White Background, Center Black Logo) */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md text-[#060606] border-b border-zinc-200/80 py-3 sm:py-3.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] ${
          !storeSettings.ordersEnabled ? 'top-8' : 'top-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Desktop Left: Shop & Our Story */}
          <div className="flex items-center space-x-6 sm:space-x-8">
            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-1.5 -ml-1.5 text-[#060606] hover:opacity-70 focus:outline-none cursor-pointer"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.18em] font-display font-medium text-zinc-700">
              {/* Shop Link with Clean Dropdown */}
              <div
                className="relative py-1"
                onMouseEnter={handleMouseEnterShop}
                onMouseLeave={handleMouseLeaveShop}
              >
                <Link
                  href="/shop"
                  className={`inline-flex items-center space-x-1.5 py-1 transition-colors hover:text-[#060606] cursor-pointer ${
                    pathname.startsWith('/shop') || pathname.startsWith('/product')
                      ? 'text-[#060606] font-bold'
                      : 'text-zinc-700'
                  }`}
                >
                  <span>Shop</span>
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 text-zinc-500 ${
                      isShopDropdownOpen ? 'rotate-180 text-black' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Minimal Shop Dropdown */}
                {isShopDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white border border-zinc-200 shadow-xl rounded-xl p-3 space-y-1 z-50 animate-fade-in">
                    {SHOP_CATEGORIES.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        className="block px-3 py-2 rounded-lg hover:bg-[#f6f6f6] transition-colors group"
                      >
                        <span className="text-xs font-semibold text-[#060606] block group-hover:text-black">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-light block tracking-normal normal-case">
                          {cat.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Our Story Link */}
              <Link
                href="/our-story"
                className={`py-1 transition-colors hover:text-[#060606] cursor-pointer ${
                  pathname === '/our-story' ? 'text-[#060606] font-bold' : 'text-zinc-700'
                }`}
              >
                Our Story
              </Link>
            </nav>
          </div>

          {/* Center: Exact Original Black Axivers Logo */}
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center cursor-pointer focus:outline-none"
              aria-label="Axivers Home"
            >
              <Image
                src="/brand/axivers-logo-black-clean.png"
                alt="Axivers"
                width={130}
                height={26}
                className="h-6 sm:h-7 w-auto object-contain hover:opacity-85 transition-opacity"
                priority
              />
            </Link>
          </div>

          {/* Desktop/Mobile Right: Utility Icons (Search, My Account, Shopping Bag) */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-[#060606]">
            {/* Search Icon */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1.5 text-zinc-700 hover:text-[#060606] transition-colors cursor-pointer rounded-lg hover:bg-zinc-100"
              aria-label="Search garments"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* My Account Icon */}
            <Link
              href="/account"
              className="p-1.5 text-zinc-700 hover:text-[#060606] transition-colors cursor-pointer rounded-lg hover:bg-zinc-100 hidden sm:flex items-center"
              aria-label="My Account"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            {/* Shopping Bag / Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center p-1.5 text-[#060606] hover:opacity-80 transition-opacity cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold font-mono bg-[#060606] text-white shadow-sm">
                {totalCartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION (Clean Light Theme) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 bottom-0 left-0 w-4/5 max-w-sm bg-white border-r border-zinc-200 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Header: Black Logo & Close */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center"
                >
                  <Image
                    src="/brand/axivers-logo-black-clean.png"
                    alt="Axivers"
                    width={110}
                    height={22}
                    className="h-5 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 text-zinc-500 hover:text-black rounded-lg hover:bg-zinc-100"
                  aria-label="Close Mobile Menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col space-y-1 text-xs uppercase tracking-[0.16em] font-display font-medium">
                <Link
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    pathname === '/shop'
                      ? 'bg-zinc-100 text-[#060606] font-bold'
                      : 'text-zinc-700 hover:text-black hover:bg-zinc-50'
                  }`}
                >
                  <span>Shop All Garments</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>

                <Link
                  href="/product/flagship-tee-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-3 rounded-lg text-zinc-700 hover:text-black hover:bg-zinc-50 flex items-center justify-between"
                >
                  <span>The Signature Essential</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>

                <Link
                  href="/our-story"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    pathname === '/our-story'
                      ? 'bg-zinc-100 text-[#060606] font-bold'
                      : 'text-zinc-700 hover:text-black hover:bg-zinc-50'
                  }`}
                >
                  <span>Our Story</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>

                <Link
                  href="/fabric-technology"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    pathname === '/fabric-technology'
                      ? 'bg-zinc-100 text-[#060606] font-bold'
                      : 'text-zinc-700 hover:text-black hover:bg-zinc-50'
                  }`}
                >
                  <span>Fabric &amp; Craftsmanship</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>

                <Link
                  href="/lookbook"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`py-3 px-3 rounded-lg transition-colors flex items-center justify-between ${
                    pathname === '/lookbook'
                      ? 'bg-zinc-100 text-[#060606] font-bold'
                      : 'text-zinc-700 hover:text-black hover:bg-zinc-50'
                  }`}
                >
                  <span>Lookbook</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>

                <div className="pt-2 border-t border-zinc-100" />

                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-3 text-zinc-600 hover:text-black flex items-center justify-between"
                >
                  <span>My Account</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>

                <Link
                  href="/track-order"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-3 text-zinc-600 hover:text-black flex items-center justify-between"
                >
                  <span>Track Order</span>
                  <span className="text-zinc-400 text-xs">&rarr;</span>
                </Link>
              </nav>
            </div>

            {/* Quick Customer Support links on mobile */}
            <div className="pt-6 border-t border-zinc-200 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-500 font-display uppercase tracking-wider">
                <Link href="/size-guide" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Size Guide
                </Link>
                <Link href="/shipping" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Shipping
                </Link>
                <Link href="/returns" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Returns
                </Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-black">
                  Contact
                </Link>
              </div>

              <p className="text-[10px] text-zinc-400 font-light">
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