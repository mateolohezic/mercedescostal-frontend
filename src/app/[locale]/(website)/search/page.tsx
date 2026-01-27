import { sortMurales } from "@/helpers";
import { Mural } from "@/interfaces";
import { MuralCardNew } from "@/components";
import { getTranslations } from "next-intl/server";
import { getCollections, getCollaborations, collections } from "@/data/collections";

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        query?: string;
    }>;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.search' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/search',
            languages: {
                'es': '/search',
                'en': '/en/search',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/search',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/search',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function SearchResultsPage({ params, searchParams }: Props) {
    const { locale } = await params;
    const { query } = await searchParams;
    const t = await getTranslations({ locale, namespace: 'pages.search' });
    const normalizeText = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const searchQuery = normalizeText(query?.trim() || "");

    // Search logic (moved from useSearchMurals hook for server component compatibility)
    const murals: Mural[] = collections.flatMap(collection => collection.murales);

    const searchMurals = (q: string): Mural[] => {
        if (!q || q.trim().length < 2) return [];
        const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const searchWords = normalize(q).trim().split(/\s+/);

        return murals.filter(mural => {
            const keywords = locale === 'es' ? mural.keywords : (mural.keywordsEn || mural.keywords);
            return searchWords.every(word =>
                normalize(mural.title).includes(word) ||
                normalize(mural.collectionTitle).includes(word) ||
                keywords.some(keyword => normalize(keyword).includes(word))
            );
        });
    };

    const results: Array<Mural> = searchMurals(searchQuery);

    const allCollections = [...getCollections(), ...getCollaborations()];

    const findCollectionForMural = (mural: Mural) => {
        return allCollections.find(col => col.id === mural.collectionId);
    };

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center justify-center lg:justify-start font-truetypewritter">
            <section className="w-full px-4 xl:px-12">
                <h1 className="w-full font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {searchQuery.length < 3 ?
                        t('noResults')
                    :
                        <div className="w-full flex flex-col gap-1">
                            <span>{t('title')}</span>
                            <span className="font-semibold truncate">{searchQuery}</span>
                        </div>
                    }
                </h1>

                {searchQuery.length < 3 ? (
                    <p className="mt-8 text-center text-gray-500">
                        {t('minChars')}
                    </p>
                ) : results.length === 0 ? (
                    <p className="mt-8 text-center text-gray-500">
                        {t('noMurals')} {searchQuery}.
                    </p>
                ) : (
                    <section className="mt-12 lg:mt-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-6 lg:gap-y-16">
                        { sortMurales(results).map((mural, index) => {
                            const collection = findCollectionForMural(mural);
                            return collection ? (
                                <MuralCardNew mural={mural} collection={collection} index={index} key={mural.id} />
                            ) : null;
                        })}
                    </section>
                )}
            </section>
        </main>
    );
}
