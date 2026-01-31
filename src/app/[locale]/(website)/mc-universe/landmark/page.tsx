import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Image from "next/image";
import portada from "@/assets/mc-universe/landmark/portada.webp";
import landmark_1 from "@/assets/mc-universe/landmark/landmark_1.webp";
import landmark_2 from "@/assets/mc-universe/landmark/landmark_2.webp";
import landmark_3 from "@/assets/mc-universe/landmark/landmark_3.webp";
import landmark_4 from "@/assets/mc-universe/landmark/landmark_4.webp";
import landmark_5 from "@/assets/mc-universe/landmark/landmark_5.webp";
import landmark_6 from "@/assets/mc-universe/landmark/landmark_6.webp";
import landmark_7 from "@/assets/mc-universe/landmark/landmark_7.webp";
import landmark_8 from "@/assets/mc-universe/landmark/landmark_8.webp";
import landmark_9 from "@/assets/mc-universe/landmark/landmark_9.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.landmark' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal', 'Landmark', 'Tucumán', 'muebles', 'decoración', 'Blau Co'],
        alternates: {
            canonical: '/mc-universe/landmark',
            languages: {
                'es': '/mc-universe/landmark',
                'en': '/en/mc-universe/landmark',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/mc-universe/landmark',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/mc-universe/landmark',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function LandmarkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.mcUniverse' });
    const tl = await getTranslations({ locale, namespace: 'pages.mcUniverse.landmark' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={portada} priority alt="Landmark Tucumán" className="w-full aspect-video object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {tl('title')} <b className="font-semibold">{tl('titleBold')}</b>
                </h2>
                <div className="w-full max-w-2xl lg:text-xl text-center lg:text-start">
                    <p>{tl('block1p1')}</p>
                    <p className="mt-8">{tl('block1p2')}</p>
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link
                            href="https://wa.me/5491160208477"
                            target="_blank"
                            className="font-gillsans text-sm tracking-[0.3rem] uppercase bg-black text-white border border-black px-6 py-3 text-center hover:bg-white hover:text-black transition-all duration-200"
                        >
                            {tl('cta1')}
                        </Link>
                        <Link
                            href="https://maps.app.goo.gl/SuoPHCv9HcDzv6sk7"
                            target="_blank"
                            className="font-gillsans text-sm tracking-[0.3rem] uppercase border border-black px-6 py-3 text-center hover:bg-black hover:text-white transition-all duration-200"
                        >
                            {tl('cta2')}
                        </Link>
                    </div>
                </div>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={landmark_7} alt="Landmark Tucumán - Mural Mercedes Costal" className="w-full max-w-3xl object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-1 lg:gap-4">
                <Image src={landmark_3} alt="Landmark Tucumán" className="w-full object-cover aspect-[3/4]"/>
                <Image src={landmark_4} alt="Landmark Tucumán" className="w-full object-cover aspect-[3/4]"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={landmark_8} alt="Landmark Tucumán" className="w-full max-w-xl object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <p className="w-full max-w-2xl lg:text-xl text-center">
                    {tl('block2')}
                </p>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-1 lg:gap-4">
                <Image src={landmark_1} alt="Landmark Tucumán" className="w-full object-cover aspect-[3/4]"/>
                <Image src={landmark_5} alt="Landmark Tucumán - Mercedes Costal" className="w-full object-cover aspect-[3/4]"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 flex justify-center">
                <p className="w-full lg:text-xl text-center">
                    {tl('block3')}
                </p>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-1 lg:gap-4">
                <Image src={landmark_2} alt="Landmark Tucumán" className="w-full object-cover aspect-[3/4]"/>
                <Image src={landmark_9} alt="Landmark 1920" className="w-full object-cover aspect-[3/4]"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-4">
                <p className="w-full lg:w-1/2 lg:text-xl text-center lg:text-start lg:pr-8">
                    {tl('block4')}
                </p>
                <Image src={landmark_6} alt="Landmark Tucumán - Mercedes Costal" className="w-full lg:w-1/2 object-contain"/>
            </section>
            {/* CTAs finales */}
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                    href="https://wa.me/5491160208477"
                    target="_blank"
                    className="font-gillsans text-sm tracking-[0.3rem] uppercase bg-black text-white border border-black px-6 py-3 text-center hover:bg-white hover:text-black transition-all duration-200"
                >
                    {tl('cta1')}
                </Link>
                <Link
                    href="https://maps.app.goo.gl/SuoPHCv9HcDzv6sk7"
                    target="_blank"
                    className="font-gillsans text-sm tracking-[0.3rem] uppercase border border-black px-6 py-3 text-center hover:bg-black hover:text-white transition-all duration-200"
                >
                    {tl('cta2')}
                </Link>
            </section>
        </main>
    );
}
