import Link from 'next/link';
import Image from 'next/image';

const groups = [
  { title: 'Help Center', links: [['Contact us', '/contact'], ['Size guide', '/size-guide'], ['Delivery information', '/shipping'], ['Returns & exchanges', '/returns'], ['Track your order', '/track-order'], ['FAQs', '/faq']] },
  { title: 'Our Policies', links: [['Privacy policy', '/privacy-policy'], ['Terms & conditions', '/terms-and-conditions'], ['Refund policy', '/refund-policy'], ['Care guide', '/care-guide'], ['About Axivers', '/our-story']] },
];
export function Footer() {
  return <footer className="store-footer" id="footer"><div className="site-shell"><div className="footer-grid">
    <div className="footer-brand"><Link href="/" aria-label="Axivers home"><Image src="/brand/axivers-logo-black-clean.png" alt="Axivers" width={160} height={34} /></Link><p>Thoughtful essentials. Refined everyday comfort. Discover an everyday of your own.</p><span>Colombo, Sri Lanka</span><div className="footer-socials"><a href="https://www.instagram.com/axivers.clothing/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><a href="https://web.facebook.com/profile.php?id=61583403234776" target="_blank" rel="noopener noreferrer">Facebook ↗</a></div></div>
    {groups.map(group => <nav key={group.title} aria-label={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}</nav>)}
    <div className="footer-contact" id="early-access"><h3>Stay In Touch</h3><p>Questions about a piece, your fit, or what comes next? We&apos;re here to help.</p><Link href="/contact" className="footer-contact-link">Talk to Axivers <span aria-hidden="true">→</span></Link><Link href="/journal" className="text-link">Explore our journal</Link></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} Axivers Clothing (Pvt) Ltd. All rights reserved.</span><span>Made in Sri Lanka. Own your axis.</span></div></div></footer>;
}
