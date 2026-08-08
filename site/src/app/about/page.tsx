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
              — all of them find the wheel eventually. When our founder's cat, Edison, had a close call with a rolling chair, 
              we knew something had to change.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.7,
                color: 'var(--fg-2)',
                margin: '0 0 18px',
              }}
            >
              We spent months prototyping, testing, and refining. We built Orbit to sit between the floor and the wheel, safely doing
              nothing until it needs to do everything. Small, soft, and completely out of sight. Our goal was never to invent a new chair—just to make the ones we already love safer for the people and pets we care about most.
            </p>
          </div>
        </div>
      </section>

      {/* Atlanta Workspace Section */}
      <section
        className="og-about-workspace"
        style={{
          padding: '0 56px 100px',
          background: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 40,
          }}
        >
          <div style={{ width: '100%', height: 600, borderRadius: 24, overflow: 'hidden', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.1)' }}>
            <img src="/assets/atlanta_office_empty.png" alt="Orbit Guard Atlanta Workspace" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          
          <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 28, margin: '0 0 16px' }}>
              Designed in Atlanta
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.7, color: 'var(--fg-2)', margin: 0 }}>
              Our workspace in Atlanta is where the magic happens. It's a collaborative hub where engineering meets empathy. We surround ourselves with plants, natural light, and open desks to foster the kind of creative problem-solving that led to Orbit Guard. Every unit is designed, tested, and shipped with care by our dedicated team right here in the US.
            </p>
          </div>
        </div>
      </section>

      {/* Engineering section */}
      <section
        className="og-about-section"
        style={{
          padding: '100px 56px',
          background: '#15171B',
          color: '#fff',
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
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#05CE78',
                marginBottom: 20,
              }}
            >
              Precision Engineering
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                margin: '0 0 24px',
              }}
            >
              Advanced materials for everyday life.
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                margin: '0 0 18px',
              }}
            >
              Orbit Guard isn't just a bumper; it's a meticulously engineered shock absorber. We use a proprietary blend of impact-resistant TPU (Thermoplastic Polyurethane) that offers the perfect balance of rigidity and flexibility.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.7)',
                margin: 0,
              }}
            >
              This allows it to effortlessly snap onto 99% of standard caster wheels without the need for tools or adhesives, while remaining soft enough to bounce harmlessly off ankles, pets, and baseboards.
            </p>
          </div>
          {/* RIGHT */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 20 }}>
               <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 24, margin: '0 0 8px', color: '#05CE78' }}>100%</h4>
               <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Non-marking materials</div>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 20 }}>
               <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 24, margin: '0 0 8px', color: '#05CE78' }}>99%</h4>
               <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Universal caster fit</div>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 20, gridColumn: '1 / -1' }}>
               <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 24, margin: '0 0 8px', color: '#05CE78' }}>Zero</h4>
               <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'rgba(255,255,255,0.6)' }}>Tools required for installation</div>
             </div>
          </div>
        </div>
      </section>

      {/* Values section */}
      {/* Values section — Expanded Dribbble-style 3D interactive cards */}
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
                fontWeight: 700,
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
              gap: 28,
            }}
          >
            {[
              {
                number: '01',
                title: 'Simple by design',
                body: 'One part. Five seconds per wheel. Zero tools, zero instructions needed.',
                accent: '#5A74FF',
                icon: '⚡',
              },
              {
                number: '02',
                title: 'Made for real homes',
                body: 'Not sterile showrooms. Homes with pets, charging cables, bare feet, and hardwood floors.',
                accent: '#06D6A0',
                icon: '🏡',
              },
              {
                number: '03',
                title: 'Made for daily use',
                body: 'Tested on rug and hardwood. Engineered to absorb impact and take continuous tough hits.',
                accent: '#FFB4A2',
                icon: '🛡️',
              },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  background: '#fff',
                  borderRadius: 24,
                  padding: '40px 32px',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 200ms ease, boxShadow 200ms ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <span style={{ fontSize: 32 }}>{card.icon}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 800, color: card.accent, background: `${card.accent}15`, padding: '4px 10px', borderRadius: 99 }}>
                      {card.number}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: 22,
                      letterSpacing: '-0.02em',
                      margin: '0 0 14px',
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
                <div style={{ height: 4, background: card.accent, borderRadius: 2, marginTop: 32, opacity: 0.8 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section — Interactive Playing Cards */}
      <section
        className="og-about-section"
        style={{
          padding: '120px 56px',
          background: '#fff',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#5A74FF', marginBottom: 12, fontWeight: 700 }}>
            Who we are
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 3.5vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 16px',
            }}
          >
            A small team in Atlanta.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 18, color: 'var(--fg-2)', maxWidth: 560, margin: '0 auto 56px' }}>
            We build Orbit Guard right here in Atlanta. Meet the team (and the cat) behind the invention.
          </p>

          {/* Playing Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              {
                name: 'Edison',
                role: 'Chief Inspiration & Safety Officer 🐾',
                bio: 'The curious chonky cat whose near-miss with a office chair wheel sparked the creation of Orbit Guard.',
                img: '/assets/lp_pets/LP_Pets1.png',
                tag: 'Founding Inspiration',
              },
              {
                name: 'Pacheco',
                role: 'Founder & Lead Engineer 🛠️',
                bio: 'Designed and prototyped 40+ iterations of TPU guards to achieve tool-free 99% universal caster fit.',
                img: '/assets/HomePage_OnChair_Photos/OnChair1.png',
                tag: 'Atlanta, GA',
              },
              {
                name: 'Orbit Team',
                role: 'Design & Fulfillment 📦',
                bio: 'Ensures every set of Orbits is molded, quality tested, and shipped directly to your door with care.',
                img: '/assets/HomePage_OnChair_Photos/OnChair3.png',
                tag: 'Atlanta Studio',
              },
            ].map(member => (
              <div
                key={member.name}
                style={{
                  background: '#15171B',
                  color: '#fff',
                  borderRadius: 24,
                  overflow: 'hidden',
                  padding: 24,
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'relative', height: 220, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
                  <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: '#05CE78', fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 99, fontFamily: 'var(--font-mono)' }}>
                    {member.tag}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 24, margin: '0 0 4px', color: '#fff' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5A74FF', fontWeight: 700, marginBottom: 12 }}>
                    {member.role}
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--fg-2)',
              marginTop: 56,
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
