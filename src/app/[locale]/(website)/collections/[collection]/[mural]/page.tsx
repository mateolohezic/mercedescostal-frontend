import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { collections, findMuralInCollection } from "@/data/collections";
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

    const { collection: foundCollection, mural: foundMural } = findMuralInCollection(collection, mural);

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

// Precios base por m² — alineados con DEFAULT_PRICES en hooks/usePricing.ts.
// Para Schema.org necesitamos el valor en SSR sin invocar el hook (cliente).
const DEFAULT_PRICES = {
    pattern: { ARS: 74000, USD: 60 },
    mural: { ARS: 92700, USD: 80 },
};

export default async function MuralDetailPage({ params }: Props) {
    const { locale, collection, mural } = await params;

    const { collection: foundCollection, mural: foundMural } = findMuralInCollection(collection, mural);
    if (!foundCollection || !foundMural) notFound();

    const isPattern = foundMural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const productType = isPattern ? 'pattern' : 'mural';
    const baseVariant = foundMural.variants.find(v => v.base) || foundMural.variants[0];
    const currency = locale === 'es' ? 'ARS' : 'USD';
    const price = baseVariant?.price?.[currency] ?? DEFAULT_PRICES[productType][currency];

    const baseUrl = 'https://mercedescostal.com.ar';
    const url = `${baseUrl}/${locale}/collections/${collection}/${mural}`;
    // montaje puede ser StaticImageData (import) o string (path). Si es
    // import, .src expone la URL post-build (/_next/static/media/...).
    // Para Schema.org necesitamos URL absoluta.
    const montajePath = typeof baseVariant.montaje === 'string'
        ? baseVariant.montaje
        : baseVariant.montaje.src;
    const imageUrl = `${baseUrl}${montajePath}`;

    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `${isPattern ? 'Pattern' : 'Mural'} ${foundMural.title}`,
        description: locale === 'es'
            ? `Wallpaper de autor de la colección ${foundCollection.title}, impreso a pedido sobre papel premium con tintas ecológicas.`
            : `Author wallpaper from the ${foundCollection.title} collection, printed to order on premium paper with eco-friendly inks.`,
        image: imageUrl,
        sku: `${foundCollection.id}-${foundMural.id}`,
        brand: {
            '@type': 'Brand',
            name: 'Mercedes Costal',
        },
        category: foundMural.keywords.join(', '),
        url,
        offers: {
            '@type': 'Offer',
            url,
            priceCurrency: currency,
            price: price.toString(),
            priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: price.toString(),
                priceCurrency: currency,
                unitCode: 'MTK', // square meter
                unitText: 'm²',
            },
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition',
            seller: {
                '@type': 'Organization',
                name: 'Mercedes Costal',
            },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <MuralDetailContent mural={foundMural} collection={foundCollection} />
        </>
    );
}
