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
    <div className="min-h-screen bg-white text-[#060606] pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Header */}
        <div className="text-center space-y-2 pt-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-mono font-medium block">
            Customer Concierge
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-[#060606]">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm font-light text-zinc-500 max-w-lg mx-auto leading-relaxed">
            Whether you have questions regarding our flagship release, sizing guidance, or corporate inquiries, our Colombo team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Direct Contact Info & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-sm">
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#060606] border-b border-zinc-200 pb-3">
                Company Details
              </h3>

              <div className="space-y-4 text-xs font-light text-zinc-700">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#c5a059] block">
                    Email Inquiries
                  </span>
                  <a href="mailto:contact@axivers.com" className="text-black hover:underline font-mono text-xs font-semibold block">
                    contact@axivers.com
                  </a>
                  <a href="mailto:support@axivers.com" className="text-zinc-600 hover:underline font-mono text-xs block">
                    support@axivers.com
                  </a>
                  <span className="block text-[11px] text-zinc-500 pt-0.5">
                    Inquiries are addressed within 24 business hours.
                  </span>
                </div>

                <div className="space-y-1 border-t border-zinc-200 pt-3">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#c5a059] block">
                    Concierge Hours
                  </span>
                  <span className="text-black font-mono block">
                    Monday – Friday: 9:00 AM – 6:00 PM
                  </span>
                  <span className="text-[11px] text-zinc-500 block">
                    Sri Lanka Time: Asia/Colombo (UTC+05:30)
                  </span>
                </div>

                <div className="space-y-1 border-t border-zinc-200 pt-3">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-[#c5a059] block">
                    Registered Headquarters
                  </span>
                  <span className="text-black font-medium block">
                    Axivers Clothing (Pvt) Ltd
                  </span>
                  <span className="text-zinc-600 block">
                    Colombo, Western Province, Sri Lanka
                  </span>
                </div>
              </div>

              {/* Verified Social Channels */}
              <div className="border-t border-zinc-200 pt-3 space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-500 block">
                  Official Channels
                </span>
                <div className="flex items-center space-x-3 text-xs text-zinc-600">
                  <a
                    href="https://www.instagram.com/axivers.clothing/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black underline"
                  >
                    Instagram
                  </a>
                  <span>&bull;</span>
                  <a
                    href="https://web.facebook.com/profile.php?id=61583403234776"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black underline"
                  >
                    Facebook
                  </a>
                  <span>&bull;</span>
                  <a
                    href="https://www.linkedin.com/company/110519950"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Sizing & Order Help */}
            <div className="bg-[#fafafa] border border-zinc-200 rounded-xl p-5 space-y-2 text-xs shadow-sm">
              <span className="text-[10px] font-mono uppercase text-[#c5a059] block">
                Quick Assistance
              </span>
              <p className="text-zinc-600">
                For sizing recommendations or delivery questions, please consult our guides:
              </p>
              <div className="pt-1 flex gap-4">
                <Link href="/size-guide" className="text-black underline hover:text-zinc-600 font-medium">
                  Size Guide
                </Link>
                <Link href="/shipping" className="text-black underline hover:text-zinc-600 font-medium">
                  Shipping Policy
                </Link>
                <Link href="/faq" className="text-black underline hover:text-zinc-600 font-medium">
                  FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#fafafa] border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="border-b border-zinc-200 pb-3">
              <h3 className="text-sm font-display font-bold uppercase tracking-wider text-[#060606]">
                Send an Inquiry
              </h3>
              <p className="text-xs text-zinc-500 font-light">
                Fill out the form below and our team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <span className="text-2xl text-emerald-600">&check;</span>
                <h4 className="text-base font-display font-bold uppercase text-[#060606]">
                  Inquiry Received
                </h4>
                <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                  Thank you for contacting Axivers. A member of our team will review your message and reply via email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 bg-[#060606] text-white text-xs font-display font-bold uppercase tracking-wider rounded-lg hover:bg-zinc-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-light">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-zinc-600 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your name"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-[#060606] placeholder-zinc-400 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-zinc-600 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-[#060606] placeholder-zinc-400 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-zinc-600 block">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0771234567"
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-[#060606] placeholder-zinc-400 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-mono text-zinc-600 block">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-[#060606] focus:outline-none focus:border-black cursor-pointer"
                    >
                      <option value="general">General Inquiries</option>
                      <option value="sizing">Sizing &amp; Fit Advice</option>
                      <option value="order">Order Status / Delivery</option>
                      <option value="corporate">Corporate / Wholesale</option>
                      <option value="press">Editorial / Press</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-mono text-zinc-600 block">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="How can our concierge team assist you?"
                    className="w-full bg-white border border-zinc-300 rounded-lg px-3.5 py-2.5 text-[#060606] placeholder-zinc-400 focus:outline-none focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#060606] text-white font-display uppercase tracking-widest font-bold text-xs rounded-lg hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}