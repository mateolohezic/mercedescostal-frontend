import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { getCollaborations } from "@/data/collections";
import { CollectionVideo } from "@/components";

export const metadata: Metadata = {
    title: 'Colaboraciones',
    description: "Colaboraciones Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal', 'colaboraciones'],
    openGraph: {
        title: 'Colaboraciones | Mercedes Costal',
        description: 'Colaboraciones exclusivas de Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/collections/collaborations',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/collections/collaborations',
        creator: 'Mercedes Costal',
        title: 'Colaboraciones | Mercedes Costal',
        description: 'Colaboraciones exclusivas de Mercedes Costal.',
    },
};

export default function CollaborationsPage() {
    const collaborations = getCollaborations();

    return (
        <main className="my-12 lg:my-0 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Colaboraciones</h1>
            <section className="lg:mt-24 w-full grid grid-cols-2 lg:grid-cols-2">
                {collaborations.map((collab, index) => (
                    <Link key={collab.id} href={`/collections/collaborations/${collab.id}`} className="w-full block aspect-video overflow-hidden relative group">
                        {collab.video ? 
                            <div className="absolute top-0 left-0 z-0 size-full">
                                <CollectionVideo title={collab.title} video={collab.video} />
                            </div>
                        :
                            <Image priority={index < 3} src={collab.portrait} alt={`Portada de colaboración ${collab.title}`} className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                        }
                        <div className="size-full bg-black/20 group-hover:bg-black/30 absolute top-0 left-0 z-10 transition-all duration-300" />
                        <div className="size-full flex flex-col justify-center items-center relative z-20">
                            <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                                <span className="text-white/75">Colaboración</span>{" "}
                                <b className="font-medium block lg:inline">{collab.title}</b>
                            </h3>
                        </div>
                    </Link>
                ))}
            </section>
            <section className="mt-12 lg:my-48 w-full max-w-5xl 2xl:max-w-7xl px-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <div className="w-full lg:text-lg text-start flex flex-col gap-[1lh]">
                    <p>Colaboraciones que trascienden el diseño.</p>
                    <p>En Mercedes Costal, cada colaboración es un encuentro de universos creativos. Trabajamos con marcas y espacios que comparten nuestra visión: transformar lo cotidiano en experiencias visuales memorables.</p>
                    <p>Desde murales monumentales hasta intervenciones efímeras, cada proyecto colaborativo nace del diálogo entre disciplinas, materiales y sensibilidades distintas.</p>
                </div>
            </section>
        </main>
    );
}