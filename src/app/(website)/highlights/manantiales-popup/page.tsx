import { Metadata } from "next";
import Image from "next/image";
import portada from "@/assets/highlights/manantiales-popup/portada.webp";
import manantiales_1 from "@/assets/highlights/manantiales-popup/manantiales_1.webp";
import manantiales_2 from "@/assets/highlights/manantiales-popup/manantiales_2.webp";
import manantiales_3 from "@/assets/highlights/manantiales-popup/manantiales_3.webp";
import manantiales_4 from "@/assets/highlights/manantiales-popup/manantiales_4.webp";
import manantiales_5 from "@/assets/highlights/manantiales-popup/manantiales_5.webp";
import manantiales_6 from "@/assets/highlights/manantiales-popup/manantiales_6.webp";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Manantiales Pop Up',
    description: "Manantiales Pop Up Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Manantiales Pop Up | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/highlights/manantiales-popup',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/highlights/manantiales-popup',
        creator: 'Mercedes Costal',
        title: 'Manantiales Pop Up | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function ManantialesPopupPage() {
    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={portada} priority alt="Portada Meet the makers Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">Manantiales</b><span className="block"> Pop</span> Up
                </h1>
                <div className="w-full max-w-2xl lg:text-lg">
                    <p>Durante el verano 2019 y 2020 nuestro equipo se mudó a Uruguay, a un pequeño pueblo etéreo y lleno de magia, justo donde el mar se encuentra con los pastizales y el blanco se funde con el cielo: Manantiales.</p>
                    <p className="mt-8">Allí abrimos nuestra primera tienda PopUp, al son del viento y el agua salada adonde también presentamos nuestra colección de murales y empapelados &ldquo;Casamar&rdquo;.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full flex justify-center">
                <Image src={manantiales_1} alt="Manantiales Pop Up Mercedes Costal" className="w-full max-w-2xl object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-4xl flex flex-col-reverse items-center lg:grid lg:grid-cols-2 gap-8 px-4 lg:px-0">
                <Image src={manantiales_4} alt="Manantiales Pop Up Mercedes Costal" className="w-72 lg:w-full object-contain"/>
                <div className="w-full lg:text-lg">
                    <p>Con un Azul Navegante como rector, inspirado en el fondo del mar y los viajes que uno emprende cuando se acerca a esta inmensidad.</p>
                    <p className="mt-[1lh]">Esta colección representa una ínfima proción de la vida marina con sus formas y texturas que tanto nos maravillan.</p>
                </div>
            </section>
            <div className="w-full max-w-4xl px-4 lg:px-0 flex flex-col items-center lg:items-end gap-8 text-center lg:text-end">
                <Image src={manantiales_3} alt="Manantiales Pop Up Mercedes Costal" className="w-full object-contain"/>
                <Link href="/collections/casamar" className='lg:text-xl uppercase border-b border-b-black hover:opacity-75 transition-150'>Conocé la Colección Casamar completa*</Link>
            </div>
            <section className="mt-8 w-full lg:max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-12 px-4 md:px-0">
                <div className="w-full flex items-center">
                    <Image src={manantiales_6} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-72">
                    <Image src={manantiales_5} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full object-contain"/>
                    <Image src={manantiales_2} alt="Manantiales Pop Up Mercedes Costal" className="w-full max-w-2xl h-auto object-contain"/>
                </div>
            </section>
        </main>
    );
}