import Image from "next/image";
import artisan_proceso_1 from "@/assets/proceso_creativo/artisan/artisan_proceso_1.webp";
import artisan_proceso_2 from "@/assets/proceso_creativo/artisan/artisan_proceso_2.webp";
import artisan_proceso_3 from "@/assets/proceso_creativo/artisan/artisan_proceso_3.webp";
import artisan_proceso_4 from "@/assets/proceso_creativo/artisan/artisan_proceso_4.webp";
import artisan_proceso_5 from "@/assets/proceso_creativo/artisan/artisan_proceso_5.webp";
import artisan_proceso_6 from "@/assets/proceso_creativo/artisan/artisan_proceso_6.webp";
import { Video } from "@/components";

export const ProcesoCreativoArtisan = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <Image src={artisan_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            <div className="mt-24 w-full max-w-3xl px-4 flex flex-col lg:flex-row items-start gap-12">
                <div className="w-full lg:w-1/2 flex flex-col justify-start gap-12 lg:gap-24">
                    <Video video={"/assets/proceso_creativo/artisan/artisan_proceso_1.mp4"}/>
                    <div>
                        <p className="text-lg text-justify">Cada diseño es una huella; una forma de nombrar lo invisible: el ritmo del telar, el vacío contenido en una randa, la geometría simbólica de las guardas que cruzan ponchos y horizontes.</p>
                        <p className="mt-[1lh] text-lg text-justify">Como un manto que abriga historia, Artisans se nutre del saber antiguo, pero proyecta su silueta hacia una estética contemporánea, sobria, universal.</p>
                    </div>
                </div>
                <div className="lg:pt-24 w-full lg:w-1/2 flex flex-col-reverse lg:flex-col gap-12 lg:gap-24">
                    <p className="text-lg text-justify">Un tributo silencioso al gesto, al tiempo y a la tierra. <br />Artisans nace como un homenaje a la materia trabajada, al saber transmitido sin palabras, a las manos que tejen memoria. Inspirada en los oficios del norte argentino —sus telares de madera, sus urdimbres tensadas al sol, sus bordados que respiran herencia—, esta colección recorre el lenguaje profundo de lo hecho a mano, traduciéndolo en texturas que hablan de tierra y de tejido.</p>
                    <div className="w-full">
                        <Video video={"/assets/proceso_creativo/artisan/artisan_proceso_2.mp4"}/>
                    </div>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-5xl">
                <Image src={artisan_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-1 lg:mt-24 w-full max-w-3xl flex flex-col lg:flex-row gap-12">
                <div className="w-full lg:w-1/2 flex flex-col justify-start gap-12 lg:gap-24">
                    <Image src={artisan_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <div className="text-lg text-center lg:text-end px-4">
                        <p>Es una colección que no ilustra, sino que evoca.</p>
                        <p className="mt-[1lh]">No representa, sino que interpreta.</p>
                        <p className="mt-[1lh]">Desde la fibra hasta el pigmento, desde la pampa extensa hasta el silencio de un taller, Artisans se escribe en capas.</p>
                        <p className="mt-[1lh]">En cada una, un oficio: una pausa, un trazo, una respiración.</p>
                    </div>
                </div>
                <div className="lg:pt-24 w-full lg:w-1/2 lg:px-12 flex items-end">
                    <Video video={"/assets/proceso_creativo/artisan/artisan_proceso_3.mp4"} className="w-full h-auto"/>
                </div>
            </div>
            <div className="mt-4 lg:mt-24 w-full max-w-3xl">
                <Image src={artisan_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-12 lg:mt-48 w-full max-w-4xl flex flex-col gap-12">
                <Image src={artisan_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg text-center">Reinterpretación de tramas, urdimbres y texturas. Del textil al paño.</p>
            </div>
            <div className="mt-12 lg:mt-24 w-full flex justify-end overflow-x-hidden">
                <Image src={artisan_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full lg:w-2/3 object-contain relative left-4"/>
            </div>
        </section>
    )
}