'use client';

import React, { useEffect } from 'react';
import Hero from './Hero';
import { AboutOrbit, HowItWorks, StemFit, Reviews, Kickstarter } from './Sections';
import { PRODUCT_VARIANTS } from './data';
import { useActiveVariant } from './ActiveVariantContext';

export default function App() {
  const { activeVariant, setActiveVariant } = useActiveVariant();

  // For Hero component, we wrap setActiveVariant to take a string key
  const setVariantKey = (key: string) => {
    const v = PRODUCT_VARIANTS.find(variant => variant.key === key);
    if (v) setActiveVariant(v);
  };

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
      <Hero variant={activeVariant} setVariantKey={setVariantKey} />
      <AboutOrbit v={activeVariant} />
      <HowItWorks v={activeVariant} />
      <StemFit v={activeVariant} />
      <Reviews v={activeVariant} />
      <Kickstarter v={activeVariant} />
    </div>
  );
}
