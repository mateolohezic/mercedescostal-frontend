'use client';

import { useState, useEffect } from 'react';

// localStorage key con TTL — borra solo carritos viejos.
const CART_KEY = 'mc_cart_draft';
const CART_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 días

// sessionStorage key — si el user descartó el modal en esta sesión, no lo molestamos más.
// Persiste el carrito (sigue en localStorage) pero deja de aparecer el modal hasta que abra
// una nueva pestaña/sesión.
const CART_DISMISSED_KEY = 'mc_cart_dismissed';

// Custom event — para que los componentes en la misma pestaña reaccionen a cambios
// del carrito (localStorage 'storage' event solo dispara en OTRAS pestañas).
const CART_CHANGE_EVENT = 'mc-cart-change';

export interface CartProductSummary {
  muralTitle: string;
  variantColorName: string;
  collectionTitle?: string;
  muralImage?: string;
}

export interface CartData {
  formData: Record<string, any>; // todos los values del react-hook-form
  productSummary?: CartProductSummary;
  step?: number;
  savedAt: number;
}

function readRaw(): CartData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as CartData;
    if (!data.savedAt || Date.now() - data.savedAt > CART_TTL_MS) {
      try { localStorage.removeItem(CART_KEY); } catch { /* ignore */ }
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

function notifyChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(CART_CHANGE_EVENT));
  }
}

// Helpers para usar desde cualquier lado (PurchaseFlow, OrderSuccess, modal, etc.).

export function getCart(): CartData | null {
  return readRaw();
}

export function saveCart(patch: Partial<CartData>): void {
  if (typeof window === 'undefined') return;
  const current = readRaw() || { formData: {}, savedAt: 0 };
  const next: CartData = {
    formData: patch.formData ?? current.formData,
    productSummary: patch.productSummary ?? current.productSummary,
    step: patch.step ?? current.step,
    savedAt: Date.now(),
  };
  // localStorage puede tirar QuotaExceededError en modo privado de Safari o si
  // el bucket está lleno. Falla silencioso pero loggeable — el flow de compra
  // sigue funcionando, solo se pierde la persistencia.
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    notifyChange();
  } catch (err) {
    console.warn('[useCart] saveCart falló — localStorage no disponible:', err);
  }
}

export function clearCart(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CART_KEY);
    sessionStorage.removeItem(CART_DISMISSED_KEY);
    notifyChange();
  } catch (err) {
    console.warn('[useCart] clearCart falló:', err);
  }
}

export function dismissCartForSession(): void {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(CART_DISMISSED_KEY, '1');
    notifyChange();
  } catch (err) {
    console.warn('[useCart] dismiss falló:', err);
  }
}

// Hook reactivo — el modal y otros consumers se re-renderean al cambiar el carrito.
export function useCart() {
  const [cart, setCart] = useState<CartData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCart(readRaw());
    setDismissed(sessionStorage.getItem(CART_DISMISSED_KEY) === '1');

    const handler = () => {
      setCart(readRaw());
      setDismissed(sessionStorage.getItem(CART_DISMISSED_KEY) === '1');
    };
    window.addEventListener(CART_CHANGE_EVENT, handler);
    window.addEventListener('storage', handler); // también cambios en otras pestañas
    return () => {
      window.removeEventListener(CART_CHANGE_EVENT, handler);
      window.removeEventListener('storage', handler);
    };
  }, []);

  return { cart, dismissed, mounted };
}
