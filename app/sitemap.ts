import { MetadataRoute } from 'next';
import { productsDatabase } from '@/app/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.axivers.com';

  const staticRoutes = [
    '',
    '/shop',
    '/fabric-technology',
    '/our-story',
    '/lookbook',
    '/size-guide',
    '/shipping',
    '/returns',
    '/care-guide',
    '/faq',
    '/track-order',
    '/contact',
    '/cart',
    '/privacy-policy',
    '/terms-and-conditions',
    '/refund-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' || route === '/shop' ? ('daily' as const) : ('monthly' as const),
    priority: route === '' ? 1.0 : route === '/shop' ? 0.9 : 0.7,
  }));

  const activeProducts = productsDatabase.filter((p) => p.active);
  const productRoutes = activeProducts.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }));

  return [...staticRoutes, ...productRoutes];
}
