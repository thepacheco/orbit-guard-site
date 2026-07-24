import React from 'react';

export const metadata = { title: 'Press & Brand Kit', description: 'Brand assets, color swatches, and quick facts about Orbit Guard for journalists.', alternates: { canonical: '/press' } };
import Header from '@/components/Header';
import { FooterCta } from '@/components/Sections';
import { PRODUCT_VARIANTS } from '@/components/data';
import type { Variant } from '@/components/types';

const POLAR: Variant = {
  key: 'polar', name: 'Polar', hex: '#F4F4F0', bg: '#FFFFFF', text: '#1A1B1F',
  ring: '#5A74FF', accent: '#06D6A0',
  headline: { line1: 'Pure,', lasso: 'Polar', line2: 'minimal.' },
  price: 24, blurb: '', features: [], floatChips: [], dark: false,
};

const QUICK_FACTS = [
  { fact: 'Founded', detail: '2023' },
  { fact: 'Headquarters', detail: 'Atlanta, Georgia' },
  { fact: 'Product', detail: 'Chair caster guards (Orbit Guards)' },
  { fact: 'Sizes', detail: 'Full Orbit Guard is 5cm - Half Orbit Guard is 2.5cm' },
  { fact: 'Colors', detail: 'Blueberry, Clover, Coral, Lavender, Fawn, Rooster, Flamingo, Bear, Pomegranate, Onyx, Polar' },
  { fact: 'Compatibility', detail: '95% of office chairs' },
];

const BRAND_COLORS = [
  { name: 'Brand Blue', hex: '#5A74FF' },
  { name: 'Onyx', hex: '#212529' },
  { name: 'Cream', hex: '#F6F6F4' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Sky Blue', hex: '#0096DE' },
];

export default function PressPage() {
  const polar = PRODUCT_VARIANTS.find(v => v.key === 'polar') ?? PRODUCT_VARIANTS[0];
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: 'var(--fg)' }}>
      

      {/* Hero */}
      <section
        className="og-page-hero"
        style={{
          padding: '140px 56px 80px',
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
              letterSpacing: '0.14em',
              color: '#5A74FF',
              marginBottom: 16,
            }}
          >
            Press &amp; Media
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
            Everything you need to cover Orbit.
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
            Assets, facts, and context — all in one place. For press inquiries:{' '}
            <a
              href="mailto:press@orbitguards.com"
              style={{ color: '#5A74FF', textDecoration: 'none', fontWeight: 600 }}
            >
              press@orbitguards.com
            </a>
          </p>

          <div style={{ marginTop: 40 }}>
            <a
              href="/playground"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: '#111827',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                padding: '16px 32px',
                borderRadius: 14,
                fontSize: 16,
                boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              }}
            >
              Open 3D Asset Studio
            </a>
            <div style={{ fontSize: 14, color: '#6b7280', marginTop: 14, fontWeight: 500 }}>
              Design custom combinations and export high-res transparent PNGs.
            </div>
          </div>
        </div>
      </section>

      {/* Brand assets */}
      <section className="og-page-pad" style={{ padding: '80px 56px', background: '#fff' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--fg-3)',
              marginBottom: 24,
            }}
          >
            Brand assets
          </div>
          <div
            className="og-press-cards"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 24,
            }}
          >
            {/* Logo card */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #ECEAE3',
                borderRadius: 20,
                padding: '40px 36px',
              }}
            >
              <div
                style={{
                  marginBottom: 24,
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  role="img"
                  aria-label="OrbitGuard"
                  style={{
                    height: 40,
                    width: 180,
                    background: '#5A74FF',
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
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 8,
                  color: 'var(--fg)',
                }}
              >
                Logo &amp; Wordmark
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--fg-2)',
                  margin: '0 0 24px',
                }}
              >
                Available in SVG, PNG, and dark/light variants.
              </p>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#5A74FF',
                  color: '#fff',
                  borderRadius: 999,
                  padding: '12px 22px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                  boxShadow: '0 6px 18px rgba(90,116,255,0.3)',
                }}
              >
                Download logos
              </a>
            </div>

            {/* Brand kit card */}
            <div
              style={{
                background: '#fff',
                border: '1px solid #ECEAE3',
                borderRadius: 20,
                padding: '40px 36px',
              }}
            >
              <div
                style={{
                  marginBottom: 24,
                  height: 56,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 36,
                    color: '#5A74FF',
                    letterSpacing: '-0.02em',
                  }}
                >
                  OrbitGuard
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 18,
                  marginBottom: 8,
                  color: 'var(--fg)',
                }}
              >
                Brand Kit
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'var(--fg-2)',
                  margin: '0 0 24px',
                }}
              >
                Colors, fonts, usage guidelines, and full asset library.
              </p>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--bg-inset)',
                  color: 'var(--fg)',
                  border: '1px solid var(--border)',
                  borderRadius: 999,
                  padding: '12px 22px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: 'none',
                }}
              >
                Download brand kit
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Colors */}
      <section className="og-page-pad" style={{ padding: '0 56px 80px', background: '#fff' }}>
        <div className="og-press-colorgrid" style={{ maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 64 }}>
          {/* Brand colors */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-3)',
                marginBottom: 28,
              }}
            >
              Brand colors
            </div>
            <div
              style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              {BRAND_COLORS.map(color => (
                <div
                  key={color.hex}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'var(--fg)',
                    }}
                  >
                    {color.name}
                  </div>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: color.hex,
                      border: color.hex === '#FFFFFF' ? '1px solid var(--border)' : undefined,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--fg-3)',
                    }}
                  >
                    {color.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product colors */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-3)',
                marginBottom: 28,
              }}
            >
              Product colors
            </div>
            <div
              style={{
                display: 'flex',
                gap: 24,
                flexWrap: 'wrap',
              }}
            >
              {PRODUCT_VARIANTS.map(color => (
                <div
                  key={color.hex}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 13,
                      color: 'var(--fg)',
                    }}
                  >
                    {color.name}
                  </div>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: color.hex,
                      border: color.hex === '#FFFFFF' || color.key === 'polar' ? '1px solid var(--border)' : undefined,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      color: 'var(--fg-3)',
                    }}
                  >
                    {color.hex}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Quick facts */}
      <section
        className="og-page-pad"
        style={{
          padding: '0 56px 80px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--fg-3)',
              marginBottom: 24,
            }}
          >
            Quick facts
          </div>
          <div
            style={{
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {QUICK_FACTS.map((row, i) => (
              <div
                key={row.fact}
                className="og-press-fact"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: 24,
                  padding: '18px 28px',
                  borderBottom: i < QUICK_FACTS.length - 1 ? '1px solid var(--border)' : undefined,
                  background: i % 2 === 1 ? '#FAFAF8' : '#fff',
                }}
              >
                <div
                  className="og-press-fact-label"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'var(--fg)',
                    minWidth: 160,
                    flexShrink: 0,
                  }}
                >
                  {row.fact}
                </div>
                <div
                  className="og-press-fact-detail"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: 'var(--fg-2)',
                    textAlign: 'right',
                  }}
                >
                  {row.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested boilerplate */}
      <section
        className="og-page-pad"
        style={{
          padding: '0 56px 100px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--fg-3)',
              marginBottom: 20,
            }}
          >
            Suggested boilerplate
          </div>
          <blockquote
            style={{
              margin: 0,
              padding: '28px 32px',
              borderLeft: '4px solid #5A74FF',
              background: '#FAFAF8',
              borderRadius: '0 12px 12px 0',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                lineHeight: 1.7,
                color: 'var(--fg-2)',
                margin: 0,
                fontStyle: 'italic',
              }}
            >
              &ldquo;Orbit Guard makes caster guards for office chairs. Each Orbit fits to the chair wheel to protect kids, pets and cables. It is available in 12 colors.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      
    </div>
  );
}
