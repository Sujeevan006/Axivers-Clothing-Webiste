import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Axivers Clothing',
  description: 'Axivers Clothing (Pvt) Ltd privacy policy. How we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="space-y-3 border-b border-zinc-900 pb-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Governance &amp; Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs text-zinc-500 font-mono">Axivers Clothing (Pvt) Ltd &bull; Colombo, Sri Lanka</p>
        </div>

        <div className="space-y-6 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <section className="space-y-2 border-b border-zinc-900 pb-5">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              1. Information We Collect
            </h2>
            <p>
              When you purchase garments from Axivers, register for early launch access, or submit concierge inquiries, we collect the necessary details you provide, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Recipient name and contact details (email address, mobile phone number).</li>
              <li>Delivery address details within Sri Lanka.</li>
              <li>Size preferences and garment selection history.</li>
            </ul>
          </section>

          <section className="space-y-2 border-b border-zinc-900 pb-5">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              2. How We Use Your Data
            </h2>
            <p>
              We utilize customer data strictly for legitimate operational purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Processing and delivering your garment orders.</li>
              <li>Sending live delivery status and tracking updates.</li>
              <li>Delivering priority invitations to launch-registry subscribers.</li>
              <li>Facilitating size exchanges and customer care inquiries.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
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
