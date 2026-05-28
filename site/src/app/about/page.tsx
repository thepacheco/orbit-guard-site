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
      <Header dark={false} variant={POLAR} />

      {/* Hero */}
      <section
        style={{
          background: '#fff',
          padding: '160px 56px 100px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#5A74FF',
            marginBottom: 20,
          }}
        >
          Our story
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 'clamp(40px, 5vw, 64px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            margin: '0 0 28px',
            maxWidth: 820,
          }}
        >
          Built for the spaces between the desk and the floor.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 19,
            lineHeight: 1.65,
            color: 'var(--fg-2)',
            maxWidth: 560,
            margin: '0 0 40px',
          }}
        >
          Orbit Guard started with a simple problem — a rolling chair kept snagging cables and nearly took out a cat.
          We made a small fix. Now it lives under 2,100 desks.
        </p>
        {/* Orbit icon mark */}
        <div
          style={{
            width: 48,
            height: 48,
            background: '#5A74FF',
            WebkitMaskImage: "url('/assets/orbit-mark-mono.svg')",
            maskImage: "url('/assets/orbit-mark-mono.svg')",
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
          } as React.CSSProperties}
        />
      </section>

      {/* Origin section */}
      <section
        style={{
          padding: '100px 56px',
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
          {/* LEFT */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 180,
                lineHeight: 0.85,
                color: '#5A74FF',
                letterSpacing: '-0.04em',
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
                marginTop: 20,
              }}
            >
              Founded in Atlanta, GA
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 'clamp(22px, 2.5vw, 32px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                margin: '0 0 20px',
                color: 'var(--fg)',
              }}
            >
              We started with one chair and one cat.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--fg-2)',
                margin: '0 0 18px',
              }}
            >
              Every office chair has five wheels. Every wheel is a hazard. A tail, a charging cable, a bare foot at midnight
              — all of them find the wheel eventually. We built Orbit to sit between the floor and the wheel, quietly doing
              nothing until it needs to do everything. Small, soft, and out of sight.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--fg-2)',
                margin: 0,
              }}
            >
              We&apos;re a small team in Atlanta. We design everything here, manufacture in small runs, and ship every order
              ourselves. That&apos;s not a selling point — it&apos;s just how we prefer to work.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section
        style={{
          padding: '100px 56px',
          background: '#F6F6F4',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              marginBottom: 56,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#5A74FF',
                marginBottom: 16,
              }}
            >
              How we work
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 3vw, 42px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              What we believe in.
            </h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {[
              {
                title: 'Simple by design',
                body: 'One part. Five seconds per wheel. No tools, no instructions needed.',
              },
              {
                title: 'Made for real homes',
                body: 'Not labs or showrooms. Homes with pets, cables, bare feet, and hardwood floors.',
              },
              {
                title: 'Built to last',
                body: 'Soft TPU that doesn\'t yellow or crack. Replace the chair before you replace the Orbit.',
              },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  background: '#fff',
                  borderRadius: 20,
                  padding: '36px 32px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 20,
                    letterSpacing: '-0.01em',
                    margin: '0 0 12px',
                    color: 'var(--fg)',
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: 'var(--fg-2)',
                    margin: 0,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section
        style={{
          padding: '80px 56px',
          background: '#5A74FF',
          color: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            textAlign: 'center',
          }}
        >
          {[
            { big: '2,140', label: 'chairs protected' },
            { big: '4.9', label: 'average rating' },
            { big: '11', label: 'colors' },
            { big: '60-day', label: 'free returns' },
          ].map(stat => (
            <div key={stat.big}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 48,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.big}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  opacity: 0.75,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team section */}
      <section
        style={{
          padding: '120px 56px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
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
            A small team in Atlanta.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--fg-2)',
              margin: '0 0 24px',
            }}
          >
            We don&apos;t have a big team photo or a mission statement poster. We have a product that works and customers who
            tell their friends.
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
            Want to talk? Reach us at{' '}
            <a
              href="mailto:hello@orbitguard.com"
              style={{
                color: '#5A74FF',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              hello@orbitguard.com
            </a>
          </p>
        </div>
      </section>

      <FooterCta v={POLAR} />
    </div>
  );
}
