'use client';

import React from 'react';

const CRAFT_HIGHLIGHTS = [
  {
    number: '01',
    title: 'Contrasting Gray Rib Collar',
    subtitle: 'Shape Recovery & Subtle Nuance',
    description:
      'Engineered with a 1×1 or 2×2 rib construction integrated with 3–5% spandex. This contrasting gray rib-knit collar provides structural resilience, ensuring the neckline returns to shape wear after wear without baconing or sagging.',
  },
  {
    number: '02',
    title: 'Outer-Edge Tipped Rib Cuffs',
    subtitle: 'Crisp Yarn-Dyed Edge Finish',
    description:
      'Featuring premium black yarn-dyed tipped ribbing with a single crisp white stripe placed strictly at the absolute outer edge of each sleeve cuff. Cleanly integrated without bulky inserted piping for a sleek, architectural finish.',
  },
  {
    number: '03',
    title: 'Reflective Metallic-Gold Chest Print',
    subtitle: 'Subtle Signature Restraint',
    description:
      'The exact lowercase "axivers" wordmark is screen printed in small, centered proportions across the chest using reflective metallic-gold pigment. Catching light subtly while remaining minimal and understated.',
  },
  {
    number: '04',
    title: 'Tagless Heat-Transfer Label',
    subtitle: 'Frictionless Comfort & Identification',
    description:
      'Scratch-free neck interior featuring a clean heat-transfer label with verified size marking, care guidelines, and proud Made in Sri Lanka identification. The back panel remains completely solid and plain.',
  },
];

export const CraftsmanshipDetails: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-ink text-paper border-b border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Garment Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-normal normal-case tracking-tight text-paper">
            Considered <span className="font-bold">Construction Details.</span>
          </h2>
          <p className="text-sm sm:text-sm font-normal text-zinc-400">
            Every stitch, edge, and ribbing tension is calibrated according to our master production specifications.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CRAFT_HIGHLIGHTS.map((item) => (
            <div
              key={item.number}
              className="bg-ink border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl hover:border-zinc-700 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-sm font-mono font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20 inline-block">
                  {item.number}
                </span>
                <h3 className="text-sm font-display normal-case tracking-wider font-bold text-paper">
                  {item.title}
                </h3>
                <h4 className="text-sm font-mono text-zinc-400 font-normal">
                  {item.subtitle}
                </h4>
                <p className="text-sm text-zinc-400 font-normal leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
