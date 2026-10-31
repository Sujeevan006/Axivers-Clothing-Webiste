'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const FabricStory: React.FC = () => {
  return (
    <section id="fabric" className="relative py-24 sm:py-28 bg-[#09090b] text-[#ffffff] overflow-hidden">
      {/* Background with fabric swirl texture */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <Image
          src="/images/fabricbg.png"
          alt="Fabric Technology Background"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#09090b] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 60/40 COTTON-MODAL Highlight */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              FABRIC TECHNOLOGY
            </span>

            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-black tracking-tight text-white leading-none">
                60/40
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-display uppercase tracking-[0.2em] font-bold text-white">
                COTTON-MODAL
              </h3>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-lg pt-2 pb-4">
              A refined blend of 60% premium cotton and 40% modal for unmatched
              softness, breathability and durability.
            </p>

            <div>
              <Link
                href="/fabric-technology"
                className="inline-flex items-center space-x-2 px-6 sm:px-7 py-3 rounded-full bg-white text-black font-display text-xs uppercase tracking-[0.15em] font-bold hover:bg-zinc-200 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>EXPLORE THE FABRIC</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Circular Benefit Badges */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* Feature 1: Breathable */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10a2 2 0 10-2-2M5 12h14a2 2 0 10-2-2M2 16h10a2 2 0 10-2-2" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm uppercase tracking-widest font-display font-bold text-white">
                  BREATHABLE
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Keeps you fresh all day.
                </p>
              </div>
            </div>

            {/* Feature 2: Moisture Wicking */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 7a5 5 0 00-5 5c0 2.761 2.239 5 5 5s5-2.239 5-5a5 5 0 00-5-5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6c-3 4-4 6-4 8a4 4 0 008 0c0-2-1-4-4-8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm uppercase tracking-widest font-display font-bold text-white">
                  MOISTURE WICKING
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Dries faster, feels lighter.
                </p>
              </div>
            </div>

            {/* Feature 3: Cloud Drape */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white/90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs sm:text-sm uppercase tracking-widest font-display font-bold text-white">
                  CLOUD DRAPE
                </h4>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Smooth, natural fall.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
