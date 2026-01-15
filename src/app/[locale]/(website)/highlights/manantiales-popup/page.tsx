import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import portada from "@/assets/highlights/manantiales-popup/portada.webp";
import manantiales_1 from "@/assets/highlights/manantiales-popup/manantiales_1.webp";
import manantiales_2 from "@/assets/highlights/manantiales-popup/manantiales_2.webp";
import manantiales_3 from "@/assets/highlights/manantiales-popup/manantiales_3.webp";
import manantiales_4 from "@/assets/highlights/manantiales-popup/manantiales_4.webp";
import manantiales_5 from "@/assets/highlights/manantiales-popup/manantiales_5.webp";
import manantiales_6 from "@/assets/highlights/manantiales-popup/manantiales_6.webp";
import Link from "next/link";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.manantialesPopup' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/highlights/manantiales-popup',
            languages: {
                'es': '/highlights/manantiales-popup',
                'en': '/en/highlights/manantiales-popup',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/highlights/manantiales-popup',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/highlights/manantiales-popup',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function ManantialesPopupPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.highlights' });
    const tm = await getTranslations({ locale, namespace: 'pages.highlights.manantialesPopup' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={portada} priority alt="Manantiales Popup Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">{tm('title')}</b><span className="block"> {tm('titleMiddle')}</span> {tm('titleEnd')}
                </h2>
                <div className="w-full max-w-2xl lg:text-lg">
                    <p>{tm('paragraph1')}</p>
                    <p className="mt-8">{tm('paragraph2')}</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full flex justify-center">
                <Image src={manantiales_1} alt="Manantiales Pop Up Mercedes Costal" className="w-full max-w-2xl object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-4xl flex flex-col-reverse items-center lg:grid lg:grid-cols-2 gap-8 px-4 lg:px-0">
                <Image src={manantiales_4} alt="Manantiales Pop Up Mercedes Costal" className="w-72 lg:w-full object-contain"/>
                <div className="w-full lg:text-lg">
                    <p>{tm('description1')}</p>
                    <p className="mt-[1lh]">{tm('description2')}</p>
                </div>
            </section>
            <div className="w-full max-w-4xl px-4 lg:px-0 flex flex-col items-center lg:items-end gap-8 text-center lg:text-end">
                <Image src={manantiales_3} alt="Manantiales Pop Up Mercedes Costal" className="w-full object-contain"/>
                <Link href="/collections/casamar" className='lg:text-xl uppercase border-b border-b-black hover:opacity-75 transition-150'>{tm('collectionLink')}</Link>
            </div>
            <section className="mt-8 w-full lg:max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 px-4 md:px-0">
                <div className="w-full flex items-center">
                    <Image src={manantiales_6} alt="Manantiales Popup Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-72">
                    <Image src={manantiales_5} alt="Manantiales Popup Mercedes Costal" className="w-full object-contain"/>
                    <Image src={manantiales_2} alt="Manantiales Pop Up Mercedes Costal" className="w-full max-w-2xl h-auto object-contain"/>
                </div>
            </section>
        </main>
    );
}