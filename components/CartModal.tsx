'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useCart } from './CartProvider';

const DISCOUNT_CODE = 'LUXE10';
const DISCOUNT_PCT = 0.10;
const PROMO_START = new Date('2026-03-15T00:00:00');
const PROMO_END   = new Date('2026-03-20T23:59:59');

function isPromoActive() {
  const now = new Date();
  return now >= PROMO_START && now <= PROMO_END;
}

export default function CartModal() {
  const { items, isOpen, setCartOpen, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [step, setStep] = useState<'cart' | 'review'>('cart');
  const [orderRef] = useState(() => 'SL-' + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [codeInput, setCodeInput] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [codeError, setCodeError] = useState('');

  const discountAmount = discountApplied ? totalPrice * DISCOUNT_PCT : 0;
  const finalTotal = totalPrice - discountAmount;

  const applyCode = () => {
    const code = codeInput.trim().toUpperCase();
    if (code !== DISCOUNT_CODE) {
      setCodeError('Invalid code. Please try again.');
      setDiscountApplied(false);
      return;
    }
    if (!isPromoActive()) {
      setCodeError('This code is only valid from 15th – 20th March 2026.');
      setDiscountApplied(false);
      return;
    }
    setDiscountApplied(true);
    setCodeError('');
  };

  const removeCode = () => {
    setDiscountApplied(false);
    setCodeInput('');
    setCodeError('');
  };

  const proceedToReview = () => {
    if (items.length === 0) return;
    setStep('review');
  };

  const confirmCheckout = () => {
    const orderText = items.map(i => `• ${i.name} x${i.quantity} — ₵${(i.price * i.quantity).toFixed(2)}`).join('\n');
    const discountLine = discountApplied ? `\nDiscount (LUXE10 -10%): -₵${discountAmount.toFixed(2)}` : '';
    const message = encodeURIComponent(
      `Hello SEEYA LUXE! I'd like to order:\n\n${orderText}\n\nSubtotal: ₵${totalPrice.toFixed(2)}${discountLine}\nTotal: ₵${finalTotal.toFixed(2)}\n\nOrder Ref: ${orderRef}\n\nPlease confirm availability and payment details.`
    );
    window.open(`https://wa.me/233555008134?text=${message}`, '_blank');
    setCartOpen(false);
    setStep('cart');
  };

  const handleClose = () => { setCartOpen(false); setStep('cart'); };

  if (!isOpen) return null;

  return (
    <>
      <div onClick={handleClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1999 }} />
      <div style={{
        position: 'fixed', right: 0, top: 0, width: '420px', maxWidth: '100vw', height: '100vh',
        background: 'white', zIndex: 2000, display: 'flex', flexDirection: 'column',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{ background: 'var(--primary-dark)', color: 'white', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.5rem' }}>
              {step === 'cart' ? 'Shopping Cart' : 'Review Order'}
            </h2>
            {step === 'review' && (
              <p style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.2rem', letterSpacing: '1px' }}>Ref: {orderRef}</p>
            )}
          </div>
          <button onClick={handleClose} style={{ background: 'none', border: 'none', color: 'white', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
        </div>

        {/* ── STEP 1: CART ── */}
        {step === 'cart' && (
          <>
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

                {/* Promo code input */}
                {!discountApplied ? (
                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <input
                        type="text"
                        value={codeInput}
                        onChange={e => { setCodeInput(e.target.value); setCodeError(''); }}
                        onKeyDown={e => e.key === 'Enter' && applyCode()}
                        placeholder="Promo code (e.g. LUXE10)"
                        style={{ flex: 1, padding: '0.6rem 0.8rem', border: '1px solid #ddd', fontSize: '0.85rem', outline: 'none', color: 'var(--text-dark)' }}
                      />
                      <button onClick={applyCode}
                        style={{ padding: '0.6rem 1rem', background: 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                      >Apply</button>
                    </div>
                    {codeError && <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginTop: '0.4rem' }}>{codeError}</p>}
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f0faf3', border: '1px solid #25D366', padding: '0.6rem 0.8rem', marginBottom: '1rem', borderRadius: '3px' }}>
                    <span style={{ fontSize: '0.85rem', color: '#1a7a3a', fontWeight: 600 }}>✓ LUXE10 — 10% off applied!</span>
                    <button onClick={removeCode} style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '1.1rem', lineHeight: 1 }}>×</button>
                  </div>
                )}

                {/* Totals */}
                {discountApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.4rem', color: '#666' }}>
                    <span>Subtotal:</span>
                    <span>₵{totalPrice.toFixed(2)}</span>
                  </div>
                )}
                {discountApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.6rem', color: '#1a7a3a', fontWeight: 600 }}>
                    <span>Discount (10%):</span>
                    <span>−₵{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary-dark)' }}>
                  <span>Total:</span>
                  <span style={{ color: 'var(--gold-accent)' }}>₵{finalTotal.toFixed(2)}</span>
                </div>

                <button onClick={proceedToReview}
                  style={{ width: '100%', padding: '1rem', background: 'var(--primary-dark)', color: 'white', border: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.3s', fontSize: '0.95rem' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-accent)'; e.currentTarget.style.color = 'var(--primary-dark)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary-dark)'; e.currentTarget.style.color = 'white'; }}
                >
                  Review Order →
                </button>
              </div>
            )}
          </>
        )}

        {/* ── STEP 2: REVIEW ── */}
        {step === 'review' && (
          <>
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {/* Order reference banner */}
              <div style={{ background: 'var(--light-gray)', border: '1px solid var(--gold-accent)', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.3rem' }}>Your Order Reference</p>
                <p style={{ fontFamily: 'var(--font-playfair, serif)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--primary-dark)', letterSpacing: '3px' }}>{orderRef}</p>
                <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.3rem' }}>Share this with us on WhatsApp</p>
              </div>

              {/* Order items summary */}
              <div style={{ marginBottom: '1.5rem' }}>
                {items.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.7rem 0', borderBottom: '1px solid #f0f0f0', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>{item.name} <span style={{ color: '#999' }}>×{item.quantity}</span></span>
                    <span style={{ color: 'var(--primary-dark)', fontWeight: 700 }}>₵{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-dark)', padding: '0.5rem 0', borderTop: '2px solid var(--gold-accent)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--gold-accent)' }}>₵{finalTotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.8rem', color: '#1a7a3a', fontWeight: 600 }}>
                  ✓ LUXE10 applied — you saved ₵{discountAmount.toFixed(2)}!
                </div>
              )}

              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#888', lineHeight: 1.7, textAlign: 'center' }}>
                Clicking below will open WhatsApp with your full order. Our team will confirm availability and share payment details.
              </p>
            </div>

            <div style={{ borderTop: '2px solid var(--gold-accent)', padding: '1.5rem', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <button onClick={confirmCheckout}
                style={{ width: '100%', padding: '1rem', background: '#25D366', color: 'white', border: 'none', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                <i className="fab fa-whatsapp" style={{ fontSize: '1.2rem' }} /> Confirm & Send to WhatsApp
              </button>
              <button onClick={() => setStep('cart')}
                style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '2px solid var(--primary-dark)', color: 'var(--primary-dark)', fontWeight: 600, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                ← Edit Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
