'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AccountPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-sm normal-case tracking-[0.3em] text-muted font-semibold block">
            Customer Portal
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-normal normal-case tracking-tight text-ink">
            Axivers <span className="font-bold">Client Account</span>
          </h1>
          <p className="text-sm sm:text-sm font-normal text-muted">
            Access your order history, delivery status, and saved address information.
          </p>
        </div>

        {/* Quick Order Lookup Form */}
        <div className="bg-canvas border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="space-y-1">
            <h2 className="text-base font-display font-bold normal-case text-ink tracking-wider">
              Quick Order Access
            </h2>
            <p className="text-sm text-muted font-normal">
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
              <label htmlFor="app-account-page-tsx-field-1" className="block text-sm normal-case font-semibold tracking-wider text-muted">
                Order Reference Number *
              </label>
              <input id="app-account-page-tsx-field-1"
                type="text"
                required
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="e.g. AXV-84920"
                className="w-full bg-surface border border-zinc-300 rounded-xl px-4 py-3 text-sm text-ink placeholder-zinc-400 focus:outline-none focus:border-ink font-mono normal-case transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="app-account-page-tsx-field-2" className="block text-sm normal-case font-semibold tracking-wider text-muted">
                Registered Phone Number
              </label>
              <input id="app-account-page-tsx-field-2"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 077 123 4567"
                className="w-full bg-surface border border-zinc-300 rounded-xl px-4 py-3 text-sm text-ink placeholder-zinc-400 focus:outline-none focus:border-ink font-mono transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-ink text-paper font-display text-sm normal-case tracking-widest font-bold hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Lookup Order Details &rarr;
            </button>
          </form>
        </div>

        {/* Benefits of Client Account */}
        <div className="bg-canvas border border-zinc-200 rounded-2xl p-6 space-y-4 text-sm font-normal text-muted">
          <h3 className="text-sm normal-case tracking-wider font-display font-bold text-ink">
            Client Services & Privileges
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-ink">•</span>
              <span>Priority dispatch for verified client accounts.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-ink">•</span>
              <span>7-day instant doorstep exchange service in Colombo.</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-ink">•</span>
              <span>Invitations to limited-run 180 GSM mercerized cotton seasonal drops.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
