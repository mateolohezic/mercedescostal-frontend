'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { collections } from '@/data/collections';
import { CheckIcon } from '@/icons';
import { usePurchasePricing } from '@/hooks/usePurchasePricing';
import { useShippingQuote } from '@/hooks/useShippingQuote';
import { useCreateOrder, resetIdempotencyKey } from '@/hooks/useCreateOrder';
import { getCart, saveCart, clearCart, type CartData } from '@/hooks/useCart';
import { ProductStep } from './steps/ProductStep';
import { ShippingStep } from './steps/ShippingStep';
import { ReviewStep } from './steps/ReviewStep';
import { PurchaseDisclaimers } from './PurchaseDisclaimers';

// Schema con mensajes de error como claves i18n. Los componentes que muestran los
// errores (FormErrorMessage / inputs) reciben el mensaje crudo y lo traducen vía
// useTranslations. Esto se hace pasando "errors.X" — Next-intl los resuelve dentro
// del componente. Aquí guardamos solo la key.
const schema = z.object({
  collectionId: z.string().min(1, 'errors.selectCollection'),
  muralId: z.string().min(1, 'errors.selectMural'),
  variantColorName: z.string().min(1, 'errors.selectVariant'),
  walls: z.array(z.object({
    widthCm: z.number({ invalid_type_error: 'errors.enterNumber' })
      .min(30, 'errors.widthMin')
      .max(5000, 'errors.widthMax'),
    heightCm: z.number({ invalid_type_error: 'errors.enterNumber' })
      .min(30, 'errors.heightMin')
      .max(1000, 'errors.heightMax'),
  })).min(1, 'errors.atLeastOneWall').max(10, 'errors.maxTenWalls'),
  recipientName: z.string().min(2, 'errors.enterRecipientName'),
  recipientDni: z.string().regex(/^[\d.\-\s]{7,15}$/, 'errors.invalidDni'),
  street: z.string().min(2, 'errors.enterStreet'),
  streetNumber: z.string().min(1, 'errors.enterStreetNumber'),
  floor: z.string().optional(),
  apartment: z.string().optional(),
  city: z.string().min(2, 'errors.enterCity'),
  province: z.string().min(1, 'errors.selectProvince'),
  postalCode: z.string().regex(/^\d{4}$/, 'errors.postalCode4'),
  customerName: z.string().min(2, 'errors.enterCustomerName'),
  customerEmail: z.string().email('errors.invalidEmail'),
  customerPhone: z.string().min(6, 'errors.invalidPhone'),
});

export type PurchaseFormData = z.infer<typeof schema>;

// Whitelist de hosts válidos para el initPoint que devuelve MP. Si el back devuelve
// algo distinto (URL maliciosa, javascript:, etc.) lo rechazamos antes del redirect.
// Solo dominios de Mercado Pago — sacamos mercadolibre.com.* porque MP no redirige por ahí
// y abre vector de ataque (ej. evil.mercadolibre.com.ar sería válido con endsWith).
const MP_VALID_HOSTS = ['mercadopago.com.ar', 'mercadopago.com'];
function isValidMpInitPoint(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    return MP_VALID_HOSTS.some(h => u.hostname === h || u.hostname.endsWith(`.${h}`));
  } catch {
    return false;
  }
}

interface Props {
  preselectedMuralId?: string;
}

export const PurchaseFlow = ({ preselectedMuralId }: Props) => {
  const routeParams = useParams();
  const locale = (routeParams?.locale as string) || 'es';
  const t = useTranslations('purchase');
  // Traducciones de los step labels en orden.
  const STEP_LABELS = [t('steps.product'), t('steps.shipping'), t('steps.payment')];
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
      walls: [{ widthCm: '' as any, heightCm: '' as any }],
      recipientName: '',
      recipientDni: '',
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
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { fields: wallFields, append: appendWall, remove: removeWall } = useFieldArray({
    control: form.control,
    name: 'walls',
  });

  // Al montar el flujo: limpiamos idempotency keys / tokens stale, y restauramos
  // el carrito guardado en localStorage si hay alguno.
  // - Si hay carrito → validamos que el mural/variante todavía existan en `collections`
  //   y restauramos. Si el mural fue removido (cambio de catálogo), descartamos cart.
  // - Si no hay carrito pero llegamos con ?mural=X → preselect ese mural (existing).
  const [restoredFromCart, setRestoredFromCart] = useState(false);
  // Cuando otra pestaña paga (clearCart), no queremos que esta pestaña re-guarde el
  // form viejo y resucite el carrito ya pagado. Si el `storage` event nos avisa que
  // el cart fue eliminado externamente, freezamos el auto-save.
  const [cartFinalizedExternally, setCartFinalizedExternally] = useState(false);
  useEffect(() => {
    resetIdempotencyKey();
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('mc_magic_token');
      sessionStorage.removeItem('mc_order_number');
    }

    const cart = getCart();
    if (cart && cart.formData && Object.keys(cart.formData).length > 0) {
      // Validamos que el mural y variante restaurados sigan existiendo en el catálogo.
      // Si el cliente cambió de mural ID o sacó una variante, descartamos cart entero
      // para no dejar al user con un form roto sin sidebar/preview.
      const cartMuralId = (cart.formData as any).muralId;
      const cartVariantName = (cart.formData as any).variantColorName;
      const restoredMural = cartMuralId
        ? collections.flatMap(c => c.murales).find(m => m.id === cartMuralId)
        : null;
      const restoredVariant = restoredMural && cartVariantName
        ? restoredMural.variants.find(v => v.colorName === cartVariantName)
        : null;

      if (cartMuralId && !restoredMural) {
        // El mural ya no existe — descartamos cart entero.
        clearCart();
      } else {
        const formDataToRestore = { ...cart.formData } as PurchaseFormData;
        // Si el mural existe pero la variante elegida desapareció, fallback a la primera.
        if (restoredMural && cartVariantName && !restoredVariant) {
          formDataToRestore.variantColorName = restoredMural.variants[0]?.colorName || '';
        }
        form.reset(formDataToRestore);
        if (cart.step && cart.step >= 1 && cart.step <= 3) setStep(cart.step);
        setRestoredFromCart(true);
      }
    }

    // Listen storage event: si OTRA pestaña limpia el carrito (típicamente la que pagó),
    // congelamos el auto-save acá para no resucitarlo.
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'mc_cart_draft' && e.newValue === null) {
        setCartFinalizedExternally(true);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Preselect mural from query param (solo si NO hubo restore desde carrito)
  useEffect(() => {
    if (restoredFromCart) return;
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
  }, [preselectedMuralId, form, restoredFromCart]);

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
    widthCm: Math.round(w.widthCm || 0),
    heightCm: Math.round(w.heightCm || 0),
  }));
  const wallsKey = JSON.stringify(wallsInCm);
  const { walls: calculatedWalls, totalArea, subtotal } = useMemo(
    () => calculateWalls(wallsInCm, productType),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wallsKey, productType, calculateWalls]
  );

  // Auto-save del carrito en localStorage cada vez que cambia el form (debounce 600ms).
  // Una sola subscripción a TODOS los valores via form.watch() — la JSON-stringified key
  // dispara el effect solo cuando algo realmente cambió (evita el "deps explosion" de
  // crear 11 watch() subscripciones nuevas en cada render).
  const allFormValues = form.watch();
  const formValuesKey = JSON.stringify(allFormValues);
  useEffect(() => {
    if (cartFinalizedExternally) return;     // otra pestaña ya pagó — no resucitar
    if (!watchedMuralId) return;             // sin mural seleccionado no tiene sentido
    const handle = setTimeout(() => {
      // currentVariant.mural puede ser un StaticImageData (import) o un string;
      // para localStorage necesitamos un string serializable.
      const muralImageRaw = currentVariant?.mural;
      const muralImage = typeof muralImageRaw === 'string'
        ? muralImageRaw
        : (muralImageRaw as { src?: string } | undefined)?.src;
      const summary: CartData['productSummary'] = {
        muralTitle: currentMural?.title || '',
        variantColorName: currentVariant?.colorName || '',
        collectionTitle: collections.find(c => c.id === allFormValues.collectionId)?.title,
        muralImage,
      };
      saveCart({ formData: allFormValues, productSummary: summary, step });
    }, 600);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValuesKey, step, cartFinalizedExternally]);


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
    const valid = await form.trigger([
      'recipientName', 'recipientDni', 'street', 'streetNumber',
      'city', 'province', 'postalCode',
    ]);
    if (valid && quote) {
      goToStep(3);
    }
  };

  const handleFetchShipping = useCallback(() => {
    const postalCode = form.getValues('postalCode');
    if (/^\d{4}$/.test(postalCode) && totalArea > 0) {
      fetchQuote(postalCode, totalArea);
    }
  }, [form, totalArea, fetchQuote]);

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
        recipientDni: data.recipientDni,
        street: data.street,
        number: data.streetNumber,
        floor: data.floor || undefined,
        apartment: data.apartment || undefined,
        postalCode: data.postalCode,
        city: data.city,
        province: data.province,
      },
      locale,
    });

    // Validamos que el initPoint sea una URL https de un host conocido de Mercado Pago
    // antes de redirigir. Defensa contra response manipulado (ej. javascript: URL).
    if (result?.initPoint && isValidMpInitPoint(result.initPoint)) {
      // Carrito ya cumplió su rol — el user pasa al checkout MP. Si vuelve a /buy
      // queremos que arranque limpio (sea que pague o no, el flow es nuevo).
      clearCart();
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
                  {isDone ? <CheckIcon className="w-4 h-4" aria-hidden="true" /> : s}
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
                    appendWall={() => appendWall({ widthCm: '' as any, heightCm: '' as any })}
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
                    shippingEstimatedDays={quote?.estimatedDays ?? undefined}
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
                    {formatPrice(pricePerM2)}/m² <span className="text-xs text-black/35">({t('summary.ivaShort')})</span>
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
