'use client';

import React from 'react';

const ALL_PAGES = [
  '/',
  '/shop',
  '/press',
  '/faq',
  '/about',
  '/contact',
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
  '/admin/config',
];

export default function AdminPage() {
  const openAll = () => {
    ALL_PAGES.forEach(url => {
      window.open(url, '_blank');
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-ui)' }}>
      <div style={{ textAlign: 'center' }}>
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
          }}
        >
          Open All Pages in New Tabs
        </button>
        <p style={{ marginTop: 12, fontSize: 12, opacity: 0.5 }}>Note: Your browser must allow popups for this site.</p>
      </div>
    </div>
  );
}
