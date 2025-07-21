import Image from "next/image";
import basa_basa_proceso_1 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_1.webp";
import basa_basa_proceso_2 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_2.webp";
import basa_basa_proceso_3 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_3.webp";
import basa_basa_proceso_4 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_4.webp";
import basa_basa_proceso_5 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_5.webp";
import basa_basa_proceso_6 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_6.webp";
import basa_basa_proceso_7 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_7.webp";
import { VideoProcesoCreativo } from "@/components";

export const ProcesoCreativoBasaBasa = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-4xl flex items-center gap-12">
                <VideoProcesoCreativo video={"/assets/proceso_creativo/basa_basa/basa_basa_proceso_1.mp4"} className="w-full max-w-xs shrink-0"/>
                <p className="grow text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
            </div>
            <div className="mt-48 w-full max-w-4xl flex flex-col gap-4">
                <div className="w-full h-80 flex gap-8">
                    <div>
                        <Image src={basa_basa_proceso_1} alt="Buen Diseño Mercedes Costal" className="h-80 object-contain"/>
                    </div>
                    <div>
                        <Image src={basa_basa_proceso_2} alt="Buen Diseño Mercedes Costal" className="h-80 object-contain"/>
                    </div>
                </div>
                <p className="text-lg text-justify">Trabajamos en equipo en diseño para crear, mediante nuestros empapelados y murales, un equilibrio entre arte e interiorismo, transformando colores, texturas y formas en protagonistas de los espacios.</p>
            </div>
            <div className="mt-48 w-full max-w-4xl flex flex-col gap-4">
                <Image src={basa_basa_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg">Titulo</p>
            </div>
            <div className="mt-48 w-full max-w-md">
                <VideoProcesoCreativo video={"/assets/proceso_creativo/basa_basa/basa_basa_proceso_2.mp4"} className="w-full"/>
            </div>
            <div className="mt-48 w-full flex flex-col items-center gap-4">
                <Image src={basa_basa_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="w-full px-24 text-lg">Titulo</p>
            </div>
            <div className="mt-48 w-full flex gap-24">
                <Image src={basa_basa_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-1/2 object-contain"/>
                <div className="w-1/2 max-w-sm flex flex-col gap-12">
                    <Image src={basa_basa_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <Image src={basa_basa_proceso_7} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <p className="text-lg text-justify">Trabajamos en equipo en diseño para crear, mediante nuestros empapelados y murales, un equilibrio entre arte e interiorismo, transformando colores, texturas y formas en protagonistas de los espacios.</p>
                </div>
            </div>
        </section>
    )
}