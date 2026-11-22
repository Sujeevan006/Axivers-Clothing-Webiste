"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '@/lib/utils/formatters';

interface QuickAddModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || 'M'
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] || 'Onyx Black'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!product) return null;

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = product.colors && product.colors.length > 0 ? product.colors : [];
  const displayImage = product.images?.[0] || '/images/flagship-tee-black.jpg';

  const handleAdd = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        onClose();
      }, 700);
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in cursor-pointer"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white border border-zinc-200 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-black p-2 rounded-full hover:bg-zinc-100 transition-colors z-20 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Product Image */}
          <div className="sm:col-span-5 aspect-[3/4] bg-[#f6f6f6] rounded-xl overflow-hidden relative border border-zinc-200">
            <Image
              src={displayImage}
              alt={product.name}
              width={400}
              height={500}
              className={`w-full h-full object-cover ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
            />
            {isOutOfStock && (
              <span className="absolute top-2 left-2 bg-white border border-zinc-200 text-zinc-700 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                Limited Preview
              </span>
            )}
          </div>

          {/* Details & Selectors */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                {product.categoryLabel || product.category}
              </span>
              <h3 className="text-sm sm:text-base font-display font-medium uppercase tracking-wider text-[#060606] leading-snug">
                {product.name}
              </h3>
              <p className="text-sm font-mono font-bold text-[#060606] mt-1">
                {formatCurrency(product.price, product.currency || 'LKR', true)}
              </p>
            </div>

            {/* Size Selector */}
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-600 block">
                Select Size:
              </span>
              <div className="grid grid-cols-4 gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-[#060606] text-white border-[#060606] font-bold shadow-sm'
                        : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector if present */}
            {colors.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-600 block">
                  Color:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 text-xs font-display rounded-lg border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-[#060606] text-white border-[#060606] font-bold'
                          : 'bg-white text-zinc-700 border-zinc-300 hover:border-black'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart CTA */}
            <div className="pt-2">
              <button
                onClick={handleAdd}
                disabled={isAdding || isOutOfStock}
                className={`w-full py-3 px-4 rounded-lg font-display text-xs uppercase tracking-wider font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center space-x-2 ${
                  isOutOfStock
                    ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#060606] text-white hover:bg-zinc-800'
                }`}
              >
                <span>
                  {isOutOfStock
                    ? 'Sold Out'
                    : isAdding
                    ? 'Adding to Bag...'
                    : addedSuccess
                    ? 'Added to Bag ✓'
                    : 'Add to Bag'}
                </span>
              </button>

              <div className="text-center pt-2">
                <Link
                  href={`/product/${product.slug || product.id}`}
                  onClick={onClose}
                  className="text-[11px] text-zinc-500 hover:text-black underline font-display"
                >
                  View Full Product Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};