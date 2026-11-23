'use client';

import Image from 'next/image';

const ITEM_COUNT = 28; // 14 solid white, 14 dull white for seamless infinite scroll on all screen sizes

const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
  isDull: i % 2 !== 0,
}));

export function LogoMarquee() {
  return (
    <section className="logo-marquee-bar" aria-label="Axivers brand showcase">
      <div className="logo-marquee-track">
        {items.map((item, idx) => (
          <div
            key={`track1-${idx}`}
            className={`logo-marquee-item ${item.isDull ? 'logo-marquee-item--dull' : 'logo-marquee-item--solid'}`}
          >
            <Image
              src="/brand/axivers-logo-white-clean.png"
              alt="Axivers"
              width={91}
              height={18}
              className="logo-marquee-img"
              unoptimized
              priority
            />
          </div>
        ))}
      </div>
      <div className="logo-marquee-track" aria-hidden="true">
        {items.map((item, idx) => (
          <div
            key={`track2-${idx}`}
            className={`logo-marquee-item ${item.isDull ? 'logo-marquee-item--dull' : 'logo-marquee-item--solid'}`}
          >
            <Image
              src="/brand/axivers-logo-white-clean.png"
              alt=""
              width={91}
              height={18}
              className="logo-marquee-img"
              unoptimized
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
