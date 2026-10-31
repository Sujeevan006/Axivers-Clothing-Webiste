import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Size & Fit Guide — Axivers Clothing',
  description:
    'Axivers official garment sizing and measurement guide. Centimetres and inches for Men and Women, how to measure, and fit explanations.',
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Precision Fitting
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Axivers <span className="font-bold">Size & Fit Guide</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-lg mx-auto">
            All Axivers garments are engineered to international athletic luxury standards with tailored proportions. Refer to the measurements below to find your ideal fit.
          </p>
        </div>

        {/* Fit Profiles Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold">
              Fit Profile 01
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Tailored Athletic Fit
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Found on our Flagship Piping Crewnecks and Technical Polos. Fitted cleanly across the chest and shoulders with an athletic taper down to the waist. Size up if you prefer a looser drape.
            </p>
          </div>

          <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 space-y-2">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-display font-semibold">
              Fit Profile 02
            </span>
            <h3 className="text-base font-display font-bold uppercase text-white">
              Minimalist Boxy Fit
            </h3>
            <p className="text-xs text-zinc-400 font-light leading-relaxed">
              Found on our 240 GSM Heavyweight Tees. Features dropped shoulders, generous chest width, and a structured vertical drape that does not cling to the torso. True to size for intentional streetwear drape.
            </p>
          </div>
        </div>

        {/* Men's Size Table */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
                Men&apos;s Garment Measurements (Centimetres)
              </h2>
              <p className="text-[11px] text-zinc-500">Standard Sri Lankan & International sizing</p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
              Tolerance: ±1.0 cm
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3 px-2">Size</th>
                  <th className="py-3 px-2">Chest (Around)</th>
                  <th className="py-3 px-2">Length</th>
                  <th className="py-3 px-2">Shoulder Width</th>
                  <th className="py-3 px-2">Sleeve Length</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">S (Small)</td>
                  <td className="py-3.5 px-2">96 - 100 cm</td>
                  <td className="py-3.5 px-2">70 cm</td>
                  <td className="py-3.5 px-2">44 cm</td>
                  <td className="py-3.5 px-2">20 cm</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">M (Medium)</td>
                  <td className="py-3.5 px-2">101 - 106 cm</td>
                  <td className="py-3.5 px-2">72 cm</td>
                  <td className="py-3.5 px-2">46 cm</td>
                  <td className="py-3.5 px-2">21 cm</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">L (Large)</td>
                  <td className="py-3.5 px-2">107 - 112 cm</td>
                  <td className="py-3.5 px-2">74 cm</td>
                  <td className="py-3.5 px-2">48 cm</td>
                  <td className="py-3.5 px-2">22 cm</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">XL (Extra Large)</td>
                  <td className="py-3.5 px-2">113 - 118 cm</td>
                  <td className="py-3.5 px-2">76 cm</td>
                  <td className="py-3.5 px-2">50 cm</td>
                  <td className="py-3.5 px-2">23 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Women's Size Table */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
                Women&apos;s Garment Measurements (Centimetres)
              </h2>
              <p className="text-[11px] text-zinc-500">Relaxed cloud-modal cut</p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800">
              Tolerance: ±1.0 cm
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3 px-2">Size</th>
                  <th className="py-3 px-2">Bust / Chest</th>
                  <th className="py-3 px-2">Length</th>
                  <th className="py-3 px-2">Shoulder Width</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">S (UK 6 - 8)</td>
                  <td className="py-3.5 px-2">88 - 92 cm</td>
                  <td className="py-3.5 px-2">64 cm</td>
                  <td className="py-3.5 px-2">40 cm</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">M (UK 10 - 12)</td>
                  <td className="py-3.5 px-2">93 - 98 cm</td>
                  <td className="py-3.5 px-2">66 cm</td>
                  <td className="py-3.5 px-2">42 cm</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">L (UK 14)</td>
                  <td className="py-3.5 px-2">99 - 104 cm</td>
                  <td className="py-3.5 px-2">68 cm</td>
                  <td className="py-3.5 px-2">44 cm</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-2 font-bold text-white">XL (UK 16)</td>
                  <td className="py-3.5 px-2">105 - 110 cm</td>
                  <td className="py-3.5 px-2">70 cm</td>
                  <td className="py-3.5 px-2">46 cm</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How To Measure Guide */}
        <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6">
          <h3 className="text-base font-display font-bold uppercase text-white tracking-wider">
            How to Measure Your Body Correctly
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300 font-light leading-relaxed">
            <div className="space-y-2">
              <div className="font-display font-bold uppercase text-white text-[11px]">
                1. Chest / Bust
              </div>
              <p>
                Run a flexible measuring tape horizontally under your armpits across the fullest part of your chest. Keep the tape parallel to the floor without pulling taut.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-display font-bold uppercase text-white text-[11px]">
                2. Body Length
              </div>
              <p>
                Measure straight down from the highest point of the shoulder seam next to the neck collar to the bottom hemline of the garment.
              </p>
            </div>
            <div className="space-y-2">
              <div className="font-display font-bold uppercase text-white text-[11px]">
                3. Shoulder Width
              </div>
              <p>
                Measure across the back from the edge of the left shoulder seam directly across to the edge of the right shoulder seam.
              </p>
            </div>
          </div>
        </div>

        {/* Assistance CTA */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-xs text-zinc-400">
            Still unsure about your ideal size? Our Colombo sizing team is happy to advise.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider text-white underline hover:text-zinc-300"
          >
            <span>Speak with our Sizing Specialist</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
