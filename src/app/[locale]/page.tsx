import { Footer, VideoIntro, WhatsApp } from "@/components";
import { HomeSections } from "@/components/home/HomeSections";
import { getCollections } from "@/data/collections";
import { routing } from "@/i18n/routing";

import signature from "@/assets/firma.webp";
import studioImage from "@/assets/meet-the-makers/portada.webp";
// Hero del proceso: foto de Mercedes Costal — boceto firmado, pinceles
// y acuarela botánica en curso. Síntesis visual del "cada mural, una historia".
import processHero from "@/assets/home/proceso_hero.webp";

import cafeImg from "@/assets/mc-universe/cafe/cafe_2.webp";
// fragrances_1 tiene un bloque blanco arriba con N°1 y descripción.
// La card del universo crop con object-position bottom para mostrar solo
// la botella (igual que en la página de fragrances).
import fragrancesImg from "@/assets/mc-universe/fragrances/fragrances_1.webp";
import bookImg from "@/assets/mc-universe/book/book_2.webp";
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
    // La parte interesante de fragrances_1 está en la mitad-baja
    // (la botella). Desplazamos el crop para que el header de la foto
    // (bloque blanco con "N°1") quede fuera de la card.
    { key: 'fragrances' as const, href: '/mc-universe/fragrances', image: fragrancesImg, objectPosition: 'center 75%', zoom: true },
    { key: 'book' as const, href: '/mc-universe/the-book', image: bookImg },
    { key: 'landmark' as const, href: '/mc-universe/landmark', image: landmarkImg },
  ];

  return (
    <main className="w-full grow flex flex-col items-center">
      <h1 className="sr-only">Mercedes Costal — Wallpapers de autor, hechos a medida en Argentina</h1>
      {/* Mobile: aspect 9:16 (ratio real de hero_mobile.webp) para mostrar la imagen
          completa sin crop — el usuario scrollea si su viewport es más alto que 9:16.
          Desktop: min-h-svh para que el hero ocupe toda la pantalla como antes. */}
      <section className="w-full relative bg-black aspect-[9/16] lg:aspect-auto lg:min-h-svh">
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
