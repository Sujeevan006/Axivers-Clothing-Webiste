'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { getProducts, subscribeToActiveProducts } from '@/services/productService';
import { formatCurrency, fromMinorUnits } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';

export interface CollectionConfig {
  title: string;
  tagline: string;
  description: string;
  bannerImage: string;
  badge?: string;
  filterPredicate?: (product: Product) => boolean;
}

interface CollectionPageProps {
  config: CollectionConfig;
}

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
        const filtered = config.filterPredicate ? all.filter(config.filterPredicate) : all;
        setProducts(filtered);
      }
      setIsLoading(false);
    });

    const unsubscribe = subscribeToActiveProducts((all) => {
      if (all && all.length > 0) {
        const filtered = config.filterPredicate ? all.filter(config.filterPredicate) : all;
        setProducts(filtered);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [config]);

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
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-20">
      {/* Campaign Banner */}
      <div className="relative h-72 sm:h-96 md:h-[420px] w-full overflow-hidden border-b border-zinc-800/80">
        <Image
          src={config.bannerImage}
          alt={config.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-radial from-transparent to-black/40" />

        {/* Banner Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 sm:pb-12 space-y-3">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-zinc-400 font-display">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-white transition-colors">Collections</Link>
              <span>/</span>
              <span className="text-white font-semibold">{config.title}</span>
            </div>

            {config.badge && (
              <span className="inline-block text-[9px] uppercase tracking-[0.25em] text-white/90 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 font-display font-medium">
                {config.badge}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white uppercase">
              {config.title}
            </h1>

            <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-2xl leading-relaxed tracking-wide">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Interactive Filter Toolbar */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: Size Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-display font-semibold mr-1">
                Size:
              </span>
              {['all', 'S', 'M', 'L', 'XL'].map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>

            {/* Middle: Color filter if multiple exist */}
            {availableColors.length > 1 && (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-display font-semibold mr-1">
                  Color:
                </span>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-zinc-900 border border-zinc-800 text-xs font-display py-1.5 px-3 rounded-lg text-white focus:outline-none focus:border-zinc-600 cursor-pointer"
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
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                {displayProducts.length} {displayProducts.length === 1 ? 'Garment' : 'Garments'}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-xs font-display py-1.5 px-3 rounded-lg text-white focus:outline-none focus:border-zinc-600 cursor-pointer"
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
            <svg className="animate-spin h-6 w-6 text-white mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading Collection...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="py-20 text-center bg-[#101013] border border-zinc-800/80 rounded-2xl p-8 space-y-4">
            <p className="text-sm font-display text-zinc-400">
              No garments found matching the active filters in this collection.
            </p>
            <button
              onClick={() => {
                setSelectedSize('all');
                setSelectedColor('all');
                setMaxPrice(30000);
              }}
              className="px-5 py-2.5 rounded-xl bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {displayProducts.map((product) => {
              const isOutOfStock = product.stock !== undefined && product.stock <= 0;
              const displayImage = product.images?.[0] || '/images/pdp_front.jpg';

              return (
                <div
                  key={product.id}
                  className="group relative flex flex-col justify-between bg-[#111113] hover:bg-[#141417] border border-zinc-800/80 hover:border-zinc-700/90 rounded-2xl p-3.5 sm:p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
                >
                  {/* Landscape Image Container */}
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

                    {product.isNewArrival && (
                      <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-[0.2em] font-display font-medium px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
                        New
                      </span>
                    )}

                    {isOutOfStock ? (
                      <span className="absolute top-2.5 right-2.5 bg-zinc-900/90 text-zinc-400 text-[9px] uppercase tracking-wider font-display font-semibold px-2.5 py-1 rounded-full border border-zinc-700/80 shadow-md">
                        Sold Out
                      </span>
                    ) : product.stock && product.stock <= 5 ? (
                      <span className="absolute top-2.5 right-2.5 bg-amber-500/90 text-black text-[9px] uppercase tracking-wider font-display font-bold px-2.5 py-0.5 rounded-full shadow-md">
                        Low Stock
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
