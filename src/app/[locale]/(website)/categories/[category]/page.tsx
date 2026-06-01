import Link from "next/link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { collections } from '@/data/collections';

// Normaliza acentos / case / URL-encoding entre el path y las keywords del data
const normCat = (s: string): string => {
    try { return decodeURIComponent(s).normalize('NFC').toLowerCase(); }
    catch { return s.normalize?.('NFC').toLowerCase() ?? s.toLowerCase(); }
};
import { MuralCard } from '@/components';
import { Mural } from '@/interfaces';

interface Props {
    params: Promise<{
        locale: string;
        category: string;
    }>;
}

export function generateStaticParams() {
    const params = [];
    const allKeywords = new Set<string>();

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
    const nCat = normCat(category);
    const categoryMurals = collections.flatMap(col => col.murales).filter(mural => mural.keywords.some(k => normCat(k) === nCat));
    const isEs = locale === 'es';
    const titleBase = isEs ? `Murales de ${category}` : `${category} murals`;
    const descBase = isEs
        ? `Explorá los murales en la categoría ${category}: papeles de autor hechos a medida en Argentina.`
        : `Explore murals in the ${category} category: author-made wallpapers crafted to order in Argentina.`;

    if (categoryMurals.length === 0) {
        return {
            metadataBase: new URL('https://mercedescostal.com.ar'),
            title: isEs ? "Categoría no encontrada" : "Category not found",
            description: descBase,
        };
    }

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: titleBase,
        description: descBase,
        alternates: {
            canonical: `/categories/${category}`,
            languages: {
                'es': `/categories/${category}`,
                'en': `/en/categories/${category}`,
            },
        },
        openGraph: {
            title: `${titleBase} | Mercedes Costal`,
            description: descBase,
            url: `/categories/${category}`,
            siteName: "Mercedes Costal",
            locale: isEs ? 'es_AR' : 'en_US',
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${titleBase} | Mercedes Costal`,
            description: descBase,
        },
    };
}

export default async function CategoriesPage({ params }: Props) {
    const { locale, category } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.collections' });
    const nCat = normCat(category);
    const categoryMurals = collections.flatMap(col => col.murales).filter(mural => mural.keywords.some(k => normCat(k) === nCat));

    if (categoryMurals.length === 0) {
        return (
            <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter px-4">
                <section className="w-full max-w-2xl flex flex-col items-center gap-6 text-center">
                    <p className="font-gillsans text-xs tracking-[0.5rem] uppercase text-black/40">
                        {t('categoryLabel')} · {category}
                    </p>
                    <h1 className="font-gillsans text-2xl lg:text-3xl uppercase tracking-wider">
                        {t('emptyTitle')}
                    </h1>
                    <p className="text-black/60 lg:text-lg max-w-md">
                        {t('emptyDesc')}
                    </p>
                    <Link
                        href="/collections"
                        className="mt-4 inline-block border-b border-black text-base uppercase tracking-widest hover:opacity-70 transition-150"
                    >
                        {t('emptyCta')}
                    </Link>
                </section>
            </main>
        );
    }

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-start lg:items-stretch gap-8 lg:gap-12">
                <div className="w-full lg:max-w-md">
                    <p className="font-gillsans text-xs tracking-[0.5rem] uppercase text-black/40 mb-3">
                        {t('categoryLabel')}
                    </p>
                    <h1 className="w-full font-gillsans text-2xl lg:text-4xl tracking-[0.25rem] uppercase">
                        <b className="font-semibold capitalize">{category}</b>
                    </h1>
                    <p className="mt-4 text-sm text-black/50">
                        {t('resultsCount', { count: categoryMurals.length })}
                    </p>
                </div>
                <div className="w-full max-w-lg lg:pt-2 text-black/70">
                    <p>{t('categoryIntro')}</p>
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
