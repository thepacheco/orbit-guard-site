'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { PRODUCT_VARIANTS } from './data';

export default function ProductHeroSections() {
  return (
    <div style={{ background: '#fff', color: '#111827', width: '100%' }}>

      {/* HERO 1: What is Orbit & What Does It Do */}
      <section
        style={{
          padding: '100px 40px',
          background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)',
          borderTop: '1px solid #E5E7EB',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
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
                borderRadius: 99,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 16,
              }}
            >
              <LucideIcons.Sparkles size={14} />
              Product Overview
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4vw, 52px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                margin: '0 0 20px',
                color: '#111827',
              }}
            >
              What is Orbit &amp; what does it do?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body, sans-serif)',
                fontSize: 18,
                lineHeight: 1.6,
                color: '#4B5563',
                margin: 0,
              }}
            >
              Orbit Guard is a soft, high-impact TPU bumper engineered specifically for office chair casters.
              It wraps your wheels to shield cat tails, curious paws, cables, and bare feet from accidental pinches.
            </p>
          </div>

          {/* Dual Side-by-Side Media / GIF Slots */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 32 }}>
            <div
              style={{
                background: '#111827',
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                height: 420,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <img
                src="/assets/HomePage_OnChair_Photos/OnChair1.png"
                alt="Orbit in Action - Pet & Cord Shielding"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 10,
                  padding: 32,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(17,24,39,0.92) 100%)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 8 }}>
                  Demonstration 01
                </div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 24, color: '#fff', margin: '0 0 8px' }}>
                  Paw &amp; Cable Shielding
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
                  Glides gently over power cords and keeps low-profile obstacles safely out of the wheel path.
                </p>
              </div>
            </div>

            <div
              style={{
                background: '#111827',
                borderRadius: 24,
                overflow: 'hidden',
                position: 'relative',
                height: 420,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              <img
                src="/assets/HomePage_OnChair_Photos/OnChair2.png"
                alt="Orbit in Action - Silent Wheel Roll"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
              />
              <div
                style={{
                  position: 'relative',
                  zIndex: 10,
                  padding: 32,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(17,24,39,0.92) 100%)',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5A74FF', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 8 }}>
                  Demonstration 02
                </div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 24, color: '#fff', margin: '0 0 8px' }}>
                  Whisper-Quiet Smooth Roll
                </h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, lineHeight: 1.5 }}>
                  Non-marking polymer dampens wheel clatter on tile, rug, and hardwood without adding friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HERO 2: How to Install (4 Step Slots) */}
      <section style={{ padding: '100px 40px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(6, 214, 160, 0.1)',
                color: '#05CE78',
                fontSize: 12,
                fontWeight: 700,
                padding: '6px 16px',
                borderRadius: 99,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 16,
              }}
            >
              <LucideIcons.Wrench size={14} />
              Tool-Free Installation
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4vw, 48px)',
                letterSpacing: '-0.03em',
                margin: '0 0 16px',
              }}
            >
              How to install in 5 seconds
            </h2>
            <p style={{ fontSize: 18, color: '#6B7280', margin: 0 }}>
              No tools, screws, or adhesives required. Snap the two halves together in four easy steps.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}>
            {[
              {
                step: '01',
                title: 'Align Caster',
                desc: 'Clean wheel and line up the Orbit upper piece around the caster stem.',
                icon: <LucideIcons.Focus size={24} color="#5A74FF" />,
              },
              {
                step: '02',
                title: 'Position Top Half',
                desc: 'Slide the top piece down until it rests flush against the caster frame.',
                icon: <LucideIcons.Layers size={24} color="#06D6A0" />,
              },
              {
                step: '03',
                title: 'Snap Bottom Cup',
                desc: 'Bring the lower cup from below and press until you hear a satisfying snap.',
                icon: <LucideIcons.CheckCircle2 size={24} color="#A292FF" />,
              },
              {
                step: '04',
                title: 'Ready to Roll',
                desc: 'Repeat on all 5 wheels. Your chair is now 100% protected and ready.',
                icon: <LucideIcons.PlayCircle size={24} color="#FFB4A2" />,
              },
            ].map(item => (
              <div
                key={item.step}
                style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: 20,
                  padding: 28,
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: 20, color: '#9CA3AF' }}>
                    {item.step}
                  </span>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, margin: '0 0 6px', color: '#111827' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERO 3: Color Showcase */}
      <section style={{ padding: '100px 40px', background: '#15171B', color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 60px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255, 180, 162, 0.15)',
                color: '#FFB4A2',
                fontSize: 12,
                fontWeight: 700,
                padding: '6px 16px',
                borderRadius: 99,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 16,
              }}
            >
              <LucideIcons.Palette size={14} />
              12 Signature Swatches
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-ui, sans-serif)',
                fontWeight: 800,
                fontSize: 'clamp(32px, 4vw, 48px)',
                letterSpacing: '-0.03em',
                margin: '0 0 16px',
                color: '#fff',
              }}
            >
              A palette for every desk
            </h2>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              From subtle stealth tones to vibrant statement pieces, mix and match top &amp; bottom colors to craft your custom setup.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 16 }}>
            {PRODUCT_VARIANTS.map(v => (
              <div
                key={v.key}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  padding: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: v.hex,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    border: v.hex === '#FFFFFF' ? '1px solid rgba(255,255,255,0.3)' : 'none',
                  }}
                />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{v.name}</div>
                  <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{v.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERO 4: Made to Fit & Compatibility Warning */}
      <section style={{ padding: '100px 40px', background: '#F9FAFB' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
          <div>
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
                borderRadius: 99,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 20,
              }}
            >
              <LucideIcons.ShieldCheck size={14} />
              Made to Fit 99% of Chairs
            </div>
            <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 38, margin: '0 0 20px', letterSpacing: '-0.02em' }}>
              Universal caster compatibility
            </h2>
            <p style={{ fontSize: 17, color: '#4B5563', lineHeight: 1.6, margin: '0 0 24px' }}>
              Orbit Guard is precision-molded to fit standard office chair caster stems ranging from 7mm to 11mm in diameter.
              Compatible with Herman Miller, Steelcase, IKEA, Secretlab, Humanscale, and standard replacement casters.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Standard 11mm x 22mm stems', 'IKEA 10mm x 22mm stems', 'Single & dual-wheel casters'].map(check => (
                <div key={check} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600, color: '#111827' }}>
                  <LucideIcons.CheckCircle2 size={18} color="#05CE78" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning / Compatibility Card */}
          <div
            style={{
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderRadius: 24,
              padding: 40,
              boxShadow: '0 8px 30px rgba(245,158,11,0.06)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <LucideIcons.AlertTriangle size={28} color="#D97706" />
              <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 22, color: '#92400E', margin: 0 }}>
                Fit &amp; Safety Guidance
              </h3>
            </div>
            <p style={{ fontSize: 15, color: '#78350F', lineHeight: 1.6, margin: '0 0 16px' }}>
              Please measure your caster wheel clearance prior to installation. Orbit requires at least 4mm of vertical clearance between the caster top housing and the floor.
            </p>
            <p style={{ fontSize: 14, color: '#92400E', fontWeight: 600, margin: 0 }}>
              Need help checking compatibility? Contact support@orbitguards.com and our team will verify your chair model.
            </p>
          </div>
        </div>
      </section>

      {/* HERO 5: Upper & Lower Portion Breakdown Diagram */}
      <section style={{ padding: '100px 40px', background: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#5A74FF', fontWeight: 700, marginBottom: 12 }}>
            Split Architecture
          </div>
          <h2 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 36, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Upper &amp; lower portion breakdown
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', maxWidth: 640, margin: '0 auto 56px' }}>
            Each Orbit Guard is composed of two inter-locking halves engineered for seamless snap assembly and shock dispersion.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
            <div style={{ background: '#F3F4F6', borderRadius: 24, padding: 40, position: 'relative', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)' }}>
              <img src="/assets/HomePage_OnChair_Photos/OnChair3.png" alt="Upper & Lower Split View" style={{ width: '100%', height: 320, objectFit: 'cover', borderRadius: 16 }} />
            </div>

            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: 24, borderRadius: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#5A74FF', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                  Upper Section (Stem Ring)
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  Deflection Ring
                </h4>
                <p style={{ fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  Anchors snugly around the caster stem to prevent vertical movement and absorb top impacts.
                </p>
              </div>

              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', padding: 24, borderRadius: 16 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#06D6A0', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>
                  Lower Section (Base Cup)
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#111827' }}>
                  Floor-Proximity Cup
                </h4>
                <p style={{ fontSize: 14, color: '#4B5563', margin: 0, lineHeight: 1.5 }}>
                  Rides just above floor level to push cables and obstacles away before they catch under the wheel.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
