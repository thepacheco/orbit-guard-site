'use client';

import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import { AboutOrbit, HowItWorks, StemFit, Reviews, Kickstarter, FooterCta } from './Sections';
import { PRODUCT_VARIANTS } from './data';
import { CartProvider } from './CartContext';

export default function App() {
  const [variantKey, setVariantKey] = useState('blueberry');
  const variant = PRODUCT_VARIANTS.find(v => v.key === variantKey) || PRODUCT_VARIANTS[0];

  return (
    <CartProvider>
      <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
        <Header dark={variant.dark} variant={variant} />
        <Hero variant={variant} setVariantKey={setVariantKey} />
        <AboutOrbit v={variant} />
        <HowItWorks v={variant} />
        <StemFit v={variant} />
        <Reviews v={variant} />
        <Kickstarter v={variant} />
        <FooterCta v={variant} />
      </div>
    </CartProvider>
  );
}
