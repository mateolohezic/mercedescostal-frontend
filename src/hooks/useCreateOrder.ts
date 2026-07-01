'use client';

import { useState, useCallback } from 'react';
import { apiPost } from '@/helpers/api';

interface CreateOrderData {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  product: {
    collectionId: string;
    collectionTitle: string;
    muralId: string;
    muralTitle: string;
    variantColorName: string;
    productType: string;
  };
  walls: Array<{ widthCm: number; heightCm: number }>;
  wallsAreContinuous: boolean;
  shipping: {
    method: 'delivery' | 'pickup';
    recipientName: string;
    recipientDni: string;
    street?: string;
    number?: string;
    floor?: string;
    apartment?: string;
    postalCode?: string;
    city?: string;
    province?: string;
  };
  locale?: string;
  // Aceptación legal. El back valida que ambos vengan y que la versión coincida con la vigente.
  termsAccepted: boolean;
  termsVersion: string;
  // Total que el cliente VE en pantalla al hacer submit — anti-mid-flight-promo.
  // Si el back calcula > $50 de diferencia (redondeos aparte), aborta con 409 PRICE_CHANGED.
  clientExpectedTotalARS?: number;
}

interface CreateOrderResult {
  magicToken: string;
  initPoint: string | null;
  orderNumber: string;
}

const IDEMPOTENCY_KEY_STORAGE = 'mc_order_idempotency_key';

// Devuelve un UUID v4 único por intento de compra. Se persiste en sessionStorage:
// si el submit falla por red y el usuario reintenta, mandamos LA MISMA key (el back
// devuelve la orden ya creada en lugar de duplicar). Se limpia al abrir nueva compra
// (resetIdempotencyKey).
function getOrCreateIdempotencyKey(): string {
  if (typeof window === 'undefined') {
    // SSR fallback (no debería llamarse en SSR pero por seguridad)
    return `mc-${Math.random().toString(36).slice(2)}-${Date.now()}`;
  }
  const existing = sessionStorage.getItem(IDEMPOTENCY_KEY_STORAGE);
  if (existing) return existing;
  // crypto.randomUUID disponible en navegadores modernos. Fallback por si acaso.
  const fresh = typeof crypto !== 'undefined' && crypto.randomUUID
    ? `mc-${crypto.randomUUID()}`
    : `mc-${Math.random().toString(36).slice(2)}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  sessionStorage.setItem(IDEMPOTENCY_KEY_STORAGE, fresh);
  return fresh;
}

// Limpia la idempotency key. Llamar cuando el usuario empieza un flujo nuevo
// (mount inicial de PurchaseFlow después de un pago exitoso, por ejemplo).
export function resetIdempotencyKey(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(IDEMPOTENCY_KEY_STORAGE);
}

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (data: CreateOrderData): Promise<CreateOrderResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const idempotencyKey = getOrCreateIdempotencyKey();

      const result = await apiPost<CreateOrderResult>('/api/orders', {
        ...data,
        idempotencyKey,
      });

      // Guardamos token/orderNumber para que la página de success los lea aunque el
      // usuario refresque o pierda el query param. Limpiamos también la idempotency
      // key: ya cumplió, una próxima compra arranca con key nueva.
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('mc_magic_token', result.magicToken);
        sessionStorage.setItem('mc_order_number', result.orderNumber);
        sessionStorage.removeItem(IDEMPOTENCY_KEY_STORAGE);
      }

      return result;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { createOrder, loading, error };
}
