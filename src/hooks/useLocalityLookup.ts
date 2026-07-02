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
  // El CP "vigente" — si el user tipea CP1 y CP2 dentro del debounce window y
  // ambos fetchs están en vuelo, solo el último request escribe el state.
  // Sin esto, una respuesta lenta sobreescribe una rápida posterior.
  const latestRequestedCpRef = useRef<string>('');

  const lookup = useCallback(async (postalCode: string) => {
    if (!/^\d{4}$/.test(postalCode)) {
      setOptions([]);
      setError(null);
      return [];
    }

    latestRequestedCpRef.current = postalCode;

    const cached = cacheRef.current.get(postalCode);
    if (cached) {
      if (latestRequestedCpRef.current === postalCode) {
        setOptions(cached);
        setError(null);
      }
      return cached;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await apiGet<Response>(`/api/shipping/locality?postalCode=${postalCode}`);
      const opts = data.options || [];
      cacheRef.current.set(postalCode, opts);
      // Solo aplicamos al state si seguimos en el CP que pidió esta llamada.
      if (latestRequestedCpRef.current === postalCode) {
        setOptions(opts);
      }
      return opts;
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'No se pudo validar el código postal';
      if (latestRequestedCpRef.current === postalCode) {
        setError(msg);
        setOptions([]);
      }
      return [];
    } finally {
      // Solo apagamos loading si seguimos en este CP — sino el spinner se queda
      // hasta que termine el lookup correcto.
      if (latestRequestedCpRef.current === postalCode) {
        setLoading(false);
      }
    }
  }, []);

  const reset = useCallback(() => {
    setOptions([]);
    setError(null);
  }, []);

  return { options, loading, error, lookup, reset };
}
