import { Metadata } from "next";
import Image from "next/image";
import portada from "@/assets/collectibles/art-screen/portada.webp";
import art_screen_1 from "@/assets/collectibles/art-screen/art_screen_7.webp";
import art_screen_2 from "@/assets/collectibles/art-screen/art_screen_6.webp";
import art_screen_3 from "@/assets/collectibles/art-screen/art_screen_3.webp";
import art_screen_4 from "@/assets/collectibles/art-screen/art_screen_4.webp";
import art_screen_5 from "@/assets/collectibles/art-screen/art_screen_5.webp";
import art_screen_6 from "@/assets/collectibles/art-screen/art_screen_1.webp";
import art_screen_7 from "@/assets/collectibles/art-screen/art_screen_2.webp";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Art Screen',
    description: "Art Screen - Biombos de autor Mercedes Costal. Objetos coleccionables que expanden el lenguaje de nuestros murales más allá del muro.",
    keywords: ['biombo', 'art screen', 'diseño', 'Mercedes Costal', 'coleccionables'],
    openGraph: {
        title: 'Art Screen | Mercedes Costal',
        description: 'Biombos de autor. Arquitectura mínima capaz de redefinir límites.',
        url: 'https://mercedescostal.com.ar/collectibles/art-screen',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/collectibles/art-screen',
        creator: 'Mercedes Costal',
        title: 'Art Screen | Mercedes Costal',
        description: 'Biombos de autor. Arquitectura mínima capaz de redefinir límites.',
    },
};

export default function ArtScreenPage() {
    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Coleccionables
                </h1>
                <Image src={portada} priority alt="Art Screen - Biombos Mercedes Costal" className="w-full aspect-video object-cover object-center"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">Art</b> Screen
                </h1>
                <div className="w-full max-w-2xl lg:text-xl text-center lg:text-start">
                    <p>Los Art Screen en forma de biombo nacen como piezas que expanden el lenguaje de nuestros murales más allá del muro. Atmósferas que se despliegan en capas, donde el color y la textura convocan silencios, pausas y nuevas formas de mirar el espacio.</p>
                    <p className="mt-8">Cada biombo se construye como un objeto de contemplación.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={art_screen_1} alt="Art Screen en baño Mercedes Costal" className="w-full lg:w-1/2 object-contain"/>
            </section>
            <section className="mt-4 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-end">
                <Image src={art_screen_2} alt="Detalle Art Screen Mercedes Costal" className="w-full lg:w-2/5 object-contain"/>
            </section>
            <section className="mt-12 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-8 lg:gap-12">
                <div className="w-full lg:w-1/2 max-w-md lg:text-xl text-center lg:text-start order-2 lg:order-1">
                    <p>Concebidos para dividir, proteger o sugerir, la arquitectura en movimiento se hace presente.</p>
                    <p className="mt-8">Dispositivos sensibles que crean escenarios, recortan la luz, acompañan rituales cotidianos y permiten reconfigurar un ambiente con un gesto mínimo.</p>
                    <p className="mt-8 italic">Un objeto que no impone; propone.</p>
                </div>
                <Image src={art_screen_3} alt="Art Screen con leopardo Mercedes Costal" className="w-full lg:w-1/2 max-w-md object-contain order-1 lg:order-2"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={art_screen_4} alt="Detalle paneles Art Screen Mercedes Costal" className="w-full max-w-2xl object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-3xl px-4 xl:px-0 text-center lg:text-xl">
                <p>Objetos que buscan abrir un espacio, el biombo —pieza ancestral, nómada y silenciosa— reaparece como un gesto de pausa: una arquitectura mínima capaz de redefinir límites, de insinuar refugios, de crear intimidad.</p>
                <p className="mt-8">El biombo se vuelve un territorio portátil. Un fragmento de paisaje que puede moverse, transformarse, acompañar el ritmo de una vida en constante cambio.</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={art_screen_5} alt="Art Screen en ambiente Mercedes Costal" className="w-full lg:w-3/5 object-contain"/>
            </section>
            <section className="mt-4 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-end items-end gap-4 lg:gap-8">
                <Image src={art_screen_6} alt="Art Screen uso cotidiano Mercedes Costal" className="w-full lg:w-2/5 object-contain"/>
                <Image src={art_screen_7} alt="Detalle textura Art Screen Mercedes Costal" className="w-full lg:w-1/4 object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex justify-end">
                <div className="w-full max-w-xl lg:text-lg text-center lg:text-end">
                    <p>Como parte de nuestra familia de objetos coleccionables, cada biombo se realiza con la misma dedicación material: sustratos nobles, tintas de base acuosa y una mirada contemporánea que privilegia lo esencial.</p>
                    <p className="mt-8">Creamos lenguaje y en ese lenguaje, el biombo se vuelve un puente entre arte, diseño y espacio vivido.</p>
                </div>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <div className="w-full border-t border-black/20 pt-12 lg:pt-24">
                    <div className="flex flex-col lg:flex-row justify-between gap-12">
                        <div className="w-full lg:w-1/2">
                            <h2 className="font-gillsans text-lg tracking-[0.3rem] uppercase mb-8">
                                Sobre la pieza
                            </h2>
                            <div className="space-y-4 text-sm lg:text-base">
                                <p><span className="opacity-60">Dimensión por hoja</span><br/>50 cm × 183 cm</p>
                                <p><span className="opacity-60">Configuración</span><br/>2 a 6 hojas por biombo</p>
                                <p><span className="opacity-60">Modelos</span><br/>Curvo / Recto</p>
                                <p><span className="opacity-60">Terminación</span><br/>Empapelado en ambas caras</p>
                                <p><span className="opacity-60">Diseño</span><br/>A elección del catálogo</p>
                            </div>
                        </div>
                        
                        <div className="w-full lg:w-1/3 flex flex-col justify-end items-start lg:items-end text-start lg:text-end">
                            <p className="text-sm lg:text-base opacity-70 mb-4">
                                Cada Art Screen se produce bajo pedido.<br/>
                                Consultá disponibilidad y opciones de diseño.
                            </p>
                            <Link href="/quote/art-screen" className="inline-block border-b border-black hover:opacity-75 transition-all duration-300 text-sm lg:text-base">
                                Cotizar ahora →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}