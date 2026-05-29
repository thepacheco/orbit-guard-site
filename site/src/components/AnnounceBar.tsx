'use client';

import React, { useEffect, useState } from 'react';

const LAUNCH = new Date('2026-09-01T00:00:00Z');
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

  useEffect(() => {
    // Read dismissal state on the client only.
    const dismissed =
      typeof window !== 'undefined' &&
      window.localStorage.getItem(DISMISS_KEY) === '1';
    if (dismissed) {
      setVisible(false);
      return;
    }

    setVisible(true);
    setTimeLeft(computeTimeLeft());
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

  if (!visible) return null;

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
        background: 'var(--og-blue)',
        color: '#fff',
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
            href="https://www.kickstarter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="og-announce-link"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            Now live — back us on Kickstarter →
          </a>
        ) : (
          <>
            <span style={{ whiteSpace: 'nowrap', opacity: 0.95 }}>
              342% funded — launches in
            </span>
            {timerNode}
            <a
              href="https://www.kickstarter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="og-announce-link"
              style={{
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 700,
                whiteSpace: 'nowrap',
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
          color: '#fff',
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
