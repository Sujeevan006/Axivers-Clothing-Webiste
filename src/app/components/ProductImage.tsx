import React from 'react';
import Image from 'next/image';

/**
 * ProductImage Component
 * 
 * Reusable React Server Component designed for optimizing product imagery
 * served from Firebase Cloud Storage and local assets.
 * 
 * EDGE CACHING & BANDWIDTH OPTIMIZATION DOCUMENTATION:
 * -----------------------------------------------------------------------------
 * When deployed on Vercel or running via Next.js server runtime, Next.js 
 * automatically intercepts image requests for Firebase Storage URLs matching 
 * next.config.js remotePatterns.
 * 
 * Key Benefits:
 * 1. Automatic Format Conversion: Serves images as AVIF or WebP based on 
 *    browser capability, reducing payload size by up to 70%.
 * 2. Responsive Resizing: Serves exact pixel dimensions based on the `sizes` 
 *    attribute, saving mobile user bandwidth.
 * 3. Edge Caching: Caches transformed images on Vercel's global Edge CDN, 
 *    eliminating redundant outbound bandwidth requests to Firebase Storage.
 * 4. Core Web Vitals Optimization: Improves LCP (Largest Contentful Paint) 
 *    via `priority={true}` above the fold and eliminates CLS (Cumulative 
 *    Layout Shift) by enforcing explicit width/height or fill containers.
 */

export interface ProductImageProps {
  /** Firebase Storage download URL or fallback asset path */
  src: string;
  /** Accessible alt description for the image */
  alt: string;
  /** Explicit pixel width (required if fill is false) */
  width?: number;
  /** Explicit pixel height (required if fill is false) */
  height?: number;
  /** Whether the image should fill its parent relative container */
  fill?: boolean;
  /** Responsive sizes string for media query breakpoints */
  sizes?: string;
  /** Set to true for hero images above the fold to boost LCP */
  priority?: boolean;
  /** Tailwind CSS styling classes */
  className?: string;
  /** Image quality score (1-100, defaults to 85) */
  quality?: number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  className = '',
  quality = 85,
}) => {
  const imageSrc = src && src.trim() !== '' ? src : '/images/pdp_front.jpg';

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt || 'Axivers Product Image'}
        fill
        sizes={sizes}
        priority={priority}
        quality={quality}
        className={className}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt || 'Axivers Product Image'}
      width={width || 600}
      height={height || 600}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
    />
  );
};

export default ProductImage;
