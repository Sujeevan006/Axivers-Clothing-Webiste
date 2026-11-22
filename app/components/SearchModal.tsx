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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-zinc-200">
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
            className="w-full bg-transparent text-[#060606] placeholder-zinc-400 text-sm font-display tracking-wide focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs uppercase tracking-wider text-zinc-400 hover:text-black px-2 py-1 mr-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100 transition-colors"
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
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-display font-semibold block">
              Suggested Collections
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Signature Essential', href: '/product/flagship-tee-black' },
                { label: 'Men\'s Collection', href: '/collections/men' },
                { label: 'Mercerized Cotton', href: '/fabric-technology' },
                { label: 'Our Story', href: '/our-story' },
                { label: 'Lookbook', href: '/lookbook' },
              ].map((pill) => (
                <Link
                  key={pill.label}
                  href={pill.href}
                  onClick={onClose}
                  className="px-3 py-1.5 rounded-lg bg-[#f6f6f6] hover:bg-[#060606] text-zinc-700 hover:text-white text-xs font-display transition-colors"
                >
                  {pill.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Search Results */}
        {query && (
          <div className="overflow-y-auto p-4 space-y-2 flex-1">
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-display text-zinc-600">
                  No garments found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-zinc-400">
                  Try searching for &quot;Crewneck&quot;, &quot;Mercerized&quot;, or &quot;Onyx Black&quot;.
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-display font-semibold block px-3 py-1">
                  Results ({filteredResults.length})
                </span>
                {filteredResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug || product.id}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-3 rounded-xl hover:bg-[#f6f6f6] transition-colors group"
                  >
                    <div className="w-14 h-14 bg-[#f6f6f6] rounded-lg overflow-hidden relative shrink-0 border border-zinc-200">
                      <Image
                        src={product.images?.[0] || '/images/flagship-tee-black.jpg'}
                        alt={product.name}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-display block">
                        {product.categoryLabel || 'Essential'}
                      </span>
                      <h4 className="text-xs sm:text-sm font-display font-medium text-[#060606] group-hover:text-black truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#060606] mt-0.5">
                        {formatCurrency(product.price, product.currency || 'LKR', true)}
                      </p>
                    </div>
                    <span className="text-xs text-zinc-400 group-hover:text-black font-display font-medium shrink-0">
                      View &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};