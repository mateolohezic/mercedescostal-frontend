import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import portada from "@/assets/mc-universe/fragrances/portada.webp";
import fragrances_1 from "@/assets/mc-universe/fragrances/fragrances_1.webp";
import fragrances_2 from "@/assets/mc-universe/fragrances/fragrances_2.webp";
import fragrances_3 from "@/assets/mc-universe/fragrances/fragrances_3.webp";
import fragrances_4 from "@/assets/mc-universe/fragrances/fragrances_4.webp";
import fragrances_5 from "@/assets/mc-universe/fragrances/fragrances_5.webp";
import fragrances_6 from "@/assets/mc-universe/fragrances/fragrances_6.webp";
import fragrances_7 from "@/assets/mc-universe/fragrances/fragrances_7.webp";
import fragrances_8 from "@/assets/mc-universe/fragrances/fragrances_8.webp";
import fragrances_9 from "@/assets/mc-universe/fragrances/fragrances_9.webp";
import fragrances_10 from "@/assets/mc-universe/fragrances/fragrances_10.webp";
import fragrances_11 from "@/assets/mc-universe/fragrances/fragrances_11.webp";
import fragrances_12 from "@/assets/mc-universe/fragrances/fragrances_12.webp";
import fragrances_13 from "@/assets/mc-universe/fragrances/fragrances_13.webp";
import fragrances_14 from "@/assets/mc-universe/fragrances/fragrances_14.webp";
import fragrances_15 from "@/assets/mc-universe/fragrances/fragrances_15.webp";
import fragrances_16 from "@/assets/mc-universe/fragrances/fragrances_16.webp";
import fragrances_17 from "@/assets/mc-universe/fragrances/fragrances_17.webp";
import fragrances_18 from "@/assets/mc-universe/fragrances/fragrances_18.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.fragrances' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/mc-universe/fragrances',
            languages: {
                'es': '/mc-universe/fragrances',
                'en': '/en/mc-universe/fragrances',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/mc-universe/fragrances',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/mc-universe/fragrances',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function FragrancesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.mcUniverse' });
    const tf = await getTranslations({ locale, namespace: 'pages.mcUniverse.fragrances' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={portada} priority alt="Portada Fragrances Mercedes Costal" className="w-full aspect-video object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">{tf('title')}</b>
                </h1>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>{tf('paragraph1')}</p>
                    <p className="mt-8">{tf('paragraph2')}</p>
                </div>
            </section>
            <section className="mt-8 lg:mt-12 w-full max-w-5xl 2xl:max-w-7xl px-4 md:px-0">
                <div className="w-full grid grid-cols-2 lg:gap-8">
                    <Image src={fragrances_16} alt="Fragrances Mercedes Costal" className="w-full"/>
                    <Image src={fragrances_15} alt="Fragrances Mercedes Costal" className="w-full"/>
                    <Image src={fragrances_18} alt="Fragrances Mercedes Costal" className="w-full"/>
                    <Image src={fragrances_17} alt="Fragrances Mercedes Costal" className="w-full"/>
                    <Image src={fragrances_1} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4] object-[50%_90%]"/>
                    <Image src={fragrances_2} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4] object-[50%_100%]"/>
                    <Image src={fragrances_3} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_4} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_5} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_6} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4] object-[50%_100%]"/>
                    <Image src={fragrances_7} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_8} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_9} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_10} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4] object-[50%_100%]"/>
                    <Image src={fragrances_11} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_12} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_13} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                    <Image src={fragrances_14} alt="Fragrances Mercedes Costal" className="size-full object-cover aspect-[3/4]"/>
                </div>
                {/* <p className="mt-12 text-center">
                    <Link href="https://wa.me/5491160208460?text=Hola!%20Estoy%20interesado%20en%20las%20fragancias%20de%20Mercedes%20Costal" target="_blank" className='text-lg border-b border-b-black hover:opacity-75 transition-150'>Incorporalas a tu tienda.</Link>
                </p> */}
            </section>
        </main>
    );
}