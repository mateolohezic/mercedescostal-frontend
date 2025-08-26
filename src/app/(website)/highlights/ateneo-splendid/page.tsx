import { Metadata } from "next";
import Image from "next/image";
import { PhotoSelector, Video } from "@/components";
import portada from "@/assets/highlights/ateneo-splendid/portada.webp";
import ateneo_splendid_0 from "@/assets/highlights/ateneo-splendid/splendid_0.webp";
import ateneo_splendid_1 from "@/assets/highlights/ateneo-splendid/splendid_1.webp";
import ateneo_splendid_2 from "@/assets/highlights/ateneo-splendid/splendid_2.webp";
import ateneo_splendid_3 from "@/assets/highlights/ateneo-splendid/splendid_3.webp";
import ateneo_splendid_4 from "@/assets/highlights/ateneo-splendid/splendid_4.webp";
import ateneo_splendid_5 from "@/assets/highlights/ateneo-splendid/splendid_5.webp";
import ateneo_splendid_6 from "@/assets/highlights/ateneo-splendid/splendid_6.webp";
import ateneo_splendid_7 from "@/assets/highlights/ateneo-splendid/splendid_7.webp";

export const metadata: Metadata = {
    title: 'Ateneo Splendid',
    description: "Ateneo Splendid Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Ateneo Splendid | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/highlights/ateneo-splendid',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/highlights/ateneo-splendid',
        creator: 'Mercedes Costal',
        title: 'Ateneo Splendid | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function AteneoSplendidPage() {
    return (
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full px-4 xl:px-12 flex flex-col gap-8">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={portada} priority alt="Portada Meet the makers Mercedes Costal" className="w-full aspect-[3] object-cover object-[50%_30%]"/>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Splendid
                </h1>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>En el corazón de Buenos Aires, en el emblemático edificio Grand Splendid, se encuentra una obra maestra que no solo decora, sino que nos embarca en un viaje épico a través de la identidad argentina: el mural &ldquo;Aurora&rdquo; de Mercedes Costal para Havanna</p>
                    <p className="mt-8">Inspirado en la bora de El Bosco y en el costumbrismo argentino.</p>
                </div>
            </section>
            <Image src={ateneo_splendid_0} priority alt="Portada Meet the makers Mercedes Costal" className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl object-contain"/>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-center gap-12 lg:gap-24">
                <div className="w-full max-w-3xl aspect-square relative rounded-full overflow-hidden">
                    <Video video={"/assets/highlights/splendid/splendid_video_1.mp4"} className="size-full absolute top-0 left-0 scale-[1.05]"/>
                </div>
                <p className="w-full max-w-4xl text-center lg:text-2xl">Partiendo de la obra &ldquo;El Jardín de las Delicias&rdquo; de El Bosco, Costal nos sumerge en un recorrido fascinante por los paisajes y personajes que definen nuestra esencia. Desde un &ldquo;Inicio&rdquo; cósmico que representa el origen de todo, hasta el norte argentino con sus cactus majestuosos, flamencos rosados, y la voz inmortal de Mercedes Sosa, la artista nos invita a conectar con la diversidad y riqueza de nuestro país.</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-start gap-4">
                <Video video={"/assets/highlights/splendid/splendid_video_2.mp4"} className="max-w-xl"/>
                <p className="w-full max-w-sm text-start lg:text-2xl">Recorriendo el mural digital con sus elementos.</p> 
            </section>
            <section className="mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col items-end gap-4">
                <Video video={"/assets/highlights/splendid/splendid_video_3.mp4"} className="max-w-xl object-contain"/>
                <p className="w-full max-w-xl text-start lg:text-2xl">Instalación animada en acción.</p>
            </section>
            <PhotoSelector images={[ateneo_splendid_1, ateneo_splendid_2, ateneo_splendid_3, ateneo_splendid_4, ateneo_splendid_5, ateneo_splendid_6, ateneo_splendid_7]} photoClassName="w-full object-contain" className="mt-24 lg:mt-48 w-full max-w-3xl flex flex-col justify-center items-center gap-1 lg:gap-4 px-4 md:px-0" gridClassName="w-full grid grid-cols-4 lg:grid-cols-7 gap-1 lg:gap-4" />
        </main>
    );
}