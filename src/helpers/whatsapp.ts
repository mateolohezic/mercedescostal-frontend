// Armado del link de WhatsApp para los formularios de cotización.
//
// El texto se arma como líneas planas y se codifica UNA sola vez con encodeURIComponent. Antes se
// concatenaba crudo con "%0A": un nombre con "&" o "#" cortaba el mensaje, y un email con "+"
// (ana+deco@gmail.com) llegaba con un espacio.

export const WHATSAPP_NUMBER = '5491160208460';

export function buildWhatsAppUrl(lines: string[], number: string = WHATSAPP_NUMBER): string {
    return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/** Medidas con la coma decimal del idioma ("3,5" en español, "3.5" en inglés), hasta 2 decimales. */
export function formatMeters(value: number, locale: string): string {
    const tag = locale === 'en' ? 'en-US' : 'es-AR';
    return new Intl.NumberFormat(tag, { maximumFractionDigits: 2, useGrouping: false }).format(value);
}
