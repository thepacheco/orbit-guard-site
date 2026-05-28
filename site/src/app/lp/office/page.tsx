import React from 'react';

export default function OfficeLandingPage() {
  const bg = '#E5F7EE';
  const fg = '#0A2A22';
  const accent = '#06D6A0';
  const blue = '#5A74FF';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-ui)',
        overflowX: 'hidden',
      }}
    >
      {/* Top: Orbit icon centered */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '32px 24px 0' }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: accent,
            boxShadow: '0 8px 24px rgba(6,214,160,0.35)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '50%',
              width: 14,
              height: 14,
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              background: bg,
              opacity: 0.7,
            }}
          />
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          padding: '80px 56px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            opacity: 0.6,
          }}
        >
          Home Office
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 80px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            margin: 0,
            maxWidth: 760,
          }}
        >
          Roll over your cables?<br />Not anymore.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            opacity: 0.75,
            maxWidth: 520,
            margin: 0,
          }}
        >
          Orbit Guard's soft TPU caster guards protect every cable from being caught under
          your chair wheels. Clean setup. Quiet roll. No tangles.
        </p>
      </section>

      {/* Visual: desk setup SVG */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 56px' }}>
        <svg viewBox="0 0 480 300" width="480" height="300" style={{ maxWidth: '100%' }}>
          {/* Floor */}
          <rect x="0" y="220" width="480" height="80" fill="rgba(0,0,0,0.03)" />
          <line x1="0" y1="220" x2="480" y2="220" stroke={fg} strokeWidth="1.5" opacity="0.3" />

          {/* Desk */}
          <rect x="80" y="120" width="320" height="16" rx="5" fill={fg} />
          <line x1="100" y1="136" x2="100" y2="220" stroke={fg} strokeWidth="4" strokeLinecap="round" />
          <line x1="380" y1="136" x2="380" y2="220" stroke={fg} strokeWidth="4" strokeLinecap="round" />

          {/* Monitor */}
          <rect x="180" y="60" width="120" height="68" rx="6" fill="rgba(255,255,255,0.5)" stroke={fg} strokeWidth="3" />
          <line x1="240" y1="128" x2="240" y2="120" stroke={fg} strokeWidth="3" />
          <line x1="220" y1="120" x2="260" y2="120" stroke={fg} strokeWidth="3" strokeLinecap="round" />

          {/* Keyboard */}
          <rect x="185" y="145" width="110" height="30" rx="4" fill="rgba(255,255,255,0.5)" stroke={fg} strokeWidth="2" />

          {/* Cables on floor */}
          <path d="M 240 136 Q 240 190 200 210" fill="none" stroke={fg} strokeWidth="2" strokeDasharray="5 4" opacity="0.4" />
          <path d="M 220 136 Q 220 195 180 215" fill="none" stroke={fg} strokeWidth="2" strokeDasharray="5 4" opacity="0.4" />

          {/* Chair */}
          <ellipse cx="240" cy="260" rx="60" ry="12" fill="rgba(0,0,0,0.05)" />
          <rect x="215" y="175" width="50" height="30" rx="6" fill={accent} stroke={fg} strokeWidth="3" />
          <rect x="227" y="205" width="26" height="20" fill="rgba(255,255,255,0.3)" stroke={fg} strokeWidth="2" />

          {/* Chair casters with orbit guards */}
          {[210, 240, 270].map(cx => (
            <g key={cx}>
              <line x1="240" y1="225" x2={cx} y2="248" stroke={fg} strokeWidth="3" strokeLinecap="round" />
              <circle cx={cx} cy={258} r="11" fill={accent} stroke={fg} strokeWidth="2.5" />
              <circle cx={cx} cy={258} r="4" fill="rgba(255,255,255,0.35)" />
            </g>
          ))}

          {/* "No cable damage" badge */}
          <rect x="320" y="185" width="130" height="36" rx="18" fill="rgba(255,255,255,0.85)" />
          <text x="385" y="206" fontFamily="var(--font-ui)" fontSize="12" fontWeight="700" fill={fg} textAnchor="middle">
            🔌 Cables safe
          </text>
          <line x1="320" y1="203" x2="280" y2="228" stroke={fg} strokeWidth="1.5" opacity="0.4" />
        </svg>
      </div>

      {/* Feature points */}
      <section
        style={{
          padding: '20px 56px 40px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { icon: '🔌', label: 'Cord protection' },
            { icon: '🪢', label: 'Cable tangle-free' },
            { icon: '🔇', label: 'Quiet on hardwood' },
          ].map(feat => (
            <div
              key={feat.label}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '14px 20px',
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                borderRadius: 999,
                border: '1px solid rgba(6,214,160,0.2)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 15,
                color: fg,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}
            >
              <span>{feat.icon}</span>
              <span>{feat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '20px 56px 100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a
          href="https://kickstarter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: blue,
            color: '#fff',
            borderRadius: 999,
            padding: '20px 40px',
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 18,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 14px 36px rgba(90,116,255,0.40)',
          }}
        >
          Back us on Kickstarter →
        </a>
      </section>
    </div>
  );
}
