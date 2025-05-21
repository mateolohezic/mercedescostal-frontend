import Image from "next/image"
import buen_diseño_1 from "@/assets/highlights/good-design/buen_diseño_1.webp";
import { Collection } from "@/interfaces";
import { VideoProcesoCreativo } from "@/components";

interface Props {
    collection: Collection;
}

export const ProcesoCreativoClassics = ({collection}:Props) => {
    console.log(collection)
    return (
        <div className="my-24 lg:my-24 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="mt-24 lg:mt-48 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-start gap-8 lg:gap-4">
                <VideoProcesoCreativo video={"/assets/collections/the_classics/proceso_creativo/waterfall.mp4"} className="max-w-xl"/>
                <div className="w-full max-w-2xl lg:text-xl flex flex-col gap-[1lh]">
                    <p>The Classics: Art for Your Walls</p>
                    <p>Una colección de empapelados que reinterpreta obras maestras del arte universal, llevándolas del museo al espacio habitable.</p>
                    <p>Desde la delicadeza renacentista hasta la fuerza del expresionismo, cada pieza traduce la esencia de lo clásico en un lenguaje mural contemporáneo, manteniendo la potencia estética y emocional de sus orígenes.</p>
                    <p>&ldquo;The Classics&rdquo; es un puente entre historia y diseño interior, pensado para envolver los muros con belleza, cultura y memoria artística.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={buen_diseño_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </section>
        </div>
    )
}