'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { FormErrorMessage } from '@/components';
import { CrossIcon } from '@/icons';

const WA_LINK = 'https://wa.me/5491160208460';

const parseNum = (v: any) => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};

interface Props {
  index: number;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  onRemove: () => void;
  canRemove: boolean;
  calculated?: {
    panels: number;
    printAreaM2: number;
    priceARS: number;
    widthCm: number;
    heightCm: number;
    horizontalExcessCm: number;
    verticalExcessCm: number;
  };
  formatPrice: (n: number) => string;
}

export const WallInput = ({ index, register, errors, onRemove, canRemove, calculated, formatPrice }: Props) => {
  const t = useTranslations('purchase.product');
  const tWall = useTranslations('purchase.wall');
  const wallErrors = (errors.walls as any)?.[index];
  const hasData = calculated && calculated.panels > 0;

  const widthError = wallErrors?.widthCm;
  const heightError = wallErrors?.heightCm;
  const isWidthTooLarge = widthError?.message === 'errors.widthMax';
  const isHeightTooLarge = heightError?.message === 'errors.heightMax';
  const showContactBanner = isWidthTooLarge || isHeightTooLarge;

  return (
    <div className="border border-black/10 relative group transition-colors hover:border-black/20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5">
        <span className="font-gillsans text-xs font-medium uppercase tracking-widest text-black/40">
          {t('wall')} {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-black/30 hover:text-black transition-colors"
            aria-label={`${tWall('remove')} ${index + 1}`}
          >
            <CrossIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="px-4 py-3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-xs text-black/50 uppercase tracking-wider">{t('width')}</label>
            <input
              type="number"
              step="1"
              inputMode="numeric"
              placeholder="340"
              className={`w-full h-10 px-3 bg-transparent border-b text-center text-lg focus:outline-none transition-colors ${
                widthError && !isWidthTooLarge ? 'border-red-400' : 'border-black/20 focus:border-black'
              }`}
              {...register(`walls.${index}.widthCm`, { setValueAs: parseNum })}
            />
            <FormErrorMessage condition={widthError && !isWidthTooLarge} message={widthError?.message} />
          </div>

          <span className="pb-3 text-black/20 text-lg font-light select-none">&times;</span>

          <div className="flex-1">
            <label className="text-xs text-black/50 uppercase tracking-wider">{t('height')}</label>
            <input
              type="number"
              step="1"
              inputMode="numeric"
              placeholder="250"
              className={`w-full h-10 px-3 bg-transparent border-b text-center text-lg focus:outline-none transition-colors ${
                heightError && !isHeightTooLarge ? 'border-red-400' : 'border-black/20 focus:border-black'
              }`}
              {...register(`walls.${index}.heightCm`, { setValueAs: parseNum })}
            />
            <FormErrorMessage condition={heightError && !isHeightTooLarge} message={heightError?.message} />
          </div>

          {/* Price */}
          {hasData && (
            <div className="pb-1 text-right shrink-0">
              <p className="font-gillsans font-medium text-sm">{formatPrice(calculated.priceARS)}</p>
            </div>
          )}
        </div>

        {/* Panel + excess breakdown */}
        {hasData && (
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/40">
            <span>
              {calculated.panels} {calculated.panels === 1 ? tWall('panel') : tWall('panels')} {tWall('panelOf')}
            </span>
            <span className="hidden sm:block w-px h-3 bg-black/10" />
            <span>{calculated.printAreaM2.toFixed(2)} m²</span>
            <span className="hidden sm:block w-px h-3 bg-black/10" />
            <span className="text-black/50">
              {tWall('excessHeight', { v: calculated.verticalExcessCm })}
              {calculated.horizontalExcessCm > 0 && (
                <> · {tWall('excessWidth', { h: calculated.horizontalExcessCm })}</>
              )}
            </span>
          </div>
        )}

        {/* Visual panel strip */}
        {hasData && (
          <div className="mt-2 flex gap-px h-1.5" aria-hidden="true">
            {Array.from({ length: Math.min(calculated.panels, 60) }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-black/8 group-hover:bg-black/12 transition-colors"
                style={{ maxWidth: `${100 / Math.min(calculated.panels, 60)}%` }}
              />
            ))}
          </div>
        )}

        {/* Contact banner for walls > 50m */}
        {showContactBanner && (
          <div className="mt-3 flex items-start gap-3 px-3 py-3 bg-amber-50 border border-amber-200">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-amber-900">{tWall('largeMeasureTitle')}</p>
              <p className="text-xs text-amber-700 mt-0.5">{tWall('largeMeasureDesc')}</p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-amber-900 underline underline-offset-2 hover:text-amber-700 transition-colors"
              >
                {tWall('largeMeasureCta')} →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
