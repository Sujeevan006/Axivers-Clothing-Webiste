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
    category: 'Products & Fabric',
    items: [
      {
        q: 'What is special about the Axivers 60/40 Cotton-Modal blend?',
        a: 'Our signature textile blends 60% combed ring-spun cotton with 40% European beechwood modal. This hybrid gives you cotton’s natural breathability with modal’s silk-soft hand feel, shape retention, and fluid athletic drape that resists pilling and stiffening.',
      },
      {
        q: 'What does 190 GSM mean for a T-shirt?',
        a: 'GSM stands for Grams per Square Meter, measuring fabric density. At 190 GSM, our garments are medium-heavyweight: thick enough to provide zero see-through transparency and structured drape, yet breathable enough for all-day comfort in tropical climates.',
      },
      {
        q: 'Where are Axivers garments manufactured?',
        a: 'All our garments are designed, knitted, cut, and assembled by master garment artisans in Colombo, Sri Lanka—the global center of excellence for technical apparel manufacturing.',
      },
    ],
  },
  {
    category: 'Sizes & Fitting',
    items: [
      {
        q: 'How do Axivers garments fit compared to standard sizes?',
        a: 'Our Flagship Piping and Athletic cuts are tailored with a sculpted shoulder profile and gentle torso taper. If you prefer an oversized or relaxed drape, we recommend ordering one size up. Check our Size Guide for centimetre measurements.',
      },
      {
        q: 'Where can I find exact garment measurements?',
        a: 'You can view full metric and imperial measurements for chest, length, and shoulders on our dedicated Size Guide page or by clicking "Size Guide" on any product detail page.',
      },
    ],
  },
  {
    category: 'Orders & Fulfillment',
    items: [
      {
        q: 'How can I track my order status?',
        a: 'Once your order is confirmed, you receive an SMS and email notification with your order reference number (e.g., AXV-84920). You can enter this on our Track Order page to see real-time fulfillment updates.',
      },
      {
        q: 'Can I cancel or modify an order after placing it?',
        a: 'If your order has not yet been dispatched, our team can modify sizes or delivery addresses. Please contact our support team immediately at support@axivers.com or via WhatsApp.',
      },
    ],
  },
  {
    category: 'Payments & Currency',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Cash on Delivery (COD) across Sri Lanka, direct Bank Transfer, as well as Visa and Mastercard credit/debit cards via secure payment gateways.',
      },
      {
        q: 'What currency are prices displayed in?',
        a: 'All storefront prices are displayed in Sri Lankan Rupees (LKR) inclusive of all applicable local production taxes.',
      },
    ],
  },
  {
    category: 'Delivery & Shipping',
    items: [
      {
        q: 'How long does shipping take within Sri Lanka?',
        a: 'Deliveries within Colombo and suburbs typically arrive within 1 to 2 business days. Outstation deliveries take 2 to 4 business days.',
      },
      {
        q: 'Do you offer free delivery?',
        a: 'Yes! We provide free delivery island-wide across Sri Lanka on all orders above LKR 10,000.00. Standard orders below this amount carry a flat LKR 350.00 courier fee.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 7-day hassle-free exchange window. Garments must be unworn, unwashed, and in original condition with all tags attached.',
      },
      {
        q: 'How do I request a size exchange?',
        a: 'Simply email support@axivers.com with your order number and desired size. Our team will arrange a doorstep replacement or exchange pick-up.',
      },
    ],
  },
  {
    category: 'Account & Website',
    items: [
      {
        q: 'Do I need an account to place an order?',
        a: 'No. You can check out quickly as a guest. Creating an account or saving your details simply makes future checkouts and order history tracking faster.',
      },
      {
        q: 'How is my personal data protected?',
        a: 'We take privacy seriously. Your details are encrypted and never sold to third parties. For full details, review our Privacy Policy.',
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('Products & Fabric');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const toggleQuestion = (q: string) => {
    setOpenQuestion(openQuestion === q ? null : q);
  };

  const currentCategory = FAQ_DATA.find((c) => c.category === activeCategory) || FAQ_DATA[0];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Frequently Asked Questions
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Axivers <span className="font-bold">Help & FAQ</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-lg mx-auto">
            Find immediate answers regarding our 60/40 cotton-modal garments, sizing, island-wide delivery, and return processes.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center border-b border-zinc-800 pb-4">
          {FAQ_DATA.map((cat) => (
            <button
              key={cat.category}
              onClick={() => {
                setActiveCategory(cat.category);
                setOpenQuestion(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-display uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeCategory === cat.category
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-600 hover:text-white'
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Accordion Questions */}
        <div className="space-y-4">
          <h2 className="text-base font-display font-bold uppercase tracking-wider text-white border-b border-zinc-800/80 pb-2">
            {currentCategory.category}
          </h2>

          <div className="space-y-3">
            {currentCategory.items.map((item, idx) => {
              const isOpen = openQuestion === item.q || (idx === 0 && openQuestion === null);
              return (
                <div
                  key={item.q}
                  className="bg-[#111114] border border-zinc-800/80 rounded-2xl overflow-hidden transition-all shadow-md"
                >
                  <button
                    onClick={() => toggleQuestion(item.q)}
                    className="w-full p-5 text-left flex justify-between items-center text-xs sm:text-sm font-display font-semibold text-white hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    <svg
                      className={`w-4 h-4 shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-white' : 'text-zinc-500'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="p-5 pt-0 text-xs sm:text-sm font-light text-zinc-400 leading-relaxed border-t border-zinc-800/60 mt-1">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-base font-display font-bold uppercase text-white">
            Have a Specific Question?
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Our customer service specialists in Colombo are available Monday through Saturday to assist you directly.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors"
            >
              <span>Contact Support</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
