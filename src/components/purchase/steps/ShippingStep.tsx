'use client';

import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormErrorMessage } from '@/components';
import { ChevronDownIcon } from '@/icons';
import { OrderSummary } from '../OrderSummary';
import { useLocalityLookup } from '@/hooks/useLocalityLookup';
import type { PurchaseFormData } from '../PurchaseFlow';

interface Props {
  form: UseFormReturn<PurchaseFormData>;
  subtotal: number;
  subtotalBeforeDiscount?: number;
  discountAmount?: number;
  promoLabel?: string;
  promoDiscountPct?: number;
  shippingCost: number | null;
  shippingOriginalCost?: number;        // precio Andreani sin descuento (para tachar)
  shippingIsFree?: boolean;             // true cuando el envío fue bonificado
  shippingLoading: boolean;
  shippingError: string | null;
  shippingEstimatedDays: string | undefined;
  onFetchShipping: () => void;
  formatPrice: (n: number) => string;
  onNext: () => void;
  onBack: () => void;
}

export const ShippingStep = ({
  form,
  subtotal,
  subtotalBeforeDiscount,
  discountAmount,
  promoLabel,
  promoDiscountPct,
  shippingCost,
  shippingOriginalCost,
  shippingIsFree,
  shippingLoading,
  shippingError,
  shippingEstimatedDays,
  onFetchShipping,
  formatPrice,
  onNext,
  onBack,
}: Props) => {
  const t = useTranslations('purchase.shipping');
  const tCommon = useTranslations('purchase');
  const { register, formState: { errors }, watch, setValue } = form;
  const postalCode = watch('postalCode');
  const isPostalCodeValid = /^\d{4}$/.test(postalCode || '');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { options: localityOptions, loading: localityLoading, lookup: lookupLocality } = useLocalityLookup();
  const cityValue = watch('city');
  const provinceValue = watch('province');
  const shippingMethod = watch('shippingMethod');
  const isPickup = shippingMethod === 'pickup';
  const isDelivery = shippingMethod === 'delivery';
  // Habilitamos los inputs de dirección solo una vez que hay CP válido Y ya se hizo
  // la cotización. Antes de eso quedan disabled para forzar al user a poner el CP
  // primero (es el driver de todo — sin CP no hay dónde entregar ni cuánto cuesta).
  const [lookupAttempted, setLookupAttempted] = useState(false);
  const addressUnlocked = isPostalCodeValid && lookupAttempted && !localityLoading;

  // Cuando el CP es válido: 1) lookup de localidad/provincia, 2) cotización de envío.
  // Ambos se debouncean a 500ms juntos para no martillar el back.
  // Solo aplica en modo delivery — en pickup ni siquiera vemos CP.
  useEffect(() => {
    if (!isDelivery) return;
    if (!isPostalCodeValid) {
      setLookupAttempted(false);
      return;
    }
    setLookupAttempted(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const opts = await lookupLocality(postalCode);
      // Si hay solo una opción, autocompletamos. Si hay varias, dejamos que el usuario elija.
      if (opts.length === 1) {
        setValue('city', opts[0].city, { shouldValidate: true });
        setValue('province', opts[0].province, { shouldValidate: true });
      }
      setLookupAttempted(true);
      onFetchShipping();
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode, isPostalCodeValid, isDelivery]);

  const hasSingleLocality = localityOptions.length === 1;
  const hasMultipleLocalities = localityOptions.length > 1;
  // CP válido en formato pero Andreani no encuentra localidad: NO abrimos manual entry.
  // Rechazamos ese CP con mensaje claro para evitar que un CP inventado o de otro país
  // pase por la validación (Zod solo pide 4 dígitos, cualquiera colaría).
  const cpNotFound = isPostalCodeValid && lookupAttempted && !localityLoading && localityOptions.length === 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-gillsans text-2xl font-medium uppercase tracking-wider">
          {tCommon('steps.shipping')}
        </h2>
        <p className="text-sm text-black/40 mt-1">{t('subtitle')}</p>
      </div>

      <div className="space-y-5">
        {/* Método de envío: delivery vs pickup en local */}
        <div className="border border-black/10 p-4 space-y-3">
          <p className="text-xs text-black/50 uppercase tracking-wider">
            {t('methodQuestion')}
          </p>
          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="shippingMethod"
                checked={shippingMethod === 'delivery'}
                onChange={() => setValue('shippingMethod', 'delivery', { shouldValidate: true })}
                className="mt-0.5 accent-black cursor-pointer"
              />
              <span className="text-sm leading-relaxed text-black/75">
                <strong className="font-medium">{t('methodDelivery')}</strong>
                <span className="block text-[11px] text-black/40 mt-0.5">{t('methodDeliveryHint')}</span>
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="radio"
                name="shippingMethod"
                checked={shippingMethod === 'pickup'}
                onChange={() => setValue('shippingMethod', 'pickup', { shouldValidate: true })}
                className="mt-0.5 accent-black cursor-pointer"
              />
              <span className="text-sm leading-relaxed text-black/75">
                <strong className="font-medium">{t('methodPickup')}</strong>
                <span className="block text-[11px] text-black/40 mt-0.5">{t('methodPickupHint')}</span>
              </span>
            </label>
          </div>
        </div>

        {isPickup && (
          <div className="border border-black/10 bg-black/[0.02] p-5 space-y-2">
            <p className="text-xs text-black/50 uppercase tracking-wider">{t('pickupAddress')}</p>
            <p className="font-gillsans text-lg font-medium">Av. Perón 2300</p>
            <p className="text-sm text-black/60">Yerba Buena, Tucumán</p>
            <p className="text-xs text-black/40 pt-2">{t('pickupCoordination')}</p>
          </div>
        )}

        {/* Nota: la compra online es solo Argentina. Desde el exterior redirigimos al cotizador. */}
        {isDelivery && (
          <p className="text-[11px] text-black/45 leading-relaxed">
            {t('argOnlyNote')}{' '}
            <a
              href="https://wa.me/5491160208460"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-black/70 hover:text-black transition-colors"
            >
              {t('argOnlyContact')}
            </a>
          </p>
        )}

        {/* Recipient + DNI */}
        <div className="flex gap-3">
          <div className="flex-[2] space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="recipient-name">
              {isPickup ? t('pickupRecipientName') : t('recipientName')}
            </label>
            <input
              id="recipient-name"
              type="text"
              autoComplete="name"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('recipientName')}
            />
            <FormErrorMessage condition={errors.recipientName} message={errors.recipientName?.message} />
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="recipient-dni">
              {t('recipientDni')}
            </label>
            <input
              id="recipient-dni"
              type="text"
              inputMode="numeric"
              maxLength={9}
              placeholder="00000000"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('recipientDni')}
            />
            <FormErrorMessage condition={errors.recipientDni} message={errors.recipientDni?.message} />
          </div>
        </div>

        {/* Postal Code — obligatorio antes del resto de la dirección. */}
        {isDelivery && (
          <div className="space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="postal-code">
              {t('postalCode')} <span className="text-black/30 normal-case tracking-normal">— {t('postalCodeHint')}</span>
            </label>
            <div className="flex items-center gap-3">
              <input
                id="postal-code"
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="1425"
                autoComplete="postal-code"
                className="w-28 h-12 px-4 bg-white border border-black/20 text-center text-lg font-gillsans tracking-widest focus:border-black focus:outline-none transition-colors"
                {...register('postalCode')}
              />
              {(localityLoading || shippingLoading) && (
                <div className="flex items-center gap-2 text-sm text-black/40">
                  <div className="w-4 h-4 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
                  <span>{localityLoading ? t('validatingPostal') : t('quoting')}</span>
                </div>
              )}
            </div>
            <FormErrorMessage condition={errors.postalCode} message={errors.postalCode?.message} />
          </div>
        )}

        {/* Localidad detectada / selector / fallback manual — solo en delivery */}
        {isDelivery && hasSingleLocality && cityValue && provinceValue && (
          <div className="flex items-center gap-2 text-sm text-black/70 bg-black/[0.03] border border-black/5 px-3 py-2">
            <span className="text-black/40 text-xs uppercase tracking-wider">{t('city')}:</span>
            <span className="font-medium">{cityValue}</span>
            <span className="text-black/20">·</span>
            <span className="text-black/40 text-xs uppercase tracking-wider">{t('province')}:</span>
            <span className="font-medium">{provinceValue}</span>
          </div>
        )}

        {isDelivery && hasMultipleLocalities && (
          <div className="space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="city">{t('city')}</label>
            <div className="relative">
              <select
                id="city"
                className="w-full h-12 px-4 pr-10 bg-white border border-black/20 appearance-none font-gillsans focus:border-black focus:outline-none transition-colors cursor-pointer"
                value={cityValue}
                onChange={e => {
                  const opt = localityOptions.find(o => o.city === e.target.value);
                  if (opt) {
                    setValue('city', opt.city, { shouldValidate: true });
                    setValue('province', opt.province, { shouldValidate: true });
                  }
                }}
              >
                <option value="">{t('selectLocality')}</option>
                {localityOptions.map(o => (
                  <option key={o.id} value={o.city}>{o.city}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
            </div>
            {cityValue && provinceValue && (
              <p className="text-xs text-black/40 pt-0.5">
                <span className="uppercase tracking-wider">{t('province')}:</span>{' '}
                <span className="text-black/60 font-medium">{provinceValue}</span>
              </p>
            )}
            <FormErrorMessage condition={errors.city} message={errors.city?.message} />
          </div>
        )}

        {isDelivery && cpNotFound && (
          <div className="border border-red-300/50 bg-red-50/40 p-4 text-sm text-red-800 space-y-2">
            <p className="font-medium">Código postal no encontrado</p>
            <p className="text-red-700/80 text-[13px] leading-relaxed">
              No pudimos verificar ese código postal con Andreani. Revisá que sea un CP argentino
              de 4 dígitos válido, o elegí <strong>Retiro en el local</strong> arriba.
            </p>
            <a
              href="https://wa.me/5491160208460"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[12px] text-red-800 underline hover:text-red-900 mt-1"
            >
              ¿Estás fuera de Argentina? Escribinos por WhatsApp
            </a>
          </div>
        )}

        {/* Street + Number (delivery only, bloqueado hasta CP cotizado) */}
        {isDelivery && (
          <div className="flex gap-3">
            <div className="flex-[3] space-y-1.5">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="street">{t('street')}</label>
              <input
                id="street"
                type="text"
                autoComplete="address-line1"
                disabled={!addressUnlocked}
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors disabled:bg-black/[0.03] disabled:text-black/30 disabled:cursor-not-allowed"
                {...register('street')}
              />
              <FormErrorMessage condition={errors.street} message={errors.street?.message} />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="street-number">{t('number')}</label>
              <input
                id="street-number"
                type="text"
                disabled={!addressUnlocked}
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors disabled:bg-black/[0.03] disabled:text-black/30 disabled:cursor-not-allowed"
                {...register('streetNumber')}
              />
              <FormErrorMessage condition={errors.streetNumber} message={errors.streetNumber?.message} />
            </div>
          </div>
        )}

        {/* Floor + Apartment (delivery only) */}
        {isDelivery && (
          <div className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="floor">
                {t('floor')}
              </label>
              <input
                id="floor"
                type="text"
                disabled={!addressUnlocked}
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors disabled:bg-black/[0.03] disabled:text-black/30 disabled:cursor-not-allowed"
                {...register('floor')}
              />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="apartment">
                {t('apartment')}
              </label>
              <input
                id="apartment"
                type="text"
                disabled={!addressUnlocked}
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors disabled:bg-black/[0.03] disabled:text-black/30 disabled:cursor-not-allowed"
                {...register('apartment')}
              />
            </div>
          </div>
        )}

        {isDelivery && !addressUnlocked && (
          <p className="text-[11px] text-black/40 italic">
            {t('lockedHint')}
          </p>
        )}

        {/* Shipping result — solo si es delivery */}
        {isDelivery && shippingError && (
          <div className="border border-red-200/50 bg-red-50/50 p-4 space-y-2">
            <p className="text-sm text-red-700/80">{shippingError}</p>
            <p className="text-xs text-black/40">
              {t('shippingProblems')}{' '}
              <a
                href="https://wa.me/5491160208460"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-black/60 hover:text-black transition-colors"
              >
                {t('contactWhatsApp')}
              </a>
            </p>
          </div>
        )}

        {isDelivery && shippingCost !== null && !shippingLoading && (
          <div className="border border-black/10 p-4 space-y-1">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-black/60">{t('shippingByAndreani')}</span>
              {shippingIsFree && shippingOriginalCost && shippingOriginalCost > 0 ? (
                <span className="flex items-baseline gap-2">
                  <span className="text-sm text-black/35 line-through">{formatPrice(shippingOriginalCost)}</span>
                  <span className="font-gillsans font-medium text-green-700">
                    {t('freeShipping')} <span className="text-[11px] font-normal text-green-700/60">({t('freeShippingHint')})</span>
                  </span>
                </span>
              ) : shippingCost === 0 ? (
                <span className="font-gillsans font-medium text-green-700">{t('freeShipping')}</span>
              ) : (
                <span className="font-gillsans font-medium">{formatPrice(shippingCost)}</span>
              )}
            </div>
            {shippingEstimatedDays && !shippingIsFree && shippingCost > 0 && (
              <p className="text-xs text-black/30">{t('estimatedDays')}: {shippingEstimatedDays}</p>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <OrderSummary
        subtotal={subtotal}
        subtotalBeforeDiscount={subtotalBeforeDiscount}
        discountAmount={discountAmount}
        promoLabel={promoLabel}
        promoDiscountPct={promoDiscountPct}
        shippingCost={shippingCost ?? undefined}
        shippingOriginalCost={shippingOriginalCost}
        shippingIsFree={shippingIsFree}
        shippingMethod={shippingMethod}
        formatPrice={formatPrice}
        compact
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-4 border border-black/20 font-gillsans font-medium uppercase tracking-wider text-black/60 hover:border-black hover:text-black transition-all duration-200"
        >
          {tCommon('back')}
        </button>
        <button
          type="button"
          onClick={onNext}
          // Pickup: no requiere cotización. Delivery: sí necesita quote válido.
          disabled={isDelivery && shippingCost === null}
          className="flex-[2] py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/15 disabled:text-black/30 disabled:cursor-not-allowed"
        >
          {t('reviewOrder')}
        </button>
      </div>
    </div>
  );
};
