import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', flexDirection: 'column',
      fontFamily: 'var(--font-ui)',
    }}>

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px 40px', textAlign: 'center',
        position: 'relative',
      }}>

        {/* Subtle massive 404 in the background */}
        <div style={{
          position: 'absolute',
          fontSize: 'clamp(200px, 28vw, 360px)',
          fontWeight: 900,
          color: '#F3F4F6',
          letterSpacing: '-0.06em',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}>404</div>

        {/* Product image as centerpiece */}
        <div style={{ position: 'relative', zIndex: 1, marginBottom: 32 }}>
          <img
            src="/assets/start_product_photos/08_Product_Half_Floating_Shot/ProductFloatingHalfShot_Blueberry.png"
            alt="Orbit Guard"
            style={{
              width: 200,
              height: 200,
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))',
            }}
          />
        </div>

        <h1 style={{
          position: 'relative', zIndex: 1,
          fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)',
          letterSpacing: '-0.02em', margin: '0 0 12px', color: '#111827',
        }}>This page rolled away.</h1>

        <p style={{
          position: 'relative', zIndex: 1,
          fontSize: 17, color: '#6B7280', lineHeight: 1.65,
          maxWidth: 400, margin: '0 0 8px',
        }}>
          The page you are looking for is not here.
        </p>
        <p style={{
          position: 'relative', zIndex: 1,
          fontSize: 14, color: '#9CA3AF', margin: '0 0 40px',
        }}>
          (Your chair wheels are still safe though.)
        </p>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" style={{
            background: '#111827', color: '#fff', textDecoration: 'none',
            padding: '14px 36px', borderRadius: 999, fontWeight: 700, fontSize: 15,
            boxShadow: '0 8px 24px rgba(17,24,39,0.12)',
          }}>Go Home</Link>
          <Link href="/shop" style={{
            background: 'transparent', color: '#111827', textDecoration: 'none',
            padding: '14px 36px', borderRadius: 999, fontWeight: 700, fontSize: 15,
            border: '1.5px solid #E5E7EB',
          }}>Shop Orbits</Link>
        </div>
      </div>

      <div style={{
        borderTop: '1px solid #E5E7EB', padding: '20px 40px',
        textAlign: 'center', fontSize: 13, color: '#9CA3AF',
      }}>
        &copy; 2026 OrbitGuard, Inc. &middot; Atlanta, GA
      </div>
    </div>
  );
}
