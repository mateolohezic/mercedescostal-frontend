import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CafeVideo } from "@/components";
import portada from "@/assets/mc-universe/cafe/portada.webp";
import cafe_1 from "@/assets/mc-universe/cafe/cafe_1.webp";
import cafe_2 from "@/assets/mc-universe/cafe/cafe_2.webp";
import cafe_3 from "@/assets/mc-universe/cafe/cafe_3.webp";
import cafe_4 from "@/assets/mc-universe/cafe/cafe_4.webp";
import cafe_5 from "@/assets/mc-universe/cafe/cafe_5.webp";
import cafe_6 from "@/assets/mc-universe/cafe/cafe_6.webp";
import cafe_7 from "@/assets/mc-universe/cafe/cafe_7.webp";

export const metadata: Metadata = {
    title: 'Costal Café',
    description: "Costal Café Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Costal Café | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/mc-universe/costal-coffee',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/mc-universe/costal-coffee',
        creator: 'Mercedes Costal',
        title: 'Costal Café | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function CostalCafePage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    MC Universe
                </h1>
                <Image src={portada} alt="Portada Buen Diseño Mercedes Costal" className="w-full lg:h-96 lg:object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Costal <b className="font-semibold">Café</b>
                </h1>
                <div className="w-full max-w-2xl text-xl text-center lg:text-start">
                    <p>Resignificar el café como un ritual, como una elección estética diaria, como una excusa de contemplación de sabores y postales visuales.</p>
                    <p className="mt-8">Nuestro café de especialidad se encuentra justo al pie de la montaña yerbabuenense, justo cuando las copas verdes de los árboles se comienzan a elevar hasta el cielo.</p>
                    <p className="mt-8">Además, tenemos en nuestra carta una selección de pastelería de autor.</p>
                    <p className="mt-8">
                        <Link href="/collections/casamar" className='border-b border-b-black hover:opacity-75 transition-150'>Conocenos</Link>
                    </p>
                    <p className="mt-8">Costal coffe & other crafts.</p>
                </div>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-7xl px-4 xl:px-0">
                <Image src={cafe_1} alt="Meet the Makers Mercedes Costal" className="w-full lg:w-1/2 object-contain"/>
            </section>
            <section className="mt-1 lg:mt-0 w-full max-w-7xl px-4 xl:px-0 flex justify-end">
                <CafeVideo/>
            </section>
            <section className="mt-1 lg:mt-12 w-full max-w-7xl px-4 xl:px-0">
                <Image src={cafe_2} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-7xl px-4 xl:px-0">
                <Image src={cafe_3} alt="Meet the Makers Mercedes Costal" className="w-full max-w-3xl object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={cafe_4} alt="Meet the Makers Mercedes Costal" className="w-full max-w-xl object-contain"/>
            </section>
            <section className="mt-1 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-1 lg:gap-4">
                <Image src={cafe_5} alt="Meet the Makers Mercedes Costal" className="w-full object-cover aspect-[3/4] object-[50%_100%]"/>
                <Image src={cafe_6} alt="Meet the Makers Mercedes Costal" className="w-full object-cover aspect-[3/4]"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 flex justify-center">
                <Image src={cafe_7} alt="Meet the Makers Mercedes Costal" className="w-full max-w-3xl object-contain"/>
            </section>
        </main>
    );
}