import { ImageResponse } from 'next/og';
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';
export default function Icon() {
  return new ImageResponse(
    <div style={{
      width: 64, height: 64, borderRadius: 16,
      background: '#5A74FF',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        border: '5px solid white',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'white' }}/>
      </div>
    </div>,
    { ...size }
  );
}
