"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart();

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'cash_on_delivery' | 'payhere'>('cash_on_delivery');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = 15.00;
  const total = subtotal + deliveryFee;

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

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
          subtotal,
          deliveryFee,
          total,
          paymentMethod: selectedPaymentMethod,
        });
        clearCart();
        setCheckoutStep('success');
        return;
      }

      setErrorMessage(result.error || 'Failed to complete checkout. Out of stock or system error.');
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
        className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity animate-fade-in cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md bg-[#09090b] text-white border-l border-zinc-800 shadow-2xl flex flex-col justify-between animate-slide-left">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-950/90 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-widest font-display font-bold text-white">
                {checkoutStep === 'cart' && 'Your Shopping Bag'}
                {checkoutStep === 'details' && 'Shipping & Payment'}
                {checkoutStep === 'success' && 'Order Confirmed'}
              </span>
              {checkoutStep === 'cart' && (
                <span className="text-[10px] bg-white text-black font-mono px-2 py-0.5 font-bold rounded-full">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </div>
            <button
              onClick={handleClose}
              className="text-zinc-400 hover:text-white p-1 rounded hover:bg-zinc-800 transition-colors focus:outline-none cursor-pointer"
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
                    <div className="w-14 h-14 border border-zinc-800 rounded-full flex items-center justify-center bg-zinc-900 text-zinc-500">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <h3 className="text-xs uppercase tracking-wider font-display font-semibold text-zinc-300">Your bag is currently empty</h3>
                    <p className="text-xs text-zinc-500 max-w-[220px] font-light leading-relaxed">
                      Discover our athletic luxury garments engineered in Sri Lanka.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-3 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-lg hover:bg-zinc-200 cursor-pointer shadow-md"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => {
                    const itemSize = item.selectedSize || item.size;
                    const itemColor = item.selectedColor || item.color || '';
                    return (
                      <div key={`${item.id}-${itemSize}-${itemColor}`} className="flex space-x-4 pb-4 border-b border-zinc-800/80">
                        <div className="w-20 h-20 bg-zinc-950 overflow-hidden relative rounded-xl border border-zinc-800 flex-shrink-0">
                          <Image
                            src={item.image || (item.images && item.images[0]) || '/images/pdp_front.jpg'}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs uppercase tracking-wider font-semibold font-display text-zinc-200 line-clamp-1 pr-2">
                                {item.name}
                              </h4>
                              <button
                                onClick={() => removeItem(item.id, itemSize, itemColor)}
                                className="text-[10px] text-zinc-500 hover:text-rose-400 font-display cursor-pointer"
                              >
                                REMOVE
                              </button>
                            </div>
                            <div className="flex space-x-3 text-[10px] text-zinc-400 mt-1 font-mono">
                              <span>Size: <strong className="text-zinc-200">{itemSize}</strong></span>
                              {itemColor && <span>Color: <strong className="text-zinc-200">{itemColor}</strong></span>}
                            </div>
                          </div>

                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center border border-zinc-800 bg-zinc-900 rounded-md">
                              <button
                                onClick={() => updateQuantity(item.id, itemSize, itemColor, item.quantity - 1)}
                                className="px-2 py-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-mono font-bold text-white">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, itemSize, itemColor, item.quantity + 1)}
                                className="px-2 py-1 text-xs text-zinc-400 hover:text-white cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <div className="text-xs font-mono font-bold text-white">
                              LKR {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-6 border-t border-zinc-800 bg-zinc-950/95 space-y-4">
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-zinc-400">
                      <span>Subtotal</span>
                      <span className="font-mono text-zinc-200">LKR {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-zinc-400">
                      <span>Delivery Fee</span>
                      <span className="font-mono text-white font-bold">LKR {deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold uppercase tracking-wider font-display pt-2 border-t border-zinc-800 text-white">
                      <span>Total Amount</span>
                      <span className="font-mono text-white">LKR {total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('details')}
                    className="w-full py-4 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-all duration-300 shadow-lg cursor-pointer text-center"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          )}

          {/* STEP 2: Customer Shipping & Payment Form */}
          {checkoutStep === 'details' && (
            <form onSubmit={handleCheckoutSubmit} className="flex-1 flex flex-col justify-between overflow-y-auto">
              <div className="p-6 space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-lg">
                    {errorMessage}
                  </div>
                )}

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
                    className="w-full px-3 py-2.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                      className="w-full px-3 py-2.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
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
                      className="w-full px-3 py-2.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                    Shipping Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="Street address, apartment or house number"
                    className="w-full px-3 py-2.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
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
                      className="w-full px-3 py-2.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
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
                      className="w-full px-3 py-2.5 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 pt-2">
                  <label className="block text-[10px] uppercase font-display font-semibold text-zinc-400">
                    Select Payment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('cash_on_delivery')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'cash_on_delivery'
                          ? 'bg-zinc-800 border-white text-white font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-bold font-display uppercase">Cash on Delivery</span>
                      <span className="text-[10px] opacity-75 mt-1">Pay when item arrives</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('payhere')}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'payhere'
                          ? 'bg-zinc-800 border-white text-white font-bold'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-bold font-display uppercase">PayHere Gateway</span>
                      <span className="text-[10px] opacity-75 mt-1">Instant online payment</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-display font-semibold mb-1 text-zinc-400">
                    Order Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    placeholder="Delivery instructions, gate code, etc."
                    className="w-full px-3 py-2 text-xs border border-zinc-800 rounded-lg bg-zinc-900 text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-zinc-800 bg-zinc-950/95 space-y-3">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider font-display">
                  <span className="text-zinc-400">Total Payable</span>
                  <span className="font-mono text-white text-sm font-bold">LKR {total.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Writing Order to Firestore...</span>
                    </span>
                  ) : (
                    <span>Submit Order ({selectedPaymentMethod === 'payhere' ? 'PayHere' : 'Cash on Delivery'})</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full text-[10px] uppercase tracking-wider font-display text-zinc-400 hover:text-white py-1 text-center cursor-pointer"
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
                <div className="w-16 h-16 bg-white/10 border border-white/40 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-display uppercase tracking-wider font-bold text-white">
                    Order Submitted!
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Thank you for your order with Axivers. Your garment request has been recorded in our Firestore database.
                  </p>
                </div>

                {/* Generated Order Number Highlight */}
                <div className="bg-zinc-900 p-4 rounded-xl border border-white/30 text-center space-y-1 shadow-inner">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-display block">
                    Order Number
                  </span>
                  <span className="font-mono text-lg font-bold text-white tracking-wider">
                    {placedOrderNumber}
                  </span>
                </div>

                <div className="text-left bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 text-xs space-y-2">
                  <p className="font-semibold text-zinc-300 uppercase tracking-wider font-display">Order Breakdown:</p>
                  <p className="text-zinc-400">Customer: <strong className="text-white">{placedOrderDetails?.customer?.name}</strong></p>
                  <p className="text-zinc-400">Payment: <strong className="text-white uppercase">{placedOrderDetails?.paymentMethod}</strong></p>
                  <p className="text-zinc-400 font-mono">Total Paid: <strong className="text-white">LKR {placedOrderDetails?.total?.toLocaleString()}</strong></p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-4 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 cursor-pointer shadow-lg mt-6"
              >
                Continue Shopping
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
