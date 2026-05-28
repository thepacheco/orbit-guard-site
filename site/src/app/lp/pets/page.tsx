'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const blueberryVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'blueberry')!;

export default function PetsLandingPage() {
  const bg = '#E4E9FF';
  const fg = '#0E1640';
  const blue = '#5A74FF';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        overflowX: 'hidden',
        overflow: 'hidden',
        position: 'relative',
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
            left: '-5%',
            width: 320,
            height: 320,
            borderRadius: '50%',
            background: '#4361EE',
            opacity: 0.10,
            filter: 'blur(70px)',
            animation: 'ogFloat1 20s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '-5%',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: '#4361EE',
            opacity: 0.10,
            filter: 'blur(60px)',
            animation: 'ogFloat2 28s ease-in-out infinite',
          }}
        />
      </div>

      <Header dark={false} variant={blueberryVariant} />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top: Orbit icon mark centered */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '32px 24px 0',
            paddingTop: 100,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: blue,
              boxShadow: '0 8px 24px rgba(90,116,255,0.35)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '50%',
                width: 14,
                height: 14,
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: bg,
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* Hero */}
        <section
          style={{
            padding: '80px 56px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              opacity: 0.6,
            }}
          >
            For Pet Owners
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
              animation: 'ogFadeUp 0.8s ease-out',
            }}
          >
            Your chair won&apos;t hurt them anymore.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.6,
              opacity: 0.75,
              maxWidth: 520,
              margin: 0,
            }}
          >
            Orbit Guard wraps every caster on your chair with soft TPU — so curious tails,
            paws, and cables are safe, always.
          </p>
        </section>

        {/* Room SVG */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0 56px' }}>
          <svg viewBox="0 0 420 380" width="420" height="380" style={{ maxWidth: '100%' }}>
            {/* Floor */}
            <rect x="0" y="275" width="420" height="105" fill="rgba(0,0,0,0.04)" />
            <line x1="0" y1="275" x2="420" y2="275" stroke={fg} strokeWidth="1.5" opacity="0.4" />
            {/* Window */}
            <rect x="30" y="50" width="130" height="150" rx="6" fill="rgba(255,255,255,0.6)" stroke={fg} strokeWidth="3" />
            <line x1="95" y1="50" x2="95" y2="200" stroke={fg} strokeWidth="1.5" opacity="0.4" />
            <line x1="30" y1="125" x2="160" y2="125" stroke={fg} strokeWidth="1.5" opacity="0.4" />
            {/* Plant */}
            <path d="M 200 270 L 215 270 L 218 290 L 197 290 Z" fill={fg} />
            <path d="M 207 270 Q 195 250 200 230 Q 205 215 215 220" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />
            <path d="M 207 270 Q 220 245 230 240" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />
            <path d="M 207 270 Q 198 255 188 252" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />
            {/* Desk */}
            <rect x="250" y="170" width="160" height="14" rx="4" fill={fg} />
            <line x1="260" y1="184" x2="260" y2="275" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            <line x1="400" y1="184" x2="400" y2="275" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            {/* Monitor */}
            <rect x="295" y="125" width="90" height="50" rx="4" fill="rgba(255,255,255,0.6)" stroke={fg} strokeWidth="3" />
            <line x1="340" y1="175" x2="340" y2="170" stroke={fg} strokeWidth="3" />
            <line x1="325" y1="170" x2="355" y2="170" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            {/* Chair */}
            <path d="M 215 160 Q 215 130 230 130 L 252 130 Q 252 200 252 220" fill="none" stroke={fg} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 215 215 L 270 215 Q 280 215 280 225 L 280 235 Q 280 245 270 245 L 215 245 Q 205 245 205 235 L 205 225 Q 205 215 215 215 Z" fill={blue} stroke={fg} strokeWidth="3" />
            <rect x="237" y="245" width="12" height="22" fill="rgba(255,255,255,0.4)" stroke={fg} strokeWidth="3" />
            {/* Chair legs */}
            <line x1="243" y1="267" x2="205" y2="282" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            <line x1="243" y1="267" x2="243" y2="282" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            <line x1="243" y1="267" x2="281" y2="282" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            {/* Casters */}
            {[205, 243, 281].map(cx => (
              <g key={cx}>
                <circle cx={cx} cy={290} r="12" fill={blue} stroke={fg} strokeWidth="3" />
                <circle cx={cx} cy={290} r="4" fill="rgba(255,255,255,0.4)" />
              </g>
            ))}
            {/* Cat */}
            <ellipse cx="125" cy="310" rx="40" ry="22" fill="rgba(255,255,255,0.5)" stroke={fg} strokeWidth="3" />
            <circle cx="95" cy="300" r="14" fill="rgba(255,255,255,0.5)" stroke={fg} strokeWidth="3" />
            <path d="M 85 290 L 88 282 L 94 290" fill={fg} />
            <path d="M 102 290 L 105 282 L 110 290" fill={fg} />
            <circle cx="92" cy="301" r="1.5" fill={fg} />
            <circle cx="100" cy="301" r="1.5" fill={fg} />
            <path d="M 96 305 q 0 2 -2 2 m 0 0 q -2 0 -2 -2" fill="none" stroke={fg} strokeWidth="1.2" strokeLinecap="round" />
            {/* Tail */}
            <path d="M 162 310 Q 180 305 195 295" fill="none" stroke={fg} strokeWidth="3" strokeLinecap="round" />
            {/* Caption */}
            <text x="210" y="365" fontFamily="var(--font-mono)" fontSize="11" fill={fg} textAnchor="middle" opacity="0.6">
              Tails, cables and toes — all safe.
            </text>
          </svg>
        </div>

        {/* Feature points */}
        <section
          style={{
            padding: '40px 56px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '🐾', label: 'Paw-safe TPU' },
              { icon: '🔌', label: 'Cord protection' },
              { icon: '🔇', label: 'Quiet on any floor' },
            ].map(feat => (
              <div
                key={feat.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '14px 20px',
                  background: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 999,
                  border: '1px solid rgba(90,116,255,0.15)',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 15,
                  color: fg,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                }}
              >
                <span>{feat.icon}</span>
                <span>{feat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Color strip section */}
        <section
          style={{
            padding: '0 56px 32px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 24px',
              background: 'rgba(255,255,255,0.55)',
              backdropFilter: 'blur(8px)',
              borderRadius: 999,
              border: '1px solid rgba(90,116,255,0.12)',
            }}
          >
            <div style={{ display: 'flex', gap: 6 }}>
              {['#4361EE', '#06D6A0', '#FF90FE'].map(color => (
                <div
                  key={color}
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: color,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.18)',
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 13,
                color: fg,
                opacity: 0.75,
              }}
            >
              Available in 11 colors
            </span>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: '8px 56px 100px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://kickstarter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: blue,
              color: '#fff',
              borderRadius: 999,
              padding: '20px 40px',
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
            Back us on Kickstarter →
          </a>
        </section>
      </div>
    </div>
  );
}
