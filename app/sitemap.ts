import { MetadataRoute } from 'next';
import { productsDatabase } from '@/app/data/products';
import { journalArticles } from '@/app/data/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://axiversclothing.com';

  const staticRoutes = [
    '',
    '/shop',
    '/collections/men',
    '/collections/women',
    '/collections/flagship-piping',
    '/collections/minimalist-essentials',
    '/collections/technical',
    '/collections/new-arrivals',
    '/collections/best-sellers',
    '/fabric-technology',
    '/our-story',
    '/lookbook',
    '/journal',
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
    changeFrequency: route === '' || route.startsWith('/collections') || route === '/shop'
      ? ('daily' as const)
      : ('monthly' as const),
    priority: route === '' ? 1.0 : route.startsWith('/collections') || route === '/shop' ? 0.8 : 0.6,
  }));

  const productRoutes = productsDatabase.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const journalRoutes = journalArticles.map((article) => ({
    url: `${baseUrl}/journal/${article.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...journalRoutes];
}
