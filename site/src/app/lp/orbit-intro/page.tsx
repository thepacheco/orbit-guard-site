'use client';

import React, { useState } from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

export default function OrbitIntroLandingPage() {
  const variant = PRODUCT_VARIANTS.find(v => v.key === 'bear') || PRODUCT_VARIANTS[0];
  const [exploded, setExploded] = useState(true); // default exploded for engineering view

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5F5', color: '#1A1A1A', fontFamily: 'var(--font-ui)', overflowX: 'hidden' }}>
      <Header dark={false} variant={variant} />

      {/* Very faint grid background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px'
      }} />

      <main style={{ position: 'relative', zIndex: 10, minHeight: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Title Block */}
        <div style={{ textAlign: 'center', paddingTop: 80, marginBottom: 40, animation: 'ogFadeInUp 0.8s ease-out forwards' }}>
          <h1 style={{ 
            fontFamily: 'var(--font-ui)', 
            fontWeight: 300, 
            fontSize: 'clamp(48px, 6vw, 72px)', 
            letterSpacing: '-0.04em',
            margin: '0 0 8px'
          }}>
            orbit
          </h1>
          <p style={{ 
            fontFamily: 'var(--font-ui)', 
            fontWeight: 600, 
            fontSize: 16, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            color: '#555',
            margin: 0
          }}>
            <span style={{ fontWeight: 400 }}>engineered</span> elegance
          </p>
        </div>

        {/* Technical Layout */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 1000, height: 600 }}>
          
          {/* Viewer */}
          <div style={{ position: 'absolute', inset: 0, animation: 'ogZoomIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
            {/* Macro camera view */}
            <Product3DViewer topColor={variant.hex} bottomColor={variant.hex} exploded={exploded} cameraPosition={[0, 1.0, 2.5]} interactive={false} />
          </div>

          {/* Interaction Trigger */}
          <button
            onClick={() => setExploded(!exploded)}
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.1)',
              padding: '12px 24px',
              borderRadius: 999,
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              zIndex: 30,
              boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
              transition: 'background 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.background = '#f9f9f9'}
            onMouseOut={e => e.currentTarget.style.background = '#fff'}
          >
            {exploded ? 'Assemble Model' : 'Explode View'}
          </button>

          {/* Dotted Leader Lines & Text */}
          {/* Top Line */}
          <div className="og-intro-label" style={{ position: 'absolute', top: '15%', right: '10%', zIndex: 20, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 100, borderBottom: '1px dashed #666', marginRight: 16 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: '#333' }}>velvet cushioning</div>
              <div style={{ fontSize: 12, color: '#777', maxWidth: 200, marginTop: 4, lineHeight: 1.5 }}>
                Luxuriously soft yet resilient top offers <b>comfort</b> that adapts to your environment.
              </div>
            </div>
          </div>

          {/* Bottom Left Line */}
          <div className="og-intro-label" style={{ position: 'absolute', bottom: '35%', left: '10%', zIndex: 20, display: 'flex', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: '#333', textAlign: 'right' }}>aluminium base</div>
            </div>
            <div style={{ width: 100, borderBottom: '1px dashed #666', marginLeft: 16 }} />
          </div>

          {/* Bottom Right Line */}
          <div className="og-intro-label" style={{ position: 'absolute', bottom: '15%', right: '15%', zIndex: 20, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: 80, borderBottom: '1px dashed #666', marginRight: 16 }} />
            <div>
              <div style={{ fontSize: 16, fontWeight: 500, color: '#333' }}>polycarbonate</div>
            </div>
          </div>

        </div>

      </main>
      <style>{`
        @media (max-width: 768px) {
          .og-intro-label { display: none !important; }
        }
      `}</style>
    </div>
  );
}
