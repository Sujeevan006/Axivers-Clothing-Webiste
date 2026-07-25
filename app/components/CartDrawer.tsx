"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
  } = useCart();

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingFee = subtotal >= 10000 || subtotal === 0 ? 0 : 350;
  const total = subtotal + shippingFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in cursor-pointer"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-brand-light text-brand-dark shadow-2xl flex flex-col justify-between animate-slide-left border-l border-brand-dark/10">
          
          {/* Header */}
          <div className="px-6 py-6 border-b border-brand-dark/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm uppercase tracking-widest font-display font-semibold">Your Bag</span>
              <span className="text-xs bg-brand-dark text-brand-light font-mono px-1.5 py-0.5 font-bold">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-brand-dark hover:opacity-50 transition-opacity focus:outline-none p-1 cursor-pointer"
              aria-label="Close Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-12 h-12 border border-brand-dark/20 flex items-center justify-center mb-4 rounded-full">
                  <svg className="w-5 h-5 text-brand-dark/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-sm uppercase tracking-wider font-display font-semibold mb-1">Your bag is empty</h3>
                <p className="text-xs text-brand-dark/50 font-light max-w-[240px] leading-relaxed">
                  Discover our flagship cotton-modal essentials engineered for Sri Lankan luxury.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-3 bg-brand-dark text-brand-light text-xs font-display uppercase tracking-widest font-semibold hover:opacity-95 transition-opacity rounded-md"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex space-x-4 pb-6 border-b border-brand-dark/10">
                  <div className="w-20 h-24 bg-zinc-200 overflow-hidden relative flex-shrink-0 border border-brand-dark/10">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs uppercase tracking-wider font-semibold font-display pr-4 line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-[10px] text-brand-dark/40 hover:text-brand-dark transition-colors font-display"
                        >
                          REMOVE
                        </button>
                      </div>
                      <span className="text-[10px] text-brand-dark/50 block mt-0.5 uppercase font-display font-medium">
                        Size: {item.size}
                      </span>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-brand-dark/20 rounded-sm">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs hover:bg-brand-dark/10 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs hover:bg-brand-dark/10 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-mono font-semibold">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-brand-dark/10 bg-brand-light space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between font-light text-brand-dark/70">
                  <span>Subtotal</span>
                  <span className="font-mono">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-light text-brand-dark/70">
                  <span>Islandwide Shipping</span>
                  <span className="font-mono">{shippingFee === 0 ? 'FREE' : `LKR ${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-sm font-semibold uppercase tracking-wider font-display pt-1 border-t border-brand-dark/10">
                  <span>Total</span>
                  <span className="font-mono">LKR {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-brand-dark/5 p-3 text-[10px] leading-relaxed text-brand-dark/70 font-light border-l border-brand-dark/30">
                <p className="font-medium mb-1 uppercase tracking-wider font-display">Local Gateway Integration Ready</p>
                <p>Accepts Visa, Mastercard, Genie, Koko Split, & PayHere Online Payments.</p>
              </div>

              <button
                onClick={async () => {
                  try {
                    const res = await fetch('/api/checkout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ items: cartItems, total }),
                    });
                    const data = await res.json();
                    alert(data.message || 'Checkout session created!');
                  } catch {
                    alert('Proceeding to Checkout...');
                  }
                }}
                className="w-full py-4 bg-brand-dark text-brand-light text-xs font-display uppercase tracking-widest font-bold border border-brand-dark hover:bg-transparent hover:text-brand-dark transition-all duration-300 rounded-md cursor-pointer text-center"
              >
                Proceed to Checkout
              </button>

              <div className="flex items-center justify-center space-x-1 text-[9px] uppercase tracking-widest text-brand-dark/40 font-mono">
                <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
