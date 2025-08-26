import Image from "next/image";
import the_classics_proceso_1 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_1.webp";
import the_classics_proceso_2 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_2.webp";
import the_classics_proceso_3 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_3.webp";
import the_classics_proceso_4 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_4.webp";
import the_classics_proceso_5 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_5.webp";
import { Video } from "@/components";

export const ProcesoCreativoClassics = () => {
    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter">
            <div className="max-w-7xl flex flex-col lg:flex-row items-center lg:items-start gap-12">
                <div className="w-full lg:w-[45%] shrink-0 flex flex-col gap-12">
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_1.mp4"} className="w-full aspect-square rounded-full overflow-hidden" buttonClassName="justify-center bottom-4 left-0 right-0 mx-auto"/>
                    <div className="lg:hidden">
                        <p className="text-lg text-justify">The Classic: art for your walls*</p>
                        <p className="mt-[1lh] text-lg text-justify">“Italian Landscape”</p>
                        <p className="mt-[1lh] text-lg text-justify">El imaginario del holandés Van Frijtom y su devoción por la pintura monocromo lo hicieron componer esta obra azulada que se inspira en un típico paisaje italiano. La inspiración puede que haya brotado de otras obras de artistas que fueron contemporáneos ya que Frederik nunca salió de su país.</p>
                    </div>
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_2.mp4"} className="relative left-4 lg:left-0" buttonClassName="left-4 bottom-4"/>
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_3.mp4"}/>
                    <Image src={the_classics_proceso_3} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                    <div>
                        <p className="text-lg text-justify"><b className="underline">#05</b> Waterfall.</p>
                        <p className="mt-[1lh] text-lg text-justify">Inspirado en la obra del pintor holandés Charles William Meredith van de Velde, creada entre 1838 y 1898, este mural presenta un paisaje de Java, un pueblo de Indonesia, con una escena junto al río y rodeada de palmeras. <br />Esta escena así como otras de The Classics están disponible para cotizar hoy mismo.</p>
                    </div>
                </div>
                <div className="lg:pt-36 grow">
                    <div className="hidden lg:block">
                        <p className="text-lg text-justify">The Classic: art for your walls*</p>
                        <p className="mt-[1lh] text-lg text-justify">“Italian Landscape”</p>
                        <p className="mt-[1lh] text-lg text-justify">El imaginario del holandés Van Frijtom y su devoción por la pintura monocromo lo hicieron componer esta obra azulada que se inspira en un típico paisaje italiano. La inspiración puede que haya brotado de otras obras de artistas que fueron contemporáneos ya que Frederik nunca salió de su país.</p>
                    </div>
                    <Image src={the_classics_proceso_1} alt="Buen Diseño Mercedes Costal" className="lg:mt-24 w-full object-contain"/>
                    <div className="mt-12 lg:mt-72 flex flex-col gap-4">
                        <Image src={the_classics_proceso_2} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg underline">Mural The Emperor&apos;s Journey.</p>
                    </div>
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_4.mp4"} className="mt-24 lg:mt-48"/>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 max-w-7xl flex flex-col gap-4">
                <Image src={the_classics_proceso_4} alt="Buen Diseño Mercedes Costal" className="w-full aspect-[2] object-cover"/>
                <p className="text-lg">Los tonos cálidos y terrosos de Prince Of Udaipur, recrean la mística de las antiguas tradiciones indias. Entre escenas de batallas y procesiones se reviven relatos históricos con texturas visuales añejadas, una opción ideal para espacios que buscan transmitir tranquilidad visual y elegancia.</p>
            </div>
            <div className="mt-24 max-w-3xl flex flex-col items-center">
                <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_5.mp4"} className="w-full max-w-48" buttonClassName="bottom-4 left-0 w-full justify-center"/>
                <Image src={the_classics_proceso_5} alt="Buen Diseño Mercedes Costal" className="mt-24 w-full object-contain"/>
                <p className="mt-8 text-lg text-justify">Tapestry: Birds in the Forest. <br />Este mural simula una textura visual de bordado, como su original, un tapiz de Alexander Baert confeccionado en 1700. En detalle se perciben las urdiembres y el tramado particular de esta tipo de trabajos. </p>
            </div>
            <div className="mt-24 max-w-3xl flex flex-col lg:flex-row items-center lg:items-end gap-8">
                <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_6.mp4"} className="w-full lg:w-[45%] shrink-0"/>
                <div>
                    <p className="text-lg text-justify"><b className="underline">#02</b> Hikers in a Park.</p>
                    <p className="mt-[1lh] text-lg text-justify">La espesura del parque retratada en esta obra del paisajista y poeta holandés ahora está disponible para que puedas empapelar tus paredes.</p>
                </div>
            </div>
        </section>
    )
}