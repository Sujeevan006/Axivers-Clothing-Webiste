import Link from 'next/link';
import Image from 'next/image';
import { journalArticles } from '../data/journal';

const images = ['/images/fabricbg.png', '/images/Urban Minimalist Fashion Duo.png', '/images/Axivers Luxury City Duo.png'];
export function EditorialDiscovery() {
  return <section className="discovery-section site-shell"><div className="section-heading"><div><span className="eyebrow">FROM THE JOURNAL</span><h2>Latest Stories & Inspiration</h2></div><Link href="/journal" className="text-link">View all stories <span aria-hidden="true">→</span></Link></div><div className="discovery-grid">{journalArticles.slice(0, 3).map((article, index) => <article key={article.slug} className="discovery-card"><Link href={`/journal/${article.slug}`} className="discovery-image"><Image src={images[index]} alt={article.title} fill quality={90} sizes="(max-width: 760px) 100vw, 33vw" className="object-cover" /></Link><div className="discovery-caption"><span className="article-meta">{article.category} · {article.readTime}</span><h3><Link href={`/journal/${article.slug}`}>{article.title}</Link></h3><p>{article.excerpt}</p><Link href={`/journal/${article.slug}`} className="text-link">Read more <span aria-hidden="true">→</span></Link></div></article>)}</div></section>;
}
