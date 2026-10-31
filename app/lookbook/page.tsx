import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Lookbook — Axivers Editorial Campaign',
  description:
    'Explore the Axivers Editorial Lookbook. Athletic luxury, contemporary silhouettes, and minimalist streetwear captured in motion.',
};

export default function LookbookPage() {
  const looks = [
    {
      id: 'look-01',
      title: 'Flagship Onyx & Contrast Piping',
      category: "Men's Athletic Silhouette",
      image: '/images/cat-piping-bg.png',
      aspect: 'aspect-[4/5]',
      productName: 'Flagship Contrast Piping Crewneck',
      productLink: '/product/piping-crewneck',
      price: 'LKR 4,250.00',
    },
    {
      id: 'look-02',
      title: 'Optic White Studio Drape',
      category: 'Unisex Signature Cut',
      image: '/images/pdp_white_piping.jpg',
      aspect: 'aspect-[3/4]',
      productName: 'White Piping Crewneck',
      productLink: '/product/white-piping-crewneck',
      price: 'LKR 4,250.00',
    },
    {
      id: 'look-03',
      title: 'Cloud-Soft Modal Feminine Drape',
      category: "Women's Elevated Essentials",
      image: '/images/cat-women-bg.png',
      aspect: 'aspect-[4/5]',
      productName: 'Women’s Cloud-Soft Modal Relaxed Tee',
      productLink: '/product/women-cloud-modal-crewneck',
      price: 'LKR 3,950.00',
    },
    {
      id: 'look-04',
      title: 'Architectural Boxy Heavyweight Cut',
      category: 'Streetwear Structure',
      image: '/images/pdp_boxy_black.jpg',
      aspect: 'aspect-[3/4]',
      productName: 'Minimalist Heavyweight Boxy Tee',
      productLink: '/product/boxy-black-tee',
      price: 'LKR 4,200.00',
    },
    {
      id: 'look-05',
      title: 'Athletic Tailored Shoulders',
      category: "Men's Athletic Movement",
      image: '/images/cat-men-bg.png',
      aspect: 'aspect-[4/5]',
      productName: 'Men’s Athletic Tailored Crewneck',
      productLink: '/product/men-athletic-crewneck',
      price: 'LKR 3,900.00',
    },
    {
      id: 'look-06',
      title: 'Technical Micro-Mesh Active Performance',
      category: 'Contemporary Mobility',
      image: '/images/cat-technical-bg.png',
      aspect: 'aspect-[3/4]',
      productName: 'Technical Athletic Performance Knit',
      productLink: '/product/technical-knit-polo',
      price: 'LKR 4,500.00',
    },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-4">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-display font-semibold block">
          Editorial Campaign • Season 01
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-light tracking-tight uppercase text-white">
          The <span className="font-bold">Axivers Lookbook</span>
        </h1>
        <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-xl mx-auto leading-relaxed">
          An exploration of form, drape, and movement. Documenting everyday essentials refined through athletic luxury and precision tailoring.
        </p>
      </div>

      {/* Masonry / Editorial Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {looks.map((look) => (
            <div
              key={look.id}
              className="group relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-zinc-700 hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className={`relative ${look.aspect} w-full overflow-hidden`}>
                <Image
                  src={look.image}
                  alt={look.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Minimal Overlay Badge */}
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white/90 text-[9px] uppercase tracking-[0.2em] font-display px-2.5 py-1 rounded-full border border-white/10">
                  {look.category}
                </span>
              </div>

              {/* Bottom Caption & Direct Product Pill */}
              <div className="p-5 space-y-3 bg-[#0d0d10] border-t border-zinc-800/80">
                <div>
                  <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white">
                    {look.title}
                  </h3>
                  <p className="text-[11px] text-zinc-400 font-light mt-0.5">
                    {look.productName}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60">
                  <span className="text-xs font-mono font-bold text-white">
                    {look.price}
                  </span>
                  <Link
                    href={look.productLink}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white text-black font-display text-[10px] uppercase tracking-wider font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    <span>Shop Look</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
