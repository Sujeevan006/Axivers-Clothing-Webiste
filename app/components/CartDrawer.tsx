"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDialogFocus } from './useDialogFocus';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { StoreSettings } from '@/types/settings';
import { DEFAULT_STORE_SETTINGS, getStoreSettings, subscribeToStoreSettings, calculateDeliveryFee } from '@/services/settingsService';
import { formatCurrency, fromMinorUnits, toMinorUnits } from '@/lib/utils/formatters';
import type { PaymentMethod } from '@/types/order';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [storeSettings, setStoreSettings] = useState<StoreSettings>(DEFAULT_STORE_SETTINGS);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'details' | 'success'>('cart');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');
  const [placedOrderDetails, setPlacedOrderDetails] = useState<any>(null);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Colombo');
  const [postalCode, setPostalCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('cash_on_delivery');
  const [customerNotes, setCustomerNotes] = useState('');

  useEffect(() => {
    getStoreSettings().then((settings) => {
      if (settings) setStoreSettings(settings);
    });

    const unsubscribe = subscribeToStoreSettings((settings) => {
      if (settings) setStoreSettings(settings);
    });

    return () => unsubscribe();
  }, []);

  const panelRef = useDialogFocus(isCartOpen, () => { setIsCartOpen(false); setCheckoutStep('cart'); setErrorMessage(''); });

  if (!isCartOpen) return null;

  // Subtotal in minor units
  const subtotalMinor = cartItems.reduce((acc, item) => {
    const itemPriceMinor = toMinorUnits(fromMinorUnits(item.price));
    return acc + itemPriceMinor * item.quantity;
  }, 0);

  const deliveryFeeMinor = calculateDeliveryFee(subtotalMinor, storeSettings);
  const totalMinor = subtotalMinor + deliveryFeeMinor;
  const isFreeDelivery = deliveryFeeMinor === 0;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!storeSettings.ordersEnabled) {
      setErrorMessage('We are currently not accepting new orders due to maintenance.');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim() || !city.trim()) {
      setErrorMessage('Please complete all required fields (Name, Phone, Address, City).');
      return;
    }

    setIsSubmitting(true);
    try {
      const { processCheckout } = await import('@/app/actions/checkout');
      const result = await processCheckout({
        cartItems: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          image: item.image || (item.images && item.images[0]) || '',
          size: item.selectedSize || item.size || 'M',
          color: item.selectedColor || item.color || '',
          quantity: item.quantity,
          price: item.price,
        })),
        customerData: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          address: shippingAddress,
          city,
          postalCode,
        },
        paymentMethod: selectedPaymentMethod,
        customerNotes,
      });

      if (result.success && result.orderNumber) {
        const generatedNum = result.orderNumber;
        setPlacedOrderNumber(generatedNum);
        setPlacedOrderDetails({
          orderNumber: generatedNum,
          customer: { name: customerName, phone: customerPhone, address: shippingAddress, city },
          items: [...cartItems],
          subtotal: subtotalMinor,
          deliveryFee: deliveryFeeMinor,
          total: totalMinor,
          paymentMethod: selectedPaymentMethod,
        });
        clearCart();
        setCheckoutStep('success');
        return;
      }

      setErrorMessage(result.error || 'Failed to complete checkout. Out of stock or server error.');
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setCheckoutStep('cart');
      setErrorMessage('');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity animate-fade-in cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-6">
        <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Your shopping bag" tabIndex={-1} className="cart-panel w-screen max-w-md bg-surface text-ink border-l border-zinc-200 shadow-2xl flex flex-col justify-between animate-slide-left">
          
          {/* Drawer Header */}
          <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-surface">
            <div className="flex items-center space-x-2">
              <span className="text-sm normal-case tracking-wider font-display font-bold text-ink">
                {checkoutStep === 'cart' && 'Your Shopping Bag'}
                {checkoutStep === 'details' && 'Shipping & Payment'}
                {checkoutStep === 'success' && 'Order Confirmed'}
              </span>
              {checkoutStep === 'cart' && (
                <span className="text-sm bg-ink text-paper font-mono px-2 py-0.5 font-bold rounded-full">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              aria-label="Close shopping bag"
              className="text-zinc-500 hover:text-ink p-1.5 rounded-lg hover:bg-zinc-100 transition-colors focus:outline-none cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* STEP 1: Cart Items List */}
          {checkoutStep === 'cart' && (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                    <div className="w-14 h-14 border border-zinc-200 rounded-full flex items-center justify-center bg-zinc-50 text-zinc-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-sm normal-case tracking-wider font-display font-semibold text-zinc-800">Your bag is currently empty</h3>
                    <p className="text-sm text-zinc-500 max-w-[220px] font-normal leading-relaxed">
                      Discover our athletic luxury essentials designed in Sri Lanka.
                    </p>
                    <Link
                      href="/shop"
                      onClick={handleClose}
                      className="px-6 py-3 bg-ink text-paper text-sm font-display normal-case tracking-wider font-bold rounded-lg hover:bg-zinc-800 cursor-pointer shadow-sm"
                    >
                      Explore Collection
                    </Link>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const itemSize = item.selectedSize || item.size;
                    const itemColor = item.selectedColor || item.color || '';
                    const itemPriceMinor = toMinorUnits(fromMinorUnits(item.price));

                    return (
                      <div key={`${item.id}-${itemSize}-${itemColor}`} className="flex space-x-4 pb-4 border-b border-zinc-100">
                        <div className="w-20 h-20 bg-canvas overflow-hidden relative rounded-xl border border-zinc-200 flex-shrink-0">
                          <Image
                            src={item.image || (item.images && item.images[0]) || '/images/flagship-tee-black.jpg'}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm normal-case tracking-wider font-semibold font-display text-ink line-clamp-1 pr-2">
                                {item.name}
                              </h4>
                              <button
                                aria-label={`Remove ${item.name} from bag`}
                                onClick={() => removeItem(item.id, itemSize, itemColor)}
                                className="text-sm text-zinc-400 hover:text-rose-600 font-display cursor-pointer"
                              >
                                REMOVE
                              </button>
                            </div>
                            <div className="flex space-x-3 text-sm text-zinc-500 mt-1 font-mono">
                              <span>Size: <strong className="text-ink">{itemSize}</strong></span>
                              {itemColor && <span>Color: <strong className="text-ink">{itemColor}</strong></span>}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center border border-zinc-300 bg-zinc-50 rounded-md">
                              <button
                                aria-label={`Decrease quantity of ${item.name}`}
                                onClick={() => updateQuantity(item.id, itemSize, itemColor, item.quantity - 1)}
                                className="px-2 py-0.5 text-sm text-zinc-600 hover:text-ink cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 text-sm font-mono font-bold text-ink">{item.quantity}</span>
                              <button
                                aria-label={`Increase quantity of ${item.name}`}
                                onClick={() => updateQuantity(item.id, itemSize, itemColor, item.quantity + 1)}
                                className="px-2 py-0.5 text-sm text-zinc-600 hover:text-ink cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-sm font-mono font-bold text-ink">
                              {formatCurrency(itemPriceMinor * item.quantity, 'LKR', true)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-zinc-200 bg-surface space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-zinc-600">
                      <span>Subtotal</span>
                      <span className="font-mono text-ink">{formatCurrency(subtotalMinor, 'LKR', true)}</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                      <span>Delivery Fee</span>
                      <span className="font-mono text-ink font-bold">
                        {isFreeDelivery ? (
                          <span className="text-emerald-600 normal-case font-display font-bold">FREE</span>
                        ) : (
                          formatCurrency(deliveryFeeMinor, 'LKR', true)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold normal-case tracking-wider font-display pt-2 border-t border-zinc-200 text-ink">
                      <span>Total Amount</span>
                      <span className="font-mono text-ink">{formatCurrency(totalMinor, 'LKR', true)}</span>
                    </div>
                  </div>

                  {!storeSettings.ordersEnabled ? (
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-zinc-100 border border-zinc-200 text-sm text-zinc-600 text-center">
                        Launch Preview Mode: Online orders open with our inaugural release.
                      </div>
                      <Link
                        href="/#early-access"
                        onClick={() => setIsCartOpen(false)}
                        className="w-full py-3.5 bg-ink text-paper text-sm font-display normal-case tracking-widest font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-sm block text-center"
                      >
                        Join Launch Registry
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCheckoutStep('details')}
                      className="w-full py-3.5 bg-ink text-paper text-sm font-display normal-case tracking-widest font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer text-center"
                    >
                      Proceed to Checkout
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* STEP 2: Customer Shipping & Payment Form */}
          {checkoutStep === 'details' && (
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="p-6 space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label htmlFor="app-components-CartDrawer-tsx-field-1" className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                    Full Name *
                  </label>
                  <input id="app-components-CartDrawer-tsx-field-1"
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Kasun Perera"
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="app-components-CartDrawer-tsx-field-2" className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                      Phone Number *
                    </label>
                    <input id="app-components-CartDrawer-tsx-field-2"
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0771234567"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label htmlFor="app-components-CartDrawer-tsx-field-3" className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                      Email Address
                    </label>
                    <input id="app-components-CartDrawer-tsx-field-3"
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="kasun@example.com"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="app-components-CartDrawer-tsx-field-4" className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                    Shipping Address *
                  </label>
                  <textarea id="app-components-CartDrawer-tsx-field-4"
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street address, apartment or house number"
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="app-components-CartDrawer-tsx-field-5" className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                      City *
                    </label>
                    <input id="app-components-CartDrawer-tsx-field-5"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Colombo"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                  <div>
                    <label htmlFor="app-components-CartDrawer-tsx-field-6" className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                      Postal Code
                    </label>
                    <input id="app-components-CartDrawer-tsx-field-6"
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="10100"
                      className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 pt-1">
                  <label htmlFor="app-components-CartDrawer-tsx-field-7" className="block text-sm normal-case font-display font-semibold text-zinc-600">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('cash_on_delivery')}
                      className={`p-2.5 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'cash_on_delivery'
                          ? 'bg-ink border-ink text-paper font-bold'
                          : 'bg-surface border-zinc-300 text-zinc-700 hover:border-ink'
                      }`}
                    >
                      <span className="text-sm font-bold font-display normal-case">COD</span>
                      <span className="text-sm opacity-75 mt-0.5">Pay at door</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('bank_transfer')}
                      className={`p-2.5 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'bank_transfer'
                          ? 'bg-ink border-ink text-paper font-bold'
                          : 'bg-surface border-zinc-300 text-zinc-700 hover:border-ink'
                      }`}
                    >
                      <span className="text-sm font-bold font-display normal-case">Bank Transfer</span>
                      <span className="text-sm opacity-75 mt-0.5">Slip upload</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('payhere')}
                      className={`p-2.5 rounded-lg border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'payhere'
                          ? 'bg-ink border-ink text-paper font-bold'
                          : 'bg-surface border-zinc-300 text-zinc-700 hover:border-ink'
                      }`}
                    >
                      <span className="text-sm font-bold font-display normal-case">Card</span>
                      <span className="text-sm opacity-75 mt-0.5">Online card</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm normal-case font-display font-semibold mb-1 text-zinc-600">
                    Order Notes (Optional)
                  </label>
                  <input id="app-components-CartDrawer-tsx-field-7"
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Delivery instructions, gate code, etc."
                    className="w-full px-3 py-2 text-sm border border-zinc-300 rounded-lg bg-canvas text-ink focus:outline-none focus:border-ink"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-zinc-200 bg-surface space-y-3">
                <div className="flex justify-between text-sm font-bold normal-case tracking-wider font-display">
                  <span className="text-zinc-600">Total Payable</span>
                  <span className="font-mono text-ink text-sm font-bold">{formatCurrency(totalMinor, 'LKR', true)}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !storeSettings.ordersEnabled}
                  className="w-full py-3.5 bg-ink text-paper text-sm font-display normal-case tracking-widest font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4 text-paper" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Processing Order...</span>
                    </span>
                  ) : (
                    <span>Submit Order ({formatCurrency(totalMinor, 'LKR', true)})</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-sm normal-case tracking-wider font-display text-zinc-500 hover:text-ink py-1 text-center cursor-pointer"
                >
                  &larr; Back to Bag
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Order Confirmation Screen */}
          {checkoutStep === 'success' && (
            <div className="flex-1 p-6 flex flex-col justify-between items-center text-center overflow-y-auto">
              <div className="my-auto space-y-5 max-w-sm">
                <div className="w-16 h-16 bg-emerald-50 border border-emerald-300 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display normal-case tracking-wider font-bold text-ink">
                    Order Confirmed!
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Thank you for ordering with Axivers. Your order has been placed in our unified system.
                  </p>
                </div>

                {/* Generated Order Number Highlight */}
                <div className="bg-canvas p-4 rounded-xl border border-zinc-200 text-center space-y-1">
                  <span className="text-sm normal-case tracking-widest text-zinc-500 font-display block">
                    Order Number
                  </span>
                  <span className="font-mono text-lg font-bold text-ink tracking-wider">
                    {placedOrderNumber}
                  </span>
                </div>

                <div className="text-left bg-zinc-50 p-4 rounded-xl border border-zinc-200 text-sm space-y-2">
                  <p className="font-semibold text-zinc-700 normal-case tracking-wider font-display">Order Summary:</p>
                  <p className="text-zinc-600">Customer: <strong className="text-ink">{placedOrderDetails?.customer?.name}</strong></p>
                  <p className="text-zinc-600">Payment: <strong className="text-ink normal-case">{placedOrderDetails?.paymentMethod}</strong></p>
                  <p className="text-zinc-600 font-mono">Total: <strong className="text-ink">{formatCurrency(placedOrderDetails?.total || 0, 'LKR', true)}</strong></p>
                </div>

                <div className="pt-2 space-y-2">
                  <Link
                    href={`/track-order?orderNumber=${placedOrderNumber}&phone=${encodeURIComponent(customerPhone)}`}
                    onClick={handleClose}
                    className="block w-full py-3 bg-ink text-paper text-sm font-display normal-case tracking-widest font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-sm"
                  >
                    Track Order Status &rarr;
                  </Link>

                  <button
                    onClick={handleClose}
                    className="w-full py-2.5 text-sm text-zinc-600 hover:text-ink normal-case tracking-wider font-display font-semibold cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
