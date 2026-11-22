'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { subscribeToActiveProducts, getProducts } from '@/services/productService';
import { formatCurrency } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';

export const FeaturedCollection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts({ activeOnly: true }).then((fetched) => {
      if (fetched && fetched.length > 0) {
        setProducts(fetched);
      }
      setIsLoading(false);
    });

    const unsubscribe = subscribeToActiveProducts(
      (allActive) => {
        if (allActive.length > 0) {
          setProducts(allActive);
        }
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Use genuine approved products (Onyx Black flagship + Optic White capsule preview)
  const displayProducts = products.length > 0 ? products : [
    {
      id: 'flagship-tee-black',
      slug: 'flagship-tee-black',
      name: 'The Signature Essential Crewneck — Onyx Black',
      price: 400000,
      currency: 'LKR',
      images: ['/images/flagship-tee-black.jpg', '/images/editorial-men-black.jpg'],
      categoryLabel: '180 GSM Mercerized Cotton',
      active: true,
      stock: 50,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Onyx Black'],
    } as Product,
    {
      id: 'flagship-tee-white',
      slug: 'flagship-tee-white',
      name: 'The Signature Essential Crewneck — Optic White',
      price: 400000,
      currency: 'LKR',
      images: ['/images/flagship-tee-white.jpg', '/images/editorial-pedestal-black.png'],
      categoryLabel: 'Capsule Preview',
      active: true,
      stock: 0,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Optic White'],
    } as Product,
  ];

  return (
    <section className="py-20 sm:py-24 bg-white text-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header: Minimal & Clean */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-[0.16em] text-[#060606]">
            The Collection
          </h2>
          <p className="text-xs sm:text-sm font-light text-zinc-500 tracking-wide">
            Everyday essentials, thoughtfully designed.
          </p>
        </div>

        {/* Clean Responsive Product Grid (2 cols mobile, up to 3-4 desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayProducts.slice(0, 4).map((product) => {
            const isOutOfStock = product.stock !== undefined && product.stock <= 0;
            const primaryImage = product.images?.[0] || '/images/flagship-tee-black.jpg';
            const secondaryImage = product.images?.[1] || null;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white transition-all duration-300"
              >
                {/* Product Image Tile with Subtle Secondary Image Swap on Hover */}
                <Link
                  href={`/product/${product.slug || product.id}`}
                  className="relative aspect-[3/4] bg-[#f6f6f6] rounded-xl overflow-hidden block border border-zinc-200/70 group-hover:border-zinc-400 transition-colors"
                >
                  {/* Primary Image */}
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-102 ${
                      secondaryImage ? 'group-hover:opacity-0' : ''
                    } ${isOutOfStock ? 'opacity-60' : ''}`}
                  />

                  {/* Secondary Image for smooth hover swap if available */}
                  {secondaryImage && (
                    <Image
                      src={secondaryImage}
                      alt={`${product.name} alternate view`}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover object-center transition-opacity duration-700 ease-out opacity-0 group-hover:opacity-100 ${
                        isOutOfStock ? 'opacity-0' : ''
                      }`}
                    />
                  )}

                  {/* Availability Badge */}
                  {isOutOfStock && (
                    <span className="absolute top-2.5 left-2.5 bg-white/95 text-zinc-700 text-[9px] uppercase tracking-wider font-display font-medium px-2 py-0.5 rounded shadow-sm border border-zinc-200">
                      Limited Preview
                    </span>
                  )}
                </Link>

                {/* Minimal Card Details */}
                <div className="pt-3 sm:pt-4 space-y-1.5 flex flex-col">
                  {/* Discreet Option or Material Indicator */}
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-display font-medium">
                    {product.categoryLabel || '180 GSM Mercerized Cotton'}
                  </span>

                  {/* Product Title */}
                  <Link href={`/product/${product.slug || product.id}`}>
                    <h3 className="text-xs sm:text-sm font-display font-medium text-[#060606] hover:text-zinc-600 transition-colors line-clamp-1 leading-snug">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price in LKR */}
                  <div className="flex items-center justify-between pt-0.5">
                    <span className="text-xs sm:text-sm font-semibold font-mono text-[#060606]">
                      {formatCurrency(product.price, product.currency || 'LKR', true)}
                    </span>

                    <button
                      onClick={() => setQuickAddProduct(product)}
                      className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-500 hover:text-black transition-colors cursor-pointer"
                    >
                      {isOutOfStock ? 'Preview' : 'Quick Add +'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Products Link Below Section */}
        <div className="text-center pt-4">
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 text-xs font-display uppercase tracking-[0.2em] font-semibold text-[#060606] hover:opacity-70 transition-opacity border-b border-[#060606] pb-1 cursor-pointer"
          >
            <span>View All Products</span>
            <span className="text-sm">&rarr;</span>
          </Link>
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