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
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Garment Longevity</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Axivers <span className="font-bold">Care Guide</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Follow these considered practices to preserve the smooth hand feel, collar resilience, and metallic-gold finish of your Axivers essentials.
          </p>
        </div>

        {/* 4 Pillars of Care */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {careSections.map((sec) => (
            <div
              key={sec.title}
              className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-7 space-y-4 shadow-xl"
            >
              <h3 className="text-base font-display font-bold uppercase text-white tracking-wider border-b border-zinc-900 pb-2">
                {sec.title}
              </h3>

              <ul className="space-y-2.5 text-xs text-zinc-300 font-light leading-relaxed">
                {sec.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-[#c5a059] font-mono text-[11px] mt-0.5">&bull;</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Care Guidance Notice */}
        <div className="bg-[#0a0a0d] border border-zinc-800/80 rounded-2xl p-6 text-xs text-zinc-400 space-y-2">
          <h4 className="font-display uppercase tracking-wider font-bold text-white text-xs">
            Approved Fabric Care Standards
          </h4>
          <p className="leading-relaxed">
            These guidelines represent best practices for 180 GSM mercerized cotton single jersey knit and reflective metallic-gold screen prints. Always check the tagless heat-transfer label printed inside your garment for specific care symbols.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="border-t border-zinc-900 pt-8 text-center space-y-3">
          <p className="text-xs text-zinc-400">
            Need further guidance regarding textile maintenance?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider font-semibold text-white underline hover:text-[#c5a059] transition-colors"
          >
            <span>Contact Axivers Concierge</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
