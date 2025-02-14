import { Metadata } from "next";
import { collections } from '@/data/collections';
import { MuralCard } from '@/components';
import { Mural } from '@/interfaces';

interface Props {
    params: {
        category: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = params;

    const categoryMurals = collections.flatMap(col => col.murales).filter(mural => mural.keywords.includes(category));

    if (categoryMurals.length === 0) {
        return {
            title: "Categoría no encontrada",
            description: `No se encontraron murales en la categoría ${category}.`,
        };
    }

    return {
        title: `Murales de ${category}`,
        description: `Explora los murales en la categoría de ${category} y encuentra la mejor opción para tu espacio.`,
        openGraph: {
            title: `Murales de ${category}`,
            description: `Explora los murales en la categoría de ${category} y encuentra la mejor opción para tu espacio.`,
            url: `/categories/${category}`,
            siteName: "Murales Gallery",
            locale: "es_ES",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Murales de ${category}`,
            description: `Explora los murales en la categoría de ${category} y encuentra la mejor opción para tu espacio.`,
        },
    };
}

export default function CategoriesPage({ params }: Props) {
    const { category } = params;

    const categoryMurals = collections.flatMap(col => col.murales).filter(mural => mural.keywords.includes(category));

    if (categoryMurals.length === 0) {
        return <div className="text-center text-red-500 my-20 text-xl">No se encontraron murales en esta categoría.</div>;
    }

    return (
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex justify-between">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">
                    Categoría <b className="block font-semibold">{category}</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                </div>
            </section>

            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center gap-24">
                {categoryMurals.map((mural: Mural) => (
                    <MuralCard key={mural.id} mural={mural} showCollection />
                ))}
            </section>
        </main>
    );
}