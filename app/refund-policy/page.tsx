import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy — Axivers Clothing',
  description: 'Axivers Clothing (Pvt) Ltd refund and exchange policy, eligibility requirements, and reimbursement procedure.',
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-zinc-200 pb-6">
          <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Policy Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold normal-case tracking-tight text-ink">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm text-muted font-mono">Axivers Clothing (Pvt) Ltd &bull; Colombo, Sri Lanka</p>
        </div>

        <div className="space-y-6 text-sm sm:text-sm font-normal text-zinc-700 leading-relaxed bg-canvas border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              1. 7-Day Exchange Window
            </h2>
            <p>
              We stand behind the construction and textile engineering of every Axivers garment. We provide a 7-day exchange window for all full-price garments to ensure you find your perfect fit.
            </p>
          </section>

          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              2. Circumstances for Monetary Refunds
            </h2>
            <p>
              Monetary refunds are issued under the following verified conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>An item arrives with a confirmed manufacturing flaw verified by our inspection team.</li>
              <li>An incorrect garment was shipped due to a fulfillment error and an exchange is unavailable.</li>
              <li>An order cannot be fulfilled due to unforeseen inventory limitations.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              3. Processing Timelines
            </h2>
            <p>
              Approved card refunds are processed back to the original issuing bank account within 5 to 10 business days. For orders paid via Bank Transfer or Cash on Delivery, refunds are remitted directly to the customer’s verified Sri Lankan bank account via CEFT transfer within 3 business days of quality inspection.
            </p>
          </section>

          <div className="pt-4 border-t border-zinc-200">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 text-ink font-display text-sm normal-case tracking-wider font-semibold underline hover:text-accent transition-colors"
            >
              <span>Contact Support to Initiate a Refund</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
