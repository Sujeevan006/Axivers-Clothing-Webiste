import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Story — Crafted with Purpose. Designed for Everyday.',
  description:
    'Discover the vision behind Axivers Clothing (Pvt) Ltd. Founded in Colombo, Sri Lanka to create globally competitive everyday apparel through minimalist design and precision craftsmanship.',
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Editorial Dark Hero Banner (Strategic 30% Dark Contrast Element) */}
      <div className="relative h-80 sm:h-96 md:h-[440px] w-full overflow-hidden bg-ink flex items-center justify-center">
        <Image
          src="/images/editorial-men-black.jpg"
          alt="Axivers Brand Story"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-black/30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
            <span>Colombo, Sri Lanka</span>
            <span>&bull;</span>
            <span>Own Your Axis</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-normal normal-case tracking-tight text-paper leading-tight">
            Crafted with Purpose. <br />
            <span className="font-bold text-paper">Designed for Everyday.</span>
          </h1>

          <p className="text-sm sm:text-sm md:text-base font-normal text-zinc-300 max-w-2xl mx-auto leading-relaxed tracking-wide pt-1">
            Axivers was created around a simple belief: the essentials we wear every day deserve thoughtful design, considered materials, and exceptional attention to detail.
          </p>
        </div>
      </div>

      {/* Main Content Sections on Clean Light Background */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 space-y-16 sm:space-y-20">
        {/* Section 1: Origins & Design Philosophy */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-semibold block">
              Origin &amp; Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold normal-case tracking-tight text-ink">
              Elevated Essentials, Defined
            </h2>
            <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
              Axivers Clothing (Pvt) Ltd was founded in Colombo with a focused ambition: to bridge minimalist contemporary fashion aesthetics with the precision engineering of Sri Lankan apparel craftsmanship.
            </p>
            <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
              We reject the cycle of generic fast-fashion and excessive decoration. Instead, we channel our creative focus into perfecting everyday wardrobe foundations — garments defined by considered silhouettes, refined textile choices, and lasting construction integrity.
            </p>
          </div>
          <div className="md:col-span-6 relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 bg-canvas shadow-sm">
            <Image
              src="/images/flagship-tee-black.jpg"
              alt="Axivers Garment Craftsmanship"
              fill
              className="object-contain p-6"
            />
          </div>
        </div>

        {/* Section 2: Own Your Axis & Core Vision (Clean Light Card) */}
        <div className="bg-surface border border-zinc-200 rounded-2xl p-8 sm:p-10 space-y-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <span className="text-sm normal-case tracking-[0.2em] font-mono font-semibold text-accent block">
                Brand Philosophy
              </span>
              <h3 className="text-xl font-display font-bold normal-case text-ink">
                Own Your Axis
              </h3>
              <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
                An axis is a center of balance, rotation, and purpose. &ldquo;Own Your Axis&rdquo; represents self-assurance, clarity, and intentional living. When your wardrobe foundations fit impeccably and feel exceptional, you move through your everyday pursuits with natural poise.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-sm normal-case tracking-[0.2em] font-mono font-semibold text-accent block">
                Our Long-Term Vision
              </span>
              <h3 className="text-xl font-display font-bold normal-case text-ink">
                Internationally Competitive
              </h3>
              <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
                Our vision is to build an apparel brand originating in Sri Lanka that stands shoulder-to-shoulder with global minimalist labels. We measure progress not through rapid volume expansion, but through the uncompromising quality of each garment we release.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Sri Lankan Heritage & Craftsmanship */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-6 order-2 md:order-1 relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 bg-canvas shadow-sm">
            <Image
              src="/images/editorial-pedestal-black.png"
              alt="Precision Craftsmanship"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="md:col-span-6 order-1 md:order-2 space-y-4">
            <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-semibold block">
              Ethical Pedigree
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold normal-case tracking-tight text-ink">
              Sri Lankan Craftsmanship
            </h2>
            <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
              Sri Lanka is internationally renowned for producing apparel of exceptional technical precision for the world’s leading lifestyle and luxury brands, while upholding respected labor standards and responsible manufacturing methods.
            </p>
            <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
              Axivers brings that technical expertise directly to our community. Every garment is cut, assembled, and finished by skilled apparel technicians who treat construction consistency as a matter of pride.
            </p>
          </div>
        </div>

        {/* Section 4: Looking Forward CTA */}
        <div className="border-t border-zinc-200 pt-14 space-y-5 text-center max-w-2xl mx-auto">
          <span className="text-sm normal-case tracking-[0.25em] text-accent font-mono font-semibold block">
            The Journey Ahead
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold normal-case text-ink">
            Experience The Collection
          </h2>
          <p className="text-sm sm:text-sm font-normal text-zinc-600 leading-relaxed">
            We are beginning our journey with a single, thoroughly considered flagship piece — the Men’s Crewneck T-Shirt in 180 GSM mercerized cotton. We invite you to experience the difference thoughtful design makes.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/shop"
              className="px-7 py-3.5 bg-ink text-paper font-display text-sm normal-case tracking-wider font-bold rounded-lg hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Explore Collection
            </Link>
            <Link
              href="/fabric-technology"
              className="px-7 py-3.5 bg-surface border border-zinc-300 text-zinc-800 font-display text-sm normal-case tracking-wider font-medium rounded-lg hover:border-ink transition-colors"
            >
              Fabric &amp; Craftsmanship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}