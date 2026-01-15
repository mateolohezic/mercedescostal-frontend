import { routing } from "@/i18n/routing";
import { collections } from '@/data/collections';
import { MuralCard } from '@/components';
import { Mural } from '@/interfaces';
import { Metadata } from "next";

interface Props {
    params: Promise<{
        locale: string;
        category: string;
    }>;
}

export function generateStaticParams() {
    const params = [];
    const allKeywords = new Set<string>();

    // Collect all unique keywords from murals
    collections.forEach(col => {
        col.murales.forEach(mural => {
            mural.keywords.forEach(keyword => allKeywords.add(keyword));
        });
    });

    for (const locale of routing.locales) {
        for (const category of Array.from(allKeywords)) {
            params.push({ locale, category });
        }
    }
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, category } = await params;
    const categoryMurals = collections.flatMap(col => col.murales).filter(mural => mural.keywords.includes(category));

    if (categoryMurals.length === 0) {
        return {
            metadataBase: new URL('https://mercedescostal.com.ar'),
            title: "Categoría no encontrada",
            description: `No se encontraron murales en la categoría ${category}.`,
        };
    }

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: `Murales de ${category}`,
        description: `Explora los murales en la categoría de ${category} y encuentra la mejor opción para tu espacio.`,
        alternates: {
            canonical: `/categories/${category}`,
            languages: {
                'es': `/categories/${category}`,
                'en': `/en/categories/${category}`,
            },
        },
        openGraph: {
            title: `Murales de ${category} | Mercedes Costal`,
            description: `Explora los murales en la categoría de ${category} y encuentra la mejor opción para tu espacio.`,
            url: `/categories/${category}`,
            siteName: "Mercedes Costal",
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Murales de ${category} | Mercedes Costal`,
            description: `Explora los murales en la categoría de ${category} y encuentra la mejor opción para tu espacio.`,
        },
    };
}

export default async function CategoriesPage({ params }: Props) {
    const { category } = await params;
    const categoryMurals = collections.flatMap(col => col.murales).filter(mural => mural.keywords.includes(category));

    if (categoryMurals.length === 0) {
        return <div className="text-center text-red-500 my-20 text-xl">No se encontraron murales en esta categoría.</div>;
    }

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-full font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Categoría <b className="block font-semibold">{category}</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center gap-12 lg:gap-24">
                {categoryMurals.map((mural: Mural) => (
                    <MuralCard key={mural.id} mural={mural} showCollection />
                ))}
            </section>
        </main>
    );
}