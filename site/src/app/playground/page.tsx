'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { PRODUCT_VARIANTS } from '../../components/data';

const Product3DViewer = dynamic(() => import('../../components/Product3DViewer'), { ssr: false });

export default function PlaygroundPage() {
  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(3);
  const [exploded, setExploded] = useState(false);

  // Listen for camera position logs from the viewer's camlog feature
  const [camPos, setCamPos] = useState('[104.74, -96.92, 138.54]');

  useEffect(() => {
    // Intercept console.log to capture camera position output from Product3DViewer
    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      const msg = String(args[0] ?? '');
      if (msg.startsWith('cameraPosition=')) {
        // Extract the array portion: cameraPosition={[x, y, z]}
        const match = msg.match(/\[([^\]]+)\]/);
        if (match) setCamPos(`[${match[1]}]`);
      }
      originalLog.apply(console, args);
    };
    return () => { console.log = originalLog; };
  }, []);

  const topVariant = PRODUCT_VARIANTS[topIdx];
  const bottomVariant = PRODUCT_VARIANTS[bottomIdx];

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#eee', fontFamily: 'monospace', padding: 32 }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>🎯 Camera Playground</h1>
      <p style={{ color: '#999', marginBottom: 24, maxWidth: 600 }}>
        Drag to rotate, scroll to zoom. When you stop dragging, the coordinates update below.
        Tell me the coordinates once you have the angle you want.
      </p>

      <div style={{ display: 'flex', gap: 32 }}>
        {/* 3D Viewer */}
        <div style={{ width: 600, height: 500, background: '#1a1a1a', borderRadius: 12, overflow: 'hidden', position: 'relative' }}>
          {/* Force camlog mode by appending to URL - but we already intercept console.log */}
          <Product3DViewer
            topColor={topVariant.hex}
            bottomColor={bottomVariant.hex}
            exploded={exploded}
            float={false}
            spin={false}
            autoRotate={false}
            interactive={true}
            cameraPosition={[104.74, -96.92, 138.54]}
          />
        </div>

        {/* Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, minWidth: 280 }}>
          {/* Camera Position Display */}
          <div style={{ background: '#1a1a1a', padding: 20, borderRadius: 12, border: '1px solid #333' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 8 }}>
              Camera Position
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#4ade80', wordBreak: 'break-all' }}>
              {camPos}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(`cameraPosition={${camPos}}`)}
              style={{
                marginTop: 12, padding: '8px 16px', background: '#333', color: '#eee',
                border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13
              }}
            >
              Copy to clipboard
            </button>
          </div>

          {/* Exploded Toggle */}
          <div style={{ background: '#1a1a1a', padding: 20, borderRadius: 12, border: '1px solid #333' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 12 }}>
              Assembly
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={exploded} onChange={e => setExploded(e.target.checked)} />
              <span>Exploded view</span>
            </label>
          </div>

          {/* Color Pickers */}
          <div style={{ background: '#1a1a1a', padding: 20, borderRadius: 12, border: '1px solid #333' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 12 }}>
              Top Color
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PRODUCT_VARIANTS.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => setTopIdx(i)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', background: v.hex, border: topIdx === i ? '3px solid white' : '3px solid transparent',
                    cursor: 'pointer', transition: 'border 150ms ease',
                  }}
                  title={v.name}
                />
              ))}
            </div>
          </div>

          <div style={{ background: '#1a1a1a', padding: 20, borderRadius: 12, border: '1px solid #333' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888', marginBottom: 12 }}>
              Bottom Color
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {PRODUCT_VARIANTS.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => setBottomIdx(i)}
                  style={{
                    width: 32, height: 32, borderRadius: '50%', background: v.hex, border: bottomIdx === i ? '3px solid white' : '3px solid transparent',
                    cursor: 'pointer', transition: 'border 150ms ease',
                  }}
                  title={v.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
