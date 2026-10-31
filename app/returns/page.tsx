import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Exchanges — Axivers Clothing',
  description:
    'Axivers 7-day hassle-free return and exchange policy. Learn about exchange conditions, garment condition requirements, and how to initiate a request.',
};

export default function ReturnsPage() {
  const steps = [
    {
      num: '01',
      title: 'Check Eligibility',
      desc: 'Ensure your item is within 7 calendar days of delivery, unworn, unwashed, and with all original tags and packaging intact.',
    },
    {
      num: '02',
      title: 'Contact Customer Support',
      desc: 'Send a message to support@axivers.com or WhatsApp our team with your order number and desired replacement size or reason.',
    },
    {
      num: '03',
      title: 'Courier Pick-up or Exchange',
      desc: 'Our dispatch team coordinates a reverse pick-up or exchange delivery directly to your doorstep in Colombo or via partner drop-off.',
    },
    {
      num: '04',
      title: 'Inspection & Resolution',
      desc: 'Upon quality check at our Colombo facility, your replacement garment is dispatched promptly or store credit is issued.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Customer Assurance
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Returns & <span className="font-bold">Exchanges</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-lg mx-auto">
            We want you to feel complete confidence in your fit and fabric. If your garment isn’t perfect, our 7-day exchange window has you covered.
          </p>
        </div>

        {/* 4 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-3 shadow-lg"
            >
              <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-1 rounded-full">
                Step {st.num}
              </span>
              <h3 className="text-base font-display font-bold uppercase text-white">
                {st.title}
              </h3>
              <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
                {st.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Policy Terms */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
          <div className="space-y-2 border-b border-zinc-800 pb-5">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Return & Exchange Conditions
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-zinc-400">
              <li>Item must be returned within <strong>7 days</strong> of delivery date.</li>
              <li>Garment must be in original unworn condition with zero perfume, deodorant, or make-up marks.</li>
              <li>All original Axivers neck tags, piping labels, and frosted zip bags must be attached.</li>
              <li>Sale or promotional items are eligible for size exchange only, subject to stock availability.</li>
            </ul>
          </div>

          <div className="space-y-2 border-b border-zinc-800 pb-5">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Exchange Shipping Fees
            </h2>
            <p>
              If the exchange is due to an incorrect garment sent by Axivers or a verified manufacturing fault, all return and re-delivery charges are 100% covered by us. For customer size preference changes, a nominal courier handling fee of LKR 350.00 applies.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Need Help With a Return?
            </h2>
            <p>
              Our customer care team is available Monday to Saturday (9:00 AM – 6:00 PM IST).
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Submit Return Request
              </Link>
              <a
                href="mailto:support@axivers.com"
                className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-white font-display text-xs uppercase tracking-wider font-medium rounded-xl hover:border-zinc-600 transition-colors"
              >
                Email support@axivers.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
