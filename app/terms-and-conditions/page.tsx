import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Axivers Clothing',
  description: 'Axivers Clothing (Pvt) Ltd general terms and conditions of purchase, sale, and website usage.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-zinc-200 pb-6">
          <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold normal-case tracking-tight text-ink">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-muted font-mono">Axivers Clothing (Pvt) Ltd &bull; Colombo, Sri Lanka</p>
        </div>

        <div className="space-y-6 text-sm sm:text-sm font-normal text-zinc-700 leading-relaxed bg-canvas border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              1. Scope &amp; Acceptance
            </h2>
            <p>
              By accessing, browsing, or placing an order on axivers.com, you agree to be bound by these Terms and Conditions. These terms govern all purchases made through Axivers Clothing (Pvt) Ltd within Sri Lanka.
            </p>
          </section>

          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              2. Products, Pricing &amp; Accuracy
            </h2>
            <p>
              We endeavor to describe the materials, construction details, and specifications of our garments with maximum fidelity. All prices are listed in Sri Lankan Rupees (LKR) without hidden surcharges. We reserve the right to correct typographical pricing discrepancies prior to order dispatch.
            </p>
          </section>

          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              3. Order Acceptance &amp; Fulfillment
            </h2>
            <p>
              Receipt of an electronic order confirmation does not constitute our final legal acceptance of an order. We reserve the right to decline or cancel orders in cases of stock limitations, unverified contact credentials, or unserviceable delivery locations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              4. Intellectual Property
            </h2>
            <p>
              All trademarks, the lowercase "axivers" wordmark, garment designs, photographic assets, and editorial copy published on axivers.com are the exclusive intellectual property of Axivers Clothing (Pvt) Ltd. Any unauthorized reproduction or commercial mimicry is strictly prohibited.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
