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
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-24 sm:pt-28 pb-24">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4 text-center">
        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-display font-semibold block">
          Axivers Editorial Magazine
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-light uppercase tracking-tight text-white">
          The <span className="font-bold">Axivers Journal</span>
        </h1>
        <p className="text-xs sm:text-sm font-light text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Essays on textile engineering, athletic luxury aesthetics, and behind-the-scenes craftsmanship from our Colombo studio.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Featured Top Editorial */}
        {featuredArticle && (
          <Link
            href={`/journal/${featuredArticle.slug}`}
            className="group relative block rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950 transition-all duration-500 hover:border-zinc-700 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div className="lg:col-span-7 relative h-72 sm:h-96 md:h-[420px] overflow-hidden">
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  fill
                  priority
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 lg:hidden" />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
                <div className="flex items-center space-x-3 text-[10px] font-display uppercase tracking-widest text-zinc-400">
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-medium">
                    {featuredArticle.category}
                  </span>
                  <span>•</span>
                  <span>{featuredArticle.readTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  {featuredArticle.title}
                </h2>

                <p className="text-xs sm:text-sm font-light text-zinc-400 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>

                <div className="pt-2 flex items-center space-x-2 text-xs font-display uppercase tracking-wider text-white font-semibold">
                  <span>Read Article</span>
                  <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 3-Column Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
            <h3 className="text-base sm:text-lg font-display uppercase tracking-wider font-bold text-white">
              Recent Articles & Guides
            </h3>
            <span className="text-xs font-mono text-zinc-500">{otherArticles.length} Stories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/journal/${art.slug}`}
                className="group flex flex-col justify-between bg-[#111114] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-zinc-800">
                    <Image
                      src={art.coverImage}
                      alt={art.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-wider text-white px-2.5 py-1 rounded-full border border-white/10 font-display font-medium">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="text-[10px] font-mono text-zinc-500 flex items-center space-x-2">
                      <span>{art.publishedAt}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h4 className="text-base font-display font-bold uppercase tracking-tight text-white group-hover:text-zinc-200 transition-colors line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center text-xs font-display uppercase tracking-wider text-zinc-400 group-hover:text-white transition-colors">
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
