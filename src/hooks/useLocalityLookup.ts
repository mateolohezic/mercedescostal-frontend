'use client';

import { useState, useCallback, useRef } from 'react';
import { apiGet } from '@/helpers/api';

export interface LocalityOption {
  id: number;
  city: string;
  province: string;
}

interface Response {
  options: LocalityOption[];
}

// Llama a /api/shipping/locality?postalCode= para autocompletar ciudad/provincia
// desde la base normalizada de Andreani. Cachea por CP en memoria del componente
// para evitar refetch al ir y volver entre steps.
export function useLocalityLookup() {
  const [options, setOptions] = useState<LocalityOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, LocalityOption[]>>(new Map());

  const lookup = useCallback(async (postalCode: string) => {
    if (!/^\d{4}$/.test(postalCode)) {
      setOptions([]);
      setError(null);
      return [];
    }

    const cached = cacheRef.current.get(postalCode);
    if (cached) {
      setOptions(cached);
      setError(null);
      return cached;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<Response>(`/api/shipping/locality?postalCode=${postalCode}`);
      const opts = data.options || [];
      cacheRef.current.set(postalCode, opts);
      setOptions(opts);
      return opts;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo validar el código postal';
      setError(msg);
      setOptions([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setOptions([]);
    setError(null);
  }, []);

  return { options, loading, error, lookup, reset };
}
