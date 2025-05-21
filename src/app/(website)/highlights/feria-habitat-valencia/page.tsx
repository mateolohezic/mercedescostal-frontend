import { Metadata } from "next";
import Image from "next/image";
import { HabitatVideoUno, HabitatVideoDos } from "@/components";
import habitat_1 from "@/assets/highlights/habitat/habitat_1.webp";
import habitat_2 from "@/assets/highlights/habitat/habitat_2.webp";
import habitat_3 from "@/assets/highlights/habitat/habitat_3.webp";
import habitat_4 from "@/assets/highlights/habitat/habitat_4.webp";

export const metadata: Metadata = {
    title: 'Feria Hábitat Valencia',
    description: "Feria Hábitat Valencia Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Feria Hábitat Valencia | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/highlights/feria-habitat-valencia',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/highlights/feria-habitat-valencia',
        creator: 'Mercedes Costal',
        title: 'Feria Hábitat Valencia | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function FeriaHabitatValenciaPage() {
    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={habitat_1} priority alt="Portada Meet the makers Mercedes Costal" className="w-full aspect-video object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Feria <b className="font-semibold block">Hábitat</b> Valencia
                </h1>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>En 2023, participamos en la prestigiosa Feria Haviat de Valencia, un evento clave en el mundo del diseño y la decoración. Esta plataforma internacional nos permitió presentar nuestras propuestas en el campo de los wallpapers murales, destacando una propuesta que mixa diseño y sostenibilidad. Durante este evento, Mercedes Costal se conectó con creativos, arquitectos y diseñadores de todo el mundo, consolidando su presencia en el mercado internacional y reforzando su compromiso con la excelencia en cada pieza.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl flex justify-center px-4 sm:px-0">
                <HabitatVideoUno/>
            </section>
            <section className="mt-1 lg:mt-4 w-full max-w-5xl 2xl:max-w-7xl grid grid-cols-2 gap-1 lg:gap-4 px-4 md:px-0">
                <Image src={habitat_2} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full h-auto object-cover aspect-[9/16]"/>
                <Image src={habitat_3} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full h-auto object-cover aspect-[9/16]"/>
            </section>
            <section className="mt-1 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-end">
                <HabitatVideoDos/>
            </section>
            <section className="mt-1 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl flex justify-start px-4 md:px-0">
                <Image src={habitat_4} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full max-w-lg h-auto object-contain"/>
            </section>
        </main>
    );
}