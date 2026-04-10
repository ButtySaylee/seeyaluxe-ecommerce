'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase, Product } from '@/lib/supabase';
import { staticProducts } from '@/lib/products';
import ProductCard from './ProductCard';

type Category = 'all' | 'earrings' | 'footwear' | 'bags';

export default function ProductsSection() {
  const [filter, setFilter] = useState<Category>('all');
  const [search, setSearch] = useState('');
  const [dbProducts, setDbProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => { if (data && data.length > 0) setDbProducts(data); });
  }, []);

  useEffect(() => {
    const handler = (e: Event) => setSearch((e as CustomEvent).detail as string);
    window.addEventListener('search', handler);
    return () => window.removeEventListener('search', handler);
  }, []);

  const sourceProducts = dbProducts ?? staticProducts.map((p, i) => ({ ...p, id: `static-${i}`, is_sold: false, created_at: '' }));

  const filtered = sourceProducts.filter(p => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const btnStyle = (active: boolean) => ({
    padding: 'clamp(0.5rem, 1.5vw, 0.7rem) clamp(1rem, 2vw, 1.5rem)',
    background: active ? 'var(--primary-dark)' : 'transparent',
    color: active ? 'white' : 'var(--primary-dark)',
    border: '2px solid var(--primary-dark)',
    cursor: 'pointer',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    fontSize: 'clamp(0.7rem, 2vw, 0.85rem)',
    letterSpacing: '0.5px',
    transition: 'all 0.3s',
  });

  return (
    <section id="products" style={{ padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)', background: 'var(--light-gray)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '2rem', color: 'var(--primary-dark)', fontWeight: 900, textAlign: 'center', letterSpacing: '1px' }}>
          The Luxury Catalog
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(0.5rem, 2vw, 1rem)', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {(['all', 'earrings', 'footwear', 'bags'] as Category[]).map(cat => (
            <button key={cat} style={btnStyle(filter === cat)} onClick={() => setFilter(cat)}>
              {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {search && (
          <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-dark)', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
            Showing results for &ldquo;<strong>{search}</strong>&rdquo; &nbsp;
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--gold-accent)', cursor: 'pointer', textDecoration: 'underline' }}>Clear</button>
          </div>
        )}

        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#999', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>No products found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(1.5rem, 3vw, 3rem)', marginTop: '2rem' }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
