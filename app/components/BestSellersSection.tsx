'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { getProducts, subscribeToActiveProducts } from '@/services/productService';
import { formatCurrency } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';

export const BestSellersSection: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts({ activeOnly: true, isBestSeller: true }).then((products) => {
      if (products && products.length > 0) {
        setBestSellers(products.slice(0, 3));
      } else {
        // Fallback to top products
        getProducts({ activeOnly: true }).then((all) => {
          if (all) setBestSellers(all.slice(1, 4));
        });
      }
      setIsLoading(false);
    });

    const unsubscribe = subscribeToActiveProducts(
      (allActive) => {
        const filtered = allActive.filter((p) => p.isBestSeller);
        if (filtered.length > 0) {
          setBestSellers(filtered.slice(0, 3));
        }
        setIsLoading(false);
      },
      { isBestSeller: true }
    );

    return () => unsubscribe();
  }, []);

  if (isLoading || bestSellers.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-[#09090b] text-[#ffffff] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-2">
          <div className="space-y-1.5 shrink-0">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              Tested & Proven
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase">
              Best Sellers.
            </h2>
          </div>

          <div className="hidden sm:block flex-grow h-[1px] bg-zinc-800/80 mx-6 mb-3 self-end" />

          <Link
            href="/collections/best-sellers"
            className="group/link text-xs font-display uppercase tracking-widest font-semibold text-zinc-300 hover:text-white transition-colors flex items-center space-x-1.5 shrink-0 mb-1"
          >
            <span>View All Best Sellers</span>
            <span className="transform transition-transform group-hover/link:translate-x-1">&rarr;</span>
          </Link>
        </div>

        {/* 3 Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {bestSellers.map((product) => {
            const isOutOfStock = product.stock !== undefined && product.stock <= 0;
            const displayImage = product.images?.[0] || '/images/pdp_front.jpg';

            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between bg-[#111113] hover:bg-[#141417] border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl p-3.5 sm:p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
              >
                {/* Product Image Box */}
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
                    Best Seller
                  </span>

                  {isOutOfStock ? (
                    <span className="absolute top-2.5 right-2.5 bg-zinc-900/90 text-zinc-400 text-[9px] uppercase tracking-wider font-display font-semibold px-2.5 py-1 rounded-full border border-zinc-700/80 shadow-md">
                      Sold Out
                    </span>
                  ) : null}
                </Link>

                {/* Card Bottom Meta */}
                <div className="pt-3.5 flex flex-col justify-between flex-grow space-y-3">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-display font-medium block">
                      {product.categoryLabel || 'Premium Garment'}
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
