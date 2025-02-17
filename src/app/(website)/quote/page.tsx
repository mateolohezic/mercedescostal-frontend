import { QuoteForm } from "@/components";

interface Props {
    searchParams: {
        mural?: string;
    };
}

export default function SearchResultsPage({ searchParams }: Props) {
    const preselectedMuralId  = searchParams?.mural?.trim() || "";

    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Cotiza tu <b className="block font-semibold">mural</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                </div>
            </section>
            <QuoteForm preselectedMuralId={preselectedMuralId} />
        </main>
    );
}
