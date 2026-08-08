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
import { PRODUCT_VARIANTS } from '../../components/data';
import StructuredData from '../../components/StructuredData';
import { faqSchema } from '../../config/structuredData';

const polarVariant =
  PRODUCT_VARIANTS.find(v => v.key === 'polar') ?? PRODUCT_VARIANTS[0];

// Flatten the categorized FAQ into a single Q&A list for FAQPage schema.
const allFaqItems = CATEGORIZED_FAQ.flatMap((c) => c.items);

export default function FaqPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#111827' }}>
      <StructuredData data={faqSchema(allFaqItems)} />
      <Header dark={false} variant={polarVariant} />

      <main className="og-page-pad" style={{
        padding: '160px 40px 120px',
      }}>
        <Faq />
      </main>
    </div>
  );
}
