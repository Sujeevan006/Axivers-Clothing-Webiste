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
import { useDialogFocus } from './useDialogFocus';

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
  const zoomRef = useDialogFocus(isZoomed, () => setIsZoomed(false));
  const sizeRef = useDialogFocus(showSizeModal, () => setShowSizeModal(false));
  const waitlistRef = useDialogFocus(showWaitlistModal, () => setShowWaitlistModal(false));

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
    <div className="product-page bg-canvas text-ink min-h-screen pt-10 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 text-sm normal-case tracking-wider text-zinc-500 font-display">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-ink transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-ink font-semibold truncate max-w-[240px]">{product.name}</span>
        </div>

        {/* Product Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Image Gallery on Light Background */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Stage Image */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              role="button"
              tabIndex={0}
              aria-label="Expand product image"
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setIsZoomed(true);
                }
              }}
              className="relative aspect-square bg-canvas border border-zinc-200/80 rounded-xl overflow-hidden cursor-zoom-in group flex items-center justify-center"
            >
              <Image
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} - View ${activeImageIndex + 1}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isOutOfStock && !isPrelaunch ? 'opacity-60 grayscale' : ''
                }`}
              />

              {/* Discreet Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                <span className="bg-surface/95 text-ink text-sm normal-case tracking-[0.18em] font-mono px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
                  The Signature Essential
                </span>
                <span className="bg-canvas text-accent text-sm normal-case tracking-wider font-mono font-medium px-3 py-1 rounded-full border border-accent/30">
                  180 GSM Mercerized
                </span>
              </div>

              {/* Stock / Launch Status */}
              <div className="absolute top-4 right-4 z-10">
                {isPrelaunch ? (
                  <span className="bg-ink text-paper text-sm normal-case tracking-wider font-mono font-bold px-3 py-1 rounded-full shadow-sm">
                    Inaugural Release
                  </span>
                ) : isOutOfStock ? (
                  <span className="bg-zinc-100 text-zinc-600 text-sm normal-case tracking-wider font-display font-bold px-3 py-1 rounded-full border border-zinc-200">
                    Sold Out
                  </span>
                ) : (
                  <span className="bg-ink text-paper text-sm normal-case font-display font-medium px-3 py-1 rounded-full border border-ink">
                    In Stock
                  </span>
                )}
              </div>

              {/* Zoom hint */}
              <span className="absolute bottom-4 right-4 text-sm normal-case tracking-wider text-zinc-600 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full border border-zinc-200 hidden sm:inline-flex items-center space-x-1.5 z-10">
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
                    aria-label={`View product image ${idx + 1}`}
                    aria-pressed={activeImageIndex === idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square bg-canvas border rounded-xl overflow-hidden relative transition-all duration-200 cursor-pointer p-2 ${
                      activeImageIndex === idx
                        ? 'border-ink ring-1 ring-ink opacity-100'
                        : 'border-zinc-200 opacity-60 hover:opacity-100 hover:border-zinc-400'
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
          <div className="product-purchase-panel lg:col-span-6 space-y-6 sm:space-y-7">
            {/* Header info */}
            <div className="space-y-2 border-b border-zinc-200 pb-5">
              <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-medium block">
                Crafted in Sri Lanka • Athletic Luxury
              </span>

              <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-ink normal-case leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-sm sm:text-sm font-normal text-zinc-500">
                  {product.tagline}
                </p>
              )}

              {/* Price Row */}
              <div className="flex items-baseline space-x-3 pt-2">
                <span className="text-[29px] leading-[1.5] font-sans font-bold text-ink">
                  {formatCurrency(product.price, product.currency || 'LKR', true)}
                </span>
                <span className="text-sm normal-case tracking-wider text-zinc-600 font-mono px-2 py-0.5 rounded bg-zinc-100 border border-zinc-200">
                  Islandwide Delivery
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-display">
                  <span className="normal-case tracking-wider font-semibold text-zinc-700">
                    Color: <span className="text-ink font-bold">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-4 py-2 rounded-lg text-sm font-display font-medium border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'bg-ink text-paper border-ink font-bold shadow-sm'
                          : 'bg-surface text-zinc-700 border-zinc-300 hover:border-ink'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection & Size Guide */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-display">
                <span className="normal-case tracking-wider font-semibold text-zinc-700">
                  Select Size: <span className="text-ink font-bold font-mono">{selectedSize}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowSizeModal(true)}
                  className="text-zinc-500 hover:text-ink underline text-sm normal-case tracking-wider transition-colors cursor-pointer"
                >
                  Size Guide &rarr;
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`py-3 rounded-lg text-sm font-mono font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-ink text-paper border-ink shadow-sm font-bold'
                        : 'bg-surface text-zinc-700 border-zinc-300 hover:border-ink'
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
                  <div className="flex items-center border border-zinc-300 rounded-lg bg-zinc-50 p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-ink disabled:opacity-30 cursor-pointer rounded hover:bg-zinc-200"
                      aria-label="Decrease quantity"
                    >
                      &minus;
                    </button>
                    <span className="w-10 text-center font-mono font-bold text-sm text-ink">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={isOutOfStock}
                      className="w-9 h-9 flex items-center justify-center text-zinc-600 hover:text-ink disabled:opacity-30 cursor-pointer rounded hover:bg-zinc-200"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                )}

                {/* Primary CTA (Prominent Black Add to Bag Button with White Text) */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || (isOutOfStock && !isPrelaunch)}
                  className={`flex-1 py-4 px-6 rounded-lg font-display text-sm normal-case tracking-[0.18em] font-bold transition-all duration-300 shadow-md flex items-center justify-center space-x-2 cursor-pointer ${
                    isPrelaunch
                      ? 'bg-ink text-paper hover:bg-zinc-800'
                      : isOutOfStock
                      ? 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
                      : addedSuccess
                      ? 'bg-emerald-600 text-paper'
                      : 'bg-ink text-paper hover:bg-zinc-850'
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
                      : 'Add to Bag'}
                  </span>
                  <span className="text-sm">&rarr;</span>
                </button>
              </div>

              <p className="text-sm text-zinc-500 font-normal text-center pt-1">
                Islandwide Sri Lanka delivery • Cash on Delivery &amp; Bank Transfer available
              </p>
            </div>

            {/* Expandable Accordions with Clean Light Styling */}
            <div className="border-t border-zinc-200 pt-5 space-y-2">
              {/* Accordion 1: Fabric */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-surface">
                <button
                  aria-expanded={openAccordion === 'fabric'}
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full p-4 flex justify-between items-center text-sm normal-case tracking-wider font-display font-semibold text-ink hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <span>Fabric &amp; Material Specification</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'fabric' ? 'rotate-180 text-ink' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'fabric' && (
                  <div className="p-4 pt-0 text-sm font-normal text-zinc-600 space-y-2 border-t border-zinc-200 mt-1 bg-surface">
                    <p><strong>Composition:</strong> 180 GSM, 100% mercerized cotton, single jersey knit.</p>
                    <p><strong>Hand Feel:</strong> Exceptionally smooth surface, fluid drape, and natural breathability.</p>
                    <p><strong>Origin:</strong> Milled and assembled in Colombo, Sri Lanka.</p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Construction */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-surface">
                <button
                  aria-expanded={openAccordion === 'fit'}
                  onClick={() => toggleAccordion('fit')}
                  className="w-full p-4 flex justify-between items-center text-sm normal-case tracking-wider font-display font-semibold text-ink hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <span>Fit &amp; Construction Detailing</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'fit' ? 'rotate-180 text-ink' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'fit' && (
                  <div className="p-4 pt-0 text-sm font-normal text-zinc-600 space-y-2 border-t border-zinc-200 mt-1 bg-surface">
                    <p><strong>Collar:</strong> Contrasting premium gray rib-knit crewneck with 3–5% spandex recovery.</p>
                    <p><strong>Sleeve Cuffs:</strong> Black yarn-dyed tipped ribbing with one crisp white stripe strictly at the outer edge.</p>
                    <p><strong>Branding:</strong> Small centered reflective metallic-gold screen print. Tagless heat-transfer neck label.</p>
                    <p><strong>Back:</strong> Completely plain solid black back.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Care */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-surface">
                <button
                  aria-expanded={openAccordion === 'care'}
                  onClick={() => toggleAccordion('care')}
                  className="w-full p-4 flex justify-between items-center text-sm normal-case tracking-wider font-display font-semibold text-ink hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <span>Garment Care Guide</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180 text-ink' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'care' && (
                  <div className="p-4 pt-0 text-sm font-normal text-zinc-600 space-y-2 border-t border-zinc-200 mt-1 bg-surface">
                    <p>Machine wash cold gentle cycle inside out with similar colors. Gently reshape collar while damp. Lay flat to dry in shade. Cool iron avoiding chest print. Do not bleach.</p>
                  </div>
                )}
              </div>

              {/* Accordion 4: Shipping */}
              <div className="border border-zinc-200 rounded-xl overflow-hidden bg-surface">
                <button
                  aria-expanded={openAccordion === 'shipping'}
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full p-4 flex justify-between items-center text-sm normal-case tracking-wider font-display font-semibold text-ink hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  <span>Island-Wide Delivery &amp; Exchanges</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180 text-ink' : 'text-zinc-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-4 pt-0 text-sm font-normal text-zinc-600 space-y-2 border-t border-zinc-200 mt-1 bg-surface">
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
          ref={zoomRef} role="dialog" aria-modal="true" aria-label="Expanded product image" tabIndex={-1}
          className="fixed inset-0 z-50 bg-ink/90 flex items-center justify-center p-4 cursor-zoom-out"
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
            className="absolute top-6 right-6 p-2 rounded-full bg-surface text-ink font-bold"
            aria-label="Close zoom"
          >
            ✕
          </button>
        </div>
      )}

      {/* Early Access / Waitlist Modal */}
      {showWaitlistModal && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div ref={waitlistRef} role="dialog" aria-modal="true" aria-label="Early access" tabIndex={-1} className="relative w-full max-w-md bg-surface border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
              <div>
                <span className="text-sm normal-case font-mono tracking-wider text-accent block">
                  Inaugural Launch Registry
                </span>
                <h3 className="text-base font-display font-bold normal-case text-ink">
                  Early Access for Size {selectedSize}
                </h3>
              </div>
              <button
                onClick={() => setShowWaitlistModal(false)}
                aria-label="Close early access"
                className="p-1.5 text-zinc-500 hover:text-ink"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-zinc-600 font-normal leading-relaxed">
              Register your email below to receive private release notification as soon as inventory for size {selectedSize} opens for ordering.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <input
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-canvas border border-zinc-300 text-sm px-4 py-3 text-ink placeholder-zinc-500 rounded-lg focus:outline-none focus:border-ink tracking-wide"
              />
              <button
                type="submit"
                className="w-full py-3 bg-ink text-paper font-display font-bold normal-case text-sm tracking-wider rounded-lg hover:bg-zinc-800 transition-colors"
              >
                {waitlistSubmitted ? 'REGISTERED' : 'CONFIRM EARLY ACCESS'}
              </button>
            </form>

            {waitlistSubmitted && (
              <p className="text-sm text-emerald-600 text-center font-display">
                Thank you. You have been added to the priority notification list!
              </p>
            )}
          </div>
        </div>
      )}

      {/* Sizing Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div ref={sizeRef} role="dialog" aria-modal="true" aria-label="Size guide" tabIndex={-1} className="relative w-full max-w-lg bg-surface border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-zinc-200 pb-4">
              <div>
                <span className="text-sm normal-case tracking-[0.2em] text-accent font-mono block">
                  Axivers Sizing Specification
                </span>
                <h3 className="text-lg font-display font-bold normal-case text-ink">
                  Size Guide &amp; Fit Profiles
                </h3>
              </div>
              <button
                onClick={() => setShowSizeModal(false)}
                aria-label="Close size guide"
                className="p-1.5 text-zinc-500 hover:text-ink"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-zinc-600 font-normal leading-relaxed">
              Sizes confirmed: <strong>S, M, L, XL</strong>. Measure around the fullest part of your chest with a soft tape to choose your size.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-mono">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-500">
                    <th className="py-2.5">Size</th>
                    <th className="py-2.5">Fit Description</th>
                    <th className="py-2.5">Chest Recommendation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 text-zinc-700">
                  <tr>
                    <td className="py-3 font-bold text-ink">S</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">36 – 38 in / 91 – 96 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-ink">M</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">39 – 41 in / 99 – 104 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-ink">L</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">42 – 44 in / 106 – 111 cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-ink">XL</td>
                    <td className="py-3">Athletic Tailored</td>
                    <td className="py-3">45 – 47 in / 114 – 119 cm</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="pt-2 flex justify-between items-center text-sm">
              <Link
                href="/size-guide"
                onClick={() => setShowSizeModal(false)}
                className="text-zinc-600 hover:text-ink underline font-display"
              >
                Open Full Size Guide &rarr;
              </Link>
              <button
                onClick={() => setShowSizeModal(false)}
                className="px-5 py-2.5 bg-ink text-paper font-display font-semibold normal-case text-sm rounded-lg hover:bg-zinc-800"
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
