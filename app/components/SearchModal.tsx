'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import type { Product } from '@/types/product';
import { getProducts } from '@/services/productService';
import { formatCurrency } from '@/lib/utils/formatters';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      getProducts({ activeOnly: true }).then((products) => {
        setAllProducts(products || []);
      });
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setFilteredResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matches = allProducts.filter((product) => {
      const matchName = product.name?.toLowerCase().includes(q);
      const matchCat = product.categoryLabel?.toLowerCase().includes(q) || product.category?.toLowerCase().includes(q);
      const matchDesc = product.description?.toLowerCase().includes(q);
      const matchTags = product.tags?.some((t) => t.toLowerCase().includes(q));
      return matchName || matchCat || matchDesc || matchTags;
    });
    setFilteredResults(matches.slice(0, 6));
  }, [query, allProducts]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && query.trim()) {
      onClose();
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#0e0e11] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-800/80">
          <svg className="w-5 h-5 text-zinc-400 shrink-0 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search garments by name, fabric, or collection..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm font-display tracking-wide focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase tracking-wider text-zinc-500 hover:text-white px-2 py-1 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800/50 transition-colors"
            aria-label="Close search"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-display font-semibold block">
              Suggested Collections
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Flagship Piping', href: '/collections/flagship-piping' },
                { label: "Men's Collection", href: '/collections/men' },
                { label: "Women's Collection", href: '/collections/women' },
                { label: 'Minimalist Essentials', href: '/collections/minimalist-essentials' },
                { label: 'Technical Garments', href: '/collections/technical' },
                { label: '60/40 Cotton-Modal', href: '/fabric-technology' },
              ].map((pill) => (
                <Link
                  key={pill.href}
                  href={pill.href}
                  onClick={onClose}
                  className="px-3.5 py-1.5 rounded-full text-xs font-display text-zinc-300 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:text-white transition-all"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && filteredResults.length > 0 && (
          <div className="overflow-y-auto divide-y divide-zinc-800/60 p-2">
            {filteredResults.map((product) => {
              const displayImage = product.images?.[0] || '/images/pdp_front.jpg';
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.slug || product.id}`}
                  onClick={onClose}
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-zinc-900/70 transition-colors group"
                >
                  <div className="w-14 h-14 bg-zinc-900 rounded-lg overflow-hidden relative shrink-0 border border-zinc-800">
                    <Image
                      src={displayImage}
                      alt={product.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-display font-medium block">
                      {product.categoryLabel || product.category}
                    </span>
                    <h4 className="text-sm font-display font-semibold text-white group-hover:text-zinc-200 truncate">
                      {product.name}
                    </h4>
                    <span className="text-xs font-mono font-medium text-zinc-400">
                      {formatCurrency(product.price, product.currency || 'LKR', true)}
                    </span>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono group-hover:text-white transition-colors">
                    &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {/* No Results Fallback */}
        {query && filteredResults.length === 0 && (
          <div className="p-8 text-center space-y-2">
            <p className="text-xs font-display text-zinc-400">
              No garments found matching &ldquo;<span className="text-white font-semibold">{query}</span>&rdquo;
            </p>
            <p className="text-[11px] text-zinc-500">
              Try searching by collection (e.g. &ldquo;piping&rdquo;, &ldquo;modal&rdquo;, &ldquo;men&rdquo;, &ldquo;white&rdquo;)
            </p>
          </div>
        )}

        {/* Footer info bar */}
        <div className="px-5 py-3 bg-[#0a0a0d] border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-display">
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">ESC</kbd> to exit</span>
          {query && (
            <Link
              href={`/shop?q=${encodeURIComponent(query)}`}
              onClick={onClose}
              className="text-white hover:underline flex items-center space-x-1"
            >
              <span>View all results</span>
              <span>&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
