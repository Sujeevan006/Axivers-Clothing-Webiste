"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { trackCustomerOrder, TrackOrderResponse } from '@/app/actions/orders';
import { formatCurrency } from '@/lib/utils/formatters';

const STATUS_STEPS = [
  { key: 'pending', label: 'Pending' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderNumber = searchParams.get('orderNumber') || '';
  const initialPhone = searchParams.get('phone') || '';

  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phoneOrEmail, setPhoneOrEmail] = useState(initialPhone);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [trackingData, setTrackingData] = useState<TrackOrderResponse | null>(null);

  const performLookup = async (orderNum: string, identifier: string) => {
    if (!orderNum.trim() || !identifier.trim()) {
      setErrorMessage('Please enter both your Order Number and Phone Number.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const res = await trackCustomerOrder(orderNum, identifier);
      if (res.success && res.order) {
        setTrackingData(res);
      } else {
        setTrackingData(null);
        setErrorMessage(res.error || 'No matching order found. Please check your credentials.');
      }
    } catch (err: any) {
      setTrackingData(null);
      setErrorMessage(err?.message || 'Failed to locate order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialOrderNumber && initialPhone) {
      performLookup(initialOrderNumber, initialPhone);
    }
  }, [initialOrderNumber, initialPhone]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(orderNumber, phoneOrEmail);
  };

  const getStepIndex = (currentStatus: string) => {
    const idx = STATUS_STEPS.findIndex(s => s.key === currentStatus?.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = trackingData?.order ? getStepIndex(trackingData.order.orderStatus) : 0;
  const isCancelled = trackingData?.order?.orderStatus === 'cancelled';

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-2 pt-4">
        <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-medium block">
          Order Status &amp; Timeline
        </span>
        <h1 className="text-3xl sm:text-4xl font-display font-bold normal-case tracking-tight text-ink">
          Track Your Order
        </h1>
        <p className="text-sm sm:text-sm font-normal text-zinc-500 max-w-md mx-auto">
          Enter your order reference and registered phone number or email to view live fulfillment updates.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-surface border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5 space-y-1">
            <label htmlFor="app-track-order-page-tsx-field-1" className="block text-sm normal-case font-display font-semibold tracking-wider text-zinc-600">
              Order Number *
            </label>
            <input id="app-track-order-page-tsx-field-1"
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. AXV-84920"
              className="w-full px-3.5 py-2.5 text-sm normal-case font-mono tracking-wider border border-zinc-300 rounded-lg bg-surface text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="sm:col-span-5 space-y-1">
            <label htmlFor="app-track-order-page-tsx-field-2" className="block text-sm normal-case font-display font-semibold tracking-wider text-zinc-600">
              Phone Number or Email *
            </label>
            <input id="app-track-order-page-tsx-field-2"
              type="text"
              required
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              placeholder="0771234567 or email@domain.com"
              className="w-full px-3.5 py-2.5 text-sm font-mono tracking-wider border border-zinc-300 rounded-lg bg-surface text-ink focus:outline-none focus:border-ink"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-ink text-paper text-sm font-display normal-case tracking-widest font-bold rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm disabled:opacity-50 text-center"
            >
              {isLoading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Tracking Details View */}
      {trackingData?.order && (
        <div className="space-y-8 animate-fade-in">
          {/* Order Header Summary Card */}
          <div className="bg-surface border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200 pb-5">
              <div>
                <span className="text-sm font-mono normal-case tracking-widest text-zinc-500 block">
                  Order Reference
                </span>
                <h2 className="text-xl sm:text-2xl font-mono font-bold text-ink tracking-wider">
                  {trackingData.order.orderNumber}
                </h2>
                {trackingData.order.createdAt && (
                  <p className="text-sm text-zinc-500 font-mono mt-0.5">
                    Placed on {new Date(trackingData.order.createdAt).toLocaleDateString('en-LK', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-sm normal-case tracking-wider font-display font-bold px-3 py-1.5 rounded-lg border ${
                  trackingData.order.paymentStatus === 'paid'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-amber-50 border-amber-300 text-amber-800'
                }`}>
                  Payment: {trackingData.order.paymentStatus} ({trackingData.order.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : trackingData.order.paymentMethod === 'payhere' ? 'PayHere' : 'COD'})
                </span>

                <span className={`text-sm normal-case tracking-wider font-display font-bold px-3 py-1.5 rounded-lg border ${
                  isCancelled
                    ? 'bg-rose-50 border-rose-300 text-rose-800'
                    : trackingData.order.orderStatus === 'delivered'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-ink text-paper border-ink'
                }`}>
                  Status: {trackingData.order.orderStatus}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            {isCancelled ? (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-center text-sm text-rose-800 font-display font-semibold normal-case tracking-wider">
                This order has been marked as Cancelled.
              </div>
            ) : (
              <div className="py-2">
                <span className="text-sm normal-case font-display font-semibold text-zinc-500 block mb-4">
                  Fulfillment Progress:
                </span>
                <div className="grid grid-cols-5 gap-2 relative">
                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.key} className="flex flex-col items-center text-center space-y-1.5 relative">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-sm font-bold transition-all duration-300 ${
                            isCurrent
                              ? 'bg-ink text-paper ring-2 ring-black/20'
                              : isDone
                              ? 'bg-emerald-600 text-paper'
                              : 'bg-zinc-200 text-zinc-500 border border-zinc-300'
                          }`}
                        >
                          {isDone ? (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className={`text-sm normal-case tracking-wider font-display ${
                          isCurrent
                            ? 'text-ink font-bold'
                            : isDone
                            ? 'text-zinc-700'
                            : 'text-zinc-400'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ordered Items List */}
            <div className="border-t border-zinc-200 pt-5 space-y-3">
              <span className="text-sm normal-case tracking-wider font-display font-bold text-ink block">
                Ordered Garments ({trackingData.order.items.length})
              </span>
              <div className="space-y-2.5">
                {trackingData.order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-surface p-3.5 rounded-xl border border-zinc-200">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 bg-canvas rounded-lg overflow-hidden border border-zinc-200 shrink-0 relative">
                        <Image
                          src={item.image || '/images/flagship-tee-black.jpg'}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-display normal-case tracking-wider font-semibold text-ink">
                          {item.name}
                        </h4>
                        <p className="text-sm font-mono text-zinc-500 mt-0.5">
                          Size: <strong className="text-ink">{item.size || 'M'}</strong>
                          {item.color ? ` | Color: ${item.color}` : ''} | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono font-bold text-ink block">
                        {formatCurrency(item.subtotal || item.unitPrice * item.quantity, trackingData.order.currency || 'LKR', true)}
                      </span>
                      <span className="text-sm text-zinc-500 font-mono">
                        {formatCurrency(item.unitPrice, trackingData.order.currency || 'LKR', true)} each
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Financial Breakdown */}
            <div className="border-t border-zinc-200 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1 text-zinc-600">
                <span className="text-sm normal-case tracking-wider font-display font-semibold text-ink block mb-1">
                  Delivery Destination
                </span>
                <p className="text-ink font-semibold">{trackingData.order.customer.name}</p>
                <p>{trackingData.order.customer.address}</p>
                <p>{trackingData.order.customer.city} {trackingData.order.customer.postalCode ? `(${trackingData.order.customer.postalCode})` : ''}</p>
                <p className="font-mono pt-1 text-zinc-500">Contact: {trackingData.order.customer.phone}</p>
              </div>

              <div className="space-y-1.5 font-mono text-right sm:border-l sm:border-zinc-200 sm:pl-6">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal:</span>
                  <span className="text-ink">{formatCurrency(trackingData.order.subtotal, trackingData.order.currency || 'LKR', true)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Delivery Fee:</span>
                  <span className="text-ink font-bold">
                    {trackingData.order.deliveryFee === 0 ? 'FREE' : formatCurrency(trackingData.order.deliveryFee, trackingData.order.currency || 'LKR', true)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-zinc-200 text-ink">
                  <span>Total:</span>
                  <span>{formatCurrency(trackingData.order.total, trackingData.order.currency || 'LKR', true)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="text-center py-20">
          <p className="text-sm normal-case tracking-widest font-display text-zinc-500">Loading order tracker...</p>
        </div>
      }>
        <TrackOrderContent />
      </Suspense>
    </main>
  );
}