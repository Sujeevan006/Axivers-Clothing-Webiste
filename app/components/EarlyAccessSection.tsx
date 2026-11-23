'use client';

import React, { useState } from 'react';

export const EarlyAccessSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setEmail('');
    }, 400);
  };

  return (
    <section className="py-20 sm:py-28 bg-ink text-paper border-b border-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 sm:space-y-8">
        <div className="inline-flex items-center space-x-2 text-sm normal-case tracking-[0.25em] text-accent font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>Inaugural Release Registry</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-display font-normal normal-case tracking-tight text-paper leading-tight">
          Join The <span className="font-bold">Initial Launch.</span>
        </h2>

        <p className="text-sm sm:text-sm md:text-base font-normal text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Axivers essentials are produced in small, controlled production runs to preserve manufacturing standards. Register your details for private release access and launch updates.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="flex-1 bg-ink border border-zinc-800 text-sm px-5 py-3.5 text-paper placeholder-zinc-500 rounded-full focus:outline-none focus:border-zinc-500 tracking-wide"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-7 py-3.5 bg-surface text-ink font-display text-sm normal-case tracking-wider font-bold rounded-full hover:bg-zinc-200 transition-all shadow-xl shrink-0 cursor-pointer disabled:opacity-50"
          >
            {submitted ? 'REGISTERED' : isSubmitting ? 'JOINING...' : 'GET EARLY ACCESS'}
          </button>
        </form>

        {submitted && (
          <p className="text-sm text-emerald-400 font-display animate-fade-in">
            Thank you. Your email has been registered for inaugural access.
          </p>
        )}

        <div className="pt-4 flex items-center justify-center space-x-6 text-sm font-mono text-zinc-500">
          <span>• Controlled Small-Batch Drops</span>
          <span>• Zero Promotional Spam</span>
          <span>• Private Launch Invites</span>
        </div>
      </div>
    </section>
  );
};
