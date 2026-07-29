"use client";

import React from 'react';
import Link from 'next/link';

export const CategoryGrid: React.FC = () => {
  const categoryCards = [
    {
      id: 'men',
      name: "Men's Collection",
      tagline: 'Tailored athletic fit & heavy drape',
      image: '/images/pdp_front.jpg',
      query: 'men',
    },
    {
      id: 'women',
      name: "Women's Collection",
      tagline: 'Sculpted silhouettes & breathable modal',
      image: '/images/pdp_white_piping.jpg',
      query: 'women',
    },
    {
      id: 'flagship',
      name: 'Flagship Piping',
      tagline: 'Signature inserted piping & crewneck cuts',
      image: '/images/pdp_detail.jpg',
      query: 'flagship',
    },
    {
      id: 'minimalist',
      name: 'Minimalist Essentials',
      tagline: 'Subtle branding, monochrome aesthetics',
      image: '/images/pdp_boxy_black.jpg',
      query: 'minimalist',
    },
    {
      id: 'technical',
      name: 'Technical Garments',
      tagline: 'Moisture-wicking modal & high GSM structure',
      image: '/images/pdp_polo_black.jpg',
      query: 'technical',
    },
  ];

  return (
    <section id="categories" className="py-24 bg-[#09090b] text-[#f4f4f5] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-display font-semibold block">
            Systematic Wardrobe
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-zinc-100">
            Explore Categories
          </h2>
          <p className="text-xs font-light text-zinc-400">
            Select a garment category engineered for luxury athletic lifestyles.
          </p>
        </div>

        {/* Category Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.query}`}
              className="group relative h-64 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col justify-end p-6 hover:border-amber-500/60 transition-all duration-500 shadow-xl cursor-pointer"
            >
              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent z-10" />

              {/* Decorative accent line */}
              <div className="absolute top-4 right-4 text-amber-400 text-xs font-mono font-bold uppercase tracking-widest z-20 opacity-80 group-hover:opacity-100">
                Explore &rarr;
              </div>

              {/* Text content */}
              <div className="relative z-20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-semibold block">
                  Category
                </span>
                <h3 className="text-xl font-display uppercase tracking-wider font-bold text-zinc-100 group-hover:text-amber-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-400 font-light line-clamp-1">
                  {cat.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
