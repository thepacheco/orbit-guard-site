'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem('og_contact_submission', JSON.stringify({ name, email, message, ts: Date.now() }));
    }
    setSubmitted(true);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: 'var(--fg)' }}>
      <Header dark={false} />

      {/* Page header */}
      <section
        style={{
          padding: '160px 56px 80px',
          background: 'var(--bg-inset)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 'clamp(36px, 5vw, 64px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: '0 0 20px',
            }}
          >
            Get in touch
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
              margin: 0,
            }}
          >
            We&apos;d love to hear from you. Whether it&apos;s a question, a collaboration, or
            just to say hi.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section style={{ padding: '80px 56px' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          {submitted ? (
            <div
              style={{
                textAlign: 'center',
                padding: '56px 40px',
                background: '#E6F7EF',
                borderRadius: 24,
                border: '1px solid #A3DFC3',
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 22,
                  color: '#18A06F',
                  marginBottom: 10,
                }}
              >
                Message sent!
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#1A6649' }}>
                Thanks! We&apos;ll get back to you within 24 hours.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 8,
                    color: 'var(--fg)',
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 15,
                    color: 'var(--fg)',
                    background: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 160ms',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#5A74FF'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 8,
                    color: 'var(--fg)',
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 15,
                    color: 'var(--fg)',
                    background: '#fff',
                    outline: 'none',
                    boxSizing: 'border-box',
                    transition: 'border-color 160ms',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#5A74FF'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 14,
                    marginBottom: 8,
                    color: 'var(--fg)',
                  }}
                >
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                  placeholder="How can we help?"
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: '1px solid var(--border)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 15,
                    color: 'var(--fg)',
                    background: '#fff',
                    outline: 'none',
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    transition: 'border-color 160ms',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = '#5A74FF'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: '#5A74FF',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 32px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 16,
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  boxShadow: '0 10px 28px rgba(90,116,255,0.35)',
                  transition: 'transform 140ms',
                }}
                onMouseDown={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'scale(0.97)'; }}
                onMouseUp={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
              >
                Send message →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Info cards */}
      <section
        style={{
          padding: '0 56px 100px',
        }}
      >
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { title: 'General', email: 'hello@orbitguard.com', desc: 'For general questions and feedback' },
              { title: 'Press', email: 'press@orbitguard.com', desc: 'Media inquiries and review units' },
              { title: 'Support', email: 'support@orbitguard.com', desc: 'Order help and returns' },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  padding: '20px',
                  background: 'var(--bg-inset)',
                  borderRadius: 16,
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 15,
                    marginBottom: 6,
                  }}
                >
                  {card.title}
                </div>
                <a
                  href={`mailto:${card.email}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    color: '#5A74FF',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: 8,
                    wordBreak: 'break-all',
                  }}
                >
                  {card.email}
                </a>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--fg-3)', lineHeight: 1.4 }}>
                  {card.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '32px 56px',
          borderTop: '1px solid var(--border)',
          background: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ fontSize: 12, color: 'var(--fg-3)' }}>© 2026 OrbitGuard, Inc.</div>
        <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>Made in Atlanta</div>
      </footer>
    </div>
  );
}
