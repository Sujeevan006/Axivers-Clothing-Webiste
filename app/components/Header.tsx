"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import logo from '../../src/assets/Logo2.png';

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
          ? 'bg-transparent text-white border-b border-transparent py-6'
          : 'bg-brand-dark/90 backdrop-blur-md text-brand-light border-b border-brand-light/10 py-4 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Navigation Links (Left) */}
        <nav className="hidden md:flex items-center space-x-8 text-md font-display font-semibold text-brand-light">
          <Link
            href="/products"
            className={`hover:opacity-60 transition-opacity relative group py-2 cursor-pointer ${
              pathname === '/products' ? 'opacity-100 font-bold' : 'opacity-85'
            }`}
          >
            Shop
            <span
              className={`absolute bottom-0 left-0 w-full h-[1px] bg-brand-light transform ${
                pathname === '/products' ? 'scale-x-100' : 'scale-x-0'
              } group-hover:scale-x-100 transition-transform duration-300 origin-left`}
            ></span>
          </Link>

          <a
            href="/#fabric"
            className="hover:opacity-60 transition-opacity relative group py-2 cursor-pointer opacity-85"
          >
            Fabric
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>

          <a
            href="#footer"
            onClick={(e) => {
              e.preventDefault();
              const footerSection = document.querySelector('footer');
              if (footerSection)
                footerSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:opacity-60 transition-opacity relative group py-2 cursor-pointer opacity-85"
          >
            About
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-light transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>
        </nav>

        {/* Mobile Menu Icon (Left) */}
        <div className="md:hidden flex items-center">
          <Link
            href={isLanding ? '/products' : '/'}
            className="focus:outline-none hover:opacity-60 transition-opacity cursor-pointer text-xs font-display uppercase tracking-widest font-semibold text-brand-light"
          >
            {isLanding ? 'Shop' : 'Home'}
          </Link>
        </div>

        {/* Logo (Center) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <Link href="/" className="flex items-center cursor-pointer focus:outline-none">
            <Image
              src={logo}
              alt="axivers"
              className="h-10 sm:h-12 w-auto object-contain hover:scale-95 transition-all duration-300 transform"
              priority
            />
          </Link>
        </div>

        {/* Shopping Cart & Actions (Right) */}
        <div className="flex items-center space-x-6 text-brand-light">
          <button
            onClick={() => setIsCartOpen(true)}
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
            <span className="absolute -right-5 flex h-5 w-5 items-center justify-center rounded-md text-[12px] font-bold font-sans bg-brand-light text-brand-dark transition-all duration-300">
              {totalCartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
