'use client';

import React from 'react';
import Link from 'next/link';

export const FabricStory: React.FC = () => {
  return (
    <section id="fabric" className="relative py-20 sm:py-28 bg-ink text-paper border-b border-zinc-900 overflow-hidden">
      {/* Subtle ambient luxury backdrop glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-surface/[0.015] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 180 GSM Mercerized Cotton Highlight */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Textile Engineering</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-normal tracking-tight text-paper leading-none">
                180 <span className="font-bold">GSM</span>
              </h2>
              <h3 className="text-lg sm:text-2xl font-display normal-case tracking-[0.2em] font-bold text-paper">
                100% Mercerized Cotton
              </h3>
            </div>

            <p className="text-sm sm:text-sm md:text-base text-zinc-300 font-normal leading-relaxed max-w-xl pt-2">
              Our flagship single jersey knit is crafted from pure long-staple cotton treated through precision mercerization. The treatment smooths outer fibers, imparts a subtle natural lustre, enhances color richness, and delivers an elevated, breathable drape.
            </p>

            <div className="pt-3">
              <Link
                href="/fabric-technology"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-surface text-ink font-display text-sm normal-case tracking-[0.16em] font-bold hover:bg-zinc-200 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>DISCOVER TEXTILE SPECS</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Considered Material Benefits */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Feature 1: Mercerized Surface Smoothness */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-ink border border-zinc-800/60">
              <div className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0 text-accent font-mono text-sm font-bold">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-sm normal-case tracking-wider font-display font-bold text-paper">
                  Smooth Hand Feel
                </h4>
                <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                  Mercerization removes protruding fiber fuzz, creating a clean, silky surface texture against the skin.
                </p>
              </div>
            </div>

            {/* Feature 2: 180 GSM Balanced Single Jersey */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-ink border border-zinc-800/60">
              <div className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0 text-accent font-mono text-sm font-bold">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-sm normal-case tracking-wider font-display font-bold text-paper">
                  Fluid Everyday Drape
                </h4>
                <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                  Calibrated to 180 GSM — substantial enough to maintain a tailored silhouette without heavy or stiff boxiness.
                </p>
              </div>
            </div>

            {/* Feature 3: Natural Breathability */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-ink border border-zinc-800/60">
              <div className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0 text-accent font-mono text-sm font-bold">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-sm sm:text-sm normal-case tracking-wider font-display font-bold text-paper">
                  Natural Airflow
                </h4>
                <p className="text-sm text-zinc-400 font-normal leading-relaxed">
                  100% natural cotton circular knit allows unrestricted air movement for comfort across varied climates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
