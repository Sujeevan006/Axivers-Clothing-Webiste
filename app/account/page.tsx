'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-white text-[#060606] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#777777] font-semibold block">
            Customer Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-light uppercase tracking-tight text-[#060606]">
            Axivers <span className="font-bold">Client Account</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-[#777777]">
            Access your order history, delivery status, and saved address information.
          </p>
        </div>

        {/* Quick Order Lookup Form */}
        <div className="bg-[#f6f6f6] border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-display font-bold uppercase text-[#060606] tracking-wider">
              Quick Order Access
            </h2>
            <p className="text-xs text-[#777777] font-light">
              Enter your order reference and registered phone number to view live fulfillment updates.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (orderNumber.trim()) {
                window.location.href = `/track-order?orderNumber=${encodeURIComponent(orderNumber.trim())}&phone=${encodeURIComponent(phone.trim())}`;
              }
            }}
            className="space-y-4"
          >
            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#777777]">
                Order Reference Number *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. AXV-84920"
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-[#060606] placeholder-zinc-400 focus:outline-none focus:border-black font-mono uppercase transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-semibold tracking-wider text-[#777777]">
                Registered Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 077 123 4567"
                className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-[#060606] placeholder-zinc-400 focus:outline-none focus:border-black font-mono transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#060606] text-white font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Lookup Order Details &rarr;
            </button>
          </form>
        </div>

        {/* Benefits of Client Account */}
        <div className="bg-[#f6f6f6] border border-zinc-200 rounded-2xl p-6 space-y-4 text-xs font-light text-[#777777]">
          <h3 className="text-xs uppercase tracking-wider font-display font-bold text-[#060606]">
            Client Services & Privileges
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-[#060606]">•</span>
              <span>Priority dispatch for verified client accounts.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[#060606]">•</span>
              <span>7-day instant doorstep exchange service in Colombo.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-[#060606]">•</span>
              <span>Invitations to limited-run 180 GSM mercerized cotton seasonal drops.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
