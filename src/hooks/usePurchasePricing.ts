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
  horizontalExcessCm: number;
  verticalExcessCm: number;
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

  const horizontalExcessCm = panels * PANEL_WIDTH - widthCm;
  const verticalExcessCm = VERTICAL_EXCESS;

  const printAreaM2 = Math.round((panels * PANEL_WIDTH * (heightCm + VERTICAL_EXCESS)) / 10000 * 10000) / 10000;
  const priceARS = Math.round(printAreaM2 * pricePerM2 * 100) / 100;

  return { widthCm, heightCm, panels, printAreaM2, priceARS, horizontalExcessCm, verticalExcessCm };
}

// Cuando las paredes son continuas (esquina/L/U/cuarto): los paneles se calculan
// UNA vez sobre el ancho total, y la altura del grupo es la máxima. Después
// distribuimos precio y paneles proporcional al ancho de cada pared para que el
// detalle por pared sume al total. Debe replicar la lógica del backend pricingService.
export function calculateWallsContinuous(
  walls: Array<{ widthCm: number; heightCm: number }>,
  pricePerM2: number,
): WallCalculation[] {
  if (walls.length === 0) return [];

  const totalWidthCm = walls.reduce((s, w) => s + w.widthCm, 0);
  const maxHeightCm = Math.max(...walls.map(w => w.heightCm));

  let groupPanels = Math.ceil(totalWidthCm / PANEL_WIDTH);
  const excess = groupPanels * PANEL_WIDTH - totalWidthCm;
  if (excess < MIN_HORIZONTAL_EXCESS) {
    groupPanels += 1;
  }

  const groupHorizontalExcess = groupPanels * PANEL_WIDTH - totalWidthCm;
  const groupPrintAreaM2 = Math.round(
    (groupPanels * PANEL_WIDTH * (maxHeightCm + VERTICAL_EXCESS)) / 10000 * 10000,
  ) / 10000;
  const groupPriceARS = Math.round(groupPrintAreaM2 * pricePerM2 * 100) / 100;

  const result: WallCalculation[] = [];
  walls.forEach((w, i) => {
    const share = w.widthCm / totalWidthCm;
    const panels = i === walls.length - 1
      ? groupPanels - result.reduce((s, r) => s + r.panels, 0)
      : Math.round(groupPanels * share);
    const printAreaM2 = i === walls.length - 1
      ? Math.round((groupPrintAreaM2 - result.reduce((s, r) => s + r.printAreaM2, 0)) * 10000) / 10000
      : Math.round(groupPrintAreaM2 * share * 10000) / 10000;
    const priceARS = i === walls.length - 1
      ? Math.round((groupPriceARS - result.reduce((s, r) => s + r.priceARS, 0)) * 100) / 100
      : Math.round(groupPriceARS * share * 100) / 100;
    // Horizontal excess se lo asignamos entero al grupo (solo la última "carga con él"
    // para no confundir al mostrar excesos por pared individual)
    result.push({
      widthCm: w.widthCm,
      heightCm: w.heightCm,
      panels,
      printAreaM2,
      priceARS,
      horizontalExcessCm: i === walls.length - 1 ? groupHorizontalExcess : 0,
      verticalExcessCm: VERTICAL_EXCESS,
    });
  });

  return result;
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
    wallsAreContinuous = false,
    promoDiscountPct = 0,
  ) => {
    const pricePerM2 = getPricePerM2(productType);
    if (!pricePerM2) return { walls: [], totalArea: 0, subtotal: 0, subtotalBeforeDiscount: 0, discountAmount: 0 };

    const calculated = wallsAreContinuous && walls.length > 1
      ? calculateWallsContinuous(walls, pricePerM2)
      : walls.map(w => calculateWall(w.widthCm, w.heightCm, pricePerM2));
    const totalArea = Math.round(calculated.reduce((s, w) => s + w.printAreaM2, 0) * 10000) / 10000;
    const subtotalBeforeDiscount = Math.round(calculated.reduce((s, w) => s + w.priceARS, 0) * 100) / 100;

    // Aplicamos el mismo cálculo que hace el backend: descuento sobre subtotal producto.
    const discountAmount = promoDiscountPct > 0
      ? Math.round(subtotalBeforeDiscount * (promoDiscountPct / 100) * 100) / 100
      : 0;
    const subtotal = Math.round((subtotalBeforeDiscount - discountAmount) * 100) / 100;

    return { walls: calculated, totalArea, subtotal, subtotalBeforeDiscount, discountAmount };
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
