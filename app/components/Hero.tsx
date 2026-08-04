'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] bg-[#09090b] text-[#ffffff] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-12 sm:pb-16">
      {/* Ambient Radial Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-white/[0.03] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-white/[0.02] rounded-full blur-[120px] sm:blur-[160px] pointer-events-none"></div>

      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:32px_32px] opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Typography & Call to Action */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
          {/* Subtle tag */}
          <div className="inline-flex items-center space-x-2.5 sm:space-x-3 border border-white/20 px-3 sm:px-3.5 py-1 sm:py-1.5 bg-zinc-900/90 backdrop-blur-md rounded-full">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white font-display font-semibold">
              Axivers Luxury Garments
            </span>
          </div>

          {/* Big Header Tagline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-tight leading-[1.15] sm:leading-[1.1] text-white">
            The Pinnacle of <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Everyday Luxury.
            </span>
          </h1>

          {/* Detailed Paragraph */}
          <p className="text-xs sm:text-base font-light text-zinc-400 max-w-xl leading-relaxed tracking-wide">
            Precision-engineered for the modern silhouette. Crafted from our
            signature 60/40 Combed Cotton-Modal blend for an unparalleled
            cloud-soft drape, superior breathability, and lasting everyday
            comfort.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-1 sm:pt-2">
            <Link
              href="/shop"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-white text-black font-display text-xs uppercase tracking-[0.15em] font-bold border border-white hover:bg-zinc-200 transition-all duration-300 shadow-xl text-center cursor-pointer"
            >
              SHOP THE FLAGSHIP
            </Link>
            <a
              href="#categories"
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-zinc-900/80 backdrop-blur-md rounded-lg text-white font-display text-xs uppercase tracking-[0.15em] font-semibold border border-zinc-700 hover:border-white transition-all duration-300 text-center cursor-pointer"
            >
              DISCOVER OUR FABRIC
            </a>
          </div>

          {/* Technical properties summaries */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-zinc-800 max-w-lg">
            <div className="border-l border-zinc-800 sm:border-0 pl-3 sm:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 block mb-0.5 sm:mb-1">
                BRAND
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white">
                Axivers
              </span>
            </div>
            <div className="border-l border-zinc-800 sm:border-0 pl-3 sm:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 block mb-0.5 sm:mb-1">
                FABRIC
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white">
                60/40 COTTON-MODAL
              </span>
            </div>
            <div className="border-l border-zinc-800 sm:border-0 pl-3 sm:pl-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 block mb-0.5 sm:mb-1">
                ORIGIN
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white">
                CRAFTED IN SRI LANKA
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fashion Showcase Card */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="relative glass-card-white p-4 sm:p-5 z-10 shadow-2xl rounded-2xl max-w-md mx-auto lg:max-w-none">
            <div className="aspect-[3/4] bg-zinc-950 overflow-hidden relative group rounded-xl">
              <Image
                src="/images/pdp_front.jpg"
                alt="Axivers Athletic Luxury Garment"
                width={600}
                height={800}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                priority={true}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex items-end p-4 sm:p-6">
                <div className="space-y-1">
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-zinc-300 font-semibold font-display">
                    Flagship Collection
                  </span>
                  <p className="text-xs sm:text-sm uppercase tracking-wider font-bold text-white">
                    Premium Piping Crewneck
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
