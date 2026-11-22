import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Garment Care Guide — Preserving Mercerized Cotton Essentials',
  description:
    'Care guidelines for Axivers 180 GSM mercerized cotton garments. Washing, drying, and ironing recommendations to preserve print and collar shape.',
};

export default function CareGuidePage() {
  const careSections = [
    {
      title: '1. Machine Washing',
      rules: [
        'Turn garments inside out prior to washing to protect the reflective metallic-gold chest print and outer ribbing.',
        'Wash in cold water on a gentle cycle with similar dark colors.',
        'Use mild liquid detergents free from optical brighteners and chlorine bleach.',
        'Avoid overloading the drum to reduce unnecessary friction against the cotton fibers.',
      ],
    },
    {
      title: '2. Drying Protocol',
      rules: [
        'Gently reshape the contrasting gray collar and tipped sleeve cuffs while the garment is damp.',
        'Lay flat to dry in a shaded, well-ventilated area away from direct harsh sunlight.',
        'Avoid high-heat machine tumble drying, which can subject cotton fibers and collar spandex to unnecessary stress.',
        'Do not wring or twist wet garments forcefully.',
      ],
    },
    {
      title: '3. Ironing & Steaming',
      rules: [
        'Garment steaming is recommended to release fabric creases naturally without pressing down on the single jersey knit.',
        'If using a flat iron, use a low-to-medium heat setting.',
        'Always iron the garment inside out, and never apply direct iron heat over the metallic-gold chest print or tagless inner label.',
      ],
    },
    {
      title: '4. Wardrobe Storage',
      rules: [
        'Fold neatly and store in a cool, dry wardrobe.',
        'If hanging, use wide contoured wooden or padded hangers to maintain the sculpted shoulder silhouette.',
        'Avoid hanging damp garments on thin wire hangers.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#060606] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono font-medium block">
            Garment Longevity Protocol
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#060606]">
            Care &amp; Maintenance
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Preserve the lustre, drape, and structural recovery of your 180 GSM mercerized cotton essentials with our recommended care practices.
          </p>
        </div>

        {/* 4 Care Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {careSections.map((sec) => (
            <div
              key={sec.title}
              className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-3 shadow-sm"
            >
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#060606] border-b border-zinc-200 pb-2">
                {sec.title}
              </h3>
              <ul className="space-y-2 text-xs font-light text-zinc-600 leading-relaxed list-disc pl-4">
                {sec.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Note */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 text-xs text-zinc-600 space-y-2 shadow-sm">
          <h4 className="font-display font-bold uppercase text-[#060606]">
            Why Mercerized Cotton Behaves Differently
          </h4>
          <p className="leading-relaxed">
            Mercerization alters the cotton fiber from a kidney-bean cross section to an elliptical, lustrous profile. This finishing process naturally minimizes shrinkage and fiber piling, allowing your garment to retain its smooth hand feel for years when laundered according to these recommendations.
          </p>
        </div>

        {/* Concierge Link */}
        <div className="border-t border-zinc-200 pt-6 text-center space-y-2">
          <p className="text-xs text-zinc-500">
            Have questions regarding stain treatment or garment care?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider font-semibold text-[#060606] underline hover:text-zinc-600 transition-colors"
          >
            <span>Contact Axivers Concierge</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}