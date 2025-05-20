import { Metadata } from "next";
import { collections } from '@/data/collections';
import { sortMurales } from "@/helpers";
import { CollectionVideo, MuralCardNew } from '@/components';
import Image from "next/image";
import { BuenDiseñoVideo } from "@/components";
import buen_diseño_1 from "@/assets/highlights/good-design/buen_diseño_1.webp";
import buen_diseño_2 from "@/assets/highlights/good-design/buen_diseño_2.webp";
import buen_diseño_3 from "@/assets/highlights/good-design/buen_diseño_3.webp";

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
                <div className="w-full flex flex-col justify-start items-start gap-1">
                    <p><b className="uppercase">Artista:</b> Mercedes Costal prints & patterns.</p>
                    <p><b className="uppercase">Año:</b> {foundCollection.date}.</p>
                    <p><b className="uppercase">Tecnica:</b> {foundCollection.technique}</p>
                    <p><b className="uppercase">Description:</b> {foundCollection.description}</p>
                </div>
            </section>
            <section className="mt-24 w-full px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-12 lg:gap-y-16">
                { sortMurales(foundCollection.murales).map((mural, index) => (
                    <MuralCardNew mural={mural} index={index} key={mural.id} />
                ))}
            </section>
            {/* <section className="mt-12 lg:mt-24 w-full max-w-4xl 2xl:max-w-5xl px-4 xl:px-0 flex flex-col justify-center items-center gap-24">
                {foundCollection.murales.map((mural: Mural) => (
                    <MuralCard key={mural.id} mural={mural} />
                ))}
            </section> */}
            <section className="mt-24 lg:mt-48 w-full px-12 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h2 className="w-full text-start font-gillsans font-light text-3xl uppercase">
                    <span className="text-black/75">Proceso Creativo</span>{" "}
                    <b className="font-medium">Vivero</b>
                </h2>
                <div className="w-full max-w-2xl lg:text-xl">
                    <p>El Sello de Buen Diseño argentino (SBD) es una distinción que otorga el Estado a los productos de la industria nacional que se destacan por su innovación, participación en la producción local sustentable, posicionamiento en el mercado y calidad de diseño.</p>
                    <p className="mt-4">La evaluación está a cargo de un comité conformado por representantes de entidades públicas y privadas relacionadas con el diseño y los diversos sectores productivos.</p>
                    <p className="mt-8">Mercedes Costal recibió su primer distinción en Mayo del 2021.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0">
                <Image src={buen_diseño_1} alt="Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-12 lg:mt-48 w-full max-w-2xl flex flex-col justify-center items-center px-4 xl:px-0">
                <BuenDiseñoVideo/>
                <p className="w-full text-start p-2">Animación del Mural El Edén, 2021.</p>
            </section>
            <section className="mt-24 lg:mt-48 w-full max-w-md flex flex-col justify-center items-center gap-4 lg:gap-8 px-4 xl:px-0">
                <Image src={buen_diseño_2} alt="Buen Diseño Mercedes Costal" className="w-full h-auto object-contain"/>
                <Image src={buen_diseño_3} alt="Buen Diseño Mercedes Costal" className="w-full h-auto object-contain"/>
            </section>
            <div className="sr-only">
                <div className="bg-st-201645"/>
                <div className="bg-st-201810"/>
                <div className="bg-st-201820"/>
                <div className="bg-st-201915"/>
                <div className="bg-st-green"/>
                <div className="bg-st-tanger"/>
                <div className="bg-st-black"/>
                <div className="bg-st-white"/>
            </div>
        </main>
    );
}