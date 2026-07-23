'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as LucideIcons from 'lucide-react';
import { DynIcon } from './primitives';
import type { Variant, FloatChip } from './types';

/* ── Usage photos ───────────────────────────────────────────────────
   Drop real image paths into these arrays (e.g. '/assets/photos/chair-1.jpg').
   Leave an array empty to show a labeled placeholder frame instead. */
const USAGE_PHOTOS: Record<string, string[]> = {
  chair: [
    '/assets/HomePage_OnChair_Photos/OnChair1.png',
    '/assets/HomePage_OnChair_Photos/OnChair2.png',
    '/assets/HomePage_OnChair_Photos/OnChair3.png'
  ],
  room: [
    '/assets/HomePage_InRoom_Photos/InRoom1.png',
    '/assets/HomePage_InRoom_Photos/InRoom2.png',
    '/assets/HomePage_InRoom_Photos/InRoom3.png'
  ],
};
const PLACEHOLDER_COUNT = 3;

const Product3DViewer = dynamic(() => import('./Product3DViewer'), { ssr: false });

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
      }}
    >
      <div style={{ position: 'absolute', inset: -40, animation: 'ogScaleUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <Product3DViewer topColor={v.hex} bottomColor={v.hex} exploded={false} cameraPosition={[104.74, -96.92, 138.54]} />
      </div>
    </div>
  );
}

/* Usage-photo slider with manual prev/next arrows. Shows real images when
   provided in USAGE_PHOTOS, otherwise labeled placeholder frames. */
function PhotoSlider({ v, context, label }: { v: Variant; context: 'chair' | 'room'; label: string }) {
  const images = USAGE_PHOTOS[context] || [];
  const count = images.length > 0 ? images.length : PLACEHOLDER_COUNT;
  const [i, setI] = useState(0);
  const idx = Math.min(i, count - 1);
  const prev = () => setI((x) => (x - 1 + count) % count);
  const next = () => setI((x) => (x + 1) % count);

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    background: v.dark ? 'rgba(20,22,28,0.85)' : 'rgba(255,255,255,0.92)',
    color: v.dark ? '#fff' : 'var(--fg)',
    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
    display: 'grid',
    placeItems: 'center',
    zIndex: 5,
  };

  return (
    <div style={{ width: 400, maxWidth: '84vw' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4 / 3',
          borderRadius: 20,
          overflow: 'hidden',
          background: v.dark
            ? 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))'
            : 'linear-gradient(135deg, #f3f5f7 0%, #e8edf1 100%)',
          border: v.dark ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(0,0,0,0.06)',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {images.length > 0 ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={images[idx]}
            alt={`${label} — photo ${idx + 1}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{ textAlign: 'center', color: v.dark ? 'rgba(255,255,255,0.7)' : 'var(--fg-3)' }}>
            <DynIcon name={context === 'chair' ? 'Armchair' : 'Home'} size={48} strokeWidth={1.5} />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 12 }}>
              {label} photo {idx + 1}
            </div>
          </div>
        )}

        {count > 1 && (
          <>
            <button aria-label="Previous photo" onClick={prev} style={{ ...arrowStyle, left: 10 }}>
              <LucideIcons.ChevronLeft size={20} strokeWidth={2.25} />
            </button>
            <button aria-label="Next photo" onClick={next} style={{ ...arrowStyle, right: 10 }}>
              <LucideIcons.ChevronRight size={20} strokeWidth={2.25} />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 14 }}>
          {Array.from({ length: count }).map((_, d) => (
            <span
              key={d}
              style={{
                width: d === idx ? 18 : 7,
                height: 7,
                borderRadius: 999,
                background: d === idx ? vAccent(v) : v.dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.18)',
                transition: 'all 200ms var(--ease-out)',
              }}
            />
          ))}
        </div>
      )}
    </div>
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
        zIndex: 20,
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
      {/* Irregular blob backdrop */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 360,
          height: 360,
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: v.hex,
            opacity: v.dark ? 0.2 : 0.15,
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            animation: 'ogSpin 40s linear infinite alternate',
          }}
        />
      </div>

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
            opacity: 0.25,
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
        {view === 'chair' && <PhotoSlider v={v} context="chair" label="On chair" />}
        {view === 'room' && <PhotoSlider v={v} context="room" label="In room" />}
      </div>

      {/* Floating feature chips — only in product view */}
      {view === 'product' && (
        <>
          <FeatureChip v={v} chip={v.floatChips[0]} style={{ position: 'absolute', left: '4%', bottom: '26%', animation: 'ogChipFloat1 5s ease-in-out infinite' }} />
          <FeatureChip v={v} chip={v.floatChips[1]} style={{ position: 'absolute', right: '2%', top: '22%', animation: 'ogChipFloat2 6.5s ease-in-out infinite' }} />
          <FeatureChip v={v} chip={v.floatChips[2]} style={{ position: 'absolute', left: '12%', top: '16%', animation: 'ogChipFloat3 4.5s ease-in-out infinite' }} />
        </>
      )}
    </div>
  );
}
