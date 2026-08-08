import React from 'react';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';

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
          width: 800,
          height: 600,
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
          padding: '60px 24px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
          maxWidth: 800,
          margin: '0 auto',
        }}
      >
        {/* Animated Digital Orbital Ring Graphic */}
        <div style={{ position: 'relative', width: 280, height: 280, marginBottom: 40, display: 'grid', placeItems: 'center' }}>
          
          {/* Outer Rotating Dash Ring */}
          <svg
            viewBox="0 0 280 280"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: 'ogSpin 24s linear infinite',
            }}
          >
            <circle
              cx="140"
              cy="140"
              r="130"
              fill="none"
              stroke="rgba(90, 116, 255, 0.35)"
              strokeWidth="2"
              strokeDasharray="6 12"
            />
            <circle
              cx="140"
              cy="140"
              r="110"
              fill="none"
              stroke="rgba(5, 206, 120, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="14 20"
            />
          </svg>

          {/* Counter-Rotating Inner Ring */}
          <svg
            viewBox="0 0 280 280"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              animation: 'ogSpin 16s linear infinite reverse',
            }}
          >
            <circle
              cx="140"
              cy="140"
              r="85"
              fill="none"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />
          </svg>

          {/* Central Pulsing Core Badge */}
          <div
            style={{
              position: 'relative',
              width: 130,
              height: 130,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 0 40px rgba(90, 116, 255, 0.25)',
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
                fontSize: 42,
                letterSpacing: '-0.04em',
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
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: 6,
                fontWeight: 700,
              }}
            >
              OUT OF ORBIT
            </div>
          </div>

          {/* Binary Orbit Dots */}
          <div
            style={{
              position: 'absolute',
              top: '12%',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: '#5A74FF',
              letterSpacing: '0.2em',
            }}
          >
            0101 · 404 · 1010
          </div>
        </div>

        {/* Eyebrow Label */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: '0.16em',
            color: '#5A74FF',
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          System Error · 404
        </div>

        {/* Massive Headline */}
        <h1
          style={{
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 60px)',
            letterSpacing: '-0.035em',
            lineHeight: 1,
            margin: '0 0 16px',
            color: '#FFFFFF',
          }}
        >
          This Page Rolled Away
        </h1>

        {/* Paragraph Description */}
        <p
          style={{
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.6,
            maxWidth: 480,
            margin: '0 0 36px',
          }}
        >
          The resource or URL you requested is out of alignment with our system. Let&rsquo;s get you back on track.
        </p>

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
