"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { useCart } from '../context/CartContext';
import { getProducts, subscribeToActiveProducts } from '@/services/productService';
import { getCategories, subscribeToCategories, BASELINE_CATEGORIES } from '@/services/categoryService';
import { formatCurrency, fromMinorUnits } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';

interface ProductsPageProps {
  initialProducts?: Product[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ initialProducts = [] }) => {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(BASELINE_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(25000);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isLoading, setIsLoading] = useState<boolean>(initialProducts.length === 0);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();

  // Sync category filter if URL query param changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Load dynamic categories
  useEffect(() => {
    getCategories().then((cats) => {
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    });

    const unsubscribeCategories = subscribeToCategories((cats) => {
      if (cats && cats.length > 0) {
        setCategories(cats);
      }
    });

    return () => unsubscribeCategories();
  }, []);

  // Load and subscribe to active products
  useEffect(() => {
    getProducts({ activeOnly: true }).then((fetched) => {
      if (fetched && fetched.length > 0) {
        setProducts(fetched);
      }
      setIsLoading(false);
    });

    const unsubscribeProducts = subscribeToActiveProducts((updatedProducts) => {
      if (updatedProducts && updatedProducts.length > 0) {
        setProducts(updatedProducts);
      }
      setIsLoading(false);
    });

    return () => unsubscribeProducts();
  }, []);

  const categoryOptions = [
    { value: 'all', label: 'All Garments' },
    ...categories.map((c) => ({ value: c.slug, label: c.name })),
  ];

  const sizeOptions = ['all', 'S', 'M', 'L', 'XL'];

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category === selectedCategory ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSize =
      selectedSizeFilter === 'all' ||
      (product.sizes && product.sizes.includes(selectedSizeFilter));

    const majorPrice = fromMinorUnits(product.price);
    const matchesPrice = majorPrice <= maxPriceFilter;

    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tagline && product.tagline.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSize && matchesPrice && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = fromMinorUnits(a.price);
    const priceB = fromMinorUnits(b.price);
    if (sortBy === 'price-asc') return priceA - priceB;
    if (sortBy === 'price-desc') return priceB - priceA;
    if (sortBy === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    return 0;
  });

  return (
    <section className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-[#ffffff] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white font-display font-semibold block">
            Axivers Storefront
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light tracking-tight">
            The <span className="font-bold text-white">Garment Catalog</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
            Athletic luxury engineered for durability, drape, and performance.
          </p>

          {/* Search bar */}
          <div className="pt-2">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name, category, or fabric..."
                className="w-full px-4 py-2.5 pl-10 bg-zinc-900 border border-zinc-800 rounded-xl text-xs font-display tracking-wider text-white focus:outline-none focus:border-white placeholder:text-zinc-500 shadow-inner"
              />
              <svg
                className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filters & Sorting Section */}
        <div className="bg-zinc-900/60 backdrop-blur-md border border-zinc-800/80 rounded-2xl p-5 space-y-5">
          {/* Dynamic Category Tabs */}
          <div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-display font-semibold block mb-2.5">
              Categories:
            </span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 text-xs font-display uppercase tracking-wider font-semibold rounded-lg border transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-white text-black border-white font-bold shadow-md'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-zinc-800/60 items-center">
            {/* Size Filter */}
            <div className="flex items-center space-x-3">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-display font-semibold whitespace-nowrap">
                Size Filter:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-all cursor-pointer ${
                      selectedSizeFilter === sz
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {sz === 'all' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-display text-zinc-400">
                <span>Max Price:</span>
                <span className="font-mono text-white font-bold">{formatCurrency(maxPriceFilter, 'LKR', false)}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={25000}
                step={500}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-white cursor-pointer"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 md:justify-end">
              <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-display font-semibold">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-xs font-display py-2 px-3 focus:outline-none focus:border-white rounded-lg text-white cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="text-center py-20 space-y-3">
            <svg className="animate-spin h-7 w-7 text-white mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs uppercase tracking-widest font-display text-zinc-500">
              Connecting to Axivers Firestore...
            </p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 space-y-4">
            <p className="text-sm font-display text-zinc-400">
              No garments found matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSizeFilter('all');
                setMaxPriceFilter(25000);
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-zinc-200 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {sortedProducts.map((product) => {
              const isOutOfStock = product.stock !== undefined && product.stock <= 0;
              const displayImage = product.images?.[0] || '/images/pdp_front.jpg';
              const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-zinc-900/80 backdrop-blur-md border border-zinc-800 p-4 sm:p-5 transition-all duration-300 hover:border-white/50 hover:shadow-2xl rounded-2xl overflow-hidden relative w-full"
                >
                  {/* Image Container with full-garment view */}
                  <Link
                    href={`/product/${product.slug || product.id}`}
                    className="aspect-[3/4] bg-[#050507] overflow-hidden relative cursor-pointer rounded-xl block border border-zinc-800/80"
                  >
                    <Image
                      src={displayImage}
                      alt={product.name}
                      width={600}
                      height={800}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 ${
                        isOutOfStock ? 'opacity-40 grayscale' : ''
                      }`}
                    />
                    {/* Category Tag */}
                    <span className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-zinc-700 text-white text-[9px] uppercase tracking-widest font-display font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      {product.categoryLabel || product.category}
                    </span>

                    {/* Stock Status Badge */}
                    {isOutOfStock ? (
                      <span className="absolute top-3 right-3 bg-zinc-900/90 text-zinc-400 text-[9px] uppercase tracking-widest font-display font-bold px-2.5 py-1 rounded-md border border-zinc-700 shadow-md">
                        Sold Out
                      </span>
                    ) : product.stock && product.stock <= 5 ? (
                      <span className="absolute top-3 right-3 bg-white text-black text-[9px] uppercase tracking-widest font-display font-bold px-2.5 py-1 rounded-md shadow-md">
                        Low Stock ({product.stock} units remaining)
                      </span>
                    ) : null}
                  </Link>

                  {/* Product Details */}
                  <div className="pt-4 flex-grow flex flex-col justify-between space-y-4">
                    <div>
                      <Link href={`/product/${product.slug || product.id}`} className="cursor-pointer block">
                        <h3 className="text-sm sm:text-base font-display uppercase tracking-wider font-semibold text-white group-hover:text-zinc-300 transition-colors line-clamp-1">
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
                      <div>
                        <span className="text-sm sm:text-base font-bold font-mono text-white">
                          {formatCurrency(product.price, product.currency || 'LKR', true)}
                        </span>
                        {hasDiscount && (
                          <span className="text-xs text-zinc-500 line-through ml-2 font-mono">
                            {formatCurrency(product.compareAtPrice!, product.currency || 'LKR', true)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setQuickAddProduct(product)}
                        disabled={isOutOfStock}
                        className={`text-[10px] uppercase tracking-wider font-display font-bold px-3.5 py-2 transition-all duration-300 rounded-lg cursor-pointer ${
                          isOutOfStock
                            ? 'bg-zinc-800 text-zinc-600 border border-zinc-700 cursor-not-allowed'
                            : 'bg-white text-black border border-white hover:bg-zinc-200 shadow-sm font-bold'
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
        )}
      </div>

      {/* Quick Add Modal */}
      {quickAddProduct && (
        <QuickAddModal
          product={quickAddProduct}
          onClose={() => setQuickAddProduct(null)}
        />
      )}
    </section>
  );
};
