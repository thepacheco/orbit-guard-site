export const metadata = { title: 'About', description: 'Orbit Guard makes soft caster guards in Atlanta. Our story, values, and team.', alternates: { canonical: '/about' } };
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
      

      {/* Hero */}
      <section
        className="og-page-hero"
        style={{
          background: 'var(--og-blue)',
          paddingTop: 160,
          paddingBottom: 100,
          paddingLeft: 56,
          paddingRight: 56,
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
            color: '#fff',
            opacity: 0.75,
            marginBottom: 20,
          }}
        >
          Our story
        </div>
        <h1
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 'clamp(32px, 4vw, 52px)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            margin: '0 0 24px',
            maxWidth: 780,
            color: '#fff',
          }}
        >
          A small team. A real problem. A simple fix.
        </h1>
        {/* Orbit icon mark */}
        <img
          src="/assets/orbit-wordmark-white.png"
          height={36}
          alt="Orbit"
          style={{ marginTop: 32, opacity: 0.9 }}
        />
      </section>

      {/* Origin section */}
      <section
        className="og-about-section"
        style={{
          padding: '100px 56px',
          background: '#fff',
        }}
      >
        <div
          className="og-about-origin-grid"
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
              className="og-about-big-year"
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(96px, 34vw, 180px)',
                lineHeight: 0.85,
                color: '#5A74FF',
                letterSpacing: '-0.04em',
              }}
            >
              2023
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
              We started with one chair and one curious chonky cat.
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
              — all of them find the wheel eventually. We built Orbit to sit between the floor and the wheel, safely doing
              nothing until it needs to do everything. Small, soft, and out of sight.
            </p>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section
        className="og-about-section"
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
            className="og-about-values-grid"
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
                title: 'Made for daily use',
                body: 'Used on carpet or hardwood and is durable to take the tough hits.',
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


      {/* Team section */}
      <section
        className="og-about-section"
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
            We don&apos;t have a big team photo...yet but we have an amazing product. And a photo of Edison who inspired Orbit.
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
              href="mailto:hello@orbitguards.com"
              style={{
                color: '#5A74FF',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              hello@orbitguards.com
            </a>
          </p>
        </div>
      </section>

      
    </div>
  );
}
