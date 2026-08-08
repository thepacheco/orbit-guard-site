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
    <div style={{ maxWidth: 1100, width: '100%', margin: '0 auto' }}>

      {/* Two-column split: large title left, accordions right */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '320px 1fr',
          gap: 64,
          alignItems: 'start',
        }}
      >

        {/* Left Column: Title + Category Tabs + Contact CTA */}
        <div style={{ position: 'sticky', top: 140 }}>
          <h2
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(56px, 6vw, 80px)',
              fontWeight: 900,
              color: '#111827',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              margin: '0 0 40px',
            }}
          >
            FAQs
          </h2>

          {/* Category Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 32 }}>
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
                    background: isActive ? '#F3F4F6' : 'transparent',
                    border: 'none',
                    padding: '14px 18px',
                    borderRadius: 10,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                    color: isActive ? '#111827' : '#6B7280',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 15,
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  <span>{cat.category}</span>
                  <ChevronRight size={16} opacity={isActive ? 1 : 0.4} />
                </button>
              );
            })}
          </div>

          {/* Contact CTA — links to /contact */}
          <Link
            href="/contact"
            style={{
              display: 'block',
              background: '#111827',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: 12,
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 15,
              fontFamily: 'var(--font-ui)',
              transition: 'transform 0.15s ease',
            }}
          >
            Contact Us
          </Link>
        </div>

        {/* Right Column: Accordion Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {currentCategoryData?.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  borderBottom: '1px solid #E5E7EB',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '24px 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#111827',
                    fontWeight: isOpen ? 700 : 500,
                    fontSize: 16,
                    fontFamily: 'var(--font-body)',
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ paddingRight: 24, flex: 1 }}>{item.q}</span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: isOpen ? '#111827' : '#F3F4F6',
                      color: isOpen ? '#fff' : '#6B7280',
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {isOpen ? <X size={14} /> : <Plus size={14} />}
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
                        padding: '0 0 24px',
                        color: '#6B7280',
                        lineHeight: 1.65,
                        fontSize: 15,
                        fontFamily: 'var(--font-body)',
                        maxWidth: 580,
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
