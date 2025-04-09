import { Metadata } from "next";
import { collections } from '@/data/collections';
import { CollectionVideo, MuralCardNew } from '@/components';
// import { Mural } from '@/interfaces';
// import Image from "next/image";
// import foto from "@/assets/collections/basa_basa/basa_basa/basa_basa_mural.webp";

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
            title: `Colección ${foundCollection.title} | Mercedes Costal`,
            description: `Explora la colección ${foundCollection.title} y descubre increíbles murales.`,
            url: `/collection/${collection}`,
            siteName: "Murales Gallery",
            locale: "es_ES",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: `Colección ${foundCollection.title} | Mercedes Costal`,
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
        <main className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <h1 className="w-full max-w-7xl text-center lg:text-start font-gillsans font-light text-3xl uppercase"><span className="text-opacity-75">Colección</span> <b className="font-medium">Basa Basa</b></h1>
            <section className="mt-8 w-full max-w-4xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center gap-8 lg:gap-4">
                <CollectionVideo/>
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <p><b className="uppercase">Artista:</b> The Wither</p>
                    <p><b className="uppercase">Año:</b> Akram</p>
                    <p><b className="uppercase">Tecnica:</b> 2021</p>
                    <p><b className="uppercase">Description:</b> A flower is born, blooms, and fades.</p>
                </div>
            </section>
            <section className="mt-8 w-full max-w-4xl 2xl:max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-4">
                <MuralCardNew/>
                <MuralCardNew/>
                <MuralCardNew/>
                <MuralCardNew/>
                <MuralCardNew/>
            </section>
            {/* <section className="mt-12 lg:mt-24 w-full max-w-4xl 2xl:max-w-5xl px-4 xl:px-0 flex flex-col justify-center items-center gap-24">
                {foundCollection.murales.map((mural: Mural) => (
                    <MuralCard key={mural.id} mural={mural} />
                ))}
            </section> */}
        </main>
    );
}