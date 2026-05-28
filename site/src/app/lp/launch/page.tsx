'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

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

function spawnConfetti(paletteColors: string[]) {
  const container = document.createElement('div');
  container.style.cssText =
    'position:fixed;inset:0;pointer-events:none;z-index:999;overflow:hidden;';
  document.body.appendChild(container);

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const particles: { el: HTMLDivElement; vx: number; vy: number; gravity: number }[] = [];

  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const color = paletteColors[i % paletteColors.length];
    el.style.cssText = `
      position:absolute;
      width:8px;height:8px;
      background:${color};
      left:${centerX}px;top:${centerY}px;
      border-radius:2px;
      opacity:1;
    `;
    container.appendChild(el);
    const angle = (Math.PI * 2 * i) / 60 + (Math.random() - 0.5) * 0.5;
    const speed = 4 + Math.random() * 8;
    particles.push({
      el,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      gravity: 0.15 + Math.random() * 0.1,
    });
  }

  const startTime = performance.now();
  const duration = 2000;

  function animateParticles(now: number) {
    const elapsed = now - startTime;
    const progress = elapsed / duration;

    if (progress >= 1) {
      document.body.removeChild(container);
      return;
    }

    particles.forEach((p) => {
      p.vy += p.gravity;
      const x = centerX + p.vx * elapsed * 0.06;
      const y = centerY + p.vy * elapsed * 0.06;
      p.el.style.left = `${x}px`;
      p.el.style.top = `${y}px`;
      p.el.style.opacity = String(Math.max(0, 1 - progress * 1.5));
    });

    requestAnimationFrame(animateParticles);
  }

  requestAnimationFrame(animateParticles);

  setTimeout(() => {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }, 3000);
}

export default function LaunchLandingPage() {
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
      spawnConfetti(PALETTE.map((p) => p.hex));
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
    setConfettiFired(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
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
        {/* Top: Orbit icon mark */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 24px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/orbit-icon-mark.png"
            alt="Orbit"
            width={48}
            height={48}
            style={{ width: 48, height: 48 }}
          />
        </div>

        {/* Hero */}
        <section
          style={{
            padding: '64px 56px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 20,
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(56px, 8vw, 96px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: 0,
              maxWidth: 900,
            }}
          >
            11 colors. One chair.
          </h1>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              letterSpacing: '-0.02em',
              color: accentHex,
              transition: 'color 400ms ease',
            }}
          >
            Zero excuses.
          </div>

          {/* Palette picker */}
          <div
            style={{
              display: 'flex',
              gap: 10,
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '18px 24px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 999,
              border: '1px solid rgba(255,255,255,0.08)',
              marginTop: 8,
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
        </section>

        {/* Kickstarter stats */}
        <section
          ref={sectionRef}
          style={{
            padding: '32px 56px 40px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 24,
              padding: '32px 40px',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
              textAlign: 'center',
              maxWidth: 540,
              width: '100%',
            }}
          >
            {/* 342% funded heading */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  color: '#05CE78',
                }}
              >
                {funded}%
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 20,
                  color: 'rgba(255,255,255,0.6)',
                  marginTop: 4,
                }}
              >
                funded
              </div>
            </div>

            {/* Progress bar */}
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
                  width: `${barWidth}%`,
                  height: '100%',
                  background: barColor,
                  borderRadius: 999,
                  transition: 'width 2s cubic-bezier(.16,.84,.32,1), background 400ms ease',
                }}
              />
            </div>

            {/* Stats row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: 16,
                width: '100%',
              }}
            >
              {[
                { value: `$${raised}k`, label: 'raised' },
                { value: formatBackers(backers), label: 'backers' },
                { value: String(days), label: 'days left' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 800,
                      fontSize: 24,
                      letterSpacing: '-0.02em',
                      color: '#fff',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'rgba(255,255,255,0.5)',
                      marginTop: 4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            padding: '8px 56px 100px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <a
            href="https://kickstarter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: accentHex,
              color: textColor,
              borderRadius: 999,
              padding: '20px 48px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 18,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              boxShadow: `0 14px 40px ${accentHex}55`,
              transition: 'background 400ms ease, box-shadow 400ms ease, color 200ms ease',
            }}
          >
            Back us on Kickstarter →
          </a>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.08em',
            }}
          >
            342% funded · 2,140 backers · 14 days left
          </div>
        </section>
      </div>
    </div>
  );
}
