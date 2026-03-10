'use client';

import { useState, useEffect } from 'react';
import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import CartModal from '@/components/CartModal';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <CartProvider>
      {/* Promo Banner */}
      <div style={{ background: 'linear-gradient(135deg, var(--primary-dark), #9d7b9f)', color: 'white', textAlign: 'center', padding: '0.8rem 1rem', fontSize: '0.9rem', position: 'relative', zIndex: 999 }}>
        <strong style={{ color: 'var(--gold-accent)' }}>FREE DELIVERY</strong> on all orders over ₵1,000 | Shop Now &amp; Pay with Mobile Money!
      </div>

      <Header />
      <CartModal />

      {/* Hero */}
      <section id="hero" style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #ffc0cb 0%, #ffb6d9 25%, #dda0d9 50%, #c084d9 75%, #b28dd9 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
        color: 'white', marginTop: '70px', position: 'relative',
      }}>
        <div>
          <h1 className="hero-title" style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '4rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '2px', color: '#fff5f7', textShadow: '2px 2px 8px rgba(80,20,60,0.3)' }}>
            SEEYA LUXE
          </h1>
          <h2 className="hero-h2" style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700, color: '#0a0405', textShadow: '2px 2px 8px rgba(80,20,60,0.3)' }}>
            The Standard of Ghanaian Elegance
          </h2>
          <p className="hero-tagline" style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 300, letterSpacing: '1px', color: '#fff5f7', textShadow: '1px 1px 5px rgba(80,20,60,0.2)' }}>
            Curated luxury delivered to your doorstep
          </p>
          <a href="#products" className="hero-btn" style={{
            display: 'inline-block', padding: '1.3rem 3.5rem', background: '#fff5f7', color: '#c084d9',
            textDecoration: 'none', fontWeight: 800, letterSpacing: '1.5px', fontSize: '1.1rem',
            transition: 'all 0.3s ease', textTransform: 'uppercase', boxShadow: '0 8px 25px rgba(0,0,0,0.25)',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c084d9'; e.currentTarget.style.color = '#fff5f7'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff5f7'; e.currentTarget.style.color = '#c084d9'; }}
          >
            Explore Collection
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mobile-section" style={{ padding: '6rem 2rem', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 className="section-heading" style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-dark)', fontWeight: 900 }}>About SEEYA LUXE</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '1rem' }}>
            We are a Ghanaian-based luxury brand dedicated to delivering premium quality products that celebrate local craftsmanship and African excellence.
          </p>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-dark)', lineHeight: 1.8 }}>
            Every piece in our collection is carefully curated to meet the highest standards of sophistication, ensuring that our discerning clients receive nothing but the best.
          </p>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ background: 'var(--light-gray)', padding: '3rem 2rem', textAlign: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: 1000, margin: '0 auto' }}>
          {[['500+', 'Happy Customers'], ['1000+', 'Products Sold'], ['4.9★', 'Customer Rating'], ['24-48h', 'Fast Delivery']].map(([num, label]) => (
            <div key={label} style={{ padding: '1rem' }}>
              <span style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '3rem', color: 'var(--gold-accent)', fontWeight: 900, display: 'block' }}>{num}</span>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-dark)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.5rem', display: 'block' }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <ProductsSection />

      {/* How It Works */}
      <section id="how-it-works" className="mobile-section" style={{ padding: '4rem 2rem 2rem', background: 'white' }}>
        <h2 className="section-heading" style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary-dark)', fontWeight: 900, textAlign: 'center' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', maxWidth: 1200, margin: '0 auto' }}>
          {[
            ['01', 'Browse Collection', 'Explore our carefully curated selection of luxury products.'],
            ['02', 'Add to Cart', 'Select your favorite items and add them to your shopping cart. Review your selections before checkout.'],
            ['03', 'WhatsApp Checkout', 'Complete your order via WhatsApp. Our team will confirm availability and provide secure payment details.'],
            ['04', 'Premium Delivery', 'Receive your order within 24–48 hours with white-glove service. We ensure your luxury items arrive in perfect condition.'],
          ].map(([num, title, desc]) => (
            <div key={num} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '3rem', color: 'var(--gold-accent)', fontWeight: 900, marginBottom: '1rem' }}>{num}</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--primary-dark)', fontWeight: 700 }}>{title}</h3>
              <p style={{ color: '#666', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '2rem 2rem 4rem', background: 'white' }}>
        <h2 className="section-heading" style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary-dark)', fontWeight: 900, textAlign: 'center' }}>What Our Customers Say</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: 1200, margin: '0 auto' }}>
          {[
            { text: "Absolutely stunning pieces! The quality is exceptional and the delivery was so fast. SEEYA LUXE has become my go-to for luxury accessories.", name: 'Ama Osei', location: 'Accra, Ghana' },
            { text: "I purchased the Heritage Crossbody and it's perfect! The craftsmanship is top-notch. Truly represents African luxury at its finest.", name: 'Nana Kwame', location: 'Kumasi, Ghana' },
            { text: "The earrings I ordered exceeded my expectations. SEEYA LUXE truly delivers on their promise of luxury and elegance.", name: 'Abena Mensah', location: 'Takoradi, Ghana' },
          ].map(({ text, name, location }) => (
            <div key={name} style={{ background: 'var(--light-gray)', padding: '2rem', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '3rem', color: 'var(--gold-accent)', lineHeight: 1, marginBottom: '1rem' }}>&ldquo;</div>
              <div style={{ color: 'var(--gold-accent)', marginBottom: '1rem' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{text}</p>
              <h4 style={{ fontWeight: 600, color: 'rgb(221,102,102)' }}>{name}</h4>
              <p style={{ fontSize: '0.85rem', color: '#999' }}>{location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust-badges" style={{ display: 'flex', justifyContent: 'center', gap: '4rem', padding: '2.5rem 2rem', flexWrap: 'wrap', background: 'white', borderTop: '1px solid #f0e8ec', borderBottom: '1px solid #f0e8ec' }}>
        {[
          { label: 'Secure Payment', svg: <svg viewBox="0 0 24 24" fill="none" stroke="#c084a0" strokeWidth="1.8" style={{ width: 44, height: 44 }}><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" /></svg> },
          { label: 'Fast Delivery', svg: <svg viewBox="0 0 24 24" fill="none" stroke="#c084a0" strokeWidth="1.8" style={{ width: 44, height: 44 }}><rect x="1" y="3" width="15" height="13" rx="1" /><path d="M16 8h4l3 5v3h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg> },
          { label: 'Easy Returns', svg: <svg viewBox="0 0 24 24" fill="none" stroke="#c084a0" strokeWidth="1.8" style={{ width: 44, height: 44 }}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg> },
          { label: '24/7 Support', svg: <svg viewBox="0 0 24 24" fill="none" stroke="#c084a0" strokeWidth="1.8" style={{ width: 44, height: 44 }}><path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" /></svg> },
        ].map(({ label, svg }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.7rem' }}>
            {svg}
            <span style={{ fontSize: '0.9rem', color: '#555', fontWeight: 600, letterSpacing: '0.3px' }}>{label}</span>
          </div>
        ))}
      </section>

      {/* Newsletter */}
      <section style={{ background: 'linear-gradient(135deg, #7a5c7a 0%, #9d7b9f 50%, #8a6b8a 100%)', padding: '5rem 2rem', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 700 }}>Join Our VIP List</h2>
        <p style={{ marginBottom: '2.5rem', fontSize: '1.1rem', opacity: 0.9 }}>Subscribe for exclusive offers, new arrivals, and luxury insights</p>
        <form className="newsletter-form" onSubmit={e => { e.preventDefault(); const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value; alert(`Thank you for subscribing! We'll send exclusive updates to ${email}`); (e.target as HTMLFormElement).reset(); }} style={{ display: 'flex', maxWidth: 560, margin: '0 auto', gap: 0, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
          <input name="email" type="email" required placeholder="Enter your email address" style={{ flex: 1, padding: '1.1rem 1.5rem', border: 'none', fontSize: '1rem', outline: 'none', borderRadius: 0, background: 'white', color: '#333' }} />
          <button type="submit" style={{ padding: '1.1rem 2rem', background: '#b07a8a', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', borderRadius: 0 }}>
            Subscribe
          </button>
        </form>
      </section>

      <Footer />

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={scrollToTop}
          style={{ position: 'fixed', bottom: 100, right: 30, background: '#5a3060', color: 'white', borderRadius: '50%', width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, boxShadow: '0 4px 15px rgba(0,0,0,0.3)', zIndex: 1500, border: 'none', cursor: 'pointer' }}
          aria-label="Scroll to top">
          ↑
        </button>
      )}

      {/* WhatsApp Float */}
      <a href="https://wa.me/233555008134" target="_blank" rel="noreferrer"
        style={{ position: 'fixed', bottom: 30, right: 30, background: '#25D366', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: '0 4px 15px rgba(0,0,0,0.3)', zIndex: 1500, textDecoration: 'none', animation: 'pulse 2s infinite' }}>
        <i className="fab fa-whatsapp" />
      </a>
    </CartProvider>
  );
}
