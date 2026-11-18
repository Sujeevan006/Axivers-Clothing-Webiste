'use client';

import React from 'react';
import Link from 'next/link';

export const BrandIntro: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#060606] text-[#ffffff] border-b border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
          <span>The Axivers Philosophy</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light uppercase tracking-tight text-white leading-tight">
          Crafted with Restraint. <br />
          <span className="font-bold text-white">Engineered for Daily Confidence.</span>
        </h2>

        {/* Narrative */}
        <p className="text-xs sm:text-base font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
          Axivers merges minimalist fashion aesthetics, quality textiles, refined construction, and contemporary silhouettes with precision Sri Lankan craftsmanship. We build elevated foundations for those who seek understated luxury in everyday wear.
        </p>

        {/* Key Values Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left border-t border-zinc-900/80">
          <div className="p-4 space-y-2">
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block">
              01 • Aesthetic
            </span>
            <h3 className="text-xs sm:text-sm font-display uppercase tracking-wider font-bold text-white">
              Minimalist Athletic Luxury
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Clean lines and uncluttered geometry designed to move seamlessly from work to leisure without visual excess.
            </p>
          </div>

          <div className="p-4 space-y-2 border-t md:border-t-0 md:border-l border-zinc-900">
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block">
              02 • Material
            </span>
            <h3 className="text-xs sm:text-sm font-display uppercase tracking-wider font-bold text-white">
              180 GSM Mercerized Cotton
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Milled from 100% long-staple cotton subjected to precision mercerization for enhanced hand feel, fluid drape, and subtle natural lustre.
            </p>
          </div>

          <div className="p-4 space-y-2 border-t md:border-t-0 md:border-l border-zinc-900">
            <span className="text-[10px] font-mono text-[#c5a059] uppercase tracking-wider block">
              03 • Origin
            </span>
            <h3 className="text-xs sm:text-sm font-display uppercase tracking-wider font-bold text-white">
              Sri Lankan Craftsmanship
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Engineered and assembled in Sri Lanka, drawing upon the island’s world-renowned apparel manufacturing expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
