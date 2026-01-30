import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { collections } from "@/data/collections";
import { MuralDetailContent } from "@/components/collection/MuralDetailContent";

interface Props {
    params: Promise<{
        locale: string;
        collection: string;
        mural: string;
    }>;
}

export function generateStaticParams() {
    const params = [];
    for (const locale of routing.locales) {
        for (const collection of collections) {
            for (const mural of collection.murales) {
                params.push({ locale, collection: collection.id, mural: mural.id });
            }
        }
    }
    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, collection, mural } = await params;
    const t = await getTranslations({ locale, namespace: 'common' });

    const foundCollection = collections.find(col => col.id === collection);
    const foundMural = foundCollection?.murales.find(m => m.id === mural);

    if (!foundCollection || !foundMural) {
        return {
            metadataBase: new URL('https://mercedescostal.com.ar'),
            title: 'Mural no encontrado',
        };
    }

    const isPattern = foundMural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const typeLabel = isPattern ? t('pattern') : t('mural');
    const title = `${typeLabel} ${foundMural.title} | ${t('collection')} ${foundCollection.title}`;

    const description = locale === 'es'
        ? `Descubrí ${typeLabel} ${foundMural.title} de la colección ${foundCollection.title} por Mercedes Costal. Murales y empapelados de diseño.`
        : `Discover ${typeLabel} ${foundMural.title} from the ${foundCollection.title} collection by Mercedes Costal. Design murals and wallpapers.`;

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title,
        description,
        alternates: {
            canonical: `/collections/${collection}/${mural}`,
            languages: {
                'es': `/collections/${collection}/${mural}`,
                'en': `/en/collections/${collection}/${mural}`,
            },
        },
        openGraph: {
            title: `${title} | Mercedes Costal`,
            description,
            url: `/collections/${collection}/${mural}`,
            siteName: "Mercedes Costal",
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | Mercedes Costal`,
            description,
        },
    };
}

export default async function MuralDetailPage({ params }: Props) {
    const { collection, mural } = await params;

    const foundCollection = collections.find(col => col.id === collection);
    const foundMural = foundCollection?.murales.find(m => m.id === mural);
    if (!foundCollection || !foundMural) notFound();

    return <MuralDetailContent mural={foundMural} collection={foundCollection} />;
}
