import Image from 'next/image';
import Link from 'next/link';
import { StoreIcon } from './StoreIcon';

export function StoreBenefits() {
  const items = [
    { icon: 'delivery', title: 'Islandwide Delivery', copy: 'Explore delivery options', href: '/shipping' },
    { icon: 'ruler', title: 'Find Your Fit', copy: 'Your size, made simple', href: '/size-guide' },
    { icon: 'fabric', title: 'Considered Fabrics', copy: 'Comfort in every detail', href: '/fabric-technology' },
    { icon: 'support', title: 'Here To Help', copy: 'Talk to the Axivers team', href: '/contact' },
  ] as const;
  return (
    <section className="benefits-strip site-shell" aria-label="Shopping with Axivers">
      {items.map(item => (
        <Link href={item.href} key={item.title} className="benefit-card">
          <span className="benefit-icon"><StoreIcon name={item.icon} width={24} height={24} /></span>
          <div><h2>{item.title}</h2><p>{item.copy}</p></div>
        </Link>
      ))}
    </section>
  );
}

export function ShopCategories({ navigation = false }: { navigation?: boolean }) {
  const items = [
    { name: 'Men', copy: 'Everyday confidence', image: '/images/Minimalist Axivers Studio Portrait.png', href: '/collections/men' },
    { name: 'Women', copy: 'Your own perspective', image: '/images/editorial-women-black.png', href: '/collections/women' },
    { name: 'Signature', copy: 'The original essential', image: '/images/flagship-tee-black.jpg', href: '/collections/flagship-piping' },
    { name: 'Essentials', copy: 'Less, but better', image: '/images/Modern Portrait in White Tee.png', href: '/collections/minimalist-essentials' },
    { name: 'New Arrivals', copy: 'A fresh everyday', image: '/images/pdp_white_piping.jpg', href: '/collections/new-arrivals' },
    { name: 'Best Sellers', copy: 'Find your next favorite', image: '/images/editorial-pedestal-black.png', href: '/collections/best-sellers' },
  ].filter(item => navigation || item.href !== '/collections/best-sellers');
  return <section className={`${navigation ? 'collection-navigation' : 'category-section'} site-shell`} aria-label="Shop collections">{!navigation && <div className="section-heading"><div><span className="eyebrow">FIND YOUR FIT</span><h2>Shop By Collection</h2></div><Link className="text-link" href="/shop">Explore all essentials <span aria-hidden="true">→</span></Link></div>}<div className="category-grid">{items.map(item => <Link href={item.href} key={item.name} className="category-tile"><div className="category-image"><Image src={item.image} alt={item.name + ' collection'} fill sizes="(max-width: 600px) 45vw, (max-width: 1000px) 30vw, 17vw" className="object-cover object-top" /></div><div className="category-caption"><h3>{item.name}</h3><p>{item.copy}</p><span aria-hidden="true">↗</span></div></Link>)}</div></section>;
}

export function WardrobeStories() {
  return <section className="wardrobe-section site-shell"><div className="section-heading"><div><span className="eyebrow">DRESS FOR YOUR EVERYDAY</span><h2>Begin With What You Love</h2></div><Link href="/lookbook" className="text-link">Explore the lookbook <span aria-hidden="true">→</span></Link></div><div className="wardrobe-grid">
    <Link href="/collections/men" className="wardrobe-tile"><Image src="/images/Axivers Urban Luxury Duo.png" alt="Axivers city styling" fill sizes="(max-width: 760px) 100vw, 43vw" className="object-cover" /><div><span className="eyebrow">LOOK 01</span><h3>Make it your own</h3><p>Everyday essentials. Endless possibilities.</p><span className="text-link">Explore the collection →</span></div></Link>
    <Link href="/collections/flagship-piping" className="wardrobe-tile"><Image src="/images/Minimalist Axivers Studio Portrait.png" alt="The signature black Axivers tee" fill sizes="(max-width: 760px) 100vw, 29vw" className="object-cover" /><div><span className="eyebrow">LOOK 02</span><h3>Keep it essential</h3><p>A signature for your everyday.</p><span className="text-link">Find your signature →</span></div></Link>
    <Link href="/collections/new-arrivals" className="wardrobe-tile wardrobe-text"><span className="wardrobe-number" aria-hidden="true">03</span><div><span className="eyebrow">LOOK 03</span><h3>A fresh perspective</h3><p>Discover the latest additions to Axivers.</p><span className="text-link">Shop new arrivals →</span></div></Link>
  </div></section>;
}

export function BrandValues() {
  const values = [
    { number: '01', title: 'Feel the difference', copy: 'Our signature essential starts with 180 GSM mercerized cotton: a smooth feel and an easy, breathable drape.', link: '/fabric-technology', label: 'Meet the fabric' },
    { number: '02', title: 'Details with purpose', copy: 'A considered neckline, tipped cuffs, and a clean silhouette. Small details bring a familiar essential into focus.', link: '/product/flagship-tee-black', label: 'Explore the signature' },
    { number: '03', title: 'An everyday of your own', copy: 'Built around a simple idea: fewer distractions, more room for you. Get to know the story behind Axivers.', link: '/our-story', label: 'Read our story' },
  ];
  return <section className="values-section"><div className="site-shell"><div className="section-heading"><div><span className="eyebrow">THE AXIVERS APPROACH</span><h2>Considered In Every Detail</h2></div><p>From the fabric to the finishing touch.</p></div><div className="values-grid">{values.map(item => <article key={item.number}><span className="value-number">{item.number}</span><h3>{item.title}</h3><p>{item.copy}</p><Link href={item.link} className="text-link">{item.label} →</Link></article>)}</div></div></section>;
}

export function BrandWordmarks() {
  return <div className="brand-wordmarks site-shell" aria-label="Our design principles">{['AXIVERS', 'EVERYDAY', 'CONSIDERED', 'ESSENTIALS', 'SRI LANKA', 'OWN YOUR AXIS'].map(text => <span key={text}>{text}</span>)}</div>;
}
