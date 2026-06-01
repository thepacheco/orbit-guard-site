import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Apple touch icon — same Orbit brand mark, sized for iOS home-screen tiles.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: '#5A74FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="128" height="128" viewBox="0 0 100 100">
          <path
            fill="#fff"
            d="M50 6c24.3 0 44 19.7 44 44S74.3 94 50 94 6 74.3 6 50 25.7 6 50 6Zm0 14c-16.6 0-30 13.4-30 30s13.4 30 30 30 30-13.4 30-30c0-6.4-2-12.3-5.4-17.1l-7.2 7.2A20 20 0 1 1 65.9 27.2l7.2-7.2A29.9 29.9 0 0 0 50 20Z"
          />
          <circle cx="50" cy="50" r="10" fill="#fff" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
