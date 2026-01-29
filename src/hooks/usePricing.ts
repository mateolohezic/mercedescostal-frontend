import type { Collection, Mural, MuralVariant } from '@/interfaces';

export type Currency = 'ARS' | 'USD';

// Precios por defecto según tipo de producto
const DEFAULT_PRICES = {
  pattern: { ARS: 77000, USD: 60 },
  mural: { ARS: 92700, USD: 80 },
};

export const usePricing = () => {
  const getCurrencyByLocale = (locale: string): Currency => {
    return locale === 'es' ? 'ARS' : 'USD';
  };

  const isPattern = (mural: Mural): boolean => {
    return mural.keywords.some(k =>
      ['patrón', 'patron', 'pattern'].includes(k.toLowerCase())
    );
  };

  const getPrice = (
    variant: MuralVariant,
    mural: Mural,
    _collection: Collection,
    currency: Currency
  ): number | null => {
    // Si hay precio específico en la variante, usarlo (para casos especiales)
    if (variant.price?.[currency] !== undefined) {
      return variant.price[currency];
    }

    // Usar precio por defecto según tipo de producto (pattern vs mural)
    const productType = isPattern(mural) ? 'pattern' : 'mural';
    return DEFAULT_PRICES[productType][currency];
  };

  const formatPrice = (price: number, currency: Currency, locale: string): string => {
    if (currency === 'USD') {
      // Formatear como "60 USD" para evitar confusión con el símbolo $
      const formattedNumber = new Intl.NumberFormat(locale, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
      return `${formattedNumber} USD`;
    }

    // Para ARS usar el formato estándar con símbolo $
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return { getPrice, formatPrice, getCurrencyByLocale };
};
