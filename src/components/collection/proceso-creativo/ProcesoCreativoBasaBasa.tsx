import Image from "next/image";
import basa_basa_proceso_1 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_1.webp";
import basa_basa_proceso_2 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_2.webp";
import basa_basa_proceso_3 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_3.webp";
import basa_basa_proceso_4 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_4.webp";
import basa_basa_proceso_5 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_5.webp";
import basa_basa_proceso_6 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_6.webp";
import basa_basa_proceso_7 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_7.webp";
import basa_basa_proceso_8 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_8.webp";
import basa_basa_proceso_9 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_9.webp";
import { Video } from "@/components";

export const ProcesoCreativoBasaBasa = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow px-4 lg:px-0 flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row items-start gap-12">
                <Video video={"/assets/proceso_creativo/basa_basa/basa_basa_proceso_1.mp4"} className="w-full lg:max-w-sm shrink-0"/>
                <p className="grow text-lg text-justify">BASA BASA resignifica el estilo étnico en diseño de interiores: mezcla de objetos y referencias culturales de diferentes lugares exóticos y remotos, con énfasis en África, pero también India, Indonesia, Tailandia, Marruecos, Isla de Pascua, pueblos gitanos y culturas latinoamericanas.<br /> Los diseños parten de bases minimalistas, rústicas, antiguas o contemporáneas, siempre enriquecidas por piezas con fuerte identidad cultural.</p>
            </div>
            <Image src={basa_basa_proceso_8} alt="Buen Diseño Mercedes Costal" className="mt-12 lg:-mt-12 w-full max-w-2xl object-contain relative z-10"/>
            <div className="mt-12 lg:mt-24 max-w-3xl">
                <p className="text-lg text-center">Inspiración directa en tribus africanas y su estilo de vida, vestimenta, artesanías y conexión con la naturaleza.<br /> Ejemplo: Masai (Kenya y Tanzania), cuyo nombre en lengua Maa significa &ldquo;no quiero pedir&rdquo;, conocidos por sus ropajes rojos, abalorios y viviendas hechas de materiales naturales.<br /> Lista de tribus inspiradoras: <br /> Bosquimanos, Hamer, Himba, Daasanach, Dinka, Karo, Mursi, Nyangatom, Nuba, Pigmeos, Samburu, Surma, Tuareg, Turkana, Zulú, entre otros.</p>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-4xl flex flex-col lg:flex-row gap-4">
                <div className="grow flex flex-col gap-4">
                    <Image src={basa_basa_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full lg:w-auto lg:h-80 object-contain"/>
                    <p className="text-lg text-left"><b className="underline">Elementos visuales clave</b> <br /> Texturas, rayas, puntos como representación del mundo pagano y esotérico.<br /> Motivos que aluden a la espiritualidad y la conexión con lo natural.<br /> Estampas inspiradas en tatuajes, vasijas, objetos rituales y ornamentos corporales.</p>
                    <Image src={basa_basa_proceso_9} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
                    <Image src={basa_basa_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full lg:w-auto lg:h-80 object-contain"/>
                    <Image src={basa_basa_proceso_3} alt="Buen Diseño Mercedes Costal" className="mt-20 lg:mt-0 w-full px-24 object-contain"/>
                </div>
            </div>
            <div className="mt-24 lg:mt-48 w-full max-w-md">
                <Video video={"/assets/proceso_creativo/basa_basa/basa_basa_proceso_2.mp4"} className="w-full"/>
            </div>
            <Image src={basa_basa_proceso_4} alt="Buen Diseño Mercedes Costal" className="mt-4 lg:mt-48 w-full max-w-4xl object-contain"/>
            <p className="mt-4 lg:mt-8 max-w-5xl text-lg">En la imagen se representa un paisaje ilustrado de la sabana africana, trabajado en una paleta monocromática en tonos sepia y grises. El estilo del dibujo combina línea a mano alzada y sombreado delicado, evocando grabados antiguos o ilustraciones botánicas y zoológicas clásicas, transmitiendo una sensación de quietud y observación detallada del entorno natural africano.</p>
            <div className="mt-4 lg:mt-8 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <Image src={basa_basa_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <Image src={basa_basa_proceso_7} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <p className="mt-8 max-w-5xl text-lg">Técnica: dibujo a mano alzada con tinta o grafito, acompañado de lavados suaves en acuarela o aguadas para generar volumen y profundidad.<br /> Paleta: monocromática o de tonos muy reducidos (sepias, grises), que remite a cuadernos de campo o grabados antiguos.<br /> Trazado: líneas finas y precisas para definir contornos y texturas, con sombreados logrados mediante tramas, punteados o rayados cruzados (hatching y cross-hatching).</p>
            <div className="mt-12 lg:mt-24 w-full grid grid-cols-1 lg:grid-cols-2 relative right-4">
                <Image src={basa_basa_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
        </section>
    )
}