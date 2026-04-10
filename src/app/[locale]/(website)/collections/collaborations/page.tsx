import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Image from "next/image";
import { getCollaborations } from "@/data/collections";
import { CollectionVideo } from "@/components";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.collaborations' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal', 'colaboraciones'],
        alternates: {
            canonical: '/collections/collaborations',
            languages: {
                'es': '/collections/collaborations',
                'en': '/en/collections/collaborations',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/collections/collaborations',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/collections/collaborations',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function CollaborationsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.collaborations' });
    const tc = await getTranslations({ locale, namespace: 'common' });
    const collaborations = getCollaborations();

    return (
        <main className="my-12 lg:my-0 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">{t('title')}</h1>
            <section className="lg:mt-24 w-full grid grid-cols-2 lg:grid-cols-2">
                {collaborations.map((collab, index) => (
                    <Link key={collab.id} href={`/collections/collaborations/${collab.id}`} className="w-full block aspect-video overflow-hidden relative group">
                        {collab.video ?
                            <div className="absolute top-0 left-0 z-0 size-full">
                                <CollectionVideo video={collab.video} />
                            </div>
                        :
                            <Image priority={index < 3} src={collab.portrait} alt={`Portada de colaboración ${collab.title}`} className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                        }
                        <div className="size-full bg-black/20 group-hover:bg-black/30 absolute top-0 left-0 z-10 transition-all duration-300" />
                        <div className="size-full flex flex-col justify-center items-center relative z-20">
                            <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                                <span className="text-white/75">{tc('collaboration')}</span>{" "}
                                <b className="font-medium block lg:inline">{collab.title}</b>
                            </h3>
                        </div>
                    </Link>
                ))}
            </section>
            <section className="mt-12 lg:my-48 w-full max-w-5xl 2xl:max-w-7xl px-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <div className="w-full lg:text-lg text-start flex flex-col gap-[1lh]">
                    <p>{t('philosophy.line1')}</p>
                    <p>{t('philosophy.line2')}</p>
                    <p>{t('philosophy.line3')}</p>
                </div>
            </section>
        </main>
    );
}