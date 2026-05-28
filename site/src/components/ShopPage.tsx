'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';
import { PRODUCT_VARIANTS, PACK_SIZES } from './data';
import type { Variant } from './types';
import { useCart } from './CartContext';

// ── helpers ──────────────────────────────────────────────────────────
function vAccent(v: Variant): string {
  if (v.dark) return v.ring;
  if (v.key === 'polar') return v.ring;
  return v.hex;
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
          {label} · {v.hex}
        </span>
      </div>
      <div
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
          {displayName} · {selected.hex}
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
                  ? `0 0 0 2px #fff, 0 0 0 4px rgba(0,0,0,0.25)`
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
          background: 'rgba(0,0,0,0.04)',
          border: '1px solid rgba(0,0,0,0.06)',
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
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 14,
                transition: 'all 160ms var(--ease-out)',
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
  const [variantKey, setVariantKey] = useState('blueberry');
  const [packIdx, setPackIdx] = useState(1);
  const [saveEmail, setSaveEmail] = useState('');
  const [cartSaved, setCartSaved] = useState(false);

  // Mix & Match state
  const [mixMode, setMixMode] = useState(false);
  const [mixTopKey, setMixTopKey] = useState('blueberry');
  const [mixBottomKey, setMixBottomKey] = useState('clover');
  const [activeSlot, setActiveSlot] = useState(0);
  const [guardSlots, setGuardSlots] = useState<GuardSlot[]>([]);
  const [showMixTooltip, setShowMixTooltip] = useState(false);

  const cart = useCart();
  const v = PRODUCT_VARIANTS.find(x => x.key === variantKey) || PRODUCT_VARIANTS[0];
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
    setCartSaved(false);
  }

  function addMixToCart() {
    const topVariant = mixTopVariant;
    const bottomVariant = mixBottomVariant;
    cart.addItem({
      variantKey: `mix-${mixTopKey}-${mixBottomKey}`,
      variantName: `${topVariant.name} / ${bottomVariant.name}`,
      hex: `linear-gradient(to bottom, ${topVariant.hex} 50%, ${bottomVariant.hex} 50%)`,
      packCount: pack.count,
      packPrice: pack.price,
      isMix: true,
      mixTop: topVariant.hex,
      mixBottom: bottomVariant.hex,
    });
    setCartSaved(false);
  }

  function saveCart() {
    if (!saveEmail.trim() || cart.items.length === 0) return;
    cart.saveCartByEmail(saveEmail.trim());
    setCartSaved(true);
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
      <SimpleHeader />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          minHeight: '100vh',
          paddingTop: 72,
        }}
      >
        {/* LEFT PANEL */}
        <div
          style={{
            background: leftPanelBg,
            color: mixMode ? 'var(--fg)' : v.text,
            position: 'sticky',
            top: 72,
            height: 'calc(100vh - 72px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            padding: 40,
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
            <SplitPuckView
              topColor={previewTopVariant.hex}
              bottomColor={previewBottomVariant.hex}
            />
          ) : (
            <PuckView v={v} size={280} />
          )}

          {/* Floating chips — only in normal mode */}
          {!mixMode && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', position: 'relative', zIndex: 2 }}>
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

        {/* RIGHT PANEL */}
        <div
          style={{
            padding: '48px 48px 80px',
            display: 'flex',
            flexDirection: 'column',
            gap: 32,
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
                    {mixMode ? 'Half & Half' : v.name}
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
                  onMouseEnter={() => setShowMixTooltip(true)}
                  onMouseLeave={() => setShowMixTooltip(false)}
                  title="Mix & Match colors"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: mixMode ? 'none' : '1px solid var(--border)',
                    background: mixMode ? '#5A74FF' : '#fff',
                    color: mixMode ? '#fff' : 'var(--fg-2)',
                    cursor: 'pointer',
                    display: 'grid',
                    placeItems: 'center',
                    boxShadow: mixMode ? '0 4px 14px rgba(90,116,255,0.35)' : '0 1px 3px rgba(0,0,0,0.08)',
                    transition: 'all 200ms var(--ease-out)',
                    marginTop: 4,
                  }}
                >
                  <LucideIcons.Layers size={18} strokeWidth={2} />
                </button>
                {showMixTooltip && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 6,
                    background: '#1A1B1F',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '6px 10px',
                    fontSize: 12,
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}>
                    Mix &amp; Match colors
                  </div>
                )}
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

              {/* Guard configurator for packs > 1 */}
              {pack.count > 1 && guardSlots.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    opacity: 0.65,
                    marginBottom: 10,
                  }}>
                    Configure each guard
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {guardSlots.map((slot, i) => {
                      const slotTop = PRODUCT_VARIANTS.find(x => x.key === slot.topKey) || PRODUCT_VARIANTS[0];
                      const slotBottom = PRODUCT_VARIANTS.find(x => x.key === slot.bottomKey) || PRODUCT_VARIANTS[1];
                      const isActive = i === activeSlot;
                      return (
                        <button
                          key={i}
                          onClick={() => selectSlot(i)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '10px 14px',
                            borderRadius: 12,
                            border: isActive ? '2px solid #5A74FF' : '1px solid var(--border)',
                            background: isActive ? '#F0F3FF' : 'var(--bg-inset)',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 160ms var(--ease-out)',
                          }}
                        >
                          <MiniSplitDot top={slotTop.hex} bottom={slotBottom.hex} size={20} />
                          <span style={{
                            fontFamily: 'var(--font-ui)',
                            fontWeight: isActive ? 700 : 500,
                            fontSize: 13,
                            color: isActive ? '#5A74FF' : 'var(--fg)',
                          }}>
                            Guard {i + 1}: {slotTop.name} / {slotBottom.name}
                          </span>
                          {isActive && (
                            <span style={{
                              marginLeft: 'auto',
                              fontSize: 11,
                              fontFamily: 'var(--font-mono)',
                              color: '#5A74FF',
                              opacity: 0.7,
                            }}>
                              editing
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

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

          {/* Divider + Cart (shared between both modes) */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
              Cart
              {cart.totalItems > 0 && (
                <span style={{ marginLeft: 8, fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400, color: 'var(--fg-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}
                </span>
              )}
            </div>

            {cart.items.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '32px 24px',
                  background: 'var(--bg-inset)',
                  borderRadius: 16,
                  color: 'var(--fg-3)',
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                }}
              >
                <LucideIcons.ShoppingBag size={28} strokeWidth={1.5} style={{ marginBottom: 10, opacity: 0.4 }} />
                <div>Your cart is empty</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Add a pack to get started</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cart.items.map(item => (
                  <div
                    key={item.isMix ? `mix-${item.mixTop}-${item.mixBottom}-${item.packCount}` : `${item.variantKey}-${item.packCount}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      padding: '14px 16px',
                      background: 'var(--bg-inset)',
                      borderRadius: 14,
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Color dot */}
                    {item.isMix ? (
                      <div style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        overflow: 'hidden',
                        flexShrink: 0,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}>
                        <div style={{ height: '50%', background: item.mixTop }} />
                        <div style={{ height: '50%', background: item.mixBottom }} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          background: item.hex,
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                        }}
                      />
                    )}
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14 }}>
                        {item.variantName}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
                        {item.packCount}-pack · ${item.packPrice} each
                      </div>
                    </div>
                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        onClick={() => cart.updateQty(item.variantKey, item.packCount, -1, item.mixTop, item.mixBottom)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          border: '1px solid var(--border)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 16,
                          color: 'var(--fg)',
                        }}
                      >
                        <LucideIcons.Minus size={12} strokeWidth={2.5} />
                      </button>
                      <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => cart.updateQty(item.variantKey, item.packCount, 1, item.mixTop, item.mixBottom)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          border: '1px solid var(--border)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 16,
                          color: 'var(--fg)',
                        }}
                      >
                        <LucideIcons.Plus size={12} strokeWidth={2.5} />
                      </button>
                    </div>
                    {/* Line total */}
                    <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 15, minWidth: 48, textAlign: 'right' }}>
                      ${item.packPrice * item.qty}
                    </div>
                    {/* Remove */}
                    <button
                      onClick={() => cart.removeItem(item.variantKey, item.packCount, item.mixTop, item.mixBottom)}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--fg-3)',
                        transition: 'color 140ms',
                      }}
                      title="Remove"
                    >
                      <LucideIcons.X size={14} strokeWidth={2} />
                    </button>
                  </div>
                ))}

                {/* Subtotal */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 16px',
                    borderTop: '1px solid var(--border)',
                    marginTop: 4,
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 15, color: 'var(--fg-2)' }}>
                    Subtotal
                  </span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 20 }}>
                    ${cart.totalPrice}
                  </span>
                </div>

                {/* Save cart */}
                <div
                  style={{
                    padding: '18px 20px',
                    background: 'var(--bg-inset)',
                    borderRadius: 14,
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
                    Save your cart
                  </div>
                  {cartSaved ? (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: '#E6F7EF',
                        color: '#18A06F',
                        borderRadius: 999,
                        padding: '10px 16px',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      <LucideIcons.CheckCircle size={16} strokeWidth={2} />
                      Cart saved! Check back anytime.
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        gap: 0,
                        background: '#fff',
                        borderRadius: 999,
                        border: '1px solid var(--border)',
                        padding: 4,
                      }}
                    >
                      <input
                        type="email"
                        value={saveEmail}
                        onChange={e => setSaveEmail(e.target.value)}
                        placeholder="your@email.com"
                        style={{
                          flex: 1,
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          padding: '8px 14px',
                          fontFamily: 'var(--font-ui)',
                          fontSize: 14,
                          color: 'var(--fg)',
                          minWidth: 0,
                        }}
                      />
                      <button
                        onClick={saveCart}
                        style={{
                          background: '#5A74FF',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 999,
                          padding: '8px 18px',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 14,
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                        }}
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
