'use client';

import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormErrorMessage } from '@/components';
import { CrossIcon } from '@/icons';

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
  };
  formatPrice: (n: number) => string;
}

const parseNum = (v: any) => {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
};

export const WallInput = ({ index, register, errors, onRemove, canRemove, calculated, formatPrice }: Props) => {
  const wallErrors = (errors.walls as any)?.[index];
  const hasData = calculated && calculated.panels > 0;

  return (
    <div className="border border-black/10 relative group transition-colors hover:border-black/20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/5">
        <span className="font-gillsans text-xs font-medium uppercase tracking-widest text-black/40">
          Pared {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-black/30 hover:text-black transition-colors"
            aria-label={`Quitar pared ${index + 1}`}
          >
            <CrossIcon className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Inputs */}
      <div className="px-4 py-3">
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <label className="text-xs text-black/50 uppercase tracking-wider">Ancho (m)</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="3.50"
              className="w-full h-10 px-3 bg-transparent border-b border-black/20 text-center text-lg focus:border-black focus:outline-none transition-colors"
              {...register(`walls.${index}.widthM`, { setValueAs: parseNum })}
            />
            <FormErrorMessage condition={wallErrors?.widthM} message={wallErrors?.widthM?.message} />
          </div>

          <span className="pb-3 text-black/20 text-lg font-light select-none">&times;</span>

          <div className="flex-1">
            <label className="text-xs text-black/50 uppercase tracking-wider">Alto (m)</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              placeholder="2.50"
              className="w-full h-10 px-3 bg-transparent border-b border-black/20 text-center text-lg focus:border-black focus:outline-none transition-colors"
              {...register(`walls.${index}.heightM`, { setValueAs: parseNum })}
            />
            <FormErrorMessage condition={wallErrors?.heightM} message={wallErrors?.heightM?.message} />
          </div>

          {/* Price tag */}
          {hasData && (
            <div className="pb-1 text-right shrink-0">
              <p className="font-gillsans font-medium text-sm">{formatPrice(calculated.priceARS)}</p>
            </div>
          )}
        </div>

        {/* Panel breakdown — simplified */}
        {hasData && (
          <div className="mt-3 flex items-center gap-4 text-xs text-black/40">
            <span>{calculated.panels} {calculated.panels === 1 ? 'panel' : 'paneles'} de 0.50m</span>
            <span className="w-px h-3 bg-black/10" />
            <span>{calculated.printAreaM2.toFixed(2)} m²</span>
            <span className="w-px h-3 bg-black/10" />
            <span>+10cm excedente</span>
          </div>
        )}

        {/* Visual panel strip */}
        {hasData && (
          <div className="mt-2 flex gap-px h-2" aria-hidden="true">
            {Array.from({ length: calculated.panels }).map((_, i) => (
              <div
                key={i}
                className="flex-1 bg-black/8 group-hover:bg-black/12 transition-colors"
                style={{ maxWidth: `${100 / calculated.panels}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
