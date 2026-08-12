import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GitHub Wrapped 2025 — Year in Code';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

type PageProps = {
  params: Promise<{ username: string }>;
};

export default async function Image({ params }: PageProps) {
  const resolvedParams = await params;
  const username = resolvedParams?.username ? decodeURIComponent(resolvedParams.username) : 'anonymous';

  let avatarUrl = '';
  let displayName = username;
  let bio = '';
  let reposCount = 0;
  let followersCount = 0;

  try {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      avatarUrl = data.avatar_url || '';
      displayName = data.name || data.login || username;
      bio = data.bio || '';
      reposCount = data.public_repos || 0;
      followersCount = data.followers || 0;
    }
  } catch (err) {
    // Fail-safe fallback if network or API error
  }

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
        {/* Background Grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
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
            borderRadius: '16px',
            boxShadow: '12px 12px 0px 0px #000000',
            padding: '36px 48px',
            position: 'relative',
            justifyContent: 'space-between',
          }}
        >
          {/* Top Bar Header */}
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
                  borderRadius: '6px',
                }}
              >
                🎵
              </div>
              <span style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff' }}>
                GitHub Wrapped 2025
              </span>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#1db954',
                color: '#000000',
                padding: '6px 16px',
                borderRadius: '6px',
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '1.5px',
                border: '2px solid #000000',
              }}
            >
              @{username}
            </div>
          </div>

          {/* User Details & Hero Section */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            {/* Avatar Image */}
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={username}
                width="110"
                height="110"
                style={{
                  borderRadius: '16px',
                  border: '3px solid #1db954',
                  boxShadow: '6px 6px 0px 0px #000000',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  width: '110px',
                  height: '110px',
                  borderRadius: '16px',
                  backgroundColor: '#21262d',
                  border: '3px solid #1db954',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '44px',
                  fontWeight: 900,
                  color: '#1db954',
                  boxShadow: '6px 6px 0px 0px #000000',
                }}
              >
                {username.charAt(0).toUpperCase()}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '48px', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                  {displayName}
                </span>
              </div>
              <p style={{ fontSize: '22px', color: '#1db954', fontWeight: 700, margin: 0 }}>
                @{username} · 2025 Year in Code
              </p>
              {bio ? (
                <p style={{ fontSize: '18px', color: '#8b949e', margin: 0, maxWidth: '650px', overflow: 'hidden' }}>
                  {bio}
                </p>
              ) : null}
            </div>
          </div>

          {/* Footer Stats Badges */}
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#21262d',
                border: '2px solid #30363d',
                padding: '10px 20px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              <span style={{ color: '#1db954' }}>📦</span> {reposCount} Repositories
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#21262d',
                border: '2px solid #30363d',
                padding: '10px 20px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 700,
              }}
            >
              <span style={{ color: '#1db954' }}>👥</span> {followersCount} Followers
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#1db954',
                color: '#000000',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 800,
                border: '2px solid #000000',
              }}
            >
              <span>🔥</span> View Spotify Stats Cards
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
