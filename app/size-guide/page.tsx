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
    <div className="min-h-screen bg-white text-[#060606] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono font-medium block">
            Fit &amp; Sizing Specification
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#060606]">
            Size &amp; Fit Guide
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Axivers foundations are engineered with tailored athletic proportions. Follow our measurement recommendations below to find your intended fit.
          </p>
        </div>

        {/* Specification Status Note */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-xl p-5 sm:p-6 text-xs font-light text-zinc-700 space-y-1 shadow-sm">
          <div className="flex items-center space-x-2 text-[#c5a059] font-mono text-[11px] font-medium uppercase tracking-wider">
            <span>&bull;</span>
            <span>Production Sizing Notice</span>
          </div>
          <p className="leading-relaxed">
            Initial production sizing is confirmed in <strong>S, M, L, and XL</strong> for our flagship Men’s Crewneck T-Shirt. Below are standard body measurement recommendations (in centimetres) to guide your size selection.
          </p>
        </div>

        {/* Body Measurement Table */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 pb-4 gap-2">
            <div>
              <h2 className="text-sm font-display font-bold uppercase text-[#060606] tracking-wider">
                Recommended Body Measurements (Centimetres)
              </h2>
              <p className="text-[11px] text-zinc-500">
                Measure directly around your body for the intended athletic tailored fit.
              </p>
            </div>
            <span className="text-[10px] font-mono text-zinc-600 uppercase bg-white px-3 py-1 rounded-full border border-zinc-200 self-start sm:self-auto">
              Centimetre Standard
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-zinc-200 text-zinc-500">
                  <th className="py-3 px-3">Size</th>
                  <th className="py-3 px-3">Target Chest Circumference</th>
                  <th className="py-3 px-3">Shoulder Breadth Reference</th>
                  <th className="py-3 px-3">Intended Fit Character</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                <tr>
                  <td className="py-3.5 px-3 font-bold text-black">S (Small)</td>
                  <td className="py-3.5 px-3 font-mono">91 – 96 cm</td>
                  <td className="py-3.5 px-3 font-mono">43 – 44 cm</td>
                  <td className="py-3.5 px-3 text-zinc-600 font-sans">Athletic Tailored</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-black">M (Medium)</td>
                  <td className="py-3.5 px-3 font-mono">99 – 104 cm</td>
                  <td className="py-3.5 px-3 font-mono">45 – 46 cm</td>
                  <td className="py-3.5 px-3 text-zinc-600 font-sans">Athletic Tailored</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-black">L (Large)</td>
                  <td className="py-3.5 px-3 font-mono">106 – 111 cm</td>
                  <td className="py-3.5 px-3 font-mono">47 – 48 cm</td>
                  <td className="py-3.5 px-3 text-zinc-600 font-sans">Athletic Tailored</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-black">XL (Extra Large)</td>
                  <td className="py-3.5 px-3 font-mono">114 – 119 cm</td>
                  <td className="py-3.5 px-3 font-mono">49 – 50 cm</td>
                  <td className="py-3.5 px-3 text-zinc-600 font-sans">Athletic Tailored</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Measuring Guide: Step-by-Step */}
        <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
          <div className="border-b border-zinc-200 pb-3">
            <h3 className="text-sm font-display font-bold uppercase text-[#060606] tracking-wider">
              How to Measure Accurately
            </h3>
            <p className="text-[11px] text-zinc-500">
              Use a flexible tape measure while standing in a relaxed, natural posture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-zinc-700 font-light">
            <div className="space-y-2 p-4 rounded-xl bg-white border border-zinc-200">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block font-medium">
                Step 01
              </span>
              <h4 className="font-display uppercase tracking-wider font-bold text-[#060606]">
                Chest Measurement
              </h4>
              <p className="leading-relaxed text-zinc-600">
                Wrap the measuring tape horizontally around the fullest part of your chest, keeping the tape level under your arms and across your shoulder blades.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white border border-zinc-200">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block font-medium">
                Step 02
              </span>
              <h4 className="font-display uppercase tracking-wider font-bold text-[#060606]">
                Shoulder Width
              </h4>
              <p className="leading-relaxed text-zinc-600">
                Measure straight across the back from the prominent bone tip of one shoulder (acromion) to the tip of the other shoulder.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-xl bg-white border border-zinc-200">
              <span className="text-[10px] font-mono text-[#c5a059] uppercase block font-medium">
                Step 03
              </span>
              <h4 className="font-display uppercase tracking-wider font-bold text-[#060606]">
                Between Sizes?
              </h4>
              <p className="leading-relaxed text-zinc-600">
                If your chest measurement falls on the borderline between two sizes, choose the smaller size for a clean athletic fit, or the larger size for a relaxed drape.
              </p>
            </div>
          </div>
        </div>

        {/* Concierge Support CTA */}
        <div className="border-t border-zinc-200 pt-6 text-center space-y-2">
          <p className="text-xs text-zinc-500">
            Have questions regarding sizing or fit preference?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider font-semibold text-[#060606] underline hover:text-zinc-600 transition-colors"
          >
            <span>Contact Axivers Concierge</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}