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
import morris_proceso_11 from "@/assets/proceso_creativo/morris/morris_proceso_11.webp";

export const ProcesoCreativoMorris = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24">
                <div>
                    <p className="text-lg text-justify">William Morris (1834-1896) fue un diseñador, escritor y activista británico que se convirtió en una de las figuras más influyentes del movimiento Arts and Crafts de finales del siglo XIX. <br />Su trabajo con motivos florales es quizá lo más reconocible de su legado visual, y tiene un trasfondo bastante rico</p>
                    <Image src={morris_proceso_3} alt="Buen Diseño Mercedes Costal" className="mt-8 lg:mt-24 lg:px-24 w-full object-contain"/>
                </div>
                <Image src={morris_proceso_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-24 w-full max-w-5xl flex flex-col-reverse lg:flex-col gap-8">
                <Image src={morris_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-cover aspect-[2] object-[50%_10%]"/>
                <p className="text-lg text-justify">William Morris tuvo una profunda fascinación por las flores, que se reflejó en su trabajo como diseñador, artista y escritor. A diferencia de la moda victoriana de utilizar flores exóticas en papeles pintados, Morris prefería las flores silvestres y plantas comunes, lo que reflejaba sus ideales socialistas de llevar el arte a todos</p>
            </div>
            <div className="mt-48 lg:mt-12 w-full max-w-2xl">
                <Image src={morris_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                <p className="mt-8 text-lg text-center">Sus diseños de papeles pintados, como &ldquo;Daisy&rdquo; y &ldquo;Pimpernel&rdquo;, presentan flores y plantas reconocibles, a menudo con un enfoque en especies menos conocidas</p>
            </div>
            <div className="mt-24 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-8 relative z-10">
                <Image src={morris_proceso_5} alt="Buen Diseño Mercedes Costal" className="w-full lg:w-[55%] object-contain"/>
                <p className="grow lg:pt-12 text-lg text-justify">Morris estaba fascinado por la naturaleza, especialmente por las flores, plantas y patrones orgánicos que encontraba en jardines y en el campo inglés. <br />Estudió botánica y hacía bocetos directos del natural, lo que le permitió representar las plantas con gran fidelidad, pero también con un sentido decorativo muy estudiado. <br />Influido por el arte medieval, la ornamentación islámica y los tejidos y tapices renacentistas, creó un estilo donde las flores no eran solo adorno, sino parte de un sistema rítmico y repetitivo.</p>
            </div>
            <div className="mt-12 lg:-mt-24 w-full flex justify-end">
                <Image src={morris_proceso_6} alt="Buen Diseño Mercedes Costal" className="w-full max-w-7xl object-contain relative left-4 lg:left-0"/>
            </div>
            <div className="mt-12 lg:-mt-24 w-full max-w-6xl flex justify-start relative z-10">
                <div className="w-full max-w-7xl flex items-center gap-8">
                    <Image src={morris_proceso_7} alt="Buen Diseño Mercedes Costal" className="max-w-2xl object-contain"/>
                    <p className="grow text-lg text-justify">Su enfoque en la naturaleza y las flores silvestres inspiró a otros artistas y diseñadores a seguir sus pasos, influyendo en el movimiento Arts and Crafts.</p>
                </div>
            </div>
            <div className="mt-24 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="w-full flex flex-col gap-8">
                    <Image src={morris_proceso_9} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <p className="text-lg text-justify">Morris creía que el arte debía ser accesible para todos, no solo para una élite. Su elección de motivos florales comunes reflejaba esta creencia.</p>
                </div>
                <div className="lg:-mt-36 flex flex-col items-center gap-24">
                    <Image src={morris_proceso_8} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <Image src={morris_proceso_11} alt="Buen Diseño Mercedes Costal" className="px-12 w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 w-full flex flex-col justify-center items-center gap-8">
                <Image src={morris_proceso_10} alt="Buen Diseño Mercedes Costal" className="max-w-xs object-contain"/>
                <p className="max-w-4xl text-lg text-center">Hoy sus patrones siguen vigentes en papeles pintados, telas y productos contemporáneos, conservando ese equilibrio entre naturaleza y diseño.</p>
            </div>
        </section>
    )
}