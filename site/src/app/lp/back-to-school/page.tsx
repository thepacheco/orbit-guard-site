'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const lavenderVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'lavender')!;

const FEATURES = [
  'No installation tools',
  'Whisper-quiet',
  'Fits dorm chairs',
];

export default function BackToSchoolLandingPage() {
  const bg = '#F1EEFF';
  const fg = '#1F1840';
  const blobColor = '#A292FF';
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
            top: '8%',
            right: '-6%',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: blobColor,
            opacity: 0.10,
            filter: 'blur(80px)',
            animation: 'ogFloat1 20s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '-5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: blobColor,
            opacity: 0.10,
            filter: 'blur(80px)',
            animation: 'ogFloat2 28s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '40%',
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: blobColor,
            opacity: 0.08,
            filter: 'blur(80px)',
            animation: 'ogFloat3 22s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      <Header dark={false} variant={lavenderVariant} />

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
              letterSpacing: '0.15em',
              color: '#7C5CFF',
              opacity: 0.9,
            }}
          >
            Back to school
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 76px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 820,
              color: fg,
              animation: 'ogFadeUp 0.8s ease-out',
            }}
          >
            Dorm room approved. Cat approved. RA approved.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.65,
              color: fg,
              opacity: 0.7,
              maxWidth: 520,
              margin: 0,
            }}
          >
            No tools. No damage. No noise at 2am. Just quiet wheels.
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
                  background: 'rgba(255,255,255,0.70)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  border: '1px solid rgba(162,146,255,0.25)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 14,
                  color: fg,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
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
            Shop student packs
          </a>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: fg,
              opacity: 0.45,
              letterSpacing: '0.06em',
            }}
          >
            60-day free returns &middot; Ships in 2 days
          </div>
        </section>
      </div>
    </div>
  );
}
