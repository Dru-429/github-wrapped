import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GitHub Wrapped 2025 — Spotify Style Year in Code & Terminal README';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d1117',
          color: '#f0f6fc',
          fontFamily: 'sans-serif',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* Background Grid Accent */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Outer Neo-Brutalist Card Frame */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#151b23',
            border: '4px solid #a3e635',
            borderRadius: '12px',
            boxShadow: '12px 12px 0px 0px #000000',
            padding: '36px 48px',
            position: 'relative',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Bar Chrome */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#a3e635',
                  color: '#0d1117',
                  fontWeight: 900,
                  fontSize: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #000000',
                  borderRadius: '4px',
                }}
              >
                G
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', tracking: '-0.5px' }}>
                GitHub Wrapped
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#a3e635',
                color: '#0d1117',
                padding: '6px 16px',
                borderRadius: '4px',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '1.5px',
                border: '2px solid #000000',
              }}
            >
              ★ 2025 SPOTIFY EDITION · LIVE
            </div>
          </div>

          {/* Main Title Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '72px', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                GitHub
              </span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#a3e635',
                  color: '#0d1117',
                  padding: '4px 20px',
                  transform: 'rotate(-2deg)',
                  fontSize: '68px',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  border: '3px solid #000000',
                  borderRadius: '6px',
                }}
              >
                Wrapped
              </div>
            </div>

            <p style={{ fontSize: '26px', color: '#8b949e', marginTop: '8px', maxWidth: '850px' }}>
              Your year in code wrapped in <span style={{ color: '#a3e635', fontWeight: 700 }}>Spotify Style</span> & custom <span style={{ color: '#ffffff', fontWeight: 700 }}>Terminal READMEs</span>.
            </p>
          </div>

          {/* Bottom Feature Badges */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#21262d',
                border: '2px solid #30363d',
                padding: '10px 18px',
                borderRadius: '6px',
                color: '#c9d1d9',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#a3e635' }}>⚡</span> Top Languages & LOC
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#21262d',
                border: '2px solid #30363d',
                padding: '10px 18px',
                borderRadius: '6px',
                color: '#c9d1d9',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#a3e635' }}>🔥</span> Commit Streaks
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#21262d',
                border: '2px solid #30363d',
                padding: '10px 18px',
                borderRadius: '6px',
                color: '#c9d1d9',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#a3e635' }}>💻</span> Terminal README Builder
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
