import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#fff', fontFamily: 'var(--font-ui)', padding: 40,
      textAlign: 'center',
    }}>
      <img src="/assets/orbit-icon-mark.png" alt="Orbit" style={{ width: 56, height: 56, marginBottom: 32, borderRadius: '50%' }} />
      <div style={{ fontWeight: 800, fontSize: 120, lineHeight: 1, color: '#5A74FF', letterSpacing: '-0.04em', marginBottom: 16 }}>
        404
      </div>
      <h1 style={{ fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em', margin: '0 0 12px', color: '#1A1B1F' }}>
        This page rolled away.
      </h1>
      <p style={{ fontSize: 17, color: '#4B5560', lineHeight: 1.6, maxWidth: 420, margin: '0 0 36px' }}>
        The page you are looking for is not here — but your chair wheels are still safe.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" style={{
          background: '#5A74FF', color: '#fff', textDecoration: 'none',
          padding: '14px 28px', borderRadius: 999,
          fontWeight: 700, fontSize: 15,
        }}>Back home</Link>
        <Link href="/shop" style={{
          background: 'transparent', color: '#1A1B1F', textDecoration: 'none',
          padding: '14px 28px', borderRadius: 999,
          fontWeight: 700, fontSize: 15,
          boxShadow: 'inset 0 0 0 1.5px #ECEAE3',
        }}>Shop Orbits</Link>
      </div>
    </div>
  );
}
