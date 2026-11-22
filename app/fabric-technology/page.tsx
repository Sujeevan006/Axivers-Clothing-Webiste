import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fabric & Craftsmanship — Mercerized Cotton Innovation',
  description:
    'Discover the considered materials and construction behind Axivers everyday essentials. 180 GSM mercerized cotton, contrasting gray ribbing, tipped sleeve cuffs, and Sri Lankan craftsmanship.',
};

export default function FabricTechnologyPage() {
  const sections = [
    {
      num: '01',
      title: 'Mercerized Cotton',
      subtitle: 'Surface Lustre & Smooth Hand Feel',
      desc: 'The flagship Axivers T-shirt is crafted from 100% combed long-staple cotton subjected to precision mercerization. This specialized finishing process aligns the cellulose structure, removes protruding micro-fibers, and flattens the yarn profile. The result is a distinctly smooth hand feel, enriched dye depth, and a subtle natural lustre that elevates the garment beyond standard cotton jerseys.',
      highlight: 'Engineered smooth surface with natural low-sheen finish',
    },
    {
      num: '02',
      title: 'Fabric Weight (180 GSM)',
      subtitle: 'Substantial Yet Breathable Single Jersey',
      desc: 'At 180 grams per square meter (GSM), this single jersey knit strikes a calibrated balance between structural presence and warm-climate breathability. It provides an opaque, clean drape along the body without feeling excessively heavy, stiff, or trapping unnecessary heat.',
      highlight: '180 GSM single jersey: non-sheer drape without excessive weight',
    },
    {
      num: '03',
      title: 'Silhouette and Drape',
      subtitle: 'Refined Everyday Fit, Not Boxy Streetwear',
      desc: 'Designed around contemporary athletic-luxury proportions rather than an exaggeratedly oversized or heavy streetwear cut. The shoulder seam is tailored cleanly to sit at the natural acromion point, tapering gently through the torso to provide a relaxed yet composed silhouette.',
      highlight: 'Sculpted athletic luxury drape designed for daily confidence',
    },
    {
      num: '04',
      title: 'Collar Construction',
      subtitle: 'Contrasting Gray Rib with Spandex Recovery',
      desc: 'The crewneck collar features a contrasting premium gray rib-knit in a 1×1 or 2×2 construction, fortified with 3–5% spandex. This structural blend ensures immediate shape recovery after wear and laundering, preventing the unsightly collar ripples commonly found in mass-market tees.',
      highlight: '3–5% spandex collar integration for enduring shape retention',
    },
    {
      num: '05',
      title: 'Signature Sleeve Detail',
      subtitle: 'Yarn-Dyed Tipped Ribbing with Outer White Stripe',
      desc: 'The sleeve cuffs feature premium black yarn-dyed tipped ribbing with a single crisp white stripe engineered strictly at the absolute outer edge of each cuff. Unlike manually inserted piping, this yarn-dyed construction lies completely flat against the arm without stiffness or interior bulk.',
      highlight: 'Crisp white outer stripe on tipped ribbing; no inserted piping',
    },
    {
      num: '06',
      title: 'Branding and Finishing',
      subtitle: 'Reflective Metallic-Gold Screen Print & Tagless Marking',
      desc: 'Chest branding features the exact lowercase "axivers" wordmark rendered in a restrained, small metallic-gold reflective screen print. Inside the neck, a tagless heat-transfer label provides verified size and care information, eliminating friction against the nape of the neck.',
      highlight: 'Metallic-gold reflective print & tagless interior comfort',
    },
    {
      num: '07',
      title: 'Sri Lankan Craftsmanship',
      subtitle: 'Ethical Engineering & Global Pedigree',
      desc: 'Axivers garments are engineered and manufactured in Colombo, Sri Lanka. Sri Lanka’s apparel industry is celebrated internationally for ethical manufacturing practices, progressive labor standards, and technical garment mastery for leading world luxury houses.',
      highlight: 'Made in Sri Lanka, global quality standards',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#060606]">
      {/* Editorial Dark Header Banner (Strategic 30% Dark Contrast Element) */}
      <div className="relative h-80 sm:h-96 md:h-[440px] w-full overflow-hidden bg-[#060606] flex items-center justify-center">
        <Image
          src="/images/flagship-tee-black.jpg"
          alt="Axivers Fabric & Craftsmanship"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060606]/90 via-[#060606]/40 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Materials &amp; Construction</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-tight text-white leading-tight">
            Refined from <span className="font-bold">The Fibre.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed tracking-wide pt-1">
            Discover the materials and considered construction behind Axivers everyday essentials.
          </p>
        </div>
      </div>

      {/* Main Content Sections on Clean Light Background */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16">
        {/* Specification Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a059] block">
              Fiber Base
            </span>
            <div className="text-lg font-display font-bold uppercase text-[#060606]">
              100% Mercerized Cotton
            </div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Long-staple combed cotton treated to maximize surface smoothness, tensile strength, and color depth.
            </p>
          </div>

          <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a059] block">
              Knit Weight
            </span>
            <div className="text-lg font-display font-bold uppercase text-[#060606]">
              180 GSM Single Jersey
            </div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Optimized medium density that drapes cleanly without sheer transparency or unnecessary heat retention.
            </p>
          </div>

          <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 space-y-2 shadow-sm">
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#c5a059] block">
              Origin
            </span>
            <div className="text-lg font-display font-bold uppercase text-[#060606]">
              Crafted in Sri Lanka
            </div>
            <p className="text-xs text-zinc-600 font-light leading-relaxed">
              Milled, tailored, and inspected in Colombo, upholding global apparel engineering benchmarks.
            </p>
          </div>
        </div>

        {/* Detailed 7 Pillars Matrix */}
        <div className="space-y-6">
          <div className="border-b border-zinc-200 pb-4">
            <h2 className="text-lg sm:text-xl font-display font-bold uppercase tracking-wider text-[#060606]">
              Construction Specifications &amp; Material Story
            </h2>
            <p className="text-xs text-zinc-500 font-light">
              Documented design targets and material specifications for our inaugural flagship garment.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {sections.map((sec) => (
              <div
                key={sec.num}
                className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-3 hover:border-zinc-300 transition-colors shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-200/80 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-xs font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2.5 py-0.5 rounded border border-[#c5a059]/30">
                      {sec.num}
                    </span>
                    <h3 className="text-base sm:text-lg font-display uppercase tracking-wider font-bold text-[#060606]">
                      {sec.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-zinc-500">
                    {sec.subtitle}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-light text-zinc-600 leading-relaxed pt-1">
                  {sec.desc}
                </p>

                <div className="pt-1 flex items-center space-x-2 text-[11px] font-mono text-[#c5a059]">
                  <span>&bull;</span>
                  <span>{sec.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="border-t border-zinc-200 pt-12 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-[#060606]">
            Experience Considered Quality
          </h3>
          <p className="text-xs sm:text-sm font-light text-zinc-500 max-w-md mx-auto">
            Discover how considered construction and refined materials redefine your everyday wardrobe.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/product/flagship-tee-black"
              className="px-7 py-3.5 bg-[#060606] text-white font-display text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-sm"
            >
              View Flagship Garment
            </Link>
            <Link
              href="/our-story"
              className="px-7 py-3.5 bg-white border border-zinc-300 text-zinc-800 font-display text-xs uppercase tracking-wider font-medium rounded-lg hover:border-black transition-colors"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}