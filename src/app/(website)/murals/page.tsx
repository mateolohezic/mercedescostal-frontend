import Link from "next/link";
import { useMuralsCategories } from "@/hooks";
import { Card } from "@/components";
import { collections } from "@/data/collections";

export default function CollectionsPage() {

    const categories = useMuralsCategories();
    const getCategoryImage = (category: string) => {
        for (const collection of collections) {
            for (const mural of collection.murales) {
                if (mural.keywords.includes(category)) {
                    return mural.icons[0];
                }
            }
        }
        return null;
    };

    return (
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex justify-between">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">1. Murales</h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollinate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physical piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                    <Link href={'/collection'} className="block mt-4 w-fit uppercase bg-yellow-300">
                        PDF 2025 Download
                    </Link>
                </div>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0">
                <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Por <b className="font-semibold">colecciones</b></h2>
                <div className="mt-8 w-full grid grid-cols-4 gap-8">
                    {collections.map((collection) => <Card href={`/collections/${collection.id}`} image={collection.murales[0].icons[0]} title={collection.title} key={collection.id} /> )}
                </div>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0">
                <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Por <b className="font-semibold">categorías</b></h2>
                <div className="mt-8 w-full grid grid-cols-4 gap-8">
                    {categories.map(category => {
                        const categoryImage = getCategoryImage(category);
                        return <Card href={`/categories/${category}`}  image={categoryImage||""} title={category} key={category} />
                    })}
                </div>
            </section>
        </main>
    );
}