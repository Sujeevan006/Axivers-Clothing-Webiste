'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { SearchModal } from './SearchModal';
import { StoreIcon } from './StoreIcon';

const links = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop all' },
  { href: '/journal', label: 'Journal' },
  { href: '/lookbook', label: 'Lookbook' },
  { href: '/our-story', label: 'About us' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const { totalCartCount, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => { menuRef.current?.close(); }, [pathname]);

  return (
    <>
      <header className="store-header">
        <div className="site-shell header-inner">
          <button className="icon-button mobile-menu-button" aria-label="Open navigation" onClick={() => menuRef.current?.showModal()}><StoreIcon name="menu" /></button>
          <Link href="/" aria-label="Axivers home" className="brand-logo"><Image src="/brand/axivers-logo-black-clean.png" alt="Axivers" width={140} height={30} priority /></Link>
          <nav className="desktop-nav" aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}</nav>
          <div className="header-tools">
            <button className="header-search" aria-label="Search garments" onClick={() => setIsSearchOpen(true)}><StoreIcon name="search" /></button>
            <Link href="/account" aria-label="My account" className="icon-button account-button"><StoreIcon name="user" /></Link>
            <button className="bag-button" onClick={() => setIsCartOpen(true)} aria-label={`Open shopping bag, ${totalCartCount} items`}><StoreIcon name="bag" /><span className="bag-count">{totalCartCount}</span></button>
          </div>
        </div>
      </header>
      <dialog ref={menuRef} className="mobile-navigation" aria-label="Navigation" onClick={event => { if (event.target === event.currentTarget) menuRef.current?.close(); }}>
        <div className="mobile-navigation-inner"><div className="mobile-navigation-top"><span className="eyebrow">Your everyday starts here</span><button className="icon-button" aria-label="Close navigation" onClick={() => menuRef.current?.close()}><StoreIcon name="close" /></button></div><nav aria-label="Mobile navigation">{links.map(link => <Link key={link.href} href={link.href} onClick={() => menuRef.current?.close()} aria-current={pathname === link.href ? 'page' : undefined}>{link.label}</Link>)}</nav><div className="mobile-help-links">{[{ href: '/account', label: 'My account' }, { href: '/track-order', label: 'Track an order' }, { href: '/size-guide', label: 'Size guide' }, { href: '/contact', label: 'Contact us' }].map(link => <Link key={link.href} href={link.href} onClick={() => menuRef.current?.close()}>{link.label}</Link>)}</div></div>
      </dialog>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
