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
  const queryParam = searchParams.get('q');

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(BASELINE_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<string>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(25000);
  const [searchQuery, setSearchQuery] = useState<string>(queryParam || '');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isLoading, setIsLoading] = useState<boolean>(initialProducts.length === 0);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  const { addToCart } = useCart();

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    if (queryParam !== null) {
      setSearchQuery(queryParam);
    }
  }, [queryParam]);

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
    <section className="pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8 bg-white text-[#060606] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono font-medium block">
            Axivers Collection
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#060606] uppercase">
            All Garments
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-500 leading-relaxed">
            Minimalist everyday essentials crafted in Sri Lanka.
          </p>

          {/* Search bar */}
          <div className="pt-2">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search garments by name or fabric..."
                className="w-full px-4 py-2.5 pl-10 bg-[#f6f6f6] border border-zinc-200 rounded-lg text-xs font-display tracking-wider text-[#060606] focus:outline-none focus:border-black placeholder:text-zinc-400"
              />
              <svg
                className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-zinc-500 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clean Light Filter Bar */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-xl p-5 space-y-4 shadow-sm">
          {/* Category Tabs */}
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold block mb-2">
              Categories:
            </span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 text-xs font-display uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-[#060606] text-white border-[#060606] font-bold shadow-sm'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-zinc-200 items-center">
            {/* Size Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold whitespace-nowrap">
                Size:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-all cursor-pointer ${
                      selectedSizeFilter === sz
                        ? 'bg-[#060606] text-white border-[#060606] font-bold'
                        : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                    }`}
                  >
                    {sz === 'all' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] font-display text-zinc-500">
                <span>Max Price:</span>
                <span className="font-mono text-[#060606] font-bold">{formatCurrency(maxPriceFilter, 'LKR', false)}</span>
              </div>
              <input
                type="range"
                min={2000}
                max={25000}
                step={500}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#060606] cursor-pointer"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 md:justify-end">
              <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold">
                Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-zinc-200 text-xs font-display py-1.5 px-3 focus:outline-none focus:border-black rounded-lg text-[#060606] cursor-pointer"
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
            <svg className="animate-spin h-6 w-6 text-[#060606] mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-xs uppercase tracking-widest font-display text-zinc-500">
              Loading Products...
            </p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#fafafa] border border-zinc-200 rounded-2xl p-8 space-y-4">
            <p className="text-sm font-display text-zinc-600">
              No garments found matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSizeFilter('all');
                setMaxPriceFilter(25000);
                setSearchQuery('');
              }}
              className="px-5 py-2 bg-[#060606] text-white font-display text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-zinc-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {sortedProducts.map((product) => {
              const isOutOfStock = product.stock !== undefined && product.stock <= 0;
              const primaryImage = product.images?.[0] || '/images/flagship-tee-black.jpg';
              const secondaryImage = product.images?.[1] || null;

              return (
                <div
                  key={product.id}
                  className="group flex flex-col justify-between bg-white transition-all duration-300"
                >
                  {/* Garment Image Container */}
                  <Link
                    href={`/product/${product.slug || product.id}`}
                    className="aspect-[3/4] bg-[#f6f6f6] rounded-xl overflow-hidden relative block border border-zinc-200/70 group-hover:border-zinc-400 transition-colors"
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

                  {/* Card Details */}
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