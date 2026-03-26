'use client';

import { useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

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
    status: string;
    andreaniTrackingNumber?: string;
    andreaniLastCheckedAt?: string;
    dispatchedAt?: string;
    deliveredAt?: string;
  };
  createdAt: string;
}

const PAYMENT_LABELS: Record<string, { label: string; style: string }> = {
  pending: { label: 'Pendiente', style: 'border-yellow-400/30 text-yellow-700 bg-yellow-50' },
  approved: { label: 'Aprobado', style: 'border-black/10 text-black bg-black/5' },
  rejected: { label: 'Rechazado', style: 'border-red-300/30 text-red-700 bg-red-50' },
  cancelled: { label: 'Cancelado', style: 'border-black/10 text-black/40 bg-black/3' },
  in_process: { label: 'En proceso', style: 'border-blue-300/30 text-blue-700 bg-blue-50' },
  refunded: { label: 'Reembolsado', style: 'border-purple-300/30 text-purple-700 bg-purple-50' },
};

const FULFILLMENT_STEPS = [
  { key: 'waiting_payment', label: 'Esperando pago' },
  { key: 'pending_dispatch', label: 'En producción' },
  { key: 'dispatched', label: 'Despachado' },
  { key: 'in_transit', label: 'En tránsito' },
  { key: 'delivered', label: 'Entregado' },
];

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function timeAgo(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Hace instantes';
  if (minutes < 60) return `Hace ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days} día${days > 1 ? 's' : ''}`;
}

interface Props {
  token: string;
}

export const OrderStatusView = ({ token }: Props) => {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    fetch(`${API_BASE}/api/orders/${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setOrder(data.data);
        } else {
          setError(data.message || 'Orden no encontrada');
        }
      })
      .catch(() => setError('Error al cargar la orden'))
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
          Orden no encontrada
        </h1>
        <p className="text-sm text-black/40">{error || 'El link puede haber expirado o ser inválido.'}</p>
      </div>
    );
  }

  const paymentInfo = PAYMENT_LABELS[order.payment.status] || PAYMENT_LABELS.pending;
  const currentFulfillmentIndex = FULFILLMENT_STEPS.findIndex(s => s.key === order.fulfillment.status);

  return (
    <div className="max-w-lg mx-auto space-y-10 py-8">
      {/* Header */}
      <div className="text-center space-y-1">
        <p className="font-trueTypewriter text-xs text-black/30 uppercase tracking-widest">Pedido</p>
        <h1 className="font-gillsans text-3xl font-medium uppercase tracking-wider">
          {order.orderNumber}
        </h1>
        <p className="text-xs text-black/30">
          {new Date(order.createdAt).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Payment badge */}
      <div className="flex items-center justify-between px-4 py-3 border border-black/10">
        <span className="text-sm text-black/60">Estado del pago</span>
        <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider border ${paymentInfo.style}`}>
          {paymentInfo.label}
        </span>
      </div>

      {/* Fulfillment timeline */}
      {order.payment.status === 'approved' && (
        <section className="space-y-4">
          <h3 className="text-xs text-black/40 uppercase tracking-widest">Estado del envío</h3>
          <div className="pl-1">
            {FULFILLMENT_STEPS.map((stepItem, i) => {
              const isActive = i <= currentFulfillmentIndex;
              const isCurrent = i === currentFulfillmentIndex;
              const isLast = i === FULFILLMENT_STEPS.length - 1;

              // Show timestamp for relevant steps
              let timestamp: string | null = null;
              if (stepItem.key === 'dispatched' && order.fulfillment.dispatchedAt) {
                timestamp = timeAgo(order.fulfillment.dispatchedAt);
              } else if (stepItem.key === 'delivered' && order.fulfillment.deliveredAt) {
                timestamp = timeAgo(order.fulfillment.deliveredAt);
              } else if (stepItem.key === 'waiting_payment' && order.payment.paidAt) {
                timestamp = timeAgo(order.payment.paidAt);
              }

              return (
                <div key={stepItem.key} className="flex gap-4">
                  {/* Dot + line */}
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

                  {/* Label + timestamp */}
                  <div className={`pb-5 ${isActive ? '' : 'opacity-30'}`}>
                    <span className={`text-sm ${isCurrent ? 'font-medium' : ''}`}>
                      {stepItem.label}
                    </span>
                    {timestamp && (
                      <span className="text-[11px] text-black/30 ml-2">{timestamp}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Last checked */}
          {order.fulfillment.andreaniLastCheckedAt && (
            <p className="text-[11px] text-black/20">
              Última consulta a Andreani: {timeAgo(order.fulfillment.andreaniLastCheckedAt)}
            </p>
          )}
        </section>
      )}

      {/* Tracking */}
      {order.fulfillment.andreaniTrackingNumber && (
        <div className="border border-black/10 p-5 space-y-2">
          <p className="text-xs text-black/40 uppercase tracking-widest">Código de seguimiento</p>
          <p className="font-gillsans text-xl font-medium tracking-[0.2em]">
            {order.fulfillment.andreaniTrackingNumber}
          </p>
          <a
            href={`https://www.andreani.com/#!/informacionEnvio/${order.fulfillment.andreaniTrackingNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm underline text-black/50 hover:text-black transition-colors"
          >
            Rastrear en andreani.com
          </a>
        </div>
      )}

      {/* Product */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">Producto</h3>
        <p className="font-gillsans font-medium">
          {order.product.muralTitle} <span className="text-black/30">—</span> {order.product.variantColorName}
        </p>
        <div className="border border-black/10 divide-y divide-black/5 text-sm">
          {order.walls.map((w, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-black/25 w-4">#{i + 1}</span>
                <span>{(w.widthCm / 100).toFixed(2)}m &times; {(w.heightCm / 100).toFixed(2)}m</span>
                <span className="text-xs text-black/25">{w.panels} {w.panels === 1 ? 'pan.' : 'pan.'} de 0.50m &middot; {w.printAreaM2.toFixed(2)} m²</span>
              </div>
              <span className="font-medium">{formatPrice(w.priceARS)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Totals */}
      <div className="border-t border-black pt-3 space-y-1.5 text-sm">
        <div className="flex justify-between text-black/50">
          <span>{order.totalPrintAreaM2.toFixed(2)} m² &times; {formatPrice(order.product.pricePerM2)}/m²</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">Subtotal</span>
          <span>{formatPrice(order.subtotalProductARS)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-black/60">Envío</span>
          <span>{formatPrice(order.shipping.costARS)}</span>
        </div>
        <div className="flex justify-between font-gillsans font-medium text-lg border-t border-black pt-2 mt-2">
          <span>Total</span>
          <span>{formatPrice(order.totalARS)}</span>
        </div>
      </div>

      {/* Shipping address */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">Dirección de envío</h3>
        <div className="text-sm text-black/60 leading-relaxed">
          <p className="font-medium text-black/80">{order.shipping.recipientName}</p>
          <p>
            {order.shipping.street} {order.shipping.number}
            {order.shipping.floor ? `, Piso ${order.shipping.floor}` : ''}
          </p>
          <p>{order.shipping.city}, {order.shipping.province} — CP {order.shipping.postalCode}</p>
        </div>
      </section>

      {/* Support */}
      <div className="text-center pt-4 border-t border-black/5">
        <p className="text-xs text-black/25">
          ¿Necesitás ayuda?{' '}
          <a
            href="https://wa.me/5491160208460"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black/40 hover:text-black transition-colors"
          >
            Contactanos por WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
};
