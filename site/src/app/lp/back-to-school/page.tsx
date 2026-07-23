'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';
import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

const FEATURES = [
  'No tools needed',
  'Protective covers',
  'Fits dorm chairs',
];

export default function BackToSchoolLandingPage() {
  const fg = '#1F1840';
  const blue = '#5A74FF';
  const activeColorHex = '#FF90FE'; // Lavender
  
  const bg = `linear-gradient(135deg, ${activeColorHex}18 0%, #F1EEFF 40%, ${activeColorHex}10 100%)`;

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        position: 'relative',
        overflowX: 'hidden',
        transition: 'background 0.6s ease',
      }}
    >
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
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative', zIndex: 10, maxWidth: 600 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#7C5CFF', fontWeight: 700, padding: '8px 16px', background: 'rgba(124,92,255,0.1)', borderRadius: 999, display: 'inline-block', alignSelf: 'flex-start' }}>
              Back to school
            </div>

            <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(40px, 4vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: fg, animation: 'ogFadeUp 0.8s ease-out' }}>
              Orbit matches any dorm room aesthetic.
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.65, color: fg, opacity: 0.7, margin: 0 }}>
              For wheels that let you express your style and protect your fur babies.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {FEATURES.map(feat => (
                <div key={feat} style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', borderRadius: 999, border: '1px solid rgba(162,146,255,0.25)', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14, color: fg, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  {feat}
                </div>
              ))}
            </div>

            <a href="/shop" style={{ alignSelf: 'flex-start', background: blue, color: '#fff', borderRadius: 999, padding: '20px 48px', fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 14px 36px rgba(90,116,255,0.40)', transition: 'transform 140ms', animation: 'ogFadeUp 0.8s ease-out 0.3s both', marginTop: 12 }}>
              Shop Orbits
            </a>
            
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: fg, opacity: 0.45, letterSpacing: '0.06em', marginTop: 16 }}>
              Fits standard dorm chair casters &middot; Installs in less than a minute.
            </div>
          </div>

          {/* Right Photo */}
          <div style={{ position: 'relative', width: '100%', height: 480, borderRadius: 24, overflow: 'hidden', boxShadow: '0 24px 48px rgba(0,0,0,0.08)' }}>
            <img src="/assets/lp_backtoschool/Dorm_Room.png" alt="Dorm Room" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </section>
      </div>
    </div>
  );
}
