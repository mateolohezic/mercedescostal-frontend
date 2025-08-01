import { Metadata } from "next";
import { collections } from '@/data/collections';
import { sortMurales } from "@/helpers";
import { CollectionVideo, MuralCardNew, ProcesoCreativoArtisan, ProcesoCreativoBasaBasa, ProcesoCreativoCasamar, ProcesoCreativoClassics, ProcesoCreativoLandmark, ProcesoCreativoMorris, ProcesoCreativoVivero } from '@/components';

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
            <h1 className="sr-only">Colección {foundCollection.title}</h1>
            <section className="w-full px-4 lg:px-12 flex flex-col justify-center items-center gap-8 lg:gap-4">
                <CollectionVideo title={foundCollection.title} video={foundCollection.video}/>
                {
                    foundCollection.id !== "the-classics" &&
                    <div className="w-full flex flex-col justify-start items-start gap-1">
                        <p><b className="uppercase">Artista:</b> Mercedes Costal prints & patterns.</p>
                        <p><b className="uppercase">Año:</b> {foundCollection.date}.</p>
                        <p><b className="uppercase">Tecnica:</b> {foundCollection.technique}</p>
                        <p><b className="uppercase">Description:</b> {foundCollection.description}</p>
                    </div>
                }
            </section>
            <section className="mt-24 w-full px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-12 lg:gap-y-16">
                { sortMurales(foundCollection.murales).map((mural, index) => (
                    <MuralCardNew mural={mural} index={index} key={mural.id} />
                ))}
            </section>
            {
                foundCollection.id === "the-classics" ? <ProcesoCreativoClassics/> :
                foundCollection.id === "morris" ? <ProcesoCreativoMorris/> :
                foundCollection.id === "basa-basa" ? <ProcesoCreativoBasaBasa/> :
                foundCollection.id === "landmark" ? <ProcesoCreativoLandmark/> :
                foundCollection.id === "vivero" ? <ProcesoCreativoVivero/> :
                foundCollection.id === "artisan" ? <ProcesoCreativoArtisan/> :
                foundCollection.id === "casamar" && <ProcesoCreativoCasamar/>
            }
        </main>
    );
}