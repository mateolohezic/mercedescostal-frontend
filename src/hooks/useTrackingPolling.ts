'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { apiUrl } from '@/helpers/api';

const POLL_INTERVAL_ACTIVE_MS = 60_000;     // 1 min mientras está en tránsito visible
const POLL_INTERVAL_LONG_MS = 5 * 60_000;   // 5 min en estados intermedios sin actividad

export type FulfillmentStatus =
  | 'waiting_payment'
  | 'shipment_solicited'
  | 'shipment_created'
  | 'shipment_rejected'
  | 'admitted'
  | 'in_transit'
  | 'out_for_delivery'
  | 'on_hold'
  | 'delivered'
  | 'delivery_failed'
  | 'incident'
  | 'cancelled'
  | 'returned';

export interface TrackingEvent {
  fecha: string;
  evento: string;
  motivo?: string;
  submotivo?: string;
  estado?: string;
  sucursal?: string;
  comentario?: string;
}

export interface TrackingData {
  orderNumber: string;
  status: FulfillmentStatus;
  andreaniTrackingNumber?: string;
  andreaniPreShipmentStatus?: string;
  andreaniSucursalDistribucion?: string;
  estimatedDeliveryDate?: string;
  dispatchedAt?: string;
  deliveredAt?: string;
  events: TrackingEvent[];
}

const TERMINAL: FulfillmentStatus[] = ['delivered', 'cancelled', 'returned', 'delivery_failed', 'shipment_rejected'];
const ACTIVE: FulfillmentStatus[] = ['out_for_delivery', 'in_transit'];

export function useTrackingPolling(magicToken: string | null) {
  const [data, setData] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tokenRef = useRef(magicToken);

  tokenRef.current = magicToken;

  const fetchOnce = useCallback(async () => {
    const token = tokenRef.current;
    if (!token) return null;

    try {
      const res = await fetch(apiUrl(`/api/orders/${token}/tracking`));
      const json = await res.json();
      if (!json.success) {
        setError(json.message || 'No se pudo obtener el tracking');
        return null;
      }
      const next = json.data as TrackingData;
      setData(next);
      setError(null);
      return next;
    } catch {
      // No tiramos error visible al usuario en cada poll fallido
      return null;
    }
  }, []);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const schedule = useCallback((status: FulfillmentStatus) => {
    if (TERMINAL.includes(status)) return;
    const interval = ACTIVE.includes(status) ? POLL_INTERVAL_ACTIVE_MS : POLL_INTERVAL_LONG_MS;
    timerRef.current = setTimeout(async () => {
      const next = await fetchOnce();
      if (next) schedule(next.status);
    }, interval);
  }, [fetchOnce]);

  useEffect(() => {
    if (!magicToken) return;
    setLoading(true);
    fetchOnce()
      .then(next => {
        if (next) schedule(next.status);
      })
      .finally(() => setLoading(false));
    return stop;
  }, [magicToken, fetchOnce, schedule, stop]);

  const refresh = useCallback(async () => {
    stop();
    setLoading(true);
    const next = await fetchOnce();
    setLoading(false);
    if (next) schedule(next.status);
    return next;
  }, [fetchOnce, schedule, stop]);

  return { data, loading, error, refresh };
}
