'use client';
import React, { useState } from 'react';
import { Plus, X, ChevronRight } from 'lucide-react';
import { CATEGORIZED_FAQ } from '../config/faqData';

// Re-exported for backward compatibility with existing imports.
export { CATEGORIZED_FAQ };

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIZED_FAQ[0].category);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const currentCategoryData = CATEGORIZED_FAQ.find(c => c.category === activeCategory);

  return (
    <div className="og-faq-card" style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderRadius: 24,
      padding: '60px 40px',
      boxShadow: '0 24px 80px rgba(0, 0, 0, 0.05)',
      maxWidth: 1000,
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      zIndex: 10,
    }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2 style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 'clamp(32px, 4vw, 42px)',
          fontWeight: 700,
          color: '#123136',
          margin: '0 0 16px',
          letterSpacing: '-0.02em',
        }}>
          Frequently Asked Questions
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: '#5B767A',
          maxWidth: 600,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Everything about fit, install, and getting started — in one place. Find the answers you need to make the most out of your Orbit Guard.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="og-faq-grid" style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: 40,
        alignItems: 'start',
      }}>
        
        {/* Left: Categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {CATEGORIZED_FAQ.map((cat) => {
            const isActive = activeCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => {
                  setActiveCategory(cat.category);
                  setOpenIndex(0); // Reset accordion state when changing category
                }}
                style={{
                  background: isActive ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                  border: 'none',
                  padding: '20px 24px',
                  borderRadius: 12,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  textAlign: 'left',
                  boxShadow: isActive ? '0 4px 16px rgba(0,0,0,0.03)' : 'none',
                  transition: 'all 0.2s',
                  color: isActive ? '#123136' : '#8A9BA0',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 15,
                }}
              >
                <span>{cat.category}</span>
                <ChevronRight size={18} opacity={isActive ? 1 : 0.5} />
              </button>
            );
          })}
          <div style={{ marginTop: 24 }}>
            <a href="mailto:hello@orbitguards.com" style={{
              display: 'block',
              background: '#5A74FF',
              color: '#fff',
              padding: '16px 24px',
              borderRadius: 12,
              textAlign: 'center',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 15,
              boxShadow: '0 8px 24px rgba(90, 116, 255, 0.25)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              Contact Us
            </a>
          </div>
        </div>

        {/* Right: Accordions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {currentCategoryData?.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                style={{
                  background: isOpen ? '#fff' : 'rgba(240, 246, 250, 0.6)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? '0 12px 32px rgba(0,0,0,0.04)' : 'none',
                  border: isOpen ? '1px solid rgba(0,0,0,0.02)' : '1px solid transparent',
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: '#123136',
                    fontWeight: isOpen ? 600 : 500,
                    fontSize: 16,
                  }}
                >
                  <span style={{ paddingRight: 24 }}>{item.q}</span>
                  <div style={{
                    color: '#123136',
                    display: 'grid',
                    placeItems: 'center',
                    transition: 'transform 0.3s ease',
                  }}>
                    {isOpen ? <X size={20} /> : <Plus size={20} />}
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
                    <p style={{
                      margin: 0,
                      padding: '0 24px 24px',
                      color: '#5B767A',
                      lineHeight: 1.6,
                      fontSize: 15,
                    }}>
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
