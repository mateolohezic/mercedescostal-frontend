import type { Collection, Mural, MuralVariant } from '@/interfaces';

export type Currency = 'ARS' | 'USD';

export const usePricing = () => {
  const getCurrencyByLocale = (locale: string): Currency => {
    return locale === 'es' ? 'ARS' : 'USD';
  };

  const getPrice = (
    variant: MuralVariant,
    mural: Mural,
    collection: Collection,
    currency: Currency
  ): number | null => {
    const price = variant.price?.[currency]
      ?? mural.basePrice?.[currency]
      ?? collection.pricePerSqm?.[currency];

    return price ?? null;
  };

  const formatPrice = (price: number, currency: Currency, locale: string): string => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return { getPrice, formatPrice, getCurrencyByLocale };
};
