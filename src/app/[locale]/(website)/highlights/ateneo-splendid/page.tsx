import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { PhotoSelector, Video } from "@/components";
import portada from "@/assets/highlights/ateneo-splendid/portada.webp";
import ateneo_splendid_0 from "@/assets/highlights/ateneo-splendid/splendid_0.webp";
import ateneo_splendid_1 from "@/assets/highlights/ateneo-splendid/splendid_1.webp";
import ateneo_splendid_2 from "@/assets/highlights/ateneo-splendid/splendid_2.webp";
import ateneo_splendid_3 from "@/assets/highlights/ateneo-splendid/splendid_3.webp";
import ateneo_splendid_4 from "@/assets/highlights/ateneo-splendid/splendid_4.webp";
import ateneo_splendid_5 from "@/assets/highlights/ateneo-splendid/splendid_5.webp";
import ateneo_splendid_6 from "@/assets/highlights/ateneo-splendid/splendid_6.webp";
import ateneo_splendid_7 from "@/assets/highlights/ateneo-splendid/splendid_7.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.ateneoSplendid' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/highlights/ateneo-splendid',
            languages: {
                'es': '/highlights/ateneo-splendid',
                'en': '/en/highlights/ateneo-splendid',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/highlights/ateneo-splendid',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/highlights/ateneo-splendid',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function AteneoSplendidPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.highlights' });
    const ta = await getTranslations({ locale, namespace: 'pages.highlights.ateneoSplendid' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <Image src={portada} priority alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3] object-cover object-[50%_30%]"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {ta('title')}
                </h2>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>{ta('paragraph1')}</p>
                    <p className="mt-8">{ta('paragraph2')}</p>
                </div>
            </section>
            <Image src={ateneo_splendid_0} priority alt="Ateneo Splendid Mercedes Costal" className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl object-contain"/>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-center gap-12 lg:gap-24">
                <div className="w-full max-w-3xl aspect-square relative rounded-full overflow-hidden">
                    <Video video={"/assets/highlights/splendid/splendid_video_1.mp4"} className="size-full absolute top-0 left-0 scale-[1.05]"/>
                </div>
                <p className="w-full max-w-4xl text-center lg:text-2xl">{ta('description1')}</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-start gap-4">
                <Video video={"/assets/highlights/splendid/splendid_video_2.mp4"} className="max-w-xl"/>
                <p className="w-full max-w-sm text-start lg:text-2xl">{ta('videoCaption1')}</p>
            </section>
            <section className="mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-end gap-4">
                <Video video={"/assets/highlights/splendid/splendid_video_3.mp4"} className="max-w-xl object-contain"/>
                <p className="w-full max-w-xl text-start lg:text-2xl">{ta('videoCaption2')}</p>
            </section>
            <PhotoSelector images={[ateneo_splendid_1, ateneo_splendid_2, ateneo_splendid_3, ateneo_splendid_4, ateneo_splendid_5, ateneo_splendid_6, ateneo_splendid_7]} photoClassName="w-full object-contain" className="mt-24 lg:mt-48 w-full max-w-3xl flex flex-col justify-center items-center gap-1 lg:gap-4 px-4 md:px-0" gridClassName="w-full grid grid-cols-4 lg:grid-cols-7 gap-1 lg:gap-4" />
        </main>
    );
}