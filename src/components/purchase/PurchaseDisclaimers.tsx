'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@/icons';

const SECTIONS = [
  {
    title: 'Condiciones generales',
    items: [
      'El presupuesto se calcula a partir de las medidas reales de la pared, contemplando un excedente técnico de 10 cm en el alto y la cantidad de paños necesarios según el ancho.',
      'Para coordinar el envío o retiro del pedido, el saldo deberá encontrarse cancelado.',
      'Plazo de entrega: 20 días hábiles desde la confirmación del pedido, salvo acuerdos especiales previamente informados.',
      'El presupuesto no incluye servicio de colocación.',
      'Los tonos pueden presentar leves variaciones respecto de la muestra digital debido a los procesos de impresión y a la configuración de cada pantalla. No trabajamos con referencia de tonos de otros materiales (pintura, melamina, cerámicos).',
      'Nuestros productos poseen un proceso artesanal y cada pieza es refilada a mano. Esto puede generar mínimas variaciones, propias de un producto hecho con dedicación y cuidado por el detalle.',
      'No brindamos ni coordinamos el servicio de instalación. Con gusto podemos sugerir profesionales especializados; sin embargo, su contratación y ejecución son ajenas a Mercedes Costal.',
      'Cualquier discrepancia en el pedido (errores de impresión o problemas de unión) debe verificarse antes de iniciar la colocación y reportarse a Mercedes Costal. Una vez instalado el empapelado, no se aceptarán reclamos relacionados.',
    ],
  },
  {
    title: 'Política de devolución / reclamos',
    items: [
      'Los reclamos podrán realizarse dentro de los 15 días posteriores a la recepción del producto.',
      'Es indispensable verificar el material antes de su colocación. Una vez instalado, no podremos procesar reclamos.',
      'Mercedes Costal no se responsabiliza por costos o inconvenientes derivados de la instalación.',
      'En caso de devoluciones aprobadas, el importe no será reintegrado en efectivo; se otorgará un crédito equivalente en m² para utilizar en una futura compra.',
    ],
  },
  {
    title: 'Propiedad intelectual',
    items: [
      'Los diseños son propiedad de Mercedes Costal y están destinados exclusivamente a uso decorativo. Queda prohibida su reproducción o utilización para otros fines sin autorización escrita.',
    ],
  },
  {
    title: 'Envío',
    items: [
      'Los envíos son responsabilidad exclusiva del cliente y del servicio de transporte contratado.',
    ],
  },
  {
    title: 'Compra online — Paredes simples',
    items: [
      'Esta compra es para paredes rectangulares simples, sin aberturas complicadas ni techos inclinados. Si tenés paredes con formas complejas, arcos o muchas aberturas, contactá a un vendedor.',
    ],
  },
];

export const PurchaseDisclaimers = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-black/5 mt-12 pt-6">
      <p className="font-trueTypewriter text-[10px] uppercase tracking-widest text-black/25 mb-3">
        Términos y condiciones
      </p>

      <div className="divide-y divide-black/5">
        {SECTIONS.map((section, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-2.5 text-left group"
              >
                <span className="text-[11px] uppercase tracking-wider text-black/35 group-hover:text-black/50 transition-colors">
                  {section.title}
                </span>
                <ChevronDownIcon
                  className={`w-3 h-3 text-black/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <ul className="pb-3 space-y-1.5">
                  {section.items.map((item, j) => (
                    <li key={j} className="text-[11px] leading-relaxed text-black/30 pl-3 relative before:content-['·'] before:absolute before:left-0 before:text-black/20">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
