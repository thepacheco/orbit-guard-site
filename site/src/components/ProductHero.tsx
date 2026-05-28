'use client';

import React from 'react';
import { DynIcon } from './primitives';
import type { Variant, FloatChip } from './types';

function vAccent(v: Variant): string {
  if (v.dark) return v.ring;
  if (v.key === 'polar') return v.ring;
  return v.hex;
}

function PuckView({ v }: { v: Variant }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 340,
        height: 340,
        borderRadius: '50%',
        background: v.hex,
        boxShadow: `inset 0 0 0 38px rgba(255,255,255,0.32), 0 30px 60px rgba(0,0,0,0.18)`,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '50%',
          width: 92,
          height: 92,
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
          background: v.bg,
          boxShadow: 'inset 0 0 0 6px rgba(0,0,0,0.06)',
        }}
      />
    </div>
  );
}

function ChairView({ v }: { v: Variant }) {
  const stroke = v.dark ? 'rgba(255,255,255,0.95)' : '#1A1B1F';
  const soft = v.dark ? 'rgba(255,255,255,0.06)' : '#FFFFFF';
  const sw = 4;
  const wheels = [
    { cx: 70, cy: 320 },
    { cx: 130, cy: 332 },
    { cx: 195, cy: 338 },
    { cx: 260, cy: 332 },
    { cx: 320, cy: 320 },
  ];
  return (
    <svg viewBox="0 0 400 400" width="380" height="380">
      {/* Backrest */}
      <path
        d="M 130 60 Q 130 30 160 30 L 230 30 Q 260 30 260 60 L 260 175 Q 260 200 235 200 L 155 200 Q 130 200 130 175 Z"
        fill={soft}
        stroke={stroke}
        strokeWidth={sw}
        strokeLinejoin="round"
      />
      {/* Cushion seam on back */}
      <line
        x1="195" y1="50" x2="195" y2="180"
        stroke={stroke} strokeWidth="1.5" strokeDasharray="3 6" opacity="0.5"
      />

      {/* Arms */}
      <path
        d="M 120 175 L 90 175 Q 80 175 80 185 L 80 215 Q 80 225 90 225 L 120 225"
        fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M 270 175 L 300 175 Q 310 175 310 185 L 310 215 Q 310 225 300 225 L 270 225"
        fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
      />

      {/* Seat */}
      <path
        d="M 95 200 L 295 200 Q 310 200 308 215 L 300 240 Q 298 250 285 250 L 105 250 Q 92 250 90 240 L 82 215 Q 80 200 95 200 Z"
        fill={v.hex} stroke={stroke} strokeWidth={sw} strokeLinejoin="round"
      />

      {/* Pneumatic post */}
      <rect x="185" y="250" width="20" height="50" fill={soft} stroke={stroke} strokeWidth={sw} />

      {/* Five-arm base */}
      {wheels.map((w, i) => (
        <line key={`leg-${i}`} x1="195" y1="300" x2={w.cx} y2={w.cy - 8}
          stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      ))}
      {/* Hub at base */}
      <circle cx="195" cy="300" r="14" fill={stroke} />

      {/* Wheels with guard rings */}
      {wheels.map((w, i) => (
        <g key={`wheel-${i}`}>
          <circle cx={w.cx} cy={w.cy} r="22" fill={v.hex} stroke={stroke} strokeWidth={sw} />
          <circle cx={w.cx} cy={w.cy} r="11" fill={soft} stroke={stroke} strokeWidth="2" />
          <circle cx={w.cx} cy={w.cy} r="3" fill={stroke} />
        </g>
      ))}

      {/* Floor */}
      <line x1="30" y1="360" x2="370" y2="360" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      {/* Floor highlight */}
      <ellipse cx="200" cy="362" rx="160" ry="4"
        fill={v.dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'} />

      {/* Callout */}
      <line x1="320" y1="308" x2="360" y2="270" stroke={stroke} strokeWidth="1.5" />
      <circle cx="362" cy="268" r="3" fill={stroke} />
      <text x="310" y="260" fontFamily="var(--font-mono)" fontSize="11" fill={stroke} textAnchor="end">
        All 5 casters wrapped
      </text>
    </svg>
  );
}

function RoomView({ v }: { v: Variant }) {
  const stroke = v.dark ? 'rgba(255,255,255,0.92)' : '#1A1B1F';
  const soft = v.dark ? 'rgba(255,255,255,0.05)' : '#FFFFFF';
  const floor = v.dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const sw = 3;
  return (
    <svg viewBox="0 0 420 380" width="420" height="380">
      {/* Floor */}
      <rect x="0" y="275" width="420" height="105" fill={floor} />
      <line x1="0" y1="275" x2="420" y2="275" stroke={stroke} strokeWidth="1.5" opacity="0.5" />

      {/* Window */}
      <rect x="30" y="50" width="130" height="150" rx="6" fill={soft} stroke={stroke} strokeWidth={sw} />
      <line x1="95" y1="50" x2="95" y2="200" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
      <line x1="30" y1="125" x2="160" y2="125" stroke={stroke} strokeWidth="1.5" opacity="0.5" />

      {/* Plant */}
      <path d="M 200 270 L 215 270 L 218 290 L 197 290 Z" fill={stroke} />
      <path d="M 207 270 Q 195 250 200 230 Q 205 215 215 220" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />
      <path d="M 207 270 Q 220 245 230 240" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />
      <path d="M 207 270 Q 198 255 188 252" fill="none" stroke="#06D6A0" strokeWidth="3" strokeLinecap="round" />

      {/* Desk */}
      <rect x="250" y="170" width="160" height="14" rx="4" fill={stroke} />
      <line x1="260" y1="184" x2="260" y2="275" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1="400" y1="184" x2="400" y2="275" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* Monitor */}
      <rect x="295" y="125" width="90" height="50" rx="4" fill={soft} stroke={stroke} strokeWidth={sw} />
      <line x1="340" y1="175" x2="340" y2="170" stroke={stroke} strokeWidth={sw} />
      <line x1="325" y1="170" x2="355" y2="170" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />

      {/* Chair */}
      <path d="M 215 160 Q 215 130 230 130 L 252 130 Q 252 200 252 220"
        fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 215 215 L 270 215 Q 280 215 280 225 L 280 235 Q 280 245 270 245 L 215 245 Q 205 245 205 235 L 205 225 Q 205 215 215 215 Z"
        fill={v.hex} stroke={stroke} strokeWidth={sw} />
      <rect x="237" y="245" width="12" height="22" fill={soft} stroke={stroke} strokeWidth={sw} />
      {/* Chair base legs */}
      <line x1="243" y1="267" x2="205" y2="282" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1="243" y1="267" x2="243" y2="282" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      <line x1="243" y1="267" x2="281" y2="282" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />
      {/* Three casters */}
      {[205, 243, 281].map(cx => (
        <g key={cx}>
          <circle cx={cx} cy={290} r="12" fill={v.hex} stroke={stroke} strokeWidth={sw} />
          <circle cx={cx} cy={290} r="4" fill={soft} />
        </g>
      ))}

      {/* Cat */}
      <ellipse cx="125" cy="310" rx="40" ry="22" fill={soft} stroke={stroke} strokeWidth={sw} />
      <circle cx="95" cy="300" r="14" fill={soft} stroke={stroke} strokeWidth={sw} />
      <path d="M 85 290 L 88 282 L 94 290" fill={stroke} />
      <path d="M 102 290 L 105 282 L 110 290" fill={stroke} />
      <circle cx="92" cy="301" r="1.5" fill={stroke} />
      <circle cx="100" cy="301" r="1.5" fill={stroke} />
      <path d="M 96 305 q 0 2 -2 2 m 0 0 q -2 0 -2 -2" fill="none" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      {/* Tail */}
      <path d="M 162 310 Q 180 305 195 295" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />

      {/* Caption */}
      <text x="210" y="365" fontFamily="var(--font-mono)" fontSize="11" fill={stroke} textAnchor="middle" opacity="0.7">
        Tails, cables and toes — all safe.
      </text>
    </svg>
  );
}

function FeatureChip({ v, chip, style }: { v: Variant; chip: FloatChip; style?: React.CSSProperties }) {
  const dark = v.dark;
  return (
    <div
      style={{
        ...style,
        background: dark ? 'rgba(20,22,28,0.88)' : 'white',
        color: dark ? 'white' : 'var(--fg)',
        borderRadius: 999,
        padding: '10px 16px 10px 12px',
        boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        fontWeight: 600,
        backdropFilter: 'blur(8px)',
        whiteSpace: 'nowrap',
      }}
    >
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: v.key === 'polar' ? v.ring : v.hex,
          color: 'white',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        <DynIcon name={chip.icon} size={14} strokeWidth={2} />
      </span>
      <span>{chip.text}</span>
    </div>
  );
}

interface ProductHeroProps {
  v: Variant;
  view: string;
}

export default function ProductHero({ v, view = 'product' }: ProductHeroProps) {
  return (
    <div
      style={{
        position: 'relative',
        height: 'min(660px, 78vh)',
        display: 'grid',
        placeItems: 'center',
      }}
    >
      {/* Arched backdrop */}
      <svg
        viewBox="0 0 480 660"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`arch-${v.key}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={v.dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)'} />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </linearGradient>
        </defs>
        <path
          d="M 80 620 L 80 260 A 160 160 0 0 1 400 260 L 400 620 Z"
          fill={`url(#arch-${v.key})`}
        />
      </svg>

      {/* Orbital ring */}
      {view === 'product' && (
        <svg
          viewBox="0 0 480 660"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            animation: 'ogSpin 28s linear infinite',
            opacity: 0.45,
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <ellipse
            cx="240" cy="380" rx="220" ry="58"
            fill="none"
            stroke={v.dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.10)'}
            strokeWidth="1"
            strokeDasharray="2 4"
          />
        </svg>
      )}

      {/* The chosen view */}
      <div style={{ position: 'relative', transition: 'opacity 320ms var(--ease-out)' }}>
        {view === 'product' && <PuckView v={v} />}
        {view === 'chair' && <ChairView v={v} />}
        {view === 'room' && <RoomView v={v} />}
      </div>

      {/* Floating feature chips — only in product view */}
      {view === 'product' && (
        <>
          <FeatureChip v={v} chip={v.floatChips[0]} style={{ position: 'absolute', left: '4%', bottom: '26%' }} />
          <FeatureChip v={v} chip={v.floatChips[1]} style={{ position: 'absolute', right: '2%', top: '22%' }} />
          <FeatureChip v={v} chip={v.floatChips[2]} style={{ position: 'absolute', left: '12%', top: '16%' }} />
        </>
      )}
    </div>
  );
}
