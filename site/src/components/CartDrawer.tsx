'use client';

import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react';
import { useCart } from './CartContext';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const cart = useCart();
  const [saveEmail, setSaveEmail] = useState('');
  const [loadEmail, setLoadEmail] = useState('');
  const [savedMsg, setSavedMsg] = useState(false);
  const [loadMsg, setLoadMsg] = useState<string | null>(null);

  function handleSave() {
    if (!saveEmail.trim()) return;
    cart.saveCartByEmail(saveEmail.trim());
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  }

  function handleLoad() {
    if (!loadEmail.trim()) return;
    const ok = cart.loadCartByEmail(loadEmail.trim());
    setLoadMsg(ok ? 'Cart loaded!' : 'No cart found for that email.');
    setTimeout(() => setLoadMsg(null), 3000);
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          zIndex: 200,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 320ms cubic-bezier(.16,.84,.32,1)',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'min(420px, 100vw)',
          background: '#fff',
          boxShadow: '-4px 0 32px rgba(0,0,0,0.18)',
          zIndex: 201,
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 320ms cubic-bezier(.16,.84,.32,1)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid var(--border)',
            flexShrink: 0,
          }}
        >
          <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 20 }}>
            Cart
            {cart.totalItems > 0 && (
              <span
                style={{
                  marginLeft: 10,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  fontWeight: 400,
                  color: 'var(--fg-3)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid var(--border)',
              background: 'transparent',
              cursor: 'pointer',
              display: 'grid',
              placeItems: 'center',
              color: 'var(--fg-2)',
            }}
          >
            <LucideIcons.X size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {cart.items.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                color: 'var(--fg-3)',
                fontFamily: 'var(--font-body)',
                fontSize: 15,
              }}
            >
              <LucideIcons.ShoppingBag size={36} strokeWidth={1.4} style={{ marginBottom: 14, opacity: 0.35 }} />
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>Your cart is empty.</div>
              <div>Add some Orbits!</div>
            </div>
          ) : (
            <>
              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {cart.items.map(item => (
                  <div
                    key={`${item.variantKey}-${item.packCount}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 14px',
                      background: 'var(--bg-inset)',
                      borderRadius: 14,
                      border: '1px solid var(--border)',
                    }}
                  >
                    {/* Color dot */}
                    {item.isMix ? (
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                          border: '1px solid rgba(0,0,0,0.1)',
                        }}
                      >
                        <div style={{ height: '50%', background: item.mixTop }} />
                        <div style={{ height: '50%', background: item.mixBottom }} />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: item.hex,
                          flexShrink: 0,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.14)',
                        }}
                      />
                    )}
                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14 }}>
                        {item.variantName}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 2 }}>
                        {item.packCount}-pack · ${item.packPrice} each
                      </div>
                    </div>
                    {/* Qty controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        onClick={() => cart.updateQty(item.variantKey, item.packCount, -1, item.mixTop, item.mixBottom)}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          border: '1px solid var(--border)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'var(--fg)',
                        }}
                      >
                        <LucideIcons.Minus size={11} strokeWidth={2.5} />
                      </button>
                      <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, minWidth: 18, textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      <button
                        onClick={() => cart.updateQty(item.variantKey, item.packCount, 1, item.mixTop, item.mixBottom)}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: '50%',
                          border: '1px solid var(--border)',
                          background: '#fff',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center',
                          color: 'var(--fg)',
                        }}
                      >
                        <LucideIcons.Plus size={11} strokeWidth={2.5} />
                      </button>
                    </div>
                    {/* Line price */}
                    <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 14, minWidth: 40, textAlign: 'right' }}>
                      ${item.packPrice * item.qty}
                    </div>
                    {/* Remove */}
                    <button
                      onClick={() => cart.removeItem(item.variantKey, item.packCount, item.mixTop, item.mixBottom)}
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        display: 'grid',
                        placeItems: 'center',
                        color: 'var(--fg-3)',
                      }}
                      title="Remove"
                    >
                      <LucideIcons.X size={13} strokeWidth={2} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 4px',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 15, color: 'var(--fg-2)' }}>
                  Subtotal
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 22 }}>
                  ${cart.totalPrice}
                </span>
              </div>

              {/* Save cart section */}
              <div
                style={{
                  padding: '16px 18px',
                  background: 'var(--bg-inset)',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13 }}>
                  Save cart by email
                </div>
                {savedMsg ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: '#E6F7EF',
                      color: '#18A06F',
                      borderRadius: 999,
                      padding: '8px 14px',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    <LucideIcons.CheckCircle size={14} strokeWidth={2} />
                    Saved!
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      gap: 0,
                      background: '#fff',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      padding: 3,
                    }}
                  >
                    <input
                      type="email"
                      value={saveEmail}
                      onChange={e => setSaveEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        padding: '7px 12px',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        color: 'var(--fg)',
                        minWidth: 0,
                      }}
                    />
                    <button
                      onClick={handleSave}
                      style={{
                        background: 'var(--og-blue)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 999,
                        padding: '7px 14px',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Save
                    </button>
                  </div>
                )}

                {/* Load by email */}
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, marginTop: 4 }}>
                  Load cart by email
                </div>
                {loadMsg ? (
                  <div
                    style={{
                      fontSize: 13,
                      color: loadMsg.startsWith('Cart loaded') ? '#18A06F' : 'var(--fg-3)',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                    }}
                  >
                    {loadMsg}
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'flex',
                      gap: 0,
                      background: '#fff',
                      borderRadius: 999,
                      border: '1px solid var(--border)',
                      padding: 3,
                    }}
                  >
                    <input
                      type="email"
                      value={loadEmail}
                      onChange={e => setLoadEmail(e.target.value)}
                      placeholder="your@email.com"
                      style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        padding: '7px 12px',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        color: 'var(--fg)',
                        minWidth: 0,
                      }}
                    />
                    <button
                      onClick={handleLoad}
                      style={{
                        background: '#fff',
                        color: 'var(--fg)',
                        border: '1px solid var(--border)',
                        borderRadius: 999,
                        padding: '7px 14px',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        fontSize: 13,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Load
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout button */}
              <button
                style={{
                  background: 'var(--og-blue)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 999,
                  padding: '16px 32px',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  boxShadow: '0 10px 28px rgba(90,116,255,0.35)',
                  width: '100%',
                  marginTop: 4,
                }}
              >
                <LucideIcons.CreditCard size={18} strokeWidth={2} />
                Checkout · ${cart.totalPrice}
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
