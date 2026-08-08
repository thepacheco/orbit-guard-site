'use client';

import React, { useState } from 'react';

interface TickerCard {
  id: string;
  img: string;
  title: string;
  tag: string;
  backHeading: string;
  backDesc: string;
  backStat: string;
}

const CARDS: TickerCard[] = [
  {
    id: '1',
    img: '/assets/atlanta_office_empty.png',
    title: 'Atlanta Design Lab',
    tag: 'Studio & Prototyping',
    backHeading: 'Designed in Atlanta',
    backDesc: 'Where 40+ iterations of TPU guards were 3D printed, tested, and refined.',
    backStat: '40+ Prototypes Built',
  },
  {
    id: '2',
    img: '/assets/HomePage_OnChair_Photos/OnChair1.png',
    title: 'Cable & Pet Deflection',
    tag: 'Safety Guard',
    backHeading: 'Pinch Prevention',
    backDesc: 'Rides flush to the floor to push charging cords and pet tails out of caster wheels.',
    backStat: '100% Floor Safe',
  },
  {
    id: '3',
    img: '/assets/HomePage_OnChair_Photos/OnChair2.png',
    title: 'Whisper-Quiet Smooth Glide',
    tag: 'Acoustic Sound Dampening',
    backHeading: 'Noise Reduction',
    backDesc: 'Soft-touch TPU polymer absorbs wheel chatter across tile, wood, and rug.',
    backStat: 'Ultra-Quiet Operation',
  },
  {
    id: '4',
    img: '/assets/HomePage_OnChair_Photos/OnChair3.png',
    title: '5-Second Snap Architecture',
    tag: 'Tool-Free Assembly',
    backHeading: 'Universal Snap Fit',
    backDesc: 'Two precision-molded halves interlock tightly around standard 7mm-11mm stems.',
    backStat: 'Zero Tools Required',
  },
  {
    id: '5',
    img: '/assets/lp_pets/LP_Pets1.png',
    title: 'Edison the Cat',
    tag: 'Chief Inspiration',
    backHeading: 'The Origin Story',
    backDesc: 'Edison had a close call with a rolling caster wheel, inspiring Orbit Guard in 2023.',
    backStat: 'Pet Protection First',
  },
  {
    id: '6',
    img: '/assets/start_product_photos/Mix_and_Match.png',
    title: 'Mix & Match Dual-Tone',
    tag: '144 Color Combos',
    backHeading: 'Pantone Palette',
    backDesc: 'Custom mix top and bottom housing colors to match your desk setup aesthetic.',
    backStat: '144 Combinations',
  },
];

export default function TickerPhotoMarquee() {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  // Duplicate cards array to create endless seamless ticker stream
  const tickerItems = [...CARDS, ...CARDS];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '20px 0 40px' }}>
      {/* Conveyor Belt Track Container */}
      <div
        className="og-ticker-track"
        style={{
          display: 'flex',
          gap: 24,
          width: 'max-content',
        }}
      >
        {tickerItems.map((card, idx) => {
          const isFlipped = flippedCard === `${card.id}-${idx}`;

          return (
            <div
              key={`${card.id}-${idx}`}
              onMouseEnter={() => setFlippedCard(`${card.id}-${idx}`)}
              onMouseLeave={() => setFlippedCard(null)}
              style={{
                width: 320,
                height: 420,
                perspective: 1000,
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {/* Flip Card Inner */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transition: 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* FRONT FACE */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.06)',
                    background: '#FFFFFF',
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Top Tag Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      background: 'rgba(15,23,42,0.82)',
                      backdropFilter: 'blur(8px)',
                      color: '#05CE78',
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '4px 12px',
                      borderRadius: 99,
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {card.tag}
                  </div>

                  {/* Bottom Title Bar */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(15,23,42,0.85) 0%, transparent 100%)',
                      padding: '24px 20px 16px',
                      color: '#FFFFFF',
                    }}
                  >
                    <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 18, margin: 0 }}>
                      {card.title}
                    </h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                      Hover to flip info &rarr;
                    </div>
                  </div>
                </div>

                {/* BACK FACE */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderRadius: 24,
                    padding: 32,
                    background: '#0F172A',
                    color: '#FFFFFF',
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        color: '#5A74FF',
                        textTransform: 'uppercase',
                        letterSpacing: '0.14em',
                        fontWeight: 700,
                        marginBottom: 12,
                      }}
                    >
                      {card.tag}
                    </div>

                    <h3
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 800,
                        fontSize: 22,
                        lineHeight: 1.25,
                        margin: '0 0 16px',
                        color: '#FFFFFF',
                      }}
                    >
                      {card.backHeading}
                    </h3>

                    <p style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
                      {card.backDesc}
                    </p>
                  </div>

                  <div
                    style={{
                      borderTop: '1px solid rgba(255,255,255,0.12)',
                      paddingTop: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 800, color: '#05CE78' }}>
                      {card.backStat}
                    </span>
                    <span style={{ fontSize: 12, color: '#64748B' }}>Atlanta Lab</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global CSS for Continuous Conveyor Belt Ticker Animation */}
      <style jsx global>{`
        @keyframes ogConveyor {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .og-ticker-track {
          animation: ogConveyor 32s linear infinite;
        }

        .og-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
