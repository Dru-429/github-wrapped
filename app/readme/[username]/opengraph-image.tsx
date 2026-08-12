import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Terminal Profile README';
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
  let publicRepos = 0;

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
      publicRepos = data.public_repos || 0;
    }
  } catch (err) {
    // Fallback
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
          fontFamily: 'monospace',
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
              'linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Terminal Window */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#151b23',
            border: '4px solid #a3e635',
            borderRadius: '16px',
            boxShadow: '12px 12px 0px 0px #000000',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#21262d',
              borderBottom: '2px solid #30363d',
              padding: '14px 24px',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
              <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
              <span style={{ marginLeft: '12px', fontSize: '16px', color: '#8b949e', fontWeight: 700 }}>
                {username}_readme.json
              </span>
            </div>
            <span style={{ color: '#a3e635', fontSize: '14px', fontWeight: 700 }}>
              TERMINAL README
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              display: 'flex',
              padding: '32px 40px',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
            }}
          >
            {/* Left: JSON Code Block */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '18px',
                color: '#c9d1d9',
                flex: 1,
              }}
            >
              <div style={{ color: '#a3e635', fontWeight: 700, fontSize: '20px', marginBottom: '8px' }}>
                {username}@devbox:~$ cat profile.json
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#c9d1d9' }}>&#123;</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingLeft: '24px' }}>
                <span style={{ color: '#ff7b72' }}>&quot;name&quot;:</span>
                <span style={{ color: '#a5d6ff' }}>&quot;{displayName}&quot;,</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingLeft: '24px' }}>
                <span style={{ color: '#ff7b72' }}>&quot;handle&quot;:</span>
                <span style={{ color: '#a5d6ff' }}>&quot;@{username}&quot;,</span>
              </div>

              {bio ? (
                <div style={{ display: 'flex', gap: '8px', paddingLeft: '24px' }}>
                  <span style={{ color: '#ff7b72' }}>&quot;bio&quot;:</span>
                  <span style={{ color: '#a5d6ff' }}>&quot;{bio.slice(0, 50)}...&quot;,</span>
                </div>
              ) : null}

              <div style={{ display: 'flex', gap: '8px', paddingLeft: '24px' }}>
                <span style={{ color: '#ff7b72' }}>&quot;public_repos&quot;:</span>
                <span style={{ color: '#79c0ff' }}>{publicRepos},</span>
              </div>

              <div style={{ display: 'flex', gap: '8px', paddingLeft: '24px' }}>
                <span style={{ color: '#ff7b72' }}>&quot;status&quot;:</span>
                <span style={{ color: '#a5d6ff' }}>&quot;Building &amp; Shipping 🚀&quot;</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: '#c9d1d9' }}>&#125;</span>
              </div>
            </div>

            {/* Right: User Avatar Badge */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#21262d',
                border: '2px solid #a3e635',
                padding: '24px',
                borderRadius: '12px',
                gap: '12px',
                width: '240px',
              }}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={username}
                  width="90"
                  height="90"
                  style={{
                    borderRadius: '50%',
                    border: '2px solid #a3e635',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: '50%',
                    backgroundColor: '#151b23',
                    border: '2px solid #a3e635',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '36px',
                    color: '#a3e635',
                    fontWeight: 900,
                  }}
                >
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', textAlign: 'center' }}>
                @{username}
              </span>
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
