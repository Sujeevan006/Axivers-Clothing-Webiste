import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story — Axivers Clothing',
  description:
    'The story behind Axivers Clothing (Pvt) Ltd. Born in Colombo, Sri Lanka. Redefining everyday luxury with 60/40 cotton-modal engineering and architectural essentials.',
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24">
      {/* Editorial Hero Banner */}
      <div className="relative h-96 sm:h-[480px] w-full overflow-hidden border-b border-zinc-800/80 flex items-center justify-center">
        <Image
          src="/images/HeroBg.png"
          alt="Axivers Brand Story"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/50 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display">
            <span>Colombo, Sri Lanka</span>
            <span>•</span>
            <span>Est. 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight text-white uppercase leading-tight">
            Elevated Essentials. <br />
            <span className="font-light italic text-zinc-300">Crafted in Sri Lanka.</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-light text-zinc-300 max-w-2xl mx-auto leading-relaxed tracking-wide pt-2">
            Axivers was born from a singular conviction: the garments you wear most frequently should be engineered with the highest degree of textile innovation, precision tailoring, and uncompromised comfort.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-20">
        {/* Section 1: About Axivers & Brand Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              About Axivers
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
              Redefining Everyday Luxury
            </h2>
            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
              Axivers Clothing (Pvt) Ltd is an athletic-luxury apparel house founded on the principle that everyday garments should never be ordinary. We reject the fast-fashion cycle of disposable fabrics, warped collars, and fleeting gimmicks.
            </p>
            <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
              Instead, we construct enduring wardrobe foundations that bridge modern athletic performance with minimalist streetwear aesthetic. Every silhouette is tested for movement, drape, and long-term durability.
            </p>
          </div>
          <div className="md:col-span-6 relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <Image
              src="/images/pdp_front.jpg"
              alt="Axivers Garment Craftsmanship"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>

        {/* Section 2: Our Vision & Why Everyday Essentials */}
        <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-display font-semibold text-zinc-400 block">
                Our Vision
              </span>
              <h3 className="text-xl font-display font-bold uppercase text-white">
                Global Appeal, Island Craft
              </h3>
              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
                To establish a contemporary apparel brand that showcases Sri Lanka’s world-class garment manufacturing heritage on the global stage, proving that local craftsmanship can sit proudly alongside the world’s leading lifestyle brands.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.2em] font-display font-semibold text-zinc-400 block">
                Why Everyday Essentials?
              </span>
              <h3 className="text-xl font-display font-bold uppercase text-white">
                The Pieces That Define Your Day
              </h3>
              <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
                Most wardrobes are built on T-shirts, crewnecks, and base layers. If these core garments don’t feel sublime or drape cleanly, nothing else matters. We put 100% of our energy into perfecting the essentials you live in.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Sri Lankan Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 order-2 md:order-1 relative aspect-square rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
            <Image
              src="/images/pdp_detail.jpg"
              alt="Precision Piping & Construction"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              Heritage of Excellence
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-white">
              Sri Lankan Craftsmanship
            </h2>
            <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
              Sri Lanka has earned international acclaim as the world’s most trusted hub for technical apparel manufacturing, engineering performance garments for the world’s premier sporting and luxury houses.
            </p>
            <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
              Axivers brings that exact pedigree of precision directly to local and international consumers. From custom knit tension to contrast-inserted piping and clean twin-needle stitching, our garments are crafted by master artisans who value quality over volume.
            </p>
          </div>
        </div>

        {/* Section 4: Our Approach to Modern Fashion */}
        <div className="border-t border-zinc-800/80 pt-16 space-y-8 text-center max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
            The Axivers Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase text-white">
            Form, Fabric & Function In Harmony
          </h2>
          <p className="text-xs sm:text-sm font-light text-zinc-300 leading-relaxed">
            We measure success not by the number of designs we release, but by how long each garment remains your first choice when you open your wardrobe. Discover the feeling of true athletic luxury.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/shop"
              className="px-7 py-3.5 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-zinc-200 transition-colors"
            >
              Shop The Collection
            </Link>
            <Link
              href="/fabric-technology"
              className="px-7 py-3.5 bg-zinc-900 border border-zinc-800 text-white font-display text-xs uppercase tracking-wider font-medium rounded-xl hover:border-zinc-600 transition-colors"
            >
              Learn About Our Fabric
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
