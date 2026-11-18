import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PDP } from '../../components/PDP';
import { getProductByIdOrSlug, serializeProduct } from '@/services/productService';
import { productsDatabase } from '../../data/products';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product =
    (await getProductByIdOrSlug(slug)) ||
    (productsDatabase.find((p) => p.slug === slug || p.id === slug) as any);

  if (!product) {
    return {
      title: 'Garment Not Found — Axivers',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.axivers.com';
  const imgUrl = product.images?.[0] || '/images/flagship-tee-black.jpg';

  return {
    title: `${product.name} — Axivers`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Axivers`,
      description: product.description,
      url: `${siteUrl}/product/${slug}`,
      images: [
        {
          url: imgUrl,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Axivers`,
      description: product.description,
      images: [imgUrl],
    },
  };
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;
  let rawProduct = await getProductByIdOrSlug(slug);

  if (!rawProduct) {
    rawProduct = productsDatabase.find((p) => p.slug === slug || p.id === slug) as any;
  }

  if (!rawProduct) {
    notFound();
  }

  const product = JSON.parse(JSON.stringify(serializeProduct(rawProduct)));

  return (
    <>
      {/* Product Structured Data (Schema.org) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.name,
            image: product.images,
            description: product.description,
            brand: {
              '@type': 'Brand',
              name: 'Axivers',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: product.currency || 'LKR',
              price: (product.price / 100).toFixed(2),
              itemCondition: 'https://schema.org/NewCondition',
              availability:
                product.stock > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/PreOrder',
            },
          }),
        }}
      />
      <PDP product={product} />
    </>
  );
}
