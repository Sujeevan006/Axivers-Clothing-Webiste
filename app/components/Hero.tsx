'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] bg-[#060606] text-white flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-16">
      {/* Editorial Fashion Photography Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/editorial-pedestal-black.png"
          alt="Axivers Elevated Essentials"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center opacity-55 sm:opacity-50"
        />
        {/* Subtle Vignette for Maximum Fashion Impact & Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606]/60 pointer-events-none" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative text-center space-y-6 sm:space-y-8">
        {/* Subtle Brand Tagline */}
        <div className="inline-flex items-center space-x-3 text-zinc-400 justify-center">
          <span className="w-6 sm:w-8 h-[1px] bg-zinc-600" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-mono font-medium">
            Own Your Axis
          </span>
          <span className="w-6 sm:w-8 h-[1px] bg-zinc-600" />
        </div>

        {/* Clean, Refined Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light tracking-tight leading-[1.08] uppercase text-white">
          Elevated <br className="sm:hidden" />
          <span className="font-bold">Essentials.</span>
        </h1>

        {/* Concise Supporting Copy */}
        <p className="text-sm sm:text-base md:text-lg font-light text-zinc-300 max-w-xl mx-auto leading-relaxed tracking-wide">
          Designed for the modern lifestyle.
        </p>

        {/* Clean, Elegant Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#060606] text-xs font-display uppercase tracking-[0.18em] font-bold rounded-lg hover:bg-zinc-200 transition-all text-center cursor-pointer shadow-lg"
          >
            Shop Collection
          </Link>
          <Link
            href="/our-story"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-white text-xs font-display uppercase tracking-[0.18em] font-medium rounded-lg border border-white/60 hover:border-white hover:bg-white/10 transition-all text-center cursor-pointer"
          >
            Discover Axivers
          </Link>
        </div>
      </div>
    </section>
  );
};