import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PDP } from '../../components/PDP';
import { productsDatabase } from '../../data/products';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = productsDatabase.find((p) => p.id === id);

  if (!product) {
    return {
      title: 'Product Not Found — axivers',
    };
  }

  return {
    title: `${product.name} — axivers`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = productsDatabase.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <PDP product={product} />;
}
