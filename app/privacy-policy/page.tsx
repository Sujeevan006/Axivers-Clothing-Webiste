import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Axivers Clothing',
  description: 'Axivers Clothing (Pvt) Ltd privacy policy. How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-zinc-800 pb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Legal & Governance
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 font-mono">Effective Date: October 2026 • Axivers Clothing (Pvt) Ltd</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you purchase garments from Axivers, browse our website, or subscribe to our newsletter, we collect personal information you provide to us, including:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Name and contact details (email address, mobile phone number).</li>
              <li>Delivery and billing address details across Sri Lanka.</li>
              <li>Order history, size selections, and preferred payment methods.</li>
              <li>Technical usage data (IP address, browser type) to optimize storefront speed.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              2. How We Use Your Data
            </h2>
            <p>
              We utilize your data strictly for legitimate operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Fulfilling and dispatching your garment orders.</li>
              <li>Sending live SMS and email updates regarding delivery tracking.</li>
              <li>Providing customer support and processing size exchanges.</li>
              <li>Preventing fraudulent transactions and unauthorized checkouts.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              3. Data Security & Third-Party Disclosure
            </h2>
            <p>
              Axivers Clothing does not sell, rent, or trade your personal data. Your delivery details are shared solely with licensed courier fulfillment partners in Sri Lanka for delivery completion. All payment transactions are encrypted via SSL/TLS protocol through certified payment processors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              4. Contact the Data Protection Officer
            </h2>
            <p>
              If you wish to review, update, or request deletion of your stored customer records, contact our privacy compliance team at <strong>privacy@axivers.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
