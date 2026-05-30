'use client';

import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { useCart } from './CartContext';
import CartPopup from './CartPopup';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setCartOpen(true);
    window.addEventListener('og:open-cart', handler);
    return () => window.removeEventListener('og:open-cart', handler);
  }, []);
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
          top: 'calc(22px + var(--og-announce-h, 0px))',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <a
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img src="/assets/svg/OrbitGuard.svg" alt="OrbitGuard" style={{ height: 32, objectFit: 'contain' }} />
            </a>
          </div>

          {/* CENTER: Orbit icon mark (always blue) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <a href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  background: '#5A74FF',
                  WebkitMaskImage: "url('/assets/svg/Orbit%20Icon.svg')",
                  maskImage: "url('/assets/svg/Orbit%20Icon.svg')",
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                } as React.CSSProperties}
              />
            </a>
          </div>

          {/* RIGHT: Desktop CTA + Mobile Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'flex-end' }}>
            <a
              href="/lp/launch"
              className="og-header-desktop"
              style={{
                background: '#05CE78',
                color: '#000',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 999,
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(5, 206, 120, 0.3)',
              }}
            >
              Back us
            </a>
            <a
              href="/shop"
              className="og-header-desktop"
              style={{
                background: 'rgba(0,0,0,0.05)',
                color: ink,
                border: 'none',
                padding: '12px 18px',
                borderRadius: 999,
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              Explore
            </a>

            {/* Mobile hamburger */}
            <button
              className="og-header-mobile"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                color: ink,
                cursor: 'pointer',
                display: 'none',
                placeItems: 'center',
              }}
            >
              {mobileMenuOpen ? <LucideIcons.X size={22} strokeWidth={1.6} /> : <LucideIcons.Menu size={22} strokeWidth={1.6} />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 'calc(90px + var(--og-announce-h, 0px))',
              left: 16,
              right: 16,
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: 20,
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
            }}
          >
            {[
              { href: '/', label: 'Home' },
              { href: '/shop', label: 'Shop' },
              { href: '/about', label: 'About' },
              { href: '/faq', label: 'FAQ' },
              { href: '/contact', label: 'Contact' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: '16px 20px',
                  borderRadius: 12,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 16,
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  background: 'rgba(0,0,0,0.03)',
                  transition: 'background 0.15s',
                }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/lp/launch"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: 12,
                fontFamily: 'var(--font-ui)',
                fontWeight: 800,
                fontSize: 16,
                color: '#fff',
                textDecoration: 'none',
                background: '#05CE78',
                textAlign: 'center',
                boxShadow: '0 6px 18px rgba(5, 206, 120, 0.3)',
              }}
            >
              Back us on Kickstarter
            </a>
          </nav>
        </div>
      )}

      <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>{`
        .og-header-desktop {
          display: inline-flex;
          align-items: center;
        }
        .og-header-mobile {
          display: none !important;
        }
        @media (max-width: 768px) {
          .og-header-desktop {
            display: none !important;
          }
          .og-header-mobile {
            display: grid !important;
          }
        }
      `}</style>
    </>
  );
}
