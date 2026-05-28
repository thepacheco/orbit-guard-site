'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const blueberryVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'blueberry')!;

const FEATURES = [
  'Ships fast',
  'Fits any chair',
  '11 colors to choose from',
];

export default function GiftingLandingPage() {
  const bg = '#FFF8F0';
  const fg = '#2A1A0E';
  const blue = '#5A74FF';
  const blobColor = '#FFB4A2';

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
      {/* Floating background blobs */}
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
            top: '5%',
            right: '-8%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: blobColor,
            opacity: 0.08,
            filter: 'blur(80px)',
            animation: 'ogFloat1 22s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '-6%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: blobColor,
            opacity: 0.08,
            filter: 'blur(80px)',
            animation: 'ogFloat2 28s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            right: '10%',
            width: 220,
            height: 220,
            borderRadius: '50%',
            background: blobColor,
            opacity: 0.06,
            filter: 'blur(80px)',
            animation: 'ogFloat3 18s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      <Header dark={false} variant={blueberryVariant} />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <section
          style={{
            paddingTop: 100,
            padding: '100px 56px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 24,
            minHeight: '100vh',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: blue,
              opacity: 0.8,
            }}
          >
            A gift worth giving
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
            The gift they didn&apos;t know their chair needed.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.65,
              color: fg,
              opacity: 0.7,
              maxWidth: 500,
              margin: 0,
            }}
          >
            Ships in two days. Fits in a gift bag. Works on any office chair.
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
                  background: 'rgba(255,255,255,0.75)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  border: '1px solid rgba(255,180,162,0.30)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: fg,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
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
              boxShadow: '0 14px 36px rgba(90,116,255,0.40)',
              transition: 'transform 140ms',
              animation: 'ogFadeUp 0.8s ease-out 0.3s both',
            }}
          >
            Shop now
          </a>

          {/* Social proof note */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: fg,
              opacity: 0.5,
              letterSpacing: '0.06em',
            }}
          >
            60-day free returns &middot; Free shipping on orders over $30
          </div>
        </section>
      </div>
    </div>
  );
}
