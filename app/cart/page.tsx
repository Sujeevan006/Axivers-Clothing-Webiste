'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { StoreSettings } from '@/types/settings';
import {
  DEFAULT_STORE_SETTINGS,
  getStoreSettings,
  subscribeToStoreSettings,
  calculateDeliveryFee,
} from '@/services/settingsService';
import { formatCurrency, fromMinorUnits, toMinorUnits } from '@/lib/utils/formatters';

export default function CartPage() {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);

  useEffect(() => {
    getStoreSettings().then((settings) => {
      if (settings) setStoreSettings(settings);
    });

    const unsubscribe = subscribeToStoreSettings((settings) => {
      if (settings) setStoreSettings(settings);
    });

    return () => unsubscribe();
  }, []);

  const subtotalMinor = cartItems.reduce((acc, item) => {
    const itemPriceMinor = toMinorUnits(fromMinorUnits(item.price));
    return acc + itemPriceMinor * item.quantity;
  }, 0);

  const deliveryFeeMinor = calculateDeliveryFee(subtotalMinor, storeSettings);
  const totalMinor = subtotalMinor + deliveryFeeMinor;
  const freeThresholdMinor = toMinorUnits(storeSettings.freeDeliveryThreshold);
  const isFreeDelivery = deliveryFeeMinor === 0;
  const amountToFreeDelivery = Math.max(0, freeThresholdMinor - subtotalMinor);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="border-b border-zinc-800 pb-6 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              Shopping Experience
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white">
              Your Shopping Bag
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-display uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            &larr; Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-24 text-center bg-[#101013] border border-zinc-800/80 rounded-2xl p-8 space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto text-2xl text-zinc-500">
              🛍️
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-display font-bold uppercase text-white">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs text-zinc-400 font-light">
                Discover our signature 60/40 cotton-modal essentials and find your perfect fit.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors"
              >
                <span>Explore The Collection</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery progress meter */}
              <div className="bg-[#111114] border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-300 font-display">
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-semibold">🎉 You have unlocked Free Island-Wide Delivery!</span>
                    ) : (
                      <span>
                        Add <strong>{formatCurrency(amountToFreeDelivery, 'LKR', true)}</strong> more to qualify for Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    Threshold: {formatCurrency(freeThresholdMinor, 'LKR', true)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (subtotalMinor / freeThresholdMinor) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl divide-y divide-zinc-800/80 overflow-hidden shadow-xl">
                {cartItems.map((item) => {
                  const displayImg = item.image || (item.images && item.images[0]) || '/images/pdp_front.jpg';
                  const itemKey = `${item.id}-${item.selectedSize || item.size || 'M'}-${item.selectedColor || item.color || 'def'}`;
                  const itemPriceMinor = toMinorUnits(fromMinorUnits(item.price));

                  return (
                    <div key={itemKey} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-zinc-950 rounded-xl overflow-hidden relative shrink-0 border border-zinc-800">
                          <Image
                            src={displayImg}
                            alt={item.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-display block">
                            {item.categoryLabel || item.category || 'Garment'}
                          </span>
                          <h3 className="text-sm sm:text-base font-display font-semibold uppercase tracking-wider text-white">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-3 text-xs text-zinc-400 font-mono">
                            <span>Size: <strong className="text-white">{item.selectedSize || item.size || 'M'}</strong></span>
                            {item.selectedColor && (
                              <>
                                <span>•</span>
                                <span>Color: <strong className="text-white">{item.selectedColor}</strong></span>
                              </>
                            )}
                          </div>
                          <span className="text-sm font-mono font-bold text-white block pt-1">
                            {formatCurrency(itemPriceMinor, item.currency || 'LKR', true)}
                          </span>
                        </div>
                      </div>

                      {/* Right: Quantity Stepper & Removal */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 pt-2 sm:pt-0">
                        {/* Stepper */}
                        <div className="flex items-center border border-zinc-800 rounded-xl bg-zinc-900 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize || item.size || 'M', item.selectedColor || item.color || '', Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize || item.size || 'M', item.selectedColor || item.color || '', item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="font-mono font-bold text-sm text-white hidden md:inline-block w-24 text-right">
                          {formatCurrency(itemPriceMinor * item.quantity, item.currency || 'LKR', true)}
                        </span>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize || item.size || 'M', item.selectedColor || item.color || '')}
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Clear cart action */}
              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-xs text-zinc-500 hover:text-white uppercase tracking-wider font-display transition-colors"
                >
                  Clear Shopping Bag
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-6 shadow-2xl sticky top-28">
              <h2 className="text-base font-display font-bold uppercase tracking-wider text-white border-b border-zinc-800 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs font-light text-zinc-300">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-mono font-medium text-white">
                    {formatCurrency(subtotalMinor, 'LKR', true)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Island-Wide Delivery</span>
                  <span className="font-mono font-medium">
                    {isFreeDelivery ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      formatCurrency(deliveryFeeMinor, 'LKR', true)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-zinc-800/80 flex justify-between items-baseline text-sm">
                  <span className="font-display font-bold uppercase text-white">Total</span>
                  <span className="font-mono font-bold text-xl text-white">
                    {formatCurrency(totalMinor, 'LKR', true)}
                  </span>
                </div>
              </div>

              {/* Proceed to checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 rounded-xl bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all text-center block shadow-xl"
                >
                  Proceed to Checkout &rarr;
                </Link>

                <p className="text-[11px] text-zinc-500 text-center font-light leading-relaxed">
                  Cash on Delivery, Bank Transfer & Card options available during checkout.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
