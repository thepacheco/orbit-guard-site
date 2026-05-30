'use client';

import React, { useEffect, useState } from 'react';
import { SITE_CONFIG } from '../config/products';

const LAUNCH = new Date(SITE_CONFIG.launchDate);
const DISMISS_KEY = 'og_announce_dismissed';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  done: boolean;
}

function computeTimeLeft(): TimeLeft {
  const diff = LAUNCH.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: false,
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

export default function AnnounceBar() {
  // null until mounted, so server and first client render match (SSR safe).
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setVisible(true);
    setTimeLeft(computeTimeLeft());
    setMounted(true);
    
    const id = setInterval(() => setTimeLeft(computeTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Keep a CSS var in sync so the floating header can offset itself.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.setProperty(
      '--og-announce-h',
      visible ? '44px' : '0px',
    );
    return () => {
      document.documentElement.style.setProperty('--og-announce-h', '0px');
    };
  }, [visible]);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISMISS_KEY, '1');
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  // Stable placeholder until mounted (timeLeft === null) to avoid hydration mismatch.
  let timerNode: React.ReactNode;
  if (timeLeft === null) {
    timerNode = (
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        --d --h --m --s
      </span>
    );
  } else if (timeLeft.done) {
    timerNode = null;
  } else {
    timerNode = (
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {timeLeft.days}d {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m{' '}
        {pad(timeLeft.seconds)}s
      </span>
    );
  }

  const isLive = timeLeft !== null && timeLeft.done;

  return (
    <div
      role="region"
      aria-label="Launch announcement"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#05CE78', // Kickstarter green
        color: '#0A0A0A',
        fontFamily: 'var(--font-ui)',
        fontSize: 14,
        lineHeight: 1,
        padding: '0 48px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'nowrap',
          minWidth: 0,
        }}
      >
        <span
          className="og-announce-label"
          style={{
            fontFamily: 'var(--font-mono)',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontSize: 11,
            fontWeight: 600,
            opacity: 0.75,
            whiteSpace: 'nowrap',
          }}
        >
          Live on Kickstarter
        </span>

        {isLive ? (
          <a
            href={SITE_CONFIG.kickstarterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="og-announce-link"
            style={{
              color: '#0A0A0A',
              textDecoration: 'none',
              fontWeight: 800,
              whiteSpace: 'nowrap',
              background: '#FFD700',
              padding: '6px 14px',
              borderRadius: 999,
              marginLeft: 12,
              boxShadow: '0 4px 12px rgba(255,215,0,0.32)',
            }}
          >
            Now live — back us on Kickstarter →
          </a>
        ) : (
          <>
            <span className="og-hide-mobile" style={{ whiteSpace: 'nowrap', opacity: 0.95 }}>
              {`${SITE_CONFIG.kickstarterFunded}% funded`} — launches in
            </span>
            <span className="og-show-mobile" style={{ whiteSpace: 'nowrap', opacity: 0.95, fontWeight: 700 }}>
              {`${SITE_CONFIG.kickstarterFunded}% funded`}
            </span>
            <span className="og-hide-mobile">
              {timerNode}
            </span>
            <a
              href={SITE_CONFIG.kickstarterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="og-announce-link"
              style={{
                color: '#0A0A0A',
                textDecoration: 'none',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                background: '#FFD700',
                padding: '6px 14px',
                borderRadius: 999,
                marginLeft: 12,
                boxShadow: '0 4px 12px rgba(255,215,0,0.32)',
              }}
            >
              Back us →
            </a>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        style={{
          position: 'absolute',
          right: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          width: 28,
          height: 28,
          display: 'grid',
          placeItems: 'center',
          background: 'transparent',
          border: 'none',
          color: '#0A0A0A',
          opacity: 0.8,
          cursor: 'pointer',
          fontSize: 18,
          lineHeight: 1,
          borderRadius: '50%',
          transition: 'opacity 140ms var(--ease-out)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '0.8';
        }}
      >
        ×
      </button>
    </div>
  );
}
