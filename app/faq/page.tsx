'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

const FAQ_DATA: FAQCategory[] = [
  {
    category: 'Flagship Garment & Fabric',
    items: [
      {
        q: 'What is 180 GSM Mercerized Cotton?',
        a: 'Our flagship single jersey knit is crafted from 100% combed long-staple cotton treated through precision mercerization. This process flattens the yarn structure, removing micro-fuzz to create a silky, smooth surface texture, enhanced dye depth, and a fluid, breathable drape at a balanced 180 GSM weight.',
      },
      {
        q: 'What makes the collar construction distinctive?',
        a: 'The crewneck collar features a contrasting premium gray rib-knit in a 1×1 or 2×2 construction integrated with 3–5% spandex. This gives the collar structural shape recovery, ensuring the neckline lies flat and retains its shape wash after wash without rippling.',
      },
      {
        q: 'How are the sleeve cuffs detailed?',
        a: 'The cuffs feature black yarn-dyed tipped ribbing with a single crisp white stripe engineered strictly at the absolute outer edge of each cuff. It is seamlessly integrated without manually inserted piping, avoiding interior seam stiffness.',
      },
      {
        q: 'Where are Axivers essentials manufactured?',
        a: 'All Axivers garments are designed, cut, assembled, and inspected in Colombo, Sri Lanka—drawing upon the island’s world-class reputation for apparel engineering and ethical labor standards.',
      },
    ],
  },
  {
    category: 'Sizes & Fitting',
    items: [
      {
        q: 'What sizes are available for the initial launch?',
        a: 'The initial flagship release is confirmed in S, M, L, and XL. Refer to our Size Guide for body measurement recommendations in centimetres.',
      },
      {
        q: 'How does the flagship T-shirt fit?',
        a: 'The garment is designed around a refined athletic luxury silhouette—tailored across the shoulders and upper chest with comfortable ease through the torso. It is not an exaggeratedly oversized or heavy streetwear cut.',
      },
    ],
  },
  {
    category: 'Orders & Launch Access',
    items: [
      {
        q: 'How does the prelaunch early-access registry work?',
        a: 'Prior to public inventory release, customers can register their email on the product or launch sections. Registered members receive private notification as soon as inventory for their size is released for ordering.',
      },
      {
        q: 'How can I track my order once placed?',
        a: 'Once your order is verified and dispatched, you will receive an email and SMS confirmation containing your order reference number. You can check real-time progress on our Track Order page.',
      },
    ],
  },
  {
    category: 'Payments & Shipping',
    items: [
      {
        q: 'What payment methods are supported in Sri Lanka?',
        a: 'We accept Cash on Delivery (COD) across major postal codes in Sri Lanka, direct Bank Transfer, as well as Visa and Mastercard credit and debit cards.',
      },
      {
        q: 'What are the delivery timelines and charges?',
        a: 'Standard island-wide shipping is flat rate LKR 350.00. We offer complimentary free shipping on all orders valued above LKR 10,000.00. Delivery to Colombo and surrounding suburbs typically takes 1 to 2 business days; outstation regions take 2 to 4 business days.',
      },
      {
        q: 'What is your exchange policy?',
        a: 'We provide a 7-day exchange window for unworn, unwashed garments in their original condition with all branding and packaging intact.',
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Flagship Garment & Fabric');
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(0);

  const currentCategory = FAQ_DATA.find((c) => c.category === activeCategory) || FAQ_DATA[0];

  return (
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Frequently Asked <span className="font-bold">Questions</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Find answers regarding our master textile specifications, initial launch, ordering procedures, and shipping policies.
          </p>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-zinc-900 pb-6">
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategory(cat.category);
                setOpenQuestionIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-display uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.category
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4">
          {currentCategory.items.map((item, idx) => {
            const isOpen = openQuestionIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenQuestionIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex justify-between items-center space-x-4 cursor-pointer hover:bg-zinc-900/40 transition-colors"
                >
                  <span className="text-sm font-display font-semibold uppercase tracking-wider text-white">
                    {item.q}
                  </span>
                  <span className="text-lg text-zinc-400 font-mono shrink-0">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm font-light text-zinc-300 leading-relaxed border-t border-zinc-900 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Link */}
        <div className="border-t border-zinc-900 pt-8 text-center space-y-3">
          <p className="text-xs text-zinc-400">
            Have a question that is not addressed here?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider font-semibold text-white underline hover:text-[#c5a059] transition-colors"
          >
            <span>Inquire Directly with Concierge</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
