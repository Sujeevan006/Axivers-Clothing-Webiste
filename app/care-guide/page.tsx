import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Garment Care Guide — Axivers Clothing',
  description:
    'Master garment care guide for Axivers 60/40 cotton-modal and heavyweight combed cotton. Washing, drying, ironing, and longevity preservation.',
};

export default function CareGuidePage() {
  const careSections = [
    {
      title: '1. Machine Washing',
      icon: '🌊',
      rules: [
        'Always wash in cold water (30°C or below). Hot water breaks down the delicate cellulose filaments of beechwood modal.',
        'Turn garments inside out prior to washing to protect contrast piping, chest embroidery, and outer yarn surface from friction.',
        'Use mild liquid detergents without chlorine bleach or harsh optical brighteners.',
        'Wash with similar dark or optic white colors to prevent dye transfer.',
      ],
    },
    {
      title: '2. Drying Protocol',
      icon: '💨',
      rules: [
        'Do NOT tumble dry on high heat. Excessive tumble drying is the primary cause of fiber shrinkage and seam warping.',
        'Gently reshape the garment while damp, paying close attention to neck ribbing and bottom hemline.',
        'Lay flat to dry on a drying rack or towel in a shaded, well-ventilated area.',
        'Avoid hanging heavy wet garments by thin wire hangers, which can stretch out shoulder seams.',
      ],
    },
    {
      title: '3. Ironing & Steaming',
      icon: '♨️',
      rules: [
        'Modal responds exceptionally well to garment steaming; steam releases creases effortlessly without pressing fibers.',
        'If using a conventional flat iron, set to low or medium heat (cotton/modal blend setting).',
        'Always iron inside out, and avoid direct iron contact on silicone labels, chest prints, and piping seams.',
      ],
    },
    {
      title: '4. Storage & Longevity',
      icon: '👔',
      rules: [
        'Fold garments neatly and store in a clean, dry closet away from direct sunlight.',
        'If hanging, use wide contoured wooden or padded hangers to maintain the sculpted shoulder profile.',
        'Avoid over-stuffing drawers to keep the 190 GSM knit aerated and free from deep pressure creases.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Garment Longevity
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Axivers <span className="font-bold">Care Guide</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-lg mx-auto">
            Our 60/40 cotton-modal blend is engineered for exceptional durability. Follow these simple practices to preserve the cloud-soft hand feel and rich color saturation for years to come.
          </p>
        </div>

        {/* 4 Pillars of Care */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careSections.map((sec) => (
            <div
              key={sec.title}
              className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{sec.icon}</span>
                <h3 className="text-base font-display font-bold uppercase text-white tracking-wider">
                  {sec.title}
                </h3>
              </div>

              <ul className="space-y-2.5 text-xs text-zinc-300 font-light leading-relaxed">
                {sec.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-zinc-500 font-mono text-[10px] mt-0.5">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Reference Table */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-4 text-xs font-light text-zinc-300">
          <h3 className="text-base font-display font-bold uppercase text-white tracking-wider">
            Quick Care Symbols Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-lg">30°C</span>
              <div className="font-display font-semibold text-white text-[11px]">Cold Wash</div>
              <p className="text-[10px] text-zinc-500">Max 30°C gentle cycle</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-lg">🚫</span>
              <div className="font-display font-semibold text-white text-[11px]">Do Not Bleach</div>
              <p className="text-[10px] text-zinc-500">Preserves modal bio-fibers</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-lg">☁️</span>
              <div className="font-display font-semibold text-white text-[11px]">Flat Dry</div>
              <p className="text-[10px] text-zinc-500">Dry flat in shade</p>
            </div>
            <div className="p-4 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-1">
              <span className="text-lg">🌡️</span>
              <div className="font-display font-semibold text-white text-[11px]">Low Iron</div>
              <p className="text-[10px] text-zinc-500">Iron inside out on low heat</p>
            </div>
          </div>
        </div>

        {/* Explore Fabric Link */}
        <div className="text-center pt-4">
          <Link
            href="/fabric-technology"
            className="inline-flex items-center space-x-2 text-xs font-display uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
          >
            <span>Learn More About Our 60/40 Cotton-Modal Technology</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
