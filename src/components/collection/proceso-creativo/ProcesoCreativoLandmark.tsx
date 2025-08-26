import Image from "next/image";
import landmark_proceso_1 from "@/assets/proceso_creativo/landmark/landmark_proceso_1.webp";
import landmark_proceso_2 from "@/assets/proceso_creativo/landmark/landmark_proceso_2.webp";
import landmark_proceso_3 from "@/assets/proceso_creativo/landmark/landmark_proceso_3.webp";
import { Video } from "@/components";

export const ProcesoCreativoLandmark = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter overflow-x-hidden">
            <div className="w-full max-w-4xl flex flex-col gap-8">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_1.mp4"} className="w-full"/>
                <p className="text-lg text-justify">SAVAGE es un ecosistema vivo y diverso, lleno de energía y misterio. Ideal para ambientaciones inmersivas que buscan transportar al espectador a un entorno exótico y fantasioso.</p>
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_2.mp4"} className="w-full"/>
                <p className="text-lg text-justify">Para estos murales, íntimamente enlazados con la fantasía tropical, elegimos el formato audiovisual para recrear movimiento y darle vida a cada uno de los personajes que componen la escena.</p>
            </div>
            <div className="mt-12 w-full flex flex-col-reverse lg:flex-row items-center gap-16">
                <div className="grow flex justify-end">
                    <div className="max-w-sm">
                        <p className="text-lg text-justify lg:text-left">Ilustración plana con alto nivel de detalle, sin sombras profundas, lo que recuerda al arte decorativo y al naïf tropical.<br /> Colores saturados y bien definidos, con predominancia de verdes y acentos cálidos. <br />Composición sin horizonte visible, que envuelve la mirada y transmite la sensación de estar inmerso en la selva.</p>
                    </div>
                </div>
                <Image src={landmark_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full lg:w-1/2 shrink-0 object-contain relative left-8"/>
            </div>
            <div className="mt-12 lg:mt-12 w-full max-w-4xl flex justify-center">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_3.mp4"} className="w-full max-w-md"/>
            </div>
            <div className="mt-48 w-full max-w-4xl flex flex-col gap-12">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_4.mp4"} className="w-full"/>
                    <Image src={landmark_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
                <p className="text-lg text-justify">Allá va la piedrita de luna volando, mientras las linternas alumbran la espesura de este bosque encantando, repleta de magos, de sonidos raros y graciosos, de misterios resueltos y otros que aún aguardan ser develados. ¿Es El Bosque De Los Magos acaso el lugar más encantado de la tierra?</p>
            </div>
            <div className="mt-12 w-full max-w-4xl flex flex-col gap-4">
                <Image src={landmark_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg text-justify">Bocetos acuarelados pintados a mano. Técnica elegida en azul profundo para darle vida a Casamar.</p>
            </div>
            <div className="mt-12 w-full max-w-4xl">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_5.mp4"} className="w-full"/>
            </div>
        </section>
    )
}