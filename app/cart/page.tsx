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
  const freeThresholdMinor = storeSettings.freeShippingThreshold || 1000000;
  const isFreeDelivery = deliveryFeeMinor === 0;
  const amountToFreeDelivery = Math.max(0, freeThresholdMinor - subtotalMinor);

  return (
    <div className="min-h-screen bg-white text-[#060606] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-zinc-200 pb-5 flex items-end justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-display font-semibold block">
              Shopping Experience
            </span>
            <h1 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#060606]">
              Your Shopping Bag
            </h1>
          </div>
          <Link
            href="/shop"
            className="text-xs font-display uppercase tracking-wider text-zinc-500 hover:text-black transition-colors"
          >
            &larr; Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-20 text-center bg-[#fafafa] border border-zinc-200 rounded-2xl p-8 space-y-5 max-w-lg mx-auto shadow-sm">
            <div className="w-14 h-14 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-xl text-zinc-500">
              🛍️
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-display font-bold uppercase text-[#060606]">
                Your Shopping Bag is Empty
              </h2>
              <p className="text-xs text-zinc-500 font-light">
                Discover our signature 180 GSM mercerized cotton essentials and find your perfect fit.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-[#060606] text-white font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-800 transition-colors shadow-sm"
              >
                <span>Explore The Collection</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free delivery progress meter */}
              <div className="bg-[#fafafa] border border-zinc-200 rounded-xl p-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-700 font-display">
                    {isFreeDelivery ? (
                      <span className="text-emerald-700 font-semibold">🎉 You qualify for Free Island-Wide Delivery!</span>
                    ) : (
                      <span>
                        Add <strong>{formatCurrency(amountToFreeDelivery, 'LKR', true)}</strong> more to qualify for Free Delivery
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">
                    Free Threshold: {formatCurrency(freeThresholdMinor, 'LKR', true)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#060606] transition-all duration-500"
                    style={{
                      width: `${Math.min(100, (subtotalMinor / freeThresholdMinor) * 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white border border-zinc-200 rounded-xl divide-y divide-zinc-100 overflow-hidden shadow-sm">
                {cartItems.map((item) => {
                  const displayImg = item.image || (item.images && item.images[0]) || '/images/flagship-tee-black.jpg';
                  const itemKey = `${item.id}-${item.selectedSize || item.size || 'M'}-${item.selectedColor || item.color || 'def'}`;
                  const itemPriceMinor = toMinorUnits(fromMinorUnits(item.price));

                  return (
                    <div key={itemKey} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Left: Thumbnail & Details */}
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-[#f6f6f6] rounded-xl overflow-hidden relative shrink-0 border border-zinc-200">
                          <Image
                            src={displayImg}
                            alt={item.name}
                            fill
                            className="object-cover object-center"
                          />
                        </div>

                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-display block">
                            Signature Essential
                          </span>
                          <h3 className="text-sm font-display font-semibold uppercase tracking-wider text-[#060606]">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-2 text-xs text-zinc-500 font-mono">
                            <span>Size: <strong className="text-black">{item.selectedSize || item.size || 'M'}</strong></span>
                            {item.selectedColor && (
                              <>
                                <span>•</span>
                                <span>Color: <strong className="text-black">{item.selectedColor}</strong></span>
                              </>
                            )}
                          </div>
                          <span className="text-sm font-mono font-bold text-[#060606] block pt-0.5">
                            {formatCurrency(itemPriceMinor, 'LKR', true)}
                          </span>
                        </div>
                      </div>

                      {/* Right: Quantity Stepper & Removal */}
                      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 pt-2 sm:pt-0">
                        {/* Stepper */}
                        <div className="flex items-center border border-zinc-300 rounded-lg bg-zinc-50 p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize || item.size || 'M', item.selectedColor || item.color || '', Math.max(1, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-black rounded hover:bg-zinc-200 cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-bold text-[#060606]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.selectedSize || item.size || 'M', item.selectedColor || item.color || '', item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:text-black rounded hover:bg-zinc-200 cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Line total */}
                        <span className="font-mono font-bold text-sm text-[#060606] hidden md:inline-block w-24 text-right">
                          {formatCurrency(itemPriceMinor * item.quantity, 'LKR', true)}
                        </span>

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id, item.selectedSize || item.size || 'M', item.selectedColor || item.color || '')}
                          className="p-2 text-zinc-400 hover:text-rose-600 transition-colors cursor-pointer"
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
                  className="text-xs text-zinc-500 hover:text-black uppercase tracking-wider font-display transition-colors"
                >
                  Clear Shopping Bag
                </button>
              </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4 bg-[#fafafa] border border-zinc-200 rounded-xl p-6 space-y-5 shadow-sm sticky top-28">
              <h2 className="text-base font-display font-bold uppercase tracking-wider text-[#060606] border-b border-zinc-200 pb-3">
                Order Summary
              </h2>

              <div className="space-y-3 text-xs font-light text-zinc-700">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="font-mono font-medium text-[#060606]">
                    {formatCurrency(subtotalMinor, 'LKR', true)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Island-Wide Delivery</span>
                  <span className="font-mono font-medium">
                    {isFreeDelivery ? (
                      <span className="text-emerald-700 font-semibold">FREE</span>
                    ) : (
                      formatCurrency(deliveryFeeMinor, 'LKR', true)
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-zinc-200 flex justify-between items-baseline text-sm">
                  <span className="font-display font-bold uppercase text-[#060606]">Total</span>
                  <span className="font-mono font-bold text-xl text-[#060606]">
                    {formatCurrency(totalMinor, 'LKR', true)}
                  </span>
                </div>
              </div>

              {/* Proceed to checkout CTA with Launch Mode Guard */}
              <div className="space-y-3 pt-2">
                {storeSettings.ordersEnabled ? (
                  <>
                    <Link
                      href="/checkout"
                      className="w-full py-3.5 rounded-lg bg-[#060606] text-white font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors text-center block shadow-sm"
                    >
                      Proceed to Checkout &rarr;
                    </Link>
                    <p className="text-[11px] text-zinc-500 text-center font-light leading-relaxed">
                      Cash on Delivery, Bank Transfer &amp; Card options available during checkout.
                    </p>
                  </>
                ) : (
                  <>
                    <Link
                      href="/#early-access"
                      className="w-full py-3.5 rounded-lg bg-[#060606] text-white font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors text-center block shadow-sm"
                    >
                      Join Launch Registry &rarr;
                    </Link>
                    <p className="text-[11px] text-zinc-500 text-center font-light leading-relaxed">
                      Axivers is currently in launch preview mode. Register for early access notification.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}