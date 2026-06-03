'use client';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type Img = StaticImageData | string;

interface FeaturedCollection {
  id: string;
  title: string;
  portrait: Img;
}

interface UniverseItem {
  key: 'cafe' | 'fragrances' | 'book' | 'landmark';
  href: string;
  image: Img;
  // Permite ajustar el crop dentro del aspect-ratio fijo de la card —
  // útil cuando la imagen tiene zonas vacías o tipográficas que no
  // queremos mostrar (caso fragrances_1: cabecera con N°1 + texto).
  objectPosition?: string;
  // Aplica un zoom base a la imagen (combinable con objectPosition)
  // para empujar más afuera del frame las zonas no deseadas.
  zoom?: boolean;
}

interface Props {
  studioImage: Img;
  processHero: Img;
  universeItems: UniverseItem[];
  featuredCollections: FeaturedCollection[];
  signature: Img;
}

const EASE = [0.22, 1, 0.36, 1] as const;

const Reveal = ({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// Etiqueta de sección — usa opacity para heredar el color del texto
// y verse bien sobre fondo claro u oscuro. La opacidad del kicker es
// parametrizable (necesario p. ej. cuando va sobre una foto, donde un
// 40 % queda lavado y "ensucia" la lectura).
const SectionLabel = ({
  index,
  children,
  align = 'left',
  strong = false,
}: {
  index: string;
  children: React.ReactNode;
  align?: 'left' | 'center';
  strong?: boolean;
}) => (
  <div
    className={`flex items-center gap-3 text-xs uppercase tracking-[0.4em] ${
      align === 'center' ? 'justify-center' : ''
    }`}
  >
    <span className={`tabular-nums ${strong ? 'opacity-80' : 'opacity-40'}`}>{index}</span>
    <span className={`h-px w-8 bg-current ${strong ? 'opacity-60' : 'opacity-25'}`} />
    <span className={strong ? 'opacity-80' : 'opacity-40'}>{children}</span>
  </div>
);

export const HomeSections = ({
  studioImage,
  processHero,
  universeItems,
  featuredCollections,
  signature,
}: Props) => {
  const t = useTranslations('pages.home');
  const PROCESS_STEPS: Array<'step1' | 'step2' | 'step3'> = ['step1', 'step2', 'step3'];

  return (
    <>
      {/* ───────────────── 01 · MANIFIESTO ─────────────────
          Mismo ancho (max-w-3xl) y mismo padding interior (px-6 lg:px-12)
          que el bloque de texto del estudio, para que ambos textos
          arranquen en el mismo eje vertical. */}
      <section className="relative w-full bg-[#f6f1e9] text-black py-16 lg:py-24 flex flex-col items-center overflow-hidden">
        <div className="w-full max-w-3xl px-6 lg:px-12">
          <Reveal>
            <SectionLabel index="01">{t('manifesto.kicker')}</SectionLabel>
          </Reveal>
          <div className="mt-10 lg:mt-14 font-gillsans font-light leading-relaxed tracking-tight text-lg sm:text-xl lg:text-2xl text-left">
            {['line1', 'line2', 'line3', 'line4'].map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.18 }}
                className={`whitespace-pre-line ${i === 0 ? '' : 'mt-6 lg:mt-8'}`}
              >
                {t(`manifesto.${line}`)}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 02 · EL ESTUDIO ─────────────────
          Composición editorial: foto a sangría completa + texto debajo. */}
      <section className="w-full bg-white text-black flex flex-col items-center">
        <Reveal className="w-full">
          <div className="relative w-full aspect-[21/9] lg:aspect-[24/9] overflow-hidden">
            <Image
              src={studioImage}
              alt="Mercedes Costal — el estudio"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div className="w-full max-w-3xl px-6 lg:px-12 py-20 lg:py-28 flex flex-col">
          <Reveal>
            <SectionLabel index="02">{t('studio.kicker')}</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 font-gillsans font-light text-xl lg:text-2xl leading-snug tracking-tight">
              {t('studio.body')}
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 font-gillsans font-light text-base lg:text-lg text-black/65 leading-relaxed">
              {t('studio.body2')}
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <figure className="mt-14 border-t border-black/15 pt-10">
              <blockquote className="font-gillsans font-light italic text-lg lg:text-xl text-black/70 leading-relaxed">
                &ldquo;{t('studio.quote')}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <Image src={signature} alt="Firma Mercedes Costal" className="w-56 lg:w-72 h-auto object-contain" />
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── 03 · EL PROCESO ─────────────────
          Hero a pantalla completa con texto sobreimpreso en blanco
          (la imagen hace de "fondo oscuro") + grid de 3 etapas debajo
          sobre fondo blanco con texto negro. */}
      <section className="w-full bg-white text-black flex flex-col">
        <div className="relative w-full h-svh overflow-hidden text-white">
          <Image
            src={processHero}
            alt={t('process.title')}
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          <div className="absolute inset-x-0 bottom-10 lg:bottom-16 px-6 lg:px-12 flex flex-col items-center text-center">
            <Reveal>
              <SectionLabel index="03" align="center" strong>{t('process.kicker')}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              {/* whitespace-pre-line respeta el \n del copy en mobile;
                  en >= sm volvemos a comportamiento normal y el \n se
                  convierte en espacio: una sola línea en tablet+. */}
              <h2 className="mt-6 font-gillsans font-light uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl whitespace-pre-line sm:whitespace-normal">
                {t('process.title')}
              </h2>
            </Reveal>
          </div>
        </div>
        <div className="w-full px-6 lg:px-12 py-20 lg:py-28 flex flex-col items-center">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {PROCESS_STEPS.map((key, i) => (
              <Reveal key={key} delay={i * 0.12}>
                <div className="flex flex-col">
                  <span className="h-px w-12 bg-black/20" />
                  <h3 className="mt-6 font-gillsans font-light text-2xl lg:text-3xl tracking-tight">
                    {t(`process.${key}`)}
                  </h3>
                  <p className="mt-3 font-gillsans font-light text-sm lg:text-base text-black/55 leading-relaxed">
                    {t(`process.${key}Desc`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 04 · EL UNIVERSO MC ───────────────── */}
      <section className="w-full bg-[#f6f1e9] text-black px-6 lg:px-12 py-24 lg:py-40 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <Reveal>
              <SectionLabel index="04">{t('universe.kicker')}</SectionLabel>
            </Reveal>
            <Reveal delay={0.1} className="lg:max-w-md">
              <p className="font-gillsans font-light text-xl lg:text-2xl leading-snug tracking-tight">
                {t('universe.quote')}
              </p>
            </Reveal>
          </div>
          <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            {universeItems.map((item, i) => (
              <Reveal key={item.key} delay={i * 0.08} className="group">
                <Link href={item.href} className="block">
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-black/5">
                    <Image
                      src={item.image}
                      alt={t(`universe.${item.key}`)}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-700 ease-out ${
                        item.zoom ? 'scale-110 group-hover:scale-[1.18]' : 'group-hover:scale-105'
                      }`}
                      style={item.objectPosition ? { objectPosition: item.objectPosition } : undefined}
                    />
                  </div>
                  <div className="mt-3 flex items-baseline justify-between gap-3">
                    <p className="font-gillsans text-sm uppercase tracking-[0.2em]">
                      {t(`universe.${item.key}`)}
                    </p>
                    <span className="opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300 text-sm">&rarr;</span>
                  </div>
                  <p className="mt-1 font-gillsans font-light text-xs lg:text-sm text-black/50 leading-snug">
                    {t(`universe.${item.key}Desc`)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────── 05 · COLECCIONES ─────────────────
          Lista editorial vertical, compacta: cada colección es una
          fila con número, thumb, título y "Ver →". */}
      <section className="w-full bg-white text-black px-6 lg:px-12 py-20 lg:py-28 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8 lg:mb-12">
            <div>
              <Reveal><SectionLabel index="05">{t('collections.kicker')}</SectionLabel></Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-5 font-gillsans font-light uppercase text-2xl lg:text-3xl tracking-tight">{t('collections.title')}</h2>
              </Reveal>
            </div>
            <Reveal delay={0.15}>
              <Link href="/collections" className="group inline-flex items-center gap-3 font-gillsans text-xs uppercase tracking-[0.25em] border-b border-black/40 pb-1 hover:border-black transition-colors">
                {t('collections.ctaAll')}
                <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </Reveal>
          </div>
          <ul className="border-t border-black/12">
            {featuredCollections.map((col, i) => (
              <Reveal key={col.id} delay={i * 0.08}>
                <li className="border-b border-black/12">
                  <Link href={`/collections/${col.id}`} className="group grid grid-cols-12 gap-3 lg:gap-6 items-center py-5 lg:py-6">
                    <span className="col-span-1 font-gillsans text-lg lg:text-xl font-light text-black/30 tabular-nums">
                      0{i + 1}
                    </span>
                    <div className="col-span-3 relative aspect-[16/10] overflow-hidden">
                      <Image src={col.portrait} alt={col.title} fill sizes="(max-width: 1024px) 25vw, 180px" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"/>
                    </div>
                    <h3 className="col-span-6 font-gillsans text-lg lg:text-2xl font-light tracking-tight">
                      {col.title}
                    </h3>
                    <span className="col-span-2 justify-self-end inline-flex items-center gap-2 text-[10px] lg:text-xs uppercase tracking-[0.3em] text-black/50 group-hover:text-black transition-colors">
                      Ver
                      <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1} className="mt-10 lg:mt-12 flex justify-center">
            <Link
              href="/collections"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-black/30 font-gillsans text-xs uppercase tracking-[0.25em] hover:bg-black hover:text-white hover:border-black transition-all duration-300"
            >
              {t('collections.ctaAll')}
              <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────────────── 06 · CÓMO TRABAJAMOS ───────────────── */}
      <section className="w-full bg-[#f6f1e9] text-black px-6 lg:px-12 py-24 lg:py-36 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <Reveal>
            <SectionLabel index="06">{t('howWeWork.kicker')}</SectionLabel>
          </Reveal>
          <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-black/12 border border-black/12">
            {[
              { title: t('howWeWork.quoteTitle'), desc: t('howWeWork.quoteDesc'), href: '/quote', external: false },
              { title: t('howWeWork.custom'), desc: t('howWeWork.customDesc'), href: 'https://wa.me/5491160208460', external: true },
            ].map((item, i) => {
              const inner = (
                <>
                  <span className="font-gillsans text-4xl font-light text-black/20 tabular-nums">0{i + 1}</span>
                  <h3 className="mt-8 font-gillsans text-xl uppercase tracking-[0.15em] flex items-center gap-3">
                    {item.title}
                    <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
                  </h3>
                  <p className="mt-3 font-gillsans font-light text-sm text-black/55 leading-relaxed">
                    {item.desc}
                  </p>
                </>
              );
              const className = "group flex flex-col h-full p-8 lg:p-10 hover:bg-white transition-colors duration-300";
              return (
                <Reveal key={item.title} delay={i * 0.1} className="bg-[#f6f1e9]">
                  {item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
                      {inner}
                    </a>
                  ) : (
                    <Link href={item.href} className={className}>
                      {inner}
                    </Link>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ───────────────── 07 · CIERRE ───────────────── */}
      <section className="w-full bg-white text-black px-6 lg:px-12 py-32 lg:py-52 flex flex-col items-center">
        <Reveal className="w-full max-w-4xl flex flex-col items-center text-center">
          <blockquote className="font-gillsans font-light text-3xl sm:text-4xl lg:text-5xl leading-[1.25] tracking-tight text-balance">
            &ldquo;{t('closing.quote')}&rdquo;
          </blockquote>
          <div className="mt-14 flex flex-col sm:flex-row gap-4">
            <Link
              href="/quote"
              className="px-10 py-4 bg-black text-white font-gillsans uppercase tracking-[0.25em] text-sm hover:bg-black/85 transition-colors"
            >
              {t('closing.ctaShop')}
            </Link>
            <Link
              href="/collections"
              className="px-10 py-4 border border-black/35 font-gillsans uppercase tracking-[0.25em] text-sm hover:border-black hover:bg-black hover:text-white transition-all"
            >
              {t('closing.ctaCollections')}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
};
