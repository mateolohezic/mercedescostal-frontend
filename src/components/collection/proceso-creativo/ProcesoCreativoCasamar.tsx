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
import casamar_proceso_10 from "@/assets/proceso_creativo/casamar/casamar_proceso_10.webp";
import casamar_proceso_11 from "@/assets/proceso_creativo/casamar/casamar_proceso_11.webp";
import casamar_proceso_12 from "@/assets/proceso_creativo/casamar/casamar_proceso_12.webp";
import { Video } from "@/components";

export const ProcesoCreativoCasamar = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[55%] flex flex-col">
                    <p className="text-lg text-justify">Casamar surgió en el verano 2019 y se volvió una colección icónica: fue la primera con un desarrollo completo, de patrones y murales, un marco referencial y una fuente de inspiración.<br /> Tuvo su hogar en la costa uruguaya, de esta manera también tuvo un aproach a través de una tienda pop-up con el público.</p>
                    <Image src={casamar_proceso_1} alt="Buen Diseño Mercedes Costal" className="mt-8 lg:mt-48 w-full object-contain"/>
                    <p className="mt-4 text-lg underline">Ilustraciones a base de acuarelas.</p>
                </div>
                <div className="mt-12 lg:mt-0 grow flex flex-col">
                    <Image src={casamar_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <Image src={casamar_proceso_3} alt="Buen Diseño Mercedes Costal" className="mt-4 lg:mt-24 w-full object-contain"/>
                    <p className="mt-4 text-lg underline">Mural degradé azul.</p>
                </div>
            </div>
            <div className="mt-24 lg:mt-12 max-w-xl text-lg text-justify">
                <p className="pr-4">Tras el instante mágico en que mis ojos se abrieron en el mar, no me fue más posible ver, pensar, vivir como antes.</p>
                <p className="text-right relative">(Jacques-Yves Cousteau)</p>
            </div>
            <div className="mt-24 lg:mt-12 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full flex flex-col justify-between gap-8 lg:gap-24">
                    <Image src={casamar_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <Image src={casamar_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-64 object-contain"/>
                </div>
                <div className="w-full flex flex-col">
                    <Image src={casamar_proceso_6} alt="Buen Diseño Mercedes Costal" className="my-24 lg:my-36 px-12 w-full object-contain"/>
                    <Image src={casamar_proceso_7} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 w-full max-w-xl">
                <Image src={casamar_proceso_8} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="mt-4 lg:mt-8 text-lg text-center">Azul Navegante, como el fondo del mar y los viajes que uno emprende cuando se acerca a esta inmensidad. Este mural representa una ínfima porción de la vida marina: con esas formas y texturas que tanto nos maravillan.</p>
            </div>
            <div className="mt-12 w-full max-w-3xl">
                <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-8">
                    <Image src={casamar_proceso_9} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <Video video={"/assets/proceso_creativo/casamar/casamar_proceso_1.mp4"}/>
                </div>
                <p className="mt-8 text-lg text-justify"><b className="underline uppercase">THE MAGIC MUSHROOMS:</b> Los hemos visto en infinidad de películas a lo largo de nuestra vida, probablemente los asociemos a la fantasía de nuestra niñez, por su forma, de capuchón, de persona con sombrero.<br /> La fantasía se hace realidad y se imprime. Queda registrada en nuestra retina y forma parte de nuestro entorno.</p>
            </div>
            <Image src={casamar_proceso_10} alt="Buen Diseño Mercedes Costal" className="mt-24 w-full max-w-3xl object-contain"/>
            <div className="mt-4 lg:mt-12 w-full max-w-3xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Image src={casamar_proceso_11} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <div className="hidden lg:block"></div>
            </div>
            <div className="mt-4 lg:-mt-12 w-full max-w-3xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="hidden lg:block"></div>
                <Image src={casamar_proceso_12} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-48 w-full flex justify-center">
                <Video video={"/assets/proceso_creativo/casamar/casamar_proceso_2.mp4"} className="max-w-md" buttonClassName="w-full justify-center bottom-4"/>
            </div>
        </section>
    )
}