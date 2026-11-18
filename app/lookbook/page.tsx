import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lookbook — Campaign Season 01',
  description:
    'Explore the Axivers Editorial Lookbook. Minimalist athletic luxury, contemporary silhouettes, and architectural restraint captured in motion.',
};

export default function LookbookPage() {
  const looks = [
    {
      id: 'look-01',
      title: 'Athletic Tailored Silhouette',
      subtitle: 'Men’s Flagship Crewneck — Onyx Black',
      image: '/images/editorial-men-black.jpg',
      aspect: 'aspect-[3/4]',
      colSpan: 'lg:col-span-7',
      productLink: '/product/flagship-tee-black',
      specs: '180 GSM Mercerized Cotton • Target Price LKR 4,000.00',
      description:
        'Sculpted shoulder lines with a gentle athletic taper, worn with minimalist casual tailoring in contemporary charcoal surroundings.',
    },
    {
      id: 'look-02',
      title: 'The Signature Essential (Flat Lay)',
      subtitle: 'Front View — Onyx Black with Gold Accent',
      image: '/images/flagship-tee-black.jpg',
      aspect: 'aspect-square',
      colSpan: 'lg:col-span-5',
      productLink: '/product/flagship-tee-black',
      specs: 'Tipped Rib Sleeve Cuffs • Gray Rib Crewneck Collar',
      description:
        'Clean garment silhouette featuring contrasting gray rib collar, outer-edge tipped rib cuffs, and small centered reflective metallic-gold logo.',
    },
    {
      id: 'look-03',
      title: 'Architectural Staging',
      subtitle: 'Sculpted Monolith Display',
      image: '/images/editorial-pedestal-black.png',
      aspect: 'aspect-[4/5]',
      colSpan: 'lg:col-span-6',
      productLink: '/product/flagship-tee-black',
      specs: 'Monochrome Palette • Studio Lighting',
      description:
        'A celebration of fabric weight and drape against architectural dark stone, emphasizing the clean form of everyday essentials.',
    },
    {
      id: 'look-04',
      title: 'Contemporary Editorial Styling',
      subtitle: 'Minimalist Urban Context',
      image: '/images/editorial-women-black.png',
      aspect: 'aspect-[4/5]',
      colSpan: 'lg:col-span-6',
      productLink: '/product/flagship-tee-black',
      specs: 'Effortless Drape • Minimalist Luxury',
      description:
        'Refined everyday comfort paired with relaxed tailoring, capturing the versatile character of Axivers foundations.',
    },
    {
      id: 'look-05',
      title: 'Alternative White Colourway Study',
      subtitle: 'Approved Revision Concept',
      image: '/images/flagship-tee-white.jpg',
      aspect: 'aspect-square',
      colSpan: 'lg:col-span-12',
      productLink: '/shop',
      specs: '180 GSM Mercerized Cotton • Clean Metallic Gold Print',
      description:
        'A study in optic white jersey featuring the same reflective metallic-gold logo screen print. Planned for upcoming seasonal capsule releases subject to production verification.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#c5a059] font-mono block">
          Editorial Series &bull; Season 01
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-light tracking-tight uppercase text-white">
          The <span className="font-bold">Axivers Lookbook</span>
        </h1>
        <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-xl mx-auto leading-relaxed">
          An exploration of form, drape, and movement. Documenting everyday essentials refined through athletic luxury and precision Sri Lankan craftsmanship.
        </p>
      </div>

      {/* Editorial Visual Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {looks.map((look) => (
            <div
              key={look.id}
              className={`${look.colSpan} group rounded-3xl overflow-hidden border border-zinc-800/80 bg-[#0a0a0d] shadow-2xl flex flex-col justify-between hover:border-zinc-700 transition-all`}
            >
              <div className={`relative ${look.aspect} w-full overflow-hidden bg-[#09090b]`}>
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6 sm:p-8 space-y-3 border-t border-zinc-900 bg-[#0a0a0d]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="text-base sm:text-lg font-display uppercase tracking-wider font-bold text-white">
                    {look.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#c5a059]">
                    {look.specs}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  {look.subtitle}
                </div>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {look.description}
                </p>
                <div className="pt-2">
                  <Link
                    href={look.productLink}
                    className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider font-semibold text-white hover:text-[#c5a059] transition-colors"
                  >
                    <span>Garment Details</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 text-center border-t border-zinc-900 pt-12 space-y-4 max-w-xl mx-auto">
          <h4 className="text-sm uppercase tracking-[0.2em] font-display font-bold text-white">
            Own Your Axis
          </h4>
          <p className="text-xs text-zinc-400 font-light">
            Register for our private launch registry to receive invitations to inaugural small-batch releases.
          </p>
          <div className="pt-2">
            <Link
              href="/#early-access"
              className="px-7 py-3 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-full hover:bg-zinc-200 transition-colors inline-block"
            >
              Get Early Access
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
