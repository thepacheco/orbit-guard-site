'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import * as LucideIcons from 'lucide-react';

interface HeaderProps {
  dark: boolean;
}

function NavLink({
  children,
  active,
  mute,
  ink,
  inkActive,
  chip,
}: {
  children: React.ReactNode;
  active?: boolean;
  mute?: string;
  ink?: string;
  inkActive?: string;
  chip?: string;
}) {
  const [hover, setHover] = useState(false);
  return (
    <a
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: 15,
        color: active ? inkActive : hover ? ink : mute,
        textDecoration: 'none',
        cursor: 'pointer',
        padding: '10px 16px',
        borderRadius: 999,
        background: active ? chip : 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'all 140ms var(--ease-out)',
      }}
    >
      {children}
    </a>
  );
}

function RoundIcon({
  icon,
  hoverBg,
  badge,
  badgeBorder,
}: {
  icon: string;
  hoverBg?: string;
  badge?: string;
  badgeBorder?: string;
}) {
  const [hover, setHover] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[
    icon.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  ] as React.ComponentType<{ size?: number; strokeWidth?: number }> | undefined;
  if (!Icon) return null;
  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
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
      {badge && (
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
            border: `2px solid ${badgeBorder}`,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Header({ dark }: HeaderProps) {
  const cardBg = 'rgba(255,255,255,0.65)';
  const cardBorder = 'rgba(255,255,255,0.7)';
  const ink = 'var(--fg)';
  const chipBg = 'rgba(255,255,255,0.85)';

  return (
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 16px 14px 24px',
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
        {/* LEFT: icons + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <RoundIcon icon="search" hoverBg={chipBg} />
          <RoundIcon icon="heart" hoverBg={chipBg} />
          <RoundIcon
            icon="shopping-bag"
            hoverBg={chipBg}
            badge="2"
            badgeBorder={dark ? 'transparent' : '#fff'}
          />
          <a
            href="/shop"
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

        {/* RIGHT: Orbit icon mark */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/assets/orbit-icon-mark.png"
            alt="Orbit"
            width={40}
            height={40}
            style={{ borderRadius: '50%', display: 'block' }}
          />
        </div>
      </header>
    </div>
  );
}
