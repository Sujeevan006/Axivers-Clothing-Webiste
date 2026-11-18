'use client';

import React from 'react';
import Link from 'next/link';

export const MadeInSriLankaStory: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#070709] text-[#ffffff] border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Story Text */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
              <span>Origin &amp; Purpose</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light uppercase tracking-tight text-white leading-tight">
              Made in Sri Lanka, <br />
              <span className="font-bold text-white">Global Quality.</span>
            </h2>

            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed max-w-xl">
              Sri Lanka is globally recognized as one of the most respected hubs for technical apparel manufacturing, engineering precision garments for premier international houses.
            </p>

            <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed max-w-xl">
              Axivers channels that exact heritage directly into modern everyday essentials. By uniting local textile expertise with contemporary minimalist design, we are building an apparel house that stands proudly on the international stage.
            </p>

            <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-zinc-400">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase text-zinc-600 block">Origin</span>
                <span className="text-white font-medium">Colombo, LK</span>
              </div>
              <div className="w-[1px] h-8 bg-zinc-800" />
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase text-zinc-600 block">Standard</span>
                <span className="text-white font-medium">International Luxury</span>
              </div>
              <div className="w-[1px] h-8 bg-zinc-800" />
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase text-zinc-600 block">Ethos</span>
                <span className="text-white font-medium">Quality-First</span>
              </div>
            </div>

            <div className="pt-3">
              <Link
                href="/our-story"
                className="inline-flex items-center space-x-2 text-xs font-display uppercase tracking-widest font-semibold text-white hover:text-zinc-300 transition-colors"
              >
                <span>Read The Full Brand Story</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right: Architectural Quote Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 rounded-bl-full pointer-events-none" />
              
              <span className="text-3xl text-[#c5a059] font-serif block">&ldquo;</span>
              <p className="text-sm sm:text-base font-light text-zinc-200 leading-relaxed italic">
                The essentials we wear every day deserve thoughtful design, considered materials, and exceptional attention to detail.
              </p>
              
              <div className="pt-4 border-t border-zinc-800/60">
                <span className="text-xs font-display font-bold uppercase tracking-wider text-white block">
                  Axivers Clothing (Pvt) Ltd
                </span>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Colombo, Sri Lanka
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
