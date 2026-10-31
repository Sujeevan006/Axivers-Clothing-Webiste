'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { subscribeToActiveProducts, getProducts } from '@/services/productService';
import { formatCurrency } from '@/lib/utils/formatters';
import { useCart } from '../context/CartContext';
import { QuickAddModal } from './QuickAddModal';

export const FeaturedCollection: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts({ activeOnly: true, featuredOnly: true }).then((products) => {
      if (products && products.length > 0) {
        setFeaturedProducts(products);
      }
      setIsLoading(false);
    });

    const unsubscribe = subscribeToActiveProducts(
      (allActive) => {
        const featured = allActive.filter((p) => p.featured === true && p.active === true);
        if (featured.length > 0) {
          setFeaturedProducts(featured);
        }
        setIsLoading(false);
      },
      { featuredOnly: true }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-[#09090b] text-[#ffffff] text-center">
        <svg className="animate-spin h-6 w-6 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading Collection...</p>
      </section>
    );
  }

  // Display top 3 featured products as in the mockup design
  const displayList = featuredProducts.slice(0, 3);

  return (
    <section className="py-20 sm:py-24 bg-[#09090b] text-[#ffffff] relative overflow-hidden">
      {/* Subtle ambient luxury backdrop glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-white/[0.02] blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
        {/* Header with connecting horizontal divider line */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
          <div className="space-y-1.5 shrink-0">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
                FEATURED COLLECTION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Timeless Essentials.
            </h2>
          </div>

          <div className="hidden sm:block flex-grow h-[1px] bg-zinc-800/80 mx-6 mb-3 self-end" />

          <Link
            href="/shop"
            className="group/link text-xs font-display uppercase tracking-widest font-semibold text-zinc-300 hover:text-white transition-colors flex items-center space-x-1.5 shrink-0 mb-1"
          >
            <span>VIEW ALL GARMENTS</span>
            <span className="transform transition-transform group-hover/link:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* 3 Product Cards Grid - Modern Landscape Size */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {displayList.map((product) => {
            const isOutOfStock = product.stock !== undefined && product.stock <= 0;
            const displayImage = product.images?.[0] || '/images/pdp_front.jpg';

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between bg-[#111113] hover:bg-[#141417] border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl p-3.5 sm:p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
              >
                {/* Product Image Box - Landscape Aspect Ratio (16:10) */}
                <Link
                  href={`/product/${product.slug || product.id}`}
                  className="aspect-[16/10] bg-[#161618] rounded-xl overflow-hidden relative block border border-zinc-800/60 group-hover:border-zinc-700/80 transition-colors cursor-pointer"
                >
                  <Image
                    src={displayImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                      isOutOfStock ? 'opacity-40 grayscale' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 opacity-40 pointer-events-none" />

                  <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-[0.2em] font-display font-medium px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                    Featured
                  </span>

                  {isOutOfStock ? (
                    <span className="absolute top-2.5 right-2.5 bg-zinc-900/90 text-zinc-400 text-[9px] uppercase tracking-wider font-display font-semibold px-2.5 py-1 rounded-full border border-zinc-700/80 shadow-md">
                      Sold Out
                    </span>
                  ) : null}
                </Link>

                {/* Card Bottom Meta - Clean & Minimalist */}
                <div className="pt-3.5 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-display font-medium block">
                      {product.categoryLabel || 'Premium Crewneck T-Shirt'}
                    </span>
                    <Link href={`/product/${product.slug || product.id}`}>
                      <h3 className="text-sm sm:text-base font-display font-semibold uppercase tracking-wider text-white group-hover:text-zinc-300 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-sm sm:text-base font-bold font-mono text-white">
                        {formatCurrency(product.price, product.currency || 'LKR', true)}
                      </span>
                    </div>

                    <button
                      onClick={() => setQuickAddProduct(product)}
                      disabled={isOutOfStock}
                      className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-display font-semibold transition-all duration-300 cursor-pointer ${
                        isOutOfStock
                          ? 'bg-zinc-800/60 text-zinc-500 border border-zinc-800 cursor-not-allowed'
                          : 'bg-zinc-800/80 hover:bg-white text-zinc-200 hover:text-black border border-zinc-700/60 hover:border-white shadow-sm'
                      }`}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      <span>ADD TO CART</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </section>
  );
};
