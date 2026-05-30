'use client';

import React from 'react';
import Header from './Header';
import { FooterCta } from './Sections';
import { useActiveVariant } from './ActiveVariantContext';

export default function GlobalLayoutClient({ children }: { children: React.ReactNode }) {
  const { activeVariant } = useActiveVariant();

  return (
    <>
      <Header dark={activeVariant.dark} variant={activeVariant} />
      <main style={{ marginTop: 'var(--og-announce-h, 0px)', transition: 'margin-top 140ms ease' }}>
        {children}
      </main>
      <FooterCta v={activeVariant} />
    </>
  );
}
