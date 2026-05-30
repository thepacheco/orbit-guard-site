'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';

const blueberryVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'blueberry')!;

import dynamic from 'next/dynamic';
import { useState, useRef } from 'react';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

const FEATURES = [
  'Protects pets & feet',
  'Two-minute install',
];

export default function DeskLandingPage() {
  const bg = '#FAFAFA';
  const fg = '#1A1B1F';
  const blue = '#5A74FF';
  
  const [sliderPos, setSliderPos] = useState(50);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      setSliderPos((x / rect.width) * 100);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: bg, color: fg, fontFamily: 'var(--font-ui)', position: 'relative', overflowX: 'hidden' }}>
      
      {/* Hero — text left, comparison right */}
      <section style={{ padding: '140px 56px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center', maxWidth: 1300, margin: '0 auto', minHeight: '100vh' }}>
        
        {/* Left: Text */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, animation: 'ogFadeUp 0.8s ease-out' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: blue, fontWeight: 700 }}>
            For your home office setup
          </div>

          <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(40px, 4vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0, color: fg }}>
            Protect your setup. Protect your people.
          </h1>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.6, color: '#4B5563', maxWidth: 520, margin: 0 }}>
            Your chair&apos;s casters are a hazard to pets, cables, and bare feet. Orbit guards wrap each wheel so nothing gets caught.
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
            {FEATURES.map(feat => (
              <div key={feat} style={{ display: 'inline-flex', alignItems: 'center', padding: '12px 24px', background: '#fff', borderRadius: 999, border: '1px solid #E5E7EB', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 15, color: fg, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
                {feat}
              </div>
            ))}
          </div>

          <a href="/shop" style={{ background: fg, color: '#fff', borderRadius: 999, padding: '20px 48px', fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 18, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', alignSelf: 'flex-start', marginTop: 12 }}>
            Shop →
          </a>
        </div>

        {/* Right: Comparison Slider */}
        <div>
          <div 
            ref={sliderRef}
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerDown}
            onPointerUp={() => setIsDragging(false)}
            onPointerLeave={() => setIsDragging(false)}
            style={{ position: 'relative', width: '100%', height: 480, borderRadius: 24, overflow: 'hidden', cursor: 'ew-resize', boxShadow: '0 24px 48px rgba(0,0,0,0.08)', background: '#E5E7EB', touchAction: 'none' }}
          >
            {/* Before */}
            <div style={{ position: 'absolute', inset: 0, background: '#D1D5DB', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 24, backgroundImage: 'repeating-linear-gradient(45deg, #cbd5e1 25%, transparent 25%, transparent 75%, #cbd5e1 75%, #cbd5e1), repeating-linear-gradient(45deg, #cbd5e1 25%, #D1D5DB 25%, #D1D5DB 75%, #cbd5e1 75%, #cbd5e1)', backgroundPosition: '0 0, 10px 10px', backgroundSize: '20px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6B7280', background: '#fff', padding: '8px 16px', borderRadius: 999 }}>Standard Casters</div>
            </div>
            
            {/* After */}
            <div style={{ position: 'absolute', inset: 0, background: '#F4F4F0', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: 24, clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: blue, background: '#fff', padding: '8px 16px', borderRadius: 999, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>Orbit Guard</div>
            </div>

            {/* Slider Line */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${sliderPos}%`, width: 4, background: '#fff', transform: 'translateX(-50%)', boxShadow: '0 0 10px rgba(0,0,0,0.2)' }}>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 36, height: 36, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={fg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/><path d="m9 18 6-6-6-6"/></svg>
              </div>
            </div>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', letterSpacing: '0.06em', marginTop: 20, textAlign: 'center' }}>
            Drag to compare &middot; Fits 95% of office chairs
          </div>
        </div>

      </section>
      
    </div>
  );
}
