import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — Axivers Clothing',
  description:
    'Learn about Axivers island-wide shipping across Sri Lanka. Estimated delivery timelines, rates, order processing, and Cash on Delivery availability.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Customer Fulfillment
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Shipping & <span className="font-bold">Delivery Policy</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-lg mx-auto">
            We deliver island-wide across Sri Lanka with trusted courier partners. Transparent rates, live tracking, and secure fulfillment.
          </p>
        </div>

        {/* Timelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-full">
              Region 01
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Colombo & Suburbs
            </h3>
            <div className="text-2xl font-mono font-bold text-white">1 - 2 Days</div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Express dispatch from our Colombo fulfillment hub. Same-day dispatch for orders placed before 12:00 PM.
            </p>
          </div>

          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-full">
              Region 02
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Outstation Cities
            </h3>
            <div className="text-2xl font-mono font-bold text-white">2 - 4 Days</div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Standard door-to-door delivery covering Kandy, Galle, Gampaha, Kurunegala, Matara, and major districts.
            </p>
          </div>

          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-full">
              Region 03
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Island-Wide Remote
            </h3>
            <div className="text-2xl font-mono font-bold text-white">3 - 5 Days</div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Northern, Eastern, and remote highland regions serviced via registered postal & courier network.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
          <div className="space-y-2 border-b border-zinc-800 pb-6">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              1. Delivery Charges & Free Shipping Threshold
            </h2>
            <p>
              Standard island-wide shipping is charged at a flat rate of <strong>LKR 350.00</strong> across Sri Lanka.
            </p>
            <p className="text-emerald-400 font-medium">
              We offer complimentary free delivery on all orders valued above LKR 10,000.00.
            </p>
          </div>

          <div className="space-y-2 border-b border-zinc-800 pb-6">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              2. Order Processing & Verification
            </h2>
            <p>
              Orders received Monday through Saturday are packed and verified within 24 hours. For orders placed with Cash on Delivery (COD), our dispatch team may contact you via phone or SMS to confirm your delivery address before dispatch.
            </p>
          </div>

          <div className="space-y-2 border-b border-zinc-800 pb-6">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              3. Cash on Delivery (COD) Availability
            </h2>
            <p>
              Cash on Delivery is available for 95% of postal codes across Sri Lanka. Please ensure the exact cash amount is ready at the time of delivery, as delivery riders carry limited change.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              4. Live Order Tracking
            </h2>
            <p>
              Once your garment leaves our fulfillment facility, you will receive an SMS and email notification with your tracking number. You can track your order status in real time on our website.
            </p>
            <div className="pt-2">
              <Link
                href="/track-order"
                className="inline-flex items-center space-x-2 text-white underline font-display uppercase tracking-wider text-xs font-semibold"
              >
                <span>Go to Track Order Page</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
