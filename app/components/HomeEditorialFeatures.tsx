'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const HomeEditorialFeatures: React.FC = () => {
  return (
    <div className="space-y-24 sm:space-y-32 bg-[#09090b] text-[#ffffff] overflow-hidden">
      {/* 1. Men's & Women's Dual Campaign Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
            Curated Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase tracking-tight text-white">
            Designed for Movement
          </h2>
          <p className="text-xs sm:text-sm font-light text-zinc-400">
            Tailored athletic luxury cut for the modern silhouette.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Men's Card */}
          <Link
            href="/collections/men"
            className="group relative h-96 sm:h-[460px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex flex-col justify-end p-8 sm:p-10 shadow-2xl hover:border-zinc-700 transition-all duration-500"
          >
            <Image
              src="/images/cat-men-bg.png"
              alt="Axivers Men's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="relative z-20 space-y-2">
              <span className="text-[9px] uppercase tracking-[0.25em] font-display font-medium text-zinc-400 block">
                Athletic Tailoring
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-white">
                Men&apos;s Collection
              </h3>
              <p className="text-xs text-zinc-300 font-light max-w-sm">
                Sculpted shoulder lines with comfortable drape. Engineered in 60/40 cotton-modal.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-2 text-xs font-display uppercase tracking-widest font-semibold text-white group-hover:underline">
                  <span>Shop Men&apos;s</span>
                  <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Women's Card */}
          <Link
            href="/collections/women"
            className="group relative h-96 sm:h-[460px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex flex-col justify-end p-8 sm:p-10 shadow-2xl hover:border-zinc-700 transition-all duration-500"
          >
            <Image
              src="/images/cat-women-bg.png"
              alt="Axivers Women's Collection"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
            <div className="relative z-20 space-y-2">
              <span className="text-[9px] uppercase tracking-[0.25em] font-display font-medium text-zinc-400 block">
                Fluid Drape
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-white">
                Women&apos;s Collection
              </h3>
              <p className="text-xs text-zinc-300 font-light max-w-sm">
                Cloud-soft modal hand feel tailored for clean everyday elegance.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-2 text-xs font-display uppercase tracking-widest font-semibold text-white group-hover:underline">
                  <span>Shop Women&apos;s</span>
                  <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 2. Flagship Contrast Piping Signature Feature */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-[#0e0e11] p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Story Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>The Signature Silhouette</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-white leading-tight">
                The Flagship <br />
                <span className="font-light italic text-zinc-300">Contrast Piping.</span>
              </h2>

              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed max-w-md">
                Our hallmark piece. Custom-inserted contrast white piping along the cuffs and lower hemline creates a sculpted architectural frame. Built with our 190 GSM cotton-modal textile that never puckers.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="border-l-2 border-zinc-800 pl-3 space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Textile Blend</span>
                  <div className="text-xs font-display font-bold text-white uppercase">60/40 Cotton-Modal</div>
                </div>
                <div className="border-l-2 border-zinc-800 pl-3 space-y-0.5">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Density</span>
                  <div className="text-xs font-display font-bold text-white uppercase">190 GSM Structured</div>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/collections/flagship-piping"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors shadow-xl"
                >
                  <span>Explore Flagship Piping</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right Image Frame with Macro Detail */}
            <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
              <Image
                src="/images/pdp_front.jpg"
                alt="Flagship Piping Crewneck"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                <span className="font-display font-semibold uppercase tracking-wider">Onyx Black & Optic White</span>
                <span className="font-mono font-bold">LKR 4,250.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Campaign Lookbook Preview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex items-center justify-center text-center p-6 sm:p-12 shadow-2xl">
          <Image
            src="/images/HeroBg.png"
            alt="Axivers Campaign"
            fill
            sizes="100vw"
            className="object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
              Editorial Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-light uppercase tracking-tight text-white">
              The <span className="font-bold">Axivers Lookbook</span>
            </h2>
            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed max-w-lg mx-auto">
              Explore our season 01 lookbook capturing athletic luxury, fluid drape, and minimal aesthetics in real environments.
            </p>
            <div className="pt-2">
              <Link
                href="/lookbook"
                className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors shadow-2xl"
              >
                <span>View Full Lookbook</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Verified Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto mb-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
            Client Impressions
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
            Tested In Real Wear
          </h2>
          <p className="text-xs sm:text-sm font-light text-zinc-400">
            Real feedback from individuals who wear Axivers everyday essentials.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-white text-xs">★★★★★</div>
              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed italic">
                &ldquo;The 60/40 cotton-modal drape is unlike any tee I’ve owned in Sri Lanka. It feels as soft as silk but retains its structure through dozens of cold washes. The collar doesn&apos;t bacon at all.&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/60">
              <span className="text-xs font-display font-bold text-white uppercase block">
                Dilshan K.
              </span>
              <span className="text-[10px] text-zinc-500 font-display">Colombo • Verified Purchaser</span>
            </div>
          </div>

          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-white text-xs">★★★★★</div>
              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed italic">
                &ldquo;The contrast piping on the cuffs is razor sharp. You can wear this to an upscale dinner with tailored trousers or casually. It elevates the whole outfit without being loud.&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/60">
              <span className="text-xs font-display font-bold text-white uppercase block">
                Sanith R.
              </span>
              <span className="text-[10px] text-zinc-500 font-display">Kandy • Verified Purchaser</span>
            </div>
          </div>

          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex text-white text-xs">★★★★★</div>
              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed italic">
                &ldquo;As someone sensitive to rough fabrics in hot weather, the breathability of this modal blend is unmatched. Delivered to my door in Colombo in 24 hours via COD.&rdquo;
              </p>
            </div>
            <div className="pt-2 border-t border-zinc-800/60">
              <span className="text-xs font-display font-bold text-white uppercase block">
                Nadeesha P.
              </span>
              <span className="text-[10px] text-zinc-500 font-display">Mount Lavinia • Verified Purchaser</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
