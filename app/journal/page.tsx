import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journalArticles } from '@/app/data/journal';

export const metadata: Metadata = {
  title: 'Journal — Axivers Editorial & Fashion Stories',
  description:
    'Read the Axivers Journal. Insights into fabric technology, style guides, behind the brand in Colombo, and product craftsmanship stories.',
};

export default function JournalPage() {
  const featuredArticle = journalArticles[0];
  const otherArticles = journalArticles.slice(1);

  return (
    <div className="min-h-screen bg-canvas text-ink pt-10 sm:pt-14 pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4 text-center">
        <span className="text-sm normal-case tracking-[0.3em] text-muted font-display font-semibold block">
          Axivers Editorial Magazine
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-normal normal-case tracking-tight text-ink">
          The <span className="font-bold">Axivers Journal</span>
        </h1>
        <p className="text-sm sm:text-sm font-normal text-muted max-w-xl mx-auto leading-relaxed">
          Essays on textile engineering, athletic luxury aesthetics, and behind-the-scenes craftsmanship from our Colombo studio.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Featured Top Editorial */}
        {featuredArticle && (
          <Link
            href={`/journal/${featuredArticle.slug}`}
            className="group relative block rounded-3xl overflow-hidden border border-zinc-200 bg-canvas transition-all duration-500 hover:border-zinc-300 shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 relative h-72 sm:h-96 md:h-[420px] overflow-hidden bg-zinc-100">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
                <div className="flex items-center space-x-3 text-sm font-display normal-case tracking-widest text-muted">
                  <span className="px-2.5 py-1 rounded-full bg-surface text-ink border border-zinc-200 font-medium shadow-xs">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold normal-case tracking-tight text-ink group-hover:text-zinc-700 transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-sm sm:text-sm font-normal text-muted leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-sm font-display normal-case tracking-wider text-ink font-semibold">
                  <span>Read Article</span>
                  <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 3-Column Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <h3 className="text-base sm:text-lg font-display normal-case tracking-wider font-bold text-ink">
              Recent Articles & Guides
            </h3>
            <span className="text-sm font-mono text-muted">{otherArticles.length} Stories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/journal/${art.slug}`}
                className="group flex flex-col justify-between bg-canvas border border-zinc-200 hover:border-zinc-300 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-200 border-b border-zinc-200">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md text-sm normal-case tracking-wider text-ink px-2.5 py-1 rounded-full border border-zinc-200 font-display font-medium shadow-xs">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-sm font-mono text-muted flex items-center space-x-2">
                      <span>{art.publishedAt}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h4 className="text-base font-display font-bold normal-case tracking-tight text-ink group-hover:text-zinc-700 transition-colors line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="text-sm text-muted font-normal leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center text-sm font-display normal-case tracking-wider text-ink font-semibold group-hover:text-zinc-600 transition-colors">
                  <span>Continue Reading</span>
                  <span className="ml-1.5 transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
