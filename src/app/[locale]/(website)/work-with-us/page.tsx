import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.workWithUs' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/work-with-us',
            languages: {
                'es': '/work-with-us',
                'en': '/en/work-with-us',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/work-with-us',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/work-with-us',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function WorkWithUsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.workWithUs' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                    <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                        {t('title')} <b className="block font-semibold">{t('titleBold')}</b>
                    </h1>
                    <div className="w-full max-w-2xl lg:text-xl">
                        <p>{t('intro')}</p>
                        <p className="mt-8">
                            {t.rich('paragraph1', {
                                b: (chunks) => <b>{chunks}</b>
                            })}
                        </p>
                    </div>
                </div>
                <p className="mt-8 text-center lg:text-start">
                    <Link href="/meet-the-makers" className='border-b border-b-black lg:text-xl hover:opacity-75 transition-150'>{t('teamLink')}</Link>
                </p>
            </section>
        </main>
    );
}