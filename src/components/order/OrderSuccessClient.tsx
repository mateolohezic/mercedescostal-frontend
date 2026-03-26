'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { usePaymentPolling } from '@/hooks/usePaymentPolling';

interface Props {
  token: string;
}

const CheckIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ClockIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const OrderSuccessClient = ({ token }: Props) => {
  const params = useParams();
  const locale = (params?.locale as string) || 'es';

  const [magicToken, setMagicToken] = useState<string | null>(token || null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  // Read sessionStorage only on client after mount (avoids SSR hydration mismatch)
  useEffect(() => {
    if (!magicToken) {
      setMagicToken(sessionStorage.getItem('mc_magic_token'));
    }
    setOrderNumber(sessionStorage.getItem('mc_order_number'));
  }, [magicToken]);

  const { status, loading, exhausted, startPolling } = usePaymentPolling(magicToken);

  useEffect(() => {
    if (magicToken) {
      startPolling();
    }
  }, [magicToken, startPolling]);

  const statusLink = magicToken ? `/${locale}/order/status/${magicToken}` : '#';
  const buyLink = `/${locale}/buy`;

  if (!magicToken) {
    return (
      <div className="text-center py-12">
        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
          Pago procesado
        </h1>
        <p className="text-black/50">Revisá tu email para el estado de tu pedido.</p>
      </div>
    );
  }

  // Payment approved
  if (status === 'approved') {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black flex items-center justify-center">
          <CheckIcon />
        </div>

        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-2">
          Pago confirmado
        </h1>

        {orderNumber && (
          <p className="font-trueTypewriter text-sm text-black/40 mb-6">Pedido {orderNumber}</p>
        )}

        <p className="text-sm text-black/50 mb-10 leading-relaxed">
          Recibiste un email de confirmación con todos los detalles.
          <br />
          Te notificaremos cuando tu pedido sea despachado.
        </p>

        <Link
          href={statusLink}
          className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
        >
          Ver estado del pedido
        </Link>

        <p className="text-[11px] text-black/25 mt-6 break-all leading-relaxed">
          Guardá este link para consultar el estado en cualquier momento:
          <br />
          <span className="text-black/40">{typeof window !== 'undefined' ? window.location.origin : ''}{statusLink}</span>
        </p>
      </div>
    );
  }

  // Payment rejected/cancelled
  if (status === 'rejected' || status === 'cancelled') {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black/20 flex items-center justify-center text-black/40">
          <XIcon />
        </div>

        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
          Pago no aprobado
        </h1>

        <p className="text-sm text-black/50 mb-10">
          Tu pago fue {status === 'rejected' ? 'rechazado' : 'cancelado'}.
          No se realizó ningún cobro.
        </p>

        <Link
          href={buyLink}
          className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
        >
          Reintentar compra
        </Link>
      </div>
    );
  }

  // Still polling or exhausted
  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black/10 flex items-center justify-center text-black/30">
        {loading ? (
          <div className="w-6 h-6 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
        ) : (
          <ClockIcon />
        )}
      </div>

      <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
        {exhausted ? 'Pago en verificación' : 'Verificando pago...'}
      </h1>

      <p className="text-sm text-black/50 mb-10 leading-relaxed">
        {exhausted
          ? 'Tu pago está siendo procesado. Recibirás un email de confirmación cuando se apruebe.'
          : 'Estamos verificando tu pago con Mercado Pago. Esto puede tardar unos segundos.'
        }
      </p>

      <div className="space-y-4">
        <Link
          href={statusLink}
          className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
        >
          Ver estado del pedido
        </Link>

        <p className="text-[11px] text-black/25 break-all leading-relaxed">
          Tu link de seguimiento:
          <br />
          <span className="text-black/40">{typeof window !== 'undefined' ? window.location.origin : ''}{statusLink}</span>
        </p>
      </div>
    </div>
  );
};
