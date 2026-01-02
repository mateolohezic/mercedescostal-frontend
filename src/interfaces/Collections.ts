import { StaticImageData } from "next/image";

export interface MuralVariant {
    colorName: string;
    color?: string;
    colorHex?: string;
    montaje: StaticImageData|string;
    mural: StaticImageData|string;
    base?: boolean;
}

export interface Mural {
    id: string;
    title: string;
    collectionId: string;
    collectionTitle: string;
    icons: Array<StaticImageData|string>;
    keywords: Array<string>;
    variants: Array<MuralVariant>;
    href: string;
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
}