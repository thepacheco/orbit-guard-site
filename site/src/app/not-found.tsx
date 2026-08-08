import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import OrbitRunnerGame from '@/components/OrbitRunnerGame';

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
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 950,
          height: 650,
          background: 'radial-gradient(ellipse at center, rgba(255, 180, 160, 0.22) 0%, rgba(90, 116, 255, 0.18) 45%, transparent 75%)',
          filter: 'blur(110px)',
          pointerEvents: 'none',
        }}
      />

      {/* Twinkling Star Field Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.6) 1.5px, transparent 1.5px), radial-gradient(circle at 40% 80%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 85% 20%, rgba(255,255,255,0.7) 1.2px, transparent 1.2px)',
          backgroundSize: '240px 240px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Main Container */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          maxWidth: 900,
          width: '100%',
          margin: '0 auto',
        }}
      >
        {/* Larger Architectural 404 Orbital Stage */}
        <div style={{ position: 'relative', width: 220, height: 220, marginBottom: 32, display: 'grid', placeItems: 'center' }}>
          {/* Rotating Dash Rings */}
          <svg
            viewBox="0 0 220 220"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: 'ogSpin 24s linear infinite',
            }}
          >
            <circle cx="110" cy="110" r="100" fill="none" stroke="rgba(90, 116, 255, 0.4)" strokeWidth="2" strokeDasharray="8 14" />
            <circle cx="110" cy="110" r="82" fill="none" stroke="rgba(5, 206, 120, 0.5)" strokeWidth="1.5" strokeDasharray="14 18" />
          </svg>

          {/* Central High-Impact 404 Core */}
          <div
            style={{
              position: 'relative',
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1.5px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 0 48px rgba(90, 116, 255, 0.35)',
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
                fontSize: 54,
                letterSpacing: '-0.05em',
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
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginTop: 6,
                fontWeight: 700,
              }}
            >
              OUT OF ORBIT
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 60px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            margin: '0 0 12px',
            color: '#FFFFFF',
          }}
        >
          This Page Rolled Away
        </h1>

        <p
          style={{
            fontSize: 17,
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.5,
            maxWidth: 520,
            margin: '0 0 28px',
          }}
        >
          The requested path is out of alignment. Enjoy a quick round of <strong style={{ color: '#05CE78' }}>Orbit Runner</strong> below!
        </p>

        {/* 404 Mini-Game Canvas */}
        <div style={{ width: '100%', marginBottom: 36 }}>
          <OrbitRunnerGame />
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link
            href="/"
            style={{
              background: '#5A74FF',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '14px 36px',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 15,
              boxShadow: '0 8px 24px rgba(90, 116, 255, 0.4)',
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
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#FFFFFF',
              textDecoration: 'none',
              padding: '14px 36px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              border: '1px solid rgba(255, 255, 255, 0.18)',
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
