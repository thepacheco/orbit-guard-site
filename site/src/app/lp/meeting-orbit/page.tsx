'use client';

import React from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

export default function MeetingOrbitLandingPage() {
  const variant = PRODUCT_VARIANTS.find(v => v.key === 'onyx') || PRODUCT_VARIANTS[0];

  return (
    <div style={{ minHeight: '100vh', background: '#EAEAEA', color: '#000', fontFamily: 'var(--font-ui)', overflowX: 'hidden' }}>
      <Header dark={false} variant={variant} />

      <main style={{ position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 60 }}>
        
        {/* Massive Title */}
        <div style={{ textAlign: 'center', position: 'relative', zIndex: 10, width: '100%', maxWidth: 1200 }}>
          <h1 style={{ 
            fontFamily: 'var(--font-ui)', 
            fontWeight: 800, 
            fontSize: 'clamp(100px, 15vw, 240px)', 
            letterSpacing: '-0.04em',
            margin: 0,
            color: '#FFFFFF',
            WebkitTextStroke: '1px rgba(0,0,0,0.05)',
            lineHeight: 1,
            textTransform: 'uppercase',
            animation: 'ogFadeInUp 1s ease-out forwards'
          }}>
            ORBIT
          </h1>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0 40px',
            marginTop: -20,
            animation: 'ogFadeInUp 1s ease-out 0.2s forwards',
            opacity: 0
          }}>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#666' }}>Titanium Strength</div>
            <div style={{ flex: 1, height: 1, background: '#CCC', margin: '0 40px' }} />
            <div style={{ fontSize: 14, fontWeight: 500, color: '#666' }}>Refined Comfort</div>
          </div>
        </div>

        {/* Product & Geometric Background */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 1000, height: 600, marginTop: -40 }}>
          
          {/* Wireframe Circles */}
          <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
            <div style={{ 
              width: 500, height: 500, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)',
              position: 'absolute'
            }} />
            <div style={{ 
              width: 650, height: 650, borderRadius: '50%', border: '1px solid rgba(0,0,0,0.05)',
              position: 'absolute'
            }} />
          </div>

          {/* 3D Viewer */}
          <div style={{ position: 'absolute', inset: 0, animation: 'ogZoomIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', transformOrigin: 'bottom' }}>
            <Product3DViewer topColor={variant.hex} bottomColor={variant.hex} exploded={false} cameraPosition={[0, 0, 4.0]} />
          </div>

          {/* Foreground Frame lines mimicking "ONOMA" design */}
          <div style={{ 
            position: 'absolute', 
            bottom: 0, 
            left: '50%', 
            transform: 'translateX(-50%)', 
            width: 300, 
            height: 400, 
            border: '8px solid #000', 
            borderBottom: 'none',
            borderRadius: '40px 40px 0 0',
            pointerEvents: 'none',
            zIndex: 20
          }} />

        </div>

      </main>
    </div>
  );
}
