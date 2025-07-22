import Image from "next/image";
import casamar_proceso_1 from "@/assets/proceso_creativo/casamar/casamar_proceso_1.webp";
import casamar_proceso_2 from "@/assets/proceso_creativo/casamar/casamar_proceso_2.webp";
import casamar_proceso_3 from "@/assets/proceso_creativo/casamar/casamar_proceso_3.webp";
import casamar_proceso_4 from "@/assets/proceso_creativo/casamar/casamar_proceso_4.webp";
import casamar_proceso_5 from "@/assets/proceso_creativo/casamar/casamar_proceso_5.webp";
import casamar_proceso_6 from "@/assets/proceso_creativo/casamar/casamar_proceso_6.webp";
import casamar_proceso_7 from "@/assets/proceso_creativo/casamar/casamar_proceso_7.webp";
import casamar_proceso_8 from "@/assets/proceso_creativo/casamar/casamar_proceso_8.webp";
import casamar_proceso_9 from "@/assets/proceso_creativo/casamar/casamar_proceso_9.webp";
import { Video } from "@/components";

export const ProcesoCreativoCasamar = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="w-full flex flex-col items-center gap-8">
                <Image src={casamar_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full aspect-video object-cover"/>
                <p className="text-lg text-justify max-w-4xl">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
            </div>
            <div className="mt-24 w-full max-w-3xl grid grid-cols-2 gap-24">
                <Image src={casamar_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <Video video={"/assets/proceso_creativo/casamar/casamar_proceso_1.mp4"}/>
            </div>
            <div className="mt-8 w-full max-w-xl">
                <Image src={casamar_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-24 w-full max-w-3xl flex flex-col gap-4">
                <Image src={casamar_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg">TITULO</p>
            </div>
            <div className="mt-24 w-full max-w-lg flex flex-col gap-4">
                <Image src={casamar_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg">TITULO</p>
            </div>
            <div className="mt-24 w-full grid grid-cols-2 gap-8">
                <Image src={casamar_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <Image src={casamar_proceso_7} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <Image src={casamar_proceso_8} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <div className="flex flex-col gap-4">
                    <Image src={casamar_proceso_9} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <p className="text-lg text-justify max-w-md">Trabajamos en equipo en diseño para crear, mediante nuestros empapelados y murales, un equilibrio entre arte e interiorismo, transformando colores, texturas y formas en protagonistas de los espacios.</p>
                </div>
            </div>
            <div className="mt-48 w-full flex justify-center">
                <Video video={"/assets/proceso_creativo/casamar/casamar_proceso_2.mp4"} className="max-w-md" buttonClassName="w-full justify-center bottom-4"/>
            </div>
        </section>
    )
}