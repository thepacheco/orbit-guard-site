'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from './primitives';
import { DynIcon } from './primitives';
import type { Variant } from './types';
import * as LucideIcons from 'lucide-react';
import NotifyForm from './NotifyForm';
import { SITE_CONFIG } from '../config/products';
import dynamic from 'next/dynamic';
import confetti from 'canvas-confetti';
import { PRODUCT_VARIANTS } from './data';
import UNIQUE_MIX_NAMES from './names.json';

const Product3DViewer = dynamic(() => import('./Product3DViewer'), { ssr: false });

export function vAccent(v: Variant): string {
  if (v.dark) return v.ring;
  if (v.key === 'polar') return v.ring;
  return v.hex;
}

// ──────────────────────────────────────────────────────────────────
function Stat({ big, small, v }: { big: string; small: string; v: Variant }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          fontSize: 36,
          letterSpacing: '-0.02em',
          color: vAccent(v),
          transition: 'color 420ms var(--ease-out)',
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--fg-3)',
          marginTop: 6,
        }}
      >
        {small}
      </div>
    </div>
  );
}

export function AboutOrbit({ v }: { v: Variant }) {
  return (
    <section
      style={{
        padding: '120px 56px',
        background: '#fff',
        color: 'var(--fg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="og-two-col"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        <div>
          {/* Product photo — replace this placeholder with a real image, e.g.
              <img src="/assets/photos/orbit-in-use.jpg" alt="Orbit on a chair caster" /> */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4 / 3',
              borderRadius: 20,
              overflow: 'hidden',
              background: 'linear-gradient(135deg, #f3f5f7 0%, #e8edf1 100%)',
              border: '1px solid rgba(0,0,0,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 96, lineHeight: 1 }} role="img" aria-label="cat">🐱</span>
            <span
              style={{
                position: 'absolute',
                bottom: 14,
                left: 16,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--fg-3)',
              }}
            >
              Product photo
            </span>
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
            <span style={{ color: vAccent(v), transition: 'color 420ms var(--ease-out)' }}>¹⁄₆₄</span>{' '}
            of the chair, all of the protection
          </div>
        </div>
        <div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 3.8vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Orbit is the smallest piece of hardware that{' '}
            <em
              style={{
                fontStyle: 'normal',
                color: vAccent(v),
                transition: 'color 420ms var(--ease-out)',
              }}
            >
              changes the room
            </em>{' '}
            the most.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--fg-2)',
              margin: '24px 0 0',
              maxWidth: 520,
            }}
          >
            Orbit guards fit into every caster wheel on your chair.
          </p>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
// Story section: text on the LEFT, image on the RIGHT.
export function OrbitInUse({ v }: { v: Variant }) {
  return (
    <section
      className="og-pad-section"
      style={{
        padding: '120px 56px',
        background: '#fff',
        color: 'var(--fg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="og-two-col"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* LEFT: copy */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: vAccent(v),
              marginBottom: 16,
              transition: 'color 420ms var(--ease-out)',
            }}
          >
            Built for everyday life
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 3.4vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              margin: 0,
            }}
          >
            Made to disappear into{' '}
            <em style={{ fontStyle: 'normal', color: vAccent(v), transition: 'color 420ms var(--ease-out)' }}>
              your space
            </em>
            .
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
              margin: '24px 0 0',
              maxWidth: 480,
            }}
          >
            Whether it&apos;s the home office, a studio, or the gaming corner, Orbit slips onto every
            caster and quietly does its job — protecting floors, walls, and the curious pets weaving
            between your chair legs. No tools, no marks, no second thoughts.
          </p>
        </div>

        {/* RIGHT: product photo placeholder — replace with a real <img> */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '4 / 3',
            borderRadius: 20,
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #eef1f4 0%, #e2e8ee 100%)',
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Replace this placeholder, e.g.:
              <img src="/assets/photos/orbit-lifestyle.jpg" alt="Orbit in use" style={{ width:'100%', height:'100%', objectFit:'cover' }} /> */}
          <span style={{ fontSize: 96, lineHeight: 1 }} role="img" aria-label="cat">🐱</span>
          <span
            style={{
              position: 'absolute',
              bottom: 14,
              left: 16,
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--fg-3)',
            }}
          >
            Lifestyle photo
          </span>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
export function HowItWorks({ v }: { v: Variant }) {
  const [hoveredStep, setHoveredStep] = React.useState<string | null>(null);
  const steps = [
    { 
      n: '01', 
      title: 'Tip the chair', 
      body: 'Lift the chair slightly up so one of the wheels is no longer touching the ground.',
      image: '/assets/placeholder-step1.jpg' 
    },
    { n: '02', title: 'Slide it on', body: 'Slide the OrbitGuard so the wheel fits inside your OrbitGuard.' },
    { n: '03', title: 'Repeat', body: 'Place chair down and repeat for the other ones.' },
    { n: '04', title: 'Roll on', body: 'Roll on. Done. Two minutes finish every time.' },
  ];
  return (
    <section
      style={{
        padding: '120px 56px',
        background: v.bg,
        color: v.text,
        position: 'relative',
        overflow: 'hidden',
        transition: 'background 420ms var(--ease-out), color 420ms var(--ease-out)',
      }}
    >
      <svg
        viewBox="0 0 1200 800"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.55,
        }}
      >
        <ellipse
          cx="600" cy="640" rx="640" ry="80"
          fill="none"
          stroke={vAccent(v)}
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </svg>
      <div style={{ maxWidth: 1180, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div
          className="og-section-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: 16,
            marginBottom: 64,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4vw, 60px)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            Two minutes.<br />
            <span style={{ color: vAccent(v), transition: 'color 420ms var(--ease-out)' }}>
              Zero tools.
            </span>
          </h2>
          <Button variant={v.dark ? 'inverse' : 'primary'} icon="PlayCircle">
            Watch the 90-sec install
          </Button>
        </div>
        <div
          className="og-four-col"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
            gap: 18,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 28,
              left: 28,
              right: 28,
              height: 2,
              background: `repeating-linear-gradient(90deg, ${vAccent(v)}, ${vAccent(v)} 6px, transparent 6px, transparent 14px)`,
              opacity: 0.5,
            }}
          />
          {steps.map(s => (
            <div key={s.n} style={{ position: 'relative', padding: '0 4px' }}>
              <div
                className="og-step-circle"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: vAccent(v),
                  color: 'white',
                  display: 'grid',
                  placeItems: 'center',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 18,
                  letterSpacing: '-0.01em',
                  boxShadow: `0 8px 18px ${vAccent(v)}40`,
                  marginBottom: 18,
                  position: 'relative',
                  zIndex: 1,
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setHoveredStep(s.n)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {s.n}
                {hoveredStep === s.n && (
                  <div style={{
                    position: 'absolute',
                    top: '-160px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 200,
                    height: 140,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    padding: 6,
                    zIndex: 50,
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#f0f0f0',
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      fontSize: 12,
                      fontFamily: 'var(--font-mono)'
                    }}>
                      Image for Step {s.n}
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 20,
                  letterSpacing: '-0.01em',
                }}
              >
                {s.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'currentColor',
                  opacity: 0.72,
                  lineHeight: 1.55,
                  fontSize: 14,
                  marginTop: 8,
                }}
              >
                {s.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
function Pill({ v, icon, label }: { v: Variant; icon: string; label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 16px 10px 12px',
        borderRadius: 999,
        background: 'var(--bg-inset)',
        border: '1px solid var(--border)',
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: 13,
        color: 'var(--fg)',
      }}
    >
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: vAccent(v),
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <DynIcon name={icon} size={13} strokeWidth={2} />
      </span>
      {label}
    </span>
  );
}

function StackDiagram({ v }: { v: Variant }) {
  const stroke = '#1A1B1F';
  return (
    <svg viewBox="0 0 420 380" width="100%" height="100%" style={{ maxWidth: 480 }}>
      <defs>
        <linearGradient id={`stack-${v.key}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={vAccent(v)} stopOpacity="0.95" />
          <stop offset="100%" stopColor={vAccent(v)} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      {/* Floor */}
      <line x1="50" y1="340" x2="370" y2="340" stroke={stroke} strokeWidth="1.5" opacity="0.4" />
      {/* Bottom disc */}
      <ellipse cx="210" cy="320" rx="120" ry="20" fill={vAccent(v)} opacity="0.4" />
      <rect x="90" y="240" width="240" height="80" rx="22" fill={`url(#stack-${v.key})`} />
      <ellipse cx="210" cy="240" rx="120" ry="20" fill="rgba(255,255,255,0.4)" />
      {/* Top disc (stacked) */}
      <rect x="90" y="160" width="240" height="80" rx="22" fill={vAccent(v)} opacity="0.85" />
      <ellipse cx="210" cy="160" rx="120" ry="20" fill="rgba(255,255,255,0.4)" />
      {/* Stem through both discs */}
      <rect x="200" y="130" width="20" height="220" fill={stroke} opacity="0.9" />
      <circle cx="210" cy="130" r="10" fill={stroke} />
      {/* Dimension lines: 2.5 cm (single) on right */}
      <line x1="350" y1="240" x2="350" y2="320" stroke={stroke} strokeWidth="1.5" />
      <line x1="345" y1="240" x2="355" y2="240" stroke={stroke} strokeWidth="1.5" />
      <line x1="345" y1="320" x2="355" y2="320" stroke={stroke} strokeWidth="1.5" />
      <text x="360" y="284" fontFamily="var(--font-mono)" fontSize="12" fill={stroke}>2.5 cm</text>
      {/* Dimension lines: 5 cm (stacked) on left */}
      <line x1="60" y1="160" x2="60" y2="320" stroke={stroke} strokeWidth="1.5" />
      <line x1="55" y1="160" x2="65" y2="160" stroke={stroke} strokeWidth="1.5" />
      <line x1="55" y1="320" x2="65" y2="320" stroke={stroke} strokeWidth="1.5" />
      <text x="20" y="244" fontFamily="var(--font-mono)" fontSize="12" fill={stroke}>5 cm</text>
      {/* Floor caption */}
      <text x="210" y="368" fontFamily="var(--font-mono)" fontSize="11" fill={stroke} opacity="0.7" textAnchor="middle">
        single · stacked
      </text>
    </svg>
  );
}

export function StemFit({ v }: { v: Variant }) {
  const [exploded, setExploded] = React.useState(false);

  return (
    <section
      className="og-pad-section"
      style={{
        padding: '120px 56px',
        background: '#fff',
        color: 'var(--fg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="og-two-col"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >
        {/* RIGHT (desktop): copy — placed second via order so the 3D model sits left */}
        <div style={{ order: 2 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: vAccent(v),
              transition: 'color 420ms var(--ease-out)',
            }}
          >
            Made to stack
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(32px, 3.8vw, 48px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '10px 0 22px',
            }}
          >
            Stackable protection.<br />
            <em style={{ fontStyle: 'normal', color: vAccent(v) }}>Custom height.</em>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
              margin: 0,
              maxWidth: 460,
            }}
          >
            Chairs and wheels come in all shapes and sizes, so we made Orbit fully customizable. Split them in half to adjust for wheel height, base clearance, or different floor types like carpet and hardwood.
          </p>
        </div>

        {/* LEFT (desktop): 3D interactive model — order 1 places it on the left */}
        <div className="og-stack-viewer" style={{ order: 1, position: 'relative', height: 420, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ position: 'absolute', inset: -40, transform: exploded ? 'scale(0.8)' : 'scale(1)', transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <Product3DViewer topColor={v.hex} bottomColor={v.hex} exploded={exploded} cameraPosition={[104.74, -96.92, 138.54]} />
          </div>
          
          <div style={{ position: 'absolute', bottom: -40, zIndex: 20 }}>
            <button
              onClick={() => setExploded(!exploded)}
              style={{
                background: '#fff',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                padding: '10px 20px',
                borderRadius: 999,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = vAccent(v);
                e.currentTarget.style.color = vAccent(v);
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--fg)';
              }}
            >
              {exploded ? 'Attach pieces' : 'Separate pieces'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
function KStat({ value, small }: { value: string; small: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 800,
          fontSize: 28,
          letterSpacing: '-0.02em',
          color: '#fff',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'rgba(255,255,255,0.55)',
          marginTop: 4,
        }}
      >
        {small}
      </div>
    </div>
  );
}

function useCountUp(target: number, duration: number, active: boolean): number {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOut(progress) * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

export function Kickstarter({ v }: { v: Variant }) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [barWidth, setBarWidth] = React.useState(0);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    const targetWidth = Math.min(SITE_CONFIG.kickstarterFunded, 100);
    const t = setTimeout(() => {
      setBarWidth(targetWidth);
      if (SITE_CONFIG.kickstarterFunded >= 100) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#05CE78', '#5A74FF', '#FF90FE']
        });
      }
    }, 300);
    return () => clearTimeout(t);
  }, [visible]);

  const isFunded = SITE_CONFIG.kickstarterFunded >= 100;

  const raised = useCountUp(Math.round(SITE_CONFIG.kickstarterRaised / 1000), 1800, visible);
  const backers = useCountUp(SITE_CONFIG.kickstarterBackers, 1800, visible);
  const days = useCountUp(SITE_CONFIG.kickstarterDaysLeft, 1200, visible);
  const funded = useCountUp(SITE_CONFIG.kickstarterFunded, 2000, visible);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '100px 56px',
        background: '#15171B',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="og-two-col"
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        {/* Big "On Kickstarter" wordmark */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            alignItems: 'flex-start',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#05CE78',
              color: '#0A0A0A',
              padding: '8px 14px 8px 12px',
              borderRadius: 999,
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: '0.02em',
            }}
          >
            <LucideIcons.Rocket size={14} strokeWidth={2.5} />
            Live on Kickstarter
          </span>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(48px, 5.5vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            <span style={{ color: '#05CE78' }}>{funded}%</span><br />
            <span>funded.</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.5,
              maxWidth: 320,
            }}
          >
            Backed by {SITE_CONFIG.kickstarterBackers.toLocaleString()} chair-owners (and counting). Ships out this fall.
          </div>
        </div>

        {/* Stats grid + CTA */}
        <div
          style={{
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 24,
            padding: 32,
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
            <KStat value={`$${raised}k`} small="raised so far" />
            <KStat value={backers >= 1000 ? backers.toLocaleString() : String(backers)} small="backers" />
            <KStat value={String(days)} small="days to go" />
          </div>
          <div
            style={{
              height: 12,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: `${barWidth}%`,
                height: '100%',
                background: isFunded ? 'linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)' : '#05CE78',
                backgroundSize: '200% 100%',
                borderRadius: 999,
                transition: 'width 2s cubic-bezier(.16,.84,.32,1)',
                animation: isFunded ? 'ogGoldShine 2s linear infinite' : 'none',
                boxShadow: isFunded ? '0 0 10px rgba(251, 191, 36, 0.5)' : 'none',
              }}
            />
            {isFunded && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  animation: 'ogShineSweep 2s ease-in-out infinite',
                }}
              />
            )}
          </div>
          <style>{`
            @keyframes ogGoldShine {
              0% { background-position: 100% 0; }
              100% { background-position: -100% 0; }
            }
            @keyframes ogShineSweep {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
          `}</style>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'rgba(255,255,255,0.75)',
                maxWidth: 380,
              }}
            >
              Early-bird perks: 3 stretch goals unlocked.
            </div>
            <a
              href={SITE_CONFIG.kickstarterUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#05CE78',
                color: '#0A0A0A',
                border: 'none',
                padding: '14px 20px 14px 22px',
                borderRadius: 999,
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              Back on Kickstarter
              <LucideIcons.ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
export function MixAndMatchBanner() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PRODUCT_VARIANTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const topIndex = index;
  const bottomIndex = (index + 3) % PRODUCT_VARIANTS.length;

  const topVariant = PRODUCT_VARIANTS[topIndex];
  const bottomVariant = PRODUCT_VARIANTS[bottomIndex];

  function getMixName(topKey: string, bottomKey: string): string {
    if (topKey === bottomKey) return PRODUCT_VARIANTS.find(v => v.key === topKey)?.name || '';
    const canonical = [topKey, bottomKey].sort().join('|');
    return (UNIQUE_MIX_NAMES as Record<string, string>)[canonical] || 'Cosmic Blend';
  }

  const mixName = getMixName(topVariant.key, bottomVariant.key);

  return (
    <section
      style={{
        padding: '120px 0',
        background: `linear-gradient(135deg, ${topVariant.hex}25 0%, ${bottomVariant.hex}25 100%)`,
        transition: 'background 800ms var(--ease-out)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 56px' }}>
        
        {/* LEFT TEXT */}
        <div style={{ flex: 1, textAlign: 'left' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--fg-3)',
            }}
          >
            Endless Possibilities
          </div>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4vw, 56px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              margin: '10px 0 0',
              color: 'var(--fg)',
              maxWidth: 400,
            }}
          >
            Mix and Match Any Orbit
          </h2>
        </div>

        {/* RIGHT 3D & LABELS */}
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <div style={{ width: 460, height: 380, position: 'relative' }}>
            {/* Top Label Pointer */}
            <div style={{ position: 'absolute', top: '35%', left: '-5%', display: 'flex', alignItems: 'center', gap: 10, zIndex: 20 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', color: 'var(--fg-2)', fontWeight: 600 }}>Color</span>
              <div style={{ width: 50, height: 1, background: 'var(--fg-3)' }} />
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--fg-3)' }} />
            </div>

            {/* Bottom Label Pointer */}
            <div style={{ position: 'absolute', bottom: '35%', right: '-5%', display: 'flex', alignItems: 'center', gap: 10, zIndex: 20 }}>
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--fg-3)' }} />
              <div style={{ width: 50, height: 1, background: 'var(--fg-3)' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', color: 'var(--fg-2)', fontWeight: 600 }}>Color</span>
            </div>

            <Product3DViewer
              topColor={topVariant.hex}
              bottomColor={bottomVariant.hex}
              exploded={false}
              float={false}
              spin={false}
              autoRotate={false}
              interactive={false}
              cameraPosition={[0, 0, 150]}
            />
          </div>

          <div style={{ zIndex: 10, textAlign: 'center', marginTop: -20 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 24, fontWeight: 700, color: 'var(--fg)', marginBottom: 8, transition: 'color 800ms ease' }}>
              {mixName}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-2)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Top: {topVariant.name} &nbsp;·&nbsp; Bottom: {bottomVariant.name}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────
function FootCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div style={{ fontWeight: 700, color: 'var(--fg)', marginBottom: 8 }}>{title}</div>
      {items.map((x) => (
        <div key={x.label} style={{ lineHeight: 1.8 }}>
          <a href={x.href} style={{ color: 'inherit', textDecoration: 'none' }}>{x.label}</a>
        </div>
      ))}
    </div>
  );
}

export function FooterCta({ v }: { v: Variant }) {
  return (
    <>
      <section
        style={{
          background: 'var(--og-blue)',
          color: 'white',
          padding: '120px 56px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <Image
          src="/assets/orbit-rings.svg"
          alt=""
          width={720}
          height={720}
          style={{
            position: 'absolute',
            right: -160,
            top: -160,
            width: 720,
            height: 720,
            opacity: 0.16,
            filter: 'brightness(0) invert(1)',
          }}
        />
        <Image
          src="/assets/orbit-rings.svg"
          alt=""
          width={560}
          height={560}
          style={{
            position: 'absolute',
            left: -180,
            bottom: -180,
            width: 560,
            height: 560,
            opacity: 0.12,
            filter: 'brightness(0) invert(1)',
          }}
        />
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            maxWidth: 1180,
            margin: '0 auto',
          }}
        >
          <Image
            src="/assets/orbit-wordmark-white.png"
            alt="Orbit"
            width={640}
            height={96}
            style={{
              height: 96,
              width: 'auto',
              maxWidth: 'min(640px, 80vw)',
            }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 'clamp(28px, 2.8vw, 40px)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              margin: 0,
              color: 'rgba(255,255,255,0.92)',
            }}
          >
            Making safety simple.
          </h2>
          <div
            style={{
              display: 'flex',
              gap: 12,
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: 4,
            }}
          >
            <NotifyForm />
          </div>
        </div>
      </section>

      <footer
        style={{
          padding: '40px 56px 56px',
          borderTop: '1px solid var(--border)',
          background: '#fff',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Top row: OrbitGuard parent lockup, masked to brand blue */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
            <div
              style={{
                width: 140,
                height: 26,
                background: '#5A74FF',
                WebkitMaskImage: "url('/assets/svg/OrbitGuard.svg')",
                maskImage: "url('/assets/svg/OrbitGuard.svg')",
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'left center',
                maskPosition: 'left center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
              }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 24,
              color: 'var(--fg-2)',
              fontSize: 14,
            }}
          >
            <FootCol title="Shop" items={[{ label: 'All colors', href: '/shop' }, { label: '5-pack', href: '/shop' }]} />
            <FootCol title="Learn" items={[{ label: 'How it works', href: '/#how' }, { label: 'FAQ', href: '/faq' }]} />
            <FootCol title="Company" items={[{ label: 'About', href: '/about' }, { label: 'Press', href: '/press' }, { label: 'Admin', href: '/admin' }]} />
            <FootCol title="Help" items={[{ label: 'Contact', href: '/contact' }]} />
          </div>
          <div
            style={{
              marginTop: 32,
              paddingTop: 20,
              borderTop: '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>© 2026 OrbitGuard, Inc.</div>
            <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
              Made in Atlanta
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
