import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fabric & Technology — Axivers Textile Innovation',
  description:
    'Discover the engineering behind the Axivers 60/40 Cotton-Modal textile. 190 GSM balanced weight, cloud-soft drape, natural breathability, and Sri Lankan craftsmanship.',
};

export default function FabricTechnologyPage() {
  const sections = [
    {
      num: '01',
      title: 'The Axivers 60/40 Cotton-Modal Blend',
      desc: 'Our proprietary composite combines long-staple combed cotton with regenerated beechwood modal fibers. The result is a hybrid textile that pairs cotton’s natural breathability and structural integrity with modal’s legendary cloud-soft hand feel and fluid athletic drape.',
      highlight: 'Engineered balance of structure & fluidity',
    },
    {
      num: '02',
      title: 'Combed Ring-Spun Cotton (60%)',
      desc: 'We use exclusively combed ring-spun cotton yarns where short fibers and impurities are removed during processing. This leaves only smooth, uniform parallel fibers that yield exceptional surface softness, natural thermoregulation, and high tensile strength.',
      highlight: 'Ultra-pure combed fibers for enduring durability',
    },
    {
      num: '03',
      title: 'Technical Beechwood Modal (40%)',
      desc: 'Derived from sustainably cultivated European beechwood pulp, modal is a cellulose bio-fiber renowned for its silk-like smooth cross-section. It resists hard water mineral deposits, prevents fiber stiffening, and delivers a drape that conforms naturally without clinging.',
      highlight: 'Silk-like softness that will not stiffen with washing',
    },
    {
      num: '04',
      title: '190 GSM Fabric Structure',
      desc: 'At 190 grams per square meter (GSM), our fabric strikes the sweet spot between structural streetwear presence and athletic breathability. It provides an opaque, structured drape that falls cleanly along the torso without feeling heavy or restricting airflow.',
      highlight: 'Medium-heavy density: zero transparency, sublime weight',
    },
    {
      num: '05',
      title: 'Natural Breathability & Airflow',
      desc: 'The fine-gauge circular knit creates micro-channels between cotton and modal yarns, promoting continuous air circulation. Heat and moisture escape naturally, keeping your skin cool whether in humid tropical heat or air-conditioned metropolitan spaces.',
      highlight: 'Active thermal equilibrium for tropical and temperate climates',
    },
    {
      num: '06',
      title: 'Moisture Management & Quick-Dry Performance',
      desc: 'Modal fibers possess naturally higher moisture absorption capacity than standard cotton. Our blend absorbs perspiration away from the skin surface and disperses it across the textile surface for accelerated atmospheric evaporation.',
      highlight: 'Rapid capillary dispersion keeps you dry throughout the day',
    },
    {
      num: '07',
      title: 'Cloud-Soft Drape & Hand Feel',
      desc: 'The microscopic smoothness of modal filaments prevents the friction common to traditional heavy cotton tees. Every Axivers garment provides a fluid, frictionless drape that moves with you rather than bunching or catching against layers.',
      highlight: 'Frictionless drape designed for uninhibited movement',
    },
    {
      num: '08',
      title: 'Shape Retention & Anti-Warping',
      desc: 'Unlike conventional tees that twist or warp after a single laundry cycle, our 60/40 knit is heat-set and preshrunk during finishing. Side seams remain perpendicular, and our ribbed collars maintain their shape without wrinkling.',
      highlight: 'Heat-set yarn stability retains crisp silhouette wash after wash',
    },
    {
      num: '09',
      title: 'Fabric Construction & Refined Finishing',
      desc: 'Every batch undergoes rigorous bio-polishing and soft-flow dyeing to ensure deep color saturation (such as deep Onyx Black and pure Optic White) with high colorfastness and an ultra-low pilling index.',
      highlight: 'Precision bio-polished surface for rich color depth',
    },
    {
      num: '10',
      title: 'Precision Craftsmanship in Sri Lanka',
      desc: 'Sri Lanka is recognized globally as an epicenter of apparel engineering for premier international brands. Axivers garments are designed, knitted, cut, and assembled by master garment technicians who take pride in ethical craft and obsessive detail.',
      highlight: 'World-renowned Sri Lankan garment engineering',
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24">
      {/* Hero Banner with Textile Macro Background */}
      <div className="relative h-96 sm:h-[480px] w-full overflow-hidden border-b border-zinc-800/80 flex items-center justify-center">
        <Image
          src="/images/fabricbg.png"
          alt="Axivers Fabric Innovation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/50 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Textile Engineering & Science</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight">
            Engineered for Comfort. <br />
            <span className="font-light italic text-zinc-300">Designed for Everyday Luxury.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed tracking-wide pt-2">
            The foundation of every Axivers garment is our proprietary 60/40 Cotton-Modal knit. Discover why this architectural textile redefines what an everyday essential feels like.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Textile Composition At A Glance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 space-y-2 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-display text-zinc-500 block">Ratio Spec</span>
            <div className="text-3xl font-mono font-bold text-white">60 / 40</div>
            <div className="text-xs font-display text-zinc-300 font-medium">Combed Cotton & Beechwood Modal</div>
            <p className="text-xs text-zinc-400 font-light pt-1">
              Engineered equilibrium of breathability, drape, and enduring structure.
            </p>
          </div>

          <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 space-y-2 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-display text-zinc-500 block">Density Weight</span>
            <div className="text-3xl font-mono font-bold text-white">190 GSM</div>
            <div className="text-xs font-display text-zinc-300 font-medium">Optimal Streetwear Drape</div>
            <p className="text-xs text-zinc-400 font-light pt-1">
              Zero see-through transparency with clean vertical fall that holds its shape.
            </p>
          </div>

          <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 space-y-2 shadow-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] font-display text-zinc-500 block">Origin</span>
            <div className="text-3xl font-mono font-bold text-white">Sri Lanka</div>
            <div className="text-xs font-display text-zinc-300 font-medium">Master Garment Engineering</div>
            <p className="text-xs text-zinc-400 font-light pt-1">
              Precision milled, crafted, and hand-finished in Colombo, Sri Lanka.
            </p>
          </div>
        </div>

        {/* 10 Detailed Innovation Sections */}
        <div className="space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto pb-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-display font-semibold block">
              The Ten Pillars of Axivers Textile Quality
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold uppercase text-white">
              Behind The Fabric
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((sec) => (
              <div
                key={sec.num}
                className="bg-[#111114] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-6 sm:p-7 space-y-3 transition-all hover:-translate-y-1 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono font-bold text-zinc-500">
                    {sec.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-wider font-display font-medium text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
                    {sec.highlight}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-display font-bold uppercase tracking-wider text-white">
                  {sec.title}
                </h3>

                <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Macro Feature Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-900 p-8 sm:p-12 lg:p-16">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/fabric-tech-bg.png"
              alt="Fabric Macro Detail"
              fill
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              Experience The Drape
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold tracking-tight text-white uppercase">
              Feel The Difference In Every Movement
            </h2>
            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
              Words only capture part of the story. Put on an Axivers garment and experience how 60/40 cotton-modal feels against your skin in daily wear.
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-white text-black font-display text-xs uppercase tracking-wider font-bold hover:bg-zinc-200 transition-colors"
              >
                <span>Shop The Collection</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
