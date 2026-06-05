'use client';

import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { collections } from '@/data/collections';
import { ChevronDownIcon } from '@/icons';
import { WallInput } from '../WallInput';
import { OrderSummary } from '../OrderSummary';
import type { PurchaseFormData } from '../PurchaseFlow';
import type { WallCalculation } from '@/hooks/usePurchasePricing';

interface Props {
  form: UseFormReturn<PurchaseFormData>;
  wallFields: Array<{ id: string }>;
  appendWall: () => void;
  removeWall: (index: number) => void;
  calculatedWalls: WallCalculation[];
  subtotal: number;
  totalArea: number;
  pricePerM2: number;
  productType: string;
  formatPrice: (n: number) => string;
  onNext: () => void;
}

export const ProductStep = ({
  form,
  wallFields,
  appendWall,
  removeWall,
  calculatedWalls,
  subtotal,
  totalArea,
  pricePerM2,
  productType,
  formatPrice,
  onNext,
}: Props) => {
  const t = useTranslations('purchase.product');
  const { register, watch, setValue, formState: { errors } } = form;

  const selectedCollectionId = watch('collectionId');
  const selectedMuralId = watch('muralId');
  const selectedVariant = watch('variantColorName');
  const selectedCollection = collections.find(c => c.id === selectedCollectionId);
  const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId);
  const currentVariant = selectedMural?.variants.find(v => v.colorName === selectedVariant);

  const muralGridRef = useRef<HTMLDivElement>(null);

  // Cuando el usuario elige colección (o si arranca preseleccionada y aún
  // no hay mural), hacemos scroll suave al grid de murales — UX más fluida
  // que un select desplegable.
  const lastScrolledCollection = useRef<string>('');
  useEffect(() => {
    if (
      selectedCollectionId &&
      selectedCollectionId !== lastScrolledCollection.current &&
      !selectedMuralId
    ) {
      lastScrolledCollection.current = selectedCollectionId;
      requestAnimationFrame(() => {
        muralGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [selectedCollectionId, selectedMuralId]);

  const handleSelectCollection = (id: string) => {
    if (id === selectedCollectionId) return;
    setValue('collectionId', id, { shouldValidate: true });
    setValue('muralId', '');
    setValue('variantColorName', '');
  };

  const handleSelectMural = (id: string) => {
    setValue('muralId', id, { shouldValidate: true });
    const mural = selectedCollection?.murales.find(m => m.id === id);
    if (mural?.variants?.[0]) {
      setValue('variantColorName', mural.variants[0].colorName, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h2 className="font-gillsans text-2xl font-medium uppercase tracking-wider">
          {t('title')}
        </h2>
        <p className="text-sm text-black/40 mt-1">{t('subtitle')}</p>
      </div>

      {/* Collection — select desplegable */}
      <div className="space-y-1.5">
        <label htmlFor="collection-select" className="text-xs text-black/50 uppercase tracking-wider">
          {t('collection')}
        </label>
        <div className="relative">
          <select
            id="collection-select"
            value={selectedCollectionId}
            onChange={e => handleSelectCollection(e.target.value)}
            className="w-full h-12 px-4 pr-10 bg-white border border-black/20 appearance-none font-gillsans focus:border-black focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">{t('selectCollection')}</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
        </div>
        {errors.collectionId && !selectedCollectionId && (
          <p className="text-xs text-red-600/80">{t('selectCollection')}</p>
        )}
      </div>

      {/* Mural — grid visual */}
      <div ref={muralGridRef} className="space-y-3 scroll-mt-24">
        <div className="flex items-baseline justify-between">
          <label className="text-xs text-black/50 uppercase tracking-wider">
            {t('mural')}
          </label>
          {selectedCollection && (
            <span className="text-xs text-black/40">
              {t('muralsCount', { count: selectedCollection.murales.length })}
            </span>
          )}
        </div>

        {!selectedCollection ? (
          <div className="border border-dashed border-black/10 py-10 px-4 text-center">
            <p className="text-sm text-black/40">{t('chooseCollectionFirst')}</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCollection.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-2.5"
            >
              {selectedCollection.murales.map(m => {
                const isSelected = m.id === selectedMuralId;
                const baseV = m.variants.find(v => v.base) || m.variants[0];
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleSelectMural(m.id)}
                    className={`group relative aspect-[4/5] overflow-hidden bg-gray-50 transition-all duration-150 ${
                      isSelected ? 'ring-2 ring-black ring-offset-2' : 'hover:opacity-90'
                    }`}
                    aria-pressed={isSelected}
                  >
                    <Image
                      src={baseV.mural}
                      alt={m.title}
                      fill
                      sizes="(max-width: 768px) 50vw, 240px"
                      className={`object-cover transition-transform duration-300 ${
                        isSelected ? 'scale-105' : 'group-hover:scale-105'
                      }`}
                    />
                    <div
                      className={`absolute inset-x-0 bottom-0 px-2.5 py-2 text-left font-gillsans text-xs uppercase tracking-wider transition-colors ${
                        isSelected
                          ? 'bg-black text-white'
                          : 'bg-gradient-to-t from-black/70 via-black/30 to-transparent text-white'
                      }`}
                    >
                      {m.title}
                    </div>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Variant image selector */}
      {selectedMural && selectedMural.variants.length > 1 && (
        <div className="space-y-2.5">
          <label className="text-xs text-black/50 uppercase tracking-wider">{t('variant')}</label>
          <div className="flex flex-wrap gap-2.5">
            {selectedMural.variants.map(v => {
              const isSelected = selectedVariant === v.colorName;
              return (
                <button
                  key={v.colorName}
                  type="button"
                  onClick={() => setValue('variantColorName', v.colorName)}
                  title={v.colorName}
                  className={`relative size-12 shrink-0 rounded-full transition-all duration-150 hover:opacity-80 border-2 ${
                    isSelected ? 'border-black' : 'border-transparent hover:border-black/20'
                  }`}
                >
                  <div className="size-full rounded-full overflow-hidden">
                    <Image
                      src={v.mural}
                      alt={v.colorName}
                      width={96}
                      height={96}
                      className="size-full object-cover"
                    />
                  </div>
                  <span className="sr-only">{v.colorName}</span>
                </button>
              );
            })}
          </div>
          {currentVariant && (
            <p className="text-xs text-black/50 tracking-wide">{currentVariant.colorName}</p>
          )}
        </div>
      )}

      {/* Mobile mural preview (entre variant y walls) */}
      {currentVariant && (
        <div className="lg:hidden relative aspect-[16/9] w-full overflow-hidden bg-gray-50">
          <Image
            src={currentVariant.montaje}
            alt={`${selectedMural?.title} — ${currentVariant.colorName}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 0px"
          />
        </div>
      )}

      {/* Walls */}
      <div className="space-y-3">
        <label className="text-xs text-black/50 uppercase tracking-wider">
          {t('wallMeasures')}
        </label>
        {wallFields.map((field, index) => (
          <WallInput
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            onRemove={() => removeWall(index)}
            canRemove={wallFields.length > 1}
            calculated={calculatedWalls[index]}
            formatPrice={formatPrice}
          />
        ))}

        {wallFields.length < 10 && (
          <button
            type="button"
            onClick={appendWall}
            className="w-full py-3 border border-dashed border-black/15 text-sm text-black/40 hover:border-black/30 hover:text-black/60 transition-all duration-200"
          >
            {t('addWall')}
          </button>
        )}
      </div>

      {/* Summary */}
      {subtotal > 0 && (
        <OrderSummary
          subtotal={subtotal}
          totalArea={totalArea}
          pricePerM2={pricePerM2}
          productType={productType}
          formatPrice={formatPrice}
        />
      )}

      <button
        type="button"
        onClick={onNext}
        disabled={!selectedMuralId || subtotal <= 0}
        className="w-full py-4 bg-black text-white font-gillsans font-medium text-lg uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/15 disabled:text-black/30 disabled:cursor-not-allowed"
      >
        {t('continueShipping')}
      </button>
    </div>
  );
};
