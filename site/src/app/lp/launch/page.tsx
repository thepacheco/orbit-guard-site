'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../../components/Header';
import { PRODUCT_VARIANTS } from '../../../components/data';
import type { Variant } from '../../../components/types';
import dynamic from 'next/dynamic';

const Product3DViewer = dynamic(() => import('../../../components/Product3DViewer'), { ssr: false });

const onyxVariant = PRODUCT_VARIANTS.find((v: Variant) => v.key === 'onyx')!;

const PALETTE = [
  { hex: '#4361EE', name: 'Blueberry' },
  { hex: '#06D6A0', name: 'Clover' },
  { hex: '#FFB4A2', name: 'Coral' },
  { hex: '#A292FF', name: 'Lavender' },
  { hex: '#E7BC91', name: 'Fawn' },
  { hex: '#FF3131', name: 'Rooster' },
  { hex: '#FF90FE', name: 'Flamingo' },
  { hex: '#9C6644', name: 'Bear' },
  { hex: '#950000', name: 'Pomegranate' },
  { hex: '#212529', name: 'Onyx' },
  { hex: '#F4F4F0', name: 'Polar' },
];

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function isLight(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.7;
}

function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function useCountUp(
  target: number,
  duration: number,
  active: boolean,
  onCross?: (threshold: number) => void,
): number {
  const [count, setCount] = useState(0);
  const crossedRef = useRef(false);

  useEffect(() => {
    if (!active) return;
    crossedRef.current = false;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOut(progress) * target);
      setCount(value);
      if (onCross && !crossedRef.current && value >= 100) {
        crossedRef.current = true;
        onCross(100);
      }
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration, onCross]);

  return count;
}

import confetti from 'canvas-confetti';

let confettiInterval: ReturnType<typeof setInterval> | null = null;

function startConfettiWaterfall(paletteColors: string[]) {
  if (confettiInterval) return;
  confettiInterval = setInterval(() => {
    confetti({
      particleCount: 2,
      angle: 270,
      spread: 90,
      startVelocity: 10,
      gravity: 0.6,
      origin: { x: Math.random(), y: -0.1 },
      colors: paletteColors,
      disableForReducedMotion: true,
      zIndex: 999,
      ticks: 300,
    });
  }, 150);
}

  export default function LaunchLandingPage() {
    useEffect(() => {
      return () => {
        if (confettiInterval) {
          clearInterval(confettiInterval);
          confettiInterval = null;
        }
      };
    }, []);

    const [accentHex, setAccentHex] = useState('#4361EE');
  const [barWidth, setBarWidth] = useState(0);
  const [barColor, setBarColor] = useState(accentHex);
  const [confettiFired, setConfettiFired] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  const textColor = isLight(accentHex) ? '#1A1B1F' : '#ffffff';

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setBarWidth(85), 300);
    return () => clearTimeout(t);
  }, [visible]);

  // Reset confetti flag when accent color changes so it fires once per session
  const handleCross = useCallback(() => {
    if (!confettiFired) {
      setConfettiFired(true);
      setBarColor('#FFD700');
      startConfettiWaterfall(PALETTE.map((p) => p.hex));
    }
  }, [confettiFired]);

  const funded = useCountUp(342, 2000, visible, handleCross);
  const raised = useCountUp(48, 1800, visible);
  const backers = useCountUp(2140, 1800, visible);
  const days = useCountUp(14, 1200, visible);

  const formatBackers = (n: number) => {
    if (n < 1000) return String(n);
    const thousands = Math.floor(n / 1000);
    const remainder = String(n % 1000).padStart(3, '0');
    return `${thousands},${remainder}`;
  };

  const handleColorChange = (hex: string) => {
    setAccentHex(hex);
    // Only reset bar color if confetti hasn't fired yet (gold lock still pending)
    if (!confettiFired) {
      setBarColor(hex);
    }
  };

  const activeVariant = PRODUCT_VARIANTS.find(v => v.hex === accentHex) || PRODUCT_VARIANTS[0];
  const matchTextColor = activeVariant.dark ? '#fff' : accentHex;

  return (
    <div
      style={{
        minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
        background: '#15171B',
        color: '#fff',
        fontFamily: 'var(--font-ui)',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {/* Floating background blobs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: accentHex,
            opacity: 0.08,
            filter: 'blur(60px)',
            animation: 'ogFloat1 20s ease-in-out infinite',
            transition: 'background 600ms ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            right: '8%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: accentHex,
            opacity: 0.08,
            filter: 'blur(50px)',
            animation: 'ogFloat2 30s ease-in-out infinite',
            transition: 'background 600ms ease',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '15%',
            left: '40%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: accentHex,
            opacity: 0.08,
            filter: 'blur(40px)',
            animation: 'ogFloat3 25s ease-in-out infinite',
            transition: 'background 600ms ease',
          }}
        />
      </div>

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Header dark={true} variant={onyxVariant} />
        


        {/* Hero — everything in one viewport */}
        <section
          ref={sectionRef}
          className="og-lp-grid"
          style={{
            padding: '120px 56px 80px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            alignItems: 'center',
            gap: 48,
            minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
            position: 'relative',
          }}
        >
          {/* LEFT: Copy & CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 600 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#FFD700', fontWeight: 700, display: 'inline-block', background: 'rgba(255,215,0,0.1)', padding: '6px 16px', borderRadius: 999, marginBottom: 24 }}>
                Now live on Kickstarter
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.0,
                  margin: '0 0 16px',
                }}
              >
                One chair. 11 colors.
              </h1>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 'clamp(28px, 4vw, 42px)',
                  letterSpacing: '-0.02em',
                  color: matchTextColor,
                  transition: 'color 400ms ease',
                }}
              >
                Match any setup.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 32, marginTop: 10, flexWrap: 'wrap' }}>
              {/* Animated pulse ring around stats */}
              <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `3px solid ${barColor}`, opacity: 0.3, animation: 'ogPulseRing 2s ease-out infinite' }} />
                <div style={{ position: 'absolute', inset: 10, borderRadius: '50%', border: `2px solid ${barColor}`, opacity: 0.15, animation: 'ogPulseRing 2s ease-out infinite 0.5s' }} />
                <style>{`
                  @keyframes ogPulseRing {
                    0% { transform: scale(0.8); opacity: 0.4; }
                    100% { transform: scale(1.4); opacity: 0; }
                  }
                `}</style>
                <div style={{ textAlign: 'center', zIndex: 10 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 900, fontSize: 46, letterSpacing: '-0.03em', lineHeight: 0.95, color: '#05CE78' }}>
                    {funded}%
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 4 }}>
                    funded
                  </div>
                </div>
              </div>

              {/* CTA & Mini Stats */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
                <a
                  href="https://kickstarter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: accentHex, color: textColor, borderRadius: 999, padding: '20px 48px',
                    fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, textDecoration: 'none',
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    boxShadow: `0 14px 40px ${accentHex}55`,
                    transition: 'background 400ms ease, box-shadow 400ms ease, color 200ms ease',
                  }}
                >
                  Back us on Kickstarter →
                </a>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em' }}>
                  <span style={{ color: '#05CE78' }}>${raised}k raised</span> · <span style={{ color: '#05CE78' }}>{formatBackers(backers)} backers</span> · <span style={{ color: '#05CE78' }}>{days} days left</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: 3D Orbit & Palette */}
          <div style={{ position: 'relative', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 450, height: 450, position: 'relative', zIndex: 10, animation: 'ogFarToClose 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
              <Product3DViewer topColor={accentHex} bottomColor={accentHex} exploded={false} />
            </div>

            {/* Vertical palette picker */}
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                padding: '16px 12px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.08)',
                zIndex: 20,
              }}
            >
              {PALETTE.map((p) => {
                const isSelected = p.hex === accentHex;
                return (
                  <button
                    key={p.hex}
                    onClick={() => handleColorChange(p.hex)}
                    title={p.name}
                    aria-label={`Select ${p.name}`}
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: p.hex,
                      border: 'none',
                      cursor: 'pointer',
                      flexShrink: 0,
                      boxShadow: isSelected
                        ? `0 0 0 3px #15171B, 0 0 0 5px ${p.hex}`
                        : '0 2px 6px rgba(0,0,0,0.4)',
                      transition: 'box-shadow 200ms ease, transform 150ms ease',
                      transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
