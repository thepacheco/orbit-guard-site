'use client';

import React, { useState, useEffect } from 'react';

const MAIN_PHOTOS = [
  { src: '/assets/atlanta_office_empty.png', label: 'Atlanta Studio & Lab' },
  { src: '/assets/HomePage_OnChair_Photos/OnChair1.png', label: 'Pet & Cable Shielding' },
  { src: '/assets/start_product_photos/Mix_and_Match.png', label: '12 Color Combinations' },
];

const SIDE_TOP_PHOTOS = [
  { src: '/assets/HomePage_OnChair_Photos/OnChair2.png', label: 'Whisper-Quiet Glide' },
  { src: '/assets/start_product_photos/06_Product_Floating_Shot/ProductFloatingShot_Polar.png', label: 'Precision TPU Mold' },
];

const SIDE_BOTTOM_PHOTOS = [
  { src: '/assets/lp_pets/LP_Pets1.png', label: 'Edison — Safety Inspiration' },
  { src: '/assets/HomePage_OnChair_Photos/OnChair3.png', label: 'Interlocking Snap Fit' },
];

export default function RollingImageReel() {
  const [mainIdx, setMainIdx] = useState(0);
  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMainIdx(prev => (prev + 1) % MAIN_PHOTOS.length);
      setTopIdx(prev => (prev + 1) % SIDE_TOP_PHOTOS.length);
      setBottomIdx(prev => (prev + 1) % SIDE_BOTTOM_PHOTOS.length);
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  const curMain = MAIN_PHOTOS[mainIdx];
  const curTop = SIDE_TOP_PHOTOS[topIdx];
  const curBottom = SIDE_BOTTOM_PHOTOS[bottomIdx];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: 24,
        height: 520,
        width: '100%',
      }}
    >
      {/* Main Workspace Frame with Hotspot Pins & Smooth Rolling Transition */}
      <div
        style={{
          gridRow: '1 / 3',
          position: 'relative',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 20px 48px rgba(0,0,0,0.06)',
          border: '1px solid #E2E8F0',
          background: '#0F172A',
        }}
      >
        <img
          key={curMain.src}
          src={curMain.src}
          alt={curMain.label}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 800ms ease, transform 800ms ease',
          }}
        />

        {/* Hotspot 1: Designed in Atlanta */}
        <div style={{ position: 'absolute', top: '34%', left: '42%', cursor: 'pointer', zIndex: 10 }}>
          <span style={{ position: 'relative', display: 'flex', width: 24, height: 24 }}>
            <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#5A74FF', opacity: 0.75 }} />
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 24, width: 24, background: '#5A74FF', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
          </span>
          <div style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', pointerEvents: 'none', fontFamily: 'var(--font-ui)' }}>
            Designed in Atlanta
          </div>
        </div>

        {/* Hotspot 2: Precision Engineering */}
        <div style={{ position: 'absolute', top: '64%', left: '68%', cursor: 'pointer', zIndex: 10 }}>
          <span style={{ position: 'relative', display: 'flex', width: 24, height: 24 }}>
            <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#05CE78', opacity: 0.75 }} />
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 24, width: 24, background: '#05CE78', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
          </span>
          <div style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', pointerEvents: 'none', fontFamily: 'var(--font-ui)' }}>
            Precision Engineering
          </div>
        </div>

        {/* Caption overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(12px)',
            padding: '12px 20px',
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '1px solid rgba(0,0,0,0.06)',
            zIndex: 10,
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {curMain.label}
          </span>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 8px #05CE78' }} />
        </div>
      </div>

      {/* Secondary Rolling Frame 1 */}
      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(0,0,0,0.04)',
          border: '1px solid #E2E8F0',
          background: '#F8FAFC',
        }}
      >
        <img
          key={curTop.src}
          src={curTop.src}
          alt={curTop.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 800ms ease' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 99,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {curTop.label}
        </div>
      </div>

      {/* Secondary Rolling Frame 2 */}
      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 12px 30px rgba(0,0,0,0.04)',
          border: '1px solid #E2E8F0',
          background: '#F8FAFC',
        }}
      >
        <img
          key={curBottom.src}
          src={curBottom.src}
          alt={curBottom.label}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 800ms ease' }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            background: 'rgba(15,23,42,0.85)',
            backdropFilter: 'blur(8px)',
            color: '#05CE78',
            fontSize: 11,
            fontWeight: 700,
            padding: '4px 12px',
            borderRadius: 99,
            fontFamily: 'var(--font-mono)',
          }}
        >
          {curBottom.label}
        </div>
      </div>
    </div>
  );
}
