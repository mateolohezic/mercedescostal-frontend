import Image from "next/image";
import vivero_proceso_1 from "@/assets/proceso_creativo/vivero/vivero_proceso_1.webp";
import vivero_proceso_2 from "@/assets/proceso_creativo/vivero/vivero_proceso_2.webp";
import vivero_proceso_3 from "@/assets/proceso_creativo/vivero/vivero_proceso_3.webp";
import vivero_proceso_4 from "@/assets/proceso_creativo/vivero/vivero_proceso_4.webp";
import vivero_proceso_5 from "@/assets/proceso_creativo/vivero/vivero_proceso_5.webp";
import vivero_proceso_6 from "@/assets/proceso_creativo/vivero/vivero_proceso_6.webp";
import vivero_proceso_7 from "@/assets/proceso_creativo/vivero/vivero_proceso_7.webp";
import vivero_proceso_8 from "@/assets/proceso_creativo/vivero/vivero_proceso_8.webp";
import { Video } from "@/components";

export const ProcesoCreativoVivero = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Image src={vivero_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <div className="w-full px-4">
                    <p className="text-lg text-justify">VIVERO se desarrolla como una odisea visual a través de los rincones del planeta que la civilización tocó y, finalmente, se retiró. La mano “humana” en este sitio de emergencia perdura en la forma de las estructuras que construimos, y los accesorios y muebles que usamos para adornarlos: restos de una situación difícil vivida.</p>
                    <p className="mt-[1lh] text-lg text-justify">Sin embargo, lo que más le interesa captar esta presentación es lo que sucede después del abandono. ¿Qué pasa con estos espacios años después de que no hay nadie para mantener, podar, preservar y cuidar constantemente?</p>
                    <p className="mt-[1lh] text-lg text-justify">Esta colección parece tener su respuesta en la naturaleza, imaginada como una fuerza que todo lo vence, pero con la dulzura de un abrazo acariciador, en oposición a la ferocidad de una inundación que lo consume todo. El final es un nuevo comienzo aquí.</p>
                </div>
            </div>
            <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_3.mp4"} className="mt-12 lg:mt-24 max-w-3xl"/>
            <div className="mt-12 lg:mt-24 max-w-3xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="w-full flex flex-col gap-24">
                    <p className="text-lg text-justify">“La Campagne” es el mural inaugural de la colección. Toma como punto de partida un paisaje de la campiña francesa. Emula paz y tranquilidad.</p>
                    <div className="px-12 flex flex-col gap-4">
                        <Image src={vivero_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg">Boceto hecho a mano.</p>
                        <Image src={vivero_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start gap-12">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_2.mp4"} className="h-auto"/>
                    <p className="text-lg text-justify">El estilo de dibujo es de los ilustradores franceses naturistas de la época. Los trazos son suaves, el contraste se aprecia aquí como algo apacible y de gran versatilidad. Las copas de sus árboles envuelven arquitectura típica de la época, las formas y los volúmenes le dan profundidad y nos invitan a navegar una historia serena, elegante y clásica.</p>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 max-w-3xl flex flex-col gap-8">
                <Image src={vivero_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg text-center">El proceso de gestación lleva meses de investigación, de pruebas, intercambios y posteriormente, de definiciones. Así fue el proceso de la colección.</p>
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_1.mp4"} className="h-auto"/>
            </div>
            <div className="mt-4 lg:mt-12 w-full max-w-4xl grid grid-cols-2 gap-4 lg:gap-12">
                <Image src={vivero_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_7.mp4"} className="h-auto"/>
                <div className="col-span-2 px-4 text-lg">
                    <p className="underline">Mural “Avistaje”</p>
                    <p className="mt-[1lh]">De la naturaleza siempre nos ha enamorado su lado más enigmático. El suspenso que genera contemplar la espesura, justo en el lugar en donde los matices se confunden y no se distingue entre las diferentes especies de árboles, hojas, aves y otras especies que habitan el verdor salvaje de nuestro mundo.</p>
                    <p className="mt-[1lh]">Avistaje representa el momento justo en donde el ser humano entra en contacto con la naturaleza. El ojo ficha la escena y lo demás, se relata en sensaciones.</p>
                </div>
            </div>
            <div className="mt-12 w-full max-w-4xl flex flex-col lg:flex-row items-start gap-4 lg:gap-12">
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_4.mp4"} className="w-full lg:max-w-xs shrink-0"/>
                <div className="grow px-4 text-lg">
                    <p className="underline">Mural “Reina Ana”</p>
                    <p className="mt-[1lh]">Un jardín de atmósfera fantástica y emoción lúdica sobre un fondo envejecido verde o rosa que aloja aves, vegetación vertical, algunas especies voladoras y una atmósfera de esparcimiento infantil.</p>
                    <p className="mt-[1lh]">Cada recorte de este mural mantiene viva la tradición china o la interpretación de esta por parte del occidente. Es sutil, sus trazos conservan la elegancia de un momento histórico y de una cultura que influenció con sus siluetas a toda una generación.</p>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-4xl grid grid-cols-2 gap-1 lg:gap-12">
                <div className="w-full flex flex-col gap-1 lg:gap-12">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_6.mp4"}/>
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_5.mp4"}/>
                </div>
                <Image src={vivero_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <div className="mt-11 lg:mt-0 col-span-2 px-4 text-lg">
                    <p className="underline">Mural “La Maison”</p>
                    <p className="mt-[1lh]">Inspirado en los arquitectos icónicos del Siglo XVII, este sketch, que emula trazos constructivos, pretende impactar con la escala de sus molduras y crear una nueva realidad a nivel interior.</p>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="w-full flex flex-col gap-4 lg:gap-8">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_8.mp4"}/>
                    <Image src={vivero_proceso_8} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-8 text-lg">
                    <div className="lg:pt-72 px-4 lg:px-0">
                        <p>En La Maison convergen elementos imaginarios, que despiertan la sensación de estar en medio de una escena cargada de elegancia clásica, de acotada paleta cromática y de trazos que mixan el estilo de la escuela antigua junto con las anotaciones de una bitácora neoclásica.</p>
                        <p className="mt-[1lh]">Elegante, poderosa, neta.</p>
                    </div>
                    <div className="w-full grow">
                        <Image src={vivero_proceso_7} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    </div>
                    <p className="px-4 lg:px-0">Su potencial es inmenso y se debate entre las formas caprichosas del boiserie, las curvas limpias de la arquitectura antigua y la postal de un parque idílico que se deja ver en algunas de sus ventanas. </p>
                </div>
            </div>
            <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_9.mp4"} className="mt-4 lg:mt-24 max-w-lg"/>
        </section>
    )
}