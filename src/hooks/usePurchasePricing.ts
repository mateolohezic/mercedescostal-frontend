'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiGet } from '@/helpers/api';

const PANEL_WIDTH = 50;
const VERTICAL_EXCESS = 10;
const MIN_HORIZONTAL_EXCESS = 10;

export interface WallCalculation {
  widthCm: number;
  heightCm: number;
  panels: number;
  printAreaM2: number;
  priceARS: number;
}

interface PricingConfig {
  mural: { ARS: number };
  pattern: { ARS: number };
  custom: { ARS: number };
}

export function calculateWall(widthCm: number, heightCm: number, pricePerM2: number): WallCalculation {
  let panels = Math.ceil(widthCm / PANEL_WIDTH);
  const excess = panels * PANEL_WIDTH - widthCm;
  if (excess < MIN_HORIZONTAL_EXCESS) {
    panels += 1;
  }

  const printAreaM2 = Math.round((panels * PANEL_WIDTH * (heightCm + VERTICAL_EXCESS)) / 10000 * 10000) / 10000;
  const priceARS = Math.round(printAreaM2 * pricePerM2 * 100) / 100;

  return { widthCm, heightCm, panels, printAreaM2, priceARS };
}

// Fallback prices in case backend is not available
const FALLBACK_PRICING: PricingConfig = {
  mural: { ARS: 92700 },
  pattern: { ARS: 74000 },
  custom: { ARS: 129587 },
};

export function usePurchasePricing() {
  const [pricing, setPricing] = useState<PricingConfig>(FALLBACK_PRICING);
  const [loading, setLoading] = useState(true);
  const [error, _setError] = useState<string | null>(null);

  useEffect(() => {
    apiGet<PricingConfig>('/api/config/pricing')
      .then(setPricing)
      .catch(() => {
        // Use fallback prices if backend unavailable
        setPricing(FALLBACK_PRICING);
      })
      .finally(() => setLoading(false));
  }, []);

  const getPricePerM2 = useCallback((productType: string): number => {
    if (!pricing) return 0;
    const p = pricing[productType as keyof PricingConfig];
    return p?.ARS || 0;
  }, [pricing]);

  const calculateWalls = useCallback((
    walls: Array<{ widthCm: number; heightCm: number }>,
    productType: string,
  ) => {
    const pricePerM2 = getPricePerM2(productType);
    if (!pricePerM2) return { walls: [], totalArea: 0, subtotal: 0 };

    const calculated = walls.map(w => calculateWall(w.widthCm, w.heightCm, pricePerM2));
    const totalArea = Math.round(calculated.reduce((s, w) => s + w.printAreaM2, 0) * 10000) / 10000;
    const subtotal = Math.round(calculated.reduce((s, w) => s + w.priceARS, 0) * 100) / 100;

    return { walls: calculated, totalArea, subtotal };
  }, [getPricePerM2]);

  const formatPrice = useCallback((amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }, []);

  return { pricing, loading, error, calculateWalls, getPricePerM2, formatPrice };
}
