'use client';

import { useEffect } from 'react';
import type { WallCalculation } from '@/hooks/usePurchasePricing';

interface Props {
  open: boolean;
  walls: WallCalculation[];
  totalAreaM2: number;
  totalARS: number;
  formatPrice: (n: number) => string;
  onConfirm: () => void;
  onCancel: () => void;
  submitting: boolean;
}

// Modal de "última oportunidad" antes de redirigir a Mercado Pago.
// Muestra las medidas que el cliente ingresó GRANDES y le pide reconfirmar antes
// de redirigir al checkout. Sirve como capa defensiva contra errores de medición.
export const ConfirmPurchaseModal = ({
  open,
  walls,
  totalAreaM2,
  totalARS,
  formatPrice,
  onConfirm,
  onCancel,
  submitting,
}: Props) => {
  // Block body scroll while open + ESC para cancelar
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onCancel();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onCancel, submitting]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-purchase-title"
      onClick={() => { if (!submitting) onCancel(); }}
    >
      <div
        className="bg-white max-w-md w-full max-h-[90vh] overflow-y-auto border-t-2 border-black animate-in slide-in-from-bottom-4 duration-300"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8 text-center">
          <p className="font-trueTypewriter text-[11px] text-black/40 uppercase tracking-[0.18em] mb-2">
            Confirmá tu pedido
          </p>
          <h2 id="confirm-purchase-title" className="font-gillsans text-2xl font-medium uppercase tracking-wider mb-4">
            Revisá las medidas
          </h2>
          <p className="text-sm text-black/55 leading-relaxed mb-6">
            Tu empapelado se va a fabricar con estas medidas. Verificalas antes de continuar al pago.
          </p>

          <div className="border border-black/15 divide-y divide-black/5 mb-6 text-left">
            {walls.map((w, i) => (
              <div key={i} className="px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-black/40 uppercase tracking-wider">Pared {i + 1}</span>
                <span className="font-gillsans text-lg font-medium">
                  {(w.widthCm / 100).toFixed(2)}m &times; {(w.heightCm / 100).toFixed(2)}m
                </span>
              </div>
            ))}
            <div className="px-4 py-3 bg-black/[0.02] flex items-center justify-between">
              <span className="text-xs text-black/50 uppercase tracking-wider">Área total</span>
              <span className="font-medium">{totalAreaM2.toFixed(2)} m²</span>
            </div>
            <div className="px-4 py-3 bg-black/[0.02] flex items-center justify-between">
              <span className="text-xs text-black/50 uppercase tracking-wider">Total a pagar</span>
              <span className="font-gillsans text-lg font-medium">{formatPrice(totalARS)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onConfirm}
            disabled={submitting}
            className="w-full py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors disabled:bg-black/40 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Procesando…
              </>
            ) : (
              'Continuar al pago'
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="w-full py-3 mt-2 text-xs uppercase tracking-wider text-black/50 hover:text-black transition-colors disabled:opacity-30"
          >
            Volver a revisar
          </button>
        </div>
      </div>
    </div>
  );
};
