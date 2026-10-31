'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    // Simulate dispatch to support backend
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-display font-semibold block">
            Direct Concierge
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Get in Touch with <span className="font-bold">Axivers</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-lg mx-auto">
            Whether you have questions about fabric specifications, sizing recommendations, or active orders, our Colombo concierge team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-7 space-y-6 shadow-xl">
              <h3 className="text-base font-display font-bold uppercase tracking-wider text-white">
                Company Details
              </h3>

              <div className="space-y-4 text-xs font-light text-zinc-300">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-white">
                    ✉️
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-500 block">
                      Email Concierge
                    </span>
                    <a href="mailto:support@axivers.com" className="text-white hover:underline font-mono">
                      support@axivers.com
                    </a>
                    <span className="block text-[11px] text-zinc-500">Replies within 12 business hours</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-white">
                    📞
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-500 block">
                      Direct Support Line / WhatsApp
                    </span>
                    <span className="text-white font-mono">+94 77 123 4567</span>
                    <span className="block text-[11px] text-zinc-500">Mon - Sat: 9:00 AM – 6:00 PM IST</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-white">
                    📍
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-500 block">
                      Design Studio & Headquarters
                    </span>
                    <span className="text-white">Axivers Clothing (Pvt) Ltd</span>
                    <span className="block text-zinc-400">Colombo, Western Province, Sri Lanka</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="border-t border-zinc-800/80 pt-4 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-display font-semibold text-zinc-500 block">
                  Official Channels
                </span>
                <div className="flex items-center space-x-3 text-xs text-zinc-400">
                  <a
                    href="https://www.instagram.com/axivers.clothing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Instagram
                  </a>
                  <span>•</span>
                  <a
                    href="https://web.facebook.com/profile.php?id=61583403234776"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Facebook
                  </a>
                  <span>•</span>
                  <a
                    href="https://www.linkedin.com/company/110519950"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Order Tracking Callout */}
            <div className="bg-[#101013] border border-zinc-800/80 rounded-2xl p-6 space-y-3">
              <h4 className="text-xs uppercase tracking-wider font-display font-bold text-white">
                Looking for an Existing Order?
              </h4>
              <p className="text-xs text-zinc-400 font-light leading-relaxed">
                If you already placed an order, check live fulfillment updates instantly on our tracking portal.
              </p>
              <Link
                href="/track-order"
                className="inline-flex items-center space-x-1.5 text-xs font-display uppercase tracking-wider text-white underline font-semibold"
              >
                <span>Track Order Reference</span>
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-[#111114] border border-zinc-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-base font-display font-bold uppercase tracking-wider text-white mb-6">
              Send an Enquiry
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h4 className="text-lg font-display font-bold uppercase text-white">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting Axivers. A member of our concierge team will respond to your email within 12 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 bg-zinc-900 border border-zinc-800 text-xs font-display uppercase tracking-wider rounded-xl text-zinc-300 hover:text-white"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Kasun Perera"
                      className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="kasun@example.com"
                      className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="077 123 4567"
                      className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                      Enquiry Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                    >
                      <option value="general">General Sizing & Product Enquiry</option>
                      <option value="order">Existing Order Status</option>
                      <option value="exchange">Return or Exchange Request</option>
                      <option value="wholesale">Corporate / Wholesale Inquiries</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-display font-semibold tracking-wider text-zinc-400">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can our garment team assist you?"
                    className="w-full bg-[#0a0a0d] border border-zinc-800 rounded-xl p-4 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-white text-black font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Enquiry...' : 'Transmit Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
