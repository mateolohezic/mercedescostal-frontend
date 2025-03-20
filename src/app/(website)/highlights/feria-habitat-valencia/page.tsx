import Image from "next/image";
import habitat_1 from "@/assets/highlights/habitat/habitat_1.webp";
import habitat_2 from "@/assets/highlights/habitat/habitat_2.webp";
import habitat_3 from "@/assets/highlights/habitat/habitat_3.webp";
import habitat_4 from "@/assets/highlights/habitat/habitat_4.webp";
import { HabitatVideoUno, HabitatVideoDos } from "@/components";

export default function FeriaHabitatValenciaPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={habitat_1} alt="Portada Feria Hábitat de Valencia Mercedes Costal" className="w-full lg:h-96 object-cover"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Feria <b className="font-semibold block">Hábitat</b> Valencia
                </h1>
                <div className="w-full max-w-2xl text-xl">
                    <p>Nos sumergimos en nuestra primera experiencia inmersiva inaugurando así un nuevo mundo distópico, en un diálogo creativo entre el presente y el futuro: el Metaverso de Mercedes Costal.</p>
                    <p className="mt-8">La pieza que elegimos para darle vida al relato, en el marco del London Design Festival, es nuestro Icónico Mural El Descanso de las Garzas, un recorte de los humedales del Litoral argentino. Premiado con el Sello al Buen Diseño, una escena de flora y fauna única que revivimos en las paredes del emblemático salón verde en Belgrave.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl flex justify-center px-4 sm:px-0">
                <HabitatVideoUno/>
            </section>
            <section className="mt-1 lg:mt-4 w-full max-w-7xl grid grid-cols-2 gap-1 lg:gap-4 px-4 md:px-0">
                <Image src={habitat_2} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full h-auto object-cover aspect-[9/16]"/>
                <Image src={habitat_3} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full h-auto object-cover aspect-[9/16]"/>
            </section>
            <section className="mt-1 lg:mt-48 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-end">
                <HabitatVideoDos/>
            </section>
            <section className="mt-1 lg:mt-48 w-full max-w-7xl flex justify-start px-4 md:px-0">
                <Image src={habitat_4} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full max-w-lg h-auto object-contain"/>
            </section>
        </main>
    );
}