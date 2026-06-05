'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useCart, clearCart, dismissCartForSession } from '@/hooks/useCart';

// El modal NO aparece en estas rutas (parcial match). El user ya está en el flow
// o en una página de resultado de orden — meterle el modal sería ruido.
const HIDE_ON_PATHS = ['/buy', '/order/'];

export const CartResumeModal = () => {
  const { cart, dismissed, mounted } = useCart();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale as string) || 'es';
  const t = useTranslations('purchase.cart');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!mounted || dismissed || !cart) {
      setOpen(false);
      return;
    }
    if (HIDE_ON_PATHS.some(p => pathname.includes(p))) {
      setOpen(false);
      return;
    }
    setOpen(true);
  }, [mounted, cart, dismissed, pathname]);

  if (!open || !cart) return null;

  const handleLater = () => {
    dismissCartForSession();
    setOpen(false);
  };

  const handleDiscard = () => {
    clearCart();
    setOpen(false);
  };

  const ms = Date.now() - cart.savedAt;
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const hours = Math.floor(ms / (60 * 60 * 1000));
  const timeText =
    days >= 2 ? t('daysAgo', { n: days }) :
    days === 1 ? t('yesterday') :
    hours >= 1 ? t('hoursAgo', { n: hours }) :
    t('justNow');

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleLater}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-resume-title"
    >
      <div
        className="bg-white max-w-md w-full border-t-2 border-black animate-in slide-in-from-bottom-4 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 text-center">
          <p className="font-trueTypewriter text-[11px] text-black/40 uppercase tracking-[0.18em] mb-2">
            {t('eyebrow')}
          </p>
          <h2 id="cart-resume-title" className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-3">
            {t('title')}
          </h2>
          <p className="text-sm text-black/55 leading-relaxed mb-6">
            {t('description')}
          </p>

          {cart.productSummary && (
            <div className="flex items-center gap-4 border border-black/10 p-3 mb-2 text-left">
              {cart.productSummary.muralImage && (
                <div className="relative size-16 shrink-0 overflow-hidden bg-gray-50">
                  <Image
                    src={cart.productSummary.muralImage}
                    alt={cart.productSummary.muralTitle}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="min-w-0 flex-1">
                {cart.productSummary.collectionTitle && (
                  <p className="text-[10px] text-black/40 uppercase tracking-widest truncate">
                    {cart.productSummary.collectionTitle}
                  </p>
                )}
                <p className="font-gillsans font-medium text-base truncate">
                  {cart.productSummary.muralTitle}
                </p>
                {cart.productSummary.variantColorName && (
                  <p className="text-xs text-black/50 truncate">
                    {cart.productSummary.variantColorName}
                  </p>
                )}
              </div>
            </div>
          )}

          <p className="text-[11px] text-black/30 mb-7">{timeText}</p>

          <Link
            href={`/${locale}/buy`}
            onClick={() => {
              // Marcamos como dismissed para esta sesión — el carrito persiste en localStorage
              // (lo va a usar PurchaseFlow para restaurar el form) pero el modal no vuelve a
              // aparecer si el user navega por el sitio sin pagar.
              dismissCartForSession();
              setOpen(false);
            }}
            className="block w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors"
          >
            {t('continue')}
          </Link>

          <div className="flex gap-2 mt-3">
            <button
              type="button"
              onClick={handleLater}
              className="flex-1 py-2.5 text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors"
            >
              {t('later')}
            </button>
            <span className="text-black/15 self-center">·</span>
            <button
              type="button"
              onClick={handleDiscard}
              className="flex-1 py-2.5 text-xs uppercase tracking-wider text-black/35 hover:text-red-700/70 transition-colors"
            >
              {t('discard')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
