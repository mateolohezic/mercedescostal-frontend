import Link from "next/link";
import Image from "next/image";
import { Mural } from "@/interfaces";
import { useSearchMurals } from "@/hooks";

interface Props {
    searchParams: {
        query?: string;
    };
}

export default function SearchResultsPage({ searchParams }: Props) {
    const searchQuery = searchParams?.query?.trim() || "";
    const results:Array<Mural> = useSearchMurals(searchQuery);

    return (
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">
                    {searchQuery.length < 3 ?
                        "No se encontraron resultados."
                    :
                        <div className="w-full flex flex-col gap-1">
                            <span>Resultados para</span>
                            <span className="font-semibold truncate">{searchQuery}</span>
                        </div>
                    }
                </h1>

                {searchQuery.length < 3 ? (
                    <p className="mt-8 text-center text-gray-500">
                        Ingresa al menos 3 caracteres para buscar murales.
                    </p>
                ) : results.length === 0 ? (
                    <p className="mt-8 text-center text-gray-500">
                        No se encontraron murales para {searchQuery}.
                    </p>
                ) : (
                    <div className="mt-8 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {results.map((mural) => (
                            <Link 
                                key={mural.id} 
                                href={`/collections/${mural.href}`} 
                                className="w-full flex flex-col justify-center items-center gap-4"
                            >
                                <div className="w-full grow flex justify-center items-center">
                                    <Image 
                                        src={typeof mural.icons[0] === "string" ? mural.icons[0] : mural.icons[0].src} 
                                        alt={`Mural ${mural.title}`} 
                                        width={1920} 
                                        height={1920} 
                                        className="w-32 aspect-square object-contain"
                                    />
                                </div>
                                <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase text-center">
                                    {mural.title}
                                </h3>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
