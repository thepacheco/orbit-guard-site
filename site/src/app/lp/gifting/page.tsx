'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const blueberryVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'blueberry')!;

import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });



export default function GiftingLandingPage() {
  const bg = '#FFF8F0';
  const fg = '#2A1A0E';
  const blue = '#5A74FF';
  const blobColor = '#FFB4A2';

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Floating background blobs */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', right: '-8%', width: 380, height: 380, borderRadius: '50%', background: blobColor, opacity: 0.08, filter: 'blur(80px)', animation: 'ogFloat1 22s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '-6%', width: 300, height: 300, borderRadius: '50%', background: blobColor, opacity: 0.08, filter: 'blur(80px)', animation: 'ogFloat2 28s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: '55%', right: '10%', width: 220, height: 220, borderRadius: '50%', background: blobColor, opacity: 0.06, filter: 'blur(80px)', animation: 'ogFloat3 18s ease-in-out infinite' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <section
          style={{
            padding: '120px 56px 80px',
            display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: 64,
            maxWidth: 1300, margin: '0 auto',
            minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
            position: 'relative',
          }}
        >
          {/* Left Photo */}
          <div style={{ position: 'relative', width: '100%', height: 500, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}>
            <img src="/assets/HomePage_OnChair_Photos/OnChair3.png" alt="Orbit on Chair" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Right Text */}
          <div style={{ position: 'relative', zIndex: 10, maxWidth: 600, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', color: blue, opacity: 0.9, marginBottom: 20 }}>
              A gift worth giving
            </div>

            <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '-0.03em', lineHeight: 1.0, margin: '0 0 24px', color: fg, animation: 'ogFadeUp 0.8s ease-out' }}>
              The gift they didn&apos;t know their <span style={{ color: '#99582a' }}>chair</span> needed.
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.65, color: fg, opacity: 0.7, maxWidth: 500, margin: '0 0 28px 0' }}>
              Perfect for people with animals, with children, or anyone who works from home.
            </p>

            <a href="/shop" style={{ background: blue, color: '#fff', borderRadius: 999, padding: '20px 48px', fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 14px 36px rgba(90,116,255,0.40)', transition: 'transform 140ms', animation: 'ogFadeUp 0.8s ease-out 0.3s both' }}>
              Shop gifts
            </a>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: fg, opacity: 0.5, letterSpacing: '0.06em', marginTop: 20 }}>
              60-day free returns &middot; Free shipping on orders over $30
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
