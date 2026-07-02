'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useTrackingPolling, FulfillmentStatus, TrackingEvent } from '@/hooks/useTrackingPolling';
import { apiUrl } from '@/helpers/api';

interface OrderData {
  orderNumber: string;
  customer: { name: string; email: string };
  product: {
    muralTitle: string;
    variantColorName: string;
    productType: string;
    pricePerM2: number;
  };
  walls: Array<{
    widthCm: number;
    heightCm: number;
    panels: number;
    printAreaM2: number;
    priceARS: number;
  }>;
  totalPrintAreaM2: number;
  subtotalProductARS: number;
  shipping: {
    recipientName: string;
    recipientDni?: string;
    street: string;
    number: string;
    floor?: string;
    apartment?: string;
    city: string;
    province: string;
    postalCode: string;
    costARS: number;
  };
  totalARS: number;
  payment: { status: string; paidAt?: string };
  fulfillment: {
    status: FulfillmentStatus;
    andreaniTrackingNumber?: string;
    andreaniPreShipmentStatus?: string;
    andreaniSucursalDistribucion?: string;
    andreaniLastCheckedAt?: string;
    estimatedDeliveryDate?: string;
    dispatchedAt?: string;
    deliveredAt?: string;
  };
  createdAt: string;
}

// Estados terminales negativos: se renderean como banner aparte, no en el timeline.
const NEGATIVE_STATUSES: FulfillmentStatus[] = [
  'shipment_rejected', 'cancelled', 'delivery_failed', 'returned', 'incident',
];

// Agrupamos los 13 estados internos en 5 hitos visibles para el cliente.
type MilestoneKey = 'paid' | 'preparing' | 'admitted' | 'in_transit' | 'delivered';
const MILESTONES: Array<{ key: MilestoneKey; matches: FulfillmentStatus[] }> = [
  { key: 'paid',       matches: ['waiting_payment'] },
  { key: 'preparing',  matches: ['shipment_solicited', 'shipment_created'] },
  { key: 'admitted',   matches: ['admitted'] },
  { key: 'in_transit', matches: ['in_transit', 'on_hold'] },
  { key: 'delivered',  matches: ['out_for_delivery', 'delivered'] },
];

function formatPrice(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === 'en' ? 'en-US' : 'es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Andreani a veces devuelve estados/eventos en CamelCase pegado ("OrdenDeEnvioCreada")
// y otras veces bien separados ("Pendiente de ingreso"). Insertamos espacios y dejamos
// el resultado tal cual — el CSS lo pinta uppercase. Sin bajar a minúsculas evitamos
// perder tildes que Andreani a veces no manda.
function humanizeEventName(name: string | undefined | null): string {
  if (!name) return '';
  const trimmed = name.trim();
  if (!trimmed) return '';
  if (/[\s_-]/.test(trimmed)) return trimmed;
  return trimmed
    .replace(/([a-záéíóúñ])([A-ZÁÉÍÓÚÑ])/g, '$1 $2')
    .replace(/([A-ZÁÉÍÓÚÑ])([A-ZÁÉÍÓÚÑ][a-záéíóúñ])/g, '$1 $2');
}

function findMilestoneIndex(status: FulfillmentStatus): number {
  return MILESTONES.findIndex(m => m.matches.includes(status));
}

interface Props {
  token: string;
}

// Estilos de cada estado de pago (los labels vienen del JSON i18n).
const PAYMENT_STYLES: Record<string, string> = {
  pending: 'border-yellow-400/30 text-yellow-700 bg-yellow-50',
  approved: 'border-black/10 text-black bg-black/5',
  rejected: 'border-red-300/30 text-red-700 bg-red-50',
  cancelled: 'border-black/10 text-black/40 bg-black/3',
  in_process: 'border-blue-300/30 text-blue-700 bg-blue-50',
  refunded: 'border-purple-300/30 text-purple-700 bg-purple-50',
};

export const OrderStatusView = ({ token }: Props) => {
  const params = useParams();
  const locale = (params?.locale as string) || 'es';
  const t = useTranslations('purchase.status');
  const tCommon = useTranslations('purchase');

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: tracking, refresh: refreshTracking } = useTrackingPolling(
    order?.payment.status === 'approved' ? token : null,
  );

  const timeAgo = (dateString: string): string => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return t('justNow');
    if (minutes < 60) return t('minAgo', { n: minutes });
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return t('hourAgo', { n: hours });
    const days = Math.floor(hours / 24);
    return t('dayAgo', { n: days });
  };

  const formatEventDate = (date: string): string =>
    new Date(date).toLocaleString(locale === 'en' ? 'en-US' : 'es-AR', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
    });

  useEffect(() => {
    if (!token) return;

    fetch(apiUrl(`/api/orders/${token}`))
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.message || 'Orden no encontrada');
        }
      })
      .catch(() => setError(t('loadError')))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="text-center py-20">
        <h1 className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
          {t('notFound')}
        </h1>
        <p className="text-sm text-black/40">{error || t('invalidLink')}</p>
      </div>
    );
  }

  // Preferimos el status del polling de tracking sobre el snapshot inicial.
  const effectiveStatus = tracking?.status ?? order.fulfillment.status;
  const isNegative = NEGATIVE_STATUSES.includes(effectiveStatus);

  const paymentStyle = PAYMENT_STYLES[order.payment.status] || PAYMENT_STYLES.pending;
  const paymentLabel = t(`paymentLabels.${order.payment.status}`);
  const milestoneIndex = isNegative ? -1 : findMilestoneIndex(effectiveStatus);
  const events = tracking?.events ?? [];

  // Para los estados negativos, las descripciones (warn/error tone) vienen del JSON.
  // Tomamos la "tone" como warn solo para 'incident'; el resto son error.
  const negativeTone: 'warn' | 'error' = effectiveStatus === 'incident' ? 'warn' : 'error';

  return (
    <div className="max-w-lg mx-auto space-y-10 py-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="font-trueTypewriter text-xs text-black/30 uppercase tracking-widest">{t('order')}</p>
        <h1 className="font-gillsans text-3xl font-medium uppercase tracking-wider">
          {order.orderNumber}
        </h1>
        <p className="text-xs text-black/30">
          {new Date(order.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Payment badge */}
      <div className="flex items-center justify-between px-4 py-3 border border-black/10">
        <span className="text-sm text-black/60">{t('paymentStatus')}</span>
        <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider border ${paymentStyle}`}>
          {paymentLabel}
        </span>
      </div>

      {/* Negative state banner */}
      {order.payment.status === 'approved' && isNegative && (
        <div className={`border p-5 space-y-2 ${
          negativeTone === 'error'
            ? 'border-red-300/30 bg-red-50/50 text-red-800'
            : 'border-yellow-300/40 bg-yellow-50/50 text-yellow-800'
        }`}>
          <p className="font-gillsans font-medium uppercase tracking-wider text-sm">{t(`negative.${effectiveStatus}.label`)}</p>
          <p className="text-sm">{t(`negative.${effectiveStatus}.description`)}</p>
        </div>
      )}

      {/* Fulfillment timeline */}
      {order.payment.status === 'approved' && !isNegative && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('shippingStatus')}</h3>
            <button
              type="button"
              onClick={() => refreshTracking()}
              className="text-[11px] text-black/40 hover:text-black underline"
              aria-label={t('refresh')}
            >
              {t('refresh')}
            </button>
          </div>
          <div className="pl-1">
            {MILESTONES.map((m, i) => {
              const isActive = i <= milestoneIndex;
              const isCurrent = i === milestoneIndex;
              const isLast = i === MILESTONES.length - 1;

              let timestamp: string | null = null;
              if (m.key === 'paid' && order.payment.paidAt) {
                timestamp = timeAgo(order.payment.paidAt);
              } else if (m.key === 'in_transit' && order.fulfillment.dispatchedAt) {
                timestamp = timeAgo(order.fulfillment.dispatchedAt);
              } else if (m.key === 'delivered' && order.fulfillment.deliveredAt) {
                timestamp = timeAgo(order.fulfillment.deliveredAt);
              }

              return (
                <div key={m.key} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-2.5 h-2.5 rounded-full mt-1.5 transition-colors ${
                      isCurrent
                        ? 'bg-black ring-[3px] ring-black/10'
                        : isActive
                          ? 'bg-black'
                          : 'bg-black/10'
                    }`} />
                    {!isLast && (
                      <div className={`w-px flex-1 min-h-[28px] ${isActive && !isCurrent ? 'bg-black/30' : 'bg-black/8'}`} />
                    )}
                  </div>
                  <div className={`pb-5 ${isActive ? '' : 'opacity-30'}`}>
                    <span className={`text-sm ${isCurrent ? 'font-medium' : ''}`}>{t(`milestones.${m.key}`)}</span>
                    {timestamp && (
                      <span className="text-[11px] text-black/30 ml-2">{timestamp}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {tracking?.estimatedDeliveryDate && !order.fulfillment.deliveredAt && (
            <p className="text-[11px] text-black/40">
              {t('estimatedDelivery')}: {new Date(tracking.estimatedDeliveryDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-AR')}
            </p>
          )}
          {order.fulfillment.andreaniLastCheckedAt && (
            <p className="text-[11px] text-black/20">
              {t('lastChecked')}: {timeAgo(order.fulfillment.andreaniLastCheckedAt)}
            </p>
          )}
        </section>
      )}

      {/* Tracking number */}
      {order.fulfillment.andreaniTrackingNumber && (
        <div className="border border-black/10 p-5 space-y-2">
          <p className="text-xs text-black/40 uppercase tracking-widest">{t('trackingNumber')}</p>
          <p className="font-gillsans text-xl font-medium tracking-[0.2em]">
            {order.fulfillment.andreaniTrackingNumber}
          </p>
          <a
            href={`https://www.andreani.com/#!/informacionEnvio/${order.fulfillment.andreaniTrackingNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm underline text-black/50 hover:text-black transition-colors"
          >
            {t('trackOnAndreani')}
          </a>
        </div>
      )}

      {/* Detailed event log */}
      {events.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('movements')}</h3>
          <ul className="border border-black/10 divide-y divide-black/5">
            {events.map((ev: TrackingEvent, i: number) => (
              <li key={`${ev.fecha}-${i}`} className="px-4 py-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="font-medium uppercase tracking-wider text-xs">{humanizeEventName(ev.estado || ev.evento)}</span>
                  <span className="text-xs text-black/40 shrink-0">{formatEventDate(ev.fecha)}</span>
                </div>
                {(ev.motivo || ev.submotivo) && (
                  <p className="text-xs text-black/50 mt-1">
                    {[ev.motivo, ev.submotivo].filter(Boolean).map(humanizeEventName).join(' · ')}
                  </p>
                )}
                {ev.sucursal && (
                  <p className="text-[11px] text-black/30 mt-1">{t('branch')}: {ev.sucursal}</p>
                )}
                {ev.comentario && (
                  <p className="text-[11px] text-black/30 mt-1 italic">{ev.comentario}</p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Product */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">{tCommon('review.product')}</h3>
        <p className="font-gillsans font-medium">
          {order.product.muralTitle} <span className="text-black/30">—</span> {order.product.variantColorName}
        </p>
        <div className="border border-black/10 divide-y divide-black/5 text-sm">
          {order.walls.map((w, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-black/25 w-4">#{i + 1}</span>
                <span>{(w.widthCm / 100).toFixed(2)}m &times; {(w.heightCm / 100).toFixed(2)}m</span>
                <span className="text-xs text-black/25">
                  {w.panels} {w.panels === 1 ? tCommon('review.panel') : tCommon('review.panels')} {tCommon('review.panelOf')} &middot; {w.printAreaM2.toFixed(2)} m²
                </span>
              </div>
              <span className="font-medium">{formatPrice(w.priceARS, locale)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Totals */}
      <div className="border-t border-black pt-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-black/50">
          <span>{order.totalPrintAreaM2.toFixed(2)} m² &times; {formatPrice(order.product.pricePerM2, locale)}/m²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">{tCommon('summary.subtotalProduct')}</span>
          <span>{formatPrice(order.subtotalProductARS, locale)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">{tCommon('summary.shipping')}</span>
          <span>{formatPrice(order.shipping.costARS, locale)}</span>
        </div>
        <div className="flex justify-between font-gillsans font-medium text-lg border-t border-black pt-2 mt-2">
          <span>{tCommon('summary.total')}</span>
          <span>{formatPrice(order.totalARS, locale)}</span>
        </div>
      </div>

      {/* Shipping address */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">{tCommon('review.shippingAddress')}</h3>
        <div className="text-sm text-black/60 leading-relaxed">
          <p className="font-medium text-black/80">
            {order.shipping.recipientName}
            {order.shipping.recipientDni && (
              <span className="text-black/40 font-normal ml-2">{tCommon('review.dni')} {order.shipping.recipientDni}</span>
            )}
          </p>
          <p>
            {order.shipping.street} {order.shipping.number}
            {order.shipping.floor ? `, ${tCommon('review.floorLabel')} ${order.shipping.floor}` : ''}
            {order.shipping.apartment ? `, ${tCommon('review.aptLabel')} ${order.shipping.apartment}` : ''}
          </p>
          <p>{order.shipping.city}, {order.shipping.province} — {tCommon('review.postalCodeLabel')} {order.shipping.postalCode}</p>
        </div>
      </section>

      <div className="text-center pt-4 border-t border-black/5">
        <p className="text-xs text-black/25">
          {t('helpQuestion')}{' '}
          <a
            href="https://wa.me/5491160208460"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black/40 hover:text-black transition-colors"
          >
            {tCommon('shipping.contactWhatsApp')}
          </a>
        </p>
      </div>
    </div>
  );
};
