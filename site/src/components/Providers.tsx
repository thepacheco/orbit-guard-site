'use client';
import { CartProvider } from './CartContext';
import { ActiveVariantProvider } from './ActiveVariantContext';
import AnnounceBar from './AnnounceBar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ActiveVariantProvider>
      <CartProvider>
        <AnnounceBar />
        {children}
      </CartProvider>
    </ActiveVariantProvider>
  );
}
