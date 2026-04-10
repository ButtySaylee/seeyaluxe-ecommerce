export default function Footer() {
  return (
    <footer id="footer" style={{ background: 'var(--primary-dark)', color: 'white', padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 5vw, 2rem)', textAlign: 'center' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--gold-accent)', marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>Phone</h4>
            <a href="tel:+233" style={{ color: 'white', textDecoration: 'none', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>+233 XX XXX XXXX</a>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--gold-accent)', marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>WhatsApp</h4>
            <a href="https://wa.me/233XXXXXXXXX" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>Chat with us</a>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--gold-accent)', marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>Instagram</h4>
            <a href="https://instagram.com/seeyaluxe" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none', fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>@seeyaluxe</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--gold-accent)', marginBottom: '1.5rem' }} />
        <p style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)', color: '#aaa', letterSpacing: '0.5px' }}>
          &copy; {new Date().getFullYear()} SEEYA LUXE. All rights reserved. | Ghanaian Luxury Excellence
        </p>
      </div>
    </footer>
  );
}
