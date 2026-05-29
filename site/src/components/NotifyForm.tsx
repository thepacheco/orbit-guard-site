'use client';

import React, { useState } from 'react';

async function saveSignupToSheets(email: string) {
  const url = process.env.NEXT_PUBLIC_SHEETS_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        type: 'signup',
        email,
        source: 'homepage-notify',
      }),
    });
  } catch {}
}

export default function NotifyForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('og_notify_email', email.trim());
    }
    saveSignupToSheets(email.trim()).then(() => {});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          borderRadius: 999,
          padding: '14px 24px',
          fontFamily: 'var(--font-ui)',
          fontWeight: 600,
          fontSize: 15,
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        ✓ You&apos;re on the list! We&apos;ll email you at launch.
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, width: '100%', maxWidth: 520 }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: 0,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.3)',
          padding: 4,
          width: '100%',
        }}
      >
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            padding: '10px 16px',
            fontFamily: 'var(--font-ui)',
            fontSize: 14,
            color: '#fff',
            minWidth: 260,
          }}
        />
        <button
          type="submit"
          style={{
            background: '#fff',
            color: 'var(--og-blue)',
            border: 'none',
            borderRadius: 999,
            padding: '10px 20px',
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          Notify me →
        </button>
      </form>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontFamily: 'var(--font-ui)',
          color: 'rgba(255,255,255,0.80)',
          textAlign: 'center',
        }}
      >
        Enter your email to be notified when we launch on Kickstarter.
      </p>
    </div>
  );
}
