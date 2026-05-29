'use client';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export const DEFAULT_FAQ: FaqItem[] = [
  {
    q: 'Will Orbit fit my chair?',
    a: "Orbit fits 95% of office chairs — any caster with a stem between 7 and 11mm. That covers nearly every standard task chair, gaming chair, and rolling stool. If you're unsure, measure the metal post your wheel slots into.",
  },
  {
    q: 'How do I install them?',
    a: 'Tip the chair on its side, pull each caster out by hand (most pop right off), click an Orbit onto the stem, and push the caster back in. No tools. About two minutes for all five wheels.',
  },
  {
    q: 'Do they work on hardwood and carpet?',
    a: 'Both. The soft TPU shell rolls quietly on hardwood, tile, and laminate, and glides over low-pile carpet and rugs without snagging.',
  },
  {
    q: 'What is the stacking system?',
    a: 'Each Orbit is 2.5cm tall and splits into two halves. Stack two to reach 5cm for taller stems or gaming chairs. Every pack ships with one spare guard so you can mix, match, or stack.',
  },
  {
    q: 'Are they really pet-safe?',
    a: 'Yes. The rounded, closed shell means no gap for a tail, paw, or cable to get pinched. We tested every colorway with three very curious cats.',
  },
  {
    q: 'What if they do not fit?',
    a: 'Return them within 60 days for a full refund — shipping included, no questions asked. Keep the spare guard either way.',
  },
  {
    q: 'When does Orbit ship?',
    a: "We are live on Kickstarter now at 342% funded. Backers get first run, shipping from Atlanta this fall. Enter your email on the homepage to get notified the moment orders open.",
  },
  {
    q: 'How much does it cost?',
    a: 'A single guard is $6. Packs scale down from there — a 5-pack (one chair) is $24, and the 12-pack drops to $48. Mix-and-match half guards are the same price.',
  },
];

interface FaqProps {
  data?: FaqItem[];
  title?: string;
}

export default function Faq({ data = DEFAULT_FAQ, title }: FaqProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());

  function toggle(index: number) {
    setOpenIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto' }}>
      {title && (
        <h2
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 3vw, 42px)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 32px',
            color: 'var(--fg)',
          }}
        >
          {title}
        </h2>
      )}
      {data.map((item, i) => {
        const isOpen = openIndices.has(i);
        return (
          <div
            key={item.q}
            style={{
              borderTop: '1px solid var(--border)',
              borderBottom: i === data.length - 1 ? '1px solid var(--border)' : undefined,
            }}
          >
            <button
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 24,
                padding: '20px 0',
                textAlign: 'left',
                color: 'var(--fg)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--fg)',
                  lineHeight: 1.3,
                }}
              >
                {item.q}
              </span>
              <span
                style={{
                  flexShrink: 0,
                  width: 28,
                  height: 28,
                  display: 'grid',
                  placeItems: 'center',
                  color: 'var(--og-blue)',
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 200ms var(--ease-out)',
                }}
              >
                <ChevronDown size={20} strokeWidth={1.8} />
              </span>
            </button>
            {isOpen && (
              <div
                style={{
                  padding: '0 16px 20px 0',
                  opacity: 1,
                  transition: 'opacity 200ms',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: 'var(--fg-2)',
                    margin: 0,
                  }}
                >
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
