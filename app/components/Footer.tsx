'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);

    try {
      setSubscribed(true);
      setTimeout(() => {
        setIsSubmitting(false);
      }, 400);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="footer" className="bg-[#060606] text-white pt-16 sm:pt-20 pb-12 border-t border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid: Brand Statement + Compact Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-zinc-800/80">
          {/* Brand Info & Socials */}
          <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
            <Link href="/" className="inline-block" aria-label="Axivers Home">
              <Image
                src="/brand/axivers-logo-white-clean.png"
                alt="Axivers"
                width={130}
                height={26}
                className="h-6 sm:h-7 w-auto object-contain hover:opacity-90 transition-opacity"
              />
            </Link>
            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm tracking-wide">
              Elevated essentials for the modern lifestyle.
            </p>

            {/* Verified Social Media Links */}
            <div className="flex items-center space-x-3 pt-2 text-zinc-400">
              <a
                href="https://www.instagram.com/axivers.clothing/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://web.facebook.com/profile.php?id=61583403234776"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/110519950"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center hover:border-white hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-display font-bold text-white">
              Shop
            </h4>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Garments
                </Link>
              </li>
              <li>
                <Link href="/product/flagship-tee-black" className="hover:text-white transition-colors">
                  The Signature Essential
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-white transition-colors">
                  Lookbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-display font-bold text-white">
              Brand
            </h4>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/fabric-technology" className="hover:text-white transition-colors">
                  Fabric &amp; Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care & Legal Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-display font-bold text-white">
              Customer Care &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs font-light text-zinc-400">
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns &amp; Exchanges
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Priority Access Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-4 border-b border-zinc-850">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-mono block">
              Priority Access
            </span>
            <h4 className="text-sm uppercase tracking-[0.18em] font-display font-bold text-white">
              Join the Axivers Release Registry
            </h4>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="bg-zinc-900 border border-zinc-800 text-xs px-4 py-2.5 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-500 rounded-lg flex-1 md:w-64 tracking-wide"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors rounded-lg cursor-pointer shrink-0 disabled:opacity-50"
            >
              {subscribed ? 'Joined' : 'Join'}
            </button>
          </form>
        </div>

        {/* Copyright & Confirmation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-light text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Axivers Clothing (Pvt) Ltd. All rights reserved.
          </div>
          <div className="text-[11px] text-zinc-600">
            Colombo, Sri Lanka • Own Your Axis
          </div>
        </div>
      </div>
    </footer>
  );
};