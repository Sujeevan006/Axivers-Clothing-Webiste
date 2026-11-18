import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — Axivers Island-Wide Service',
  description:
    'Learn about Axivers island-wide shipping across Sri Lanka. Estimated delivery timelines, rates, order processing, and Cash on Delivery availability.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Fulfillment Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Shipping &amp; <span className="font-bold">Delivery Policy</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-lg mx-auto leading-relaxed">
            We deliver island-wide across Sri Lanka with trusted domestic courier partners. Clear timelines, door-to-door delivery, and secure package fulfillment.
          </p>
        </div>

        {/* Timelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
            <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/20">
              Region 01
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Colombo &amp; Suburbs
            </h3>
            <div className="text-2xl font-mono font-bold text-white">1 – 2 Days</div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Dispatched from our Colombo fulfillment center. Same-day or next-day courier routing for metropolitan areas.
            </p>
          </div>

          <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
            <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/20">
              Region 02
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Outstation Cities
            </h3>
            <div className="text-2xl font-mono font-bold text-white">2 – 4 Days</div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Door-to-door delivery across major provincial capitals including Kandy, Galle, Gampaha, Kurunegala, and Matara.
            </p>
          </div>

          <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 space-y-3 shadow-xl">
            <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/20">
              Region 03
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Remote Districts
            </h3>
            <div className="text-2xl font-mono font-bold text-white">3 – 5 Days</div>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Extended provincial regions and highland sectors serviced via verified domestic distribution partners.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 space-y-8 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed shadow-2xl">
          <div className="space-y-2 border-b border-zinc-900 pb-6">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              1. Delivery Charges &amp; Free Shipping Threshold
            </h2>
            <p>
              Standard island-wide delivery is charged at a flat rate of <strong>LKR 350.00</strong> across Sri Lanka.
            </p>
            <p className="text-emerald-400 font-medium">
              We offer complimentary free shipping on all orders valued above LKR 10,000.00.
            </p>
          </div>

          <div className="space-y-2 border-b border-zinc-900 pb-6">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              2. Order Processing &amp; Verification
            </h2>
            <p>
              Orders placed Monday through Friday (before 2:00 PM Asia/Colombo) are processed for dispatch within 24 hours. For orders placed with Cash on Delivery (COD), our dispatch concierge may reach out via SMS or call to confirm recipient availability.
            </p>
          </div>

          <div className="space-y-2 border-b border-zinc-900 pb-6">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              3. Cash on Delivery (COD) Policy
            </h2>
            <p>
              Cash on Delivery is available across Sri Lanka. Please have the exact payment amount ready upon rider arrival to facilitate prompt delivery handoff.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              4. Order Tracking
            </h2>
            <p>
              Upon courier pickup, your order reference number will be sent via email. You can verify package status anytime through our Track Order portal.
            </p>
            <div className="pt-2">
              <Link
                href="/track-order"
                className="inline-flex items-center space-x-2 text-white underline font-display uppercase tracking-wider text-xs font-semibold hover:text-[#c5a059]"
              >
                <span>Track An Active Order</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
