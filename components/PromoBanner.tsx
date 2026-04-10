'use client';

import { useState, useEffect } from 'react';

export default function PromoBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ height: '42px' }} />;

  return (
    <div style={{
      background: 'linear-gradient(270deg, #1a0a1a, #4a1a4a, #6b2d6b, #c084a0, #d4a5a5, #c084a0, #6b2d6b, #4a1a4a, #1a0a1a)',
      backgroundSize: '400% 400%',
      animation: 'promoBanner 6s ease infinite',
      color: 'white',
      textAlign: 'center',
      padding: '0.75rem 1rem',
      fontSize: '0.9rem',
      position: 'fixed',
      top: '70px',
      left: 0,
      right: 0,
      zIndex: 998,
      overflow: 'hidden',
    }}>
      <span style={{ position: 'absolute', left: '3%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2s ease infinite', fontSize: '1rem' }}>✦</span>
      <span style={{ position: 'absolute', left: '7%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2.4s ease infinite 0.3s', fontSize: '0.7rem' }}>✦</span>
      <span style={{ position: 'absolute', right: '7%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2.4s ease infinite 0.5s', fontSize: '0.7rem' }}>✦</span>
      <span style={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2s ease infinite 0.2s', fontSize: '1rem' }}>✦</span>

      <span style={{ marginRight: '0.8rem', fontSize: '1rem' }}>👑</span>
      <strong style={{
        background: 'linear-gradient(90deg, #fff5e0, #ffd700, #fff5e0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '1rem',
        letterSpacing: '1px',
        animation: 'promoPulse 2s ease infinite',
        display: 'inline-block',
      }}>NEW SEASON LUXURY COLLECTION</strong>
      <span style={{ margin: '0 0.8rem', opacity: 0.6 }}>|</span>
      <span style={{ letterSpacing: '0.5px' }}>Handpicked statement styles now live</span>
      <span style={{ margin: '0 0.8rem', opacity: 0.6 }}>|</span>
      <strong style={{ color: '#ffd700', letterSpacing: '0.5px', fontSize: '0.9rem' }}>Elevate every look with SeeYa Luxe</strong>
      <span style={{ marginLeft: '0.8rem', fontSize: '1rem' }}>👑</span>
    </div>
  );
}
