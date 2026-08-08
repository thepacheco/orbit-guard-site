import React from 'react';
import Header from '@/components/Header';
import { PRODUCT_VARIANTS } from '@/components/data';
import * as LucideIcons from 'lucide-react';
import StudioCarousel from '@/components/StudioCarousel';

export const metadata = {
  title: 'About Us | Orbit Guard',
  description: 'Learn about Orbit Guard — engineered in Atlanta to shield pets, cables, and toes from office chair casters.',
  alternates: { canonical: '/about' },
};

const polarVariant = PRODUCT_VARIANTS.find(v => v.key === 'polar') ?? PRODUCT_VARIANTS[0];

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#FFFFFF', color: '#111827', fontFamily: 'var(--font-body, sans-serif)' }}>
      <Header dark={false} variant={polarVariant} />

      {/* ── 1. HERO SECTION: Light Canvas Editorial Header ───────────────── */}
      <section
        style={{
          background: '#F8FAFC',
          color: '#0F172A',
          padding: '160px 40px 100px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #E2E8F0',
        }}
      >
        {/* Ambient radial background glow */}
        <div
          style={{
            position: 'absolute',
            top: '30%',
            right: '10%',
            width: 600,
            height: 400,
            background: 'radial-gradient(ellipse at center, rgba(90, 116, 255, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              {/* Vertical Architectural Accent Label */}
              <div
                style={{
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                  position: 'absolute',
                  left: -36,
                  top: 0,
                  bottom: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#94A3B8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                }}
              >
                OUR STORY · ATLANTA GA
              </div>

              <div style={{ paddingLeft: 16 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(90, 116, 255, 0.1)',
                    color: '#5A74FF',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '6px 16px',
                    borderRadius: 999,
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    marginBottom: 24,
                    fontFamily: 'var(--font-mono, monospace)',
                  }}
                >
                  Our Purpose &amp; Origin
                </div>

                <h1
                  style={{
                    fontFamily: 'var(--font-ui, sans-serif)',
                    fontWeight: 900,
                    fontSize: 'clamp(44px, 5.5vw, 76px)',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.95,
                    margin: '0 0 28px',
                    color: '#0F172A',
                  }}
                >
                  Rolling chair wheels shouldn&rsquo;t be a hazard.
                </h1>

                <p
                  style={{
                    fontSize: 'clamp(18px, 2vw, 22px)',
                    lineHeight: 1.6,
                    color: '#475569',
                    margin: 0,
                    maxWidth: 640,
                  }}
                >
                  Every office chair has five casters. Every caster is a pinch point waiting for a cat tail, a charging cable, or a bare foot at midnight.
                </p>
              </div>
            </div>

            {/* Right Hero Image Card Composition */}
            <div
              style={{
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,0.06)',
                border: '1px solid #E2E8F0',
                background: '#FFFFFF',
                aspectRatio: '4/3',
                position: 'relative',
              }}
            >
              <img
                src="/assets/atlanta_office_empty.png"
                alt="Orbit Atlanta Studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  right: 16,
                  background: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(12px)',
                  padding: '12px 20px',
                  borderRadius: 16,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Atlanta Studio &amp; Engineering Lab
                </span>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#05CE78', boxShadow: '0 0 8px #05CE78' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ORIGIN STORY: Atlanta 2023 Grid ──────────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* Big Year Stat Callout */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 900,
                fontSize: 'clamp(96px, 18vw, 180px)',
                lineHeight: 0.85,
                color: '#5A74FF',
                letterSpacing: '-0.05em',
              }}
            >
              2023
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#6B7280',
                marginTop: 24,
                fontWeight: 700,
              }}
            >
              Founded in Atlanta, Georgia
            </div>
          </div>

          {/* Prose */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(28px, 3.2vw, 40px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                color: '#111827',
                margin: 0,
              }}
            >
              Inspired by a curious cat named Edison.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#4B5563', margin: 0 }}>
              When our founder&rsquo;s cat, Edison, had a scary close call with a rolling office chair wheel, we searched everywhere for a solution. Standard rubber casters don&rsquo;t stop pinches, and rug mats don&rsquo;t protect toes or cables.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: '#4B5563', margin: 0 }}>
              We spent over a year 3D-printing, testing, and refining custom TPU bumper shapes right here in Atlanta. Orbit Guard sits between the floor and the wheel housing, pushing obstacles out of the way before they get trapped under the caster.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. WORKSPACE CAROUSEL: Creating the Perfect Orbit ─────────── */}
      <section style={{ padding: '100px 40px 120px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#5A74FF',
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Atlanta Studio &amp; Lab
            </div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 40, margin: 0, letterSpacing: '-0.025em', color: '#0F172A' }}>
              Creating the Perfect Orbit
            </h2>
          </div>

          {/* Interactive Auto-Carousel */}
          <StudioCarousel />
        </div>
      </section>

      {/* ── 4. DESIGN & UTILITY HIGHLIGHTS ──────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#FFFFFF', color: '#0F172A', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 60px' }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#5A74FF',
                fontWeight: 700,
                marginBottom: 12,
              }}
            >
              Engineering &amp; Utility Highlights
            </div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 40, margin: 0, letterSpacing: '-0.025em', color: '#0F172A' }}>
              Precision-Molded Polymer Architecture
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {[
              {
                title: 'High-Impact TPU Polymer',
                desc: 'Custom formulated for Shore hardness: firm enough to displace heavy cables, soft enough to absorb toe bumps.',
                icon: <LucideIcons.ShieldCheck size={28} color="#05CE78" />,
                stat: '100% Floor-Safe',
              },
              {
                title: '5-Second Snap Assembly',
                desc: 'Tool-free interlocking halves snap tightly around caster stems without requiring tools or chair disassembly.',
                icon: <LucideIcons.Wrench size={28} color="#5A74FF" />,
                stat: 'Zero Tools Needed',
              },
              {
                title: 'Universal Caster Fit',
                desc: 'Engineered to fit 99% of standard office chair wheel stems (7mm to 11mm) across top ergonomic brands.',
                icon: <LucideIcons.CheckCircle2 size={28} color="#A292FF" />,
                stat: '99% Compatibility',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 24,
                  padding: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: '#FFFFFF', display: 'grid', placeItems: 'center', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: '#5A74FF', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {item.stat}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 22, margin: '0 0 8px', color: '#0F172A' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. TEAM CARDS: Prominent & Bold Layout ────────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#5A74FF', fontWeight: 700, marginBottom: 12 }}>
            The People Behind Orbit
          </div>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 44, margin: '0 0 16px', letterSpacing: '-0.025em', color: '#0F172A' }}>
            Meet the Atlanta team
          </h2>
          <p style={{ fontSize: 18, color: '#64748B', maxWidth: 560, margin: '0 auto 60px' }}>
            A tight-knit team of engineers, designers, and one very curious cat.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 40 }}>
            {[
              {
                name: 'Edison',
                role: 'Chief Safety Inspiration',
                bio: 'The curious cat whose near-miss with a rolling chair wheel sparked the initial design of Orbit Guard.',
                img: '/assets/lp_pets/LP_Pets1.png',
                tag: 'Founding Inspiration',
              },
              {
                name: 'Pacheco',
                role: 'Founder & Lead Engineer',
                bio: 'Designed and prototyped 40+ iterations of TPU guards to achieve a tool-free universal caster fit.',
                img: '/assets/HomePage_OnChair_Photos/OnChair1.png',
                tag: 'Atlanta, GA',
              },
              {
                name: 'Orbit Team',
                role: 'Design & Fulfillment',
                bio: 'Ensures every set of Orbits is precision molded, quality inspected, and shipped directly from Atlanta.',
                img: '/assets/HomePage_OnChair_Photos/OnChair3.png',
                tag: 'Atlanta Studio',
              },
            ].map((member) => (
              <div
                key={member.name}
                style={{
                  background: '#FFFFFF',
                  borderRadius: 28,
                  overflow: 'hidden',
                  padding: 32,
                  textAlign: 'left',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 20px 48px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: 320, borderRadius: 20, overflow: 'hidden', marginBottom: 24 }}>
                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', color: '#05CE78', fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 99, fontFamily: 'var(--font-mono)' }}>
                      {member.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 30, margin: '0 0 6px', color: '#0F172A' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#5A74FF', fontWeight: 700, marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: '#475569', margin: 0 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, fontSize: 16, color: '#64748B' }}>
            Have a question for our team? Contact us at{' '}
            <a href="mailto:hello@orbitguards.com" style={{ color: '#5A74FF', fontWeight: 700, textDecoration: 'none' }}>
              hello@orbitguards.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
