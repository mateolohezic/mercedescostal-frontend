import { Metadata } from "next";
import { collections } from '@/data/collections';
import { MuralCard } from '@/components';
import { Mural } from '@/interfaces';

interface Props {
    params: {
        collection: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { collection } = params;
    const foundCollection = collections.find(col => col.id === collection);

    if (!foundCollection) {
        return {
            title: "Colección no encontrada",
            description: "La colección solicitada no existe en nuestra base de datos.",
        };
    }

    return {
        title: `Colección ${foundCollection.title}`,
        description: `Explora la colección ${foundCollection.title} y descubre increíbles murales.`,
        openGraph: {
            title: `Colección ${foundCollection.title}`,
            description: `Explora la colección ${foundCollection.title} y descubre increíbles murales.`,
            url: `/collection/${collection}`,
            siteName: "Murales Gallery",
            locale: "es_ES",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Colección ${foundCollection.title}`,
            description: `Explora la colección ${foundCollection.title} y descubre increíbles murales.`,
        },
    };
}

export default function CollectionPage({ params }: Props) {
    const { collection } = params;

    const foundCollection = collections.find(col => col.id === collection);
    
    if (!foundCollection) {
        return <div className="text-center text-red-500">Colección no encontrada</div>;
    }

    return (
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex justify-between">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">
                    Colección <b className="block font-semibold">{foundCollection.title}</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                </div>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center gap-24">
                {foundCollection.murales.map((mural: Mural) => (
                    <MuralCard key={mural.id} mural={mural} />
                ))}
            </section>
        </main>
    );
}