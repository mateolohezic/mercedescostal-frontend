'use client';

import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormErrorMessage } from '@/components';
import { OrderSummary } from '../OrderSummary';
import type { PurchaseFormData } from '../PurchaseFlow';
import type { WallCalculation } from '@/hooks/usePurchasePricing';

interface Props {
  form: UseFormReturn<PurchaseFormData>;
  calculatedWalls: WallCalculation[];
  subtotal: number;
  totalArea: number;
  pricePerM2: number;
  productType: string;
  shippingCost: number;
  formatPrice: (n: number) => string;
  onSubmit: () => void;
  submitting: boolean;
  submitError: string | null;
  onBack: () => void;
  muralTitle: string;
  variantColorName: string;
}

export const ReviewStep = ({
  form,
  calculatedWalls,
  subtotal,
  totalArea,
  pricePerM2,
  productType,
  shippingCost,
  formatPrice,
  onSubmit,
  submitting,
  submitError,
  onBack,
  muralTitle,
  variantColorName,
}: Props) => {
  const t = useTranslations('purchase.review');
  const tCommon = useTranslations('purchase');
  const { register, formState: { errors }, watch } = form;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-gillsans text-2xl font-medium uppercase tracking-wider">
          {tCommon('steps.review')}
        </h2>
        <p className="text-sm text-black/40 mt-1">{t('subtitle')}</p>
      </div>

      {/* Product */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('product')}</h3>
        <p className="font-gillsans font-medium">{muralTitle} <span className="text-black/40">—</span> {variantColorName}</p>
      </section>

      {/* Walls */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('walls')}</h3>
        <div className="border border-black/10 divide-y divide-black/5">
          {calculatedWalls.map((w, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5 text-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs text-black/30 w-4">#{i + 1}</span>
                <span>
                  {(w.widthCm / 100).toFixed(2)}m &times; {(w.heightCm / 100).toFixed(2)}m
                </span>
                <span className="text-xs text-black/30">{w.panels} {w.panels === 1 ? t('panel') : t('panels')} {t('panelOf')} &middot; {w.printAreaM2.toFixed(2)} m²</span>
              </div>
              <span className="font-medium">{formatPrice(w.priceARS)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Shipping address */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('shippingAddress')}</h3>
        <div className="text-sm leading-relaxed text-black/70">
          <p className="font-medium text-black">
            {watch('recipientName')}
            {watch('recipientDni') && (
              <span className="text-black/40 font-normal ml-2">{t('dni')} {watch('recipientDni')}</span>
            )}
          </p>
          <p>
            {watch('street')} {watch('streetNumber')}
            {watch('floor') ? `, ${t('floorLabel')} ${watch('floor')}` : ''}
            {watch('apartment') ? `, ${t('aptLabel')} ${watch('apartment')}` : ''}
          </p>
          <p>{watch('city')}, {watch('province')}</p>
          <p>{t('postalCodeLabel')} {watch('postalCode')}</p>
        </div>
      </section>

      {/* Customer info */}
      <section className="space-y-4">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('yourData')}</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="customer-name">{t('name')}</label>
            <input
              id="customer-name"
              type="text"
              autoComplete="name"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('customerName')}
            />
            <FormErrorMessage condition={errors.customerName} message={errors.customerName?.message} />
          </div>
          <div className="flex gap-3">
            <div className="flex-1 space-y-1">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="customer-email">{t('email')}</label>
              <input
                id="customer-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
                {...register('customerEmail')}
              />
              <FormErrorMessage condition={errors.customerEmail} message={errors.customerEmail?.message} />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="customer-phone">{t('phone')}</label>
              <input
                id="customer-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
                {...register('customerPhone')}
              />
              <FormErrorMessage condition={errors.customerPhone} message={errors.customerPhone?.message} />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-black/30">{t('emailHint')}</p>
      </section>

      {/* Summary */}
      <OrderSummary
        subtotal={subtotal}
        totalArea={totalArea}
        pricePerM2={pricePerM2}
        productType={productType}
        shippingCost={shippingCost}
        formatPrice={formatPrice}
      />

      {/* Submit error */}
      {submitError && (
        <div className="border border-red-200/50 bg-red-50/50 p-4 text-sm text-red-700/80">
          {submitError}
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex-1 py-4 border border-black/20 font-gillsans font-medium uppercase tracking-wider text-black/60 hover:border-black hover:text-black transition-all duration-200 disabled:opacity-40"
        >
          {tCommon('back')}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="flex-[2] py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {t('processing')}
            </>
          ) : (
            t('payWithMP')
          )}
        </button>
      </div>

      <p className="text-[11px] text-black/30 text-center">{t('productionTime')}</p>
    </div>
  );
};
