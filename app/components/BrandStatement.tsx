'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const BrandStatement: React.FC = () => {
  return (
    <section className="bg-[#060606] text-white py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Lifestyle Photograph */}
          <div className="lg:col-span-5 relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-850">
            <Image
              src="/images/editorial-men-black.jpg"
              alt="Axivers Lifestyle"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right: Simple and Elegant Statement */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 lg:pl-6 text-left">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono font-medium">
              <span>Axivers Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-light uppercase tracking-tight leading-tight text-white">
              Made For <br />
              <span className="font-bold">Everyday.</span>
            </h2>

            <p className="text-sm sm:text-base md:text-lg font-light text-zinc-300 max-w-xl leading-relaxed tracking-wide">
              Considered materials. Refined details. Designed to move with you.
            </p>

            <div className="pt-2">
              <Link
                href="/fabric-technology"
                className="inline-flex items-center space-x-2 text-xs font-display uppercase tracking-[0.2em] font-semibold text-white hover:text-zinc-300 transition-colors border-b border-white pb-1 cursor-pointer"
              >
                <span>Discover the Craft</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};