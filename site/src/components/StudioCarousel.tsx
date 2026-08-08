'use client';

import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

interface CarouselPhoto {
  src: string;
  title: string;
  subtitle: string;
}

const PHOTOS: CarouselPhoto[] = [
  {
    src: '/assets/atlanta_office_empty.png',
    title: 'Atlanta Studio & Engineering Lab',
    subtitle: 'Where 40+ iterations of TPU guards were designed, printed, and impact tested.',
  },
  {
    src: '/assets/HomePage_OnChair_Photos/OnChair1.png',
    title: 'Pet & Cable Shielding in Action',
    subtitle: 'Rides flush to the floor pushing low-profile obstacles away before they catch under wheels.',
  },
  {
    src: '/assets/HomePage_OnChair_Photos/OnChair2.png',
    title: 'Whisper-Quiet Smooth Glide',
    subtitle: 'Soft-touch polymer absorbs floor vibration and wheel noise across hardwood and rug.',
  },
  {
    src: '/assets/HomePage_OnChair_Photos/OnChair3.png',
    title: 'Interlocking Split Architecture',
    subtitle: 'Two precision-molded halves snap tightly around caster stems in under 5 seconds.',
  },
  {
    src: '/assets/lp_pets/LP_Pets1.png',
    title: 'Edison — Chief Safety Inspiration',
    subtitle: 'The curious cat whose near-miss with a rolling chair wheel started it all.',
  },
];

export default function StudioCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIdx(prev => (prev + 1) % PHOTOS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activePhoto = PHOTOS[currentIdx];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ position: 'relative', width: '100%' }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2.2fr 1fr',
          gap: 24,
          alignItems: 'stretch',
          minHeight: 480,
        }}
      >
        {/* Main Active Hero Photo Stage */}
        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 20px 48px rgba(0,0,0,0.08)',
            border: '1px solid #E2E8F0',
            background: '#0F172A',
            minHeight: 480,
          }}
        >
          <img
            key={activePhoto.src}
            src={activePhoto.src}
            alt={activePhoto.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'opacity 600ms ease, transform 600ms ease',
            }}
          />

          {/* Bottom Gradient overlay & caption */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, transparent 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 32,
              color: '#FFFFFF',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#05CE78', textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 700, marginBottom: 8 }}>
              Gallery 0{currentIdx + 1} / 0{PHOTOS.length}
            </div>
            <h3 style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 26, margin: '0 0 6px', color: '#FFFFFF' }}>
              {activePhoto.title}
            </h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: 0, maxWidth: 560, lineHeight: 1.5 }}>
              {activePhoto.subtitle}
            </p>
          </div>

          {/* Navigation Controls */}
          <button
            aria-label="Previous photo"
            onClick={() => setCurrentIdx((currentIdx - 1 + PHOTOS.length) % PHOTOS.length)}
            style={{
              position: 'absolute',
              left: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: '#0F172A',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
              transition: 'transform 140ms ease',
            }}
          >
            <LucideIcons.ChevronLeft size={22} strokeWidth={2.2} />
          </button>

          <button
            aria-label="Next photo"
            onClick={() => setCurrentIdx((currentIdx + 1) % PHOTOS.length)}
            style={{
              position: 'absolute',
              right: 20,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.9)',
              color: '#0F172A',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 6px 16px rgba(0,0,0,0.18)',
              transition: 'transform 140ms ease',
            }}
          >
            <LucideIcons.ChevronRight size={22} strokeWidth={2.2} />
          </button>
        </div>

        {/* Right Thumbnail Strip */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'space-between' }}>
          {PHOTOS.map((photo, idx) => {
            const isActive = idx === currentIdx;
            return (
              <button
                key={photo.src}
                onClick={() => setCurrentIdx(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: 10,
                  borderRadius: 16,
                  border: isActive ? '2px solid #5A74FF' : '1px solid #E2E8F0',
                  background: isActive ? '#FFFFFF' : '#F8FAFC',
                  boxShadow: isActive ? '0 6px 20px rgba(90,116,255,0.15)' : 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 200ms ease',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: 70,
                    height: 56,
                    borderRadius: 10,
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  <img src={photo.src} alt={photo.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {photo.title}
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: isActive ? '#5A74FF' : '#64748B', marginTop: 2 }}>
                    0{idx + 1} / 0{PHOTOS.length}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pagination Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        {PHOTOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIdx(i)}
            style={{
              width: i === currentIdx ? 24 : 8,
              height: 8,
              borderRadius: 999,
              background: i === currentIdx ? '#5A74FF' : '#CBD5E1',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}
