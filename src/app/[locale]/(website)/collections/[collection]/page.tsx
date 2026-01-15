import { routing } from "@/i18n/routing";
import { collections } from '@/data/collections';
import { sortMurales } from "@/helpers";
import { CollectionVideo, CTA, MuralCardNew, ProcesoCreativoArtisan, ProcesoCreativoBasaBasa, ProcesoCreativoCasamar, ProcesoCreativoClassics, ProcesoCreativoLandmark, ProcesoCreativoMorris, ProcesoCreativoVivero } from '@/components';
import Image from "next/image";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
    params: Promise<{
        locale: string;
        collection: string;
    }>;
}

export function generateStaticParams() {
    const params = [];
    for (const locale of routing.locales) {
        for (const collection of collections) {
            params.push({ locale, collection: collection.id });
        }
    }
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, collection } = await params;
    const t = await getTranslations({ locale, namespace: 'common' });
    const tc = await getTranslations({ locale, namespace: 'pages.collections' });
    const foundCollection = collections.find(col => col.id === collection);

    if (!foundCollection) {
        return {
            metadataBase: new URL('https://mercedescostal.com.ar'),
            title: tc('notFound'),
            description: tc('notFound'),
        };
    }

    const collectionLabel = t('collection');
    const exploreText = locale === 'es'
        ? `Explora la colección ${foundCollection.title} y descubre increíbles murales.`
        : `Explore the ${foundCollection.title} collection and discover incredible murals.`;

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: `${collectionLabel} ${foundCollection.title}`,
        description: exploreText,
        alternates: {
            canonical: `/collections/${collection}`,
            languages: {
                'es': `/collections/${collection}`,
                'en': `/en/collections/${collection}`,
            },
        },
        openGraph: {
            title: `${collectionLabel} ${foundCollection.title} | Mercedes Costal`,
            description: exploreText,
            url: `/collections/${collection}`,
            siteName: "Mercedes Costal",
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${collectionLabel} ${foundCollection.title} | Mercedes Costal`,
            description: exploreText,
        },
    };
}

export default async function CollectionPage({ params }: Props) {
    const { locale, collection } = await params;
    const t = await getTranslations({ locale, namespace: 'common' });
    const tc = await getTranslations({ locale, namespace: 'pages.collections' });
    const foundCollection = collections.find(col => col.id === collection);

    if (!foundCollection) {
        return <div className="text-center text-red-500">{tc('notFound')}</div>;
    }

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">{t('collection')} {foundCollection.title}</h1>
            <section className="w-full px-4 lg:px-12 flex flex-col justify-center items-center gap-8 lg:gap-4">
                <div className="w-full aspect-video relative">
                    <div className="size-full flex justify-center items-center text-center absolute top-0 left-0 z-40 pointer-events-none">
                        <span className="text-white font-gillsans font-light text-3xl uppercase"><span className="text-opacity-75">{t('collection')}</span> <b className="font-medium">{foundCollection.title}</b></span>
                    </div>
                    {foundCollection.video ? (
                        <CollectionVideo video={foundCollection.video}/>
                    ) : (
                        <Image priority src={foundCollection.portrait} alt={`${t('collection')} ${foundCollection.title}`} className="w-full aspect-video object-cover"/>
                    )}
                </div>
                {
                    foundCollection.id !== "the-classics" &&
                    <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p><b className="uppercase">{tc('artist')}:</b> Mercedes Costal prints & patterns.</p>
                        <p><b className="uppercase">{tc('year')}:</b> {foundCollection.date}.</p>
                        <p><b className="uppercase">{tc('technique')}:</b> {foundCollection.technique}</p>
                    </div>
                }
            </section>
            <section className="mt-12 lg:mt-24 w-full px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-6 lg:gap-y-16">
                { sortMurales(foundCollection.murales).map((mural, index) => (
                    <MuralCardNew mural={mural} collection={foundCollection} index={index} key={mural.id} />
                ))}
            </section>
            {
                foundCollection.id === "the-classics" ? <ProcesoCreativoClassics/> :
                foundCollection.id === "morris" ? <ProcesoCreativoMorris/> :
                foundCollection.id === "basa-basa" ? <ProcesoCreativoBasaBasa/> :
                foundCollection.id === "landmark" ? <ProcesoCreativoLandmark/> :
                foundCollection.id === "vivero" ? <ProcesoCreativoVivero/> :
                foundCollection.id === "artisan" ? <ProcesoCreativoArtisan/> :
                foundCollection.id === "casamar" && <ProcesoCreativoCasamar/>
            }
            <CTA/>
        </main>
    );
}