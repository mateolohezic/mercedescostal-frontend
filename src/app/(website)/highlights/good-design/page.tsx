import { Metadata } from "next";
import Image from "next/image";
import { BuenDiseñoVideo } from "@/components";
import portada from "@/assets/highlights/good-design/portada.webp";
import buen_diseño_1 from "@/assets/highlights/good-design/buen_diseño_1.webp";
import buen_diseño_2 from "@/assets/highlights/good-design/buen_diseño_2.webp";
import buen_diseño_3 from "@/assets/highlights/good-design/buen_diseño_3.webp";

export const metadata: Metadata = {
    title: 'Buen Diseño',
    description: "Buen Diseño Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Buen Diseño | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/highlights/good-design',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/highlights/good-design',
        creator: 'Mercedes Costal',
        title: 'Buen Diseño | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function BuenDiseñoPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={portada} alt="Portada Buen Diseño Mercedes Costal" className="w-full lg:w-auto lg:h-96 object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Sello <b className="font-semibold block">Buen</b> Diseño
                </h1>
                <div className="w-full max-w-2xl text-xl">
                    <p>El Sello de Buen Diseño argentino (SBD) es una distinción que otorga el Estado a los productos de la industria nacional que se destacan por su innovación, participación en la producción local sustentable, posicionamiento en el mercado y calidad de diseño.</p>
                    <p className="mt-4">La evaluación está a cargo de un comité conformado por representantes de entidades públicas y privadas relacionadas con el diseño y los diversos sectores productivos.</p>
                    <p className="mt-8">Mercedes Costal recibió su primer distinción en Mayo del 2021.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0">
                <Image src={buen_diseño_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-12 lg:mt-48 w-full max-w-2xl flex flex-col justify-center items-center px-4 xl:px-0">
                <BuenDiseñoVideo/>
                <p className="w-full text-start p-2">Animación del Mural El Edén, 2021.</p>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-md flex flex-col justify-center items-center gap-4 lg:gap-8 px-4 xl:px-0">
                <Image src={buen_diseño_2} alt="Buen Diseño Mercedes Costal" className="w-full h-auto object-contain"/>
                <Image src={buen_diseño_3} alt="Buen Diseño Mercedes Costal" className="w-full h-auto object-contain"/>
            </section>
        </main>
    );
}