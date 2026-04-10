import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { Video } from "@/components";
import portada from "@/assets/highlights/good-design/portada.webp";
import buen_diseño_1 from "@/assets/highlights/good-design/buen_diseño_1.webp";
import buen_diseño_2 from "@/assets/highlights/good-design/buen_diseño_2.webp";
import buen_diseño_3 from "@/assets/highlights/good-design/buen_diseño_3.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.goodDesign' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/highlights/good-design',
            languages: {
                'es': '/highlights/good-design',
                'en': '/en/highlights/good-design',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/highlights/good-design',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/highlights/good-design',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function BuenDiseñoPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.highlights' });
    const tg = await getTranslations({ locale, namespace: 'pages.highlights.goodDesign' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={portada} priority alt="Good Design Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {tg('title')} <b className="font-semibold block">{tg('titleBold')}</b> {tg('titleEnd')}
                </h2>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>{tg('paragraph1')}</p>
                    <p className="mt-4">{tg('paragraph2')}</p>
                    <p className="mt-8">{tg('paragraph3')}</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full flex justify-start">
                <Image src={buen_diseño_1} alt="Good Design Mercedes Costal" className="w-full object-contain max-w-5xl 2xl:max-w-7xl"/>
            </section>
            <section className="mt-12 lg:mt-48 w-full max-w-2xl flex flex-col justify-center items-center px-4 xl:px-0">
                <Video video={"/assets/highlights/buen_diseño_video.mp4"} className="size-full aspect-[3/4]" videoClassName="object-cover"/>
                <p className="w-full text-start p-2">{tg('videoCaption')}</p>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-md flex flex-col justify-center items-center gap-4 lg:gap-8 px-4 xl:px-0">
                <Image src={buen_diseño_2} alt="Good Design Mercedes Costal" className="w-full h-auto object-contain"/>
                <Image src={buen_diseño_3} alt="Good Design Mercedes Costal" className="w-full h-auto object-contain"/>
            </section>
        </main>
    );
}