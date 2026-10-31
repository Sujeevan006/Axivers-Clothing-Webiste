import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Axivers Clothing',
  description: 'Axivers Clothing (Pvt) Ltd general terms and conditions of purchase, sale, and website usage.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-zinc-800 pb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Legal Agreement
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white">
            Terms & Conditions
          </h1>
          <p className="text-xs text-zinc-500 font-mono">Last Updated: October 2026 • Axivers Clothing (Pvt) Ltd</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              1. Scope & Acceptance
            </h2>
            <p>
              By accessing, browsing, or placing an order on axivers.com, you agree to be bound by these Terms and Conditions. These terms govern all purchases made through Axivers Clothing (Pvt) Ltd within the Democratic Socialist Republic of Sri Lanka.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              2. Products, Pricing & Accuracy
            </h2>
            <p>
              We endeavor to display the colors, piping details, and fabric weights of our garments as accurately as possible. All prices are listed in Sri Lankan Rupees (LKR). We reserve the right to correct typographical pricing errors prior to order dispatch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              3. Order Acceptance & Fulfillment
            </h2>
            <p>
              Receipt of an electronic order confirmation does not constitute our final acceptance of an order. We reserve the right to decline or cancel orders in cases of stock unavailability, suspected fraud, or unserviceable delivery locations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              4. Intellectual Property
            </h2>
            <p>
              All trademarks, logos, garment designs, photographic assets, and copy published on axivers.com are the exclusive intellectual property of Axivers Clothing (Pvt) Ltd. Any unauthorized reproduction is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
