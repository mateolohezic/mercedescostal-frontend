import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { PhotoSelector, Video } from "@/components";
import london_festival_1 from "@/assets/highlights/london-design-festival/london_festival_1.webp";
import london_festival_2 from "@/assets/highlights/london-design-festival/london_festival_2.webp";
import london_festival_3 from "@/assets/highlights/london-design-festival/london_festival_3.webp";
import london_festival_4 from "@/assets/highlights/london-design-festival/london_festival_4.webp";
import london_festival_5 from "@/assets/highlights/london-design-festival/london_festival_5.webp";
import london_festival_6 from "@/assets/highlights/london-design-festival/london_festival_6.webp";
import london_festival_7 from "@/assets/highlights/london-design-festival/london_festival_7.webp";
import london_festival_8 from "@/assets/highlights/london-design-festival/london_festival_8.webp";
import london_festival_9 from "@/assets/highlights/london-design-festival/london_festival_9.webp";
import london_festival_10 from "@/assets/highlights/london-design-festival/london_festival_10.webp";
import london_festival_11 from "@/assets/highlights/london-design-festival/london_festival_11.webp";
import london_festival_12 from "@/assets/highlights/london-design-festival/london_festival_12.webp";
import london_festival_13 from "@/assets/highlights/london-design-festival/london_festival_13.webp";
import london_festival_14 from "@/assets/highlights/london-design-festival/london_festival_14.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.londonDesignFestival' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/highlights/london-design-festival',
            languages: {
                'es': '/highlights/london-design-festival',
                'en': '/en/highlights/london-design-festival',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/highlights/london-design-festival',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/highlights/london-design-festival',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function LondonDesignFestivalPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.highlights' });
    const tl = await getTranslations({ locale, namespace: 'pages.highlights.londonDesignFestival' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={london_festival_1} priority alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">{tl('title')}</b> <span className="block">{tl('titleMiddle')}</span> {tl('titleEnd')}
                </h2>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>{tl('paragraph1')}</p>
                    <p className="mt-8">{tl('paragraph2')}</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={london_festival_2} alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-4 lg:mt-12 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-4">
                <div className="w-full flex flex-col gap-4 lg:gap-12">
                    <Image src={london_festival_13} alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
                    <Image src={london_festival_4} alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full flex flex-col justify-between gap-4 lg:gap-12">
                    <Image src={london_festival_3} alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
                    <Image src={london_festival_14} alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
                </div>
            </section>
            <section className="mt-24 lg:mt-12 w-full max-w-5xl 2xl:max-w-7xl flex justify-center px-4 xl:px-0 overflow-x-hidden">
                <Video video={"/assets/highlights/london_festival_video.mp4"} className="max-w-72 lg:max-w-2xl relative lg:left-9" buttonClassName="top-4 left-4"/>
            </section>
            <PhotoSelector images={[london_festival_5, london_festival_6, london_festival_7, london_festival_8, london_festival_9, london_festival_10, london_festival_11, london_festival_12]} photoClassName="w-full object-contain" className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl flex flex-col justify-center items-center gap-1 lg:gap-4 px-4 md:px-0" gridClassName="w-full grid grid-cols-4 lg:grid-cols-8 gap-1 lg:gap-4" />
        </main>
    );
}   