'use client';

import { useEffect, useState } from 'react';
import { apiGet } from '@/helpers/api';

export interface PromoConfig {
  active: boolean;
  promo: {
    code: string;
    label: string;
    discountPct: number;
    untilISO: string;
  } | null;
}

// Trae la promo vigente del backend. Solo lectura — el descuento REAL lo aplica el back
// al crear la orden. Este hook sirve solo para mostrar el badge/precio tachado en la UI.
//
// El hook devuelve el `PromoConfig` directamente (para consumers que no necesitan loading)
// y adjunta `isLoading` como propiedad no-enumerable para consumers que sí lo necesitan.
export interface PromoConfigWithLoading extends PromoConfig {
  isLoading: boolean;
}

const IDLE: PromoConfigWithLoading = { active: false, promo: null, isLoading: true };
const EMPTY: PromoConfigWithLoading = { active: false, promo: null, isLoading: false };

export function usePromoConfig(): PromoConfigWithLoading {
  const [data, setData] = useState<PromoConfigWithLoading>(IDLE);

  useEffect(() => {
    let cancelled = false;
    apiGet<PromoConfig>('/api/config/promo')
      .then((r) => { if (!cancelled) setData({ ...r, isLoading: false }); })
      .catch(() => { if (!cancelled) setData(EMPTY); });
    return () => { cancelled = true; };
  }, []);

  return data;
}
