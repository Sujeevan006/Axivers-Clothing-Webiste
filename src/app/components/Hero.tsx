"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] bg-[#09090b] text-[#ffffff] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Ambient Radial Spotlights */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none"></div>

      {/* Subtle Technical Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Typography & Call to Action */}
        <div className="lg:col-span-7 space-y-8 text-left">
          {/* Subtle tag */}
          <div className="inline-flex items-center space-x-3 border border-white/20 px-3.5 py-1.5 bg-zinc-900/90 backdrop-blur-md rounded-full">
            <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white font-display font-semibold">
              Axivers Luxury Garments
            </span>
          </div>

          {/* Big Header Tagline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-light tracking-tight leading-[1.1] text-white">
            The Pinnacle of <br />
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
              Athletic Luxury.
            </span>
          </h1>

          {/* Detailed Paragraph */}
          <p className="text-sm sm:text-base font-light text-zinc-400 max-w-xl leading-relaxed tracking-wide">
            Precision-engineered garments crafted for high performance and modern silhouette. 
            Structured with heavy combed cotton and modal fibers for an unparalleled soft drape and moisture control.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/shop"
              className="px-8 py-4 rounded-lg bg-white text-black font-display text-xs uppercase tracking-[0.15em] font-bold border border-white hover:bg-zinc-200 transition-all duration-300 shadow-xl text-center"
            >
              Explore Storefront
            </Link>
            <a
              href="#categories"
              className="px-8 py-4 bg-zinc-900/80 backdrop-blur-md rounded-lg text-white font-display text-xs uppercase tracking-[0.15em] font-semibold border border-zinc-700 hover:border-white transition-all duration-300 text-center"
            >
              Browse Categories
            </a>
          </div>

          {/* Technical properties summaries */}
          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800 max-w-lg">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                01 / BRAND
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white">
                Axivers Garments
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                02 / FABRIC
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white">
                Cotton-Modal Blend
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block mb-1">
                03 / ESTABLISHED
              </span>
              <span className="text-xs uppercase tracking-wider font-semibold text-white">
                Sri Lanka
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fashion Showcase Card */}
        <div className="lg:col-span-5 relative hidden lg:block">
          <div className="relative glass-card-white p-5 z-10 shadow-2xl rounded-2xl">
            <div className="aspect-[3/4] bg-zinc-950 overflow-hidden relative group rounded-xl">
              <Image
                src="/images/pdp_front.jpg"
                alt="Axivers Athletic Luxury Garment"
                width={600}
                height={800}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority={true}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent flex items-end p-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-semibold font-display">
                    Flagship Collection
                  </span>
                  <p className="text-sm uppercase tracking-wider font-bold text-white">
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
