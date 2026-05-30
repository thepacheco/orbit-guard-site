'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const blueberryVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'blueberry')!;

import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

export default function PetsLandingPage() {
  const bg = '#E4E9FF';
  const fg = '#0E1640';
  const blue = '#5A74FF';
  const cardBg = 'rgba(255,255,255,0.7)';
  const borderCol = 'rgba(90,116,255,0.15)';
  const blobColor = '#4361EE';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute', top: '8%', left: '-5%', width: 320, height: 320, borderRadius: '50%',
            background: blobColor, opacity: 0.10, filter: 'blur(70px)',
            animation: 'ogFloat1 20s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '10%', right: '-5%', width: 280, height: 280, borderRadius: '50%',
            background: blobColor, opacity: 0.10, filter: 'blur(60px)',
            animation: 'ogFloat2 28s ease-in-out infinite',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', justifyContent: 'center', padding: '120px 56px 80px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
          
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'ogFadeUp 0.8s ease-out' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase',
                letterSpacing: '0.15em', opacity: 0.6,
              }}
            >
              For Pet Owners
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(48px, 5vw, 72px)',
                letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0,
              }}
            >
              Your chair won&apos;t hurt them anymore.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.6,
                opacity: 0.75, maxWidth: 520, margin: 0,
              }}
            >
              Orbit wraps every caster on your chair — so curious tails,
              paws, and cables are safe, always.
            </p>
            

            <a
              href="/shop"
              style={{
                background: blue, color: '#fff', borderRadius: 999, padding: '18px 36px',
                fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 16, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 10, alignSelf: 'flex-start',
                boxShadow: '0 10px 30px rgba(90,116,255,0.4)',
                marginTop: 20,
              }}
            >
              Shop Orbit Packs →
            </a>
          </div>

          {/* Right 3D Interactive Scene */}
          <div style={{ position: 'relative', height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 60%)', borderRadius: '50%' }} />
            <div style={{ width: '120%', height: '120%', position: 'absolute', zIndex: 10, pointerEvents: 'auto' }}>
               <Product3DViewer topColor="#2A2F33" bottomColor="#2A2F33" exploded={false} />
            </div>
            
            {/* Interactive "tail" SVG sweeping */}
            <svg style={{ position: 'absolute', bottom: -20, left: 20, width: 200, height: 100, zIndex: 20, pointerEvents: 'none' }}>
              <path d="M 0 100 Q 80 80 150 40 Q 180 20 160 10 Q 140 0 130 30" fill="none" stroke={fg} strokeWidth="12" strokeLinecap="round" style={{ animation: 'ogFloat1 4s ease-in-out infinite' }} />
            </svg>
            
            {/* Fetures shifted to the right side */}
            <div style={{ position: 'absolute', bottom: -40, zIndex: 30, display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
              {[
                { icon: '🐾', label: 'Paw-safe' },
                { icon: '🔌', label: 'Cord protection' },
              ].map(feat => (
                <div
                  key={feat.label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10, padding: '12px 18px',
                    background: cardBg, backdropFilter: 'blur(8px)', borderRadius: 999,
                    border: `1px solid ${borderCol}`, fontFamily: 'var(--font-ui)', fontWeight: 600,
                    fontSize: 14, color: fg, boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  <span>{feat.icon}</span>
                  <span>{feat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
