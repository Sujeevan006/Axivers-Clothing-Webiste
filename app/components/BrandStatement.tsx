import Link from 'next/link';
import Image from 'next/image';

export function BrandStatement() {
  return <section className="craft-section site-shell">
    <div className="craft-image"><Image src="/images/Axivers Luxury City Duo.png" alt="Axivers essentials, worn in the city" fill sizes="(max-width: 760px) 100vw, 50vw" className="object-cover" /><div className="craft-image-note"><strong>Own your axis.</strong><span>Designed in Sri Lanka. Made for your everyday.</span></div></div>
    <div className="craft-copy"><span className="eyebrow">GOOD THINGS, THOUGHTFULLY MADE</span><h2>Everyday Essentials.<br />A Different Standard.</h2><p>Comfort you feel. Details you notice. We start with the things that matter and bring them together in the signature Axivers essential.</p><ul><li>100% mercerized cotton with a smooth hand feel</li><li>180 GSM fabric for an effortless everyday drape</li><li>Considered collar and cuff finishing</li></ul><Link href="/fabric-technology" className="button-primary">Discover the details <span aria-hidden="true">→</span></Link><Link href="/our-story" className="text-link">Meet Axivers</Link></div>
  </section>;
}
