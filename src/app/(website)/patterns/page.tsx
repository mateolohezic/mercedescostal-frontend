import { Metadata } from "next";
import { collections } from "@/data/collections";
import { MuralCard } from "@/components";
import { Mural } from "@/interfaces";
import Link from "next/link";

const PATTERN_KEYWORDS = ["pattern", "patron", "patrón"];

export async function generateMetadata(): Promise<Metadata> {
    const patternMurals = collections.flatMap(col => col.murales)
        .filter(mural => mural.keywords.some(keyword => PATTERN_KEYWORDS.includes(keyword)));

    if (patternMurals.length === 0) {
        return {
            title: "No hay murales de patrón",
            description: "No se encontraron murales en la categoría de patrón.",
        };
    }

    return {
        title: "Murales de patrón",
        description: "Explora los murales en la categoría de patrón y encuentra la mejor opción para tu espacio.",
        openGraph: {
            title: "Murales de patrón",
            description: "Explora los murales en la categoría de patrón y encuentra la mejor opción para tu espacio.",
            url: "/categories/pattern",
            siteName: "Murales Gallery",
            locale: "es_ES",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Murales de patrón",
            description: "Explora los murales en la categoría de patrón y encuentra la mejor opción para tu espacio.",
        },
    };
}

export default function PatternMuralsPage() {
    const patternMurals = collections.flatMap(col => col.murales)
        .filter(mural => mural.keywords.some(keyword => PATTERN_KEYWORDS.includes(keyword)));

    if (patternMurals.length === 0) {
        return <div className="text-center text-red-500 my-20 text-xl">No se encontraron murales en esta categoría.</div>;
    }

    return (
        <main className="my-24 lg:my-32 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    2. Patrones
                </h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                    <div className="mt-4 w-full flex justify-end lg:justify-start">
                        <Link href={'/collection'} className="uppercase bg-yellow-300">
                            PDF 2025 Download
                        </Link>
                    </div>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-5xl 2xl:max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center gap-12 lg:gap-24">
                {patternMurals.map((mural: Mural) => (
                    <MuralCard key={mural.id} mural={mural} showCollection />
                ))}
            </section>
        </main>
    );
}