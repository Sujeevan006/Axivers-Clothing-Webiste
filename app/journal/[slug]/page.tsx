import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { journalArticles } from '@/app/data/journal';
import { productsDatabase } from '@/app/data/products';
import { formatCurrency } from '@/lib/utils/formatters';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    return { title: 'Article Not Found — Axivers' };
  }

  return {
    title: `${article.title} — Axivers Journal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = journalArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const relatedProduct = article.relatedProductSlug
    ? productsDatabase.find((p) => p.slug === article.relatedProductSlug || p.id === article.relatedProductSlug)
    : null;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#ffffff] pt-28 sm:pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <article className="max-w-3xl mx-auto space-y-10">
        {/* Back Link */}
        <Link
          href="/journal"
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white font-display transition-colors"
        >
          <span>&larr;</span>
          <span>Back to Journal</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-zinc-400 font-display">
            <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white font-semibold">
              {article.category}
            </span>
            <span>•</span>
            <span>{article.publishedAt}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white uppercase leading-tight">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base font-light text-zinc-300 leading-relaxed border-l-2 border-white pl-4 italic">
            {article.content.lead}
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-invert max-w-none space-y-6 text-sm sm:text-base font-light text-zinc-300 leading-relaxed">
          {article.content.paragraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          {article.content.quote && (
            <blockquote className="my-8 p-6 bg-[#111114] border-l-4 border-white rounded-r-2xl font-display italic text-lg text-white">
              {article.content.quote}
            </blockquote>
          )}
        </div>

        {/* Related Product Spotlight */}
        {relatedProduct && (
          <div className="border-t border-zinc-800/80 pt-10 mt-12 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-display font-semibold block">
              Featured In This Article
            </span>

            <div className="bg-[#111114] border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden relative shrink-0 bg-zinc-900 border border-zinc-800">
                  <Image
                    src={relatedProduct.images?.[0] || '/images/pdp_front.jpg'}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-display block">
                    {relatedProduct.categoryLabel}
                  </span>
                  <h4 className="text-sm font-display font-bold text-white uppercase">
                    {relatedProduct.name}
                  </h4>
                  <span className="text-xs font-mono font-bold text-zinc-300">
                    {formatCurrency(relatedProduct.price, relatedProduct.currency || 'LKR', true)}
                  </span>
                </div>
              </div>

              <Link
                href={`/product/${relatedProduct.slug || relatedProduct.id}`}
                className="px-5 py-2.5 bg-white text-black font-display text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-zinc-200 transition-colors shrink-0"
              >
                View Garment &rarr;
              </Link>
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
