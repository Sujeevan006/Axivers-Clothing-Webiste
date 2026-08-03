"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { useCart } from '../context/CartContext';

interface PDPProps {
  product: Product;
}

export const PDP: React.FC<PDPProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Black');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');

  const { addToCart } = useCart();

  useEffect(() => {
    setActiveImageIndex(0);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const sizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const colors = product.colors || ['Black', 'White'];
  const images = product.images && product.images.length > 0 ? product.images : ['/images/pdp_front.jpg'];
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, 1);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
      }, 2000);
    }, 500);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <section className="py-28 bg-[#09090b] text-[#ffffff] px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back navigation button */}
        <Link
          href="/shop"
          className="group inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-display font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <svg
            className="w-4 h-4 transform transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Catalog</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image Display */}
            <div className="aspect-square bg-zinc-950 border border-zinc-800 relative overflow-hidden group rounded-2xl shadow-2xl">
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                width={900}
                height={900}
                className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 ${
                  isOutOfStock ? 'opacity-50 grayscale' : ''
                }`}
                priority
              />

              {/* Category Tag */}
              <span className="absolute top-4 left-4 bg-black/90 backdrop-blur-md border border-zinc-700 text-white text-[10px] uppercase tracking-widest font-display font-semibold px-3 py-1 rounded-md">
                {product.categoryLabel || product.category}
              </span>

              {/* Stock Tag */}
              {isOutOfStock ? (
                <span className="absolute top-4 right-4 bg-zinc-900 text-zinc-400 text-[10px] uppercase tracking-widest font-display font-bold px-3 py-1 rounded-md border border-zinc-700 shadow-md">
                  Sold Out
                </span>
              ) : product.stock !== undefined ? (
                <span className="absolute top-4 right-4 bg-white text-black text-[10px] uppercase tracking-widest font-display font-bold px-3 py-1 rounded-md shadow-md">
                  In Stock ({product.stock} units)
                </span>
              ) : null}
            </div>

            {/* Thumbnail Track */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square bg-zinc-950 border cursor-pointer overflow-hidden rounded-xl transition-all duration-300 relative ${
                      activeImageIndex === idx
                        ? 'border-white ring-2 ring-white/50 opacity-100'
                        : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} Thumbnail ${idx + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info & Selectors */}
          <div className="lg:col-span-5 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-zinc-500 font-display">
              <Link href="/" className="hover:text-zinc-300">Axivers</Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-zinc-300">Shop</Link>
              <span>/</span>
              <span className="text-white font-semibold">{product.category}</span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-white uppercase">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-sm font-light italic text-zinc-400 mt-1">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Price Display */}
            <div className="flex items-baseline space-x-4 pt-2">
              <span className="text-2xl font-mono font-bold text-white">
                LKR {product.price.toLocaleString()}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-sm text-zinc-500 line-through font-mono">
                  LKR {product.compareAtPrice.toLocaleString()}
                </span>
              )}
            </div>

            <p className="text-xs font-light text-zinc-300 leading-relaxed pt-2">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-display">
                <span className="uppercase tracking-widest font-semibold text-zinc-300">Select Size:</span>
                <span className="text-zinc-500 text-[10px] uppercase tracking-wider">Sri Lanka Standard Fit</span>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-white text-black border-white shadow-md font-bold'
                        : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            {colors && colors.length > 0 && (
              <div className="space-y-2 pt-2">
                <span className="block text-xs font-display uppercase tracking-widest font-semibold text-zinc-300">
                  Select Color:
                </span>
                <div className="flex gap-3">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 text-xs font-display font-semibold rounded-lg border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart CTA */}
            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || isOutOfStock}
                className={`w-full py-4 text-xs font-display uppercase tracking-widest font-bold rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2 shadow-lg ${
                  isOutOfStock
                    ? 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed'
                    : addedSuccess
                    ? 'bg-white text-black border-white'
                    : 'bg-white text-black border-white hover:bg-zinc-200 font-bold'
                }`}
              >
                {isOutOfStock ? (
                  <span>Sold Out — Check Back Soon</span>
                ) : isAdding ? (
                  <span>Adding to Bag...</span>
                ) : addedSuccess ? (
                  <span>Added to Shopping Bag</span>
                ) : (
                  <span>Add to Cart — LKR {product.price.toLocaleString()}</span>
                )}
              </button>
            </div>

            {/* Accordions: Fabric Spec & Care Instructions */}
            <div className="border-t border-zinc-800/80 pt-4 space-y-2">
              {/* Accordion 1: Fabric Spec */}
              <div className="border-b border-zinc-800/60 pb-2">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full py-3 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Fabric Specification</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      openAccordion === 'fabric' ? 'rotate-180 text-white' : 'text-zinc-500'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'fabric' && (
                  <div className="text-xs font-light text-zinc-400 leading-relaxed space-y-1 pb-3">
                    <p><strong>Composition:</strong> {product.fabricSpec || '60% Combed Cotton / 40% Modal blend, 190 GSM.'}</p>
                    <p><strong>Drape & Structure:</strong> Engineered for shape retention and soft hand feel.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Care Instructions */}
              <div className="border-b border-zinc-800/60 pb-2">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full py-3 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span>Care Instructions</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-300 ${
                      openAccordion === 'care' ? 'rotate-180 text-white' : 'text-zinc-500'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'care' && (
                  <div className="text-xs font-light text-zinc-400 leading-relaxed pb-3">
                    <p>{product.careInstructions || 'Machine wash cold inside out. Flat dry in shade. Do not iron directly on print or embroidery.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
