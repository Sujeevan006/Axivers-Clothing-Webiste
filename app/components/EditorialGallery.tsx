'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const GALLERY_ITEMS = [
  {
    id: 'men-editorial',
    image: '/images/editorial-men-black.jpg',
    aspect: 'aspect-[3/4]',
    title: 'Minimalist Athletic Fit',
    caption: 'Tailored shoulder line with fluid, unrestrictive movement.',
  },
  {
    id: 'flagship-flat-black',
    image: '/images/flagship-tee-black.jpg',
    aspect: 'aspect-square',
    title: 'The Signature Essential — Onyx',
    caption: '180 GSM Mercerized Cotton • Tipped Rib Detailing.',
  },
  {
    id: 'pedestal-detail',
    image: '/images/editorial-pedestal-black.png',
    aspect: 'aspect-[3/4]',
    title: 'Architectural Staging',
    caption: 'Restrained geometry and considered monochrome palette.',
  },
  {
    id: 'women-editorial',
    image: '/images/editorial-women-black.png',
    aspect: 'aspect-[16/9]',
    title: 'Editorial Silhouette',
    caption: 'Refined comfort designed for contemporary living.',
  },
];

export const EditorialGallery: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-ink text-paper border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Editorial Series</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal normal-case tracking-tight text-paper">
              Campaign <span className="font-bold">Gallery.</span>
            </h2>
          </div>

          <Link
            href="/lookbook"
            className="text-sm font-display normal-case tracking-widest font-semibold text-zinc-300 hover:text-paper transition-colors flex items-center space-x-1.5 shrink-0"
          >
            <span>View Complete Lookbook</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-start">
          {/* Card 1: Male Model */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800 bg-ink shadow-2xl group">
            <Image
              src="/images/editorial-men-black.jpg"
              alt="Axivers Men's Athletic Luxury"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 space-y-1 z-10">
              <span className="text-sm font-mono text-accent normal-case tracking-wider block">
                Editorial 01
              </span>
              <h3 className="text-sm font-display normal-case tracking-wider font-bold text-paper">
                Athletic Luxury Silhouette
              </h3>
              <p className="text-sm text-zinc-300 font-normal">
                Tailored shoulder lines with considered, fluid drape.
              </p>
            </div>
          </div>

          {/* Card 2: Right Column Stack */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Row: Two Smaller Editorial Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-ink p-4 shadow-xl group flex items-center justify-center">
                <Image
                  src="/images/flagship-tee-black.jpg"
                  alt="Flagship Onyx Black"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 z-10">
                  <span className="text-sm font-mono text-zinc-400 bg-ink/75 px-2.5 py-0.5 rounded-full border border-zinc-800">
                    Onyx Black
                  </span>
                </div>
              </div>

              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 bg-ink shadow-xl group">
                <Image
                  src="/images/editorial-pedestal-black.png"
                  alt="Pedestal Architectural Staging"
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <span className="text-sm font-mono text-zinc-300 block">
                    Minimalist Staging
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Female Model Landscape Tile */}
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-800 bg-ink shadow-xl group">
              <Image
                src="/images/editorial-women-black.png"
                alt="Axivers Contemporary Styling"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-between items-end">
                <div>
                  <span className="text-sm font-mono text-accent normal-case tracking-wider block">
                    Editorial 02
                  </span>
                  <h4 className="text-sm font-display normal-case tracking-wider font-bold text-paper">
                    Contemporary Everyday Confidence
                  </h4>
                </div>
                <Link
                  href="/lookbook"
                  className="px-4 py-2 rounded-full bg-surface text-ink font-display text-sm normal-case tracking-widest font-bold hover:bg-zinc-200 transition-colors"
                >
                  View Lookbook
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
