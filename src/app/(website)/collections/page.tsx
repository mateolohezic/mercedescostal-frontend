import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { collections } from "@/data/collections";
import { CollectionVideo } from "@/components";

export const metadata: Metadata = {
    title: 'Murals',
    description: "Murals Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Murals | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/collections',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/collections',
        creator: 'Mercedes Costal',
        title: 'Murals | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function CollectionsPage() {
    return (
        <main className="my-12 lg:my-0 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Wallpapers</h1>
            <section className="lg:mt-24 w-full grid grid-cols-2 lg:grid-cols-2">
                <Link
                    key={collections[0].id}
                    href={`/collections/${collections[0].id}`}
                    className="w-full block aspect-video overflow-hidden relative group first:col-span-2"
                >
                    <div className="absolute top-0 left-0 z-0">
                        <CollectionVideo title={collections[0].title} video={collections[0].video||""}/>
                    </div>
                </Link>
                { collections.map((collection) => (
                    <Link
                        key={collection.id}
                        href={`/collections/${collection.id}`}
                        className="w-full block aspect-video overflow-hidden relative group first:col-span-2"
                    >
                        <Image
                            priority
                            src={collection.portrait}
                            alt={`Portada de colección ${collection.title}`}
                            className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"
                        />
                        <div className="size-full bg-black/20 absolute top-0 left-0 z-10 transition-150"></div>
                        <div className="size-full flex flex-col justify-center items-center relative z-20">
                            <h3 className="font-gillsans font-light text-white text-center text-sm lg:text-3xl uppercase">
                                <span className="text-white/75">Colección</span>{" "}
                                <b className="font-medium block lg:inline">{collection.title}</b>
                            </h3>
                        </div>
                    </Link>
                ))}
            </section>
            <section className="mt-12 lg:my-48 w-full max-w-5xl 2xl:max-w-7xl px-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <div className="w-full lg:text-lg text-start flex flex-col gap-[1lh]">
                    <p>No diseñamos papeles. Creamos atmósferas.</p>
                    <p>En Mercedes Costal, entendemos el muro como un lienzo silencioso que transforma la manera en que habitamos un espacio. Nuestros wallpapers son el resultado de un proceso que une diseño contemporáneo, sensibilidad artística y una profunda investigación en color, textura y escala.</p>
                    <p>Cada pieza nace de una idea: invitar a la contemplación. Trabajamos con materiales de alta calidad y tintas libres de solventes, garantizando durabilidad, respeto por el entorno y una experiencia visual envolvente. Las colecciones están pensadas para dialogar con la arquitectura, para acompañar sin invadir, para convertir lo cotidiano en algo sutilmente extraordinario.</p>
                    <p>No seguimos tendencias. Creamos lenguaje. Porque creemos que el diseño no es decoración, sino una forma de pensamiento.</p>
                </div>
            </section>
        </main>
    );
}