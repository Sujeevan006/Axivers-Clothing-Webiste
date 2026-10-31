'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { getProducts } from '@/services/productService';

interface PDPProps {
  product: Product;
}

export const PDP: React.FC<PDPProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor('');
    }

    // Fetch related products
    getProducts({ activeOnly: true }).then((all) => {
      if (all) {
        const related = all.filter((p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender));
        setRelatedProducts(related.slice(0, 3));
      }
    });
  }, [product]);

  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = product.colors && product.colors.length > 0 ? product.colors : [];
  const images = product.images && product.images.length > 0 ? product.images : ['/images/pdp_front.jpg'];
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        setIsCartOpen(true);
      }, 600);
    }, 350);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-[#09090b] text-[#ffffff] min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-zinc-400 font-display">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-white transition-colors">
            {product.categoryLabel || product.category}
          </Link>
          <span>/</span>
          <span className="text-white font-semibold truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Showcase: Gallery & Purchasing Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Gallery with Interactive Zoom */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-[4/3] bg-[#121215] border border-zinc-800/80 rounded-2xl overflow-hidden cursor-zoom-in shadow-2xl group"
            >
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isOutOfStock ? 'opacity-50 grayscale' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-black/60 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-[0.2em] font-display font-medium px-3 py-1 rounded-full border border-white/10 shadow-sm">
                  {product.categoryLabel || 'Garment'}
                </span>
                {product.fabricSpec && (
                  <span className="bg-white/10 backdrop-blur-md text-white text-[9px] uppercase tracking-wider font-display font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    60/40 Cotton-Modal
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="absolute top-4 right-4">
                {isOutOfStock ? (
                  <span className="bg-zinc-900/90 text-zinc-400 text-[9px] uppercase tracking-wider font-display font-bold px-3 py-1 rounded-full border border-zinc-700 shadow-md">
                    Sold Out
                  </span>
                ) : product.stock && product.stock <= 5 ? (
                  <span className="bg-amber-500 text-black text-[9px] uppercase tracking-wider font-display font-bold px-3 py-1 rounded-full shadow-md">
                    Only {product.stock} Left
                  </span>
                ) : (
                  <span className="bg-black/60 backdrop-blur-md text-zinc-300 text-[9px] uppercase tracking-wider font-display px-3 py-1 rounded-full border border-zinc-700">
                    In Stock
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <span className="absolute bottom-3 right-3 text-[9px] uppercase tracking-wider text-zinc-400 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-zinc-800 hidden sm:inline-flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>Click to Expand</span>
              </span>
            </div>

            {/* Thumbnail Navigation Track */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square bg-[#121215] border rounded-xl overflow-hidden relative transition-all duration-300 cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-white ring-2 ring-white/40 opacity-100 scale-95'
                        : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="15vw"
                      className="object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Info, Options & Purchase */}
          <div className="lg:col-span-5 space-y-7">
            {/* Header info */}
            <div className="space-y-2 border-b border-zinc-800/80 pb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
                Axivers Garment Specification
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-xs sm:text-sm font-light text-zinc-400 italic">
                  {product.tagline}
                </p>
              )}

              {/* Price Row */}
              <div className="flex items-baseline space-x-3 pt-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                  {formatCurrency(product.price, product.currency || 'LKR', true)}
                </span>
                {hasDiscount && (
                  <span className="text-sm font-mono text-zinc-500 line-through">
                    {formatCurrency(product.compareAtPrice!, product.currency || 'LKR', true)}
                  </span>
                )}
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-display font-medium px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Island-Wide Delivery
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection if available */}
            {colors.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs font-display">
                  <span className="uppercase tracking-wider font-semibold text-zinc-300">
                    Color: <span className="text-white font-bold">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-xl text-xs font-display font-medium border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-white text-black border-white font-bold shadow-md'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection & Size Guide */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center text-xs font-display">
                <span className="uppercase tracking-wider font-semibold text-zinc-300">
                  Select Size: <span className="text-white font-bold font-mono">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="text-zinc-400 hover:text-white underline text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Size Guide & Measurements &rarr;
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
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

            {/* Quantity Selector & Add to Cart */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Stepper */}
                <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-9 h-9 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-30 cursor-pointer rounded-lg hover:bg-zinc-800"
                    aria-label="Decrease quantity"
                  >
                    &minus;
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={isOutOfStock}
                    className="w-9 h-9 flex items-center justify-center text-zinc-300 hover:text-white disabled:opacity-30 cursor-pointer rounded-lg hover:bg-zinc-800"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Main CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || isOutOfStock}
                  className={`flex-1 py-3.5 px-6 rounded-xl font-display text-xs uppercase tracking-widest font-bold border transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                    isOutOfStock
                      ? 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-500 text-black border-emerald-500'
                      : 'bg-white text-black border-white hover:bg-zinc-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>
                    {isOutOfStock
                      ? 'Sold Out'
                      : isAdding
                      ? 'Adding to Bag...'
                      : addedSuccess
                      ? 'Added to Shopping Bag'
                      : 'Add to Cart'}
                  </span>
                </button>
              </div>
            </div>

            {/* Accordions: Fabric, Construction, Care, Shipping, Returns */}
            <div className="border-t border-zinc-800/80 pt-6 space-y-3">
              {/* Accordion 1: Fabric & Textile Engineering */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-[#101013]">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Fabric & Material Specification</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'fabric' ? 'rotate-180 text-white' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'fabric' && (
                  <div className="p-4 pt-0 text-xs font-light text-zinc-400 space-y-2 border-t border-zinc-800/60 mt-1">
                    <p><strong>Composition:</strong> {product.fabricSpec || '60% Combed Ring-Spun Cotton / 40% Beechwood Modal blend, 190 GSM.'}</p>
                    <p><strong>Drape & Hand Feel:</strong> Engineered for silky drape, cloud-soft touch, and zero clinginess.</p>
                    <p><strong>Origin:</strong> Precision milled and assembled in Sri Lanka.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fit & Construction */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-[#101013]">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Fit & Construction Details</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'fit' ? 'rotate-180 text-white' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'fit' && (
                  <div className="p-4 pt-0 text-xs font-light text-zinc-400 space-y-2 border-t border-zinc-800/60 mt-1">
                    <p><strong>Fit:</strong> Tailored Athletic Silhouette. Sculpted shoulders with comfortable chest allowance.</p>
                    <p><strong>Stitching:</strong> Reinforced twin-needle hem stitching and rib-knit neckband that will not bacon or warp.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care Instructions */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-[#101013]">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Garment Care Guide</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180 text-white' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'care' && (
                  <div className="p-4 pt-0 text-xs font-light text-zinc-400 space-y-2 border-t border-zinc-800/60 mt-1">
                    <p>{product.careInstructions || 'Machine wash cold inside out with similar colors. Flat dry in shade. Low iron avoiding prints or piping. Do not bleach.'}</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping & Returns */}
              <div className="border border-zinc-800/80 rounded-xl overflow-hidden bg-[#101013]">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Island-Wide Delivery & Easy Returns</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180 text-white' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-xs font-light text-zinc-400 space-y-2 border-t border-zinc-800/60 mt-1">
                    <p><strong>Colombo Delivery:</strong> 1-2 business days. Outstation: 2-4 business days.</p>
                    <p><strong>Payment:</strong> Cash on Delivery, Bank Transfer, Visa, Mastercard accepted.</p>
                    <p><strong>Returns:</strong> 7-day hassle-free exchange window for unworn items with tags intact.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-zinc-800/80 pt-16 space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
                  Complete The Wardrobe
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white uppercase">
                  Related Garments
                </h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-display uppercase tracking-widest text-zinc-400 hover:text-white flex items-center space-x-1"
              >
                <span>View All</span>
                <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {relatedProducts.map((rel) => {
                const relImg = rel.images?.[0] || '/images/pdp_front.jpg';
                return (
                  <Link
                    key={rel.id}
                    href={`/product/${rel.slug || rel.id}`}
                    className="group bg-[#111113] hover:bg-[#141417] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-3.5 transition-all duration-300 hover:-translate-y-1 block"
                  >
                    <div className="aspect-[16/10] bg-[#161618] rounded-xl overflow-hidden relative border border-zinc-800/60">
                      <Image
                        src={relImg}
                        alt={rel.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="pt-3 space-y-1">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-display block">
                        {rel.categoryLabel || rel.category}
                      </span>
                      <h4 className="text-sm font-display font-semibold text-white group-hover:text-zinc-200 truncate">
                        {rel.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-white block">
                        {formatCurrency(rel.price, rel.currency || 'LKR', true)}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Full-Screen Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
            <Image
              src={images[activeImageIndex] || images[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 border border-zinc-700 text-white"
            aria-label="Close zoom"
          >
            ✕
          </button>
        </div>
      )}

      {/* Quick Size Guide Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0e0e11] border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800/80 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-display font-semibold block">
                  Axivers Fit Guide
                </span>
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  Size Guide & Measurements
                </h3>
              </div>
              <button
                onClick={() => setShowSizeModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
                aria-label="Close size guide"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest (cm)</th>
                    <th className="py-2">Length (cm)</th>
                    <th className="py-2">Shoulder (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  <tr>
                    <td className="py-2.5 font-bold text-white">S</td>
                    <td className="py-2.5">96 - 100</td>
                    <td className="py-2.5">70</td>
                    <td className="py-2.5">44</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">M</td>
                    <td className="py-2.5">101 - 106</td>
                    <td className="py-2.5">72</td>
                    <td className="py-2.5">46</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">L</td>
                    <td className="py-2.5">107 - 112</td>
                    <td className="py-2.5">74</td>
                    <td className="py-2.5">48</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold text-white">XL</td>
                    <td className="py-2.5">113 - 118</td>
                    <td className="py-2.5">76</td>
                    <td className="py-2.5">50</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-between items-center text-xs">
              <Link
                href="/size-guide"
                onClick={() => setShowSizeModal(false)}
                className="text-zinc-400 hover:text-white underline font-display"
              >
                Open Full Size Guide Page &rarr;
              </Link>
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-4 py-2 bg-white text-black font-display font-semibold uppercase text-[11px] rounded-lg"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
