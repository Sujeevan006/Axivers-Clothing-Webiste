'use client';

import React from 'react';
import Link from 'next/link';

export const FabricStory: React.FC = () => {
  return (
    <section id="fabric" className="relative py-20 sm:py-28 bg-[#060606] text-[#ffffff] border-b border-zinc-900 overflow-hidden">
      {/* Subtle ambient luxury backdrop glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.015] blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 180 GSM Mercerized Cotton Highlight */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span>Textile Engineering</span>
            </div>

            <div className="space-y-1">
              <h2 className="text-6xl sm:text-7xl md:text-8xl font-display font-light tracking-tight text-white leading-none">
                180 <span className="font-bold">GSM</span>
              </h2>
              <h3 className="text-lg sm:text-2xl font-display uppercase tracking-[0.2em] font-bold text-white">
                100% Mercerized Cotton
              </h3>
            </div>

            <p className="text-xs sm:text-sm md:text-base text-zinc-300 font-light leading-relaxed max-w-xl pt-2">
              Our flagship single jersey knit is crafted from pure long-staple cotton treated through precision mercerization. The treatment smooths outer fibers, imparts a subtle natural lustre, enhances color richness, and delivers an elevated, breathable drape.
            </p>

            <div className="pt-3">
              <Link
                href="/fabric-technology"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white text-black font-display text-xs uppercase tracking-[0.16em] font-bold hover:bg-zinc-200 transition-all duration-300 shadow-xl cursor-pointer"
              >
                <span>DISCOVER TEXTILE SPECS</span>
                <span className="text-sm">&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: 3 Considered Material Benefits */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            {/* Feature 1: Mercerized Surface Smoothness */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#0b0b0e] border border-zinc-800/60">
              <div className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0 text-[#c5a059] font-mono text-xs font-bold">
                01
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm uppercase tracking-wider font-display font-bold text-white">
                  Smooth Hand Feel
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Mercerization removes protruding fiber fuzz, creating a clean, silky surface texture against the skin.
                </p>
              </div>
            </div>

            {/* Feature 2: 180 GSM Balanced Single Jersey */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#0b0b0e] border border-zinc-800/60">
              <div className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0 text-[#c5a059] font-mono text-xs font-bold">
                02
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm uppercase tracking-wider font-display font-bold text-white">
                  Fluid Everyday Drape
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  Calibrated to 180 GSM — substantial enough to maintain a tailored silhouette without heavy or stiff boxiness.
                </p>
              </div>
            </div>

            {/* Feature 3: Natural Breathability */}
            <div className="flex items-start space-x-4 p-4 rounded-2xl bg-[#0b0b0e] border border-zinc-800/60">
              <div className="w-10 h-10 rounded-full border border-zinc-700/80 bg-zinc-900/60 flex items-center justify-center shrink-0 text-[#c5a059] font-mono text-xs font-bold">
                03
              </div>
              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm uppercase tracking-wider font-display font-bold text-white">
                  Natural Airflow
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
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
