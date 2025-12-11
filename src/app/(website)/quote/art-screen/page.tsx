import { ArtScreenQuoteForm } from "@/components";
import { Metadata } from "next";

interface Props {
    searchParams: {
        mural?: string;
    };
}

export const metadata: Metadata = {
    title: 'Cotizar Art Screen',
    description: "Cotiza tu biombo Art Screen Mercedes Costal.",
    openGraph: {
        title: 'Cotizar Art Screen | Mercedes Costal',
        description: 'Biombos de autor Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/quote-art-screen',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/quote-art-screen',
        creator: 'Mercedes Costal',
        title: 'Cotizar Art Screen | Mercedes Costal',
        description: 'Biombos de autor Mercedes Costal.',
    },
};

export default function QuoteArtScreenPage({ searchParams }: Props) {
    const preselectedMuralId = searchParams?.mural?.trim() || "";

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Cotiza tu Art Screen</h1>
            <ArtScreenQuoteForm preselectedMuralId={preselectedMuralId} />
        </main>
    );
}