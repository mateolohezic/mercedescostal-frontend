import { Footer, VideoIntro, WhatsApp } from "@/components";
import { HomeSections } from "@/components/home/HomeSections";
import { getCollections } from "@/data/collections";
import { routing } from "@/i18n/routing";

import signature from "@/assets/firma.webp";
import studioImage from "@/assets/meet-the-makers/portada.webp";
// Hero del proceso: foto de Mercedes Costal — boceto firmado, pinceles
// y acuarela botánica en curso. Síntesis visual del "cada mural, una historia".
import processHero from "@/assets/home/proceso_hero.webp";

import cafeImg from "@/assets/mc-universe/cafe/portada.webp";
import fragrancesImg from "@/assets/mc-universe/fragrances/portada.webp";
import bookImg from "@/assets/mc-universe/book/portada.webp";
import landmarkImg from "@/assets/mc-universe/landmark/portada.webp";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default function HomePage() {
  const featuredCollections = getCollections().slice(0, 4).map(c => ({
    id: c.id,
    title: c.title,
    portrait: c.portrait,
  }));

  const universeItems = [
    { key: 'cafe' as const, href: '/mc-universe/costal-coffee', image: cafeImg },
    { key: 'fragrances' as const, href: '/mc-universe/fragrances', image: fragrancesImg },
    { key: 'book' as const, href: '/mc-universe/the-book', image: bookImg },
    { key: 'landmark' as const, href: '/mc-universe/landmark', image: landmarkImg },
  ];

  return (
    <main className="w-full grow flex flex-col items-center">
      <h1 className="sr-only">Mercedes Costal — Wallpapers de autor, hechos a medida en Argentina</h1>
      <section className="w-full min-h-svh relative bg-black">
        <VideoIntro/>
      </section>
      <HomeSections
        studioImage={studioImage}
        processHero={processHero}
        universeItems={universeItems}
        featuredCollections={featuredCollections}
        signature={signature}
      />
      <Footer/>
      <WhatsApp/>
    </main>
  );
}
