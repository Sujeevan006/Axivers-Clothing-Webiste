import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Axivers Clothing',
  description: 'Axivers Clothing (Pvt) Ltd privacy policy. How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-zinc-200 pb-6">
          <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Governance &amp; Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold normal-case tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="text-sm text-muted font-mono">Axivers Clothing (Pvt) Ltd &bull; Colombo, Sri Lanka</p>
        </div>

        <div className="space-y-6 text-sm sm:text-sm font-normal text-zinc-700 leading-relaxed bg-canvas border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you purchase garments from Axivers, register for early launch access, or submit concierge inquiries, we collect the necessary details you provide, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>Recipient name and contact details (email address, mobile phone number).</li>
              <li>Delivery address details within Sri Lanka.</li>
              <li>Size preferences and garment selection history.</li>
            </ul>
          </section>

          <section className="space-y-2 border-b border-zinc-200 pb-5">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              2. How We Use Your Data
            </h2>
            <p>
              We utilize customer data strictly for legitimate operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600">
              <li>Processing and delivering your garment orders.</li>
              <li>Sending live delivery status and tracking updates.</li>
              <li>Delivering priority invitations to launch-registry subscribers.</li>
              <li>Facilitating size exchanges and customer care inquiries.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              3. Data Protection &amp; Confidentiality
            </h2>
            <p>
              Axivers Clothing (Pvt) Ltd does not sell, rent, or trade your personal data. Recipient information is shared solely with licensed courier partners in Sri Lanka for delivery completion.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
