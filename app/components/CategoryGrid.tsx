'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CategoryItem {
  href: string;
  name: string;
  actionText: string;
  image: string;
}

const TOP_CATEGORIES: CategoryItem[] = [
  {
    href: '/collections/men',
    name: "MEN'S COLLECTION",
    actionText: 'Explore Men',
    image: '/images/cat-men-bg.png',
  },
  {
    href: '/collections/women',
    name: "WOMEN'S COLLECTION",
    actionText: 'Explore Women',
    image: '/images/cat-women-bg.png',
  },
];

const BOTTOM_CATEGORIES: CategoryItem[] = [
  {
    href: '/collections/flagship-piping',
    name: 'FLAGSHIP PIPING',
    actionText: 'Explore Flagship',
    image: '/images/cat-piping-bg.png',
  },
  {
    href: '/collections/minimalist-essentials',
    name: 'MINIMALIST ESSENTIALS',
    actionText: 'Explore Essentials',
    image: '/images/cat-essentials-bg.png',
  },
  {
    href: '/collections/technical',
    name: 'TECHNICAL GARMENTS',
    actionText: 'Explore Technical',
    image: '/images/cat-technical-bg.png',
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section
      id="categories"
      className="py-20 sm:py-24 bg-[#09090b] text-[#ffffff]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Centered with decorative line accents */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
            BROWSE CURATED COLLECTIONS
          </span>
          <div className="flex items-center justify-center space-x-4 pt-1">
            <span className="w-8 sm:w-16 h-[1px] bg-zinc-700"></span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white whitespace-nowrap">
              Explore Collections
            </h2>
            <span className="w-8 sm:w-16 h-[1px] bg-zinc-700"></span>
          </div>
          <p className="text-xs sm:text-sm font-light text-zinc-400 pt-1">
            Discover tailored silhouettes and signature textiles crafted for elevated everyday living.
          </p>
        </div>

        {/* Categories Layout: Top 2 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {TOP_CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 flex flex-col justify-end p-6 sm:p-7 hover:border-zinc-700 transition-all duration-500 shadow-xl cursor-pointer"
            >
              {/* Category Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Text content */}
              <div className="relative z-20 space-y-1">
                <h3 className="text-base sm:text-lg font-display uppercase tracking-wider font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {cat.name}
                </h3>
                <div className="text-xs text-zinc-300 font-medium flex items-center space-x-1.5 pt-0.5">
                  <span>{cat.actionText}</span>
                  <span className="transform transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Categories Layout: Bottom 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {BOTTOM_CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="group relative h-52 sm:h-60 rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 flex flex-col justify-end p-5 sm:p-6 hover:border-zinc-700 transition-all duration-500 shadow-xl cursor-pointer"
            >
              {/* Category Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Bottom Vignette Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

              {/* Text content */}
              <div className="relative z-20 space-y-1">
                <h3 className="text-sm sm:text-base font-display uppercase tracking-wider font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {cat.name}
                </h3>
                <div className="text-xs text-zinc-300 font-medium flex items-center space-x-1.5 pt-0.5">
                  <span>{cat.actionText}</span>
                  <span className="transform transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
