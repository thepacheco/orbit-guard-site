'use client';

import React, { useState } from 'react';
import { SITE_CONFIG } from '@/config/products';

export default function ConfigAdminPage() {
  const [config, setConfig] = useState<any>(JSON.parse(JSON.stringify(SITE_CONFIG)));
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setStatus('');
    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setStatus('Saved successfully! (Reloading in 2s)');
        setTimeout(() => window.location.reload(), 2000);
      } else {
        setStatus('Failed to save configuration.');
      }
    } catch (e) {
      setStatus('Error connecting to server.');
    }
    setSaving(false);
  };

  const updateField = (key: string, value: any) => {
    setConfig({ ...config, [key]: value });
  };

  const updatePack = (index: number, key: string, value: any) => {
    const packs = [...config.packPricing];
    packs[index] = { ...packs[index], [key]: value };
    updateField('packPricing', packs);
  };

  const addPack = () => {
    updateField('packPricing', [...config.packPricing, { count: 1, price: 10, label: '', tag: null }]);
  };

  const removePack = (index: number) => {
    const packs = [...config.packPricing];
    packs.splice(index, 1);
    updateField('packPricing', packs);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-ui)', padding: '60px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800 }}>Site Configuration</h1>
            <p style={{ margin: '8px 0 0', opacity: 0.6 }}>Edit the site data dynamically. (Local dev only)</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ background: 'var(--og-blue)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 999, fontWeight: 700, cursor: 'pointer' }}
          >
            {saving ? 'Saving...' : 'Save Configuration'}
          </button>
        </div>

        {status && (
          <div style={{ background: status.includes('success') ? '#05CE78' : '#FF1053', color: '#fff', padding: '12px 20px', borderRadius: 8, marginBottom: 24, fontWeight: 600 }}>
            {status}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* General Fields */}
          <section style={{ background: 'var(--bg-inset)', padding: 32, borderRadius: 16 }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>General Data</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['productName', 'companyName', 'tagline', 'kickstarterUrl', 'shopUrl', 'emailGeneral', 'emailPress', 'emailSupport', 'launchDate'].map(key => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{key}</label>
                  <input
                    type="text"
                    value={config[key]}
                    onChange={e => updateField(key, e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: 14 }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Kickstarter Stats */}
          <section style={{ background: 'var(--bg-inset)', padding: 32, borderRadius: 16 }}>
            <h2 style={{ margin: '0 0 24px', fontSize: 20 }}>Kickstarter Stats</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {['kickstarterFunded', 'kickstarterBackers', 'kickstarterDaysLeft', 'kickstarterRaised'].map(key => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{key}</label>
                  <input
                    type="number"
                    value={config[key]}
                    onChange={e => updateField(key, Number(e.target.value))}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: 14 }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section style={{ background: 'var(--bg-inset)', padding: 32, borderRadius: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ margin: 0, fontSize: 20 }}>Pack Pricing</h2>
              <button onClick={addPack} style={{ background: '#0A0A0A', color: '#fff', border: 'none', padding: '6px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
                + Add Pack
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {config.packPricing.map((pack: any, i: number) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr 1fr auto', gap: 12, alignItems: 'end', background: 'var(--bg)', padding: 16, borderRadius: 12, border: '1px solid var(--border)' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, marginBottom: 6 }}>Count (Chairs/Guards)</label>
                    <input type="number" value={pack.count} onChange={e => updatePack(i, 'count', Number(e.target.value))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-inset)', color: 'var(--fg)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, marginBottom: 6 }}>Price ($)</label>
                    <input type="number" value={pack.price} onChange={e => updatePack(i, 'price', Number(e.target.value))} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-inset)', color: 'var(--fg)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, marginBottom: 6 }}>Label (Optional)</label>
                    <input type="text" value={pack.label || ''} onChange={e => updatePack(i, 'label', e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-inset)', color: 'var(--fg)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, marginBottom: 6 }}>Tag (Optional)</label>
                    <input type="text" value={pack.tag || ''} onChange={e => updatePack(i, 'tag', e.target.value || null)} style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg-inset)', color: 'var(--fg)' }} />
                  </div>
                  <button onClick={() => removePack(i)} style={{ padding: '8px 12px', background: '#FF1053', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 700, cursor: 'pointer' }}>
                    X
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
