import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Common questions about Orbit Guard caster guards — fit, install, shipping, and returns.',
  alternates: { canonical: '/faq' },
};
import Header from '../../components/Header';
import Faq from '../../components/Faq';
import { CATEGORIZED_FAQ } from '../../config/faqData';
import { FooterCta } from '../../components/Sections';
import { PRODUCT_VARIANTS } from '../../components/data';
import StructuredData from '../../components/StructuredData';
import { faqSchema } from '../../config/structuredData';

const polarVariant =
  PRODUCT_VARIANTS.find(v => v.key === 'polar') ?? PRODUCT_VARIANTS[0];

// Flatten the categorized FAQ into a single Q&A list for FAQPage schema.
const allFaqItems = CATEGORIZED_FAQ.flatMap((c) => c.items);

export default function FaqPage() {
  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', background: '#F8FBFC' }}>
      <StructuredData data={faqSchema(allFaqItems)} />
      <Header dark={false} variant={polarVariant} />

      {/* Soft gradient background matching the inspiration */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `
          radial-gradient(circle at 10% 20%, rgba(255, 228, 225, 0.4) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(224, 255, 255, 0.5) 0%, transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(240, 248, 255, 0.6) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(250, 235, 215, 0.4) 0%, transparent 40%)
        `
      }} />

      {/* Floating geometric dots/shapes for the background */}
      <div style={{ position: 'absolute', top: '15%', left: '20%', width: 12, height: 12, borderRadius: '50%', background: '#8CE3F0', opacity: 0.5, animation: 'ogFloat1 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', top: '25%', left: '8%', width: 24, height: 24, borderRadius: '50%', background: '#FFC8C8', opacity: 0.8, animation: 'ogFloat2 12s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', top: '10%', right: '40%', width: 16, height: 16, borderRadius: '50%', background: '#C4D2FF', opacity: 0.6, animation: 'ogFloat3 10s ease-in-out infinite reverse' }} />
      <div style={{ position: 'absolute', top: '30%', right: '15%', width: 32, height: 32, borderRadius: '50%', background: '#BBEAF4', opacity: 0.7, animation: 'ogFloat1 15s ease-in-out infinite alternate' }} />
      <div style={{ position: 'absolute', bottom: '20%', left: '25%', width: 8, height: 8, borderRadius: '50%', background: '#A390E4', opacity: 0.5, animation: 'ogFloat2 9s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '40%', right: '10%', width: 14, height: 14, borderRadius: '50%', background: '#BBEAF4', opacity: 0.8, animation: 'ogFloat3 11s ease-in-out infinite alternate-reverse' }} />

      <main className="og-page-pad" style={{
        position: 'relative',
        zIndex: 10,
        padding: '100px 40px 100px',
        minHeight: 'calc(100vh - 80px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Faq />
      </main>
    </div>
  );
}
