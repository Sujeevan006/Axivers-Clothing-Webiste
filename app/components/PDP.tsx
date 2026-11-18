'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '@/lib/utils/formatters';
import { getProducts } from '@/services/productService';
import { getStoreSettings } from '@/services/settingsService';
import { StoreSettings } from '@/types/settings';
import { DEFAULT_STORE_SETTINGS } from '@/services/settingsService';

interface PDPProps {
  product: Product;
}

export const PDP: React.FC<PDPProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [selectedColor, setSelectedColor] = useState<string>('Onyx Black');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState<boolean>(false);
  const [waitlistEmail, setWaitlistEmail] = useState<string>('');
  const [waitlistSubmitted, setWaitlistSubmitted] = useState<boolean>(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('fabric');
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    setActiveImageIndex(0);
    setQuantity(1);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }

    getStoreSettings().then((s) => {
      if (s) setStoreSettings(s);
    });

    getProducts({ activeOnly: true }).then((all) => {
      if (all) {
        const related = all.filter((p) => p.id !== product.id);
        setRelatedProducts(related.slice(0, 3));
      }
    });
  }, [product]);

  const sizes = product.sizes && product.sizes.length > 0 ? product.sizes : ['S', 'M', 'L', 'XL'];
  const colors = product.colors && product.colors.length > 0 ? product.colors : ['Onyx Black'];
  const images = product.images && product.images.length > 0 ? product.images : ['/images/flagship-tee-black.jpg'];
  const isOutOfStock = product.stock !== undefined && product.stock <= 0;
  const isPrelaunch = !storeSettings.ordersEnabled;

  const handleAddToCart = () => {
    if (isPrelaunch) {
      setShowWaitlistModal(true);
      return;
    }

    if (isOutOfStock) return;
    setIsAdding(true);
    setTimeout(() => {
      addToCart(product, selectedSize, selectedColor, quantity);
      setIsAdding(false);
      setAddedSuccess(true);
      setTimeout(() => {
        setAddedSuccess(false);
        setIsCartOpen(true);
      }, 500);
    }, 300);
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistEmail.includes('@')) return;
    setWaitlistSubmitted(true);
    setTimeout(() => {
      setShowWaitlistModal(false);
      setWaitlistSubmitted(false);
      setWaitlistEmail('');
    }, 2000);
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="bg-[#060606] text-[#ffffff] min-h-screen pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-widest text-zinc-400 font-display">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-white font-semibold truncate max-w-[240px]">{product.name}</span>
        </div>

        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-square sm:aspect-[4/3] bg-[#0a0a0d] border border-zinc-800/80 rounded-3xl overflow-hidden cursor-zoom-in shadow-2xl group flex items-center justify-center"
            >
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isOutOfStock && !isPrelaunch ? 'opacity-60 grayscale' : ''
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-30 pointer-events-none" />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-black/80 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-[0.2em] font-mono px-3 py-1 rounded-full border border-white/10 shadow-sm">
                  The Signature Essential
                </span>
                <span className="bg-[#c5a059]/20 backdrop-blur-md text-[#c5a059] text-[9px] uppercase tracking-wider font-mono font-medium px-3 py-1 rounded-full border border-[#c5a059]/30">
                  180 GSM Mercerized
                </span>
              </div>

              {/* Stock / Launch Status */}
              <div className="absolute top-4 right-4 z-10">
                {isPrelaunch ? (
                  <span className="bg-[#121215] text-[#c5a059] text-[9px] uppercase tracking-wider font-mono font-bold px-3 py-1 rounded-full border border-[#c5a059]/40 shadow-md">
                    Inaugural Release
                  </span>
                ) : isOutOfStock ? (
                  <span className="bg-zinc-900/90 text-zinc-400 text-[9px] uppercase tracking-wider font-display font-bold px-3 py-1 rounded-full border border-zinc-700 shadow-md">
                    Sold Out
                  </span>
                ) : (
                  <span className="bg-black/70 backdrop-blur-md text-zinc-300 text-[9px] uppercase tracking-wider font-display px-3 py-1 rounded-full border border-zinc-800">
                    Available
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <span className="absolute bottom-4 right-4 text-[9px] uppercase tracking-wider text-zinc-400 bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full border border-zinc-800 hidden sm:inline-flex items-center space-x-1.5 z-10">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                <span>Click to Expand</span>
              </span>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square bg-[#0a0a0d] border rounded-2xl overflow-hidden relative transition-all duration-300 cursor-pointer p-2 ${
                      activeImageIndex === idx
                        ? 'border-white ring-2 ring-white/30 opacity-100 scale-95'
                        : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="15vw"
                      className="object-contain p-1"
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
              <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>Made in Sri Lanka &bull; Master Blueprint</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase leading-tight">
                {product.name}
              </h1>
              {product.tagline && (
                <p className="text-xs sm:text-sm font-light text-zinc-400">
                  {product.tagline}
                </p>
              )}

              {/* Honest Price Row (No artificial discounts) */}
              <div className="flex items-baseline space-x-3 pt-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                  {formatCurrency(product.price, product.currency || 'LKR', true)}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-mono font-medium px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Island-Wide Delivery
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
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
                  Size Guide &rarr;
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

            {/* Quantity Selector & Action Button */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {!isPrelaunch && (
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
                )}

                {/* Primary CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || (isOutOfStock && !isPrelaunch)}
                  className={`flex-1 py-4 px-6 rounded-full font-display text-xs uppercase tracking-widest font-bold border transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 cursor-pointer ${
                    isPrelaunch
                      ? 'bg-white text-black border-white hover:bg-zinc-200'
                      : isOutOfStock
                      ? 'bg-zinc-900 text-zinc-600 border-zinc-800 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-500 text-black border-emerald-500'
                      : 'bg-white text-black border-white hover:bg-zinc-200'
                  }`}
                >
                  <span>
                    {isPrelaunch
                      ? 'GET EARLY ACCESS FOR THIS SIZE'
                      : isOutOfStock
                      ? 'Sold Out'
                      : isAdding
                      ? 'Adding to Bag...'
                      : addedSuccess
                      ? 'Added to Shopping Bag'
                      : 'Add to Cart'}
                  </span>
                  <span className="text-sm">&rarr;</span>
                </button>
              </div>
            </div>

            {/* Accordions */}
            <div className="border-t border-zinc-800/80 pt-6 space-y-3">
              {/* Accordion 1: Fabric */}
              <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-[#0c0c0f]">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Fabric &amp; Material Specification</span>
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
                    <p><strong>Composition:</strong> 180 GSM, 100% mercerized cotton, single jersey knit.</p>
                    <p><strong>Hand Feel:</strong> Exceptionally smooth surface, fluid drape, and natural breathability.</p>
                    <p><strong>Origin:</strong> Milled and assembled in Colombo, Sri Lanka.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Construction */}
              <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-[#0c0c0f]">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Fit &amp; Construction Detailing</span>
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
                    <p><strong>Collar:</strong> Contrasting premium gray rib-knit crewneck with 3–5% spandex recovery.</p>
                    <p><strong>Sleeve Cuffs:</strong> Black yarn-dyed tipped ribbing with one crisp white stripe strictly at the outer edge (no inserted piping).</p>
                    <p><strong>Branding:</strong> Small centered reflective metallic-gold screen print. Tagless heat-transfer neck label.</p>
                    <p><strong>Back:</strong> Completely plain solid black back.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care */}
              <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-[#0c0c0f]">
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
                    <p>Machine wash cold gentle cycle inside out with similar colors. Gently reshape collar while damp. Lay flat to dry in shade. Cool iron avoiding chest print. Do not bleach.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping */}
              <div className="border border-zinc-800/80 rounded-2xl overflow-hidden bg-[#0c0c0f]">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex justify-between items-center text-xs uppercase tracking-wider font-display font-semibold text-white hover:bg-zinc-900/50 transition-colors cursor-pointer"
                >
                  <span>Island-Wide Delivery &amp; Exchanges</span>
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
                    <p><strong>Colombo Delivery:</strong> 1–2 business days. Outstation: 2–4 business days.</p>
                    <p><strong>Payment Options:</strong> Cash on Delivery (COD), Bank Transfer, Visa / Mastercard.</p>
                    <p><strong>Rates:</strong> Flat rate LKR 350.00. Free delivery on orders over LKR 10,000.00.</p>
                    <p><strong>Exchanges:</strong> 7-day exchange window for unworn garments with tags intact.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
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

      {/* Early Access / Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-md bg-[#0e0e12] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a059] block">
                  Inaugural Launch Registry
                </span>
                <h3 className="text-base font-display font-bold uppercase text-white">
                  Early Access for Size {selectedSize}
                </h3>
              </div>
              <button
                onClick={() => setShowWaitlistModal(false)}
                className="p-1.5 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-zinc-300 font-light leading-relaxed">
              Register your email below to receive private release notification as soon as inventory for size {selectedSize} opens for ordering.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-[#141418] border border-zinc-800 text-xs px-4 py-3 text-white placeholder-zinc-500 rounded-xl focus:outline-none focus:border-zinc-500 tracking-wide"
              />
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-display font-bold uppercase text-xs tracking-wider rounded-xl hover:bg-zinc-200 transition-colors"
              >
                {waitlistSubmitted ? 'REGISTERED' : 'CONFIRM EARLY ACCESS'}
              </button>
            </form>

            {waitlistSubmitted && (
              <p className="text-xs text-emerald-400 text-center font-display">
                Thank you. You have been added to the priority notification list!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sizing Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative w-full max-w-lg bg-[#0e0e12] border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5a059] font-mono block">
                  Axivers Sizing Specification
                </span>
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  Size Guide &amp; Fit Profiles
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

            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Sizes confirmed: <strong>S, M, L, XL</strong>. Final garment measurements are subject to production spec sheet verification. Measure around the fullest part of your chest with a soft tape to choose your size.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400">
                    <th className="py-2.5">Size</th>
                    <th className="py-2.5">Fit Description</th>
                    <th className="py-2.5">Chest Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                  <tr>
                    <td className="py-3 font-bold text-white">S</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">36 – 38 in / 91 – 96 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">M</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">39 – 41 in / 99 – 104 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">L</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">42 – 44 in / 106 – 111 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">XL</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">45 – 47 in / 114 – 119 cm</td>
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
                Open Full Size Guide &rarr;
              </Link>
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-5 py-2.5 bg-white text-black font-display font-semibold uppercase text-[11px] rounded-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
