"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types/category';
import { BASELINE_CATEGORIES, getCategories, subscribeToCategories } from '@/services/categoryService';

export const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(BASELINE_CATEGORIES);

  useEffect(() => {
    getCategories().then((cats) => {
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    });

    const unsubscribe = subscribeToCategories((cats) => {
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="categories" className="py-24 bg-[#09090b] text-[#ffffff] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white font-display font-semibold block">
            Systematic Wardrobe
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white">
            Explore Categories
          </h2>
          <p className="text-xs font-light text-zinc-400">
            Select a garment category engineered for luxury athletic lifestyles.
          </p>
        </div>

        {/* Dynamic Category Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id || cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="group relative h-64 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 flex flex-col justify-end p-6 hover:border-white/50 transition-all duration-500 shadow-xl cursor-pointer"
            >
              {/* Category Background Image if available */}
              {cat.image && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
              )}

              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/70 to-transparent z-10" />

              {/* Decorative accent line */}
              <div className="absolute top-4 right-4 text-white text-xs font-mono font-bold uppercase tracking-widest z-20 opacity-80 group-hover:opacity-100 flex items-center space-x-1">
                <span>Explore</span>
                <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
              </div>

              {/* Text content */}
              <div className="relative z-20 space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-semibold block">
                  Garment Category
                </span>
                <h3 className="text-xl font-display uppercase tracking-wider font-bold text-white group-hover:text-zinc-200 transition-colors">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-zinc-400 font-light line-clamp-1">
                    {cat.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
