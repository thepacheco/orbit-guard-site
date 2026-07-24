'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { PRODUCT_VARIANTS } from '../../components/data';
import UNIQUE_MIX_NAMES from '../../components/names.json';
import * as LucideIcons from 'lucide-react';
import { ModelConfig } from '../../components/Playground3DViewer';

const Playground3DViewer = dynamic(() => import('../../components/Playground3DViewer'), { ssr: false });

function getMixName(topKey: string, bottomKey: string): string {
  if (topKey === bottomKey) return PRODUCT_VARIANTS.find(v => v.key === topKey)?.name || 'Pure Edition';
  const canonical = [topKey, bottomKey].sort().join('|');
  return (UNIQUE_MIX_NAMES as Record<string, string>)[canonical] || 'Custom Fusion';
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function PlaygroundPage() {
  // State: Array of models in the scene
  const [models, setModels] = useState<ModelConfig[]>([
    {
      id: generateId(),
      topColor: PRODUCT_VARIANTS[0].hex,
      bottomColor: PRODUCT_VARIANTS[3].hex,
      exploded: false,
      float: false,
      spin: false,
      position: [0, 0, 0],
    }
  ]);

  const [activeId, setActiveId] = useState<string>(models[0].id);
  const activeModel = models.find(m => m.id === activeId) || models[0];

  const [customTitle, setCustomTitle] = useState('');
  
  // Camera state
  const [camPosStr, setCamPosStr] = useState('[104.74, -96.92, 138.54]');
  const [camPosArray, setCamPosArray] = useState<[number, number, number]>([104.74, -96.92, 138.54]);

  const previewContainerRef = useRef<HTMLDivElement>(null);

  const topVariant = PRODUCT_VARIANTS.find(v => v.hex === activeModel.topColor) || PRODUCT_VARIANTS[0];
  const bottomVariant = PRODUCT_VARIANTS.find(v => v.hex === activeModel.bottomColor) || PRODUCT_VARIANTS[3];
  const comboName = customTitle || getMixName(topVariant.key, bottomVariant.key);

  const updateActiveModel = (updates: Partial<ModelConfig>) => {
    setModels(prev => prev.map(m => m.id === activeId ? { ...m, ...updates } : m));
  };

  const handleUpdatePosition = (id: string, pos: [number, number, number]) => {
    setModels(prev => prev.map(m => m.id === id ? { ...m, position: pos } : m));
  };

  const addModel = () => {
    const newId = generateId();
    // Offset new model slightly so it doesn't perfectly overlap
    const offset = models.length * 0.8;
    setModels(prev => [
      ...prev,
      {
        id: newId,
        topColor: PRODUCT_VARIANTS[0].hex,
        bottomColor: PRODUCT_VARIANTS[0].hex,
        exploded: false,
        float: false,
        spin: false,
        position: [offset, 0, -offset],
      }
    ]);
    setActiveId(newId);
  };

  const removeModel = () => {
    if (models.length <= 1) return;
    const newModels = models.filter(m => m.id !== activeId);
    setModels(newModels);
    setActiveId(newModels[0].id);
  };

  // Preset angles
  const applyPreset = (pos: [number, number, number], exp = false, float = false) => {
    setCamPosArray(pos);
    setCamPosStr(`[${pos.join(', ')}]`);
    updateActiveModel({ exploded: exp, float: float });
  };

  // PNG Exporter
  const exportPNG = () => {
    if (!previewContainerRef.current) return;
    const canvas = previewContainerRef.current.querySelector('canvas');
    if (!canvas) return;

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `orbit-guard-scene.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export PNG:', err);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', color: '#111827', fontFamily: 'var(--font-body, system-ui, sans-serif)', padding: '130px 0 80px' }}>
      <div style={{ maxWidth: 1380, margin: '0 auto', padding: '0 40px' }}>

        {/* Page Title Header */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(90, 116, 255, 0.1)', color: '#5A74FF', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              <LucideIcons.Sparkles size={12} />
              Orbit Guard Studio
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', margin: 0, color: '#111827', fontFamily: 'var(--font-ui, sans-serif)' }}>
              3D Playground & Asset Generator
            </h1>
          </div>
          <a
            href="/"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#4b5563', fontWeight: 600, fontSize: 14, background: '#fff', padding: '8px 16px', borderRadius: 10, border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
          >
            <LucideIcons.ArrowLeft size={16} />
            Back to Site
          </a>
        </div>

        {/* Studio Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>
          
          {/* Left Column: 3D Stage + PNG Export Button */}
          <div>
            <div
              ref={previewContainerRef}
              style={{
                height: 560,
                background: `radial-gradient(circle at 50% 45%, ${topVariant.hex}15 0%, ${bottomVariant.hex}10 40%, #ffffff 100%)`,
                borderRadius: 24,
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 28,
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
              }}
            >
              {/* Color Pills Top Overlay (For Active Model) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 30 }}>
                <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1px solid #e5e7eb', padding: '6px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: topVariant.hex }} />
                  <span style={{ fontSize: 12, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 600, color: '#374151' }}>Top: {topVariant.name}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', border: '1px solid #e5e7eb', padding: '6px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: bottomVariant.hex }} />
                  <span style={{ fontSize: 12, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 600, color: '#374151' }}>Bottom: {bottomVariant.name}</span>
                </div>
              </div>

              {/* 3D Viewer Stage */}
              <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
                <Playground3DViewer
                  models={models}
                  activeId={activeId}
                  onSelectModel={setActiveId}
                  onUpdatePosition={handleUpdatePosition}
                  cameraPosition={camPosArray}
                />
              </div>

              {/* Bottom Title Card Overlay */}
              <div style={{ zIndex: 30, margin: '0 auto', textAlign: 'center', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid #e5e7eb', padding: '12px 28px', borderRadius: 14, boxShadow: '0 6px 20px rgba(0,0,0,0.05)' }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#111827', letterSpacing: '-0.01em' }}>
                  {comboName}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280', fontFamily: 'monospace', textTransform: 'uppercase', marginTop: 2, letterSpacing: '0.1em' }}>
                  Top: {topVariant.name} &nbsp;·&nbsp; Bottom: {bottomVariant.name}
                </div>
              </div>
            </div>

            {/* Stage Actions */}
            <div style={{ marginTop: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
              <button
                onClick={exportPNG}
                style={{
                  flex: 1, padding: '16px 28px', background: '#111827', color: '#ffffff', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, boxShadow: '0 6px 20px rgba(17,24,39,0.15)', transition: 'transform 150ms ease, background 150ms ease',
                }}
              >
                <LucideIcons.Download size={18} />
                Export Brand PNG
              </button>

              <button
                onClick={addModel}
                style={{
                  padding: '16px 28px', background: '#fff', border: '1px solid #e5e7eb', color: '#111827', borderRadius: 14, fontWeight: 700, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                }}
              >
                <LucideIcons.Plus size={18} />
                Add Model
              </button>
            </div>
            
            {/* Angle Presets */}
            <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
              <button onClick={() => applyPreset([104.74, -96.92, 138.54], false, false)} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                3D View
              </button>
              <button onClick={() => applyPreset([0.14, -180.0, 24.0], false, false)} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                Flat Profile
              </button>
              <button onClick={() => applyPreset([-17.0, -265.4, -129.6], true, false)} style={{ padding: '10px 16px', background: '#fff', border: '1px solid #e5e7eb', color: '#374151', borderRadius: 10, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
                Detached
              </button>
            </div>
          </div>

          {/* Right Column: Controls Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Model Selection Status */}
            <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: 16, border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#05CE78' }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>
                  Editing Model {models.findIndex(m => m.id === activeId) + 1} of {models.length}
                </div>
              </div>
              {models.length > 1 && (
                <button onClick={removeModel} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 13, fontWeight: 600, padding: 0 }}>
                  Remove
                </button>
              )}
            </div>

            {/* Combination Title Input */}
            <div style={{ background: '#ffffff', padding: 24, borderRadius: 20, border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: 10, fontWeight: 700 }}>
                Combination Title
              </div>
              <input
                type="text"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                placeholder={getMixName(topVariant.key, bottomVariant.key)}
                style={{
                  width: '100%', padding: '12px 16px', background: '#f9fafb', border: '1px solid #d1d5db', borderRadius: 10, color: '#111827', fontSize: 15, fontFamily: 'inherit', outline: 'none'
                }}
              />
            </div>

            {/* Color Selectors */}
            <div style={{ background: '#ffffff', padding: 24, borderRadius: 20, border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: 14, fontWeight: 700 }}>
                Top Piece Color
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                {PRODUCT_VARIANTS.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => updateActiveModel({ topColor: v.hex })}
                    style={{
                      width: 34, height: 34, borderRadius: '50%', background: v.hex, border: activeModel.topColor === v.hex ? '3px solid #111827' : '2px solid transparent',
                      cursor: 'pointer', transition: 'all 150ms ease', boxShadow: activeModel.topColor === v.hex ? '0 0 0 2px #fff' : 'none'
                    }}
                    title={v.name}
                  />
                ))}
              </div>

              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', marginBottom: 14, fontWeight: 700 }}>
                Bottom Piece Color
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {PRODUCT_VARIANTS.map((v) => (
                  <button
                    key={v.key}
                    onClick={() => updateActiveModel({ bottomColor: v.hex })}
                    style={{
                      width: 34, height: 34, borderRadius: '50%', background: v.hex, border: activeModel.bottomColor === v.hex ? '3px solid #111827' : '2px solid transparent',
                      cursor: 'pointer', transition: 'all 150ms ease', boxShadow: activeModel.bottomColor === v.hex ? '0 0 0 2px #fff' : 'none'
                    }}
                    title={v.name}
                  />
                ))}
              </div>
            </div>

            {/* Assembly & Motion Toggles */}
            <div style={{ background: '#ffffff', padding: 24, borderRadius: 20, border: '1px solid #e5e7eb', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#6b7280', fontWeight: 700 }}>
                Assembly & Motion
              </div>
              
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#374151', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }} title="Pull the pieces apart">
                  Detached View
                  <LucideIcons.Info size={14} color="#9ca3af" />
                </span>
                <input type="checkbox" checked={activeModel.exploded} onChange={e => updateActiveModel({ exploded: e.target.checked })} style={{ accentColor: '#111827', width: 18, height: 18 }} />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#374151', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }} title="Slowly spin the model in place">
                  3D Turntable Spin
                  <LucideIcons.Info size={14} color="#9ca3af" />
                </span>
                <input type="checkbox" checked={activeModel.spin} onChange={e => updateActiveModel({ spin: e.target.checked })} style={{ accentColor: '#111827', width: 18, height: 18 }} />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', fontSize: 14, color: '#374151', fontWeight: 500 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }} title="Flip upside-down to show the flat profile">
                  Floating Upside-down
                  <LucideIcons.Info size={14} color="#9ca3af" />
                </span>
                <input type="checkbox" checked={activeModel.float} onChange={e => updateActiveModel({ float: e.target.checked })} style={{ accentColor: '#111827', width: 18, height: 18 }} />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
