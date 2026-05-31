'use client';
import React, { useState } from 'react';
import { Plus, X, ChevronRight } from 'lucide-react';

export const CATEGORIZED_FAQ = [
  {
    category: 'General Questions',
    items: [
      { q: 'What is Orbit Guard?', a: 'Orbit Guard is the company that creates protective solutions for office chairs.' },
      { q: 'What is an Orbit?', a: 'An Orbit is the donut shaped device that has a hole inside. When you lift up the chair, you put the wheel inside the hole. This way, it covers around the wheels, and any items or anything that\'s outside when you move it, it will push away. It acts as a barrier.' },
      { q: 'Will Orbit fit my chair?', a: 'Orbit fits 95% of office chairs — any caster with a stem between 7 and 11mm. That covers nearly every standard task chair, gaming chair, and rolling stool. If you\'re unsure, measure the metal post your wheel slots into.' },
      { q: 'How do I install them?', a: 'Tip the chair on its side. Place either half an Orbit Guard or the entire Orbit Guard inside the wheel so the wheel sits inside the Orbit Guard. Place the seat down and do that for each and every office chair wheel. About 1 to 2 minutes for installing on all chair wheels.' },
      { q: 'Do they work on hardwood and carpet?', a: 'Yes. The OrbitGuard is built to work on hardwood floor and carpet. We suggest using half an OrbitGuard and moving the chair around to ensure that it is safe to use since at times the Orbit guard can flip and get caught.' },
    ]
  },
  {
    category: 'Support team',
    items: [
      { q: 'When does Orbit ship?', a: 'We are live on Kickstarter now at 342% funded. Backers get first shipment, shipping from Atlanta this fall. Enter your email on the homepage to get notified the moment orders open.' },
      { q: 'What if they do not fit?', a: 'Return them within 60 days for a full refund — shipping included, no questions asked.' },
      { q: 'How do I contact support?', a: 'Email us at hello@orbitguards.com and our team will get back to you within 2 to 3 business days to help with any issues.' },
    ]
  },
  {
    category: 'Miscellaneous',
    items: [
      { q: 'What is the stacking system?', a: 'Each Orbit is 2.5cm tall and splits into two halves. Stack two to reach 5cm for taller stems or gaming chairs. Since the sizes of chairs wheels vary, you are allowed to split the OrbitGuard in half horizontally so it is easier to place an OrbitGuard on different caster wheel chairs.' },
      { q: 'Are they really pet-safe?', a: 'Yes. The rounded, closed shell means no gap for a tail, paw, or cable to get pinched. We tested every colorway with three very curious cats.' },
    ]
  }
];

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
