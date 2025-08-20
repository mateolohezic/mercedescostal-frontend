import { Metadata } from "next";
import { useSearchMurals } from "@/hooks";
import { sortMurales } from "@/helpers";
import { Mural } from "@/interfaces";
import { MuralCardNew } from "@/components";

interface Props {
    searchParams: {
        query?: string;
    };
}

export const metadata: Metadata = {
    title: 'Search',
    description: "Search Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Search | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/search',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/search',
        creator: 'Mercedes Costal',
        title: 'Search | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function SearchResultsPage({ searchParams }: Props) {
    const normalizeText = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const searchQuery = normalizeText(searchParams?.query?.trim() || "");

    const results:Array<Mural> = useSearchMurals(searchQuery);

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center justify-center lg:justify-start font-truetypewritter">
            <section className="w-full px-4 xl:px-12">
                <h1 className="w-full font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {searchQuery.length < 3 ?
                        "No se encontraron resultados."
                    :
                        <div className="w-full flex flex-col gap-1">
                            <span>Resultados para</span>
                            <span className="font-semibold truncate">{searchQuery}</span>
                        </div>
                    }
                </h1>

                {searchQuery.length < 3 ? (
                    <p className="mt-8 text-center text-gray-500">
                        Ingresa al menos 3 caracteres para buscar murales.
                    </p>
                ) : results.length === 0 ? (
                    <p className="mt-8 text-center text-gray-500">
                        No se encontraron murales para {searchQuery}.
                    </p>
                ) : (
                    <section className="mt-12 lg:mt-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-6 lg:gap-y-16">
                        { sortMurales(results).map((mural, index) => (
                            <MuralCardNew mural={mural} index={index} key={mural.id} />
                        ))}
                    </section>
                )}
            </section>
        </main>
    );
}
