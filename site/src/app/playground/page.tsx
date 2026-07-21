'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { PRODUCT_VARIANTS } from '../../components/data';
import UNIQUE_MIX_NAMES from '../../components/names.json';
import * as LucideIcons from 'lucide-react';

const Product3DViewer = dynamic(() => import('../../components/Product3DViewer'), { ssr: false });

function getMixName(topKey: string, bottomKey: string): string {
  if (topKey === bottomKey) return PRODUCT_VARIANTS.find(v => v.key === topKey)?.name || 'Pure Edition';
  const canonical = [topKey, bottomKey].sort().join('|');
  return (UNIQUE_MIX_NAMES as Record<string, string>)[canonical] || 'Custom Fusion';
}

export default function PlaygroundPage() {
  const [topIdx, setTopIdx] = useState(0);
  const [bottomIdx, setBottomIdx] = useState(3);
  const [exploded, setExploded] = useState(false);
  const [spin, setSpin] = useState(false);
  const [floatMode, setFloatMode] = useState(true);
  const [stackCount, setStackCount] = useState(1);
  const [customTitle, setCustomTitle] = useState('');
  
  // Camera Position tracking
  const [camPosStr, setCamPosStr] = useState('[0.14, -180.0, 24.0]');
  const [camPosArray, setCamPosArray] = useState<[number, number, number]>([0.14, -180.0, 24.0]);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args: unknown[]) => {
      const msg = String(args[0] ?? '');
      if (msg.startsWith('cameraPosition=')) {
        const match = msg.match(/\[([^\]]+)\]/);
        if (match) {
          const raw = `[${match[1]}]`;
          setCamPosStr(raw);
          try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed) && parsed.length === 3) {
              setCamPosArray(parsed as [number, number, number]);
            }
          } catch {
            // keep previous array if parse fails
          }
        }
      }
      originalLog.apply(console, args);
    };
    return () => { console.log = originalLog; };
  }, []);

  const topVariant = PRODUCT_VARIANTS[topIdx];
  const bottomVariant = PRODUCT_VARIANTS[bottomIdx];
  const comboName = customTitle || getMixName(topVariant.key, bottomVariant.key);

  // Preset angles
  const applyPreset = (pos: [number, number, number], exp = false, float = true) => {
    setCamPosArray(pos);
    setCamPosStr(`[${pos.join(', ')}]`);
    setExploded(exp);
    setFloatMode(float);
  };

  // PNG Exporter
  const exportPNG = () => {
    if (!previewContainerRef.current) return;
    const canvas = previewContainerRef.current.querySelector('canvas');
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `orbit-guard-${topVariant.key}-${bottomVariant.key}-brand-asset.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to export PNG:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0c', color: '#f3f4f6', fontFamily: 'var(--font-body, system-ui, sans-serif)', padding: '0 0 60px' }}>
      
      {/* Header */}
      <header style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(10,10,12,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, #5A74FF, #A292FF)', display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: 16, color: '#fff' }}>O</div>
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', fontFamily: 'var(--font-ui, sans-serif)' }}>Orbit Guard</span>
          </a>
          <span style={{ background: 'rgba(255,255,255,0.1)', fontSize: 11, padding: '3px 9px', borderRadius: 20, fontFamily: 'monospace', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#a1a1aa' }}>Brand Studio & Playground</span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={exportPNG}
            style={{
              padding: '10px 20px', background: '#fff', color: '#09090b', border: 'none', borderRadius: 999, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, boxShadow: '0 4px 14px rgba(255,255,255,0.15)', transition: 'all 150ms ease'
            }}
          >
            <LucideIcons.Download size={16} />
            Export Brand PNG
          </button>
        </div>
      </header>

      {/* Main Studio Grid */}
      <div style={{ maxWidth: 1380, margin: '40px auto 0', padding: '0 40px', display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
        
        {/* Left: 3D Stage / Brand Canvas */}
        <div>
          <div
            ref={previewContainerRef}
            style={{
              height: 600,
              background: `radial-gradient(circle at 50% 40%, ${topVariant.hex}18 0%, ${bottomVariant.hex}15 45%, rgba(18,18,22,0.95) 100%)`,
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,0.08)',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 32,
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
          >
            {/* Top Bar Callouts */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 30 }}>
              <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: topVariant.hex }} />
                <span style={{ fontSize: 12, fontFamily: 'monospace', textTransform: 'uppercase' }}>Top: {topVariant.name}</span>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: bottomVariant.hex }} />
                <span style={{ fontSize: 12, fontFamily: 'monospace', textTransform: 'uppercase' }}>Bottom: {bottomVariant.name}</span>
              </div>
            </div>

            {/* 3D Model Stage */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
              <Product3DViewer
                topColor={topVariant.hex}
                bottomColor={bottomVariant.hex}
                exploded={exploded}
                float={floatMode}
                spin={spin}
                autoRotate={false}
                interactive={true}
                cameraPosition={camPosArray}
              />
            </div>

            {/* Bottom Title Card Overlay */}
            <div style={{ zIndex: 30, margin: '0 auto', textAlign: 'center', background: 'rgba(15,15,20,0.75)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', padding: '14px 32px', borderRadius: 16 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', letterSpacing: '-0.01em' }}>
                {comboName}
              </div>
              <div style={{ fontSize: 12, color: '#a1a1aa', fontFamily: 'monospace', textTransform: 'uppercase', marginTop: 2, letterSpacing: '0.1em' }}>
                Orbit Guard Brand Asset · {stackCount} Unit{stackCount > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Quick Camera Presets */}
          <div style={{ marginTop: 24, display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: '#71717a', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '0.1em' }}>Presets:</span>
            <button onClick={() => applyPreset([0.14, -180.0, 24.0], false, true)} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#eee', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              Side Profile (Flat)
            </button>
            <button onClick={() => applyPreset([-17.0, -265.4, -129.6], true, true)} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#eee', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              Exploded View
            </button>
            <button onClick={() => applyPreset([104.74, -96.92, 138.54], false, false)} style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#eee', borderRadius: 8, cursor: 'pointer', fontSize: 13 }}>
              3D Iso View
            </button>
          </div>
        </div>

        {/* Right: Studio Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Preset Name Editor */}
          <div style={{ background: '#121217', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a1a1aa', marginBottom: 12, fontWeight: 700 }}>
              Combination Title
            </div>
            <input
              type="text"
              value={customTitle}
              onChange={e => setCustomTitle(e.target.value)}
              placeholder={getMixName(topVariant.key, bottomVariant.key)}
              style={{
                width: '100%', padding: '12px 16px', background: '#18181f', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 10, color: '#fff', fontSize: 15, fontFamily: 'inherit', outline: 'none'
              }}
            />
          </div>

          {/* Color Selection Studio */}
          <div style={{ background: '#121217', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a1a1aa', marginBottom: 14, fontWeight: 700 }}>
              Top Piece Color
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
              {PRODUCT_VARIANTS.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => setTopIdx(i)}
                  style={{
                    width: 34, height: 34, borderRadius: '50%', background: v.hex, border: topIdx === i ? '3px solid #fff' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 150ms ease', boxShadow: topIdx === i ? '0 0 12px ' + v.hex + '80' : 'none'
                  }}
                  title={v.name}
                />
              ))}
            </div>

            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a1a1aa', marginBottom: 14, fontWeight: 700 }}>
              Bottom Piece Color
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {PRODUCT_VARIANTS.map((v, i) => (
                <button
                  key={v.key}
                  onClick={() => setBottomIdx(i)}
                  style={{
                    width: 34, height: 34, borderRadius: '50%', background: v.hex, border: bottomIdx === i ? '3px solid #fff' : '2px solid transparent',
                    cursor: 'pointer', transition: 'all 150ms ease', boxShadow: bottomIdx === i ? '0 0 12px ' + v.hex + '80' : 'none'
                  }}
                  title={v.name}
                />
              ))}
            </div>
          </div>

          {/* View Motion & Assembly Controls */}
          <div style={{ background: '#121217', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a1a1aa', fontWeight: 700 }}>
              Assembly & Animation
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#e4e4e7' }}>
              <span>Exploded View (Detached)</span>
              <input type="checkbox" checked={exploded} onChange={e => setExploded(e.target.checked)} style={{ accentColor: '#5A74FF', width: 18, height: 18 }} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#e4e4e7' }}>
              <span>3D Turntable Spin</span>
              <input type="checkbox" checked={spin} onChange={e => setSpin(e.target.checked)} style={{ accentColor: '#5A74FF', width: 18, height: 18 }} />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#e4e4e7' }}>
              <span>Idle Floating Bob</span>
              <input type="checkbox" checked={floatMode} onChange={e => setFloatMode(e.target.checked)} style={{ accentColor: '#5A74FF', width: 18, height: 18 }} />
            </label>
          </div>

          {/* Live Camera Vector Output for Devs/Designers */}
          <div style={{ background: '#121217', padding: 24, borderRadius: 20, border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#a1a1aa', marginBottom: 10, fontWeight: 700 }}>
              Camera Vector Coordinates
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: 14, color: '#4ade80', background: '#18181f', padding: '10px 14px', borderRadius: 8, wordBreak: 'break-all', border: '1px solid rgba(255,255,255,0.06)' }}>
              {camPosStr}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(`cameraPosition={${camPosStr}}`)}
              style={{
                marginTop: 12, width: '100%', padding: '10px', background: 'rgba(255,255,255,0.08)', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'background 150ms ease'
              }}
            >
              Copy Vector to Clipboard
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
