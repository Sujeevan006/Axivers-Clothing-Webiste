'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStoreSettings } from '@/services/settingsService';

export const Hero: React.FC = () => {
  const [ordersEnabled, setOrdersEnabled] = useState(true);

  useEffect(() => {
    getStoreSettings().then((settings) => {
      if (settings) {
        setOrdersEnabled(settings.ordersEnabled);
      }
    });
  }, []);

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-[#060606] text-[#ffffff] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
      {/* Hero Background with Soft Ambient Gradient */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/editorial-pedestal-black.png"
          alt="Axivers Elevated Essentials"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center opacity-45"
        />
        {/* Editorial Vignette Overlays for Maximum Contrast & Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606]/85 via-[#060606]/55 to-[#060606] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-[#060606]/95 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative flex flex-col items-center justify-center">
        {/* Centered Main Content Block */}
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Subtle line tag with Secondary Tagline */}
          <div className="inline-flex items-center space-x-3 text-zinc-400 justify-center">
            <span className="w-6 sm:w-8 h-[1px] bg-zinc-600" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-mono font-medium">
              Own Your Axis
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-zinc-600" />
          </div>

          {/* Master Suggested Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-light tracking-tight leading-[1.05] text-white uppercase">
            Elevated <br />
            <span className="font-bold tracking-tight text-white">Essentials.</span>
          </h1>

          {/* Master Blueprint Supporting Copy */}
          <p className="text-xs sm:text-sm md:text-base font-light text-zinc-300/90 max-w-xl mx-auto leading-relaxed tracking-wide">
            Designed for the modern lifestyle. Refined comfort, minimalist style, and considered craftsmanship from Sri Lanka.
          </p>

          {/* Call to Actions - Context Aware for Launch Mode */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-display text-xs uppercase tracking-[0.18em] font-bold border border-white hover:bg-zinc-200 transition-all duration-300 shadow-2xl text-center cursor-pointer"
            >
              <span>{ordersEnabled ? 'EXPLORE THE COLLECTION' : 'EXPLORE THE COLLECTION'}</span>
              <span className="text-sm">&rarr;</span>
            </Link>
            <Link
              href="/our-story"
              className="inline-flex items-center px-7 sm:px-8 py-3.5 sm:py-4 bg-black/60 backdrop-blur-md rounded-full text-white font-display text-xs uppercase tracking-[0.18em] font-medium border border-zinc-800 hover:border-zinc-500 transition-all duration-300 text-center cursor-pointer"
            >
              <span>DISCOVER AXIVERS</span>
            </Link>
          </div>
        </div>

        {/* Vertical Specification Badges Stack */}
        <div className="lg:absolute lg:right-6 xl:right-12 lg:top-1/2 lg:-translate-y-1/2 flex flex-col items-center justify-center gap-2.5 sm:gap-3 pt-12 lg:pt-0 z-20">
          {/* Circle 1: 180 GSM MERCERIZED COTTON */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950/80 hover:bg-zinc-900/95 backdrop-blur-md border border-white/10 hover:border-[#c5a059]/40 transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center text-center p-3 shadow-2xl group cursor-default">
            <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider group-hover:text-zinc-200 transition-colors leading-tight">
              180 GSM
            </span>
            <span className="text-[7px] sm:text-[7.5px] font-display uppercase tracking-[0.14em] text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5 leading-tight">
              MERCERIZED COTTON
            </span>
          </div>

          {/* Delicate connector line */}
          <div className="w-[1px] h-3 sm:h-4 bg-gradient-to-b from-white/20 to-white/5" />

          {/* Circle 2: CRAFTED IN SRI LANKA */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950/80 hover:bg-zinc-900/95 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center text-center p-3 shadow-2xl group cursor-default">
            <span className="text-[7.5px] sm:text-[8px] font-display uppercase tracking-[0.16em] text-zinc-400 group-hover:text-zinc-300 transition-colors leading-tight">
              MADE IN
            </span>
            <span className="text-[10px] sm:text-[11px] font-display uppercase tracking-[0.14em] font-bold text-white group-hover:text-zinc-200 transition-colors mt-0.5 leading-tight">
              SRI LANKA
            </span>
          </div>

          {/* Delicate connector line */}
          <div className="w-[1px] h-3 sm:h-4 bg-gradient-to-b from-white/20 to-white/5" />

          {/* Circle 3: ATHLETIC LUXURY */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950/80 hover:bg-zinc-900/95 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center text-center p-3 shadow-2xl group cursor-default">
            <span className="text-[10px] sm:text-[11px] font-display uppercase tracking-[0.14em] font-bold text-white group-hover:text-zinc-200 transition-colors leading-tight">
              ATHLETIC
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-display uppercase tracking-[0.16em] text-[#c5a059] group-hover:text-[#d4af37] transition-colors mt-0.5 leading-tight">
              LUXURY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
