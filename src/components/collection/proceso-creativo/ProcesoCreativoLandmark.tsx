import Image from "next/image";
import landmark_proceso_1 from "@/assets/proceso_creativo/landmark/landmark_proceso_1.webp";
import landmark_proceso_2 from "@/assets/proceso_creativo/landmark/landmark_proceso_2.webp";
import landmark_proceso_3 from "@/assets/proceso_creativo/landmark/landmark_proceso_3.webp";
import { Video } from "@/components";

export const ProcesoCreativoLandmark = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-3xl flex flex-col gap-4">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_1.mp4"} className="w-full"/>
                <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
            </div>
            <div className="mt-24 w-full max-w-3xl">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_2.mp4"} className="w-full"/>
            </div>
            <div className="mt-48 w-full flex items-center gap-24">
                <div className="grow flex justify-end">
                    <div className="max-w-sm">
                        <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
                    </div>
                </div>
                <Image src={landmark_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-1/2 shrink-0 object-contain"/>
            </div>
            <div className="mt-24 w-full max-w-md">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_3.mp4"} className="w-full"/>
            </div>
            <div className="mt-48 w-full max-w-4xl flex flex-col gap-12">
                <div className="w-full px-4 grid grid-cols-2 gap-3">
                    <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_4.mp4"} className="w-full"/>
                    <Image src={landmark_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
                <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
            </div>
            <div className="mt-48 w-full max-w-4xl flex flex-col gap-4">
                <Image src={landmark_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg text-justify">Trabajamos en equipo en diseño para crear, mediante nuestros empapelados.</p>
            </div>
            <div className="mt-12 w-full max-w-4xl">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_5.mp4"} className="w-full"/>
            </div>
        </section>
    )
}