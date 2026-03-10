'use client';

import Image from 'next/image';
import { Product } from '@/lib/supabase';
import { useCart } from './CartProvider';
import { useState } from 'react';

type Props = {
  product: Product | (Omit<Product, 'id' | 'created_at' | 'is_sold'> & { id: string; is_sold?: boolean });
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [quickView, setQuickView] = useState(false);
  const imageUrl = (product.images && product.images[0]) || '/placeholder.svg';

  const handleAdd = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: imageUrl });
  };

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'white',
          overflow: 'hidden',
          transform: hovered ? 'translateY(-10px)' : 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: hovered ? '0 15px 40px rgba(212,175,55,0.2)' : '0 5px 20px rgba(0,0,0,0.1)',
          position: 'relative',
        }}
      >
        {product.is_sold && (
          <div style={{ position: 'absolute', top: 10, right: 10, background: '#e74c3c', color: 'white', padding: '0.4rem 0.8rem', fontSize: '0.75rem', fontWeight: 700, zIndex: 2, transform: 'rotate(15deg)' }}>
            SOLD
          </div>
        )}
        <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s ease' }}
          />
          <button
            onClick={() => setQuickView(true)}
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              background: 'white', color: 'var(--primary-dark)', padding: '0.8rem 1.5rem', border: 'none',
              fontWeight: 600, cursor: 'pointer', opacity: hovered ? 1 : 0, transition: 'opacity 0.3s ease',
              textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem', zIndex: 10,
            }}
          >
            Quick View
          </button>
        </div>
        <div style={{ padding: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.8rem', color: 'var(--primary-dark)' }}>{product.name}</h3>
          <p style={{ fontStyle: 'italic', color: '#666', fontSize: '0.9rem', marginBottom: '1.2rem', lineHeight: 1.6 }}>{product.description}</p>
          <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.6rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '1.5rem' }}>₵{product.price.toFixed(2)}</p>
          <button
            onClick={handleAdd}
            disabled={!!product.is_sold}
            style={{
              display: 'block', width: '100%', padding: '1rem', background: product.is_sold ? '#ccc' : 'var(--primary-dark)',
              color: 'white', border: 'none', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase',
              fontSize: '0.9rem', cursor: product.is_sold ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { if (!product.is_sold) { e.currentTarget.style.background = 'var(--gold-accent)'; e.currentTarget.style.color = 'var(--primary-dark)'; }}}
            onMouseLeave={e => { if (!product.is_sold) { e.currentTarget.style.background = 'var(--primary-dark)'; e.currentTarget.style.color = 'white'; }}}
          >
            {product.is_sold ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {quickView && (
        <>
          <div onClick={() => setQuickView(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 3000 }} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'white', maxWidth: 900, width: '90vw', maxHeight: '90vh', overflowY: 'auto',
            zIndex: 3001, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '2rem',
          }}>
            <button onClick={() => setQuickView(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'var(--primary-dark)', lineHeight: 1 }}>&times;</button>
            <div style={{ position: 'relative', minHeight: 300 }}>
              <Image src={imageUrl} alt={product.name} fill style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '1rem' }}>
              <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2rem', color: 'var(--primary-dark)', marginBottom: '1rem' }}>{product.name}</h2>
              <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>{product.description}</p>
              <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2rem', color: 'var(--gold-accent)', fontWeight: 700, marginBottom: '2rem' }}>₵{product.price.toFixed(2)}</p>
              <button
                onClick={() => { handleAdd(); setQuickView(false); }}
                disabled={!!product.is_sold}
                style={{ width: '100%', padding: '1rem', background: product.is_sold ? '#ccc' : 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: product.is_sold ? 'not-allowed' : 'pointer' }}
              >
                {product.is_sold ? 'Sold Out' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
