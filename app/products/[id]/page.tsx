import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ProductDetail from './ProductDetail';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) return { title: 'Product Not Found | SEEYA LUXE' };

  return {
    title: `${product.name} | SEEYA LUXE`,
    description: product.description,
    openGraph: {
      title: `${product.name} | SEEYA LUXE`,
      description: product.description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | SEEYA LUXE`,
      description: product.description,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
