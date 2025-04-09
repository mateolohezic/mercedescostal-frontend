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
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Cotiza tu <b className="block font-semibold">mural</b>
                </h1>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                </div>
            </section>
            <QuoteForm preselectedMuralId={preselectedMuralId} />
        </main>
    );
}
