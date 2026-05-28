'use client';

import React, { useState } from 'react';

export default function NotifyForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    if (typeof window !== 'undefined') {
      localStorage.setItem('og_notify_email', email.trim());
    }
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
        maxWidth: 460,
        width: '100%',
      }}
    >
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email to get notified when we launch"
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
          minWidth: 280,
          maxWidth: 400,
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
  );
}
