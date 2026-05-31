'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { PRODUCT_VARIANTS, PACK_SIZES } from './data';

const Product3DViewer = dynamic(() => import('./Product3DViewer'), { ssr: false });
import type { Variant } from './types';
import { useCart } from './CartContext';
import { useActiveVariant } from './ActiveVariantContext';
import ColorDropdown from './ColorDropdown';

// ── helpers ──────────────────────────────────────────────────────────
function vAccent(v: Variant): string {
  if (v.dark) return v.ring;
  if (v.key === 'polar') return v.ring;
  return v.hex;
}

import UNIQUE_MIX_NAMES from './names.json';

function getMixName(topKey: string, bottomKey: string): string {
  if (topKey === bottomKey) return PRODUCT_VARIANTS.find(v => v.key === topKey)?.name || '';
  return (UNIQUE_MIX_NAMES as Record<string, string>)[`${topKey}|${bottomKey}`] || 'Cosmic Blend';
}

// ── PuckView (inline) ────────────────────────────────────────────────
function PuckView({ v, size = 300 }: { v: Variant; size?: number }) {
  const inner = Math.round(size * 0.27);
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        borderRadius: '50%',
        background: v.hex,
        boxShadow: `inset 0 0 0 ${Math.round(size * 0.11)}px rgba(255,255,255,0.32), 0 30px 60px rgba(0,0,0,0.18)`,
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '50%',
          width: inner,
          height: inner,
          transform: 'translate(-50%,-50%)',
          borderRadius: '50%',
          background: v.bg,
          boxShadow: 'inset 0 0 0 6px rgba(0,0,0,0.06)',
        }}
      />
    </div>
  );
}

// ── SplitPuckView ────────────────────────────────────────────────────
function SplitPuckView({ topColor, bottomColor }: { topColor: string; bottomColor: string }) {
  return (
    <div style={{ position: 'relative', width: 280, height: 280 }}>
      {/* Top half */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
        background: topColor,
        borderRadius: '140px 140px 0 0',
        boxShadow: 'inset 0 0 0 28px rgba(255,255,255,0.28)',
      }}/>
      {/* Bottom half */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
        background: bottomColor,
        borderRadius: '0 0 140px 140px',
        boxShadow: 'inset 0 0 0 28px rgba(255,255,255,0.28)',
      }}/>
      {/* Center hole */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 72, height: 72, borderRadius: '50%',
        background: '#f6f6f4',
        boxShadow: 'inset 0 0 0 5px rgba(0,0,0,0.06)',
        zIndex: 2,
      }}/>
      {/* Split line */}
      <div style={{
        position: 'absolute', top: '50%', left: '10%', right: '10%',
        height: 2, background: 'rgba(255,255,255,0.6)',
        transform: 'translateY(-50%)', zIndex: 3,
      }}/>
    </div>
  );
}

// ── Mini Split Dot ───────────────────────────────────────────────────
function MiniSplitDot({ top, bottom, size = 20 }: { top: string; bottom: string; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.1)', flexShrink: 0,
    }}>
      <div style={{ height: '50%', background: top }} />
      <div style={{ height: '50%', background: bottom }} />
    </div>
  );
}

// ── Palette Picker (shop version) ────────────────────────────────────
function ShopPalettePicker({
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
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 10,
        }}
      >
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.65 }}>
          Color
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13 }}>
          {label}
        </span>
      </div>
      {/* Desktop: swatch pill */}
      <div
        className="og-hide-on-mobile"
        style={{
          display: 'flex',
          padding: 8,
          gap: 6,
          borderRadius: 999,
          background: 'rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
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
                  ? `0 0 0 2px #fff, 0 0 0 3px #5A74FF`
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

// ── Half Color Picker ────────────────────────────────────────────────
function HalfColorPicker({
  label,
  selectedKey,
  onSelect,
}: {
  label: string;
  selectedKey: string;
  onSelect: (key: string) => void;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const selected = PRODUCT_VARIANTS.find(v => v.key === selectedKey) || PRODUCT_VARIANTS[0];
  const hovered = hover ? PRODUCT_VARIANTS.find(v => v.key === hover) : null;
  const displayName = hovered ? hovered.name : selected.name;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.65 }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13 }}>
          {displayName}
        </span>
      </div>
      <div style={{
        display: 'flex',
        padding: 7,
        gap: 5,
        borderRadius: 999,
        background: 'rgba(0,0,0,0.04)',
        border: '1px solid rgba(0,0,0,0.06)',
        flexWrap: 'wrap',
        width: 'fit-content',
      }}>
        {PRODUCT_VARIANTS.map(opt => {
          const active = opt.key === selectedKey;
          return (
            <button
              key={opt.key}
              className="og-swatch-btn"
              onClick={() => onSelect(opt.key)}
              onMouseEnter={() => setHover(opt.key)}
              onMouseLeave={() => setHover(null)}
              title={opt.name}
              style={{
                width: 22,
                height: 22,
                minWidth: 22,
                borderRadius: '50%',
                background: opt.hex,
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                boxShadow: active
                  ? `0 0 0 2px #fff, 0 0 0 3px #5A74FF`
                  : '0 1px 2px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)',
                transition: 'box-shadow 200ms var(--ease-bounce)',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Pack Selector ────────────────────────────────────────────────────
function ShopPackSelector({
  idx,
  setIdx,
}: {
  idx: number;
  setIdx: (i: number) => void;
}) {
  const pack = PACK_SIZES[idx];
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.65 }}>
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
                background: active ? '#5A74FF' : 'transparent',
                color: active ? '#fff' : 'var(--fg-2)',
                fontWeight: 700,
                fontSize: 14,
                transition: 'all 160ms var(--ease-out)',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            >
              {p.count} · ${p.price}
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

// ── Feature chips (floating on left panel) ───────────────────────────
function FloatChip({ v, icon, text }: { v: Variant; icon: string; text: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[
    icon.split('-').map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  ] as React.ComponentType<{ size?: number; strokeWidth?: number }> | undefined;
  return (
    <div
      style={{
        background: v.dark ? 'rgba(20,22,28,0.88)' : 'white',
        color: v.dark ? 'white' : 'var(--fg)',
        borderRadius: 999,
        padding: '10px 16px 10px 12px',
        boxShadow: '0 10px 24px rgba(0,0,0,0.14)',
        display: 'inline-flex',
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
          background: vAccent(v),
          color: 'white',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
        }}
      >
        {Icon && <Icon size={14} strokeWidth={2} />}
      </span>
      <span>{text}</span>
    </div>
  );
}

// ── Simple Header ────────────────────────────────────────────────────
function SimpleHeader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px 24px',
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <a
        href="/"
        style={{
          position: 'absolute',
          left: 24,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--fg-2)',
          textDecoration: 'none',
        }}
      >
        <LucideIcons.ArrowLeft size={16} strokeWidth={2} />
        Back
      </a>
      <Image
        src="/assets/orbit-icon-mark.png"
        alt="Orbit"
        width={36}
        height={36}
        style={{ borderRadius: '50%', display: 'block' }}
      />
    </div>
  );
}

// ── Guard Slot type ──────────────────────────────────────────────────
interface GuardSlot {
  topKey: string;
  bottomKey: string;
}

// ── Main ShopPage ────────────────────────────────────────────────────
export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#fff' }} />}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const { activeVariant: v, setActiveVariant } = useActiveVariant();
  const searchParams = useSearchParams();
  
  React.useEffect(() => {
    const colorParam = searchParams.get('color');
    if (colorParam) {
      const newVariant = PRODUCT_VARIANTS.find(variant => variant.key === colorParam);
      if (newVariant) setActiveVariant(newVariant);
    }
    
    const mixTopParam = searchParams.get('mixTop');
    const mixBottomParam = searchParams.get('mixBottom');
    if (mixTopParam && mixBottomParam) {
      setMixMode(true);
      setMixTopKey(mixTopParam);
      setMixBottomKey(mixBottomParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const setVariantKey = (key: string) => {
    const newVariant = PRODUCT_VARIANTS.find(variant => variant.key === key);
    if (newVariant) setActiveVariant(newVariant);
  };
  const [packIdx, setPackIdx] = useState(1);

  // Mix & Match state
  const [mixMode, setMixMode] = useState(false);
  const [exploded, setExploded] = useState(false);
  const [mixTopKey, setMixTopKey] = useState('blueberry');
  const [mixBottomKey, setMixBottomKey] = useState('clover');
  const [activeSlot, setActiveSlot] = useState(0);
  const [guardSlots, setGuardSlots] = useState<GuardSlot[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  const cart = useCart();
  const pack = PACK_SIZES[packIdx];

  const mixTopVariant = PRODUCT_VARIANTS.find(x => x.key === mixTopKey) || PRODUCT_VARIANTS[0];
  const mixBottomVariant = PRODUCT_VARIANTS.find(x => x.key === mixBottomKey) || PRODUCT_VARIANTS[1];

  // When packIdx changes in mix mode, rebuild guard slots
  React.useEffect(() => {
    if (!mixMode) return;
    setGuardSlots(prev => {
      const newSlots: GuardSlot[] = [];
      for (let i = 0; i < pack.count; i++) {
        newSlots.push(prev[i] ?? { topKey: mixTopKey, bottomKey: mixBottomKey });
      }
      return newSlots;
    });
    setActiveSlot(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pack.count, mixMode]);

  // When mix mode turns on, initialise slots
  React.useEffect(() => {
    if (mixMode) {
      setGuardSlots(Array.from({ length: pack.count }, () => ({ topKey: mixTopKey, bottomKey: mixBottomKey })));
      setActiveSlot(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mixMode]);

  // When top/bottom color changes, update the active slot
  function handleMixTopChange(key: string) {
    setMixTopKey(key);
    setGuardSlots(prev => prev.map((s, i) => i === activeSlot ? { ...s, topKey: key } : s));
  }

  function handleMixBottomChange(key: string) {
    setMixBottomKey(key);
    setGuardSlots(prev => prev.map((s, i) => i === activeSlot ? { ...s, bottomKey: key } : s));
  }

  function selectSlot(i: number) {
    setActiveSlot(i);
    const slot = guardSlots[i];
    if (slot) {
      setMixTopKey(slot.topKey);
      setMixBottomKey(slot.bottomKey);
    }
  }

  function addToCart() {
    cart.addItem({
      variantKey: v.key,
      variantName: v.name,
      hex: v.hex,
      packCount: pack.count,
      packPrice: pack.price,
    });
    window.dispatchEvent(new CustomEvent('og:open-cart'));
  }

  function addMixToCart() {
    const topVariant = mixTopVariant;
    const bottomVariant = mixBottomVariant;
    cart.addItem({
      variantKey: `mix-${mixTopKey}-${mixBottomKey}`,
      variantName: getMixName(mixTopKey, mixBottomKey),
      hex: `linear-gradient(to bottom, ${topVariant.hex} 50%, ${bottomVariant.hex} 50%)`,
      packCount: pack.count,
      packPrice: pack.price,
      isMix: true,
      mixTop: topVariant.hex,
      mixBottom: bottomVariant.hex,
    });
    window.dispatchEvent(new CustomEvent('og:open-cart'));
  }

  // Left panel background in mix mode: gradient of two colors at 20% opacity
  const leftPanelBg = mixMode
    ? `linear-gradient(to bottom, ${mixTopVariant.hex}33 0%, ${mixBottomVariant.hex}33 100%)`
    : v.bg;

  // Active slot colors for the preview
  const activeSlotData = guardSlots[activeSlot] ?? { topKey: mixTopKey, bottomKey: mixBottomKey };
  const previewTopVariant = PRODUCT_VARIANTS.find(x => x.key === activeSlotData.topKey) || mixTopVariant;
  const previewBottomVariant = PRODUCT_VARIANTS.find(x => x.key === activeSlotData.bottomKey) || mixBottomVariant;

  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      <div
        className="og-shop-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          minHeight: 'calc(100vh - var(--og-announce-h, 0px))',
        }}
      >
        <div
          className="og-shop-left"
          style={{
            background: leftPanelBg,
            color: mixMode ? 'var(--fg)' : v.text,
            position: 'sticky',
            top: 0,
            paddingTop: 'calc(100px + var(--og-announce-h, 0px))',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            paddingBottom: 40,
            paddingLeft: 40,
            paddingRight: 40,
            transition: 'background 420ms var(--ease-out), color 420ms var(--ease-out)',
            overflow: 'hidden',
          }}
        >
          {/* Orbital ring decoration */}
          <svg
            viewBox="0 0 480 480"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              animation: 'ogSpin 28s linear infinite',
              opacity: 0.35,
            }}
          >
            <ellipse
              cx="240" cy="280" rx="200" ry="52"
              fill="none"
              stroke={mixMode ? 'rgba(0,0,0,0.10)' : (v.dark ? 'rgba(255,255,255,0.22)' : 'rgba(0,0,0,0.10)')}
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </svg>

          {mixMode ? (
            <div style={{ width: '100%', height: '100%', transform: exploded ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <Product3DViewer
                topColor={previewTopVariant.hex}
                bottomColor={previewBottomVariant.hex}
                exploded={exploded}
                cameraPosition={[0, 3.5, 3.0]}
              />
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', transform: exploded ? 'scale(0.9)' : 'scale(1)', transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <Product3DViewer
                topColor={v.hex}
                bottomColor={v.hex}
                exploded={exploded}
                cameraPosition={[0, 3.5, 3.0]}
              />
            </div>
          )}

          {/* Toggle Detach Button */}
          <button
            onClick={() => setExploded(!exploded)}
            style={{
              position: 'absolute',
              top: 160,
              right: 20,
              background: 'rgba(255,255,255,0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)',
              borderRadius: 999,
              padding: '8px 16px',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 13,
              color: 'var(--fg)',
              cursor: 'pointer',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            {exploded ? <LucideIcons.Minimize2 size={14} /> : <LucideIcons.Maximize2 size={14} />}
            {exploded ? 'Snap together' : 'Detach'}
          </button>

          {/* Floating chips — only in normal mode */}
          {!mixMode && (
            <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', zIndex: 2, pointerEvents: 'none' }}>
              {v.floatChips.map((chip, i) => (
                <FloatChip key={i} v={v} icon={chip.icon} text={chip.text} />
              ))}
            </div>
          )}

          {/* Mix mode label on left panel */}
          {mixMode && (
            <div style={{
              fontSize: 13,
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              color: 'rgba(0,0,0,0.45)',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2,
            }}>
              {previewTopVariant.name} top · {previewBottomVariant.name} bottom
            </div>
          )}
        </div>

        <div
          className="og-shop-right"
          style={{
            paddingTop: 'calc(60px + var(--og-announce-h, 0px) + 24px)',
            paddingBottom: 40,
            paddingLeft: 48,
            paddingRight: 48,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 640,
          }}
        >
          {/* Product name + Mix & Match toggle */}
          <div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#5A74FF', marginBottom: 8 }}>
                  Orbit Guard Caster Guard
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
                  <h1 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 'clamp(32px, 3vw, 48px)', letterSpacing: '-0.025em', lineHeight: 1, margin: 0 }}>
                    {mixMode ? getMixName(previewTopVariant.key, previewBottomVariant.key) : v.name}
                  </h1>
                  {mixMode && (
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                      background: '#E2E7FF',
                      color: '#5A74FF',
                      borderRadius: 999,
                      padding: '4px 10px',
                      fontSize: 12,
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                    }}>
                      <LucideIcons.Layers size={12} strokeWidth={2.5} />
                      Half &amp; Half
                    </span>
                  )}
                </div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.55, color: 'var(--fg-2)', margin: 0 }}>
                  {mixMode
                    ? 'Each 5mm guard splits into two 2.5mm halves — pick a different color for each half.'
                    : v.blurb}
                </p>
              </div>

              {/* Mix & Match toggle button */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <button
                  onClick={() => setMixMode(m => !m)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '10px 18px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    background: mixMode ? 'var(--og-blue)' : 'var(--bg-inset)',
                    color: mixMode ? '#fff' : 'var(--fg)',
                    fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13,
                    transition: 'all 200ms var(--ease-out)',
                    boxShadow: mixMode ? 'var(--shadow-blue)' : 'none',
                  }}
                >
                  <LucideIcons.Layers size={15} strokeWidth={2} />
                  Mix &amp; Match
                </button>
              </div>
            </div>
          </div>

          {mixMode ? (
            // ── MIX & MATCH RIGHT PANEL ───────────────────────────────
            <>
              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em' }}>
                  ${pack.price}
                </span>
                <span style={{ fontSize: 14, color: 'var(--fg-3)' }}>
                  for {pack.count} mixed guard{pack.count > 1 ? 's' : ''}
                </span>
              </div>

              {/* Pack selector */}
              <ShopPackSelector idx={packIdx} setIdx={setPackIdx} />

              {/* Desktop: inline top/bottom pickers */}
              <div className="og-hide-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Top half color picker */}
                <HalfColorPicker
                  label="Top 2.5mm"
                  selectedKey={mixTopKey}
                  onSelect={handleMixTopChange}
                />

                {/* Bottom half color picker */}
                <HalfColorPicker
                  label="Bottom 2.5mm"
                  selectedKey={mixBottomKey}
                  onSelect={handleMixBottomChange}
                />
              </div>

              {/* Mobile: tap to customize colors via bottom sheet */}
              <button
                className="og-show-on-mobile"
                onClick={() => { selectSlot(0); setSheetOpen(true); }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 'var(--r-md)',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-inset)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 15,
                  color: 'var(--fg)',
                  textAlign: 'left',
                }}
              >
                <MiniSplitDot top={mixTopVariant.hex} bottom={mixBottomVariant.hex} size={26} />
                <span style={{ flex: 1 }}>
                  {pack.count > 1 ? 'Customize each guard' : 'Choose top & bottom colors'}
                </span>
                <LucideIcons.ChevronRight size={18} strokeWidth={2} style={{ opacity: 0.5 }} />
              </button>

              {/* Pricing note */}
              <div style={{ fontSize: 13, color: 'var(--fg-3)', fontFamily: 'var(--font-ui)' }}>
                {pack.count} mixed guard{pack.count > 1 ? 's' : ''} · ${pack.price}
              </div>

              {/* Add to cart */}
              <button
                onClick={addMixToCart}
                style={{
                  background: '#5A74FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 32px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 10px 28px rgba(90,116,255,0.35)',
                  transition: 'transform 140ms var(--ease-out), box-shadow 140ms var(--ease-out)',
                  width: '100%',
                }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
              >
                <LucideIcons.ShoppingBag size={20} strokeWidth={2} />
                Add to cart · ${pack.price}
              </button>
            </>
          ) : (
            // ── NORMAL MODE RIGHT PANEL ───────────────────────────────
            <>
              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 36, letterSpacing: '-0.02em' }}>
                  ${pack.price}
                </span>
                <span style={{ fontSize: 14, color: 'var(--fg-3)' }}>
                  for {pack.count} guard{pack.count > 1 ? 's' : ''}
                </span>
              </div>

              {/* Pack selector */}
              <ShopPackSelector idx={packIdx} setIdx={setPackIdx} />

              {/* Color picker */}
              <ShopPalettePicker v={v} setVariantKey={setVariantKey} />

              {/* Add to cart */}
              <button
                onClick={addToCart}
                style={{
                  background: '#5A74FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 32px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 17,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 10px 28px rgba(90,116,255,0.35)',
                  transition: 'transform 140ms var(--ease-out), box-shadow 140ms var(--ease-out)',
                  width: '100%',
                }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.98)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
              >
                <LucideIcons.ShoppingBag size={20} strokeWidth={2} />
                Add to cart · ${pack.price}
              </button>
            </>
          )}

        </div>
      </div>

      {/* Full-width bottom configurator panel */}
      {mixMode && pack.count > 1 && guardSlots.length > 0 && (
        <div style={{ maxWidth: 1100, margin: '0 auto', borderTop: '1px solid var(--border)', paddingTop: 16, paddingBottom: 40 }}>
          <div style={{
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 700,
            marginBottom: 16,
            color: 'var(--fg)',
          }}>
            Configure each guard
          </div>
          <div className="og-guard-grid" style={{ display: 'grid', gridTemplateColumns: guardSlots.length === 10 ? 'repeat(5, 1fr)' : guardSlots.length === 12 ? 'repeat(4, 1fr)' : guardSlots.length === 1 ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
            {guardSlots.map((slot, i) => {
              const slotTop = PRODUCT_VARIANTS.find(x => x.key === slot.topKey) || PRODUCT_VARIANTS[0];
              const slotBottom = PRODUCT_VARIANTS.find(x => x.key === slot.bottomKey) || PRODUCT_VARIANTS[1];
              const isActive = i === activeSlot;
              return (
                <button
                  key={i}
                  onClick={() => { selectSlot(i); setSheetOpen(true); }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 20px',
                    borderRadius: 16,
                    border: isActive ? '1px solid #5A74FF' : '1px solid var(--border)',
                    background: isActive ? '#F0F3FF' : 'var(--bg-inset)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 160ms var(--ease-out)',
                    width: '100%',
                    boxShadow: isActive ? '0 8px 24px rgba(90,116,255,0.1)' : 'none',
                  }}
                >
                  <MiniSplitDot top={slotTop.hex} bottom={slotBottom.hex} size={24} />
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: isActive ? 800 : 600,
                      fontSize: 15,
                      color: isActive ? '#5A74FF' : 'var(--fg)',
                    }}>
                      Guard {i + 1}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 12,
                      color: 'var(--fg-2)',
                      marginTop: 2,
                    }}>
                      {slotTop.name} / {slotBottom.name}
                    </span>
                  </div>

                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mix & Match per-guard editor — mobile bottom sheet */}
      {mixMode && sheetOpen && (
        <div className="og-show-on-mobile">
          {/* Backdrop */}
          <div
            onClick={() => setSheetOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 200,
              background: 'rgba(0,0,0,0.35)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />
          {/* Sheet */}
          <div
            style={{
              position: 'fixed',
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 201,
              background: '#fff',
              borderRadius: '20px 20px 0 0',
              boxShadow: '0 -12px 48px rgba(0,0,0,0.18)',
              padding: '20px 20px calc(24px + env(safe-area-inset-bottom, 0px))',
              maxHeight: '88vh',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
            {/* Grab handle */}
            <div style={{ width: 40, height: 4, borderRadius: 999, background: 'var(--border-strong)', margin: '0 auto 4px' }} />

            {/* Header: preview + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <MiniSplitDot top={mixTopVariant.hex} bottom={mixBottomVariant.hex} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18 }}>
                  {pack.count > 1 ? `Guard ${activeSlot + 1} of ${pack.count}` : 'Customize colors'}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--fg-3)' }}>
                  {mixTopVariant.name} top · {mixBottomVariant.name} bottom
                </div>
              </div>
              <button
                onClick={() => setSheetOpen(false)}
                aria-label="Close"
                style={{
                  width: 36, height: 36, borderRadius: '50%',
                  border: '1px solid var(--border)', background: 'transparent',
                  cursor: 'pointer', display: 'grid', placeItems: 'center', color: 'var(--fg-2)',
                  flexShrink: 0,
                }}
              >
                <LucideIcons.X size={18} strokeWidth={2} />
              </button>
            </div>

            {/* Top / Bottom dropdowns */}
            <ColorDropdown label="Top 2.5mm" value={mixTopKey} onChange={handleMixTopChange} />
            <ColorDropdown label="Bottom 2.5mm" value={mixBottomKey} onChange={handleMixBottomChange} />

            {/* Prev / Next navigation (multi-pack only) */}
            {pack.count > 1 && (
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => selectSlot(Math.max(0, activeSlot - 1))}
                  disabled={activeSlot === 0}
                  style={{
                    flex: 1, padding: '12px 0', borderRadius: 'var(--r-md)',
                    border: '1px solid var(--border)', background: '#fff',
                    cursor: activeSlot === 0 ? 'default' : 'pointer',
                    opacity: activeSlot === 0 ? 0.4 : 1,
                    fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  <LucideIcons.ChevronLeft size={16} /> Prev
                </button>
                <button
                  onClick={() => selectSlot(Math.min(pack.count - 1, activeSlot + 1))}
                  disabled={activeSlot >= pack.count - 1}
                  style={{
                    flex: 1, padding: '12px 0', borderRadius: 'var(--r-md)',
                    border: '1px solid var(--border)', background: '#fff',
                    cursor: activeSlot >= pack.count - 1 ? 'default' : 'pointer',
                    opacity: activeSlot >= pack.count - 1 ? 0.4 : 1,
                    fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14,
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  }}
                >
                  Next <LucideIcons.ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Done */}
            <button
              onClick={() => setSheetOpen(false)}
              style={{
                width: '100%', padding: '15px 0', borderRadius: 999,
                border: 'none', background: '#5A74FF', color: '#fff',
                fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 16, cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Sticky Add to Cart bar — mobile only */}
      <div className="og-sticky-cta">
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, lineHeight: 1 }}>
            ${pack.price}
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
            {pack.count} guard{pack.count > 1 ? 's' : ''}
          </div>
        </div>
        <button
          onClick={mixMode ? addMixToCart : addToCart}
          style={{
            background: '#5A74FF',
            color: '#fff',
            border: 'none',
            borderRadius: 999,
            padding: '14px 28px',
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 16,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 8px 20px rgba(90,116,255,0.35)',
            flexShrink: 0,
          }}
        >
          <LucideIcons.ShoppingBag size={18} strokeWidth={2} />
          Add to cart
        </button>
      </div>

    </div>
  );
}
