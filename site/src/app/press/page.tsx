import React from 'react';
import Header from '@/components/Header';

export default function PressPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: 'var(--fg)' }}>
      <Header dark={false} />

      {/* Header section */}
      <section
        style={{
          padding: '160px 56px 80px',
          background: 'var(--bg-inset)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#5A74FF',
              marginBottom: 16,
            }}
          >
            Press &amp; Brand Kit
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: '0 0 20px',
            }}
          >
            Everything you need to write about Orbit.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
              margin: 0,
            }}
          >
            Download our brand assets, read the quick facts, and reach out to our press team.
          </p>
        </div>
      </section>

      {/* Download kit */}
      <section style={{ padding: '80px 56px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
            }}
          >
            Download Kit
          </h2>
          <div
            style={{
              background: '#5A74FF',
              borderRadius: 24,
              padding: '48px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
              flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* Masked logo */}
              <div
                role="img"
                aria-label="OrbitGuard"
                style={{
                  height: 48,
                  width: 200,
                  background: '#fff',
                  WebkitMaskImage: 'url(/assets/orbitguard-lockup-white-solid.png)',
                  maskImage: 'url(/assets/orbitguard-lockup-white-solid.png)',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'left center',
                  maskPosition: 'left center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                } as React.CSSProperties}
              />
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#"
                style={{
                  background: '#fff',
                  color: '#5A74FF',
                  border: 'none',
                  borderRadius: 999,
                  padding: '14px 24px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                }}
              >
                ↓ Brand Kit (ZIP)
              </a>
              <a
                href="#"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: 999,
                  padding: '14px 24px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  textDecoration: 'none',
                }}
              >
                ↓ Product photos
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brand colors */}
      <section style={{ padding: '0 56px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
            }}
          >
            Brand Colors
          </h2>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              { name: 'Orbit Blue', hex: '#5A74FF' },
              { name: 'Onyx', hex: '#212529' },
              { name: 'Cream', hex: '#F6F6F4' },
              { name: 'White', hex: '#FFFFFF' },
            ].map(color => (
              <div
                key={color.hex}
                style={{
                  flex: '1 1 180px',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: 100,
                    background: color.hex,
                    borderBottom: '1px solid var(--border)',
                  }}
                />
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15 }}>
                    {color.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
                    {color.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typography */}
      <section
        style={{
          padding: '0 56px 80px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: '-0.02em',
              margin: '0 0 24px',
            }}
          >
            Typography
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div
              style={{
                padding: '32px',
                border: '1px solid var(--border)',
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--fg-3)',
                  marginBottom: 16,
                }}
              >
                UI Font
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 36,
                  letterSpacing: '-0.02em',
                  marginBottom: 8,
                }}
              >
                DM Sans
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-2)' }}>
                Aa Bb Cc — 400 · 600 · 700 · 800
              </div>
            </div>
            <div
              style={{
                padding: '32px',
                border: '1px solid var(--border)',
                borderRadius: 16,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--fg-3)',
                  marginBottom: 16,
                }}
              >
                Display Font
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontSize: 36,
                  letterSpacing: '-0.01em',
                  marginBottom: 8,
                }}
              >
                Rez
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--fg-2)' }}>
                Headlines · Display type · Brand moments
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts */}
      <section
        style={{
          padding: '0 56px 80px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 56,
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px',
                }}
              >
                Quick Facts
              </h2>
              <ul
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 2,
                  color: 'var(--fg-2)',
                  paddingLeft: 20,
                  margin: 0,
                }}
              >
                <li>Founded 2026 · Atlanta, GA</li>
                <li>Product: Chair caster guards</li>
                <li>Materials: Soft TPU</li>
                <li>Available in 11 colors</li>
                <li>Price: from $6 (single guard)</li>
                <li>Fits 95% of chairs</li>
              </ul>
            </div>

            {/* Press contact */}
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 28,
                  letterSpacing: '-0.02em',
                  margin: '0 0 20px',
                }}
              >
                Press Contact
              </h2>
              <div
                style={{
                  padding: '28px',
                  background: 'var(--bg-inset)',
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: 'var(--fg-2)',
                    margin: '0 0 16px',
                  }}
                >
                  For press inquiries, review units, and media interviews:
                </p>
                <a
                  href="mailto:press@orbitguard.com"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#5A74FF',
                    textDecoration: 'none',
                  }}
                >
                  press@orbitguard.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 56px',
          borderTop: '1px solid var(--border)',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>© 2026 OrbitGuard, Inc.</div>
        <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>Made in Atlanta</div>
      </footer>
    </div>
  );
}
