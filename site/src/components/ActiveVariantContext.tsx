'use client';

import React, { createContext, useContext, useState } from 'react';
import type { Variant } from './types';
import { PRODUCT_VARIANTS } from './data';

interface ActiveVariantContextType {
  activeVariant: Variant;
  setActiveVariant: (v: Variant) => void;
}

const ActiveVariantContext = createContext<ActiveVariantContextType>({
  activeVariant: PRODUCT_VARIANTS[0],
  setActiveVariant: () => {},
});

export function ActiveVariantProvider({ children }: { children: React.ReactNode }) {
  const [activeVariant, setActiveVariant] = useState<Variant>(PRODUCT_VARIANTS[0]);

  return (
    <ActiveVariantContext.Provider value={{ activeVariant, setActiveVariant }}>
      {children}
    </ActiveVariantContext.Provider>
  );
}

export function useActiveVariant() {
  return useContext(ActiveVariantContext);
}
