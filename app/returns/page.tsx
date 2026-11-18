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
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Customer Assurance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Returns &amp; <span className="font-bold">Exchanges</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-lg mx-auto leading-relaxed">
            We want you to feel complete confidence in your fit and fabric. If your size needs adjustment, our 7-day exchange window has you covered.
          </p>
        </div>

        {/* 4 Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((st) => (
            <div
              key={st.num}
              className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-7 space-y-3 shadow-xl"
            >
              <span className="text-xs font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-1 rounded-full border border-[#c5a059]/20">
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
        <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-10 space-y-6 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed shadow-2xl">
          <div className="space-y-2 border-b border-zinc-900 pb-5">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Exchange Conditions
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Item must be reported within <strong>7 days</strong> of delivery.</li>
              <li>Garment must be in original unworn, unwashed condition free from stains or scents.</li>
              <li>All original packaging and labels must be included.</li>
              <li>Exchanges are subject to inventory availability in the requested size.</li>
            </ul>
          </div>

          <div className="space-y-2 border-b border-zinc-900 pb-5">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Courier Handling
            </h2>
            <p>
              If an exchange is required due to a verified manufacturing discrepancy or fulfillment error, return courier charges are 100% absorbed by Axivers. For voluntary customer size exchanges, standard domestic courier rates apply.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Need Assistance?
            </h2>
            <p>
              Our concierge team is available Monday to Friday from 9:00 AM to 6:00 PM (Asia/Colombo, UTC+05:30) via <a href="mailto:support@axivers.com" className="text-white underline">support@axivers.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
