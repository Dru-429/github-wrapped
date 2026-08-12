import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Terminal README Generator — Custom GitHub Profile READMEs';
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
          fontFamily: 'monospace',
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

        {/* Outer Terminal Window Box */}
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
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Terminal Window Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#21262d',
              borderBottom: '2px solid #30363d',
              padding: '14px 24px',
              gap: '10px',
            }}
          >
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
            <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
            <span style={{ marginLeft: '12px', fontSize: '16px', color: '#8b949e', fontWeight: 700 }}>
              terminal_readme_builder.sh
            </span>
          </div>

          {/* Inner Content Area */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '36px 48px',
              flex: 1,
              justifyContent: 'space-between',
            }}
          >
            {/* Terminal Command Line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#a3e635', fontSize: '24px', fontWeight: 800 }}>dev@github:~$</span>
              <span style={{ color: '#ffffff', fontSize: '24px', fontWeight: 700 }}>
                npx generate-terminal-readme
              </span>
            </div>

            {/* Main Headline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '56px', fontWeight: 900, color: '#ffffff', fontFamily: 'sans-serif' }}>
                  Terminal
                </span>
                <div
                  style={{
                    display: 'flex',
                    backgroundColor: '#a3e635',
                    color: '#0d1117',
                    padding: '4px 20px',
                    fontSize: '56px',
                    fontWeight: 900,
                    fontStyle: 'italic',
                    border: '3px solid #000000',
                    borderRadius: '6px',
                    fontFamily: 'sans-serif',
                  }}
                >
                  README
                </div>
              </div>
              <p style={{ fontSize: '22px', color: '#8b949e', fontFamily: 'sans-serif' }}>
                Generate customizable, terminal-themed GitHub profile READMEs in seconds.
              </p>
            </div>

            {/* Feature Pills */}
            <div style={{ display: 'flex', gap: '16px', fontFamily: 'sans-serif' }}>
              <div
                style={{
                  backgroundColor: '#21262d',
                  border: '2px solid #a3e635',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                ⚙️ 4 Unique Layouts
              </div>
              <div
                style={{
                  backgroundColor: '#21262d',
                  border: '2px solid #a3e635',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                ⚡ 1-Click GitHub Fetch
              </div>
              <div
                style={{
                  backgroundColor: '#21262d',
                  border: '2px solid #a3e635',
                  padding: '10px 18px',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 700,
                }}
              >
                📋 Copy-Paste Ready Markdown
              </div>
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
