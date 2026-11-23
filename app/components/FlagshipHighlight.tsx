'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const FlagshipHighlight: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-ink text-paper border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Product Visual Frame with Approved Black T-shirt */}
          <div className="lg:col-span-6">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden border border-zinc-800/80 bg-ink p-6 shadow-2xl group flex items-center justify-center">
              <Image
                src="/images/flagship-tee-black.jpg"
                alt="Axivers Signature Essential Crewneck T-Shirt"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-4 group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="bg-ink/75 backdrop-blur-md text-paper text-sm normal-case tracking-[0.2em] font-mono px-3 py-1 rounded-full border border-paper/10">
                  Flagship S01
                </span>
                <span className="bg-accent/15 backdrop-blur-md text-accent text-sm normal-case tracking-[0.2em] font-mono px-3 py-1 rounded-full border border-accent/30">
                  Onyx Black
                </span>
              </div>
              <div className="absolute bottom-4 right-4 z-10">
                <span className="text-sm font-mono text-zinc-400 bg-ink/75 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-800">
                  180 GSM Mercerized
                </span>
              </div>
            </div>
          </div>

          {/* Right: Master Blueprint Flagship Specifications & CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>Flagship Product Specification</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold normal-case tracking-tight text-paper leading-tight">
                THE SIGNATURE ESSENTIAL.
              </h2>
              <p className="text-sm sm:text-sm font-normal text-zinc-300 leading-relaxed pt-1">
                Thoughtfully designed for everyday confidence, with a refined silhouette, distinctive rib-knit detailing, and a minimalist signature finish.
              </p>
            </div>

            {/* Spec Matrix List */}
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-zinc-900 text-sm">
              <div className="space-y-1">
                <span className="text-sm font-mono normal-case tracking-wider text-zinc-500">
                  Target Price
                </span>
                <div className="text-sm font-mono font-bold text-paper">
                  LKR 4,000.00
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-mono normal-case tracking-wider text-zinc-500">
                  Textile Composition
                </span>
                <div className="text-sm font-display font-medium text-paper">
                  180 GSM 100% Mercerized Cotton
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-mono normal-case tracking-wider text-zinc-500">
                  Collar Detailing
                </span>
                <div className="text-sm font-display font-medium text-paper">
                  Contrasting Premium Gray Rib-Knit
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-mono normal-case tracking-wider text-zinc-500">
                  Sleeve Cuffs
                </span>
                <div className="text-sm font-display font-medium text-paper">
                  Tipped Ribbing with Outer White Stripe
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-mono normal-case tracking-wider text-zinc-500">
                  Chest Branding
                </span>
                <div className="text-sm font-display font-medium text-paper">
                  Small Reflective Metallic-Gold Print
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-sm font-mono normal-case tracking-wider text-zinc-500">
                  Initial Sizing
                </span>
                <div className="text-sm font-mono font-medium text-paper">
                  S / M / L / XL
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/product/flagship-tee-black"
                className="px-7 py-3.5 bg-surface text-ink font-display text-sm normal-case tracking-wider font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl inline-flex items-center space-x-2"
              >
                <span>View Product Details</span>
                <span>&rarr;</span>
              </Link>
              <Link
                href="/fabric-technology"
                className="px-6 py-3.5 bg-transparent border border-zinc-800 text-zinc-300 font-display text-sm normal-case tracking-wider font-medium rounded-full hover:border-zinc-500 hover:text-paper transition-all"
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
