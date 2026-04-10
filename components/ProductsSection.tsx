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
    padding: '0.7rem 1.5rem',
    background: active ? 'var(--primary-dark)' : 'transparent',
    color: active ? 'white' : 'var(--primary-dark)',
    border: '2px solid var(--primary-dark)',
    cursor: 'pointer',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    fontSize: '0.85rem',
    letterSpacing: '0.5px',
    transition: 'all 0.3s',
  });

  return (
    <section id="products" style={{ padding: '6rem 2rem', background: 'var(--light-gray)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-dark)', fontWeight: 900, textAlign: 'center', letterSpacing: '1px' }}>
          The Luxury Catalog
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {(['all', 'earrings', 'footwear', 'bags'] as Category[]).map(cat => (
            <button key={cat} style={btnStyle(filter === cat)} onClick={() => setFilter(cat)}>
              {cat === 'all' ? 'All Products' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {search && (
          <div style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-dark)' }}>
            Showing results for &ldquo;<strong>{search}</strong>&rdquo; &nbsp;
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'var(--gold-accent)', cursor: 'pointer', textDecoration: 'underline' }}>Clear</button>
          </div>
        )}

        {filtered.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '3rem', color: '#999' }}>No products found.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
