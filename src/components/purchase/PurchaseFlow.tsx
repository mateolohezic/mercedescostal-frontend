'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { collections } from '@/data/collections';
import { usePurchasePricing } from '@/hooks/usePurchasePricing';
import { useShippingQuote } from '@/hooks/useShippingQuote';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { ProductStep } from './steps/ProductStep';
import { ShippingStep } from './steps/ShippingStep';
import { ReviewStep } from './steps/ReviewStep';
import { PurchaseDisclaimers } from './PurchaseDisclaimers';

const schema = z.object({
  collectionId: z.string().min(1, 'Seleccioná una colección'),
  muralId: z.string().min(1, 'Seleccioná un mural'),
  variantColorName: z.string().min(1, 'Seleccioná una variante'),
  walls: z.array(z.object({
    widthM: z.number({ invalid_type_error: 'Ingresá un número' })
      .min(0.30, 'Mínimo 0.30m')
      .max(50, 'Más de 50m: contactá a un vendedor'),
    heightM: z.number({ invalid_type_error: 'Ingresá un número' })
      .min(0.30, 'Mínimo 0.30m')
      .max(10, 'Más de 10m: contactá a un vendedor'),
  })).min(1, 'Agregá al menos una pared').max(10, 'Máximo 10 paredes'),
  recipientName: z.string().min(2, 'Ingresá el nombre del destinatario'),
  street: z.string().min(2, 'Ingresá la calle'),
  streetNumber: z.string().min(1, 'Ingresá el número'),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  city: z.string().min(2, 'Ingresá la ciudad'),
  province: z.string().min(1, 'Seleccioná la provincia'),
  postalCode: z.string().regex(/^\d{4}$/, 'Código postal: 4 dígitos'),
  customerName: z.string().min(2, 'Ingresá tu nombre'),
  customerEmail: z.string().email('Email inválido'),
  customerPhone: z.string().min(6, 'Teléfono inválido'),
});

export type PurchaseFormData = z.infer<typeof schema>;

const STEP_LABELS = ['Producto', 'Envío', 'Pago'];

interface Props {
  preselectedMuralId?: string;
}

export const PurchaseFlow = ({ preselectedMuralId }: Props) => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const [submitted, setSubmitted] = useState(false);
  const { loading: pricingLoading, calculateWalls, formatPrice, getPricePerM2 } = usePurchasePricing();
  const { quote, loading: shippingLoading, error: shippingError, fetchQuote, reset: resetShipping } = useShippingQuote();
  const { createOrder, loading: orderLoading, error: orderError } = useCreateOrder();

  const form = useForm<PurchaseFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      collectionId: '',
      muralId: '',
      variantColorName: '',
      walls: [{ widthM: '' as any, heightM: '' as any }],
      recipientName: '',
      street: '',
      streetNumber: '',
      floor: '',
      apartment: '',
      city: '',
      province: '',
      postalCode: '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
    },
    mode: 'onChange',
  });

  const { fields: wallFields, append: appendWall, remove: removeWall } = useFieldArray({
    control: form.control,
    name: 'walls',
  });

  // Preselect mural from query param
  useEffect(() => {
    if (!preselectedMuralId) return;
    const mural = collections.flatMap(c => c.murales).find(m => m.id === preselectedMuralId);
    if (mural) {
      form.setValue('collectionId', mural.collectionId);
      setTimeout(() => {
        form.setValue('muralId', mural.id);
        if (mural.variants[0]) {
          form.setValue('variantColorName', mural.variants[0].colorName);
        }
      }, 0);
    }
  }, [preselectedMuralId, form]);

  // Determine product type
  const watchedMuralId = form.watch('muralId');
  const watchedVariant = form.watch('variantColorName');

  const productType = useMemo(() => {
    const mural = collections.flatMap(c => c.murales).find(m => m.id === watchedMuralId);
    if (!mural) return 'mural';
    return mural.keywords.some(k =>
      ['patrón', 'patron', 'pattern'].includes(k.toLowerCase())
    ) ? 'pattern' : 'mural';
  }, [watchedMuralId]);

  // Get current mural + variant for preview
  const currentMural = useMemo(
    () => collections.flatMap(c => c.murales).find(m => m.id === watchedMuralId),
    [watchedMuralId]
  );
  const currentVariant = useMemo(
    () => currentMural?.variants.find(v => v.colorName === watchedVariant) || currentMural?.variants[0],
    [currentMural, watchedVariant]
  );

  // Calculate walls pricing
  const watchedWalls = form.watch('walls');
  const wallsInCm = (watchedWalls || []).map(w => ({
    widthCm: Math.round((w.widthM || 0) * 100),
    heightCm: Math.round((w.heightM || 0) * 100),
  }));
  const wallsKey = JSON.stringify(wallsInCm);
  const { walls: calculatedWalls, totalArea, subtotal } = useMemo(
    () => calculateWalls(wallsInCm, productType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallsKey, productType, calculateWalls]
  );

  // Package dimensions
  const packageInfo = useMemo(() => {
    const weightGrams = Math.ceil(totalArea * 500) + 300;
    const maxHeight = Math.max(...wallsInCm.map(w => w.heightCm + 10), 0);
    return { weightGrams, lengthCm: Math.ceil(maxHeight), widthCm: 10, heightCm: 10 };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallsKey, totalArea]);

  // Step navigation
  const goToStep = useCallback((target: number) => {
    setDirection(target > step ? 1 : -1);
    setStep(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  const goToStep2 = async () => {
    const valid = await form.trigger(['collectionId', 'muralId', 'variantColorName', 'walls']);
    if (valid && subtotal > 0) {
      resetShipping();
      goToStep(2);
    }
  };

  const goToStep3 = async () => {
    const valid = await form.trigger(['recipientName', 'street', 'streetNumber', 'city', 'province', 'postalCode']);
    if (valid && quote) {
      goToStep(3);
    }
  };

  const handleFetchShipping = useCallback(() => {
    const postalCode = form.getValues('postalCode');
    if (/^\d{4}$/.test(postalCode) && packageInfo.weightGrams > 0) {
      fetchQuote(postalCode, packageInfo.weightGrams, packageInfo.lengthCm, packageInfo.widthCm, packageInfo.heightCm);
    }
  }, [form, packageInfo, fetchQuote]);

  const handleSubmit = async () => {
    if (submitted) return;
    const valid = await form.trigger();
    if (!valid || !quote) return;

    setSubmitted(true);
    const data = form.getValues();
    const mural = collections.flatMap(c => c.murales).find(m => m.id === data.muralId);
    const collection = collections.find(c => c.id === data.collectionId);

    const result = await createOrder({
      customer: {
        name: data.customerName,
        email: data.customerEmail,
        phone: data.customerPhone,
      },
      product: {
        collectionId: data.collectionId,
        collectionTitle: collection?.title || '',
        muralId: data.muralId,
        muralTitle: mural?.title || '',
        variantColorName: data.variantColorName,
        productType,
      },
      walls: wallsInCm,
      shipping: {
        recipientName: data.recipientName,
        street: data.street,
        number: data.streetNumber,
        floor: data.floor || undefined,
        apartment: data.apartment || undefined,
        postalCode: data.postalCode,
        city: data.city,
        province: data.province,
      },
      locale: 'es',
    });

    if (result?.initPoint) {
      window.location.href = result.initPoint;
    } else {
      setSubmitted(false);
    }
  };

  if (pricingLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const pricePerM2 = getPricePerM2(productType);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4">
      {/* Step indicator */}
      <nav className="flex items-center justify-center gap-0 mb-10" aria-label="Progreso de compra">
        {STEP_LABELS.map((label, i) => {
          const s = i + 1;
          const isActive = s === step;
          const isDone = s < step;
          return (
            <div key={s} className="flex items-center">
              <button
                type="button"
                onClick={() => isDone && goToStep(s)}
                disabled={!isDone}
                className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 ${
                  isDone ? 'cursor-pointer hover:opacity-70' : 'cursor-default'
                }`}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Paso ${s}: ${label}`}
              >
                <span className={`w-7 h-7 flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-black text-white'
                    : isDone
                      ? 'bg-black/80 text-white'
                      : 'border border-black/20 text-black/30'
                }`}>
                  {isDone ? '✓' : s}
                </span>
                <span className={`font-gillsans text-sm uppercase tracking-wider hidden sm:block transition-colors duration-300 ${
                  isActive ? 'text-black' : isDone ? 'text-black/60' : 'text-black/30'
                }`}>
                  {label}
                </span>
              </button>
              {s < 3 && (
                <div className={`w-8 md:w-16 h-px transition-colors duration-300 ${
                  isDone ? 'bg-black/60' : 'bg-black/10'
                }`} />
              )}
            </div>
          );
        })}
      </nav>

      {/* Layout: form + preview */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main form area */}
        <div className="flex-1 min-w-0">
          <form onSubmit={e => e.preventDefault()}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {step === 1 && (
                  <ProductStep
                    form={form}
                    wallFields={wallFields}
                    appendWall={() => appendWall({ widthM: '' as any, heightM: '' as any })}
                    removeWall={removeWall}
                    calculatedWalls={calculatedWalls}
                    subtotal={subtotal}
                    totalArea={totalArea}
                    pricePerM2={pricePerM2}
                    productType={productType}
                    formatPrice={formatPrice}
                    onNext={goToStep2}
                  />
                )}

                {step === 2 && (
                  <ShippingStep
                    form={form}
                    subtotal={subtotal}
                    shippingCost={quote?.costARS ?? null}
                    shippingLoading={shippingLoading}
                    shippingError={shippingError}
                    shippingEstimatedDays={quote?.estimatedDays}
                    onFetchShipping={handleFetchShipping}
                    formatPrice={formatPrice}
                    onNext={goToStep3}
                    onBack={() => goToStep(1)}
                  />
                )}

                {step === 3 && quote && (
                  <ReviewStep
                    form={form}
                    calculatedWalls={calculatedWalls}
                    subtotal={subtotal}
                    totalArea={totalArea}
                    pricePerM2={pricePerM2}
                    productType={productType}
                    shippingCost={quote.costARS}
                    formatPrice={formatPrice}
                    onSubmit={handleSubmit}
                    submitting={orderLoading || submitted}
                    submitError={orderError}
                    onBack={() => goToStep(2)}
                    muralTitle={currentMural?.title || ''}
                    variantColorName={form.watch('variantColorName')}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </form>
        </div>

        {/* Mural preview sidebar */}
        {currentVariant && (
          <div className="hidden lg:block w-72 xl:w-80 shrink-0">
            <div className="sticky top-24 space-y-3">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                <Image
                  src={currentVariant.montaje}
                  alt={`${currentMural?.title} — ${currentVariant.colorName}`}
                  fill
                  className="object-cover"
                  sizes="320px"
                />
              </div>
              <div>
                <p className="font-gillsans font-medium text-sm uppercase tracking-wider">
                  {currentMural?.title}
                </p>
                <p className="text-sm text-black/50">{currentVariant.colorName}</p>
                {pricePerM2 > 0 && (
                  <p className="text-sm text-black/50 mt-1">
                    {formatPrice(pricePerM2)}/m²
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimers footer */}
      <PurchaseDisclaimers />

      {/* Mobile mural preview (compact bar) */}
      {currentVariant && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/10 px-4 py-2 flex items-center gap-3 z-40">
          <div className="relative w-12 h-12 shrink-0 overflow-hidden bg-gray-50">
            <Image
              src={currentVariant.montaje}
              alt={currentMural?.title || ''}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-gillsans text-sm font-medium truncate">{currentMural?.title}</p>
            <p className="text-xs text-black/50 truncate">{currentVariant.colorName}</p>
          </div>
          {subtotal > 0 && (
            <p className="font-gillsans font-medium text-sm shrink-0">{formatPrice(subtotal)}</p>
          )}
        </div>
      )}

      {/* Spacer for mobile bottom bar */}
      {currentVariant && <div className="lg:hidden h-16" />}
    </div>
  );
};
