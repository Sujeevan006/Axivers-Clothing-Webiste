'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { getProducts, subscribeToActiveProducts } from '@/services/productService';
import { formatCurrency, fromMinorUnits } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';

export type CollectionKey =
  | 'men'
  | 'women'
  | 'flagship-piping'
  | 'minimalist-essentials'
  | 'technical'
  | 'new-arrivals'
  | 'best-sellers';

export interface CollectionConfig {
  collectionKey: CollectionKey;
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  badge?: string;
}

interface CollectionPageProps {
  config: CollectionConfig;
}

const filterByCollection = (product: Product, key: CollectionKey): boolean => {
  switch (key) {
    case 'men':
      return product.gender === 'men' || product.gender === 'unisex' || product.category === 'men' || Boolean(product.tags?.includes('men'));
    case 'women':
      return product.gender === 'women' || product.gender === 'unisex' || product.category === 'women' || Boolean(product.tags?.includes('women'));
    case 'flagship-piping':
      return product.category === 'flagship' || product.collectionSlug === 'flagship-piping' || Boolean(product.tags?.includes('piping'));
    case 'minimalist-essentials':
      return product.category === 'minimalist' || product.collectionSlug === 'minimalist-essentials' || Boolean(product.tags?.includes('minimalist'));
    case 'technical':
      return product.category === 'technical' || product.collectionSlug === 'technical' || Boolean(product.tags?.includes('technical'));
    case 'new-arrivals':
      return Boolean(product.isNewArrival || product.featured);
    case 'best-sellers':
      return Boolean(product.isBestSeller || product.featured);
    default:
      return true;
  }
};

export const CollectionPage: React.FC<CollectionPageProps> = ({ config }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProducts({ activeOnly: true }).then((all) => {
      if (all && all.length > 0) {
        const filtered = all.filter((p) => filterByCollection(p, config.collectionKey));
        setProducts(filtered);
      }
      setIsLoading(false);
    });

    const unsubscribe = subscribeToActiveProducts((all) => {
      if (all && all.length > 0) {
        const filtered = all.filter((p) => filterByCollection(p, config.collectionKey));
        setProducts(filtered);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [config.collectionKey]);

  // Extract available unique sizes and colors
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.colors?.forEach((c) => set.add(c)));
    return Array.from(set);
  }, [products]);

  // Filtered & sorted products
  const displayProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSize = selectedSize === 'all' || (p.sizes && p.sizes.includes(selectedSize));
      const matchColor = selectedColor === 'all' || (p.colors && p.colors.includes(selectedColor));
      const matchPrice = fromMinorUnits(p.price) <= maxPrice;
      return matchSize && matchColor && matchPrice;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => fromMinorUnits(a.price) - fromMinorUnits(b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => fromMinorUnits(b.price) - fromMinorUnits(a.price));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else {
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [products, selectedSize, selectedColor, maxPrice, sortBy]);

  return (
    <div className="min-h-screen bg-white text-[#060606] pt-16 sm:pt-20 pb-20">
      {/* Campaign Editorial Dark Banner (High-contrast 30% dark element) */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-[#060606]">
        <Image
          src={config.bannerImage}
          alt={config.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Banner Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8 sm:pb-10 space-y-2.5">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-zinc-400 font-display">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-white transition-colors">Collections</Link>
              <span>/</span>
              <span className="text-white font-semibold">{config.title}</span>
            </div>

            {config.badge && (
              <span className="inline-block text-[9px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                {config.badge}
              </span>
            )}

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
              {config.title}
            </h1>

            <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-xl leading-relaxed">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        {/* Clean Light Filter Toolbar */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: Size Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold mr-1">
                Size:
              </span>
              {['all', 'S', 'M', 'L', 'XL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-[#060606] text-white border-[#060606] font-bold'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>

            {/* Middle: Color filter if multiple exist */}
            {availableColors.length > 1 && (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold mr-1">
                  Color:
                </span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-white border border-zinc-200 text-xs font-display py-1.5 px-3 rounded-lg text-[#060606] focus:outline-none focus:border-black cursor-pointer"
                >
                  <option value="all">All Colors</option>
                  {availableColors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Right: Sort Dropdown & Product Count */}
            <div className="flex items-center space-x-3 ml-auto">
              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                {displayProducts.length} {displayProducts.length === 1 ? 'Garment' : 'Garments'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-zinc-200 text-xs font-display py-1.5 px-3 rounded-lg text-[#060606] focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <svg className="animate-spin h-6 w-6 text-[#060606] mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading Collection...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#fafafa] border border-zinc-200 rounded-2xl p-8 space-y-4">
            <p className="text-sm font-display text-zinc-600">
              No garments found matching the active filters in this collection.
            </p>
            <button
              onClick={() => {
                setSelectedSize('all');
                setSelectedColor('all');
                setMaxPrice(30000);
              }}
              className="px-5 py-2.5 rounded-lg bg-[#060606] text-white font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {displayProducts.map((product) => {
              const isOutOfStock = product.stock !== undefined && product.stock <= 0;
              const primaryImage = product.images?.[0] || '/images/flagship-tee-black.jpg';
              const secondaryImage = product.images?.[1] || null;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between bg-white transition-all duration-300"
                >
                  {/* Clean Garment Image Container */}
                  <Link
                    href={`/product/${product.slug || product.id}`}
                    className="aspect-[3/4] bg-[#f6f6f6] rounded-xl overflow-hidden relative block border border-zinc-200/70 group-hover:border-zinc-400 transition-colors cursor-pointer"
                  >
                    <Image
                      src={primaryImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className={`object-cover object-center transition-all duration-700 ease-out group-hover:scale-102 ${
                        secondaryImage ? 'group-hover:opacity-0' : ''
                      } ${isOutOfStock ? 'opacity-60' : ''}`}
                    />

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

                    {isOutOfStock && (
                      <span className="absolute top-2.5 left-2.5 bg-white/95 text-zinc-700 text-[9px] uppercase tracking-wider font-display font-medium px-2 py-0.5 rounded shadow-sm border border-zinc-200">
                        Limited Preview
                      </span>
                    )}
                  </Link>

                  {/* Card Bottom Meta */}
                  <div className="pt-3 sm:pt-4 space-y-1.5 flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-display font-medium">
                      {product.categoryLabel || '180 GSM Mercerized Cotton'}
                    </span>

                    <Link href={`/product/${product.slug || product.id}`}>
                      <h3 className="text-xs sm:text-sm font-display font-medium text-[#060606] hover:text-zinc-600 transition-colors line-clamp-1 leading-snug">
                        {product.name}
                      </h3>
                    </Link>

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
        )}
      </div>

      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </div>
  );
};