import Image from "next/image";
import the_classics_proceso_1 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_1.webp";
import the_classics_proceso_2 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_2.webp";
import the_classics_proceso_3 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_3.webp";
import the_classics_proceso_4 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_4.webp";
import the_classics_proceso_5 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_5.webp";
import { VideoProcesoCreativo } from "@/components";

export const ProcesoCreativoClassics = () => {
    return (
        <section className="my-24 lg:my-24 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="mt-24 lg:mt-48 px-4 flex justify-center">
                <VideoProcesoCreativo video={"/assets/proceso_creativo/the_classics/the_classics_proceso_1.mp4"} className="max-w-lg aspect-square rounded-full overflow-hidden" buttonClassName="justify-center bottom-4 left-0 right-0 mx-auto"/>
            </div>
            <div className="mt-24 max-w-3xl flex items-start gap-12">
                <div className="w-[45%] shrink-0 flex flex-col gap-12">
                    <VideoProcesoCreativo video={"/assets/proceso_creativo/the_classics/the_classics_proceso_2.mp4"} buttonClassName="left-4 bottom-4"/>
                    <VideoProcesoCreativo video={"/assets/proceso_creativo/the_classics/the_classics_proceso_3.mp4"}/>
                    <p className="my-12 text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados.</p>
                    <div className="flex flex-col gap-4">
                        <Image src={the_classics_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg">TITULO</p>
                    </div>
                </div>
                <div className="pt-72 grow flex flex-col gap-12">
                    <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados.</p>
                    <Image src={the_classics_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <VideoProcesoCreativo video={"/assets/proceso_creativo/the_classics/the_classics_proceso_4.mp4"}/>
                    <div className="flex flex-col gap-4">
                        <Image src={the_classics_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg">TITULO</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 max-w-4xl flex flex-col gap-4">
                <Image src={the_classics_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full aspect-[2] object-cover"/>
                <p className="text-lg">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados.</p>
            </div>
            <div className="mt-24 max-w-3xl flex items-start gap-12">
                <div className="w-[35%] shrink-0 flex flex-col gap-12">
                    <VideoProcesoCreativo video={"/assets/proceso_creativo/the_classics/the_classics_proceso_5.mp4"} buttonClassName="bottom-4 left-0 w-full justify-center"/>
                </div>
                <div className="grow flex flex-col gap-12">
                    <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados. Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados. Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados.</p>
                    <Image src={the_classics_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 max-w-2xl flex flex-col gap-4">
                <VideoProcesoCreativo video={"/assets/proceso_creativo/the_classics/the_classics_proceso_6.mp4"}/>
                <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados.</p>
            </div>
        </section>
    )
}