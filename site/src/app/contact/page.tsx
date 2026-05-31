'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import type { Variant } from '@/components/types';

const POLAR: Variant = {
  key: 'polar', name: 'Polar', hex: '#F4F4F0', bg: '#FFFFFF', text: '#1A1B1F',
  ring: '#5A74FF', accent: '#06D6A0',
  headline: { line1: 'Pure,', lasso: 'Polar', line2: 'minimal.' },
  price: 24, blurb: '', features: [], floatChips: [], dark: false,
};

const inputStyle: React.CSSProperties = {
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
  appearance: 'none',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-ui)',
  fontWeight: 600,
  fontSize: 14,
  marginBottom: 8,
  color: 'var(--fg)',
};

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'og_contact_submission',
        JSON.stringify({ name, email, subject, message, ts: Date.now() }),
      );
    }
    setSubmitted(true);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: 'var(--fg)' }}>
      <Header dark={false} variant={POLAR} />

      {/* Hero */}
      <section
        className="og-page-hero"
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
              fontSize: 'clamp(48px, 6vw, 80px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              margin: '0 0 20px',
            }}
          >
            Say hello.
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
            We&apos;re a small team and we read every message. Expect a reply within two to three business days.
          </p>
        </div>
      </section>

      {/* Two-column layout */}
      <section className="og-page-pad" style={{ padding: '80px 56px' }}>
        <div
          className="og-contact-grid"
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '2fr 3fr',
            gap: 64,
            alignItems: 'flex-start',
          }}
        >
          {/* LEFT: Contact info cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              {
                title: 'General',
                email: 'hello@orbitguards.com',
                desc: 'Questions, feedback, or just want to say hi.',
              },
              {
                title: 'Orders & Support',
                email: 'support@orbitguards.com',
                desc: 'Order status, fit questions, or anything about your Orbit.',
              },
              {
                title: 'Press',
                email: 'press@orbitguards.com',
                desc: 'Coverage, review units, or brand assets.',
              },
            ].map(card => (
              <div
                key={card.title}
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: '24px 28px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 15,
                    color: 'var(--fg)',
                    marginBottom: 6,
                  }}
                >
                  {card.title}
                </div>
                <a
                  href={`mailto:${card.email}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    color: '#5A74FF',
                    textDecoration: 'none',
                    display: 'block',
                    marginBottom: 10,
                    fontWeight: 600,
                  }}
                >
                  {card.email}
                </a>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: 'var(--fg-3)',
                    lineHeight: 1.5,
                  }}
                >
                  {card.desc}
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Contact form */}
          <div>
            {submitted ? (
              <div
                style={{
                  padding: '48px 40px',
                  background: 'var(--success-bg)',
                  border: '1px solid #A3DFC3',
                  borderRadius: 20,
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 22,
                  }}
                >
                  &#10003;
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 22,
                    color: 'var(--success)',
                    marginBottom: 10,
                  }}
                >
                  Message received.
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: '#1A6649',
                    lineHeight: 1.6,
                  }}
                >
                  We&apos;ll reply to your email within two to three business days.
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#5A74FF'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = '#5A74FF'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Subject</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    style={{
                      ...inputStyle,
                      cursor: 'pointer',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%234B5560' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center',
                      paddingRight: 44,
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = '#5A74FF'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <option>General question</option>
                    <option>Order support</option>
                    <option>Press inquiry</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Message</label>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                    placeholder="How can we help?"
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                      lineHeight: 1.6,
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
                    padding: '16px 36px',
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
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section
        className="og-page-pad"
        style={{
          padding: '28px 56px',
          background: 'var(--bg-inset)',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--fg-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            margin: 0,
          }}
        >
          Based in Atlanta, Georgia &middot; Reply within 2 to 3 business days &middot;{' '}
          <a
            href="mailto:hello@orbitguards.com"
            style={{ color: '#5A74FF', textDecoration: 'none', fontWeight: 600 }}
          >
            hello@orbitguards.com
          </a>
        </p>
      </section>


    </div>
  );
}
