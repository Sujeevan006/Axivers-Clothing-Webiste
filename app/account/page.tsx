'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Customer Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-light uppercase tracking-tight text-white">
            Axivers <span className="font-bold">Client Account</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400">
            Access your order history, delivery status, and saved address information.
          </p>
        </div>

        {/* Quick Order Lookup Form */}
        <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="space-y-1">
            <h2 className="text-base font-display font-bold uppercase text-white tracking-wider">
              Quick Order Access
            </h2>
            <p className="text-xs text-zinc-400 font-light">
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
              <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                Order Reference Number *
              </label>
              <input
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. AXV-84920"
                className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono uppercase"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                Registered Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 077 123 4567"
                className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all cursor-pointer shadow-lg"
            >
              Lookup Order Details &rarr;
            </button>
          </form>
        </div>

        {/* Benefits of Client Account */}
        <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 space-y-4 text-xs font-light text-zinc-400">
          <h3 className="text-xs uppercase tracking-wider font-display font-bold text-white">
            Client Services & Privileges
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-white">•</span>
              <span>Priority dispatch for verified client accounts.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-white">•</span>
              <span>7-day instant doorstep exchange service in Colombo.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-white">•</span>
              <span>Invitations to limited-run 60/40 cotton-modal seasonal drops.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
