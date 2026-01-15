import { StaticImageData } from "next/image";

export interface Price {
    ARS?: number;  // Precio en pesos argentinos
    USD?: number;  // Precio en dólares
}

export interface MuralVariant {
    colorName: string;
    color?: string;
    colorHex?: string;
    montaje: StaticImageData|string;
    mural: StaticImageData|string;
    base?: boolean;
    price?: Price;  // NUEVO: Precio específico por variante (opcional)
}

export interface Mural {
    id: string;
    title: string;
    collectionId: string;
    collectionTitle: string;
    icons: Array<StaticImageData|string>;
    keywords: Array<string>;  // Keywords en español
    keywordsEn?: Array<string>;  // NUEVO: Keywords en inglés para traducción
    variants: Array<MuralVariant>;
    href: string;
    basePrice?: Price;  // NUEVO: Precio base del mural
}

export interface Collection {
    id: string;
    title: string;
    portrait: StaticImageData|string;
    video?: string;
    date: string;
    technique: string;
    description: string;
    murales: Array<Mural>;
    collaboration?: boolean;
    pricePerSqm?: Price;  // NUEVO: Precio por m² a nivel colección
}