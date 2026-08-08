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
  replaceItem: (oldKey: string, newItem: Omit<CartItem, 'qty'>) => void
  updateQty: (variantKey: string, packCount: number, delta: number, mixTop?: string, mixBottom?: string) => void
  removeItem: (variantKey: string, packCount: number, mixTop?: string, mixBottom?: string) => void
  totalItems: number
  totalPrice: number
  saveCartByEmail: (email: string) => Promise<void>
  loadCartByEmail: (email: string) => Promise<boolean>
  clearCart: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function getItemKey(item: Omit<CartItem, 'qty'> | CartItem): string {
  if (item.isMix) {
    const top = item.mixTopKey || item.mixTop || '';
    const bottom = item.mixBottomKey || item.mixBottom || '';
    return `mix-${top}-${bottom}-${item.packCount}`;
  }
  return `${item.variantKey}-${item.packCount}`;
}

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

    } else {
      localStorage.removeItem('og_cart');
    }
  }, [items, totalPrice, isLoaded]);

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const key = getItemKey(item);
      const existing = prev.find(x => getItemKey(x) === key);
      if (existing) return prev.map(x => getItemKey(x) === key ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updatePackItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const targetKey = getItemKey(item);
      const exactExisting = prev.find(x => getItemKey(x) === targetKey);
      if (exactExisting) {
        return prev.map(x => getItemKey(x) === targetKey ? { ...x, qty: x.qty + 1 } : x);
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

  const replaceItem = (oldKey: string, newItem: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const existingIdx = prev.findIndex(x => getItemKey(x) === oldKey);
      if (existingIdx === -1) return prev;
      const existing = prev[existingIdx];
      const newKey = getItemKey(newItem);
      
      // If the new item configuration already exists elsewhere in the cart, just add the quantity to that one and remove the old
      const otherMatchIdx = prev.findIndex((x, idx) => idx !== existingIdx && getItemKey(x) === newKey);
      if (otherMatchIdx >= 0) {
        return prev.map((x, idx) => {
          if (idx === otherMatchIdx) return { ...x, qty: x.qty + existing.qty };
          return x;
        }).filter((_, idx) => idx !== existingIdx);
      }

      // Otherwise just replace it in place
      return prev.map((x, idx) => idx === existingIdx ? { ...newItem, qty: existing.qty } : x);
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

  const saveCartByEmail = async (email: string) => {
    localStorage.setItem(`og_cart_${email}`, JSON.stringify(items));
    try {
      await fetch('/api/cart/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, items, total: totalPrice }),
      });
    } catch {
      // ignore
    }
  };

  const loadCartByEmail = async (email: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/cart/load?email=${encodeURIComponent(email)}`);
      if (!res.ok) return false;
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setItems(data.items);
        return true;
      }
      return false;
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
        replaceItem,
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
