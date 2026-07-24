'use client';

import React from 'react';

const ALL_PAGES = [
  '/',
  '/shop',
  '/press',
  '/faq',
  '/about',
  '/contact',
  '/playground',
  '/lp/gamer',
  '/lp/office',
  '/lp/pets',
  '/lp/desk',
  '/lp/back-to-school',
  '/lp/launch',
  '/lp/gifting',
  '/lp/meet-orbit',
  '/lp/meeting-orbit',
  '/lp/orbit-intro',
];

export default function AdminPage() {
  const openAll = () => {
    // Browsers often block or duplicate tabs if opened simultaneously in a loop.
    // Adding a slight delay between opens ensures they all trigger correctly.
    ALL_PAGES.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, `_blank_${index}`);
      }, index * 100);
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-ui)', padding: '60px 20px' }}>
      <div style={{ textAlign: 'center', maxWidth: 600, width: '100%' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Admin Dashboard</h1>
        <p style={{ opacity: 0.6, marginBottom: 24 }}>Useful tools for testing the site layout and components.</p>
        
        <button
          onClick={openAll}
          style={{
            background: 'var(--og-blue)',
            color: '#fff',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 16,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(90,116,255,0.4)',
            marginBottom: 12,
          }}
        >
          Open All Pages in New Tabs
        </button>
        <p style={{ fontSize: 12, opacity: 0.5, marginBottom: 40 }}>Note: Your browser must allow popups for this site.</p>

        <div style={{ textAlign: 'left', background: 'var(--bg-inset)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>All Pages ({ALL_PAGES.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {ALL_PAGES.map(url => (
              <a key={url} href={url} target="_blank" rel="noreferrer" style={{ color: 'var(--og-blue)', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                {url === '/' ? '/ (Home)' : url}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
