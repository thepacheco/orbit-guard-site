'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useCart } from './CartContext';
import CartDrawer from './CartDrawer';
import type { Variant } from './types';

function vAccent(v: Variant): string {
  if (v.dark) return v.ring;
  if (v.key === 'polar') return v.ring;
  return v.hex;
}

interface HeaderProps {
  dark: boolean;
  variant: Variant;
}

function RoundIcon({
  icon,
  hoverBg,
  onClick,
}: {
  icon: string;
  hoverBg?: string;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[
    icon.split('-').map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  ] as React.ComponentType<{ size?: number; strokeWidth?: number }> | undefined;
  if (!Icon) return null;
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: hover ? hoverBg : 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        transition: 'background 140ms var(--ease-out)',
      }}
    >
      <Icon size={20} strokeWidth={1.6} />
    </button>
  );
}

function CartIconButton({
  hoverBg,
  badgeBorder,
  onClick,
}: {
  hoverBg?: string;
  badgeBorder?: string;
  onClick?: () => void;
}) {
  const [hover, setHover] = useState(false);
  const { totalItems } = useCart();

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        width: 42,
        height: 42,
        borderRadius: '50%',
        background: hover ? hoverBg : 'transparent',
        border: 'none',
        color: 'inherit',
        cursor: 'pointer',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        transition: 'background 140ms var(--ease-out)',
      }}
    >
      <LucideIcons.ShoppingBag size={20} strokeWidth={1.6} />
      {totalItems > 0 && (
        <span
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            minWidth: 15,
            height: 15,
            padding: '0 3px',
            background: 'var(--og-blue)',
            color: '#fff',
            fontSize: 10,
            fontWeight: 800,
            borderRadius: 999,
            display: 'grid',
            placeItems: 'center',
            border: `2px solid ${badgeBorder ?? '#fff'}`,
          }}
        >
          {totalItems}
        </span>
      )}
    </button>
  );
}

export default function Header({ dark, variant }: HeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const cardBg = 'rgba(255,255,255,0.65)';
  const cardBorder = 'rgba(255,255,255,0.7)';
  const ink = 'var(--fg)';
  const chipBg = 'rgba(255,255,255,0.85)';
  const accentColor = vAccent(variant);

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 22,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          justifyContent: 'center',
          padding: '0 24px',
          pointerEvents: 'none',
        }}
      >
        <header
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            alignItems: 'center',
            padding: '10px 16px',
            background: cardBg,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderRadius: 999,
            boxShadow: `0 1px 0 ${cardBorder} inset, 0 14px 36px rgba(0,0,0,${dark ? 0.35 : 0.10})`,
            width: '100%',
            maxWidth: 1240,
            pointerEvents: 'auto',
            transition: 'background 420ms var(--ease-out), color 420ms var(--ease-out)',
            color: ink,
          }}
        >
          {/* LEFT: OrbitGuard text */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="/"
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 17,
                color: '#5A74FF',
                textDecoration: 'none',
                letterSpacing: '-0.01em',
              }}
            >
              OrbitGuard
            </a>
          </div>

          {/* CENTER: Orbit icon mark (mono SVG colored with variant accent) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: accentColor,
                  WebkitMaskImage: "url('/assets/orbit-mark-mono.svg')",
                  maskImage: "url('/assets/orbit-mark-mono.svg')",
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  transition: 'background 420ms var(--ease-out)',
                } as React.CSSProperties}
              />
            </a>
          </div>

          {/* RIGHT: Search, Heart, Cart, CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
            {/* Desktop-only: search & heart */}
            <span className="og-header-desktop">
              <RoundIcon icon="search" hoverBg={chipBg} />
            </span>
            <span className="og-header-desktop">
              <RoundIcon icon="heart" hoverBg={chipBg} />
            </span>
            {/* Cart icon always visible */}
            <CartIconButton
              hoverBg={chipBg}
              badgeBorder={dark ? 'transparent' : '#fff'}
              onClick={() => setCartOpen(true)}
            />
            {/* Desktop-only: CTA button */}
            <a
              href="/shop"
              className="og-header-desktop"
              style={{
                marginLeft: 8,
                background: 'var(--og-blue)',
                color: '#fff',
                border: 'none',
                padding: '12px 18px 12px 20px',
                borderRadius: 999,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 6px 16px rgba(90,116,255,0.32)',
                textDecoration: 'none',
              }}
            >
              Get a pack
              <LucideIcons.ArrowRight size={16} />
            </a>
          </div>
        </header>
      </div>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .og-header-desktop {
            display: none !important;
          }
        }
        .og-header-desktop {
          display: inline-flex;
          align-items: center;
        }
      `}</style>
    </>
  );
}
