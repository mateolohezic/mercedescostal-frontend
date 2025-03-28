import Link from "next/link";
// import { useMuralsCategories } from "@/hooks";
import { Card } from "@/components";
import { collections } from "@/data/collections";
import { Metadata } from "next";

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
        <main className="my-24 lg:my-32 w-full grow flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    1. Murales
                </h1>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                    <div className="mt-4 w-full flex justify-end lg:justify-start">
                        <Link href={'/collection'} className="uppercase bg-yellow-300">
                            PDF 2025 Download
                        </Link>
                    </div>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <h2 className="w-full text-center lg:text-start font-gillsans text-xl tracking-[0.5rem] uppercase">Por <b className="font-semibold">colecciones</b></h2>
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