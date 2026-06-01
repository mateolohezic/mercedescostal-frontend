'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@/icons';

// Las claves de cada sección. Los items se cargan como arrays desde el JSON de i18n
// (ver locales/{es,en}/purchase.json → disclaimers.<sectionKey>.items).
const SECTION_KEYS = [
  'general',
  'returns',
  'intellectualProperty',
  'shipping',
  'simpleWalls',
] as const;

export const PurchaseDisclaimers = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = useTranslations('purchase.disclaimers');

  return (
    <div className="border-t border-black/5 mt-12 pt-6">
      <p className="font-trueTypewriter text-[10px] uppercase tracking-widest text-black/25 mb-3">
        {t('title')}
      </p>

      <div className="divide-y divide-black/5">
        {SECTION_KEYS.map((key, i) => {
          const isOpen = openIndex === i;
          // Los items vienen como string con \n separando cada bullet (next-intl no
          // soporta arrays directos; usamos split para mantener una sola key).
          const itemsRaw = t(`${key}.items`);
          const items = itemsRaw.split('\n').map(s => s.trim()).filter(Boolean);
          return (
            <div key={key}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-2.5 text-left group"
              >
                <span className="text-[11px] uppercase tracking-wider text-black/35 group-hover:text-black/50 transition-colors">
                  {t(`${key}.title`)}
                </span>
                <ChevronDownIcon
                  className={`w-3 h-3 text-black/20 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isOpen && (
                <ul className="pb-3 space-y-1.5">
                  {items.map((item, j) => (
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
