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
      <section className="py-20 bg-[#09090b] text-[#f4f4f5] text-center">
        <svg className="animate-spin h-6 w-6 text-amber-500 mx-auto mb-2" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading Featured Collection...</p>
      </section>
    );
  }

  return (
    <section className="py-24 bg-[#09090b] text-[#f4f4f5] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-zinc-800 pb-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400 font-display font-semibold block">
              Curated Selection
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-zinc-100">
              Featured Collection
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-xs font-display uppercase tracking-widest font-bold text-amber-400 hover:text-amber-300 transition-colors flex items-center space-x-1"
          >
            <span>View All Garments</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Featured Product Grid / Carousel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => {
            const isOutOfStock = product.stock !== undefined && product.stock <= 0;
            const displayImage = product.images?.[0] || '/images/pdp_front.jpg';

            return (
              <div
                key={product.id}
                className="group bg-zinc-900/50 border border-zinc-800 p-4 rounded-2xl flex flex-col justify-between hover:border-amber-500/40 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                <Link
                  href={`/product/${product.slug || product.id}`}
                  className="aspect-square bg-zinc-950 rounded-xl overflow-hidden relative block border border-zinc-800/80 cursor-pointer"
                >
                  <Image
                    src={displayImage}
                    alt={product.name}
                    width={500}
                    height={500}
                    className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                      isOutOfStock ? 'opacity-40 grayscale' : ''
                    }`}
                  />
                  <span className="absolute top-3 left-3 bg-zinc-950/90 text-amber-400 text-[9px] uppercase tracking-widest font-display font-semibold px-2.5 py-1 rounded border border-zinc-800">
                    Featured
                  </span>

                  {isOutOfStock ? (
                    <span className="absolute top-3 right-3 bg-rose-600 text-white text-[9px] uppercase tracking-widest font-display font-bold px-2.5 py-1 rounded border border-rose-500 shadow-md">
                      Sold Out
                    </span>
                  ) : product.stock && product.stock <= 5 ? (
                    <span className="absolute top-3 right-3 bg-amber-500 text-zinc-950 text-[9px] uppercase tracking-widest font-display font-bold px-2.5 py-1 rounded shadow-md">
                      Low Stock ({product.stock})
                    </span>
                  ) : null}
                </Link>

                <div className="pt-5 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <Link href={`/product/${product.slug || product.id}`}>
                      <h3 className="text-base font-display uppercase tracking-wider font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
                        {product.name}
                      </h3>
                      {product.tagline && (
                        <p className="text-xs text-zinc-400 mt-1 line-clamp-1 italic font-light">
                          {product.tagline}
                        </p>
                      )}
                    </Link>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-zinc-100">
                      LKR {product.price.toLocaleString()}
                    </span>

                    <button
                      onClick={() => setQuickAddProduct(product)}
                      disabled={isOutOfStock}
                      className={`text-[10px] uppercase tracking-wider font-display font-bold px-3.5 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                        isOutOfStock
                          ? 'bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed'
                          : 'bg-amber-500 text-zinc-950 hover:bg-amber-400 font-bold shadow-md shadow-amber-500/10'
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
