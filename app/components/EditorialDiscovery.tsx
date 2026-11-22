'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const EditorialDiscovery: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#f6f6f6] text-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-display font-semibold block">
            Brand Editorial
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-[0.16em] text-[#060606]">
            The World of Axivers
          </h2>
        </div>

        {/* Two Well-Composed Editorial Image Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Tile 1: Our Story */}
          <Link
            href="/our-story"
            className="group relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-zinc-950 flex flex-col justify-end p-6 sm:p-10 shadow-sm border border-zinc-250 cursor-pointer"
          >
            <Image
              src="/images/editorial-women-black.png"
              alt="Axivers Editorial — Our Story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

            <div className="relative z-20 space-y-2 text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-mono block">
                Brand Heritage
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-white">
                Our Story
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-sm">
                Discover the vision behind Axivers.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-widest font-semibold text-white group-hover:underline">
                  <span>Explore Our Story</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          </Link>

          {/* Tile 2: Fabric & Craftsmanship */}
          <Link
            href="/fabric-technology"
            className="group relative h-[380px] sm:h-[440px] rounded-2xl overflow-hidden bg-zinc-950 flex flex-col justify-end p-6 sm:p-10 shadow-sm border border-zinc-250 cursor-pointer"
          >
            <Image
              src="/images/fabricbg.png"
              alt="Axivers Textile Innovation — Fabric & Craftsmanship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

            <div className="relative z-20 space-y-2 text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono block">
                180 GSM Mercerized Cotton
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-wider text-white">
                Fabric &amp; Craftsmanship
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 font-light max-w-sm">
                Discover the details behind the essentials.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-widest font-semibold text-white group-hover:underline">
                  <span>Discover More</span>
                  <span>&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};