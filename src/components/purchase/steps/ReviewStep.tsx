'use client';

import { useState } from 'react';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { FormErrorMessage } from '@/components';
import { OrderSummary } from '../OrderSummary';
import { ConfirmPurchaseModal } from '../ConfirmPurchaseModal';
import type { PurchaseFormData } from '../PurchaseFlow';
import type { WallCalculation } from '@/hooks/usePurchasePricing';

interface Props {
  form: UseFormReturn<PurchaseFormData>;
  calculatedWalls: WallCalculation[];
  subtotal: number;
  subtotalBeforeDiscount?: number;
  discountAmount?: number;
  promoLabel?: string;
  promoDiscountPct?: number;
  totalArea: number;
  pricePerM2: number;
  productType: string;
  shippingCost: number;
  shippingOriginalCost?: number;
  shippingIsFree?: boolean;
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
  subtotalBeforeDiscount,
  discountAmount,
  promoLabel,
  promoDiscountPct,
  totalArea,
  pricePerM2,
  productType,
  shippingCost,
  shippingOriginalCost,
  shippingIsFree,
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
  const params = useParams();
  const locale = (params?.locale as string) || 'es';
  const { register, formState: { errors }, watch, setValue } = form;

  const termsAccepted = watch('termsAccepted');
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Cuando el user aprieta "Pagar": NO mandamos al back todavía. Abrimos el modal
  // de doble confirmación con las medidas grandes. Solo si confirma ahí, hacemos onSubmit().
  const handlePayClick = () => {
    if (!termsAccepted) return;
    setConfirmOpen(true);
  };

  const handleConfirmInModal = () => {
    setConfirmOpen(false);
    onSubmit();
  };

  const totalARS = subtotal + shippingCost;

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
      {(() => {
        const isContinuous = watch('wallsAreContinuous') && calculatedWalls.length >= 2;
        const totalPanels = calculatedWalls.reduce((s, w) => s + w.panels, 0);
        const totalArea = calculatedWalls.reduce((s, w) => s + w.printAreaM2, 0);
        const totalPrice = calculatedWalls.reduce((s, w) => s + w.priceARS, 0);
        return (
          <section className="space-y-2">
            <h3 className="text-xs text-black/40 uppercase tracking-widest">{t('walls')}</h3>
            <div className="border border-black/10 divide-y divide-black/5">
              {calculatedWalls.map((w, i) => (
                <div key={i} className="px-4 py-3 text-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-black/30 w-4 shrink-0">#{i + 1}</span>
                      <span className="font-medium">
                        {(w.widthCm / 100).toFixed(2)}m &times; {(w.heightCm / 100).toFixed(2)}m
                      </span>
                    </div>
                    {/* Precio por pared solo cuando NO son continuas — en grupo el precio real
                        vive en el total del grupo abajo (la distribución por pared es proporcional). */}
                    {!isContinuous && (
                      <span className="font-medium shrink-0">{formatPrice(w.priceARS)}</span>
                    )}
                  </div>
                  {/* Breakdown de paneles/área/excess solo cuando son independientes.
                      En continuas se muestra el total del grupo abajo (una sola línea). */}
                  {!isContinuous && (
                    <div className="mt-1 ml-7 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-black/40">
                      <span>{w.panels} {w.panels === 1 ? t('panel') : t('panels')} {t('panelOf')}</span>
                      <span className="text-black/15">·</span>
                      <span>{w.printAreaM2.toFixed(2)} m²</span>
                      {(w.verticalExcessCm > 0 || w.horizontalExcessCm > 0) && (
                        <>
                          <span className="text-black/15">·</span>
                          <span>
                            {w.verticalExcessCm > 0 && `+${w.verticalExcessCm}cm alto`}
                            {w.verticalExcessCm > 0 && w.horizontalExcessCm > 0 && ' · '}
                            {w.horizontalExcessCm > 0 && `+${w.horizontalExcessCm}cm ancho`}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))}
              {isContinuous && (
                <div className="px-4 py-3 bg-black/[0.02] flex items-center justify-between text-sm">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-black/40">
                      Total grupo (continuo)
                    </span>
                    <span className="block text-[11px] text-black/40 mt-0.5">
                      {totalPanels} {totalPanels === 1 ? t('panel') : t('panels')} {t('panelOf')}
                      <span className="text-black/15 mx-1.5">·</span>
                      {totalArea.toFixed(2)} m²
                    </span>
                  </div>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* Shipping address / pickup */}
      <section className="space-y-2">
        <h3 className="text-xs text-black/40 uppercase tracking-widest">
          {watch('shippingMethod') === 'pickup' ? t('pickupHeader') : t('shippingAddress')}
        </h3>
        {watch('shippingMethod') === 'pickup' ? (
          <div className="text-sm leading-relaxed text-black/70">
            <p className="font-medium text-black">
              Av. Perón 2400 — Yerba Buena, Tucumán
            </p>
            <p className="text-xs text-black/40 mt-1">
              {t('pickupCoordinationShort')}
            </p>
            <p className="mt-2 text-black">
              {t('pickupBy')}: <span className="font-medium">{watch('recipientName')}</span>
              {watch('recipientDni') && (
                <span className="text-black/40 font-normal ml-2">{t('dni')} {watch('recipientDni')}</span>
              )}
            </p>
          </div>
        ) : (
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
        )}
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

      {/* Factura A — aviso al cliente */}
      <section className="border border-black/10 bg-white p-4 flex items-start gap-3">
        <span className="text-base shrink-0">🧾</span>
        <div className="text-sm leading-relaxed text-black/70 space-y-1">
          <p className="font-medium text-black">¿Necesitás factura A?</p>
          <p>
            Por defecto emitimos factura B. Si necesitás factura A,
            respondé al mail de confirmación de tu pedido con
            <strong> CUIT, razón social y condición frente al IVA</strong>.
          </p>
        </div>
      </section>

      {/* Summary */}
      <OrderSummary
        subtotal={subtotal}
        subtotalBeforeDiscount={subtotalBeforeDiscount}
        discountAmount={discountAmount}
        promoLabel={promoLabel}
        promoDiscountPct={promoDiscountPct}
        totalArea={totalArea}
        pricePerM2={pricePerM2}
        shippingOriginalCost={shippingOriginalCost}
        shippingIsFree={shippingIsFree}
        shippingMethod={watch('shippingMethod')}
        productType={productType}
        shippingCost={shippingCost}
        formatPrice={formatPrice}
      />

      {/* Aceptación legal — checkbox único. El back valida que sea true Y que la versión
          coincida con la vigente. Copy corto y limpio: el detalle vive en /terminos. */}
      <section className="border border-black/10 p-5 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={!!termsAccepted}
            onChange={e => setValue('termsAccepted', e.target.checked, { shouldValidate: true })}
            className="mt-0.5 size-4 shrink-0 accent-black cursor-pointer"
          />
          <span className="text-sm leading-relaxed text-black/70">
            Confirmo que las medidas son las reales de mis paredes y leí los{' '}
            <Link
              href={`/${locale}/terminos`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium text-black hover:opacity-70 transition-opacity"
              onClick={e => e.stopPropagation()}
            >
              términos y condiciones
            </Link>
            .
          </span>
        </label>
        {errors.termsAccepted && (
          <p className="text-xs text-red-700/80 ml-7">Necesitamos que aceptes los términos para continuar.</p>
        )}
      </section>

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
          onClick={handlePayClick}
          disabled={submitting || !termsAccepted}
          className="flex-[2] py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/15 disabled:text-black/30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

      <ConfirmPurchaseModal
        open={confirmOpen}
        walls={calculatedWalls}
        totalAreaM2={totalArea}
        totalARS={totalARS}
        formatPrice={formatPrice}
        submitting={submitting}
        onConfirm={handleConfirmInModal}
        onCancel={() => setConfirmOpen(false)}
      />
    </div>
  );
};
