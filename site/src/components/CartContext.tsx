'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

export type CartItem = {
  variantKey: string
  variantName: string
  hex: string
  packCount: number
  packPrice: number
  qty: number
}

type CartCtx = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'qty'>) => void
  updateQty: (variantKey: string, packCount: number, delta: number) => void
  removeItem: (variantKey: string, packCount: number) => void
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

  const addItem = (item: Omit<CartItem, 'qty'>) => {
    setItems(prev => {
      const key = `${item.variantKey}-${item.packCount}`
      const existing = prev.find(x => `${x.variantKey}-${x.packCount}` === key)
      if (existing) return prev.map(x => `${x.variantKey}-${x.packCount}` === key ? { ...x, qty: x.qty + 1 } : x)
      return [...prev, { ...item, qty: 1 }]
    })
  }

  const updateQty = (variantKey: string, packCount: number, delta: number) => {
    const key = `${variantKey}-${packCount}`
    setItems(prev => prev.map(x => `${x.variantKey}-${x.packCount}` === key
      ? { ...x, qty: Math.max(0, x.qty + delta) }
      : x
    ).filter(x => x.qty > 0))
  }

  const removeItem = (variantKey: string, packCount: number) => {
    setItems(prev => prev.filter(x => !(x.variantKey === variantKey && x.packCount === packCount)))
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
