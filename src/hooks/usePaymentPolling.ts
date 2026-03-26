'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
const POLL_INTERVAL = 3000;
const MAX_ATTEMPTS = 20;

type PaymentStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'in_process' | 'refunded';

export function usePaymentPolling(magicToken: string | null) {
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [exhausted, setExhausted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const attemptsRef = useRef(0);
  const tokenRef = useRef(magicToken);

  // Keep refs in sync
  tokenRef.current = magicToken;

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setLoading(false);
  }, []);

  const poll = useCallback(async () => {
    const token = tokenRef.current;
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE}/api/orders/${token}/payment-status`);
      const data = await res.json();

      if (data.success && data.data?.status) {
        setStatus(data.data.status);

        if (['approved', 'rejected', 'cancelled', 'refunded'].includes(data.data.status)) {
          stopPolling();
          return;
        }
      }
    } catch {
      // Silently continue polling on network errors
    }

    attemptsRef.current += 1;
    setAttempts(attemptsRef.current);

    if (attemptsRef.current >= MAX_ATTEMPTS) {
      stopPolling();
      setExhausted(true);
    }
  }, [stopPolling]);

  const startPolling = useCallback(() => {
    if (!tokenRef.current || intervalRef.current) return;

    setLoading(true);
    setAttempts(0);
    setExhausted(false);
    attemptsRef.current = 0;

    // Immediate first check
    poll();

    intervalRef.current = setInterval(poll, POLL_INTERVAL);
  }, [poll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  return { status, loading, attempts, exhausted, startPolling, stopPolling };
}
