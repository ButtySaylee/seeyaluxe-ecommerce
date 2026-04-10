'use client';

import { useState, useEffect } from 'react';

export default function PromoBanner() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ height: 'clamp(35px, 5vw, 45px)' }} />;

  return (
    <div style={{
      background: 'linear-gradient(270deg, #1a0a1a, #4a1a4a, #6b2d6b, #c084a0, #d4a5a5, #c084a0, #6b2d6b, #4a1a4a, #1a0a1a)',
      backgroundSize: '400% 400%',
      animation: 'promoBanner 6s ease infinite',
      color: 'white',
      textAlign: 'center',
      padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
      fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
      position: 'fixed',
      top: 'clamp(50px, 13vw, 68px)',
      left: 0,
      right: 0,
      zIndex: 1001,
      overflow: 'hidden',
      wordBreak: 'break-word',
    }}>
      <span style={{ position: 'absolute', left: '3%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2s ease infinite', fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', display: 'none' }} className="desktop-sparkle">✦</span>
      <span style={{ position: 'absolute', left: '7%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2.4s ease infinite 0.3s', fontSize: 'clamp(0.5rem, 1vw, 0.7rem)', display: 'none' }} className="desktop-sparkle">✦</span>
      <span style={{ position: 'absolute', right: '7%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2.4s ease infinite 0.5s', fontSize: 'clamp(0.5rem, 1vw, 0.7rem)', display: 'none' }} className="desktop-sparkle">✦</span>
      <span style={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', animation: 'sparkle 2s ease infinite 0.2s', fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', display: 'none' }} className="desktop-sparkle">✦</span>

      <span style={{ marginRight: 'clamp(0.2rem, 1vw, 0.8rem)', fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', display: 'inline-block' }}>👑</span>
      <strong style={{
        background: 'linear-gradient(90deg, #fff5e0, #ffd700, #fff5e0)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: 'clamp(0.65rem, 1.5vw, 0.9rem)',
        letterSpacing: 'clamp(0.25px, 1vw, 1px)',
        animation: 'promoPulse 2s ease infinite',
        display: 'inline-block',
      }}>NEW LUXE DROPS</strong>
      <span style={{ margin: 'clamp(0.2rem, 1vw, 0.8rem)', opacity: 0.6, display: 'none' }} className="separator-text">|</span>
      <span style={{ letterSpacing: 'clamp(0.25px, 1vw, 0.5px)', display: 'none', marginTop: 'clamp(0.25rem, 0.5vw, 0.3rem)', fontSize: 'clamp(0.6rem, 1.5vw, 0.8rem)' }} className="mobile-subtitle">Shop your glow.</span>
      <span style={{ marginLeft: 'clamp(0.2rem, 1vw, 0.8rem)', fontSize: 'clamp(0.7rem, 1.5vw, 1rem)', display: 'inline-block' }}>👑</span>

      <style>{`
        @media (min-width: 769px) {
          .desktop-sparkle { display: block !important; }
          .separator-text { display: inline !important; }
          .mobile-subtitle { display: inline !important; }
        }
      `}</style>
    </div>
  );
}
