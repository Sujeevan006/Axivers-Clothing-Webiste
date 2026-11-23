import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Exchanges — Axivers Assurance',
  description:
    'Axivers 7-day exchange policy. Learn about exchange conditions, garment condition requirements, and how to initiate a size exchange.',
};

export default function ReturnsPage() {
  const steps = [
    {
      num: '01',
      title: 'Verify Eligibility',
      desc: 'Ensure your garment is within 7 calendar days of delivery, completely unworn, unwashed, and with original packaging intact.',
    },
    {
      num: '02',
      title: 'Notify Concierge',
      desc: 'Email support@axivers.com with your order reference number, reason, and requested replacement size.',
    },
    {
      num: '03',
      title: 'Courier Pick-up',
      desc: 'Our fulfillment team coordinates domestic courier routing to exchange the item at your door or designated return facility.',
    },
    {
      num: '04',
      title: 'Inspection & Resolution',
      desc: 'Upon quality inspection at our Colombo facility, your replacement garment is dispatched promptly.',
    },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-medium block">
            Customer Assurance
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold normal-case tracking-tight text-ink">
            Returns &amp; Exchanges
          </h1>
          <p className="text-sm sm:text-sm font-normal text-zinc-500 max-w-lg mx-auto leading-relaxed">
            We want you to feel complete confidence in your fit and fabric. If your size needs adjustment, our 7-day exchange window has you covered.
          </p>
        </div>

        {/* 4 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-surface border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-2.5 shadow-sm"
            >
              <span className="text-sm font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-full border border-accent/30">
                Step {st.num}
              </span>
              <h3 className="text-sm font-display font-bold normal-case text-ink pt-1">
                {st.title}
              </h3>
              <p className="text-sm text-zinc-600 font-normal leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Exchange Conditions Matrix */}
        <div className="bg-surface border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="text-sm font-display font-bold normal-case text-ink tracking-wider border-b border-zinc-200 pb-3">
            Exchange Conditions &amp; Guidelines
          </h2>

          <div className="space-y-3 text-sm font-normal text-zinc-600 leading-relaxed">
            <p>
              • <strong>Timeframe:</strong> Exchanges must be initiated within 7 calendar days from the date of recorded delivery.
            </p>
            <p>
              • <strong>Condition:</strong> Items must be in their original, unwashed, unworn condition with all original brand packaging intact.
            </p>
            <p>
              • <strong>Size Availability:</strong> If the requested replacement size is unavailable, our team will provide store credit or priority reservation for our next restock batch.
            </p>
            <p>
              • <strong>Defective Items:</strong> In the rare instance of a verified manufacturing flaw, Axivers provides an immediate free courier replacement.
            </p>
          </div>
        </div>

        {/* Contact Concierge Link */}
        <div className="border-t border-zinc-200 pt-6 text-center space-y-2">
          <p className="text-sm text-zinc-500">
            Ready to initiate an exchange or have questions?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-sm font-display normal-case tracking-wider font-semibold text-ink underline hover:text-zinc-600 transition-colors"
          >
            <span>Contact Axivers Concierge</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}