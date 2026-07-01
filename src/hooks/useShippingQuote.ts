'use client';

import { useState, useCallback } from 'react';
import { apiGet } from '@/helpers/api';

interface ShippingQuote {
  costARS: number;                  // 0 si es free shipping, sino el precio Andreani
  originalCostARS?: number;         // precio Andreani real — para mostrar tachado cuando es free
  isFreeShipping?: boolean;
  estimatedDays?: string | null;
}

export function useShippingQuote() {
  const [quote, setQuote] = useState<ShippingQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async (
    postalCode: string,
    totalAreaM2: number,
  ) => {
    setLoading(true);
    setError(null);
    setQuote(null);

    try {
      const params = new URLSearchParams({
        postalCode,
        totalAreaM2: String(totalAreaM2),
      });

      const data = await apiGet<ShippingQuote>(`/api/shipping/quote?${params}`);
      setQuote(data);
      return data;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error al cotizar envío';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setQuote(null);
    setError(null);
  }, []);

  return { quote, loading, error, fetchQuote, reset };
}
