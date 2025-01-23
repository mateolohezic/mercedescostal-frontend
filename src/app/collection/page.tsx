import Link from "next/link";
import Image from "next/image";
import basa_basa_mural from "@/assets/collections/basa_basa/basa_basa/basa_basa_mural.webp";
import basa_basa_montaje from "@/assets/collections/basa_basa/basa_basa/basa_basa_montaje.webp";
import basa_basa_icon_1 from "@/assets/collections/basa_basa/basa_basa/basa_basa_icon_1.webp";
import basa_basa_icon_2 from "@/assets/collections/basa_basa/basa_basa/basa_basa_icon_2.webp";
import miombo_mural from "@/assets/collections/basa_basa/miombo/miombo_mural.webp";
import miombo_montaje from "@/assets/collections/basa_basa/miombo/miombo_montaje.webp";
import ñus_mural from "@/assets/collections/basa_basa/ñus/ñus_mural.webp";
import ñus_montaje from "@/assets/collections/basa_basa/ñus/ñus_montaje.webp";
import woodland_01_mural from "@/assets/collections/basa_basa/woodland_01/woodland_01_mural.webp";
import woodland_01_montaje from "@/assets/collections/basa_basa/woodland_01/woodland_01_montaje.webp";
import woodland_02_mural from "@/assets/collections/basa_basa/woodland_02/woodland_02_mural.webp";
import woodland_02_montaje from "@/assets/collections/basa_basa/woodland_02/woodland_02_montaje.webp";
import woodland_03_mural from "@/assets/collections/basa_basa/woodland_03/woodland_03_mural.webp";
import woodland_03_montaje from "@/assets/collections/basa_basa/woodland_03/woodland_03_montaje.webp";
import woodland_04_mural from "@/assets/collections/basa_basa/woodland_04/woodland_04_mural.webp";
import woodland_04_montaje from "@/assets/collections/basa_basa/woodland_04/woodland_04_montaje.webp";
import woodland_05_mural from "@/assets/collections/basa_basa/woodland_05/woodland_05_mural.webp";
import woodland_05_montaje from "@/assets/collections/basa_basa/woodland_05/woodland_05_montaje.webp";
import { Footer, MuralCard } from "@/components";

export default function CollectionPage() {

    const murales = [
        {
            title: 'Basa Basa',
            montaje: basa_basa_montaje,
            mural: basa_basa_mural,
        },
        {
            title: 'Miombo',
            montaje: miombo_montaje,
            mural: miombo_mural,
            wide: true,
        },
        {
            title: 'Ñus',
            montaje: ñus_montaje,
            mural: ñus_mural,
        },
        {
            title: 'Woodlands 01',
            montaje: woodland_01_montaje,
            mural: woodland_01_mural,
        },
        {
            title: 'Woodlands 02',
            montaje: woodland_02_montaje,
            mural: woodland_02_mural,
        },
        {
            title: 'Woodlands 03',
            montaje: woodland_03_montaje,
            mural: woodland_03_mural,
        },
        {
            title: 'Woodlands 04',
            montaje: woodland_04_montaje,
            mural: woodland_04_mural,
        },
        {
            title: 'Woodlands 05',
            montaje: woodland_05_montaje,
            mural: woodland_05_mural,
        },
    ]

    return (
    <>
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex justify-between">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Colección <b className="block font-semibold">Basa Basa</b></h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollimate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physicial piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                    <Link href={'/collection'} className="block mt-4 w-fit uppercase bg-yellow-300">
                        PDF 2025 Download
                    </Link>
                </div>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center gap-24">
                {murales.map( (mural, i:number) => <MuralCard {...mural} key={i}/> )}
            </section>
            <section className="mt-24 w-full max-w-7xl">
                <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase"><b className="font-semibold">Otras colecciones</b></h2>
                <div className="mt-8 w-full grid grid-cols-4 gap-8">
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_1} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Basa Basa</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_2} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Basa Basa</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_1} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Basa Basa</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_2} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Basa Basa</h3>
                    </div>
                </div>
            </section>
        </main>
        <Footer/>
    </>
    );
}