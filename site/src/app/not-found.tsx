import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import IntegratedSpaceGame from '@/components/IntegratedSpaceGame';

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

      {/* Main Container with 160px Navbar Clearance */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '160px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          maxWidth: 960,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Enlarged 84px Architectural 404 Emblem Stage */}
        <div style={{ position: 'relative', width: 320, height: 320, marginBottom: 36, display: 'grid', placeItems: 'center' }}>
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
            style={{
              position: 'relative',
              width: 190,
              height: 190,
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
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontWeight: 900,
                fontSize: 84,
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
                fontSize: 11,
                color: '#05CE78',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                marginTop: 6,
                fontWeight: 800,
              }}
            >
              OUT OF ORBIT
            </div>
          </div>
        </div>

        {/* Streamlined Headline Only */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            margin: '0 0 36px',
            color: '#FFFFFF',
          }}
        >
          This page rolled away
        </h1>

        {/* Background Integrated Space Runner Game Canvas */}
        <div style={{ width: '100%', marginBottom: 40 }}>
          <IntegratedSpaceGame />
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
