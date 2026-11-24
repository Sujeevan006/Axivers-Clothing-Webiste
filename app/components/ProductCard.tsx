'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/types/product';
import { formatCurrency } from '@/lib/utils/formatters';
import { StoreIcon } from './StoreIcon';

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
      <Link
        href={`/product/${product.slug || product.id}`}
        className="product-card-image"
      >
        <Image
          src={primaryImage}
          alt={product.name}
          fill
          sizes="(max-width: 760px) 50vw, (max-width: 1000px) 33vw, 25vw"
          quality={90}
          className={`object-cover object-center product-card-img-primary ${
            secondaryImage
              ? 'transition-opacity duration-300 group-hover:opacity-0'
              : ''
          }`}
        />
        {secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 760px) 50vw, (max-width: 1000px) 33vw, 25vw"
            quality={90}
            className="object-cover object-center product-card-img-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}
        <span className="product-badge">{badgeText}</span>
        <span className="product-view">View</span>
      </Link>
      <div className="product-card-info">
        <Link href={`/product/${product.slug || product.id}`}>
          <h3>{product.name}</h3>
        </Link>
      </div>
      <div className="product-card-bottom">
        <strong>
          {formatCurrency(product.price, product.currency || 'LKR', true)}
        </strong>
        <button
          type="button"
          className="product-cart-button"
          onClick={(e) => {
            e.preventDefault();
            onQuickAdd(product);
          }}
          aria-label={`${unavailable ? 'View options for' : 'Choose size for'} ${product.name}`}
        >
          <StoreIcon name="cart" width={22} height={22} />
        </button>
      </div>
    </article>
  );
}
