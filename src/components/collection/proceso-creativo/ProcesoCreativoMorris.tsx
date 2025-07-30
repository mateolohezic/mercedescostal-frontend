import Image from "next/image";
import morris_proceso_1 from "@/assets/proceso_creativo/morris/morris_proceso_1.webp";
import morris_proceso_2 from "@/assets/proceso_creativo/morris/morris_proceso_2.webp";
import morris_proceso_3 from "@/assets/proceso_creativo/morris/morris_proceso_3.webp";
import morris_proceso_4 from "@/assets/proceso_creativo/morris/morris_proceso_4.webp";
import morris_proceso_5 from "@/assets/proceso_creativo/morris/morris_proceso_5.webp";
import morris_proceso_6 from "@/assets/proceso_creativo/morris/morris_proceso_6.webp";
import morris_proceso_7 from "@/assets/proceso_creativo/morris/morris_proceso_7.webp";
import morris_proceso_8 from "@/assets/proceso_creativo/morris/morris_proceso_8.webp";
import morris_proceso_9 from "@/assets/proceso_creativo/morris/morris_proceso_9.webp";
import morris_proceso_10 from "@/assets/proceso_creativo/morris/morris_proceso_10.webp";

export const ProcesoCreativoMorris = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-3xl flex items-center">
                <p className="w-2/5 shrink-0 text-base text-justify pr-8">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
                <div className="w-3/5 shrink-0 pl-12">
                    <Image src={morris_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
            </div>
            <div className="w-full max-w-4xl -mt-12">
                <Image src={morris_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-96 object-contain"/>
            </div>
            <div className="-mt-24 w-full max-w-3xl flex items-end">
                <p className="w-2/5 shrink-0 pr-8 pb-24 text-base text-justify">Trabajamos conjuntamente desde las diferentes áreas del diseño, para lograr, a través de nuestros empapelados y murales, un equilibrio entre el arte y el interiorismo, generando con ellos, espacios, donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
                <div className="w-3/5 shrink-0 pl-24">
                    <Image src={morris_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 lg:mt-72 w-full max-w-2xl">
                <Image src={morris_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-24 w-full max-w-3xl flex flex-col gap-4 relative z-10">
                <Image src={morris_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-3/5 object-contain"/>
                <p className="text-lg">TITULO</p>
            </div>
            <div className="-mt-72 w-full flex justify-end overflow-x-hidden">
                <div className="w-full translate-x-1/4">
                    <Image src={morris_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 lg:mt-48 w-full max-w-4xl flex items-center">
                <div className="w-3/5 shrink-0">
                    <Image src={morris_proceso_7} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                </div>
                <p className="w-2/5 shrink-0 text-base text-justify pl-12">Donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
            </div>
            <div className="mt-24 w-full max-w-3xl grid grid-cols-2 gap-12">
                <Image src={morris_proceso_9} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <Image src={morris_proceso_8} alt="Buen Diseño Mercedes Costal" className="-mt-36 w-full object-contain relative left-8"/>
            </div>
            <div className="mt-4 w-full max-w-3xl">
                <p className="w-1/2 text-base text-justify">Donde los colores, las texturas y las formas se transforman en los protagonistas de los ambientes.”</p>
            </div>
            <div className="mt-24 w-full flex justify-center">
                <Image src={morris_proceso_10} alt="Buen Diseño Mercedes Costal" className="max-w-xs object-contain"/>
            </div>
        </section>
    )
}