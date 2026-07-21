'use client';

import React, { useState } from 'react';
import { DynIcon } from './primitives';
import ProductHero from './ProductHero';
import ColorDropdown from './ColorDropdown';
import { PRODUCT_VARIANTS, PACK_SIZES } from './data';
import type { Variant } from './types';
import * as LucideIcons from 'lucide-react';

export function vAccent(v: Variant): string {
  if (v.dark) return v.ring;
  if (v.key === 'polar') return v.ring;
  return v.hex;
}

function Headline({ v }: { v: Variant }) {
  return (
    <h1
      style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 700,
        fontSize: 'clamp(44px, 4.6vw, 64px)',
        lineHeight: 0.97,
        letterSpacing: '-0.025em',
        margin: 0,
        color: 'inherit',
      }}
    >
      <div>{v.headline.line1}</div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ position: 'relative', zIndex: 1 }}>{v.headline.lasso}</span>
        <svg
          style={{
            position: 'absolute',
            inset: '-10% -6% 0% -6%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
          viewBox="0 0 200 80"
          preserveAspectRatio="none"
          fill="none"
        >
          <ellipse
            cx="100" cy="36" rx="90" ry="30"
            stroke={v.ring}
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(-2 100 40)"
          />
        </svg>
      </div>
      <div>{v.headline.line2}</div>
    </h1>
  );
}

function PackSelector({
  v,
  idx,
  setIdx,
}: {
  v: Variant;
  idx: number;
  setIdx: (i: number) => void;
}) {
  const dark = v.dark;
  const pack = PACK_SIZES[idx];
  return (
    <div>
      <div
        className="og-pack-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.65,
          }}
        >
          Pack · {pack.count} guard{pack.count > 1 ? 's' : ''}
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 22 }}>
          ${pack.price}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          padding: 4,
          gap: 4,
          borderRadius: 14,
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {PACK_SIZES.map((p, i) => {
          const active = i === idx;
          return (
            <button
              key={p.count}
              onClick={() => setIdx(i)}
              style={{
                flex: 1,
                border: 'none',
                cursor: 'pointer',
                padding: '10px 0',
                borderRadius: 10,
                background: active ? vAccent(v) : 'transparent',
                color: active ? '#fff' : 'var(--fg-2)',
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 14,
                transition: 'all 160ms var(--ease-out)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            >
              {p.count}
            </button>
          );
        })}
      </div>
      <div style={{ fontSize: 11, opacity: 0.65, marginTop: 6 }}>
        {pack.label}{pack.tag ? ` · ${pack.tag}` : ''}
      </div>
    </div>
  );
}

function PalettePicker({
  v,
  setVariantKey,
}: {
  v: Variant;
  setVariantKey: (key: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const label = hover || v.name;
  return (
    <div>
      <div
        className="og-palette-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.65,
          }}
        >
          Color
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13 }}>
          {label}
        </span>
      </div>
      {/* Desktop: swatch pill */}
      <div
        className="og-palette-swatches og-hide-on-mobile"
        style={{
          display: 'flex',
          padding: 8,
          gap: 6,
          borderRadius: 999,
          background: 'rgba(255,255,255,0.5)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(0,0,0,0.05)',
          flexWrap: 'wrap',
          width: 'fit-content',
        }}
      >
        {PRODUCT_VARIANTS.map(opt => {
          const active = opt.key === v.key;
          return (
            <button
              key={opt.key}
              className="og-swatch-btn"
              onClick={() => setVariantKey(opt.key)}
              onMouseEnter={() => setHover(opt.name)}
              onMouseLeave={() => setHover(null)}
              title={opt.name}
              style={{
                width: 26,
                height: 26,
                minWidth: 26,
                borderRadius: '50%',
                background: opt.hex,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                boxShadow: active
                  ? `0 0 0 2px #fff, 0 0 0 4px rgba(0,0,0,0.25)`
                  : '0 1px 2px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)',
                transition: 'box-shadow 200ms var(--ease-bounce)',
              }}
            />
          );
        })}
      </div>

      {/* Mobile: dropdown */}
      <div className="og-show-on-mobile">
        <ColorDropdown value={v.key} onChange={setVariantKey} />
      </div>
    </div>
  );
}

function ViewToggle({
  v,
  view,
  setView,
}: {
  v: Variant;
  view: string;
  setView: (v: string) => void;
}) {
  const items = [
    { id: 'product', icon: 'Package', label: 'Product' },
    { id: 'chair', icon: 'Armchair', label: 'On chair' },
    { id: 'room', icon: 'Home', label: 'In room' },
  ];
  return (
    <div
      className="og-view-toggle"
      style={{
        display: 'flex',
        padding: 4,
        gap: 4,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0,0,0,0.05)',
        alignSelf: 'flex-start',
      }}
    >
      {items.map(it => {
        const active = it.id === view;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Icon = (LucideIcons as any)[it.icon] as React.ComponentType<{ size?: number; strokeWidth?: number }> | undefined;
        return (
          <button
            key={it.id}
            onClick={() => setView(it.id)}
            title={it.label}
            style={{
              border: 'none',
              cursor: 'pointer',
              padding: '8px 14px',
              borderRadius: 999,
              background: active ? vAccent(v) : 'transparent',
              color: active ? '#fff' : 'currentColor',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 13,
              transition: 'all 160ms var(--ease-out)',
            }}
          >
            {Icon && <Icon size={15} strokeWidth={1.75} />}
            <span className="og-view-toggle-label">{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function FeatureRow({ v, f }: { v: Variant; f: { icon: string; title: string; sub: string } }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '44px 1fr',
        gap: 14,
        padding: '12px 14px',
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(6px)',
        borderRadius: 14,
        border: '1px solid rgba(0,0,0,0.05)',
        alignItems: 'center',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: vAccent(v),
          color: 'white',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <DynIcon name={f.icon} size={20} strokeWidth={1.75} />
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: '-0.005em',
          }}
        >
          {f.title}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            lineHeight: 1.45,
            opacity: 0.7,
            marginTop: 1,
          }}
        >
          {f.sub}
        </div>
      </div>
    </div>
  );
}

function RatingRow({ v }: { v: Variant }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '14px 18px',
        background: vAccent(v),
        color: 'white',
        borderRadius: 14,
        boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
        textAlign: 'left',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18 }}>
          4.9 ★★★★★
        </div>
        <div style={{ fontSize: 12, opacity: 0.85 }}>2,140 verified reviews</div>
      </div>
      <LucideIcons.ArrowRight size={18} />
    </div>
  );
}

interface HeroProps {
  variant: Variant;
  setVariantKey: (key: string) => void;
}

export default function Hero({ variant, setVariantKey }: HeroProps) {
  const v = variant;
  const [packIdx, setPackIdx] = useState(1);
  const [view, setView] = useState('product');
  const pack = PACK_SIZES[packIdx];

  return (
    <section
      className="og-hero-grid"
      style={{
        minHeight: '100vh',
        width: '100%',
        background: v.bg,
        color: v.text,
        display: 'grid',
        gridTemplateColumns: '0.95fr 1fr 1.05fr',
        alignItems: 'center',
        padding: '100px 64px 60px',
        gap: 32,
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        transition: 'background 420ms var(--ease-out), color 420ms var(--ease-out)',
      }}
    >
      {/* LEFT */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          position: 'relative',
          zIndex: 2,
          maxWidth: 400,
        }}
      >
        <Headline v={v} />
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            lineHeight: 1.55,
            opacity: 0.78,
          }}
        >
          {v.blurb}
        </div>

        <PackSelector v={v} idx={packIdx} setIdx={setPackIdx} />
        <PalettePicker v={v} setVariantKey={setVariantKey} />

        <div className="og-hero-cta-row" style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <a
            href="/shop"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              borderRadius: 'var(--r-pill)',
              transition: 'transform 140ms var(--ease-out), box-shadow 140ms var(--ease-out)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 26px',
              fontSize: 15,
              background: v.dark ? 'white' : 'var(--fg)',
              color: v.dark ? 'var(--fg)' : 'white',
              boxShadow: v.dark ? '0 6px 18px rgba(0,0,0,0.10)' : '0 6px 18px rgba(0,0,0,0.18)',
              textDecoration: 'none',
            }}
          >
            Add to cart · ${pack.price}
          </a>
        </div>
      </div>

      {/* CENTER */}
      <ProductHero v={v} view={view} />

      {/* RIGHT */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          width: '100%',
        }}
      >
        <ViewToggle v={v} view={view} setView={setView} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              opacity: 0.65,
            }}
          >
            What you get
          </div>
          {v.features.slice(0, 5).map((f, i) => (
            <FeatureRow key={i} v={v} f={f} />
          ))}
        </div>

        {/* <RatingRow v={v} /> */}
      </div>
    </section>
  );
}
