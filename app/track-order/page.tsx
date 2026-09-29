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

  // Helper to determine step status
  const getStepIndex = (currentStatus: string) => {
    const idx = STATUS_STEPS.findIndex(s => s.key === currentStatus?.toLowerCase());
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = trackingData?.order ? getStepIndex(trackingData.order.orderStatus) : 0;
  const isCancelled = trackingData?.order?.orderStatus === 'cancelled';

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white font-display font-semibold block">
          Order Status & Timeline
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-light tracking-tight text-white">
          Track Your <span className="font-bold">Axivers Order</span>
        </h1>
        <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-md mx-auto">
          Enter your order reference and registered phone number or email to view live fulfillment updates.
        </p>
      </div>

      {/* Lookup Form */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5 space-y-1.5">
            <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
              Order Number *
            </label>
            <input
              type="text"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="e.g. AXV-84920"
              className="w-full px-4 py-3 text-xs uppercase font-mono tracking-wider border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div className="sm:col-span-5 space-y-1.5">
            <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
              Phone Number or Email *
            </label>
            <input
              type="text"
              required
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              placeholder="0771234567 or email@domain.com"
              className="w-full px-4 py-3 text-xs font-mono tracking-wider border border-zinc-800 rounded-xl bg-zinc-950 text-white focus:outline-none focus:border-white"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-white text-black text-xs font-display uppercase tracking-widest font-bold rounded-xl hover:bg-zinc-200 transition-all cursor-pointer shadow-md disabled:opacity-50 text-center"
            >
              {isLoading ? 'Searching...' : 'Track'}
            </button>
          </div>
        </form>

        {errorMessage && (
          <div className="mt-4 p-4 bg-rose-950/80 border border-rose-800 text-rose-200 text-xs rounded-xl">
            {errorMessage}
          </div>
        )}
      </div>

      {/* Tracking Details View */}
      {trackingData?.order && (
        <div className="space-y-8 animate-fade-in">
          {/* Order Header Summary Card */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 pb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
                  Order Reference
                </span>
                <h2 className="text-2xl font-mono font-bold text-white tracking-wider">
                  {trackingData.order.orderNumber}
                </h2>
                {trackingData.order.createdAt && (
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">
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
                {/* Payment Badge */}
                <span className={`text-[10px] uppercase tracking-wider font-display font-bold px-3 py-1.5 rounded-lg border ${
                  trackingData.order.paymentStatus === 'paid'
                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                    : 'bg-amber-950/80 border-amber-700 text-amber-300'
                }`}>
                  Payment: {trackingData.order.paymentStatus} ({trackingData.order.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : trackingData.order.paymentMethod === 'payhere' ? 'PayHere' : 'COD'})
                </span>

                {/* Status Badge */}
                <span className={`text-[10px] uppercase tracking-wider font-display font-bold px-3 py-1.5 rounded-lg border ${
                  isCancelled
                    ? 'bg-rose-950/80 border-rose-700 text-rose-300'
                    : trackingData.order.orderStatus === 'delivered'
                    ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300'
                    : 'bg-white text-black border-white'
                }`}>
                  Status: {trackingData.order.orderStatus}
                </span>
              </div>
            </div>

            {/* Stepper Progress Bar */}
            {isCancelled ? (
              <div className="p-4 bg-rose-950/50 border border-rose-800 rounded-xl text-center text-xs text-rose-300 font-display font-semibold uppercase tracking-wider">
                This order has been marked as Cancelled.
              </div>
            ) : (
              <div className="py-4">
                <span className="text-[10px] uppercase font-display font-semibold text-zinc-400 block mb-4">
                  Fulfillment Progress:
                </span>
                <div className="grid grid-cols-5 gap-2 relative">
                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;

                    return (
                      <div key={step.key} className="flex flex-col items-center text-center space-y-2 relative">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                            isCurrent
                              ? 'bg-white text-black ring-4 ring-white/20'
                              : isDone
                              ? 'bg-emerald-500 text-black'
                              : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                          }`}
                        >
                          {isDone ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            idx + 1
                          )}
                        </div>
                        <span className={`text-[10px] uppercase tracking-wider font-display ${
                          isCurrent
                            ? 'text-white font-bold'
                            : isDone
                            ? 'text-zinc-300'
                            : 'text-zinc-600'
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
            <div className="border-t border-zinc-800 pt-5 space-y-4">
              <span className="text-xs uppercase tracking-widest font-display font-bold text-white block">
                Ordered Garments ({trackingData.order.items.length})
              </span>
              <div className="space-y-3">
                {trackingData.order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-zinc-950 p-3.5 rounded-xl border border-zinc-800/80">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-14 h-14 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0 relative">
                        <Image
                          src={item.image || '/images/pdp_front.jpg'}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-display uppercase tracking-wider font-semibold text-white">
                          {item.name}
                        </h4>
                        <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
                          Size: <strong className="text-zinc-200">{item.size || 'M'}</strong>
                          {item.color ? ` | Color: ${item.color}` : ''} | Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-white block">
                        {formatCurrency(item.subtotal || item.unitPrice * item.quantity, trackingData.order.currency || 'LKR', true)}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {formatCurrency(item.unitPrice, trackingData.order.currency || 'LKR', true)} each
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery & Financial Breakdown */}
            <div className="border-t border-zinc-800 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1 text-zinc-400">
                <span className="text-[10px] uppercase tracking-widest font-display font-semibold text-zinc-300 block mb-1">
                  Delivery Destination
                </span>
                <p className="text-white font-semibold">{trackingData.order.customer.name}</p>
                <p>{trackingData.order.customer.address}</p>
                <p>{trackingData.order.customer.city} {trackingData.order.customer.postalCode ? `(${trackingData.order.customer.postalCode})` : ''}</p>
                <p className="font-mono pt-1 text-zinc-300">Contact: {trackingData.order.customer.phone}</p>
              </div>

              <div className="space-y-1.5 font-mono text-right sm:border-l sm:border-zinc-800 sm:pl-6">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="text-zinc-200">{formatCurrency(trackingData.order.subtotal, trackingData.order.currency || 'LKR', true)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Delivery Fee:</span>
                  <span className="text-white">
                    {trackingData.order.deliveryFee === 0 ? 'FREE' : formatCurrency(trackingData.order.deliveryFee, trackingData.order.currency || 'LKR', true)}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-2 border-t border-zinc-800 text-white">
                  <span>Total:</span>
                  <span>{formatCurrency(trackingData.order.total, trackingData.order.currency || 'LKR', true)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lifecycle Event Timeline */}
          {trackingData.events && trackingData.events.length > 0 && (
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
              <span className="text-xs uppercase tracking-widest font-display font-bold text-white block border-b border-zinc-800 pb-3">
                Order Activity Timeline
              </span>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-800">
                {trackingData.events.map((event: any, idx: number) => (
                  <div key={event.id || idx} className="relative space-y-1">
                    {/* Timeline bullet */}
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-zinc-900" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <h4 className="text-xs font-display uppercase tracking-wider font-semibold text-white">
                        {event.description || `Status update: ${event.status}`}
                      </h4>
                      {event.timestamp && (
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {new Date(event.timestamp).toLocaleDateString('en-LK', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-[#09090b] text-[#ffffff] pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={
        <div className="text-center py-20">
          <p className="text-xs uppercase tracking-widest font-display text-zinc-500">Loading order tracker...</p>
        </div>
      }>
        <TrackOrderContent />
      </Suspense>
    </main>
  );
}
