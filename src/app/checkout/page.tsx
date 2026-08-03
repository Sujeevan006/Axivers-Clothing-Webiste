"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Colombo');
  const [postalCode, setPostalCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash_on_delivery' | 'payhere'>('cash_on_delivery');
  const [customerNotes, setCustomerNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 15.00;
  const total = subtotal + deliveryFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim() || !city.trim()) {
      setErrorMessage('Please complete all required shipping fields.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your shopping bag is empty.');
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
        setPlacedOrderNumber(result.orderNumber);
        clearCart();
        setOrderComplete(true);
        return;
      }

      setErrorMessage(result.error || 'Failed to complete order. Insufficient stock or server error.');
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setErrorMessage(err?.message || 'Failed to complete order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <main className="min-h-screen bg-[#09090b] text-[#ffffff] pt-32 pb-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 bg-white/10 border border-white/40 text-white rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-display uppercase tracking-wider font-bold text-white">
              Order Confirmed!
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Your order has been recorded directly in our Firestore database.
            </p>
          </div>

          <div className="bg-zinc-950 p-5 rounded-xl border border-white/30 font-mono space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-display block">
              Official Order Reference
            </span>
            <span className="text-xl font-bold text-white">
              {placedOrderNumber}
            </span>
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="block w-full py-4 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-[#ffffff] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <span className="text-[10px] font-display uppercase tracking-[0.25em] text-white font-semibold block">
            Axivers Storefront
          </span>
          <h1 className="text-3xl font-display uppercase font-bold tracking-tight text-white">
            Checkout
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center space-y-4">
            <p className="text-sm text-zinc-400 font-display">
              Your shopping bag is empty. Please add items before checking out.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-white text-black font-display text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Customer Details Form */}
            <div className="lg:col-span-7 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-display uppercase font-semibold text-white border-b border-zinc-800 pb-3">
                Shipping Information
              </h2>

              {errorMessage && (
                <div className="p-4 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-xl">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Kasun Perera"
                    className="w-full px-4 py-3 text-xs border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0771234567"
                      className="w-full px-4 py-3 text-xs border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="kasun@example.com"
                      className="w-full px-4 py-3 text-xs border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                    Shipping Address *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street address, house number"
                    className="w-full px-4 py-3 text-xs border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Colombo"
                      className="w-full px-4 py-3 text-xs border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="10100"
                      className="w-full px-4 py-3 text-xs border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Payment method selection */}
                <div className="pt-4 border-t border-zinc-800 space-y-2">
                  <label className="block text-[10px] uppercase font-display font-semibold text-zinc-400">
                    Payment Method *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('cash_on_delivery')}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'cash_on_delivery'
                          ? 'bg-zinc-800 border-white text-white font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-bold font-display uppercase">Cash on Delivery</span>
                      <span className="text-[10px] opacity-75 mt-1">Pay upon delivery</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('payhere')}
                      className={`p-4 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'payhere'
                          ? 'bg-zinc-800 border-white text-white font-bold'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-bold font-display uppercase">PayHere Gateway</span>
                      <span className="text-[10px] opacity-75 mt-1">Card / Online Payment</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary Side Column */}
            <div className="lg:col-span-5 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-display uppercase font-semibold text-white border-b border-zinc-800 pb-3">
                Order Summary
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex space-x-4 items-center border-b border-zinc-800/60 pb-3">
                    <div className="w-14 h-14 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0">
                      <Image
                        src={item.image || '/images/pdp_front.jpg'}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-display font-semibold uppercase text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                        Qty: {item.quantity} | Size: {item.selectedSize || item.size}
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-white">
                      LKR {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-zinc-800">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono text-zinc-200">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Fee</span>
                  <span className="font-mono text-white font-bold">LKR {deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold uppercase tracking-wider font-display pt-3 border-t border-zinc-800 text-white">
                  <span>Total Amount</span>
                  <span className="font-mono text-white text-base">LKR {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-all duration-300 shadow-lg cursor-pointer text-center"
              >
                {isSubmitting ? 'Processing Order...' : `Submit Order (LKR ${total.toLocaleString()})`}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
