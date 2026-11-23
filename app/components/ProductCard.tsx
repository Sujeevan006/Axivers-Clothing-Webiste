'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils/formatters';

export function ProductCard({
  product,
  onQuickAdd,
}: {
  product: Product;
  onQuickAdd: (product: Product) => void;
}) {
  const unavailable = product.stock <= 0;
  const primaryImage = product.images?.[0] || '/images/flagship-tee-black.jpg';
  const secondaryImage = product.images?.[1];

  const badgeText = unavailable
    ? 'Sold out'
    : product.isNewArrival
    ? 'New'
    : product.isBestSeller
    ? 'Best Seller'
    : 'Essential';

  return (
    <article className="product-card group">
      <Link href={`/product/${product.slug || product.id}`} className="product-card-image">
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 75vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover object-center product-card-img-primary ${
            secondaryImage ? 'transition-opacity duration-300 group-hover:opacity-0' : ''
          }`}
        />
        {secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 75vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover object-center product-card-img-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <span className="product-badge">{badgeText}</span>
        <span className="product-view">View</span>
      </Link>
      <div className="product-card-info">
        <span className="product-material">{product.categoryLabel || 'Everyday essentials'}</span>
        <Link href={`/product/${product.slug || product.id}`}>
          <h3>{product.name}</h3>
        </Link>
        <div className="product-colors">
          {product.colors?.join(' / ')}
          {product.sizes?.length ? ` · ${product.sizes.join(', ')}` : ''}
        </div>
        <div className="product-card-bottom">
          <strong>{formatCurrency(product.price, product.currency || 'LKR', true)}</strong>
          <button
            type="button"
            className="quick-add-button"
            onClick={(e) => {
              e.preventDefault();
              onQuickAdd(product);
            }}
            aria-label={`${unavailable ? 'View options for' : 'Choose size for'} ${product.name}`}
          >
            <span>{unavailable ? 'Options' : 'Choose size'}</span>
            <span className="quick-add-plus" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
