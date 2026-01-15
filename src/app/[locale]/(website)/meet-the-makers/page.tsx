import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { Video } from "@/components";
import portada from "@/assets/meet-the-makers/portada.webp";
import meet_the_makers_1 from "@/assets/meet-the-makers/meet_the_makers_1.webp";
import meet_the_makers_2 from "@/assets/meet-the-makers/meet_the_makers_2.webp";
import meet_the_makers_3 from "@/assets/meet-the-makers/meet_the_makers_3.webp";
import meet_the_makers_4 from "@/assets/meet-the-makers/meet_the_makers_4.webp";
import meet_the_makers_5 from "@/assets/meet-the-makers/meet_the_makers_5.webp";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.meetTheMakers' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/meet-the-makers',
            languages: {
                'es': '/meet-the-makers',
                'en': '/en/meet-the-makers',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/meet-the-makers',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/meet-the-makers',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function MeetTheMakersPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.meetTheMakers' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    {t('title')}
                </h1>
                <Image src={portada} priority alt="Portada Meet the makers Mercedes Costal" className="w-full aspect-video object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-center gap-24">
                <Image src={meet_the_makers_1} alt="Meet the Makers Mercedes Costal" className="w-full max-w-md object-contain grayscale"/>
                <p className="w-full max-w-4xl text-center lg:text-xl">{t('intro')}</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-xl flex flex-col justify-center items-center px-4 xl:px-0">
                <Video video={"/assets/highlights/meet_the_makers_video.mp4"} className="size-full"/>
            </section>
            <section className="my-24 lg:my-64 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-start gap-8 lg:gap-4">
                <div className="grow max-w-2xl lg:text-xl flex flex-col justify-center items-center gap-8">
                    <p>&ldquo;{t('quote1')}</p>
                    <p>{t('quote2')}</p>
                    <p>{t('quote3')}&rdquo;</p>
                </div>
                <Image src={meet_the_makers_2} alt="Meet the Makers Mercedes Costal" className="w-full max-w-md object-cover"/>
            </section>
            <section className="w-full max-w-5xl 2xl:max-w-7xl grid grid-cols-2 gap-4 px-4 xl:px-0">
                <Image src={meet_the_makers_3} alt="Meet the Makers Mercedes Costal" className="w-full h-auto object-contain col-span-2"/>
                <Image src={meet_the_makers_4} alt="Meet the Makers Mercedes Costal" className="w-full aspect-[9/16] object-cover"/>
                <Image src={meet_the_makers_5} alt="Meet the Makers Mercedes Costal" className="w-full lg:aspect-[9/16] object-cover"/>
            </section>
        </main>
    );
}