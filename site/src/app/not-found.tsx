import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-ui)',
    }}>
      {/* Top accent strip */}
      <div style={{ height: 6, background: 'var(--og-blue)', width: '100%' }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 40px', textAlign: 'center',
      }}>
        {/* Large orbit ring illustration */}
        <div style={{ position: 'relative', width: 140, height: 140, marginBottom: 40 }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            border: '10px solid #E2E7FF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: 'var(--og-blue)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff' }} />
            </div>
          </div>
        </div>

        <div style={{
          fontWeight: 800, fontSize: 'clamp(80px, 15vw, 120px)',
          lineHeight: 1, color: 'var(--og-blue)', letterSpacing: '-0.04em',
          marginBottom: 16,
        }}>404</div>

        <h1 style={{
          fontWeight: 700, fontSize: 'clamp(22px, 4vw, 32px)',
          letterSpacing: '-0.02em', margin: '0 0 12px', color: 'var(--fg)',
        }}>This page rolled away.</h1>

        <p style={{
          fontSize: 17, color: 'var(--fg-2)', lineHeight: 1.65,
          maxWidth: 400, margin: '0 0 10px',
        }}>
          The page you are looking for is not here.
        </p>
        <p style={{
          fontSize: 15, color: 'var(--fg-3)', margin: '0 0 40px',
        }}>
          (Your chair wheels are still safe though.)
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            background: 'var(--og-blue)', color: '#fff', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 999, fontWeight: 700, fontSize: 15,
            boxShadow: 'var(--shadow-blue)',
          }}>Back home</Link>
          <Link href="/shop" style={{
            background: 'transparent', color: 'var(--fg)', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 999, fontWeight: 700, fontSize: 15,
            boxShadow: 'inset 0 0 0 1.5px var(--border-strong)',
          }}>Shop Orbits</Link>
          <Link href="/faq" style={{
            background: 'transparent', color: 'var(--fg-2)', textDecoration: 'none',
            padding: '14px 32px', borderRadius: 999, fontWeight: 600, fontSize: 14,
          }}>See FAQ</Link>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid var(--border)', padding: '20px 40px',
        textAlign: 'center', fontSize: 13, color: 'var(--fg-3)',
      }}>
        &copy; 2026 OrbitGuard, Inc. &middot; Atlanta, GA
      </div>
    </div>
  );
}
