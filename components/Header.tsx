'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from './CartProvider';

export default function Header() {
  const { totalItems, setCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      const el = document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(new CustomEvent('search', { detail: search.trim() }));
      setMobileOpen(false);
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backgroundColor: scrolled ? 'rgba(26,26,26,0.98)' : 'rgba(26,26,26,0.95)',
        padding: 'clamp(0.75rem, 1.5vw, 1.2rem) clamp(0.5rem, 2vw, 1rem)',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 20px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease',
        gap: '1rem',
        flexWrap: 'wrap',
      }}
    >
      <Link href="/" style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: 'clamp(1.3rem, 5vw, 1.8rem)', fontWeight: 900, color: 'var(--gold-accent)', letterSpacing: '2px', textDecoration: 'none', whiteSpace: 'nowrap' }}>
        SEEYA LUXE
      </Link>

      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: 'none', background: 'none', border: 'none', color: 'white', fontSize: 'clamp(1.2rem, 3vw, 1.5rem)', cursor: 'pointer' }}
        className="mobile-menu-btn"
      >
        <i className={`fas fa-${mobileOpen ? 'times' : 'bars'}`} />
      </button>

      {/* Desktop search + nav container */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        justifyContent: 'flex-end',
        flex: 1,
        order: 3,
      }} className="header-right">
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.1)', borderRadius: '25px', padding: 'clamp(0.35rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem)', minWidth: 0 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ background: 'none', border: 'none', color: 'white', outline: 'none', width: '100%', fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)', minWidth: 0 }}
          />
          <button type="submit" style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', flexShrink: 0 }}>
            <i className="fas fa-search" />
          </button>
        </form>

        <nav style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', listStyle: 'none', gap: 'clamp(0.5rem, 1.5vw, 1rem)', margin: 0, padding: 0 }}>
            {[['Home', '#hero'], ['About', '#about'], ['Collection', '#products'], ['How It Works', '#how-it-works'], ['Contact', '#footer']].map(([label, href]) => (
              <li key={label}>
                <a href={href} style={{ color: 'white', textDecoration: 'none', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.25px', transition: 'color 0.3s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--gold-accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'white')}
                >{label}</a>
              </li>
            ))}
            <li>
              <Link href="/admin" style={{ color: 'var(--gold-accent)', textDecoration: 'none', fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.25px' }}>Admin</Link>
            </li>
          </ul>
        </nav>

        <button onClick={() => setCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', flexShrink: 0 }} className="cart-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 'clamp(20px, 4vw, 28px)', height: 'clamp(20px, 4vw, 28px)', fill: 'white', minWidth: 20, minHeight: 20 }}>
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
          {totalItems > 0 && (
            <span style={{ position: 'absolute', top: -8, right: -8, background: 'var(--gold-accent)', color: 'var(--primary-dark)', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav style={{
          width: '100%',
          background: 'rgba(26,26,26,0.99)',
          padding: 'clamp(0.75rem, 1.5vw, 1rem)',
          marginTop: '0.5rem',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          order: 4,
        }}>
          <ul style={{ display: 'flex', flexDirection: 'column', listStyle: 'none', gap: '1rem', margin: 0, padding: 0 }}>
            {[['Home', '#hero'], ['About', '#about'], ['Collection', '#products'], ['How It Works', '#how-it-works'], ['Contact', '#footer']].map(([label, href]) => (
              <li key={label}>
                <a href={href} style={{ color: 'white', textDecoration: 'none', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                  onClick={() => setMobileOpen(false)}
                >{label}</a>
              </li>
            ))}
            <li>
              <Link href="/admin" style={{ color: 'var(--gold-accent)', textDecoration: 'none', fontSize: 'clamp(0.8rem, 2vw, 0.9rem)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}
                onClick={() => setMobileOpen(false)}
              >Admin</Link>
            </li>
          </ul>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          header {
            flex-wrap: wrap !important;
            order: 1;
          }
          .mobile-menu-btn { display: block !important; order: 2; }
          .desktop-nav { display: none !important; }
          .header-right { width: 100% !important; order: 3; flex-direction: column-reverse; gap: 0.75rem !important; margin-top: 0.5rem; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
