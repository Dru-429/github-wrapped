import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Get Your GitHub Wrapped 2025 — Spotify Style Developer Cards';
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
              'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Outer Neo-Brutalist Frame */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#151b23',
            border: '4px solid #1db954',
            borderRadius: '12px',
            boxShadow: '12px 12px 0px 0px #000000',
            padding: '36px 48px',
            position: 'relative',
            justifyContent: 'space-between',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justify: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  backgroundColor: '#1db954',
                  color: '#000000',
                  fontWeight: 900,
                  fontSize: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #000000',
                  borderRadius: '4px',
                }}
              >
                🎵
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
                GitHub Wrapped
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1db954',
                color: '#000000',
                padding: '6px 16px',
                borderRadius: '4px',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '1.5px',
                border: '2px solid #000000',
              }}
            >
              SPOTIFY EDITION WRAPPED
            </div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '64px', fontWeight: 900, color: '#ffffff' }}>
                Get Your
              </span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#1db954',
                  color: '#000000',
                  padding: '4px 20px',
                  transform: 'rotate(-1.5deg)',
                  fontSize: '64px',
                  fontWeight: 900,
                  fontStyle: 'italic',
                  border: '3px solid #000000',
                  borderRadius: '6px',
                }}
              >
                Wrapped
              </div>
            </div>

            <p style={{ fontSize: '24px', color: '#8b949e', maxWidth: '800px' }}>
              One click to generate a full set of shareable Spotify-style stats cards for any GitHub username.
            </p>
          </div>

          {/* 4 Card Highlight Mockups */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <div
              style={{
                flex: 1,
                backgroundColor: '#21262d',
                border: '2px solid #1db954',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#1db954', fontSize: '12px', fontWeight: 800 }}>01</span>
              <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>LOC & Commits</span>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: '#21262d',
                border: '2px solid #1db954',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#1db954', fontSize: '12px', fontWeight: 800 }}>02</span>
              <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>Top Language</span>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: '#21262d',
                border: '2px solid #1db954',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#1db954', fontSize: '12px', fontWeight: 800 }}>03</span>
              <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>Overview Card</span>
            </div>
            <div
              style={{
                flex: 1,
                backgroundColor: '#21262d',
                border: '2px solid #1db954',
                borderRadius: '6px',
                padding: '12px 16px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ color: '#1db954', fontSize: '12px', fontWeight: 800 }}>04</span>
              <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginTop: '4px' }}>Year Timeline</span>
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
