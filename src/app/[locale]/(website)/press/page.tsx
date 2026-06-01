import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
    return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'metadata.press' });

    return {
        metadataBase: new URL('https://mercedescostal.com.ar'),
        title: t('title'),
        description: t('description'),
        keywords: ['prensa', 'press', 'Mercedes Costal', 'Forbes', 'Marie Claire', 'La Nación', 'Ohlalá', 'Infobae', 'diseño argentino'],
        alternates: {
            canonical: '/press',
            languages: {
                'es': '/press',
                'en': '/en/press',
            },
        },
        openGraph: {
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
            url: 'https://mercedescostal.com.ar/press',
            siteName: 'Mercedes Costal',
            locale: locale === 'es' ? 'es_AR' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            site: 'https://mercedescostal.com.ar/press',
            creator: 'Mercedes Costal',
            title: `${t('title')} | Mercedes Costal`,
            description: t('description'),
        },
    };
}

type Entry = {
    key: string;
    url: string;
};

const YEARS: Array<{ year: '2025' | '2024' | '2023' | '2022' | '2021' | '2020'; entries: Entry[]; hasPullQuote?: boolean }> = [
    {
        year: '2025',
        entries: [
            { key: 'e1', url: 'https://www.somosohlala.com/decoracion/semana-del-diseno-en-milan-2025-quienes-son-los-disenadores-argentinos-y-que-exponen-nid04042025' },
            { key: 'e2', url: 'https://www.lanacion.com.ar/revista-living/te-mostramos-20-ejemplos-reales-de-toilettes-con-empapelado-nid08022025/' },
            { key: 'e3', url: 'https://www.lagaceta.com.ar/nota/1110611/sociedad/elevate-tucuman-para-formar-lideres.html' },
        ],
    },
    {
        year: '2024',
        entries: [
            { key: 'e1', url: 'https://www.somosohlala.com/decoracion/estas-son-las-disenadoras-argentinas-que-participan-del-festival-nycxdesign-2024-nid17052024' },
        ],
    },
    {
        year: '2023',
        entries: [
            { key: 'e1', url: 'https://www.lagaceta.com.ar/imagenes/galeria/4587/casa-dar-7-espacios-premiados.html' },
            { key: 'e2', url: 'https://www.lagaceta.com.ar/nota/1002178/sociedad/espacio-dar-muestra-diseno-argentino-tucuman.html' },
        ],
    },
    {
        year: '2022',
        hasPullQuote: true,
        entries: [
            { key: 'e1', url: 'https://www.forbesargentina.com/brandvoice/como-crea-estudio-diseno-metaverso-n24405' },
            { key: 'e2', url: 'https://marieclaire.perfil.com/noticias/lifestyle/costal-empapelados-tucuman.phtml' },
            { key: 'e3', url: 'https://www.infobae.com/inhouse/2022/10/05/metaverso-y-realidad-inmersiva-que-posibilidades-ofrece-la-tecnologia-para-el-arte-y-el-diseno/' },
        ],
    },
    {
        year: '2021',
        entries: [
            { key: 'e1', url: 'https://www.forbesargentina.com/brandvoice/murales-arte-historia-n11473' },
        ],
    },
    {
        year: '2020',
        entries: [
            { key: 'e1', url: 'https://www.lanacion.com.ar/lifestyle/murales-papeles-con-esencia-botanica-nid2499829/' },
        ],
    },
];

export default async function PressPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'pages.press' });

    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter text-black">
            {/* ── INTRO ─────────────────────────────────────────────── */}
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-12 flex flex-col items-center">
                <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.5rem] uppercase opacity-60">
                    {t('introEyebrow')}
                </span>
                <h1 className="mt-8 font-gillsans text-xl lg:text-2xl text-center tracking-[0.5rem] uppercase">
                    {t('sectionTitle')}
                </h1>
                <p className="mt-12 max-w-2xl text-center text-base lg:text-lg leading-relaxed text-balance opacity-80">
                    {t('introLine')}
                </p>
            </section>

            {/* ── HERO PULL QUOTE ───────────────────────────────────── */}
            <section className="mt-24 lg:mt-40 w-full max-w-5xl 2xl:max-w-6xl px-4 xl:px-12 flex flex-col items-center">
                <div className="w-full max-w-4xl flex flex-col items-center text-center">
                    <span className="font-gillsans text-3xl lg:text-5xl leading-none opacity-30 select-none" aria-hidden>
                        ❝
                    </span>
                    <blockquote className="mt-4 font-gillsans font-light text-2xl md:text-3xl lg:text-5xl leading-[1.15] tracking-tight text-balance">
                        {t('hero.quote')}
                    </blockquote>
                    <div className="mt-10 flex items-center gap-4">
                        <span className="block h-px w-12 bg-black/40" />
                        <cite className="not-italic font-gillsans text-[11px] lg:text-xs tracking-[0.4rem] uppercase">
                            {t('hero.attribution')} · {t('hero.year')}
                        </cite>
                        <span className="block h-px w-12 bg-black/40" />
                    </div>
                </div>
            </section>

            {/* ── PRESENCE STRIP ────────────────────────────────────── */}
            <section className="mt-24 lg:mt-40 w-full max-w-6xl px-4 xl:px-12 flex flex-col items-center">
                <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.5rem] uppercase opacity-60">
                    {t('presence.label')}
                </span>
                <div className="mt-8 w-full flex flex-wrap justify-center items-center gap-x-6 gap-y-3 lg:gap-x-10">
                    {[
                        t('presence.cityBA'),
                        t('presence.cityTUC'),
                        t('presence.cityMIL'),
                        t('presence.cityNYC'),
                        t('presence.cityLDN'),
                        t('presence.cityMAD'),
                    ].map((city, i, arr) => (
                        <span key={city} className="font-gillsans text-sm lg:text-base tracking-[0.3rem] uppercase flex items-center gap-x-6 lg:gap-x-10">
                            {city}
                            {i < arr.length - 1 && <span className="hidden sm:inline opacity-30" aria-hidden>·</span>}
                        </span>
                    ))}
                </div>
            </section>

            {/* ── STATS ──────────────────────────────────────────────── */}
            <section className="mt-24 lg:mt-40 w-full max-w-5xl 2xl:max-w-6xl px-4 xl:px-12">
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                    {[
                        { value: t('stats.yearsValue'), label: t('stats.yearsLabel') },
                        { value: t('stats.mediaValue'), label: t('stats.mediaLabel') },
                        { value: t('stats.fairsValue'), label: t('stats.fairsLabel') },
                    ].map(stat => (
                        <div key={stat.label} className="flex flex-col items-center text-center border-t border-black/20 pt-6">
                            <span className="font-gillsans font-light text-5xl lg:text-7xl leading-none">{stat.value}</span>
                            <span className="mt-4 font-gillsans text-[10px] lg:text-xs tracking-[0.3rem] uppercase opacity-70 max-w-[14ch]">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── EDITORIAL TIMELINE ─────────────────────────────────── */}
            <section className="mt-24 lg:mt-48 w-full max-w-6xl px-4 xl:px-12 flex flex-col items-center">
                <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.5rem] uppercase opacity-60">
                    {t('yearsHeading')}
                </span>

                <div className="mt-16 lg:mt-24 w-full flex flex-col gap-24 lg:gap-32">
                    {YEARS.map(({ year, entries, hasPullQuote }) => {
                        const ns = `y${year}` as const;
                        return (
                            <article key={year} className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                                {/* Year column */}
                                <header className="lg:col-span-3 flex flex-col items-start lg:sticky lg:top-32 lg:self-start">
                                    <span className="font-gillsans font-light text-6xl lg:text-8xl leading-none">
                                        {t(`${ns}.label`)}
                                    </span>
                                    <p className="mt-4 lg:mt-6 max-w-[28ch] text-base lg:text-lg leading-snug text-balance opacity-80">
                                        {t(`${ns}.headline`)}
                                    </p>
                                </header>

                                {/* Entries column */}
                                <div className="lg:col-span-9 flex flex-col">
                                    {hasPullQuote && (
                                        <div className="mb-12 lg:mb-16 pl-0 lg:pl-8 border-l-0 lg:border-l border-black/20">
                                            <blockquote className="font-gillsans font-light text-xl md:text-2xl lg:text-3xl leading-snug text-balance">
                                                {t(`${ns}.pullQuote`)}
                                            </blockquote>
                                            <cite className="not-italic mt-4 block font-gillsans text-[10px] lg:text-xs tracking-[0.4rem] uppercase opacity-70">
                                                {t(`${ns}.pullQuoteSource`)}
                                            </cite>
                                        </div>
                                    )}

                                    <ul className="w-full flex flex-col divide-y divide-black/15 border-t border-black/15">
                                        {entries.map(entry => {
                                            const ek = `${ns}.${entry.key}` as const;
                                            const author = t(`${ek}.author`);
                                            return (
                                                <li key={entry.key} className="group py-8 lg:py-10">
                                                    <a
                                                        href={entry.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block focus:outline-none"
                                                        aria-label={`${t(`${ek}.medium`)} — ${t(`${ek}.title`)}`}
                                                    >
                                                        <div className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between gap-2 lg:gap-6">
                                                            <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.4rem] uppercase opacity-70 group-hover:opacity-100 transition-200">
                                                                {t(`${ek}.medium`)}
                                                            </span>
                                                            <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.3rem] uppercase opacity-50">
                                                                {t(`${ek}.date`)}
                                                            </span>
                                                        </div>
                                                        <h3 className="mt-4 font-gillsans font-light text-2xl md:text-3xl leading-snug text-balance group-hover:underline underline-offset-8 decoration-from-font decoration-black/40">
                                                            {t(`${ek}.title`)}
                                                        </h3>
                                                        <p className="mt-4 max-w-2xl text-base lg:text-lg leading-relaxed opacity-80">
                                                            {t(`${ek}.excerpt`)}
                                                        </p>
                                                        <div className="mt-6 flex items-baseline justify-between gap-6">
                                                            <span className="text-sm opacity-60 italic">{author}</span>
                                                            <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.4rem] uppercase flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-200">
                                                                {t('readNote')}
                                                                <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                                                            </span>
                                                        </div>
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* ── AWARD ──────────────────────────────────────────────── */}
            <section className="mt-32 lg:mt-48 w-full max-w-3xl px-4 xl:px-12 flex flex-col items-center text-center">
                <span className="font-gillsans text-[10px] lg:text-xs tracking-[0.5rem] uppercase opacity-60">
                    {t('award.label')}
                </span>
                <h2 className="mt-8 font-gillsans font-light text-3xl md:text-4xl lg:text-5xl tracking-tight text-balance">
                    {t('award.title')}
                </h2>
                <p className="mt-6 font-gillsans text-sm lg:text-base tracking-[0.3rem] uppercase opacity-80">
                    {t('award.subtitle')} · {t('award.year')}
                </p>
                <p className="mt-8 max-w-xl text-base leading-relaxed opacity-80 text-balance">
                    {t('award.issuer')}
                </p>
            </section>

            {/* ── CLOSING ────────────────────────────────────────────── */}
            <section className="mt-32 lg:mt-48 w-full max-w-3xl px-4 xl:px-12 flex flex-col items-center text-center">
                <p className="font-gillsans font-light text-xl md:text-2xl lg:text-3xl leading-snug text-balance">
                    {t('closing.line')}
                </p>
                <Link
                    href="/meet-the-makers"
                    className="mt-12 group inline-flex items-center gap-3 font-gillsans text-[11px] lg:text-xs tracking-[0.4rem] uppercase border-b border-black/40 pb-2 hover:border-black transition-200"
                >
                    {t('closing.ctaLabel')}
                    <span aria-hidden className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </Link>
            </section>
        </main>
    );
}
