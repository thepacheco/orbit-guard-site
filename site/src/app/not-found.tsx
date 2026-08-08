import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import OrbitRunnerGame from '@/components/OrbitRunnerGame';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0F172A',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-ui, sans-serif)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Radial Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 900,
          height: 700,
          background: 'radial-gradient(ellipse at center, rgba(90, 116, 255, 0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
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
        {/* Eyebrow Label */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#5A74FF',
            fontWeight: 700,
            marginBottom: 12,
          }}
        >
          System Error · 404
        </div>

        {/* Headline */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            letterSpacing: '-0.035em',
            lineHeight: 1,
            margin: '0 0 12px',
            color: '#FFFFFF',
          }}
        >
          This Page Rolled Away
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: 16,
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.5,
            maxWidth: 520,
            margin: '0 0 28px',
          }}
        >
          The requested URL is out of orbit. While we recalibrate, play a quick round of <strong style={{ color: '#05CE78' }}>Orbit Runner</strong> below!
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
              boxShadow: '0 8px 24px rgba(90, 116, 255, 0.35)',
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

      {/* Footer copyright */}
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
