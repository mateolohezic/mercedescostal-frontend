import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import portada from "@/assets/mc-universe/book/portada.webp";
import book_1 from "@/assets/mc-universe/book/book_1.webp";
import book_2 from "@/assets/mc-universe/book/book_2.webp";
import book_3 from "@/assets/mc-universe/book/book_3.webp";
import book_4 from "@/assets/mc-universe/book/book_4.webp";
import book_5 from "@/assets/mc-universe/book/book_5.webp";
import book_6 from "@/assets/mc-universe/book/book_6.webp";
import { Video } from "@/components";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.theBook' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['diseño', 'Mercedes Costal'],
        alternates: {
            canonical: '/mc-universe/the-book',
            languages: {
                'es': '/mc-universe/the-book',
                'en': '/en/mc-universe/the-book',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/mc-universe/the-book',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/mc-universe/the-book',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

export default async function TheBookPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.mcUniverse' });
    const tb = await getTranslations({ locale, namespace: 'pages.mcUniverse.theBook' });

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
                    {tb('title')} <b className="font-semibold">{tb('titleBold')}</b>
                </h2>
                <div className="w-full max-w-2xl lg:text-xl text-center lg:text-start">
                    <p>{tb('subtitle')}</p>
                    <p className="mt-8">{tb('producedBy')} <span className="block">{tb('studio')}</span></p>
                    <p className="mt-8">{tb('date')}</p>
                    <p className="mt-8">{tb('printed')}</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-4xl px-4 xl:px-0">
                <Video video={"/assets/mc-universe/book_video.mp4"} buttonClassName="w-full absolute bottom-4 left-0 justify-center"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={book_1} alt="Meet the Makers Mercedes Costal" className="w-full max-w-3xl object-contain"/>
            </section>
            <section className="lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl flex flex-col lg:flex-row gap-4 lg:gap-12 px-4 xl:px-0">
                <div className="grow flex items-center">
                    <Image src={book_6} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
                </div>
                <Image src={book_2} alt="Meet the Makers Mercedes Costal" className="w-full max-w-3xl shrink-0 object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-1 lg:gap-4">
                <Image src={book_3} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
                <Image src={book_4} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
                <Image src={book_5} alt="Meet the Makers Mercedes Costal" className="w-full object-contain col-span-2"/>
            </section>
        </main>
    );
}