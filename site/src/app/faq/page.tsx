import React from 'react';

export const metadata = { title: 'FAQ', description: 'Common questions about Orbit Guard caster guards — fit, install, shipping, and returns.' };
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import { FooterCta } from '../../components/Sections';
import { PRODUCT_VARIANTS } from '../../components/data';

const polarVariant =
  PRODUCT_VARIANTS.find(v => v.key === 'polar') ?? PRODUCT_VARIANTS[0];

export default function FaqPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: 'var(--fg)' }}>
      <Header variant={polarVariant} dark={false} />

      {/* Hero */}
      <section
        style={{
          background: '#fff',
          padding: '140px 56px 64px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--og-blue)',
            marginBottom: 20,
          }}
        >
          Help
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 60px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: '0 0 24px',
            maxWidth: 820,
          }}
        >
          Questions, answered.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 19,
            lineHeight: 1.65,
            color: 'var(--fg-2)',
            maxWidth: 560,
            margin: 0,
          }}
        >
          Everything about fit, install, and getting started — in one place.
        </p>
      </section>

      {/* FAQ list */}
      <section
        style={{
          padding: '40px 56px 100px',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Faq />
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
              margin: '40px 0 0',
            }}
          >
            Still stuck? Email us at{' '}
            <a
              href="mailto:hello@orbitguard.com"
              style={{
                color: 'var(--og-blue)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              hello@orbitguard.com
            </a>
          </p>
        </div>
      </section>

      <FooterCta v={polarVariant} />
    </div>
  );
}
