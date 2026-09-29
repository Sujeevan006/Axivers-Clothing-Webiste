"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StoreSettings } from '@/types/settings';
import { DEFAULT_STORE_SETTINGS, getStoreSettings, subscribeToStoreSettings } from '@/services/settingsService';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  useEffect(() => {
    getStoreSettings().then((settings) => {
      if (settings) setStoreSettings(settings);
    });

    const unsubscribe = subscribeToStoreSettings((settings) => {
      if (settings) setStoreSettings(settings);
    });

    return () => unsubscribe();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://web.facebook.com/profile.php?id=61583403234776',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/axivers.clothing/',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/110519950',
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#09090b] text-[#ffffff] pt-16 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-zinc-800/60">
        
        {/* Left Column: Brand & Tagline */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center">
            <Image
              src="/LogoOriginal.png"
              alt={storeSettings.storeName || "axivers"}
              width={140}
              height={45}
              className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm tracking-wide">
            Precision-crafted athletic luxury essentials designed for the modern lifestyle. Re-engineering basics from the yarns up.
          </p>
          <div className="pt-2 text-xs font-mono text-zinc-400 space-y-1">
            <p>Support: <a href={`mailto:${storeSettings.supportEmail}`} className="text-white hover:underline">{storeSettings.supportEmail}</a></p>
            <p>Hotline: <a href={`tel:${storeSettings.supportPhone}`} className="text-white hover:underline">{storeSettings.supportPhone}</a></p>
          </div>
        </div>

        {/* Center Column 1: Shop Menu */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-display font-bold text-white">Shop</h4>
          <ul className="space-y-2 text-xs font-light text-zinc-400">
            <li><Link href="/shop" className="hover:text-white transition-colors">Catalog</Link></li>
            <li><Link href="/shop?category=flagship" className="hover:text-white transition-colors">Flagship Outerwear</Link></li>
            <li><Link href="/shop?category=men" className="hover:text-white transition-colors">Men&apos;s Collection</Link></li>
            <li><Link href="/shop?category=women" className="hover:text-white transition-colors">Women&apos;s Collection</Link></li>
            <li><Link href="/shop?category=technical" className="hover:text-white transition-colors">Technical Garments</Link></li>
          </ul>
        </div>

        {/* Center Column 2: Information & Customer Service */}
        <div className="md:col-span-2 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-display font-bold text-white">Orders & Care</h4>
          <ul className="space-y-2 text-xs font-light text-zinc-400">
            <li><Link href="/track-order" className="text-white font-semibold hover:underline">Track Your Order</Link></li>
            <li><span className="hover:text-white transition-colors cursor-default">Island-wide Delivery</span></li>
            <li><span className="hover:text-white transition-colors cursor-default">Bank Transfer & COD</span></li>
            <li><span className="hover:text-white transition-colors cursor-default">Care Instructions</span></li>
          </ul>
        </div>

        {/* Right Column: Newsletter Signup */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-display font-bold text-white">Newsletter</h4>
          <p className="text-xs text-zinc-400 font-light tracking-wide leading-relaxed">
            Subscribe to receive priority access to limited edition drops and fabric research.
          </p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 pt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER EMAIL ADDRESS"
              required
              className="bg-black/60 border border-zinc-800 text-xs px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-white rounded-md flex-1 tracking-wider font-mono uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-display text-xs uppercase tracking-widest font-bold border border-white hover:bg-zinc-200 transition-all duration-300 rounded-md cursor-pointer text-center"
            >
              {subscribed ? 'SUBSCRIBED' : 'JOIN'}
            </button>
          </form>
        </div>
      </div>

      {/* Social Links & Payment Methods */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs tracking-widest font-display uppercase font-semibold text-zinc-400">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-2 group"
              aria-label={social.name}
            >
              <span className="opacity-70 group-hover:opacity-100 transition-opacity">
                {social.icon}
              </span>
              <span>{social.name}</span>
            </a>
          ))}
        </div>
        
        {/* Payment Methods */}
        <div className="flex items-center space-x-4 text-[9px] font-mono text-zinc-400 tracking-wider">
          <span>BANK TRANSFER</span>
          <span>•</span>
          <span>CASH ON DELIVERY</span>
          <span>•</span>
          <span>VISA</span>
          <span>•</span>
          <span>MASTERCARD</span>
          <span>•</span>
          <span>PAYHERE</span>
        </div>
      </div>

      {/* Differentiated Pure Black Sub-Footer Column */}
      <div className="w-full bg-[#000000] border-t border-zinc-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="text-xs font-mono tracking-widest text-white uppercase font-bold">
            © 2026 AXIVERS CLOTHING PVT LTD.
          </div>
          <div className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-medium">
            MADE IN SRI LANKA // FOR THE WORLD.
          </div>
        </div>
      </div>
    </footer>
  );
};
