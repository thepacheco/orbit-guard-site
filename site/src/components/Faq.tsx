'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, X, ChevronRight } from 'lucide-react';
import { CATEGORIZED_FAQ } from '../config/faqData';

// Re-exported for backward compatibility with existing imports.
export { CATEGORIZED_FAQ };

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIZED_FAQ[0].category);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentCategoryData = CATEGORIZED_FAQ.find(c => c.category === activeCategory);

  return (
    <div style={{ maxWidth: 1240, width: '100%', margin: '0 auto' }}>
      
      {/* Two-column split: large title left, accordions right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '360px 1fr',
          gap: 72,
          alignItems: 'start',
        }}
      >
        {/* Left Column: Title + Category Tabs + Contact CTA */}
        <div style={{ position: 'sticky', top: 140 }}>
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(72px, 8vw, 110px)',
              fontWeight: 900,
              color: '#0F172A',
              letterSpacing: '-0.05em',
              lineHeight: 0.9,
              margin: '0 0 48px',
            }}
          >
            FAQs
          </h1>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 36 }}>
            {CATEGORIZED_FAQ.map((cat) => {
              const isActive = activeCategory === cat.category;
              return (
                <button
                  key={cat.category}
                  onClick={() => {
                    setActiveCategory(cat.category);
                    setOpenIndex(0);
                  }}
                  style={{
                    background: isActive ? '#0F172A' : 'transparent',
                    border: 'none',
                    padding: '16px 22px',
                    borderRadius: 12,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease',
                    color: isActive ? '#FFFFFF' : '#475569',
                    fontWeight: isActive ? 800 : 600,
                    fontSize: 17,
                    fontFamily: 'var(--font-ui)',
                  }}
                >
                  <span>{cat.category}</span>
                  <ChevronRight size={18} opacity={isActive ? 1 : 0.4} />
                </button>
              );
            })}
          </div>

          {/* Contact CTA */}
          <Link
            href="/contact"
            style={{
              display: 'block',
              background: '#5A74FF',
              color: '#FFFFFF',
              padding: '18px 28px',
              borderRadius: 14,
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: 16,
              fontFamily: 'var(--font-ui)',
              boxShadow: '0 10px 28px rgba(90, 116, 255, 0.3)',
              transition: 'transform 0.15s ease',
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Right Column: Large Font Accordion Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {currentCategoryData?.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderBottom: '1.5px solid #E2E8F0',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '32px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#0F172A',
                    fontWeight: isOpen ? 800 : 700,
                    fontSize: 'clamp(19px, 2vw, 24px)',
                    fontFamily: 'var(--font-ui)',
                    lineHeight: 1.3,
                    letterSpacing: '-0.015em',
                  }}
                >
                  <span style={{ paddingRight: 32, flex: 1 }}>{item.q}</span>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: isOpen ? '#0F172A' : '#F1F5F9',
                      color: isOpen ? '#FFFFFF' : '#475569',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isOpen ? <X size={18} strokeWidth={2.5} /> : <Plus size={18} strokeWidth={2.5} />}
                  </div>
                </button>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.3s ease',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <p
                      style={{
                        margin: 0,
                        padding: '0 0 32px',
                        color: '#475569',
                        lineHeight: 1.7,
                        fontSize: 18,
                        fontFamily: 'var(--font-body)',
                        maxWidth: 680,
                      }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
