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
}

type CartCtx = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
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
  const [items, setItems] = useState<CartItem[]>([])

  // Persist to localStorage on change
  useEffect(() => {
    if (items.length > 0) localStorage.setItem('og_cart', JSON.stringify(items))
    else localStorage.removeItem('og_cart')
  }, [items])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('og_cart')
    if (saved) try { setItems(JSON.parse(saved)) } catch { /* ignore */ }
  }, [])

  function itemKey(item: Omit<CartItem, 'qty'> | CartItem): string {
    if (item.isMix) return `mix-${item.mixTop}-${item.mixBottom}-${item.packCount}`
    return `${item.variantKey}-${item.packCount}`
  }

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const key = itemKey(item)
      const existing = prev.find(x => itemKey(x) === key)
      if (existing) return prev.map(x => itemKey(x) === key ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (variantKey: string, packCount: number, delta: number, mixTop?: string, mixBottom?: string) => {
    const key = mixTop && mixBottom
      ? `mix-${mixTop}-${mixBottom}-${packCount}`
      : `${variantKey}-${packCount}`
    setItems(prev => prev.map(x => itemKey(x) === key
      ? { ...x, qty: Math.max(0, x.qty + delta) }
      : x
    ).filter(x => x.qty > 0))
  }

  const removeItem = (variantKey: string, packCount: number, mixTop?: string, mixBottom?: string) => {
    if (mixTop && mixBottom) {
      const key = `mix-${mixTop}-${mixBottom}-${packCount}`
      setItems(prev => prev.filter(x => itemKey(x) !== key))
    } else {
      setItems(prev => prev.filter(x => !(x.variantKey === variantKey && x.packCount === packCount && !x.isMix)))
    }
  }

  const totalItems = items.reduce((s, x) => s + x.qty, 0)
  const totalPrice = items.reduce((s, x) => s + x.qty * x.packPrice, 0)

  const saveCartByEmail = (email: string) => {
    localStorage.setItem(`og_cart_${email}`, JSON.stringify(items))
  }

  const loadCartByEmail = (email: string): boolean => {
    const saved = localStorage.getItem(`og_cart_${email}`)
    if (!saved) return false
    try { setItems(JSON.parse(saved)); return true } catch { return false }
  }

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, totalItems, totalPrice, saveCartByEmail, loadCartByEmail, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
