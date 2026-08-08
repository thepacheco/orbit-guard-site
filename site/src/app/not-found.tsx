import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import MultiStageOrbitGame from '@/components/MultiStageOrbitGame';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0B1120',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-ui, sans-serif)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Deep Space Background Sun & Flare Glow */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1100,
          height: 750,
          background: 'radial-gradient(ellipse at center, rgba(255, 180, 160, 0.24) 0%, rgba(90, 116, 255, 0.18) 45%, transparent 75%)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      {/* Twinkling Star Field Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.85) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.65) 1.5px, transparent 1.5px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.55) 1px, transparent 1px), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.75) 1.2px, transparent 1.2px)',
          backgroundSize: '240px 240px',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />

      {/* Embedded Mobile Responsive Styles */}
      <style>{`
        .og-not-found-main {
          padding: 140px 24px 60px;
        }
        .og-404-stage {
          width: 280px;
          height: 280px;
        }
        .og-404-core-circle {
          width: 175px;
          height: 175px;
        }
        .og-404-num {
          font-size: 78px;
        }
        @media (max-width: 768px) {
          .og-not-found-main {
            padding: 90px 14px 30px !important;
          }
          .og-404-stage {
            width: 190px !important;
            height: 190px !important;
            margin-bottom: 4px !important;
          }
          .og-404-core-circle {
            width: 120px !important;
            height: 120px !important;
          }
          .og-404-num {
            font-size: 52px !important;
          }
        }
        @media (max-height: 500px) and (orientation: landscape) {
          .og-not-found-main {
            padding: 70px 12px 20px !important;
          }
          .og-404-stage {
            display: none !important;
          }
        }
      `}</style>

      {/* Main Container with 160px Navbar Clearance */}
      <div
        className="og-not-found-main"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          maxWidth: 960,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Enlarged 84px Architectural 404 Emblem Stage */}
        <div className="og-404-stage" style={{ position: 'relative', marginBottom: 8, display: 'grid', placeItems: 'center' }}>
          {/* Outer Rotating Dash Rings */}
          <svg
            viewBox="0 0 320 320"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: 'ogSpin 24s linear infinite',
            }}
          >
            <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(90, 116, 255, 0.45)" strokeWidth="2.5" strokeDasharray="10 16" />
            <circle cx="160" cy="160" r="124" fill="none" stroke="rgba(5, 206, 120, 0.55)" strokeWidth="2" strokeDasharray="16 22" />
          </svg>

          {/* Central High-Impact 84px 404 Core */}
          <div
            className="og-404-core-circle"
            style={{
              position: 'relative',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '2px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 0 60px rgba(90, 116, 255, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="og-404-num"
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 900,
                letterSpacing: '-0.06em',
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              404
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: '#05CE78',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                marginTop: 4,
                fontWeight: 800,
              }}
            >
              OUT OF ORBIT
            </div>
          </div>
        </div>

        {/* Smiley-Curved SVG Headline Path (Positioned High & All Lowercase) */}
        <div style={{ width: '100%', maxWidth: 640, marginBottom: 20 }}>
          <svg viewBox="0 0 600 110" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <path id="smileCurve" d="M 20,30 Q 300,110 580,30" fill="none" />
            <text fill="#FFFFFF" fontSize="54" fontWeight="900" fontFamily="var(--font-ui, sans-serif)" letterSpacing="-0.035em">
              <textPath href="#smileCurve" startOffset="50%" textAnchor="middle">
                this page rolled away
              </textPath>
            </text>
          </svg>
        </div>

        {/* 3-Stage Interactive Arcade Game */}
        <div style={{ width: '100%', marginBottom: 40 }}>
          <MultiStageOrbitGame />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              background: '#5A74FF',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '16px 40px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 16,
              boxShadow: '0 8px 28px rgba(90, 116, 255, 0.45)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              transition: 'transform 140ms ease',
            }}
          >
            <LucideIcons.Home size={18} strokeWidth={2} />
            Return Home
          </Link>

          <Link
            href="/shop"
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '16px 40px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 16,
              border: '1px solid rgba(255, 255, 255, 0.22)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <LucideIcons.ShoppingBag size={18} strokeWidth={2} />
            Explore Shop
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '20px 40px',
          textAlign: 'center',
          fontSize: 13,
          color: 'rgba(255, 255, 255, 0.4)',
          fontFamily: 'var(--font-mono)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        &copy; 2026 OrbitGuard, Inc. &middot; Atlanta Studio
      </div>
    </div>
  );
}
