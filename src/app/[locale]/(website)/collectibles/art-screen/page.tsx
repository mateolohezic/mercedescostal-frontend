import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import portada from "@/assets/collectibles/art-screen/portada.webp";
import art_screen_1 from "@/assets/collectibles/art-screen/art_screen_7.webp";
import art_screen_2 from "@/assets/collectibles/art-screen/art_screen_6.webp";
import art_screen_3 from "@/assets/collectibles/art-screen/art_screen_3.webp";
import art_screen_4 from "@/assets/collectibles/art-screen/art_screen_4.webp";
import art_screen_5 from "@/assets/collectibles/art-screen/art_screen_5.webp";
import art_screen_6 from "@/assets/collectibles/art-screen/art_screen_1.webp";
import art_screen_7 from "@/assets/collectibles/art-screen/art_screen_2.webp";

interface Props {
    params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.artScreen' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['biombo', 'art screen', 'design', 'Mercedes Costal', 'collectibles'],
        alternates: {
            canonical: '/collectibles/art-screen',
            languages: {
                'es': '/collectibles/art-screen',
                'en': '/en/collectibles/art-screen',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/collectibles/art-screen',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/collectibles/art-screen',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function ArtScreenPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.artScreen' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('heading')}
                </h1>
                <Image src={portada} priority alt="Art Screen - Mercedes Costal" className="w-full aspect-video object-cover object-center"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">Art</b> Screen
                </h1>
                <div className="w-full max-w-2xl lg:text-xl text-center lg:text-start">
                    <p>{t('intro')}</p>
                    <p className="mt-8">{t('introLine2')}</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-end">
                <Image src={art_screen_1} alt="Art Screen Mercedes Costal" className="w-full lg:w-1/2 object-contain"/>
            </section>
            <section className="mt-4 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12">
                <Image src={art_screen_2} alt="Art Screen Mercedes Costal" className="w-full lg:w-2/5 object-contain"/>
                <div className="w-full lg:w-1/2 lg:text-xl text-center lg:text-start">
                    <p>{t('block2p1')}</p>
                    <p className="mt-8">{t('block2p2')}</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-48 w-full h-auto lg:h-screen flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative lg:sticky lg:top-0">
                    <Image src={art_screen_3} alt="Art Screen Mercedes Costal" className="size-full object-cover"/>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="grow flex flex-col items-center justify-center px-6 lg:px-12 py-12 lg:py-0 text-center">
                        <p className="font-gillsans font-light text-sm text-black/40 uppercase tracking-[0.2em]">{t('specsTitle')}</p>
                        <h2 className="mt-3 text-4xl lg:text-5xl xl:text-6xl font-gillsans font-medium">Art Screen</h2>
                    </div>
                    <div className="px-6 lg:px-12 pb-8 lg:pb-12 flex flex-col gap-6">
                        <div className="space-y-4 text-sm lg:text-base">
                            <p><span className="text-black/50 uppercase text-xs tracking-wider">{t('specDimension')}</span><br/>{t('specDimensionValue')}</p>
                            <p><span className="text-black/50 uppercase text-xs tracking-wider">{t('specConfiguration')}</span><br/>{t('specConfigurationValue')}</p>
                            <p><span className="text-black/50 uppercase text-xs tracking-wider">{t('specDesign')}</span><br/>{t('specDesignValue')}</p>
                        </div>
                        <Link href="/quote/art-screen" className="block w-full text-center px-6 py-4 bg-black font-gillsans font-medium text-white text-lg uppercase hover:bg-black/80 transition-150">
                            {t('ctaButton')}
                        </Link>
                        <Link href="/assets/ficha_tecnica_art_screen_mercedes_costal.pdf" target="_blank" rel="noopener noreferrer" className="text-sm border-b border-black uppercase hover:opacity-70 transition-150 w-fit">
                            {t('datasheet')}
                        </Link>
                    </div>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={art_screen_4} alt="Art Screen Mercedes Costal" className="w-full max-w-2xl object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={art_screen_5} alt="Art Screen Mercedes Costal" className="w-full lg:w-3/5 object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-3xl px-4 xl:px-0 text-center lg:text-xl">
                <p>{t('block3p1')}</p>
                <p className="mt-8">{t('block3p2')}</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-end items-end gap-4 lg:gap-8">
                <Image src={art_screen_6} alt="Art Screen Mercedes Costal" className="w-full lg:w-2/5 object-contain"/>
                <Image src={art_screen_7} alt="Art Screen Mercedes Costal" className="w-full lg:w-1/4 object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <div className="w-full border-t border-black/20 pt-12 lg:pt-24 flex flex-col lg:flex-row justify-end items-start lg:items-end text-start lg:text-end">
                    <div>
                        <p className="text-sm lg:text-base opacity-70 mb-4">
                            {t('ctaLine1')}<br/>
                            {t('ctaLine2')}
                        </p>
                        <Link href="/quote/art-screen" className="inline-block border-b border-black hover:opacity-75 transition-all duration-300 text-sm lg:text-base">
                            {t('ctaButton')}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
