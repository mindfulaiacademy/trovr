'use client';

import { useState, useEffect } from 'react';

const GA_ID = 'G-L739P1KS7X';

function loadGA() {
  if (document.getElementById('gtag-script')) return;

  const script = document.createElement('script');
  script.id = 'gtag-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('trovr_cookies');
    if (consent === 'accepted') {
      loadGA();
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem('trovr_cookies', 'accepted');
    loadGA();
    setVisible(false);
  }

  function decline() {
    localStorage.setItem('trovr_cookies', 'declined');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid #e5e7eb',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '24px',
      flexWrap: 'wrap',
      zIndex: 1000,
      boxShadow: '0 -2px 12px rgba(0,0,0,0.07)',
    }}>
      <p style={{ margin: 0, fontSize: '14px', color: '#444', lineHeight: '1.5', whiteSpace: 'nowrap' }}>
        Wir verwenden Google Analytics, um zu verstehen, wie Besucher unsere Seite nutzen. Die Daten werden anonym erhoben.{' '}
        <a href="/privacy.html" style={{ color: '#1B6B4A', textDecoration: 'underline' }}>Datenschutz</a>
      </p>
      <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            background: '#fff',
            color: '#444',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Ablehnen
        </button>
        <button
          onClick={accept}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: 'none',
            background: '#1B6B4A',
            color: '#fff',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
