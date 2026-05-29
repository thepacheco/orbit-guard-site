'use client';
import { CartProvider } from './CartContext';
import AnnounceBar from './AnnounceBar';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <AnnounceBar />
      {children}
    </CartProvider>
  );
}
