"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { subscribeToActiveProducts, getProducts } from '@/services/productService';
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
      <section className="py-16 bg-[#09090b] text-[#ffffff] text-center">
        <svg className="animate-spin h-6 w-6 text-white mx-auto mb-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading Featured Collection...</p>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#09090b] text-[#ffffff] border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-5">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white font-display font-semibold block">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-white">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-display uppercase tracking-widest font-bold text-white hover:text-zinc-300 transition-colors flex items-center space-x-1"
          >
            <span>View All Garments</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Compact Featured Product Cards Grid (4 columns) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {featuredProducts.map((product) => {
            const isOutOfStock = product.stock !== undefined && product.stock <= 0;
            const displayImage = product.images?.[0] || '/images/pdp_front.jpg';

            return (
              <div
                key={product.id}
                className="group bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl flex flex-col justify-between hover:border-white/40 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                <Link
                  href={`/product/${product.slug || product.id}`}
                  className="aspect-[4/5] bg-zinc-950 rounded-lg overflow-hidden relative block border border-zinc-800/80 cursor-pointer"
                >
                  <Image
                    src={displayImage}
                    alt={product.name}
                    width={400}
                    height={500}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      isOutOfStock ? 'opacity-40 grayscale' : ''
                    }`}
                  />
                  <span className="absolute top-2 left-2 bg-black/80 text-white text-[8px] uppercase tracking-widest font-display font-semibold px-2 py-0.5 rounded border border-zinc-700">
                    Featured
                  </span>

                  {isOutOfStock ? (
                    <span className="absolute top-2 right-2 bg-zinc-900/90 text-zinc-400 text-[8px] uppercase tracking-widest font-display font-bold px-2 py-0.5 rounded border border-zinc-700 shadow-md">
                      Sold Out
                    </span>
                  ) : product.stock && product.stock <= 5 ? (
                    <span className="absolute top-2 right-2 bg-white text-black text-[8px] uppercase tracking-widest font-display font-bold px-2 py-0.5 rounded shadow-md">
                      Low Stock ({product.stock})
                    </span>
                  ) : null}
                </Link>

                <div className="pt-3 flex-grow flex flex-col justify-between space-y-3">
                  <div>
                    <Link href={`/product/${product.slug || product.id}`}>
                      <h3 className="text-xs sm:text-sm font-display uppercase tracking-wider font-semibold text-white group-hover:text-zinc-300 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      {product.tagline && (
                        <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1 italic font-light">
                          {product.tagline}
                        </p>
                      )}
                    </Link>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold font-mono text-white">
                      LKR {product.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => setQuickAddProduct(product)}
                      disabled={isOutOfStock}
                      className={`text-[9px] uppercase tracking-wider font-display font-bold px-2.5 py-1.5 rounded transition-all duration-300 cursor-pointer ${
                        isOutOfStock
                          ? 'bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-zinc-200 font-bold shadow-md'
                      }`}
                    >
                      {isOutOfStock ? 'Sold Out' : 'Quick Add'}
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
