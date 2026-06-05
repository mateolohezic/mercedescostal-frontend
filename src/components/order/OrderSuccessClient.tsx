'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { usePaymentPolling } from '@/hooks/usePaymentPolling';
import { clearCart } from '@/hooks/useCart';
import { CheckIcon, CloseIcon, ClockIcon } from '@/icons';

interface Props {
  token: string;
}

export const OrderSuccessClient = ({ token }: Props) => {
  const params = useParams();
  const locale = (params?.locale as string) || 'es';
  const t = useTranslations('purchase.success');

  const [magicToken, setMagicToken] = useState<string | null>(token || null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  // window.location.origin solo en cliente (después de mount). Renderizamos string
  // vacío en server para evitar hydration mismatch.
  const [origin, setOrigin] = useState<string>('');

  // Read sessionStorage only on client after mount (avoids SSR hydration mismatch).
  // También limpiamos cualquier carrito persistido — esta página significa que el
  // user ya volvió de MP, así que la "compra en curso" no aplica más.
  // Mount-only: no dep en magicToken para evitar que se re-ejecute clearCart() y
  // setOrigin() cada vez que cambia el token (lo que era una llamada de más, no bug).
  useEffect(() => {
    if (!magicToken) {
      setMagicToken(sessionStorage.getItem('mc_magic_token'));
    }
    setOrderNumber(sessionStorage.getItem('mc_order_number'));
    setOrigin(window.location.origin);
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {t('processed')}
        </h1>
        <p className="text-black/50">{t('checkEmail')}</p>
      </div>
    );
  }

  // Payment approved
  if (status === 'approved') {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black flex items-center justify-center">
          <CheckIcon className="w-8 h-8" />
        </div>

        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-2">
          {t('confirmed')}
        </h1>

        {orderNumber && (
          <p className="font-trueTypewriter text-sm text-black/40 mb-6">{t('order')} {orderNumber}</p>
        )}

        <p className="text-sm text-black/50 mb-10 leading-relaxed">
          {t('emailSent')}
          <br />
          {t('willNotify')}
        </p>

        <Link
          href={statusLink}
          className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
        >
          {t('viewStatus')}
        </Link>

        <p className="text-[11px] text-black/25 mt-6 break-all leading-relaxed">
          {t('saveLink')}
          <br />
          <span className="text-black/40">{origin}{statusLink}</span>
        </p>
      </div>
    );
  }

  // Payment rejected/cancelled
  if (status === 'rejected' || status === 'cancelled') {
    return (
      <div className="text-center py-12 max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border-2 border-black/20 flex items-center justify-center text-black/40">
          <CloseIcon className="w-7 h-7" />
        </div>

        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
          {t('notApproved')}
        </h1>

        <p className="text-sm text-black/50 mb-10">
          {status === 'rejected' ? t('wasRejected') : t('wasCancelled')}
        </p>

        <Link
          href={buyLink}
          className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
        >
          {t('retryPurchase')}
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
          <ClockIcon className="w-7 h-7" />
        )}
      </div>

      <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
        {exhausted ? t('inVerification') : t('verifying')}
      </h1>

      <p className="text-sm text-black/50 mb-10 leading-relaxed">
        {exhausted ? t('beingVerified') : t('verifyingHint')}
      </p>

      <div className="space-y-4">
        <Link
          href={statusLink}
          className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors text-center"
        >
          {t('viewStatus')}
        </Link>

        <p className="text-[11px] text-black/25 break-all leading-relaxed">
          {t('trackingLink')}
          <br />
          <span className="text-black/40">{origin}{statusLink}</span>
        </p>
      </div>
    </div>
  );
};
