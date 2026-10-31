'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-[#09090b] text-[#ffffff] flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-16 sm:pb-20">
      {/* Hero Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/HeroBg.png"
          alt="Axivers Hero Background"
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover object-center"
        />
        {/* Soft vignette overlay for optimal center text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#09090b] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/30 to-black/80 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative flex flex-col items-center justify-center">
        {/* Centered Main Content Block */}
        <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
          {/* Subtle line tag */}
          <div className="inline-flex items-center space-x-3 text-zinc-400 justify-center">
            <span className="w-6 sm:w-8 h-[1px] bg-zinc-500" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-300 font-display font-medium">
              Axivers Luxury Garments
            </span>
            <span className="w-6 sm:w-8 h-[1px] bg-zinc-500" />
          </div>

          {/* Big Main Heading - Centered */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display tracking-tight leading-[1.08] text-white">
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal italic block">
              The Pinnacle of
            </span>
            <span className="font-medium italic text-white">Everyday </span>
            <span className="font-medium italic text-zinc-300">Luxury</span>
          </h1>

          {/* Detailed Paragraph - Centered */}
          <p className="text-xs sm:text-sm md:text-base font-light text-zinc-300/90 max-w-xl mx-auto leading-relaxed tracking-wide">
            Premium-engineered for the modern silhouette. Crafted from our
            signature 60/40 cotton-modal blend for an unparalleled cloud-soft
            drape, superior breathability and lasting everyday comfort.
          </p>

          {/* Call to Actions - Centered */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white text-black font-display text-xs uppercase tracking-[0.15em] font-bold border border-white hover:bg-zinc-200 transition-all duration-300 shadow-xl text-center cursor-pointer"
            >
              <span>SHOP THE COLLECTION</span>
              <span className="text-sm">&rarr;</span>
            </Link>
            <a
              href="#fabric"
              className="inline-flex items-center px-7 sm:px-8 py-3.5 sm:py-4 bg-black/60 backdrop-blur-md rounded-full text-white font-display text-xs uppercase tracking-[0.15em] font-medium border border-zinc-700/80 hover:border-white transition-all duration-300 text-center cursor-pointer"
            >
              <span>DISCOVER OUR FABRIC</span>
            </a>
          </div>
        </div>

        {/* Vertical Circle Badges Stack - Placed in proper location */}
        <div className="lg:absolute lg:right-6 xl:right-12 lg:top-1/2 lg:-translate-y-1/2 flex flex-col items-center justify-center gap-2.5 sm:gap-3 pt-12 lg:pt-0 z-20">
          {/* Circle 1: 60/40 COTTON-MODAL */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950/75 hover:bg-zinc-900/90 backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center text-center p-3 shadow-2xl group cursor-default">
            <svg
              className="w-4 h-4 text-white/80 group-hover:text-white transition-colors mb-1 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7c-2.5 0-4 1.5-4 4 0 3 4 6 4 6s4-3 4-6c0-2.5-1.5-4-4-4z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v4" />
            </svg>
            <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-wider group-hover:text-zinc-200 transition-colors leading-tight">
              60/40
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-display uppercase tracking-[0.16em] text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5 leading-tight">
              COTTON-MODAL
            </span>
          </div>

          {/* Delicate connector line */}
          <div className="w-[1px] h-3 sm:h-4 bg-gradient-to-b from-white/20 to-white/5" />

          {/* Circle 2: CRAFTED IN SRI LANKA */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950/75 hover:bg-zinc-900/90 backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center text-center p-3 shadow-2xl group cursor-default">
            <svg
              className="w-4 h-4 text-white/80 group-hover:text-white transition-colors mb-1 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[7.5px] sm:text-[8px] font-display uppercase tracking-[0.16em] text-zinc-400 group-hover:text-zinc-300 transition-colors leading-tight">
              CRAFTED IN
            </span>
            <span className="text-[10px] sm:text-[11px] font-display uppercase tracking-[0.14em] font-bold text-white group-hover:text-zinc-200 transition-colors mt-0.5 leading-tight">
              SRI LANKA
            </span>
          </div>

          {/* Delicate connector line */}
          <div className="w-[1px] h-3 sm:h-4 bg-gradient-to-b from-white/20 to-white/5" />

          {/* Circle 3: PREMIUM QUALITY */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-950/75 hover:bg-zinc-900/90 backdrop-blur-md border border-white/15 hover:border-white/40 transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center text-center p-3 shadow-2xl group cursor-default">
            <svg
              className="w-4 h-4 text-white/80 group-hover:text-white transition-colors mb-1 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 3h12l4 6-10 12L2 9l4-6z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 9h20" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 3l-2 6 4 12 4-12-2-6" />
            </svg>
            <span className="text-[10px] sm:text-[11px] font-display uppercase tracking-[0.14em] font-bold text-white group-hover:text-zinc-200 transition-colors leading-tight">
              PREMIUM
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-display uppercase tracking-[0.16em] text-zinc-400 group-hover:text-zinc-300 transition-colors mt-0.5 leading-tight">
              QUALITY
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
