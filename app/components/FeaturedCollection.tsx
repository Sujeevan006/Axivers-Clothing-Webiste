'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils/formatters';
import type { Product } from '@/types/product';
import { subscribeToActiveProducts, getProducts } from '@/services/productService';
import { productsDatabase } from '../data/products';
import { QuickAddModal } from './QuickAddModal';
import { ProductCard } from './ProductCard';
import { ProductSlider } from './ProductSlider';

const initialCollection = productsDatabase.filter(
  product => product.active && product.status === 'active' && product.slug !== 'piping-crewneck'
);

export function FeaturedCollection({ variant = 'arrivals' }: { variant?: 'arrivals' | 'featured' | 'compact' }) {
  const [products, setProducts] = useState<Product[]>(initialCollection);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  useEffect(() => {
    const update = (items: Product[]) => {
      const activeLocal = productsDatabase.filter(
        p => p.active && p.status === 'active' && p.slug !== 'piping-crewneck'
      );
      const remoteIds = new Set(items.map(p => p.id));
      const combined = [...items.filter(p => p.slug !== 'piping-crewneck')];
      for (const p of activeLocal) {
        if (!remoteIds.has(p.id)) {
          combined.push(p);
        }
      }
      setProducts(combined);
    };

    getProducts({ activeOnly: true }).then(update);
    return subscribeToActiveProducts(update);
  }, []);

  const heading = variant === 'arrivals' ? 'New Arrivals' : variant === 'featured' ? 'Featured Essentials' : 'Everyday Favorites';
  const eyebrow = variant === 'arrivals' ? 'LATEST COLLECTION' : variant === 'featured' ? 'THE AXIVERS EDIT' : 'FIND YOUR NEXT ESSENTIAL';
  const visible = variant === 'arrivals' ? [...products].sort((a, b) => Number(!!b.isNewArrival) - Number(!!a.isNewArrival)) : variant === 'featured' ? products.filter(p => p.featured) : products;
  return <section className={`featured-section site-shell collection-${variant}`} id={`collection-${variant}`}>
    <div className={variant !== 'compact' ? 'collection-content' : undefined}>
    <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{heading}</h2></div>{variant !== 'arrivals' && <Link href="/shop" className="text-link">View all essentials <span aria-hidden="true">→</span></Link>}</div>
    {variant === 'compact' ? <div className="compact-products">{visible.slice(0, 8).map(product => <Link href={`/product/${product.slug || product.id}`} key={product.id} className="compact-product"><Image src={product.images[0]} alt={product.name} width={120} height={120} sizes="(max-width: 760px) 50vw, 120px" quality={90} /><div><span className="product-material">Axivers</span><h3>{product.name}</h3><strong>{formatCurrency(product.price, product.currency || 'LKR', true)}</strong></div></Link>)}</div> : variant === 'featured' ? <div className="featured-grid">{visible.slice(0, 10).map(product => <ProductCard key={product.id} product={product} onQuickAdd={setQuickAddProduct} />)}</div> : <ProductSlider label="New arrivals" autoPlay suspended={quickAddProduct !== null}>{visible.map(product => <ProductCard key={product.id} product={product} onQuickAdd={setQuickAddProduct} />)}</ProductSlider>}
    {visible.length === 0 && <p className="collection-empty">Our next essentials are on their way. Explore the lookbook while we get ready.</p>}
    </div>
    {quickAddProduct && <QuickAddModal product={quickAddProduct} onClose={() => setQuickAddProduct(null)} />}
  </section>;
}
