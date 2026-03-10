'use client';

import Image from 'next/image';
import { useCart } from './CartProvider';

export default function CartModal() {
  const { items, isOpen, setCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();

  const checkout = () => {
    if (items.length === 0) return;
    const orderText = items.map(i => `• ${i.name} x${i.quantity} — ₵${(i.price * i.quantity).toFixed(2)}`).join('\n');
    const message = encodeURIComponent(`Hello SEEYA LUXE! I'd like to order:\n\n${orderText}\n\nTotal: ₵${totalPrice.toFixed(2)}\n\nPlease confirm availability and payment details.`);
    window.open(`https://wa.me/233XXXXXXXXX?text=${message}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      <div onClick={() => setCartOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1999 }} />
      <div style={{
        position: 'fixed', right: 0, top: 0, width: '400px', maxWidth: '100vw', height: '100vh',
        background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.3)', overflowY: 'auto',
      }}>
        <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.5rem' }}>Shopping Cart</h2>
          <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', padding: '3rem 1rem', color: '#999' }}>Your cart is empty</p>
          ) : (
            items.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #eee' }}>
                <div style={{ position: 'relative', width: 80, height: 80, flexShrink: 0 }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: 'var(--primary-dark)', marginBottom: '0.3rem' }}>{item.name}</p>
                  <p style={{ color: 'var(--gold-accent)', fontWeight: 700 }}>₵{item.price.toFixed(2)}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'var(--primary-dark)', color: 'white', border: 'none', width: 28, height: 28, cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'var(--primary-dark)', color: 'white', border: 'none', width: 28, height: 28, cursor: 'pointer', fontWeight: 700, fontSize: '1rem' }}>+</button>
                    <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem', marginLeft: '0.5rem' }}>Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div style={{ borderTop: '2px solid var(--gold-accent)', padding: '1.5rem', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-dark)' }}>
              <span>Total:</span>
              <span style={{ color: 'var(--gold-accent)' }}>₵{totalPrice.toFixed(2)}</span>
            </div>
            <button onClick={checkout} style={{ width: '100%', padding: '1rem', background: 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-accent)'; e.currentTarget.style.color = 'var(--primary-dark)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary-dark)'; e.currentTarget.style.color = 'white'; }}
            >
              Checkout via WhatsApp
            </button>
          </div>
        )}
      </div>
    </>
  );
}
