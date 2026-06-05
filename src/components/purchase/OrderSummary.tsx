'use client';

import { useTranslations } from 'next-intl';

interface Props {
  subtotal: number;
  totalArea?: number;
  pricePerM2?: number;
  productType?: string;
  shippingCost?: number;
  total?: number;
  formatPrice: (n: number) => string;
  compact?: boolean;
}

export const OrderSummary = ({
  subtotal,
  totalArea,
  pricePerM2,
  productType,
  shippingCost,
  total,
  formatPrice,
  compact = false,
}: Props) => {
  const t = useTranslations('purchase.summary');
  const displayTotal = total ?? (subtotal + (shippingCost ?? 0));
  const typeLabel = productType === 'pattern' ? t('typePattern') : t('typeMural');

  return (
    <div className={`border-t border-black ${compact ? 'pt-3 mt-3' : 'pt-4 mt-6'} space-y-2`}>
      {/* Area & price per m2 context */}
      {totalArea !== undefined && totalArea > 0 && pricePerM2 !== undefined && (
        <div className="flex justify-between text-xs text-black/40">
          <span>{totalArea.toFixed(2)} {t('printAreaSuffix')} &times; {formatPrice(pricePerM2)}/m² ({typeLabel})</span>
        </div>
      )}

      <div className="flex justify-between text-sm">
        <span className="text-black/60">{t('subtotalProduct')}</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {shippingCost !== undefined && (
        <div className="flex justify-between text-sm">
          <span className="text-black/60">{t('shipping')}</span>
          <span>{formatPrice(shippingCost)}</span>
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
