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
  shippingCost: number | null;
  shippingLoading: boolean;
  shippingError: string | null;
  shippingEstimatedDays: string | undefined;
  onFetchShipping: () => void;
  formatPrice: (n: number) => string;
  onNext: () => void;
  onBack: () => void;
}

const PROVINCES = [
  'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
  'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
  'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
  'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán',
];

export const ShippingStep = ({
  form,
  subtotal,
  shippingCost,
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
  // Marca true después del primer lookup completado para este CP — evita que los
  // inputs manuales aparezcan brevemente durante los 500ms del debounce inicial.
  const [lookupAttempted, setLookupAttempted] = useState(false);

  // Cuando el CP es válido: 1) lookup de localidad/provincia, 2) cotización de envío.
  // Ambos se debouncean a 500ms juntos para no martillar el back.
  useEffect(() => {
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
  }, [postalCode, isPostalCodeValid]);

  const hasSingleLocality = localityOptions.length === 1;
  const hasMultipleLocalities = localityOptions.length > 1;
  // Fallback manual: CP válido, ya hicimos lookup y no encontramos nada (404 o error).
  const needsManualEntry = isPostalCodeValid && lookupAttempted && !localityLoading && localityOptions.length === 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-gillsans text-2xl font-medium uppercase tracking-wider">
          {tCommon('steps.shipping')}
        </h2>
        <p className="text-sm text-black/40 mt-1">{t('subtitle')}</p>
      </div>

      <div className="space-y-5">
        {/* Recipient + DNI */}
        <div className="flex gap-3">
          <div className="flex-[2] space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="recipient-name">
              {t('recipientName')}
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

        {/* Postal Code (primero — autocompleta ciudad/provincia) */}
        <div className="space-y-1.5">
          <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="postal-code">
            {t('postalCode')}
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

        {/* Localidad detectada / selector / fallback manual */}
        {hasSingleLocality && cityValue && provinceValue && (
          <div className="flex items-center gap-2 text-sm text-black/70 bg-black/[0.03] border border-black/5 px-3 py-2">
            <span className="text-black/40 text-xs uppercase tracking-wider">{t('city')}:</span>
            <span className="font-medium">{cityValue}</span>
            <span className="text-black/20">·</span>
            <span className="text-black/40 text-xs uppercase tracking-wider">{t('province')}:</span>
            <span className="font-medium">{provinceValue}</span>
          </div>
        )}

        {hasMultipleLocalities && (
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

        {needsManualEntry && (
          <div className="flex gap-3">
            <div className="flex-1 space-y-1.5">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="city">{t('city')}</label>
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
                {...register('city')}
              />
              <FormErrorMessage condition={errors.city} message={errors.city?.message} />
            </div>
            <div className="flex-1 space-y-1.5">
              <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="province">{t('province')}</label>
              <div className="relative">
                <select
                  id="province"
                  className="w-full h-12 px-4 pr-10 bg-white border border-black/20 appearance-none font-gillsans focus:border-black focus:outline-none transition-colors cursor-pointer"
                  {...register('province')}
                >
                  <option value="">{t('selectProvince')}</option>
                  {PROVINCES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
              </div>
              <FormErrorMessage condition={errors.province} message={errors.province?.message} />
            </div>
          </div>
        )}

        {/* Street + Number */}
        <div className="flex gap-3">
          <div className="flex-[3] space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="street">{t('street')}</label>
            <input
              id="street"
              type="text"
              autoComplete="address-line1"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('street')}
            />
            <FormErrorMessage condition={errors.street} message={errors.street?.message} />
          </div>
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="street-number">{t('number')}</label>
            <input
              id="street-number"
              type="text"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('streetNumber')}
            />
            <FormErrorMessage condition={errors.streetNumber} message={errors.streetNumber?.message} />
          </div>
        </div>

        {/* Floor + Apartment */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="floor">
              {t('floor')}
            </label>
            <input
              id="floor"
              type="text"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
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
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('apartment')}
            />
          </div>
        </div>

        {/* Shipping result */}
        {shippingError && (
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

        {shippingCost !== null && !shippingLoading && (
          <div className="border border-black/10 p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60">{t('shippingByAndreani')}</span>
              {shippingCost === 0 ? (
                <span className="font-gillsans font-medium text-green-700">{t('freeShipping')}</span>
              ) : (
                <span className="font-gillsans font-medium">{formatPrice(shippingCost)}</span>
              )}
            </div>
            {shippingEstimatedDays && shippingCost > 0 && (
              <p className="text-xs text-black/30">{t('estimatedDays')}: {shippingEstimatedDays}</p>
            )}
          </div>
        )}
      </div>

      {/* Summary */}
      <OrderSummary
        subtotal={subtotal}
        shippingCost={shippingCost ?? undefined}
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
          disabled={shippingCost === null}
          className="flex-[2] py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/15 disabled:text-black/30 disabled:cursor-not-allowed"
        >
          {t('reviewOrder')}
        </button>
      </div>
    </div>
  );
};
