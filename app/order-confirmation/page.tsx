'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'AXV-SAMPLE';
  const phone = searchParams.get('phone') || '';

  return (
    <div className="max-w-xl mx-auto text-center space-y-8 bg-[#111114] border border-zinc-800/80 rounded-3xl p-8 sm:p-12 shadow-2xl">
      <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center mx-auto text-2xl font-bold shadow-xl">
        ✓
      </div>

      <div className="space-y-2">
        <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
          Order Successfully Placed
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
          Thank You For Choosing Axivers
        </h1>
        <p className="text-xs text-zinc-400 font-light leading-relaxed">
          Your order has been transmitted to our Colombo fulfillment studio. We are preparing your garment with the utmost care.
        </p>
      </div>

      {/* Reference Box */}
      <div className="bg-[#0c0c0e] border border-zinc-800 rounded-2xl p-6 space-y-2">
        <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold block">
          Order Reference Number
        </span>
        <div className="text-2xl font-mono font-bold text-white tracking-widest">
          {orderNumber}
        </div>
        <p className="text-[11px] text-zinc-500 font-light">
          A confirmation SMS & email have been dispatched to your registered contact.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
        <Link
          href={`/track-order?orderNumber=${encodeURIComponent(orderNumber)}&phone=${encodeURIComponent(phone)}`}
          className="px-6 py-3.5 rounded-xl bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors"
        >
          Track Live Status
        </Link>
        <Link
          href="/shop"
          className="px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white font-display text-xs uppercase tracking-wider font-medium hover:border-zinc-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center text-xs text-zinc-500 py-20 font-display">Loading confirmation...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
