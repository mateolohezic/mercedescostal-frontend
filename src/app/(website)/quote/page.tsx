import { QuoteForm } from "@/components";

interface Props {
    searchParams: {
        mural?: string;
    };
}

export default function SearchResultsPage({ searchParams }: Props) {
    const preselectedMuralId  = searchParams?.mural?.trim() || "";

    return (
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex justify-between">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">
                    Cotiza tu <b className="block font-semibold">mural</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>Ingresa los detalles de tu espacio y selecciona el mural que deseas cotizar.</p>
                    <p>Recibirás una cotización basada en las dimensiones proporcionadas.</p>
                </div>
            </section>
            <QuoteForm preselectedMuralId={preselectedMuralId} />
        </main>
    );
}
