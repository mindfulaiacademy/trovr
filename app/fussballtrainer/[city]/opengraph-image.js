import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params }) {
  const { city } = await params;
  const cityLabel = city.charAt(0).toUpperCase() + city.slice(1);

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #f0faf4 0%, #e6f4ec 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '32px' }}>
          <span style={{ fontSize: '96px', fontWeight: '800', color: '#1B6B4A', letterSpacing: '-2px' }}>
            trovr
          </span>
          <span style={{ fontSize: '96px', fontWeight: '800', color: '#F59E0B' }}>.</span>
        </div>

        {/* Headline */}
        <div style={{
          fontSize: '40px',
          fontWeight: '700',
          color: '#111',
          textAlign: 'center',
          maxWidth: '900px',
          lineHeight: '1.2',
          marginBottom: '20px',
        }}>
          Geprüfte Fußballtrainer:innen in {cityLabel} finden
        </div>

        {/* Subline */}
        <div style={{
          fontSize: '24px',
          color: '#444',
          textAlign: 'center',
          maxWidth: '750px',
          lineHeight: '1.4',
          marginBottom: '48px',
        }}>
          DFB-Lizenz · Führungszeugnis verifiziert · Privates Training
        </div>

        {/* Trust badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['✅ Lizenzen verifiziert', '🔒 Führungszeugnis geprüft', '⭐ 4.8 Bewertung'].map(badge => (
            <div key={badge} style={{
              background: '#fff',
              border: '1px solid #d1fae5',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '18px',
              color: '#1B6B4A',
              fontWeight: '600',
            }}>
              {badge}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
