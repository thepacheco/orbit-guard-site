import React from 'react';

const PALETTE = [
  '#4361EE', // blueberry
  '#06D6A0', // clover
  '#FFB4A2', // coral
  '#A292FF', // lavender
  '#E7BC91', // fawn
  '#FF3131', // rooster
  '#FF90FE', // flamingo
  '#9C6644', // bear
  '#950000', // pomegranate
  '#212529', // onyx
  '#F4F4F0', // polar
];

export default function LaunchLandingPage() {
  const bg = '#15171B';
  const fg = '#FFFFFF';

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
      {/* Top: Orbit white wordmark centered */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px 0' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 28,
            color: '#fff',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Icon mark */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: '#5A74FF',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '50%',
                width: 10,
                height: 10,
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: bg,
                opacity: 0.7,
              }}
            />
          </div>
          Orbit
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          padding: '80px 56px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 24,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#05CE78',
            color: '#0A0A0A',
            padding: '8px 16px',
            borderRadius: 999,
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: '0.02em',
          }}
        >
          🚀 Live on Kickstarter
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 6vw, 84px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            margin: 0,
            maxWidth: 800,
          }}
        >
          11 colors. One chair.<br />
          <span style={{ color: '#5A74FF' }}>Zero excuses.</span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 500,
            margin: 0,
          }}
        >
          Soft TPU caster guards that protect pets, cords, and toes — in every color
          your room deserves.
        </p>
      </section>

      {/* Palette row */}
      <section
        style={{
          padding: '0 56px 48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 28px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {PALETTE.map((hex, i) => (
            <div
              key={i}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: hex,
                boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
                flexShrink: 0,
              }}
            />
          ))}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.45)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          11 colors · 5 guards per pack · fits 95% of chairs
        </div>
      </section>

      {/* Funded badge */}
      <section
        style={{
          padding: '0 56px 56px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 20,
            padding: '28px 40px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            textAlign: 'center',
            maxWidth: 480,
            width: '100%',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 56px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            342%<br />
            <span style={{ color: '#05CE78' }}>funded.</span>
          </div>
          <div
            style={{
              height: 8,
              width: '100%',
              borderRadius: 999,
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '85%',
                height: '100%',
                background: '#05CE78',
                borderRadius: 999,
              }}
            />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
            }}
          >
            Now live on Kickstarter · 2,140 backers
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: '0 56px 100px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <a
          href="https://kickstarter.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            background: '#5A74FF',
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
            boxShadow: '0 14px 36px rgba(90,116,255,0.45)',
          }}
        >
          Back us on Kickstarter →
        </a>
      </section>
    </div>
  );
}
