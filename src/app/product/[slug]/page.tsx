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
  const product = (await getProductByIdOrSlug(slug)) || productsDatabase.find((p) => p.slug === slug || p.id === slug) as any;

  if (!product) {
    return {
      title: 'Product Not Found — Axivers',
    };
  }

  return {
    title: `${product.name} — Axivers Athletic Luxury`,
    description: product.description,
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

  return <PDP product={product} />;
}
