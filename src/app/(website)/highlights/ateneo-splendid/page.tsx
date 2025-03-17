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
import { SplendidVideoDos, SplendidVideoTres, SplendidVideoUno } from "@/components";

export default function AteneoSplendidPage() {
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
                    Splendid
                </h1>
                <div className="w-full max-w-lg">
                    <p>En el corazón de Buenos Aires, en el emblemático edificio Grand Splendid, se encuentra una obra maestra que no solo decora, sino que nos embarca en un viaje épico a través de la identidad argentina: el mural &ldquo;Aurora&rdquo; de Mercedes Costal para Havanna</p>
                    <p className="mt-8">Inspirado en la bora de El Bosco y en el costumbrismo argentino.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col items-center gap-24">
                <SplendidVideoUno/>
                <p className="w-full max-w-4xl text-center text-xl tracking-widest">Partiendo de la obra "El Jardín de las Delicias" de El Bosco, Costal nos sumerge en un recorrido fascinante por los paisajes y personajes que definen nuestra esencia. Desde un &ldquo;Inicio&rdquo; cósmico que representa el origen de todo, hasta el norte argentino con sus cactus majestuosos, flamencos rosados, y la voz inmortal de Mercedes Sosa, la artista nos invita a conectar con la diversidad y riqueza de nuestro país.</p>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-8 lg:gap-4">
                <SplendidVideoDos/>
                <div className="grow flex justify-start">
                    <p className="w-full max-w-sm text-start text-2xl tracking-widest">Recorriendo el mural digital con sus elementos.</p>
                </div>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between gap-8 lg:gap-4">
                <div className="grow flex justify-end items-end">
                    <p className="w-full max-w-sm text-end text-2xl tracking-widest">Instalación animada en acción.</p>
                </div>
                <SplendidVideoTres/>
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