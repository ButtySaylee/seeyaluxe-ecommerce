'use client';

import Image from 'next/image';
import Link from 'next/link';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import CartModal from '@/components/CartModal';
import { useCart } from '@/components/CartProvider';
import { Product } from '@/lib/supabase';

function ProductDetailContent({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const imageUrl = product.images?.[0] || '/placeholder.svg';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--light-gray)' }}>
      <Header />
      <CartModal />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '8rem 2rem 4rem' }}>
        <Link href="/#products" style={{ color: 'var(--primary-dark)', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem', opacity: 0.8 }}>
          ← Back to Collection
        </Link>

        <div className="product-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', background: 'white', padding: '3rem', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          {/* Image */}
          <div style={{ position: 'relative', minHeight: 450 }}>
            <Image src={imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
            {product.is_sold && (
              <div style={{ position: 'absolute', top: 16, right: 16, background: '#e74c3c', color: 'white', padding: '0.5rem 1rem', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '1px' }}>
                SOLD OUT
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem' }}>
            <span style={{ background: 'var(--light-gray)', color: 'var(--primary-dark)', padding: '0.3rem 0.9rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'inline-block', width: 'fit-content' }}>
              {product.category}
            </span>

            <h1 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-dark)', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.2rem', color: 'var(--gold-accent)', fontWeight: 700 }}>
              ₵{product.price.toFixed(2)}
            </p>

            <p style={{ color: '#666', lineHeight: 1.9, fontSize: '1rem' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '0.5rem' }}>
              <button
                onClick={() => { if (!product.is_sold) addToCart({ id: product.id, name: product.name, price: product.price, image: imageUrl }); }}
                disabled={!!product.is_sold}
                style={{ padding: '1.1rem 2rem', background: product.is_sold ? '#ccc' : 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', cursor: product.is_sold ? 'not-allowed' : 'pointer', fontSize: '1rem', transition: 'all 0.3s' }}
                onMouseEnter={e => { if (!product.is_sold) e.currentTarget.style.background = 'var(--gold-accent)'; }}
                onMouseLeave={e => { if (!product.is_sold) e.currentTarget.style.background = 'var(--primary-dark)'; }}
              >
                {product.is_sold ? 'Sold Out' : 'Add to Cart'}
              </button>

              <a
                href={`https://wa.me/233555008134?text=${encodeURIComponent(`Hello SEEYA LUXE! I'm interested in: ${product.name} — ₵${product.price.toFixed(2)}. Is it available?`)}`}
                target="_blank" rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', padding: '1rem 2rem', background: '#25D366', color: 'white', textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem', transition: 'all 0.3s' }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.1rem' }} /> Enquire on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <CartProvider>
      <ProductDetailContent product={product} />
    </CartProvider>
  );
}
