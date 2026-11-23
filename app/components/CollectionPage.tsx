'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { getProducts, subscribeToActiveProducts } from '@/services/productService';
import { formatCurrency, fromMinorUnits } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';
import { ProductCard } from './ProductCard';
import { ProductSlider } from './ProductSlider';
import { ShopCategories } from './HomeSections';

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
    <div className="collection-page min-h-screen bg-canvas text-ink pb-20">
      <div className="collection-breadcrumb"><div className="site-shell"><Link href="/">Home</Link><span>/</span><h1>{config.title}</h1></div></div>
      <ShopCategories navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 space-y-8">
        {/* Clean Light Filter Toolbar */}
        <div className="catalog-filters border border-zinc-200 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left: Size Filters */}
            <div className="flex items-center space-x-2">
              <span className="text-sm normal-case tracking-wider text-zinc-500 font-display font-semibold mr-1">
                Size:
              </span>
              {['all', 'S', 'M', 'L', 'XL'].map((sz) => (
                <button
                  key={sz}
                  aria-pressed={selectedSize === sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-mono font-medium border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-ink text-paper border-ink font-bold'
                      : 'bg-surface text-zinc-700 border-zinc-200 hover:border-ink'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>

            {/* Middle: Color filter if multiple exist */}
            {availableColors.length > 1 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm normal-case tracking-wider text-zinc-500 font-display font-semibold mr-1">
                  Color:
                </span>
                <select
                  aria-label="Filter by color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="bg-surface border border-zinc-200 text-sm font-display py-1.5 px-3 rounded-lg text-ink focus:outline-none focus:border-ink cursor-pointer"
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
              <span className="text-sm font-mono text-zinc-500 hidden sm:inline">
                {displayProducts.length} {displayProducts.length === 1 ? 'Garment' : 'Garments'}
              </span>
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-zinc-200 text-sm font-display py-1.5 px-3 rounded-lg text-ink focus:outline-none focus:border-ink cursor-pointer"
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
            <svg className="animate-spin h-6 w-6 text-ink mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm normal-case tracking-widest font-display text-zinc-500">Loading Collection...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="py-20 text-center bg-surface border border-zinc-200 rounded-2xl p-8 space-y-4">
            <p className="text-sm font-display text-zinc-600">
              No garments found matching the active filters in this collection.
            </p>
            <button
              onClick={() => {
                setSelectedSize('all');
                setSelectedColor('all');
                setMaxPrice(30000);
              }}
              className="px-5 py-2.5 rounded-lg bg-ink text-paper font-display text-sm normal-case tracking-wider font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ProductSlider label="Collection essentials">
            {displayProducts.map(product => <ProductCard key={product.id} product={product} onQuickAdd={setQuickAddProduct} />)}
          </ProductSlider>
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