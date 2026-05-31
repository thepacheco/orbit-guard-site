'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

const FEATURES: string[] = [];

const EDITIONS = [
  { name: 'Onyx', color: '#212529', key: 'onyx', label: 'ONYX EDITION', desc: 'Stealth matte-black that disappears into any setup.' },
  { name: 'Polar', color: '#F4F4F0', key: 'polar', label: 'POLAR EDITION', desc: 'Studio-bright white for minimal, clean builds.' },
  { name: 'Nightfall', color: '#212529', topColor: '#212529', bottomColor: '#5A74FF', mixTop: 'onyx', mixBottom: 'blueberry', label: 'NIGHTFALL EDITION', desc: 'Onyx base with Blueberry accent — our designer\'s pick.' },
];

export default function GamerLandingPage() {
  const bg = '#0A0A0C';
  const fg = '#FFFFFF';
  const neonPink = '#FF1053';
  const neonCyan = '#00F0FF';

  const [activeEdition, setActiveEdition] = useState(0);
  const [exploded, setExploded] = useState(false);
  
  const edition = EDITIONS[activeEdition];
  const topColor = edition.topColor || edition.color;
  const bottomColor = edition.bottomColor || edition.color;

  let glowColor1 = 'rgba(255,16,83,0.12)';
  let glowColor2 = 'rgba(0,240,255,0.08)';
  if (edition.key === 'onyx') { glowColor1 = 'rgba(255,255,255,0.03)'; glowColor2 = 'rgba(255,255,255,0.01)'; }
  else if (edition.key === 'polar') { glowColor1 = 'rgba(255,255,255,0.05)'; glowColor2 = 'rgba(255,255,255,0.02)'; }
  else if (edition.key === 'nightfall') { glowColor1 = 'rgba(90,116,255,0.08)'; glowColor2 = 'rgba(90,116,255,0.03)'; }

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        position: 'relative',
        overflowX: 'clip',
      }}
    >
      {/* Animated background stripes */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            ${glowColor1} 80px,
            ${glowColor1} 82px
          )`,
          animation: 'ogStripeMove 20s linear infinite',
          transition: 'background-image 0.5s ease'
        }} />
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '120%', height: '100%',
          backgroundImage: `radial-gradient(ellipse at 50% 0%, ${glowColor1} 0%, transparent 50%)`,
          transition: 'background-image 0.5s ease'
        }} />
        {/* RGB ambient sweep */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
          backgroundImage: `radial-gradient(ellipse at 30% 100%, ${glowColor2} 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, ${glowColor1} 0%, transparent 50%)`,
          transition: 'background-image 0.5s ease'
        }} />
      </div>

      <style>{`
        @keyframes ogStripeMove {
          from { transform: translateX(0); }
          to { transform: translateX(82px); }
        }
        @keyframes ogRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header dark={true} variant={PRODUCT_VARIANTS[5]} />

        {/* Single Hero Section - Grid Layout */}
        <section
          className="og-lp-grid"
          style={{
            padding: '120px 56px 60px',
            display: 'grid', gridTemplateColumns: '1.2fr 1fr', alignItems: 'center', gap: 64,
            position: 'relative',
            maxWidth: 1400, margin: '0 auto',
          }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', gap: 28 }}>
            
            {/* Edition Selector (Up Top) */}
            <div className="og-gamer-editions" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {EDITIONS.map((ed, i) => (
                <button
                  key={ed.name}
                  onClick={() => setActiveEdition(i)}
                  style={{
                    padding: '10px 20px', borderRadius: 4, cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: activeEdition === i ? neonPink : 'rgba(255,255,255,0.05)',
                    color: '#fff',
                    border: activeEdition === i ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    boxShadow: activeEdition === i ? `0 0 24px rgba(255,16,83,0.4)` : 'none',
                    transition: 'all 0.2s',
                  }}
                >
                  {ed.name}
                </button>
              ))}
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.2em', color: neonPink, textShadow: '0 0 12px rgba(255,16,83,0.6)' }}>
              {edition.label}
            </div>

            <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '-0.04em', lineHeight: 1.0, margin: 0, maxWidth: 900, color: fg, textTransform: 'uppercase', fontStyle: 'italic', animation: 'ogFadeUp 0.8s ease-out' }}>
              Perfect Setup. <br/><span style={{ color: 'transparent', WebkitTextStroke: `1px ${fg}` }}>Unmatched Performance.</span>
            </h1>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.65, color: '#A0AAB2', maxWidth: 600, margin: 0 }}>
              {edition.desc}
            </p>

            {FEATURES.length > 0 && (
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {FEATURES.map(feat => (
                  <div key={feat} style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 24px', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)', borderRadius: 4, borderLeft: `3px solid ${neonCyan}`, fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: fg }}>
                    {feat}
                  </div>
                ))}
              </div>
            )}

            <a href={edition.mixTop ? `/shop?mixTop=${edition.mixTop}&mixBottom=${edition.mixBottom}` : `/shop?color=${edition.key}`} style={{ background: neonPink, color: '#fff', borderRadius: 4, padding: '22px 56px', fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: `0 0 36px rgba(255,16,83,0.4)`, border: '1px solid rgba(255,255,255,0.2)', marginTop: 10 }}>
              Equip {edition.name} Guards
            </a>


          </div>

          {/* Right Column: 3D Viewer with RGB glow */}
          <div style={{ position: 'relative', width: '100%', height: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transform: 'translateY(-20px)' }}>
            {/* Animated RGB Glow */}
            <div style={{ position: 'absolute', top: '20%', left: '22%', transform: 'translate(-50%, -50%)', width: 360, height: 360, borderRadius: '50%', background: 'conic-gradient(from 0deg, #FF1053, #7b2cbf, #00F0FF, #06D6A0, #FF1053)', filter: 'blur(60px)', animation: 'ogRotate 4s linear infinite', opacity: 0.5, zIndex: -1 }} />

            <div style={{ position: 'absolute', inset: -40, zIndex: 10, transform: 'scale(0.85)', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <Product3DViewer topColor={topColor} bottomColor={bottomColor} exploded={exploded} cameraPosition={[104.74, -96.92, 138.54]} />
            </div>

            {/* Attach/Detach Toggle */}
            <div style={{ position: 'absolute', bottom: 40, zIndex: 20 }}>
              <button
                onClick={() => setExploded(!exploded)}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  padding: '12px 24px',
                  borderRadius: 999,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              >
                {exploded ? 'Attach pieces' : 'Detach pieces'}
              </button>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
