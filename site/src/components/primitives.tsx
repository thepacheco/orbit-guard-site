'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';

export function DynIcon({ name, size, strokeWidth }: { name: string; size?: number; strokeWidth?: number }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[
    name.split('-').map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join('')
  ] as React.ComponentType<{ size?: number; strokeWidth?: number }> | undefined;
  if (!Icon) return null;
  return <Icon size={size ?? 16} strokeWidth={strokeWidth ?? 1.75} />;
}

interface ButtonProps {
  variant?: 'primary' | 'inverse' | 'ghost' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  style?: React.CSSProperties;
}

export function Button({ variant = 'primary', size = 'md', children, onClick, icon, style }: ButtonProps) {
  const base: React.CSSProperties = {
    fontFamily: 'var(--font-ui)',
    fontWeight: 700,
    border: 'none',
    cursor: 'pointer',
    borderRadius: 'var(--r-pill)',
    transition: 'transform 140ms var(--ease-out), box-shadow 140ms var(--ease-out)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  };
  const sizes: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 22px', fontSize: 15 },
    lg: { padding: '14px 26px', fontSize: 15 },
  };
  const variants: Record<string, React.CSSProperties> = {
    primary:   { background: 'var(--fg)',     color: 'white',   boxShadow: '0 6px 18px rgba(0,0,0,0.18)' },
    inverse:   { background: 'white',          color: 'var(--fg)', boxShadow: '0 6px 18px rgba(0,0,0,0.10)' },
    ghost:     { background: 'transparent',    color: 'currentColor', boxShadow: 'inset 0 0 0 1px currentColor' },
    blue:      { background: 'var(--og-blue)', color: 'white',   boxShadow: 'var(--shadow-blue)' },
  };
  return (
    <button
      onClick={onClick}
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
      onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
    >
      {icon && <DynIcon name={icon} size={16} strokeWidth={1.75} />}
      {children}
    </button>
  );
}

interface IconBtnProps {
  icon: string;
  onClick?: () => void;
  size?: number;
  tone?: 'neutral' | 'ghost';
}

export function IconBtn({ icon, onClick, size = 36, tone = 'neutral' }: IconBtnProps) {
  const [hover, setHover] = useState(false);
  const toneStyle: React.CSSProperties = tone === 'neutral'
    ? { border: `1px solid ${hover ? 'currentColor' : 'rgba(0,0,0,0.12)'}`, background: 'transparent', color: 'currentColor' }
    : { border: 'none', background: hover ? 'rgba(0,0,0,0.06)' : 'transparent', color: 'currentColor' };
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        ...toneStyle,
        display: 'grid',
        placeItems: 'center',
        cursor: 'pointer',
        transition: 'all 140ms var(--ease-out)',
      }}
    >
      <DynIcon name={icon} size={16} strokeWidth={1.75} />
    </button>
  );
}
