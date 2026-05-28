'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const onyxVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'onyx')!;

const FEATURES = [
  'Matte black finish',
  'Silent on any floor',
  'Fits 95% of chairs',
];

export default function GamerLandingPage() {
  const bg = '#15171B';
  const fg = '#FFFFFF';
  const blue = '#5A74FF';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grid pattern background */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.03) 39px,
              rgba(255,255,255,0.03) 40px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 39px,
              rgba(255,255,255,0.03) 39px,
              rgba(255,255,255,0.03) 40px
            )
          `,
        }}
      />

      {/* Floating blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '-10%',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: blue,
            opacity: 0.06,
            filter: 'blur(80px)',
            animation: 'ogFloat1 24s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            right: '-8%',
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: blue,
            opacity: 0.06,
            filter: 'blur(80px)',
            animation: 'ogFloat2 30s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      <Header dark={true} variant={onyxVariant} />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section
          style={{
            paddingTop: 100,
            padding: '100px 56px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 28,
            minHeight: '100vh',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: blue,
            }}
          >
            Onyx edition
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 800,
              color: fg,
              animation: 'ogFadeUp 0.8s ease-out',
            }}
          >
            Your setup is perfect. Except the wheels.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.65,
              color: fg,
              opacity: 0.65,
              maxWidth: 500,
              margin: 0,
            }}
          >
            Onyx matte-black guards that disappear into any gaming chair.
          </p>

          {/* Feature pills */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {FEATURES.map(feat => (
              <div
                key={feat}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '12px 20px',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  border: '1px solid rgba(255,255,255,0.12)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: fg,
                }}
              >
                {feat}
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="/shop"
            style={{
              background: blue,
              color: '#fff',
              borderRadius: 999,
              padding: '20px 48px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 18,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: '0 14px 36px rgba(90,116,255,0.50)',
              transition: 'transform 140ms',
              animation: 'ogFadeUp 0.8s ease-out 0.3s both',
            }}
          >
            Get Onyx guards
          </a>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: fg,
              opacity: 0.35,
              letterSpacing: '0.06em',
            }}
          >
            60-day free returns &middot; Ships from Atlanta
          </div>
        </section>
      </div>
    </div>
  );
}
