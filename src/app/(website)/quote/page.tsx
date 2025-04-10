import { QuoteForm } from "@/components";
import { Metadata } from "next";

interface Props {
    searchParams: {
        mural?: string;
    };
}

export const metadata: Metadata = {
    title: 'Quote',
    description: "Quote Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Quote | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/quote',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/quote',
        creator: 'Mercedes Costal',
        title: 'Quote | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function QuotePage({ searchParams }: Props) {
    const preselectedMuralId  = searchParams?.mural?.trim() || "";

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Cotiza tu mural</h1>
            <QuoteForm preselectedMuralId={preselectedMuralId} />
        </main>
    );
}
