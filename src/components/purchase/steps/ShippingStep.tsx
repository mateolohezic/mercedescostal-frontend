'use client';

import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormErrorMessage } from '@/components';
import { ChevronDownIcon } from '@/icons';
import { OrderSummary } from '../OrderSummary';
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
  const { register, formState: { errors }, watch } = form;
  const postalCode = watch('postalCode');
  const isPostalCodeValid = /^\d{4}$/.test(postalCode || '');
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-fetch shipping when postal code becomes 4 digits (#9)
  useEffect(() => {
    if (!isPostalCodeValid) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onFetchShipping();
    }, 600);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postalCode, isPostalCodeValid]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-gillsans text-2xl font-medium uppercase tracking-wider">
          Datos de envío
        </h2>
        <p className="text-sm text-black/40 mt-1">Ingresá la dirección donde querés recibir tu pedido</p>
      </div>

      <div className="space-y-5">
        {/* Recipient */}
        <div className="space-y-1.5">
          <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="recipient-name">
            Nombre del destinatario
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

        {/* Street + Number */}
        <div className="flex gap-3">
          <div className="flex-[3] space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="street">Calle</label>
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
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="street-number">Número</label>
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
              Piso <span className="text-black/25">(opcional)</span>
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
              Depto <span className="text-black/25">(opcional)</span>
            </label>
            <input
              id="apartment"
              type="text"
              className="w-full h-12 px-4 bg-white border border-black/20 font-gillsans focus:border-black focus:outline-none transition-colors"
              {...register('apartment')}
            />
          </div>
        </div>

        {/* City + Province */}
        <div className="flex gap-3">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="city">Ciudad</label>
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
            <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="province">Provincia</label>
            <div className="relative">
              <select
                id="province"
                className="w-full h-12 px-4 pr-10 bg-white border border-black/20 appearance-none font-gillsans focus:border-black focus:outline-none transition-colors cursor-pointer"
                {...register('province')}
              >
                <option value="">Seleccionar</option>
                {PROVINCES.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
            </div>
            <FormErrorMessage condition={errors.province} message={errors.province?.message} />
          </div>
        </div>

        {/* Postal Code */}
        <div className="space-y-1.5">
          <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="postal-code">
            Código Postal
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
            {shippingLoading && (
              <div className="flex items-center gap-2 text-sm text-black/40">
                <div className="w-4 h-4 border-2 border-black/10 border-t-black/40 rounded-full animate-spin" />
                <span>Cotizando envío...</span>
              </div>
            )}
          </div>
          <FormErrorMessage condition={errors.postalCode} message={errors.postalCode?.message} />
        </div>

        {/* Shipping result */}
        {shippingError && (
          <div className="border border-red-200/50 bg-red-50/50 p-4 space-y-2">
            <p className="text-sm text-red-700/80">{shippingError}</p>
            <p className="text-xs text-black/40">
              ¿Problemas con el envío?{' '}
              <a
                href="https://wa.me/5491160208460"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-black/60 hover:text-black transition-colors"
              >
                Contactanos por WhatsApp
              </a>
            </p>
          </div>
        )}

        {shippingCost !== null && !shippingLoading && (
          <div className="border border-black/10 p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-black/60">Envío por Andreani</span>
              <span className="font-gillsans font-medium">{formatPrice(shippingCost)}</span>
            </div>
            {shippingEstimatedDays && (
              <p className="text-xs text-black/30">Plazo estimado: {shippingEstimatedDays}</p>
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
          Volver
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={shippingCost === null}
          className="flex-[2] py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/15 disabled:text-black/30 disabled:cursor-not-allowed"
        >
          Revisar pedido
        </button>
      </div>
    </div>
  );
};
