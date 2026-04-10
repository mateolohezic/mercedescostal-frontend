import { routing } from "@/i18n/routing";
import { collections, getCollaborations } from "@/data/collections";
import { sortMurales } from "@/helpers";
import { CollectionVideo, CTA, MuralCardNew } from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface Props {
    params: Promise<{
        locale: string;
        collaboration: string;
    }>;
}

export function generateStaticParams() {
    const params = [];
    const collaborations = getCollaborations();
    for (const locale of routing.locales) {
        for (const collab of collaborations) {
            params.push({ locale, collaboration: collab.id });
        }
    }
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, collaboration } = await params;
    const found = collections.find(c => c.id === collaboration && c.collaboration);

    if (!found) {
        return {
            metadataBase: new URL('https://mercedescostal.com.ar'),
            title: "Colaboración no encontrada",
            description: "La colaboración solicitada no existe.",
        };
    }

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: `${found.title} | Colaboración`,
        description: found.description,
        alternates: {
            canonical: `/collections/collaborations/${collaboration}`,
            languages: {
                'es': `/collections/collaborations/${collaboration}`,
                'en': `/en/collections/collaborations/${collaboration}`,
            },
        },
        openGraph: {
            title: `Mercedes Costal x ${found.title}`,
            description: found.description,
            url: `https://mercedescostal.com.ar/collections/collaborations/${collaboration}`,
            siteName: "Mercedes Costal",
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Mercedes Costal x ${found.title}`,
            description: found.description,
        },
    };
}

export default async function CollaborationPage({ params }: Props) {
    const { locale, collaboration } = await params;
    const t = await getTranslations({ locale, namespace: 'common' });
    const found = collections.find(c => c.id === collaboration && c.collaboration);
    if (!found) notFound();

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">{t('collaboration')} Mercedes Costal {found.title}</h1>
            <section className="w-full px-4 lg:px-12 flex flex-col justify-center items-center gap-8 lg:gap-4">
                <div className="w-full aspect-video relative">
                    <div className="size-full flex justify-center items-center text-center absolute top-0 left-0 z-40 pointer-events-none">
                        <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                            <span className="text-white/75">{t('collaboration')}</span>{" "}
                            <b className="font-medium block lg:inline">{found.title}</b>
                        </h3>
                    </div>
                    <div className="size-full bg-black/20 absolute top-0 left-0 z-30 pointer-events-none" />
                    {found.video ? (
                        <CollectionVideo video={found.video} />
                    ) : (
                        <Image priority src={found.portrait} alt={`Portada ${found.title}`} className="w-full aspect-video object-cover"/>
                    )}
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <p><b className="uppercase">Colaboración:</b> Mercedes Costal x {found.title}</p>
                    <p><b className="uppercase">Año:</b> {found.date}</p>
                    <p><b className="uppercase">Técnica:</b> {found.technique}</p>
                </div>
            </section>
            {found.murales.length > 0 &&
                <section className="mt-12 lg:mt-24 w-full px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-6 lg:gap-y-16">
                    {sortMurales(found.murales).map((mural, index) => <MuralCardNew mural={mural} collection={found} index={index} key={mural.id} />)}
                </section>
            }
            <CTA />
        </main>
    );
}