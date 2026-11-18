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
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-[#ffffff] pt-24 sm:pt-28 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 pt-6">
          <div className="inline-flex items-center space-x-2 text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
            <span>Customer Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-light uppercase tracking-tight text-white">
            Get in Touch with <span className="font-bold">Axivers</span>
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Whether you have questions regarding our flagship release, sizing guidance, or corporate partnerships, our Colombo concierge team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
              <h3 className="text-base font-display font-bold uppercase tracking-wider text-white border-b border-zinc-900 pb-3">
                Company Details
              </h3>

              <div className="space-y-5 text-xs font-light text-zinc-300">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#c5a059] block">
                    Email Inquiries
                  </span>
                  <a href="mailto:contact@axivers.com" className="text-white hover:underline font-mono text-sm block">
                    contact@axivers.com
                  </a>
                  <a href="mailto:support@axivers.com" className="text-zinc-400 hover:underline font-mono text-xs block">
                    support@axivers.com
                  </a>
                  <span className="block text-[11px] text-zinc-500 pt-1">
                    Inquiries are addressed within 24 business hours.
                  </span>
                </div>

                <div className="space-y-1 border-t border-zinc-900 pt-4">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#c5a059] block">
                    Concierge Hours
                  </span>
                  <span className="text-white font-mono block">
                    Monday – Friday: 9:00 AM – 6:00 PM
                  </span>
                  <span className="text-[11px] text-zinc-500 block">
                    Sri Lanka Time: Asia/Colombo (UTC+05:30)
                  </span>
                </div>

                <div className="space-y-1 border-t border-zinc-900 pt-4">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#c5a059] block">
                    Registered Headquarters
                  </span>
                  <span className="text-white font-medium block">
                    Axivers Clothing (Pvt) Ltd
                  </span>
                  <span className="text-zinc-400 block">
                    Colombo, Western Province, Sri Lanka
                  </span>
                </div>
              </div>

              {/* Verified Social Channels */}
              <div className="border-t border-zinc-900 pt-4 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-500 block">
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
                  <span>&bull;</span>
                  <a
                    href="https://web.facebook.com/profile.php?id=61583403234776"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white underline"
                  >
                    Facebook
                  </a>
                  <span>&bull;</span>
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

            {/* Quick Sizing & Order Help */}
            <div className="bg-[#0b0b0e] border border-zinc-800/80 rounded-2xl p-6 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-[#c5a059] block">
                Quick Assistance
              </span>
              <p className="text-zinc-400">
                For urgent sizing recommendations or delivery questions, please consult our dedicated guides:
              </p>
              <div className="pt-2 flex gap-4">
                <Link href="/size-guide" className="text-white underline hover:text-[#c5a059]">
                  Size Guide
                </Link>
                <Link href="/shipping" className="text-white underline hover:text-[#c5a059]">
                  Shipping Policy
                </Link>
                <Link href="/faq" className="text-white underline hover:text-[#c5a059]">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#0b0b0e] border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-zinc-900 pb-3">
              <h3 className="text-base font-display font-bold uppercase tracking-wider text-white">
                Send an Inquiry
              </h3>
              <p className="text-xs text-zinc-400 font-light">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-2xl text-emerald-400">&check;</span>
                <h4 className="text-base font-display font-bold uppercase text-white">
                  Inquiry Received
                </h4>
                <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                  Thank you for contacting Axivers. A member of our team will review your message and reply via email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-white text-black text-xs font-display font-bold uppercase rounded-full hover:bg-zinc-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-400 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full bg-[#121216] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-400 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="name@example.com"
                      className="w-full bg-[#121216] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-400 block">
                      Contact Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+94 ..."
                      className="w-full bg-[#121216] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono text-zinc-400 block">
                      Inquiry Subject *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#121216] border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-zinc-500 cursor-pointer"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="sizing">Sizing &amp; Fit Recommendations</option>
                      <option value="order">Order Tracking &amp; Delivery</option>
                      <option value="press">Press &amp; Partnerships</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono text-zinc-400 block">
                    Message *
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="How may our concierge assist you today?"
                    className="w-full bg-[#121216] border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
