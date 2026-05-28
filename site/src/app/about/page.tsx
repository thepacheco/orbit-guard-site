import React from 'react';
import Header from '@/components/Header';
import { FooterCta } from '@/components/Sections';
import type { Variant } from '@/components/types';

const POLAR: Variant = {
  key: 'polar',
  name: 'Polar',
  hex: '#F4F4F0',
  bg: '#FFFFFF',
  text: '#1A1B1F',
  ring: '#5A74FF',
  accent: '#06D6A0',
  headline: { line1: 'Pure,', lasso: 'Polar', line2: 'minimal.' },
  price: 24,
  blurb: 'Off-white that disappears against bright floors and modern studios.',
  features: [],
  floatChips: [],
  dark: false,
};

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: 'var(--fg)' }}>
      <Header dark={false} />

      {/* Hero */}
      <section
        style={{
          minHeight: '70vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '160px 56px 100px',
          textAlign: 'center',
          background: 'var(--bg-inset)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#5A74FF',
            boxShadow: '0 16px 40px rgba(90,116,255,0.35)',
            marginBottom: 32,
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: '50%',
              width: 24,
              height: 24,
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.5,
            }}
          />
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 5vw, 72px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
            margin: '0 0 24px',
            maxWidth: 800,
          }}
        >
          We protect the spaces you live in.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 19,
            lineHeight: 1.6,
            color: 'var(--fg-2)',
            maxWidth: 560,
            margin: 0,
          }}
        >
          OrbitGuard makes small hardware with big impact — starting with a simple
          caster guard that protects pets, cords, and toes from office chair wheels.
        </p>
      </section>

      {/* Our story */}
      <section
        style={{
          padding: '120px 56px',
          background: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(120px, 14vw, 200px)',
                lineHeight: 0.85,
                color: '#5A74FF',
                letterSpacing: '-0.02em',
              }}
            >
              2026
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-3)',
                marginTop: 16,
              }}
            >
              Founded in Atlanta, GA
            </div>
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#5A74FF',
                marginBottom: 16,
              }}
            >
              Our story
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3vw, 42px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: '0 0 20px',
              }}
            >
              Started with a cat and a cable.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--fg-2)',
                margin: '0 0 20px',
              }}
            >
              It started with a curious cat, a laptop cable, and an office chair that refused
              to play nice. One morning in Atlanta, a wheel caught the cord — and the idea for
              Orbit was born.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--fg-2)',
                margin: 0,
              }}
            >
              We set out to make the simplest, most satisfying piece of hardware in any home
              office. A soft TPU shell that clips onto every caster, protects everything in its
              path, and comes in colors that actually match real rooms. Available in 11 colors,
              fits 95% of chairs.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: '100px 56px',
          background: 'var(--bg-inset)',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {[
            { big: '11 colors', small: 'From Blueberry to Polar', icon: '🎨' },
            { big: '2.1k', small: 'Happy chairs protected', icon: '🪑' },
            { big: '4.9 ★', small: 'Average review score', icon: '⭐' },
          ].map(stat => (
            <div
              key={stat.big}
              style={{
                background: '#fff',
                borderRadius: 20,
                padding: '32px 28px',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{stat.icon}</div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 32,
                  letterSpacing: '-0.02em',
                  color: '#5A74FF',
                  marginBottom: 6,
                }}
              >
                {stat.big}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--fg-3)',
                }}
              >
                {stat.small}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section
        style={{
          padding: '120px 56px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#5A74FF',
              marginBottom: 16,
            }}
          >
            Team
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 3vw, 42px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 20px',
            }}
          >
            Small team. Big intentions.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--fg-2)',
              margin: 0,
            }}
          >
            A small team in Atlanta building simple safety products for real homes.
            We believe the best hardware is the kind you forget is there — until you
            realise it was there all along.
          </p>
        </div>
      </section>

      <FooterCta v={POLAR} />
    </div>
  );
}
