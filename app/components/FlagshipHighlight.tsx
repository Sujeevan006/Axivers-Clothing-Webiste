'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const FlagshipHighlight: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#060606] text-[#ffffff] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Product Visual Frame with Approved Black T-shirt */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800/80 bg-[#0a0a0c] p-6 shadow-2xl group flex items-center justify-center">
              <Image
                src="/images/flagship-tee-black.jpg"
                alt="Axivers Signature Essential Crewneck T-Shirt"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-black/75 backdrop-blur-md text-white text-[9px] uppercase tracking-[0.2em] font-mono px-3 py-1 rounded-full border border-white/10">
                  Flagship S01
                </span>
                <span className="bg-[#c5a059]/15 backdrop-blur-md text-[#c5a059] text-[9px] uppercase tracking-[0.2em] font-mono px-3 py-1 rounded-full border border-[#c5a059]/30">
                  Onyx Black
                </span>
              </div>
              <div className="absolute bottom-4 right-4 z-10">
                <span className="text-[10px] font-mono text-zinc-400 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800">
                  180 GSM Mercerized
                </span>
              </div>
            </div>
          </div>

          {/* Right: Master Blueprint Flagship Specifications & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Flagship Product Specification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                THE SIGNATURE ESSENTIAL.
              </h2>
              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed pt-1">
                Thoughtfully designed for everyday confidence, with a refined silhouette, distinctive rib-knit detailing, and a minimalist signature finish.
              </p>
            </div>

            {/* Spec Matrix List */}
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-zinc-900 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Target Price
                </span>
                <div className="text-sm font-mono font-bold text-white">
                  LKR 4,000.00
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Textile Composition
                </span>
                <div className="text-xs font-display font-medium text-white">
                  180 GSM 100% Mercerized Cotton
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Collar Detailing
                </span>
                <div className="text-xs font-display font-medium text-white">
                  Contrasting Premium Gray Rib-Knit
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Sleeve Cuffs
                </span>
                <div className="text-xs font-display font-medium text-white">
                  Tipped Ribbing with Outer White Stripe
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Chest Branding
                </span>
                <div className="text-xs font-display font-medium text-white">
                  Small Reflective Metallic-Gold Print
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  Initial Sizing
                </span>
                <div className="text-xs font-mono font-medium text-white">
                  S / M / L / XL
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/product/flagship-tee-black"
                className="px-7 py-3.5 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl inline-flex items-center space-x-2"
              >
                <span>View Product Details</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/fabric-technology"
                className="px-6 py-3.5 bg-transparent border border-zinc-800 text-zinc-300 font-display text-xs uppercase tracking-wider font-medium rounded-full hover:border-zinc-500 hover:text-white transition-all"
              >
                <span>Fabric Story</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
