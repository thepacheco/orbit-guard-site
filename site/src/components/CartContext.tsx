'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
  variantKey: string
  variantName: string
  hex: string
  packCount: number
  packPrice: number
  qty: number
  isMix?: boolean
  mixTop?: string
  mixBottom?: string
  mixTopKey?: string
  mixBottomKey?: string
  guardSlots?: { topKey: string; bottomKey: string }[]
}

type CartCtx = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
  updatePackItem: (item: Omit<CartItem, 'qty'>) => void
  updateQty: (variantKey: string, packCount: number, delta: number, mixTop?: string, mixBottom?: string) => void
  removeItem: (variantKey: string, packCount: number, mixTop?: string, mixBottom?: string) => void
  totalItems: number
  totalPrice: number
  saveCartByEmail: (email: string) => void
  loadCartByEmail: (email: string) => boolean
  clearCart: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('og_cart');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return [];
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const totalItems = items.reduce((s, x) => s + x.qty, 0);
  const totalPrice = items.reduce((s, x) => s + x.qty * x.packPrice, 0);

  // Sync items to localStorage whenever state mutates
  useEffect(() => {
    if (!isLoaded) return;
    if (items.length > 0) {
      localStorage.setItem('og_cart', JSON.stringify(items));
      try {
        fetch('/api/cart-event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'cart_sync', items, total: totalPrice, timestamp: new Date().toISOString() }),
        }).catch(() => {});
      } catch {
        // ignore offline errors
      }
    } else {
      localStorage.removeItem('og_cart');
    }
  }, [items, totalPrice, isLoaded]);

  function itemKey(item: Omit<CartItem, 'qty'> | CartItem): string {
    if (item.isMix) {
      const top = item.mixTopKey || item.mixTop || '';
      const bottom = item.mixBottomKey || item.mixBottom || '';
      return `mix-${top}-${bottom}-${item.packCount}`;
    }
    return `${item.variantKey}-${item.packCount}`;
  }

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const key = itemKey(item);
      const existing = prev.find(x => itemKey(x) === key);
      if (existing) return prev.map(x => itemKey(x) === key ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updatePackItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const targetKey = itemKey(item);
      const exactExisting = prev.find(x => itemKey(x) === targetKey);
      if (exactExisting) {
        return prev.map(x => itemKey(x) === targetKey ? { ...x, qty: x.qty + 1 } : x);
      }
      
      // If variant or mix combination already exists in cart, update its packCount & packPrice
      const matchIndex = prev.findIndex(x => {
        if (item.isMix) {
          const itemTop = item.mixTopKey || item.mixTop;
          const itemBottom = item.mixBottomKey || item.mixBottom;
          const xTop = x.mixTopKey || x.mixTop;
          const xBottom = x.mixBottomKey || x.mixBottom;
          return x.isMix && xTop === itemTop && xBottom === itemBottom;
        }
        return !x.isMix && x.variantKey === item.variantKey;
      });

      if (matchIndex >= 0) {
        return prev.map((x, idx) => idx === matchIndex ? { ...x, ...item } : x);
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateQty = (variantKey: string, packCount: number, delta: number, mixTop?: string, mixBottom?: string) => {
    setItems(prev => prev.map(x => {
      const match = x.isMix
        ? ((x.mixTopKey && x.mixTopKey === mixTop) || x.mixTop === mixTop) && ((x.mixBottomKey && x.mixBottomKey === mixBottom) || x.mixBottom === mixBottom) && x.packCount === packCount
        : x.variantKey === variantKey && x.packCount === packCount && !x.isMix;
      return match ? { ...x, qty: Math.max(0, x.qty + delta) } : x;
    }).filter(x => x.qty > 0));
  };

  const removeItem = (variantKey: string, packCount: number, mixTop?: string, mixBottom?: string) => {
    if (mixTop && mixBottom) {
      setItems(prev => prev.filter(x => !(x.isMix && ((x.mixTopKey && x.mixTopKey === mixTop) || x.mixTop === mixTop) && ((x.mixBottomKey && x.mixBottomKey === mixBottom) || x.mixBottom === mixBottom) && x.packCount === packCount)));
    } else {
      setItems(prev => prev.filter(x => !(x.variantKey === variantKey && x.packCount === packCount && !x.isMix)));
    }
  };

  const saveCartByEmail = (email: string) => {
    localStorage.setItem(`og_cart_${email}`, JSON.stringify(items));
    try {
      fetch('/api/cart-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'save_cart_email', email, items, total: totalPrice, timestamp: new Date().toISOString() }),
      }).catch(() => {});
    } catch {
      // ignore
    }
  };

  const loadCartByEmail = (email: string): boolean => {
    const saved = localStorage.getItem(`og_cart_${email}`);
    if (!saved) return false;
    try {
      setItems(JSON.parse(saved));
      return true;
    } catch {
      return false;
    }
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updatePackItem,
        updateQty,
        removeItem,
        totalItems,
        totalPrice,
        saveCartByEmail,
        loadCartByEmail,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
