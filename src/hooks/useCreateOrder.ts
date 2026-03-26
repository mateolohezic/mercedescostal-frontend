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
  shipping: {
    recipientName: string;
    street: string;
    number: string;
    floor?: string;
    apartment?: string;
    postalCode: string;
    city: string;
    province: string;
  };
  locale?: string;
}

interface CreateOrderResult {
  magicToken: string;
  initPoint: string | null;
  orderNumber: string;
}

function generateIdempotencyKey(data: CreateOrderData): string {
  const hash = JSON.stringify({
    muralId: data.product.muralId,
    variant: data.product.variantColorName,
    walls: data.walls,
    postalCode: data.shipping.postalCode,
    ts: Math.floor(Date.now() / 60000), // 1-minute window
  });
  // Simple hash for browser (no crypto.randomBytes)
  let h = 0;
  for (let i = 0; i < hash.length; i++) {
    h = ((h << 5) - h + hash.charCodeAt(i)) | 0;
  }
  return `idem-${Math.abs(h).toString(36)}`;
}

export function useCreateOrder() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrder = useCallback(async (data: CreateOrderData): Promise<CreateOrderResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const idempotencyKey = generateIdempotencyKey(data);

      const result = await apiPost<CreateOrderResult>('/api/orders', {
        ...data,
        idempotencyKey,
      });

      // Store magic token for success page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('mc_magic_token', result.magicToken);
        sessionStorage.setItem('mc_order_number', result.orderNumber);
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
