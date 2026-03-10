'use client';

import { CartProvider } from '@/components/CartProvider';
import Header from '@/components/Header';
import CartModal from '@/components/CartModal';
import ProductsSection from '@/components/ProductsSection';
import Footer from '@/components/Footer';

export default function HomePage() {
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
          <h1 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '4rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '2px', color: '#fff5f7', textShadow: '2px 2px 8px rgba(80,20,60,0.3)' }}>
            SEEYA LUXE
          </h1>
          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 700, color: '#0a0405', textShadow: '2px 2px 8px rgba(80,20,60,0.3)' }}>
            The Standard of Ghanaian Elegance
          </h2>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 300, letterSpacing: '1px', color: '#fff5f7', textShadow: '1px 1px 5px rgba(80,20,60,0.2)' }}>
            Curated luxury delivered to your doorstep
          </p>
          <a href="#products" style={{
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
      <section id="about" style={{ padding: '6rem 2rem', background: 'white', textAlign: 'center' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--primary-dark)', fontWeight: 900 }}>About SEEYA LUXE</h2>
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
      <section id="how-it-works" style={{ padding: '6rem 2rem', background: 'white' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary-dark)', fontWeight: 900, textAlign: 'center' }}>How It Works</h2>
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
      <section style={{ padding: '6rem 2rem', background: 'white' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary-dark)', fontWeight: 900, textAlign: 'center' }}>What Our Customers Say</h2>
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

      {/* Newsletter */}
      <section style={{ background: 'linear-gradient(135deg, var(--primary-dark), #9d7b9f)', padding: '4rem 2rem', textAlign: 'center', color: 'white' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', marginBottom: '1rem' }}>Stay in the Loop</h2>
        <p style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>Subscribe for exclusive deals, new arrivals &amp; luxury inspiration.</p>
        <form onSubmit={e => { e.preventDefault(); alert('Thanks for subscribing!'); (e.target as HTMLFormElement).reset(); }} style={{ display: 'flex', maxWidth: 500, margin: '0 auto', gap: '0.5rem' }}>
          <input type="email" required placeholder="Your email address" style={{ flex: 1, padding: '1rem', border: 'none', fontSize: '1rem', outline: 'none' }} />
          <button type="submit" style={{ padding: '1rem 2rem', background: 'var(--gold-accent)', color: 'var(--primary-dark)', border: 'none', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Subscribe
          </button>
        </form>
      </section>

      {/* Trust Badges */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '3rem', padding: '2rem', flexWrap: 'wrap', background: 'var(--light-gray)' }}>
        {[['🔒', 'Secure Payment'], ['🚀', 'Fast Delivery'], ['💎', 'Premium Quality'], ['🔄', 'Easy Returns']].map(([icon, text]) => (
          <div key={text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{icon}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 600 }}>{text}</span>
          </div>
        ))}
      </section>

      <Footer />

      {/* WhatsApp Float */}
      <a href="https://wa.me/233XXXXXXXXX" target="_blank" rel="noreferrer"
        style={{ position: 'fixed', bottom: 30, right: 30, background: '#25D366', color: 'white', borderRadius: '50%', width: 60, height: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, boxShadow: '0 4px 15px rgba(0,0,0,0.3)', zIndex: 1500, textDecoration: 'none', animation: 'pulse 2s infinite' }}>
        <i className="fab fa-whatsapp" />
      </a>
    </CartProvider>
  );
}
