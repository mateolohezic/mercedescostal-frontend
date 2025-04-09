import Link from "next/link";
// import { useMuralsCategories } from "@/hooks";
import Image from "next/image";
import { Card } from "@/components";
import { collections } from "@/data/collections";
import { Metadata } from "next";
import imagen from "@/assets/collections/basa_basa/basa_basa/basa_basa_montaje.webp";
import imagen2 from "@/assets/collections/the_classics/italian_landscape/italian_landscape_montaje.webp";
import coleccion_landmark from "@/assets/collections/landmark/bosque_de_los_magos/bosque_de_los_magos_montaje.webp";
import coleccion_casamar from "@/assets/collections/casamar/casamar/casamar_montaje.webp";
import coleccion_vivero from "@/assets/collections/vivero/reina_ana/reina_ana_montaje_2.webp";
import coleccion_morris from "@/assets/collections/morris/willow/willow_montaje.webp";

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
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="sr-only">Wallpapers</h1>
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                {/* <h1 className="w-full max-w-7xl font-gillsans font-light text-2xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Wallpapers
                </h1> */}
                <div className="w-full lg:text-xl text-center">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                </div>
            </section>
            {/* <h2 className="mt-24 w-full max-w-7xl font-gillsans font-light text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                <b className="font-medium">01.</b> Murales
            </h2> */}
            <section className="mt-24 w-full flex flex-col">
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={imagen} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase"><span className="text-white/75">Colección</span> <b className="font-medium">Basa Basa</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={imagen2} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">The Classics</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={coleccion_landmark} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">Landmark</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={coleccion_casamar} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">Casamar</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={coleccion_vivero} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">Vivero</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={coleccion_morris} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">Morriss</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={imagen2} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">The Classics</b></h3>
                    </div>
                </Link>
                <Link href={"/collections/basa-basa"} className="w-full block aspect-video overflow-hidden relative group">
                    <Image src={imagen2} alt="Mural" className="size-full object-cover group-hover:scale-[1.025] absolute top-0 left-0 z-0 transition-all duration-300"/>
                    <div className="size-full bg-black/20  absolute top-0 left-0 z-10 transition-150"></div>
                    <div className="size-full flex flex-col justify-center items-center relative z-20">
                        <h3 className="font-gillsans font-light text-white text-3xl uppercase">Colección <b className="font-medium">Otros Murales</b></h3>
                    </div>
                </Link>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <h2 className="w-full text-center lg:text-start font-gillsans text-xl tracking-[0.5rem] uppercase">Colecciones</h2>
                <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {collections.map((collection) => <Card href={`/collections/${collection.id}`} image={collection.murales[0].icons[0]} title={collection.title} key={collection.id} /> )}
                </div>
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
        </main>
    );
}