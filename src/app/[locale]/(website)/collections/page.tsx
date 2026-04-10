import Link from "next/link";
import Image from "next/image";
import { getCollections } from "@/data/collections";
import { CollectionVideo } from "@/components";
import collaborations_portrait from "@/assets/collections/collaborations/carina_michelli/rita/rita_montaje.webp";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.collections' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/collections',
            languages: {
                'es': '/collections',
                'en': '/en/collections',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/collections',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/collections',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function CollectionsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.collections' });
    const tc = await getTranslations({ locale, namespace: 'common' });
    const collections = getCollections();

    return (
        <main className="my-12 lg:my-0 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">{t('title')}</h1>
            <section className="lg:mt-24 w-full grid grid-cols-2 lg:grid-cols-2">
                {collections[0] && (
                    <Link key={collections[0].id} href={`/collections/${collections[0].id}`} className="w-full block aspect-video overflow-hidden relative group col-span-2">
                        {collections[0].video ?
                            <div className="absolute top-0 left-0 z-0 size-full">
                                <CollectionVideo video={collections[0].video} />
                            </div>
                        :
                            <Image priority src={collections[0].portrait} alt={`Portada de colección ${collections[0].title}`} className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                        }
                        <div className="size-full bg-black/20 absolute top-0 left-0 z-10 transition-150" />
                        <div className="size-full flex flex-col justify-center items-center relative z-20">
                            <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                                <span className="text-white/75">{tc('collection')}</span>{" "}
                                <b className="font-medium block lg:inline">{collections[0].title}</b>
                            </h3>
                        </div>
                    </Link>
                )}
                {collections.slice(1).map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.id}`} className="w-full block aspect-video overflow-hidden relative group">
                        <Image
                            priority
                            src={collection.portrait}
                            alt={`Portada de colección ${collection.title}`}
                            className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"
                        />
                        <div className="size-full bg-black/20 absolute top-0 left-0 z-10 transition-150" />
                        <div className="size-full flex flex-col justify-center items-center relative z-20">
                            <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                                <span className="text-white/75">{tc('collection')}</span>{" "}
                                <b className="font-medium block lg:inline">{collection.title}</b>
                            </h3>
                        </div>
                    </Link>
                ))}
                <Link href="/collections/collaborations" className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={collaborations_portrait} alt="Colaboraciones Mercedes Costal" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20 absolute top-0 left-0 z-10 transition-150" />
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                            <b className="font-medium">{tc('collaborations')}</b>
                        </h3>
                    </div>
                </Link>
            </section>
            <section className="mt-12 lg:my-48 w-full max-w-5xl 2xl:max-w-7xl px-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <div className="w-full lg:text-lg text-start flex flex-col gap-[1lh]">
                    <p>{t('philosophy.line1')}</p>
                    <p>{t('philosophy.line2')}</p>
                    <p>{t('philosophy.line3')}</p>
                    <p>{t('philosophy.line4')}</p>
                </div>
            </section>
        </main>
    );
}