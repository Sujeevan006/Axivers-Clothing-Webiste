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
    <div className="min-h-screen bg-white text-[#060606] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono font-medium block">
            Fulfillment Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#060606]">
            Shipping &amp; Delivery
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-500 max-w-lg mx-auto leading-relaxed">
            We deliver island-wide across Sri Lanka with trusted domestic courier partners. Clear timelines, door-to-door delivery, and secure package fulfillment.
          </p>
        </div>

        {/* Timelines Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/30">
              Region 01
            </span>
            <h3 className="text-sm font-display font-bold uppercase text-[#060606]">
              Colombo &amp; Suburbs
            </h3>
            <div className="text-2xl font-mono font-bold text-[#060606]">1 – 2 Days</div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Dispatched from our Colombo fulfillment center. Same-day or next-day courier routing for metropolitan areas.
            </p>
          </div>

          <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/30">
              Region 02
            </span>
            <h3 className="text-sm font-display font-bold uppercase text-[#060606]">
              Outstation Cities
            </h3>
            <div className="text-2xl font-mono font-bold text-[#060606]">2 – 3 Days</div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Major provincial centers (Kandy, Galle, Kurunegala, Gampaha, Matara, Negombo, etc.).
            </p>
          </div>

          <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 space-y-3 shadow-sm">
            <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/30">
              Region 03
            </span>
            <h3 className="text-sm font-display font-bold uppercase text-[#060606]">
              Remote Districts
            </h3>
            <div className="text-2xl font-mono font-bold text-[#060606]">3 – 4 Days</div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Northern, Eastern, and remote highland regions serviced via registered domestic postal couriers.
            </p>
          </div>
        </div>

        {/* Rates & Policy Details */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="text-sm font-display font-bold uppercase text-[#060606] tracking-wider border-b border-zinc-200 pb-3">
            Shipping Rates &amp; Free Delivery Policy
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-light text-zinc-700">
            <div className="space-y-2">
              <h4 className="font-display font-bold uppercase text-[#060606]">Standard Delivery Fee</h4>
              <p className="leading-relaxed text-zinc-600">
                A flat fee of <strong>LKR 350.00</strong> applies to domestic orders below our free shipping threshold. This covers secure poly-bagged packaging, courier handling, and tracking.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold uppercase text-[#060606]">Free Shipping Threshold</h4>
              <p className="leading-relaxed text-zinc-600">
                All domestic orders with a subtotal of <strong>LKR 10,000.00 or more</strong> qualify automatically for <strong>Free Delivery</strong> anywhere across Sri Lanka.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold uppercase text-[#060606]">Cash on Delivery (COD)</h4>
              <p className="leading-relaxed text-zinc-600">
                Cash on Delivery is available across 100% of serviceable domestic pin codes. Please prepare the exact cash amount for your delivery representative.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-bold uppercase text-[#060606]">Tracking &amp; Confirmation</h4>
              <p className="leading-relaxed text-zinc-600">
                Once dispatched, you will receive your unique tracking reference via SMS and email. You can check live status directly on our <Link href="/track-order" className="text-black underline font-semibold">Track Order</Link> page.
              </p>
            </div>
          </div>
        </div>

        {/* Concierge Support CTA */}
        <div className="border-t border-zinc-200 pt-6 text-center space-y-2">
          <p className="text-xs text-zinc-500">
            Have questions regarding an upcoming shipment or special delivery instruction?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider font-semibold text-[#060606] underline hover:text-zinc-600 transition-colors"
          >
            <span>Contact Axivers Concierge</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}