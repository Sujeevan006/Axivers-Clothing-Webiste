"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { getProducts, subscribeToActiveProducts } from '@/services/productService';
import { getCategories, subscribeToCategories, BASELINE_CATEGORIES } from '@/services/categoryService';
import { formatCurrency, fromMinorUnits } from '@/lib/utils/formatters';
import { QuickAddModal } from './QuickAddModal';
import { ProductCard } from './ProductCard';
import { ProductSlider } from './ProductSlider';
import { ShopCategories } from './HomeSections';

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


  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam]);

  useEffect(() => {
    setSearchQuery(queryParam || '');
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
    { value: 'all', label: 'All essentials' },
    ...categories.map((c) => ({ value: c.slug, label: c.name })),
  ];

  const sizeOptions = ['all', 'S', 'M', 'L', 'XL'];

  const filteredProducts = products.filter((product) => {
    if (product.slug === 'piping-crewneck') return false;
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
    <section className="catalog-page pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8 bg-surface text-ink min-h-screen">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Page Header */}
        <div className="catalog-heading space-y-3">
          <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-medium block">
            An everyday of your own
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-ink normal-case">
            All essentials
          </h1>
          <p className="text-sm sm:text-sm font-normal text-zinc-500 leading-relaxed">
            Find your fit. Make it your own. Thoughtful essentials, crafted in Sri Lanka.
          </p>

          {/* Search bar */}
          <div className="pt-2">
            <div className="catalog-search relative max-w-md mx-auto">
              <input
                type="search"
                aria-label="Search the collection"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search garments by name or fabric..."
                className="w-full px-4 py-2.5 pl-10 pr-16 bg-canvas border border-zinc-200 rounded-lg text-sm font-display tracking-wider text-ink focus:outline-none focus:border-ink placeholder:text-zinc-400"
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
                  className="absolute right-3 top-2.5 text-sm text-zinc-500 hover:text-ink"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        <ShopCategories navigation />
        {/* Collection filters */}
        <div className="catalog-filters border border-zinc-200 space-y-4">
          {/* Category Tabs */}
          <div>
            <span className="text-sm normal-case tracking-wider text-zinc-500 font-display font-semibold block mb-2">
              Categories:
            </span>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  aria-pressed={selectedCategory === cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-1.5 text-sm font-display normal-case tracking-wider rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-ink text-paper border-ink font-bold shadow-sm'
                      : 'bg-surface text-zinc-700 border-zinc-200 hover:border-ink'
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
              <span className="text-sm normal-case tracking-wider text-zinc-500 font-display font-semibold whitespace-nowrap">
                Size:
              </span>
              <div className="flex gap-1.5 flex-wrap">
                {sizeOptions.map((sz) => (
                  <button
                    key={sz}
                    aria-pressed={selectedSizeFilter === sz}
                    onClick={() => setSelectedSizeFilter(sz)}
                    className={`px-2.5 py-1 text-sm font-mono rounded border transition-all cursor-pointer ${
                      selectedSizeFilter === sz
                        ? 'bg-ink text-paper border-ink font-bold'
                        : 'bg-surface text-zinc-700 border-zinc-200 hover:border-ink'
                    }`}
                  >
                    {sz === 'all' ? 'All' : sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm font-display text-zinc-500">
                <span>Max Price:</span>
                <span className="font-mono text-ink font-bold">{formatCurrency(maxPriceFilter, 'LKR', false)}</span>
              </div>
              <input
                type="range"
                aria-label="Maximum price in LKR"
                min={2000}
                max={25000}
                step={500}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-ink cursor-pointer"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2 md:justify-end">
              <span className="text-sm normal-case tracking-wider text-zinc-500 font-display font-semibold">
                Sort:
              </span>
              <select
                aria-label="Sort products"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-zinc-200 text-sm font-display py-1.5 px-3 focus:outline-none focus:border-ink rounded-lg text-ink cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4"><p aria-live="polite" className="text-muted">{isLoading ? 'Finding your essentials…' : `${sortedProducts.length} ${sortedProducts.length === 1 ? 'essential' : 'essentials'}`}</p><button className="text-link" onClick={() => { setSelectedCategory('all'); setSelectedSizeFilter('all'); setMaxPriceFilter(25000); setSearchQuery(''); }}>Clear all filters</button></div>
        {/* Product Cards Grid */}
        {isLoading ? (
          <div className="text-center py-20 space-y-3">
            <svg className="animate-spin h-6 w-6 text-ink mx-auto" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <p className="text-sm normal-case tracking-widest font-display text-zinc-500">
              Loading Products...
            </p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-surface border border-zinc-200 rounded-2xl p-8 space-y-4">
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
              className="px-5 py-2 bg-ink text-paper font-display text-sm normal-case tracking-wider font-bold rounded-lg hover:bg-zinc-800 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <ProductSlider label="Shop essentials">
            {sortedProducts.map(product => <ProductCard key={product.id} product={product} onQuickAdd={setQuickAddProduct} />)}
          </ProductSlider>
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
