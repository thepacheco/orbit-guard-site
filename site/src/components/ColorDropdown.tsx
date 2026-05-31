'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { PRODUCT_VARIANTS } from './data';
import type { Variant } from './types';

interface ColorDropdownProps {
  value: string;
  onChange: (key: string) => void;
  label?: string;
}

function Swatch({ v, size = 20 }: { v: Variant; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        minWidth: size,
        borderRadius: '50%',
        background: v.hex,
        display: 'inline-block',
        boxShadow: '0 1px 2px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.06)',
        flexShrink: 0,
      }}
    />
  );
}

export default function ColorDropdown({ value, onChange, label }: ColorDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected =
    PRODUCT_VARIANTS.find(v => v.key === value) || PRODUCT_VARIANTS[0];

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <div
          style={{
            fontSize: 11,
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            opacity: 0.65,
            marginBottom: 8,
          }}
        >
          {label}
        </div>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          width: '100%',
          minHeight: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          borderRadius: 'var(--r-md)',
          border: '1px solid var(--border)',
          background: '#fff',
          cursor: 'pointer',
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--fg)',
          textAlign: 'left',
          boxSizing: 'border-box',
        }}
      >
        <Swatch v={selected} size={22} />
        <span style={{ flex: 1 }}>{selected.name}</span>
        <LucideIcons.ChevronDown
          size={18}
          strokeWidth={2}
          style={{
            transition: 'transform 180ms var(--ease-out)',
            transform: open ? 'rotate(180deg)' : 'none',
            opacity: 0.6,
          }}
        />
      </button>

      {/* Panel */}
      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 30,
            maxHeight: 280,
            overflowY: 'auto',
            background: '#fff',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)',
            boxShadow: '0 12px 32px rgba(0,0,0,0.14)',
            padding: 6,
            boxSizing: 'border-box',
          }}
        >
          {PRODUCT_VARIANTS.map(opt => {
            const active = opt.key === value;
            return (
              <button
                key={opt.key}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.key);
                  setOpen(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 12px',
                  borderRadius: 'var(--r-sm)',
                  border: 'none',
                  background: active ? 'var(--bg-inset)' : 'transparent',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: active ? 700 : 600,
                  fontSize: 15,
                  color: 'var(--fg)',
                  textAlign: 'left',
                }}
              >
                <Swatch v={opt} size={22} />
                <span style={{ flex: 1 }}>{opt.name}</span>
                {active && (
                  <LucideIcons.Check size={16} strokeWidth={2.5} color="var(--og-blue)" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
