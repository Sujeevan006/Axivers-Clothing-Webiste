"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';
import { useCart } from '../context/CartContext';

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
    product?.colors?.[0] || 'Black'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  if (!product) return null;

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = product.colors && product.colors.length > 0 ? product.colors : ['Black', 'White'];
  const displayImage = product.images?.[0] || '/images/pdp_front.jpg';

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
      }, 1000);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm animate-fade-in cursor-pointer"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-800 transition-colors z-20 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
          {/* Product Image */}
          <div className="sm:col-span-5 aspect-square bg-zinc-950 rounded-xl overflow-hidden relative border border-zinc-800">
            <Image
              src={displayImage}
              alt={product.name}
              width={400}
              height={400}
              className={`w-full h-full object-cover ${isOutOfStock ? 'opacity-50 grayscale' : ''}`}
            />
            {isOutOfStock && (
              <span className="absolute top-2 left-2 bg-zinc-900 border border-zinc-700 text-zinc-400 text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded">
                Sold Out
              </span>
            )}
          </div>

          {/* Details & Selectors */}
          <div className="sm:col-span-7 space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                {product.category}
              </span>
              <h3 className="text-base font-display font-semibold uppercase tracking-wider text-white">
                {product.name}
              </h3>
              <p className="text-xs font-mono font-bold text-white mt-1">
                LKR {product.price.toLocaleString()}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-[10px] uppercase font-display font-semibold text-zinc-400 mb-1.5">
                Select Size:
              </label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 text-xs font-mono rounded border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {colors.length > 0 && (
              <div>
                <label className="block text-[10px] uppercase font-display font-semibold text-zinc-400 mb-1.5">
                  Select Color:
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 text-xs font-display rounded border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-zinc-500'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleAdd}
                disabled={isOutOfStock || isAdding}
                className={`w-full py-3 text-xs font-display uppercase tracking-widest font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                  isOutOfStock
                    ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-white text-black font-bold'
                    : 'bg-white text-black hover:bg-zinc-200 shadow-md font-bold'
                }`}
              >
                {isOutOfStock ? (
                  'Sold Out'
                ) : isAdding ? (
                  'Adding...'
                ) : addedSuccess ? (
                  'Added to Bag'
                ) : (
                  'Confirm & Add to Bag'
                )}
              </button>

              <Link
                href={`/product/${product.slug || product.id}`}
                onClick={onClose}
                className="block text-center text-[10px] uppercase tracking-widest font-display text-zinc-400 hover:text-white pt-1"
              >
                View Full Specifications &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
