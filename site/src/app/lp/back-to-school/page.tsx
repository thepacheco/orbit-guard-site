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
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28,
            minHeight: 'calc(100vh - var(--og-announce-h, 0px))', justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Slide-in keyframes (removed in favor of global ogZoomIn) */}

          {/* Floating Orbit Left */}
          <div className="og-lp-float-left" style={{
            position: 'absolute', left: -300, top: '50%', transform: 'translateY(-50%)',
            width: 600, height: 600, zIndex: 0, pointerEvents: 'none',
          }}>
            <div style={{ width: '100%', height: '100%', animation: 'ogZoomIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <div style={{ width: '100%', height: '100%', animation: 'ogFloat1 18s ease-in-out infinite' }}>
                <Product3DViewer topColor="#5A74FF" bottomColor="#5A74FF" exploded={false} autoRotate={false} interactive={false} />
              </div>
            </div>
          </div>

          {/* Floating Orbit Right */}
          <div className="og-lp-float-right" style={{
            position: 'absolute', right: -300, top: '50%', transform: 'translateY(-50%)',
            width: 600, height: 600, zIndex: 0, pointerEvents: 'none',
          }}>
            <div style={{ width: '100%', height: '100%', animation: 'ogZoomIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <div style={{ width: '100%', height: '100%', animation: 'ogFloat2 20s ease-in-out infinite' }}>
                <Product3DViewer topColor={activeColorHex} bottomColor={activeColorHex} exploded={false} autoRotate={false} interactive={false} />
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', zIndex: 10, maxWidth: 700 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#7C5CFF', fontWeight: 700, padding: '8px 16px', background: 'rgba(124,92,255,0.1)', borderRadius: 999, display: 'inline-block', marginBottom: 20 }}>
              Back to school
            </div>

            <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(40px, 5.5vw, 76px)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: '0 0 20px', color: fg, animation: 'ogFadeUp 0.8s ease-out' }}>
              Orbit matches any dorm room aesthetic.
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.65, color: fg, opacity: 0.7, maxWidth: 600, margin: '0 auto 24px' }}>
              For wheels that let you express your style and protect your fur babies.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 28 }}>
              {FEATURES.map(feat => (
                <div key={feat} style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 20px', background: 'rgba(255,255,255,0.70)', backdropFilter: 'blur(8px)', borderRadius: 999, border: '1px solid rgba(162,146,255,0.25)', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14, color: fg, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                  {feat}
                </div>
              ))}
            </div>

            <a href="/shop" style={{ background: blue, color: '#fff', borderRadius: 999, padding: '20px 48px', fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 14px 36px rgba(90,116,255,0.40)', transition: 'transform 140ms', animation: 'ogFadeUp 0.8s ease-out 0.3s both' }}>
              Shop Orbits
            </a>
          </div>
          
          <div style={{ position: 'relative', zIndex: 10, fontFamily: 'var(--font-mono)', fontSize: 12, color: fg, opacity: 0.45, letterSpacing: '0.06em', marginTop: 40, textAlign: 'center' }}>
            Fits standard dorm chair casters &middot; Installs in less than a minute.
          </div>
        </section>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .og-lp-float-left, .og-lp-float-right {
            width: 300px !important;
            height: 300px !important;
          }
          .og-lp-float-left { left: -180px !important; }
          .og-lp-float-right { right: -180px !important; }
        }
        @media (max-width: 480px) {
          .og-lp-float-left, .og-lp-float-right {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
