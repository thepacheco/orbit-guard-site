import React from 'react';
import Header from '@/components/Header';
import { PRODUCT_VARIANTS } from '@/components/data';
import * as LucideIcons from 'lucide-react';

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

      {/* ── 1. HERO SECTION: Dark Editorial Header ────────────────────── */}
      <section
        style={{
          background: '#0F172A',
          color: '#FFFFFF',
          padding: '160px 40px 100px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Ambient grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: 840 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(90, 116, 255, 0.2)',
                color: '#818CF8',
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
              Our Story &amp; Purpose
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-ui, sans-serif)',
                fontWeight: 900,
                fontSize: 'clamp(40px, 5.5vw, 68px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                margin: '0 0 28px',
                color: '#FFFFFF',
              }}
            >
              We built Orbit Guard because rolling chair wheels shouldn&rsquo;t be a hazard.
            </h1>

            <p
              style={{
                fontSize: 'clamp(18px, 2vw, 22px)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.8)',
                margin: 0,
                maxWidth: 720,
              }}
            >
              Every office chair has five casters. Every caster is a pinch point waiting for a cat tail, a charging cable, or a bare foot at midnight.
            </p>
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

      {/* ── 3. WORKSPACE COLLAGE: Interactive Hotspot Pins ─────────────── */}
      <section style={{ padding: '80px 40px 120px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
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
            <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 36, margin: 0, letterSpacing: '-0.02em' }}>
              Where Orbit comes to life
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: 20,
              height: 500,
            }}
          >
            {/* Main Workspace Frame with Hotspots */}
            <div style={{ gridRow: '1 / 3', position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              <img src="/assets/atlanta_office_empty.png" alt="Atlanta Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

              {/* Hotspot 1: Designed in Atlanta */}
              <div style={{ position: 'absolute', top: '34%', left: '42%', cursor: 'pointer' }}>
                <span style={{ position: 'relative', display: 'flex', width: 24, height: 24 }}>
                  <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#5A74FF', opacity: 0.75 }} />
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 24, width: 24, background: '#5A74FF', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
                </span>
                <div style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', pointerEvents: 'none', fontFamily: 'var(--font-ui)' }}>
                  Designed in Atlanta
                </div>
              </div>

              {/* Hotspot 2: Precision Engineering */}
              <div style={{ position: 'absolute', top: '64%', left: '68%', cursor: 'pointer' }}>
                <span style={{ position: 'relative', display: 'flex', width: 24, height: 24 }}>
                  <span style={{ animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite 0.5s', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '50%', background: '#05CE78', opacity: 0.75 }} />
                  <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '50%', height: 24, width: 24, background: '#05CE78', border: '3px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }} />
                </span>
                <div style={{ position: 'absolute', bottom: '130%', left: '50%', transform: 'translateX(-50%)', background: '#0F172A', color: '#fff', padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 4px 14px rgba(0,0,0,0.2)', pointerEvents: 'none', fontFamily: 'var(--font-ui)' }}>
                  Precision Engineering
                </div>
              </div>
            </div>

            {/* Secondary Photo — Prototyping */}
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
              <img src="/assets/HomePage_OnChair_Photos/OnChair1.png" alt="Prototyping Bay" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Tertiary Photo — Edison the Cat */}
            <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}>
              <img src="/assets/lp_pets/LP_Pets1.png" alt="Edison the Cat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. MATERIALS & SPECS: Dark Technical Section ────────────────── */}
      <section style={{ padding: '120px 40px', background: '#0F172A', color: '#FFFFFF' }}>
        <div
          style={{
            maxWidth: 1200,
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
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#05CE78',
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Material &amp; Architecture
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 3.5vw, 44px)',
                letterSpacing: '-0.025em',
                lineHeight: 1.15,
                margin: '0 0 20px',
                color: '#FFFFFF',
              }}
            >
              High-impact TPU, non-marking polymer.
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.75)', margin: '0 0 20px' }}>
              We custom-formulate our Thermoplastic Polyurethane (TPU) to hit the exact Shore hardness required: firm enough to displace heavy cables, yet soft enough to dampen sound and absorb violent foot stabs.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255, 255, 255, 0.75)', margin: 0 }}>
              The split two-piece housing snaps tightly together around the wheel axle in under 5 seconds — no screws, no adhesives, and no chair disassembly required.
            </p>
          </div>

          {/* Metric Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: 32, borderRadius: 20 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 36, color: '#05CE78', marginBottom: 8 }}>
                100%
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Non-marking, floor-safe TPU polymer.
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: 32, borderRadius: 20 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 36, color: '#5A74FF', marginBottom: 8 }}>
                99%
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Fits standard office chair casters.
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', padding: 32, borderRadius: 20, gridColumn: '1 / -1' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 36, color: '#FFB4A2', marginBottom: 8 }}>
                Zero
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Tools, screws, or chair disassembly needed for snap installation.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. VALUES: Clean Cards (NO EMOJIS) ─────────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#FFFFFF' }}>
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
              Our Core Principles
            </div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 40, margin: 0, letterSpacing: '-0.02em' }}>
              What guides our engineering
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
            {[
              {
                number: '01',
                title: 'Simple by Design',
                body: 'Five seconds per caster wheel. Tool-free snap installation that anyone can do without looking at a manual.',
                icon: <LucideIcons.Zap size={24} color="#5A74FF" />,
              },
              {
                number: '02',
                title: 'Made for Real Workspaces',
                body: 'Not sterile 3D models — real homes with curious pets, trailing power cords, hardwood floors, and rugs.',
                icon: <LucideIcons.Home size={24} color="#05CE78" />,
              },
              {
                number: '03',
                title: 'Built to Last',
                body: 'Tested on oak, tile, carpet, and rug. Engineered to absorb continuous heavy impacts without warping.',
                icon: <LucideIcons.ShieldCheck size={24} color="#FFB4A2" />,
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 24,
                  padding: 36,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: '#FFFFFF', display: 'grid', placeItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
                    {card.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 14, color: '#94A3B8' }}>
                    {card.number}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 20, margin: '0 0 8px', color: '#111827' }}>
                    {card.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                    {card.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TEAM CARDS: Professional (NO EMOJIS) ────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#5A74FF', fontWeight: 700, marginBottom: 12 }}>
            The People Behind Orbit
          </div>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 40, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Meet the Atlanta team
          </h2>
          <p style={{ fontSize: 18, color: '#6B7280', maxWidth: 560, margin: '0 auto 60px' }}>
            A tight-knit team of engineers, designers, and one very curious cat.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 32 }}>
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
                  borderRadius: 24,
                  overflow: 'hidden',
                  padding: 24,
                  textAlign: 'left',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ position: 'relative', height: 220, borderRadius: 16, overflow: 'hidden', marginBottom: 20 }}>
                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', color: '#05CE78', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 99, fontFamily: 'var(--font-mono)' }}>
                      {member.tag}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 24, margin: '0 0 4px', color: '#111827' }}>
                    {member.name}
                  </h3>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5A74FF', fontWeight: 700, marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {member.role}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: '#4B5563', margin: 0 }}>
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 64, fontSize: 16, color: '#6B7280' }}>
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
