'use client';

import { UseFormReturn } from 'react-hook-form';
import Image from 'next/image';
import { collections } from '@/data/collections';
import { FormErrorMessage } from '@/components';
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
  const { register, watch, setValue, formState: { errors } } = form;

  const selectedCollectionId = watch('collectionId');
  const selectedMuralId = watch('muralId');
  const selectedVariant = watch('variantColorName');
  const selectedCollection = collections.find(c => c.id === selectedCollectionId);
  const selectedMural = selectedCollection?.murales.find(m => m.id === selectedMuralId);
  const currentVariant = selectedMural?.variants.find(v => v.colorName === selectedVariant);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-gillsans text-2xl font-medium uppercase tracking-wider">
          Producto y medidas
        </h2>
        <p className="text-sm text-black/40 mt-1">Elegí tu empapelado e ingresá las medidas de tus paredes</p>
      </div>

      {/* Collection */}
      <div className="space-y-1.5">
        <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="collection-select">
          Colección
        </label>
        <div className="relative">
          <select
            id="collection-select"
            className="w-full h-12 px-4 pr-10 bg-white border border-black/20 appearance-none font-gillsans focus:border-black focus:outline-none transition-colors cursor-pointer"
            {...register('collectionId')}
            onChange={(e) => {
              setValue('collectionId', e.target.value);
              setValue('muralId', '');
              setValue('variantColorName', '');
            }}
          >
            <option value="">Seleccionar colección</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
        </div>
        <FormErrorMessage condition={errors.collectionId} message={errors.collectionId?.message} />
      </div>

      {/* Mural */}
      {selectedCollection && (
        <div className="space-y-1.5">
          <label className="text-xs text-black/50 uppercase tracking-wider" htmlFor="mural-select">
            Mural
          </label>
          <div className="relative">
            <select
              id="mural-select"
              className="w-full h-12 px-4 pr-10 bg-white border border-black/20 appearance-none font-gillsans focus:border-black focus:outline-none transition-colors cursor-pointer"
              {...register('muralId')}
              onChange={(e) => {
                setValue('muralId', e.target.value);
                const mural = selectedCollection.murales.find(m => m.id === e.target.value);
                if (mural?.variants?.[0]) {
                  setValue('variantColorName', mural.variants[0].colorName);
                }
              }}
            >
              <option value="">Seleccionar mural</option>
              {selectedCollection.murales.map(m => (
                <option key={m.id} value={m.id}>{m.title}</option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black/30 pointer-events-none" />
          </div>
          <FormErrorMessage condition={errors.muralId} message={errors.muralId?.message} />
        </div>
      )}

      {/* Variant color buttons */}
      {selectedMural && selectedMural.variants.length > 1 && (
        <div className="space-y-2">
          <label className="text-xs text-black/50 uppercase tracking-wider">Color / Variante</label>
          <div className="flex flex-wrap gap-2">
            {selectedMural.variants.map(v => {
              const isSelected = selectedVariant === v.colorName;
              return (
                <button
                  key={v.colorName}
                  type="button"
                  onClick={() => setValue('variantColorName', v.colorName)}
                  className={`group flex items-center gap-2 px-3 py-2 border text-sm transition-all duration-200 ${
                    isSelected
                      ? 'border-black bg-black text-white'
                      : 'border-black/15 hover:border-black/40 text-black/70'
                  }`}
                >
                  {v.colorHex && (
                    <span
                      className={`w-3 h-3 rounded-full border ${isSelected ? 'border-white/30' : 'border-black/10'}`}
                      style={{ backgroundColor: v.colorHex }}
                    />
                  )}
                  {v.colorName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mobile mural preview (shown only on mobile, between variant and walls) */}
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
          Medidas de tus paredes
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
            + Agregar otra pared
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
        Continuar al envío
      </button>
    </div>
  );
};
