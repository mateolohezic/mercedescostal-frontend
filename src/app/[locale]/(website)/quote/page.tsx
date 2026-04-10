import { QuoteForm } from "@/components";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

interface Props {
    params: Promise<{ locale: string }>;
    searchParams: Promise<{
        mural?: string;
    }>;
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.quote' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        alternates: {
            canonical: '/quote',
            languages: {
                'es': '/quote',
                'en': '/en/quote',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/quote',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/quote',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function QuotePage({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const preselectedMuralId  = resolvedSearchParams?.mural?.trim() || "";

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Cotiza tu mural</h1>
            <QuoteForm preselectedMuralId={preselectedMuralId} />
        </main>
    );
}
