'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const slides = [
  { image: '/images/Urban Minimalist Fashion Duo.png', eyebrow: 'THE SIGNATURE COLLECTION', first: 'OWN YOUR', second: 'AXIS.', copy: 'Considered essentials. Confident silhouettes. Find the pieces that move through every day with you.', href: '/shop', action: 'Shop the collection', alt: 'Axivers black and white essentials styled against an urban backdrop' },
  { image: '/images/Axivers Urban Luxury Duo.png', eyebrow: 'EVERYDAY, ELEVATED', first: 'LESS NOISE.', second: 'MORE YOU.', copy: 'Clean lines and an effortless fit. A fresh perspective on your everyday wardrobe.', href: '/collections/new-arrivals', action: 'Explore new arrivals', alt: 'Axivers essentials styled in the city' },
  { image: '/images/Axivers Luxury City Duo.png', eyebrow: 'FROM SRI LANKA', first: 'MADE FOR', second: 'YOUR DAY.', copy: 'From the first plan to the last stop. Discover your own way to wear Axivers.', href: '/lookbook', action: 'Explore the lookbook', alt: 'Two models wearing Axivers tees on a city street' },
];

export function Hero() {
  const [active, setActive] = useState(0);
  const slide = slides[active];
  return (
    <section className="campaign-hero" aria-label="Axivers collections" aria-roledescription="carousel">
      <div className="campaign-backdrop" key={slide.image}>
        <Image src={slide.image} alt={slide.alt} fill quality={90} priority={active === 0} sizes="100vw" className="campaign-photo" />
      </div>
      <div className="campaign-shade" />
      <div className="campaign-inner site-shell">
        <div className="campaign-copy" aria-live="polite" aria-atomic="true">
          <span className="eyebrow">{slide.eyebrow}</span>
          <h1>{slide.first}<br /><span>{slide.second}</span></h1>
          <p>{slide.copy}</p>
          <div className="hero-actions">
            <Link href={slide.href} className="button-primary">{slide.action} <span aria-hidden="true">↗</span></Link>
            <Link href="/our-story" className="text-link">Our story <span aria-hidden="true">→</span></Link>
          </div>
          <div className="campaign-note"><span aria-hidden="true">✓</span> Thoughtfully made. Unmistakably Axivers.</div>
        </div>
      </div>
      <button className="hero-arrow hero-previous" aria-label="Previous campaign" onClick={() => setActive((active + slides.length - 1) % slides.length)}>‹</button>
      <button className="hero-arrow hero-next" aria-label="Next campaign" onClick={() => setActive((active + 1) % slides.length)}>›</button>
      <div className="hero-dots">{slides.map((item, index) => <button key={item.image} onClick={() => setActive(index)} aria-label={`Go to campaign ${index + 1}`} aria-pressed={active === index}><span /></button>)}</div>
    </section>
  );
}
