'use client';

import { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState<Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> } | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem('installDismissed')) return;

    // Don't show if already installed (running in standalone)
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !(window.navigator as Navigator & { standalone?: boolean }).standalone;
    setIsIOS(ios);

    if (ios) {
      // Show iOS instructions after a short delay
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Chrome / Android / Edge — wait for the browser event
    const handler = (e: Event) => {
      e.preventDefault();
      setPrompt(e as Event & { prompt: () => void; userChoice: Promise<{ outcome: string }> });
      setTimeout(() => setShowBanner(true), 3000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!prompt) return;
    prompt.prompt();
    const { outcome } = await prompt.userChoice;
    if (outcome === 'accepted') setShowBanner(false);
    setPrompt(null);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    sessionStorage.setItem('installDismissed', '1');
  };

  if (!showBanner || dismissed) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: 'calc(100% - 2rem)',
      maxWidth: '480px',
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(107,91,110,0.25)',
      border: '1px solid var(--gold-accent)',
      zIndex: 9999,
      overflow: 'hidden',
    }}>
      {/* Top accent bar */}
      <div style={{ height: '4px', background: 'linear-gradient(90deg, #6b5b6e, #d4a5a5, #6b5b6e)' }} />

      <div style={{ padding: '1.2rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {/* Icon */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/icon-96.png" alt="SEEYA LUXE" width={52} height={52} style={{ borderRadius: '12px', flexShrink: 0 }} />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-playfair, serif)', fontWeight: 700, color: 'var(--primary-dark)', fontSize: '1rem', marginBottom: '0.2rem' }}>
            Install SEEYA LUXE
          </p>
          {isIOS ? (
            <p style={{ fontSize: '0.8rem', color: '#777', lineHeight: 1.5 }}>
              Tap <strong style={{ color: 'var(--primary-dark)' }}>Share</strong> then <strong style={{ color: 'var(--primary-dark)' }}>&ldquo;Add to Home Screen&rdquo;</strong> to install the app.
            </p>
          ) : (
            <p style={{ fontSize: '0.8rem', color: '#777', lineHeight: 1.5 }}>
              Add to your home screen for a faster, app-like experience.
            </p>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexShrink: 0 }}>
          {!isIOS && (
            <button
              onClick={handleInstall}
              style={{
                padding: '0.5rem 1.1rem',
                background: 'var(--primary-dark)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
              }}
            >
              Install
            </button>
          )}
          <button
            onClick={handleDismiss}
            style={{
              padding: '0.4rem 0.8rem',
              background: 'transparent',
              color: '#999',
              border: '1px solid #eee',
              borderRadius: '6px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
