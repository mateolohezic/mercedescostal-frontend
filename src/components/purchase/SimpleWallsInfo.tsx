'use client';

import Image from 'next/image';

// Placeholder images — reemplazar con las fotos reales de tipos de pared
import wallTypeA from '@/assets/collections/artisan/abra/abra_montaje.webp';
import wallTypeB from '@/assets/collections/artisan/ceren/ceren_montaje.webp';
import wallTypeC from '@/assets/collections/artisan/risco/risco_montaje.webp';

const WALL_TYPES = [
  { image: wallTypeA, label: 'Pared simple' },
  { image: wallTypeB, label: 'Pared con puerta' },
  { image: wallTypeC, label: 'Pared con ventana' },
];

export const SimpleWallsInfo = () => {
  return (
    <div className="border border-black/10 p-5 space-y-4">
      <p className="font-trueTypewriter text-xs uppercase tracking-widest text-black/40">
        Compra online
      </p>

      <p className="text-sm text-black/70 leading-relaxed">
        Esta compra es para <strong className="text-black">paredes rectangulares simples</strong>,
        sin aberturas complicadas ni techos inclinados. Ejemplos:
      </p>

      <div className="grid grid-cols-3 gap-3">
        {WALL_TYPES.map((type) => (
          <div key={type.label} className="space-y-1.5">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-50">
              <Image
                src={type.image}
                alt={type.label}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 150px"
              />
            </div>
            <p className="text-[11px] text-center text-black/50 leading-tight">{type.label}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 pt-3">
        <p className="text-xs text-black/50">
          ¿Tenés paredes con formas complejas, arcos o muchas aberturas?{' '}
          <a
            href="https://wa.me/5491160208460"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-black font-medium hover:text-black/70 transition-colors"
          >
            Contactá a un vendedor
          </a>
        </p>
      </div>
    </div>
  );
};
