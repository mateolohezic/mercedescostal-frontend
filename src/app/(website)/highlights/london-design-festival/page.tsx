import { Metadata } from "next";
import Image from "next/image";
import { LondonFestivalVideo } from "@/components";
import london_festival_1 from "@/assets/highlights/london-design-festival/london_festival_1.webp";
import london_festival_2 from "@/assets/highlights/london-design-festival/london_festival_2.webp";
import london_festival_3 from "@/assets/highlights/london-design-festival/london_festival_3.webp";
import london_festival_4 from "@/assets/highlights/london-design-festival/london_festival_4.webp";
import london_festival_5 from "@/assets/highlights/london-design-festival/london_festival_5.webp";
import london_festival_6 from "@/assets/highlights/london-design-festival/london_festival_6.webp";
import london_festival_7 from "@/assets/highlights/london-design-festival/london_festival_7.webp";
import london_festival_8 from "@/assets/highlights/london-design-festival/london_festival_8.webp";
import london_festival_9 from "@/assets/highlights/london-design-festival/london_festival_9.webp";
import london_festival_10 from "@/assets/highlights/london-design-festival/london_festival_10.webp";
import london_festival_11 from "@/assets/highlights/london-design-festival/london_festival_11.webp";
import london_festival_12 from "@/assets/highlights/london-design-festival/london_festival_12.webp";

export const metadata: Metadata = {
    title: 'London Design Festival',
    description: "London Design Festival Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'London Design Festival | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/highlights/london-design-festival',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/highlights/london-design-festival',
        creator: 'Mercedes Costal',
        title: 'London Design Festival | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function LondonDesignFestivalPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={london_festival_1} priority alt="Portada London Design Festival Mercedes Costal" className="w-full lg:h-96 object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">London</b> <span className="block">Design</span> Festival
                </h1>
                <div className="w-full max-w-2xl text-xl">
                    <p>Nos sumergimos en nuestra primera experiencia inmersiva inaugurando así un nuevo mundo distópico, en un diálogo creativo entre el presente y el futuro: el Metaverso de Mercedes Costal.</p>
                    <p className="mt-8">La pieza que elegimos para darle vida al relato, en el marco del London Design Festival, es nuestro Icónico Mural El Descanso de las Garzas, un recorte de los humedales del Litoral argentino. Premiado con el Sello al Buen Diseño, una escena de flora y fauna única que revivimos en las paredes del emblemático salón verde en Belgrave.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0">
                <Image src={london_festival_2} alt="London Design Festival Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-4 lg:mt-12 w-full max-w-7xl flex justify-end px-4 xl:px-0">
                <Image src={london_festival_3} alt="London Design Festival Mercedes Costal" className="w-full lg:w-1/2 object-contain"/>
            </section>
            <section className="mt-4 lg:mt-12 w-full max-w-7xl flex justify-start px-4 xl:px-0">
                <Image src={london_festival_4} alt="London Design Festival Mercedes Costal" className="w-full max-w-2xl object-contain"/>
            </section>
            <section className="mt-24 lg:mt-12 w-full max-w-7xl flex justify-start lg:justify-end px-4 xl:px-0 overflow-x-hidden">
                <LondonFestivalVideo/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-7xl flex flex-col justify-center items-center gap-1 lg:gap-4 px-4 md:px-0">
                <Image src={london_festival_5} alt="London Design Festival Mercedes Costal" className="w-full h-auto object-contain"/>
                <div className="w-full grid grid-cols-3 lg:grid-cols-7 gap-1 lg:gap-4">
                    <Image src={london_festival_6} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={london_festival_7} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={london_festival_8} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={london_festival_9} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={london_festival_10} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={london_festival_11} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={london_festival_12} alt="London Design Festival Mercedes Costal" className="w-full aspect-[3/4] object-cover hidden lg:block"/>
                </div>
            </section>
        </main>
    );
}