'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const blueberryVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'blueberry')!;

const FEATURES = [
  'Cable protection',
  'Paw-safe TPU',
  'Two-minute install',
];

export default function DeskLandingPage() {
  const bg = '#FFFFFF';
  const fg = '#1A1B1F';
  const blue = '#5A74FF';
  const blobColor = '#E4E9FF';

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
            top: '-5%',
            right: '-5%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: blobColor,
            opacity: 1,
            filter: 'blur(80px)',
            animation: 'ogFloat1 20s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-8%',
            width: 340,
            height: 340,
            borderRadius: '50%',
            background: blobColor,
            opacity: 1,
            filter: 'blur(80px)',
            animation: 'ogFloat2 26s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      </div>

      <Header dark={false} variant={blueberryVariant} />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <section
          style={{
            paddingTop: 100,
            padding: '100px 56px 60px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 28,
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
            Home office
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 760,
              color: fg,
              animation: 'ogFadeUp 0.8s ease-out',
            }}
          >
            A cleaner desk starts at the wheels.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.65,
              color: 'var(--fg-2)',
              maxWidth: 520,
              margin: 0,
            }}
          >
            Stop cables getting caught. Stop paws getting trapped. Five guards, two minutes.
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
                  background: 'rgba(90,116,255,0.07)',
                  borderRadius: 999,
                  border: '1px solid rgba(90,116,255,0.15)',
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
              boxShadow: '0 14px 36px rgba(90,116,255,0.40)',
              transition: 'transform 140ms',
              animation: 'ogFadeUp 0.8s ease-out 0.3s both',
            }}
          >
            Protect your setup
          </a>
        </section>

        {/* Stack diagram illustration */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '0 56px 80px',
          }}
        >
          <svg
            viewBox="0 0 200 160"
            width="200"
            height="160"
            style={{ maxWidth: '100%', overflow: 'visible' }}
            aria-label="Orbit Guard stacked caster diagram"
          >
            {/* Bottom cylinder (chair wheel) */}
            <ellipse cx="100" cy="130" rx="60" ry="14" fill="#D1D5DB" />
            <rect x="40" y="100" width="120" height="30" fill="#C4C9D4" rx="4" />
            <ellipse cx="100" cy="100" rx="60" ry="14" fill="#B0B7C6" />

            {/* Orbit Guard TPU layer */}
            <ellipse cx="100" cy="92" rx="60" ry="14" fill={blue} opacity="0.85" />
            <rect x="40" y="62" width="120" height="30" fill={blue} opacity="0.9" rx="4" />
            <ellipse cx="100" cy="62" rx="60" ry="14" fill={blue} />

            {/* Top cap highlight */}
            <ellipse cx="100" cy="62" rx="52" ry="10" fill="rgba(255,255,255,0.25)" />

            {/* Label */}
            <text
              x="100"
              y="155"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill={fg}
              textAnchor="middle"
              opacity="0.5"
            >
              Orbit Guard caster guard
            </text>
          </svg>
        </div>

        {/* Social proof note */}
        <div
          style={{
            textAlign: 'center',
            paddingBottom: 80,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--fg-3)',
              letterSpacing: '0.06em',
            }}
          >
            Fits 95% of office chairs &middot; 60-day free returns &middot; Ships from Atlanta
          </div>
        </div>
      </div>
    </div>
  );
}
