import Image from "next/image";
import portada from "@/assets/highlights/ateneo-splendid/portada.webp";
import ateneo_splendid_1 from "@/assets/highlights/ateneo-splendid/splendid_1.webp";
import ateneo_splendid_2 from "@/assets/highlights/ateneo-splendid/splendid_2.webp";
import ateneo_splendid_3 from "@/assets/highlights/ateneo-splendid/splendid_3.webp";
import ateneo_splendid_4 from "@/assets/highlights/ateneo-splendid/splendid_4.webp";
import ateneo_splendid_5 from "@/assets/highlights/ateneo-splendid/splendid_5.webp";
import ateneo_splendid_6 from "@/assets/highlights/ateneo-splendid/splendid_6.webp";
import ateneo_splendid_7 from "@/assets/highlights/ateneo-splendid/splendid_7.webp";
import ateneo_splendid_8 from "@/assets/highlights/ateneo-splendid/splendid_8.webp";

export default function LondonDesignFestivalPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={portada} alt="Portada Buen Diseño Mercedes Costal" className="h-96 object-cover"/>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">London</b> <span className="block">Design</span> Festival
                </h1>
                <div className="w-full max-w-lg">
                    <p>Nos sumergimos en nuestra primera experiencia inmersiva inaugurando así un nuevo mundo distópico, en un diálogo creativo entre el presente y el futuro: el Metaverso de Mercedes Costal.</p>
                    <p className="mt-8">La pieza que elegimos para darle vida al relato, en el marco del London Design Festival, es nuestro Icónico Mural El Descanso de las Garzas, un recorte de los humedales del Litoral argentino. Premiado con el Sello al Buen Diseño, una escena de flora y fauna única que revivimos en las paredes del emblemático salón verde en Belgrave.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-48 w-full max-w-7xl px-4 xl:px-0">
                <Image src={ateneo_splendid_8} alt="Portada Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-3xl flex flex-col justify-center items-center gap-4 px-4 md:px-0">
                <Image src={ateneo_splendid_1} alt="Portada Buen Diseño Mercedes Costal" className="w-full h-auto object-contain"/>
                <div className="w-full grid grid-cols-6 gap-4">
                    <Image src={ateneo_splendid_2} alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={ateneo_splendid_3} alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={ateneo_splendid_4} alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={ateneo_splendid_5} alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={ateneo_splendid_6} alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                    <Image src={ateneo_splendid_7} alt="Ateneo Splendid Mercedes Costal" className="w-full aspect-[3/4] object-cover"/>
                </div>
            </section>
        </main>
    );
}