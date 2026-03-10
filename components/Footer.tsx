export default function Footer() {
  return (
    <footer id="footer" style={{ background: 'var(--primary-dark)', color: 'white', padding: '3rem 2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--gold-accent)', marginBottom: '2rem' }}>Get In Touch</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--gold-accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Phone</h4>
            <a href="tel:+233555008134" style={{ color: 'white', textDecoration: 'none' }}>+233 55 500 8134</a>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--gold-accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>WhatsApp</h4>
            <a href="https://wa.me/233555008134" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Chat with us</a>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--font-playfair, serif)', color: 'var(--gold-accent)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Instagram</h4>
            <a href="https://instagram.com/seeyaluxe" target="_blank" rel="noreferrer" style={{ color: 'white', textDecoration: 'none' }}>@seeyaluxe</a>
          </div>
        </div>
        <div style={{ borderTop: '1px solid var(--gold-accent)', marginBottom: '1.5rem' }} />
        <p style={{ fontSize: '0.9rem', color: '#aaa', letterSpacing: '0.5px' }}>
          &copy; {new Date().getFullYear()} SEEYA LUXE. All rights reserved. | Ghanaian Luxury Excellence
        </p>
      </div>
    </footer>
  );
}
