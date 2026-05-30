'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import dynamic from 'next/dynamic';
import * as LucideIcons from 'lucide-react';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

export default function MeetOrbitLandingPage() {
  const variant = PRODUCT_VARIANTS.find(v => v.key === 'blueberry') || PRODUCT_VARIANTS[0];

  return (
    <div style={{ minHeight: '100vh', background: '#F4F7FB', color: '#0F1626', fontFamily: 'var(--font-ui)', overflowX: 'hidden' }}>
      <Header dark={false} variant={variant} />

      <main style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', padding: '100px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Background Starburst / Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '15%', opacity: 0.6, pointerEvents: 'none' }}>
          <svg width="400" height="400" viewBox="0 0 100 100" style={{ filter: 'blur(30px)' }}>
            <circle cx="50" cy="50" r="40" fill="#D3E0FF" />
          </svg>
        </div>
        <div style={{ position: 'absolute', bottom: '5%', right: '20%', opacity: 0.5, pointerEvents: 'none' }}>
          <svg width="500" height="500" viewBox="0 0 100 100" style={{ filter: 'blur(40px)' }}>
            <circle cx="50" cy="50" r="50" fill="#E8F0FF" />
          </svg>
        </div>

        {/* 4-Point Starburst graphic like in "grace" */}
        <svg 
          width="300" height="300" viewBox="0 0 100 100" 
          style={{ position: 'absolute', top: '5%', left: '45%', opacity: 0.4, animation: 'ogSpin 60s linear infinite', pointerEvents: 'none' }}
        >
          <path d="M50 0 C50 40 60 50 100 50 C60 50 50 60 50 100 C50 60 40 50 0 50 C40 50 50 40 50 0 Z" fill="url(#blueGrad)" />
          <defs>
            <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A2BFFF" />
              <stop offset="100%" stopColor="#5A74FF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="og-lp-grid" style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 1200, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
          
          {/* Left Text */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            <h1 style={{ 
              fontFamily: 'serif', 
              fontSize: 'clamp(64px, 10vw, 120px)', 
              fontWeight: 400, 
              letterSpacing: '-0.04em',
              lineHeight: 1,
              margin: '0 0 24px',
              color: '#0A1128'
            }}>
              Meet<br />
              <span style={{ fontStyle: 'italic', letterSpacing: '-0.02em' }}>orbit.</span>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.6, color: '#4A5568', maxWidth: 400, marginBottom: 40 }}>
              Our customers value style, functionality, and modern, minimalist, high-quality floor protection.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex' }}>
                {[...Array(4)].map((_, i) => (
                  <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', background: '#CBD5E1', border: '2px solid #F4F7FB', marginLeft: i > 0 ? -12 : 0, overflow: 'hidden' }}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: 32, fontFamily: 'serif', fontStyle: 'italic', color: '#5A74FF', lineHeight: 1 }}>2k+</div>
                <div style={{ fontSize: 13, color: '#4A5568', fontWeight: 500 }}>positive reviews</div>
              </div>
            </div>
          </div>

          {/* Right Product 3D */}
          <div style={{ position: 'relative', height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* The soft glass backdrop */}
            <div style={{
              position: 'absolute',
              inset: '10% 5%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 40,
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 24px 60px rgba(90, 116, 255, 0.08)',
            }} />

            {/* Orbit Viewer */}
            <div style={{ position: 'absolute', inset: 0, animation: 'ogZoomIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <div style={{ width: '100%', height: '100%', animation: 'ogFloat1 12s ease-in-out infinite' }}>
                <Product3DViewer topColor={variant.hex} bottomColor={variant.hex} exploded={false} cameraPosition={[0, 1.0, 4.0]} />
              </div>
            </div>

            {/* Floating feature pills */}
            <div className="og-meet-pill" style={{ position: 'absolute', top: '15%', left: '-10%', zIndex: 20, animation: 'ogFloat2 10s ease-in-out infinite alternate' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 24px', borderRadius: 999, boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EDF2FF', color: '#5A74FF', display: 'grid', placeItems: 'center' }}>
                  <LucideIcons.Feather size={16} />
                </div>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Featherweight</span>
              </div>
            </div>

            <div className="og-meet-pill" style={{ position: 'absolute', top: '40%', right: '-15%', zIndex: 20, animation: 'ogFloat3 11s ease-in-out infinite alternate-reverse' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 24px', borderRadius: 999, boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EDF2FF', color: '#5A74FF', display: 'grid', placeItems: 'center' }}>
                  <LucideIcons.Shield size={16} />
                </div>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Protective soft shell</span>
              </div>
            </div>

            <div className="og-meet-pill" style={{ position: 'absolute', bottom: '20%', left: '-5%', zIndex: 20, animation: 'ogFloat1 9s ease-in-out infinite alternate' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 24px', borderRadius: 999, boxShadow: '0 12px 32px rgba(0,0,0,0.06)' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#EDF2FF', color: '#5A74FF', display: 'grid', placeItems: 'center' }}>
                  <LucideIcons.BookOpen size={16} />
                </div>
                <span style={{ fontWeight: 600, fontSize: 15 }}>Library-ready quiet</span>
              </div>
            </div>

          </div>
        </div>

      </main>
      <style>{`
        @media (max-width: 768px) {
          .og-meet-pill { display: none !important; }
        }
      `}</style>
    </div>
  );
}
