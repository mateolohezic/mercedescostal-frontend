import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Image from "next/image";
import portada from "@/assets/mc-universe/cafe/portada.webp";
// import cafe_1 from "@/assets/mc-universe/cafe/cafe_1.webp";
import cafe_1 from "@/assets/collections/the_classics/hikers_in_a_park/hikers_in_a_park_mural.webp";
import cafe_2 from "@/assets/mc-universe/cafe/cafe_2.webp";
import cafe_3 from "@/assets/mc-universe/cafe/cafe_3.webp";
import cafe_4 from "@/assets/mc-universe/cafe/cafe_4.webp";
import cafe_5 from "@/assets/mc-universe/cafe/cafe_5.webp";
import cafe_6 from "@/assets/mc-universe/cafe/cafe_6.webp";
import cafe_7 from "@/assets/mc-universe/cafe/cafe_7.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.costalCoffee' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/mc-universe/costal-coffee',
            languages: {
                'es': '/mc-universe/costal-coffee',
                'en': '/en/mc-universe/costal-coffee',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/mc-universe/costal-coffee',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/mc-universe/costal-coffee',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function CostalCafePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.mcUniverse' });
    const tc = await getTranslations({ locale, namespace: 'pages.mcUniverse.costalCafe' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={portada} priority alt="Portada Meet the makers Mercedes Costal" className="w-full aspect-video object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {tc('title')} <b className="font-semibold">{tc('titleBold')}</b>
                </h2>
                <div className="w-full max-w-2xl lg:text-xl text-center lg:text-start">
                    <p>{tc('paragraph1')}</p>
                    <p className="mt-8">{tc('paragraph2')}</p>
                    <p className="mt-8">{tc('paragraph3')}</p>
                    <p className="mt-8">
                        <Link href="https://www.instagram.com/cafecostal/" target="_blank" className='border-b border-b-black hover:opacity-75 transition-150'>{tc('link')}</Link>
                    </p>
                    <p className="mt-8">{tc('tagline')}</p>
                </div>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4">
                <Image src={cafe_1} alt="Meet the Makers Mercedes Costal" className="w-full lg:w-1/2 lg:pr-2 object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 flex justify-end">
                <Image src={cafe_2} alt="Meet the Makers Mercedes Costal" className="w-full lg:w-1/2 lg:pl-2 object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={cafe_3} alt="Meet the Makers Mercedes Costal" className="w-full max-w-3xl object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={cafe_4} alt="Meet the Makers Mercedes Costal" className="w-full max-w-xl object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-1 lg:gap-4">
                <Image src={cafe_5} alt="Meet the Makers Mercedes Costal" className="w-full object-cover aspect-[3/4] object-[50%_100%]"/>
                <Image src={cafe_6} alt="Meet the Makers Mercedes Costal" className="w-full object-cover aspect-[3/4]"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={cafe_7} alt="Meet the Makers Mercedes Costal" className="w-full max-w-3xl object-contain"/>
            </section>
        </main>
    );
}