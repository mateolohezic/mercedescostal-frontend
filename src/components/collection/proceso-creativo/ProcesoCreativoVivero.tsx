import Image from "next/image";
import vivero_proceso_1 from "@/assets/proceso_creativo/vivero/vivero_proceso_1.webp";
import vivero_proceso_2 from "@/assets/proceso_creativo/vivero/vivero_proceso_2.webp";
import { Video } from "@/components";

export const ProcesoCreativoVivero = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="max-w-5xl grid grid-cols-2 gap-12">
                <Image src={vivero_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <div className="w-full">
                    <p className="text-lg text-justify">VIVERO se desarrolla como una odisea visual a través de los rincones del planeta que la civilización tocó y, finalmente, se retiró. La mano “humana” en este sitio de emergencia perdura en la forma de las estructuras que construimos, y los accesorios y muebles que usamos para adornarlos: restos de una situación difícil vivida.</p>
                    <p className="mt-[1lh] text-lg text-justify">Sin embargo, lo que más le interesa captar esta presentación es lo que sucede después del abandono. ¿Qué pasa con estos espacios años después de que no hay nadie para mantener, podar, preservar y cuidar constantemente?</p>
                    <p className="mt-[1lh] text-lg text-justify">Esta colección parece tener su respuesta en la naturaleza, imaginada como una fuerza que todo lo vence, pero con la dulzura de un abrazo acariciador, en oposición a la ferocidad de una inundación que lo consume todo. El final es un nuevo comienzo aquí.</p>
                </div>
            </div>
            <div className="mt-24 max-w-5xl flex flex-col items-center gap-4">
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_1.mp4"} className="max-w-3xl"/>
                <p className="text-lg text-center">El proceso de gestación lleva meses de investigación, de pruebas, intercambios y posteriormente, de definiciones. Así fue el proceso de la colección.</p>
            </div>
            <div className="mt-24 max-w-3xl grid grid-cols-2 gap-12">
                <div className="w-full flex flex-col gap-24">
                    <p className="text-lg text-justify">“La Campagne” es el mural inaugural de la colección. Toma como punto de partida un paisaje de la campiña francesa. Emula paz y tranquilidad.</p>
                    <div className="flex flex-col gap-4">
                        <Image src={vivero_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg">Boceto hecho a mano.</p>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-24">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_2.mp4"}/>
                    <p className="text-lg text-justify">El estilo de dibujo es de los ilustradores franceses naturistas de la época. Los trazos son suaves, el contraste se aprecia aquí como algo apacible y de gran versatilidad. Las copas de sus árboles envuelven arquitectura típica de la época, las formas y los volúmenes le dan profundidad y nos invitan a navegar una historia serena, elegante y clásica.</p>
                </div>
            </div>
            <div className="mt-24 max-w-5xl flex items-start gap-12">
                <div className="w-[60%] shrink-0 flex flex-col gap-24">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_3.mp4"}/>
                    <div className="w-full grid grid-cols-2 gap-12">
                        <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_5.mp4"}/>
                        <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_6.mp4"}/>
                    </div>
                </div>
                <div className="px-12 pt-48 grow shrink-0 flex justify-center">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_4.mp4"}/>
                </div>
            </div>
        </section>
    )
}

            // <div className="max-w-3xl flex items-start gap-12">
            //     <div className="pt-72 grow flex flex-col gap-12">
            //         <p className="text-lg text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados.</p>
            //         <Image src={vivero_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            //         <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_4.mp4"}/>
            //         <div className="flex flex-col gap-4">
            //             <Image src={vivero_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            //             <p className="text-lg">TITULO</p>
            //         </div>
            //     </div>
            // </div>