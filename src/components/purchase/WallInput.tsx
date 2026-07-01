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
  formatPrice?: (n: number) => string;
  // Cuando las paredes son contiguas, escondemos los paneles individuales — se muestra
  // solo el total del grupo (más honesto, porque los paneles se calculan sobre el total).
  hidePanelsBreakdown?: boolean;
}

export const WallInput = ({ index, register, errors, onRemove, canRemove, calculated, hidePanelsBreakdown }: Props) => {
  const t = useTranslations('purchase.product');
  const tWall = useTranslations('purchase.wall');
  const wallErrors = (errors.walls as any)?.[index];
  // Mostramos "X paneles" solo cuando hay medidas cargadas Y tenemos el cálculo Y no estamos en modo grupo.
  const showPanels = !hidePanelsBreakdown && calculated && calculated.panels > 0 && calculated.widthCm > 0;

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

          {/* Info calculada de la pared en la columna derecha — más limpio en el summary.
              El "X paneles" se muestra DEBAJO, más abajo. */}
        </div>

        {/* Paneles calculados — debajo del row de inputs.
            Cuando la pared forma parte de un grupo contiguo, el "panels" que llega es
            una distribución proporcional (no coincide con paneles reales) — mostramos
            un placeholder distinto en ese caso vía prop de arriba. */}
        {showPanels && (
          <p className="mt-2 text-[11px] text-black/40">
            {calculated!.panels} {calculated!.panels === 1 ? tWall('panel') : tWall('panels')} {tWall('panelOf')}
            <span className="text-black/15 mx-1.5">·</span>
            {calculated!.printAreaM2.toFixed(2)} m²
          </p>
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
