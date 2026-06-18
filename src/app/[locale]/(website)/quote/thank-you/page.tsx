import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.quoteThankYou' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        // Página de conversión: no debe indexarse.
        robots: { index: false, follow: false },
        alternates: {
            canonical: '/quote/thank-you',
            languages: {
                'es': '/quote/thank-you',
                'en': '/en/quote/thank-you',
            },
        },
    };
}

export default async function QuoteThankYouPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.quoteThankYou' });

    return (
        <main className="my-24 lg:my-48 px-4 w-full grow flex flex-col items-center justify-center text-center font-truetypewritter">
            <h1 className="font-gillsans text-3xl lg:text-5xl uppercase">{t('title')}</h1>
            <p className="mt-6 max-w-xl text-base lg:text-lg text-black/75">{t('subtitle')}</p>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 font-gillsans">
                <Link href="/" className="px-6 py-3 bg-black font-medium text-white text-lg uppercase hover:bg-black/80 transition-150">
                    {t('ctaHome')}
                </Link>
                <Link href="/collections" className="px-6 py-3 border border-black text-lg uppercase hover:bg-black hover:text-white transition-150">
                    {t('ctaCollections')}
                </Link>
            </div>
        </main>
    );
}
