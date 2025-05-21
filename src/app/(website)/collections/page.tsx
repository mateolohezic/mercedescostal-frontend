import Link from "next/link";
// import { useMuralsCategories } from "@/hooks";
import Image from "next/image";
// import { Card } from "@/components";
// import { collections } from "@/data/collections";
import { Metadata } from "next";
import { collections } from "@/data/collections";

export const metadata: Metadata = {
    title: 'Murals',
    description: "Murals Mercedes Costal.",
    keywords: ['diseño', 'Mercedes Costal'],
    openGraph: {
        title: 'Murals | Mercedes Costal',
        description: 'Mercedes Costal.',
        url: 'https://mercedescostal.com.ar/murals',
        siteName: 'Mercedes Costal',
        locale: 'es_AR',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: 'https://mercedescostal.com.ar/murals',
        creator: 'Mercedes Costal',
        title: 'Murals | Mercedes Costal',
        description: 'Mercedes Costal.',
    },
};

export default function CollectionsPage() {

    // const categories = useMuralsCategories();
    // const getCategoryImage = (category: string) => {
    //     for (const collection of collections) {
    //         for (const mural of collection.murales) {
    //             if (mural.keywords.includes(category)) {
    //                 return mural.icons[0];
    //             }
    //         }
    //     }
    //     return null;
    // };

    return (
        <main className="my-24 lg:my-0 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Wallpapers</h1>
            <section className="mt-24 w-full grid grid-cols-1 lg:grid-cols-2">
                { collections.map((collection) => (
                    <Link
                        key={collection.id}
                        href={`/collections/${collection.id}`}
                        className="w-full block aspect-video overflow-hidden relative group"
                    >
                        <Image
                            src={collection.portrait}
                            alt={`Portada de colección ${collection.title}`}
                            className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"
                        />
                        <div className="size-full bg-black/20 absolute top-0 left-0 z-10 transition-150"></div>
                        <div className="size-full flex flex-col justify-center items-center relative z-20">
                            <h3 className="font-gillsans font-light text-white text-3xl uppercase">
                                <span className="text-white/75">Colección</span>{" "}
                                <b className="font-medium">{collection.title}</b>
                            </h3>
                        </div>
                    </Link>
                ))}
            </section>
            {/* <section className="mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <h2 className="w-full text-center lg:text-start font-gillsans text-xl tracking-[0.5rem] uppercase">Por <b className="font-semibold">categorías</b></h2>
                <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {categories.map(category => {
                        const categoryImage = getCategoryImage(category);
                        return <Card href={`/categories/${category}`}  image={categoryImage||""} title={category} key={category} />
                    })}
                </div>
            </section> */}
            <section className="my-24 lg:my-48 w-full max-w-5xl 2xl:max-w-7xl px-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
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