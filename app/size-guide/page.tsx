import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Size & Measuring Guide — Axivers Essentials',
  description:
    'Axivers official size and measuring guide. Learn how to take accurate body measurements for S, M, L, and XL to ensure an athletic luxury drape.',
};

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Fit &amp; Sizing Specification</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Size &amp; <span className="font-bold">Fit Guide</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Axivers foundations are engineered with tailored athletic proportions. Follow our measurement recommendations below to find your intended fit.
          </p>
        </div>

        {/* Specification Status Note */}
        <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-5 sm:p-6 text-xs font-light text-zinc-300 space-y-2">
          <div className="flex items-center space-x-2 text-[#c5a059] font-mono text-[11px] font-medium uppercase tracking-wider">
            <span>&bull;</span>
            <span>Production Verification Notice</span>
          </div>
          <p className="leading-relaxed">
            The master blueprint confirms initial production sizing in <strong>S, M, L, and XL</strong> for our flagship Men’s Crewneck T-Shirt. Below are standard body measurement recommendations (in centimetres) to guide your size selection. Finalized garment flat-lay dimensions will be published upon approval of initial factory production records.
          </p>
        </div>

        {/* Body Measurement Table */}
        <div className="bg-[#0a0a0d] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-900 pb-4 gap-2">
            <div>
              <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
                Recommended Body Measurements (Centimetres)
              </h2>
              <p className="text-[11px] text-zinc-400">
                Measure directly around your body for the intended athletic tailored fit.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-400 uppercase bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 self-start sm:self-auto">
              Centimetre Standard
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400">
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Target Chest Circumference</th>
                  <th className="py-3 px-3">Shoulder Breadth Reference</th>
                  <th className="py-3 px-3">Intended Fit Character</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60 text-zinc-200">
                <tr>
                  <td className="py-4 px-3 font-bold text-white">S (Small)</td>
                  <td className="py-4 px-3 font-mono">91 – 96 cm</td>
                  <td className="py-4 px-3 font-mono">43 – 44 cm</td>
                  <td className="py-4 px-3 text-zinc-400 font-sans">Athletic Tailored</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 font-bold text-white">M (Medium)</td>
                  <td className="py-4 px-3 font-mono">99 – 104 cm</td>
                  <td className="py-4 px-3 font-mono">45 – 46 cm</td>
                  <td className="py-4 px-3 text-zinc-400 font-sans">Athletic Tailored</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 font-bold text-white">L (Large)</td>
                  <td className="py-4 px-3 font-mono">106 – 111 cm</td>
                  <td className="py-4 px-3 font-mono">47 – 48 cm</td>
                  <td className="py-4 px-3 text-zinc-400 font-sans">Athletic Tailored</td>
                </tr>
                <tr>
                  <td className="py-4 px-3 font-bold text-white">XL (Extra Large)</td>
                  <td className="py-4 px-3 font-mono">114 – 119 cm</td>
                  <td className="py-4 px-3 font-mono">49 – 50 cm</td>
                  <td className="py-4 px-3 text-zinc-400 font-sans">Athletic Tailored</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Measuring Guide: Step-by-Step */}
        <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-900 pb-3">
            <h3 className="text-base font-display font-bold uppercase text-white tracking-wider">
              How to Measure Accurately
            </h3>
            <p className="text-[11px] text-zinc-400">
              Use a flexible tape measure while standing in a relaxed, natural posture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300 font-light">
            <div className="space-y-2 p-4 rounded-2xl bg-[#0e0e12] border border-zinc-900">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block">
                Step 01
              </span>
              <h4 className="font-display uppercase tracking-wider font-bold text-white">
                Chest Measurement
              </h4>
              <p className="leading-relaxed text-zinc-400">
                Wrap the measuring tape horizontally around the fullest part of your chest, keeping the tape level under your arms and across your shoulder blades.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-[#0e0e12] border border-zinc-900">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block">
                Step 02
              </span>
              <h4 className="font-display uppercase tracking-wider font-bold text-white">
                Shoulder Width
              </h4>
              <p className="leading-relaxed text-zinc-400">
                Measure straight across the back from the prominent bone tip of one shoulder (acromion) to the tip of the other shoulder.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-[#0e0e12] border border-zinc-900">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block">
                Step 03
              </span>
              <h4 className="font-display uppercase tracking-wider font-bold text-white">
                Between Sizes?
              </h4>
              <p className="leading-relaxed text-zinc-400">
                If your chest measurement falls on the borderline between two sizes, choose the smaller size for a clean athletic fit, or the larger size for a more relaxed drape.
              </p>
            </div>
          </div>
        </div>

        {/* Distinguishing Body vs Garment Dimensions */}
        <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-6 text-xs text-zinc-400 space-y-2">
          <h4 className="font-display uppercase tracking-wider font-bold text-white text-xs">
            Body Measurements vs. Garment Measurements
          </h4>
          <p className="leading-relaxed">
            Please note that the figures in this guide represent <strong>body dimensions</strong>. Finished garments incorporate design ease (fabric allowance) calibrated for a 180 GSM single jersey knit to achieve a clean drape that does not cling.
          </p>
        </div>

        {/* Concierge Support CTA */}
        <div className="border-t border-zinc-900 pt-8 text-center space-y-3">
          <p className="text-xs text-zinc-400">
            Have questions regarding sizing or fit preference before launch?
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
