'use client';

import React from 'react';
import Link from 'next/link';

export const BrandIntro: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-ink text-paper border-b border-zinc-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>The Axivers Philosophy</span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal normal-case tracking-tight text-paper leading-tight">
          Crafted with Restraint. <br />
          <span className="font-bold text-paper">Engineered for Daily Confidence.</span>
        </h2>

        {/* Narrative */}
        <p className="text-sm sm:text-base font-normal text-zinc-300 max-w-2xl mx-auto leading-relaxed tracking-wide">
          Axivers merges minimalist fashion aesthetics, quality textiles, refined construction, and contemporary silhouettes with precision Sri Lankan craftsmanship. We build elevated foundations for those who seek understated luxury in everyday wear.
        </p>

        {/* Key Values Triad */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left border-t border-zinc-900/80">
          <div className="p-4 space-y-2">
            <span className="text-sm font-mono text-accent normal-case tracking-wider block">
              01 • Aesthetic
            </span>
            <h3 className="text-sm sm:text-sm font-display normal-case tracking-wider font-bold text-paper">
              Minimalist Athletic Luxury
            </h3>
            <p className="text-sm text-zinc-400 font-normal leading-relaxed">
              Clean lines and uncluttered geometry designed to move seamlessly from work to leisure without visual excess.
            </p>
          </div>

          <div className="p-4 space-y-2 border-t md:border-t-0 md:border-l border-zinc-900">
            <span className="text-sm font-mono text-accent normal-case tracking-wider block">
              02 • Material
            </span>
            <h3 className="text-sm sm:text-sm font-display normal-case tracking-wider font-bold text-paper">
              180 GSM Mercerized Cotton
            </h3>
            <p className="text-sm text-zinc-400 font-normal leading-relaxed">
              Milled from 100% long-staple cotton subjected to precision mercerization for enhanced hand feel, fluid drape, and subtle natural lustre.
            </p>
          </div>

          <div className="p-4 space-y-2 border-t md:border-t-0 md:border-l border-zinc-900">
            <span className="text-sm font-mono text-accent normal-case tracking-wider block">
              03 • Origin
            </span>
            <h3 className="text-sm sm:text-sm font-display normal-case tracking-wider font-bold text-paper">
              Sri Lankan Craftsmanship
            </h3>
            <p className="text-sm text-zinc-400 font-normal leading-relaxed">
              Engineered and assembled in Sri Lanka, drawing upon the island’s world-renowned apparel manufacturing expertise.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
