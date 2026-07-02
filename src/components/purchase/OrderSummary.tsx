'use client';

import { useTranslations } from 'next-intl';

interface Props {
  subtotal: number;                      // subtotal FINAL (con descuento aplicado)
  subtotalBeforeDiscount?: number;       // subtotal original — para tachar cuando hay promo
  discountAmount?: number;               // monto absoluto del descuento
  promoLabel?: string;                   // ej. "LANZAMIENTO" para mostrar en la línea
  promoDiscountPct?: number;             // % de descuento — usamos este directo para la etiqueta y evitar drift por redondeo
  totalArea?: number;
  pricePerM2?: number;
  productType?: string;
  shippingCost?: number;
  shippingOriginalCost?: number;     // precio Andreani real, para tachar en free shipping
  shippingIsFree?: boolean;
  shippingMethod?: 'delivery' | 'pickup';   // pickup oculta la línea de Andreani
  total?: number;
  formatPrice: (n: number) => string;
  compact?: boolean;
}

export const OrderSummary = ({
  subtotal,
  subtotalBeforeDiscount,
  discountAmount = 0,
  promoLabel,
  promoDiscountPct,
  totalArea,
  pricePerM2,
  productType,
  shippingCost,
  shippingOriginalCost,
  shippingIsFree,
  shippingMethod,
  total,
  formatPrice,
  compact = false,
}: Props) => {
  const t = useTranslations('purchase.summary');
  const isPickup = shippingMethod === 'pickup';
  // Pickup: sin envío, sin línea Andreani, sin descuento tachado.
  const effectiveShippingCost = isPickup ? 0 : shippingCost;
  const displayTotal = total ?? (subtotal + (effectiveShippingCost ?? 0));
  const typeLabel = productType === 'pattern' ? t('typePattern') : t('typeMural');
  const showStrikethrough = !isPickup && shippingIsFree && shippingOriginalCost && shippingOriginalCost > 0;

  return (
    <div className={`border-t border-black ${compact ? 'pt-3 mt-3' : 'pt-4 mt-6'} space-y-2`}>
      {/* Area & price per m2 context */}
      {totalArea !== undefined && totalArea > 0 && pricePerM2 !== undefined && (
        <div className="flex justify-between text-xs text-black/40">
          <span>{totalArea.toFixed(2)} {t('printAreaSuffix')} &times; {formatPrice(pricePerM2)}/m² ({typeLabel})</span>
        </div>
      )}

      {/* Cuando hay promo, mostramos: subtotal original + línea de descuento en verde. */}
      {discountAmount > 0 && subtotalBeforeDiscount ? (
        <>
          <div className="flex justify-between text-sm">
            <span className="text-black/60">{t('subtotalProduct')}</span>
            <span className="text-black/60">{formatPrice(subtotalBeforeDiscount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-green-700">
              {promoLabel ? `${promoLabel} ` : ''}(-{promoDiscountPct ?? Math.round((discountAmount / subtotalBeforeDiscount) * 100)}%)
            </span>
            <span className="text-green-700 font-medium">− {formatPrice(discountAmount)}</span>
          </div>
        </>
      ) : (
        <div className="flex justify-between text-sm">
          <span className="text-black/60">{t('subtotalProduct')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
      )}

      {isPickup ? (
        <div className="flex justify-between items-baseline text-sm">
          <span className="text-black/60">{t('shippingLabel')}</span>
          <span className="text-black/60">{t('pickupInSummary')}</span>
        </div>
      ) : shippingCost !== undefined && (
        <div className="flex justify-between items-baseline text-sm">
          <span className="text-black/60">{t('shipping')}</span>
          {showStrikethrough ? (
            <span className="flex items-baseline gap-2">
              <span className="text-black/35 line-through">{formatPrice(shippingOriginalCost!)}</span>
              <span className="text-green-700 font-medium">{t('freeShipping')}</span>
            </span>
          ) : (
            <span>{formatPrice(shippingCost)}</span>
          )}
        </div>
      )}

      <div className="flex justify-between font-gillsans font-medium text-lg border-t border-black pt-2 mt-2">
        <span>{t('total')}</span>
        <span>{formatPrice(displayTotal)}</span>
      </div>

      <p className="text-xs text-black/50 italic">{t('ivaIncluded')}</p>
    </div>
  );
};
