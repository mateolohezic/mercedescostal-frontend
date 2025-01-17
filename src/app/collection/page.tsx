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
import { Footer } from "@/components";

export default function CollectionPage() {
    return (
    <>
        <main className="my-40 w-full flex flex-col items-center font-typemachine">
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
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Basa Basa</b></h2>
                    <div className="w-full">
                        <Image src={basa_basa_montaje} alt="Basa Basa Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={basa_basa_mural} alt="Basa Basa Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Miombo</b></h2>
                    <div className="w-full">
                        <Image src={miombo_montaje} alt="Miombo Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={miombo_mural} alt="Miombo Mural" className="w-full h-72 object-cover"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Ñus</b></h2>
                    <div className="w-full">
                        <Image src={ñus_montaje} alt="Ñus Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={ñus_mural} alt="Ñus Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Woodlands 01</b></h2>
                    <div className="w-full">
                        <Image src={woodland_01_montaje} alt="Woodlands 01 Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={woodland_01_mural} alt="Woodlands 01 Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Woodlands 02</b></h2>
                    <div className="w-full">
                        <Image src={woodland_02_montaje} alt="Woodlands 02 Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={woodland_02_mural} alt="Woodlands 02 Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Woodlands 03</b></h2>
                    <div className="w-full">
                        <Image src={woodland_03_montaje} alt="Woodlands 03 Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={woodland_03_mural} alt="Woodlands 03 Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Woodlands 04</b></h2>
                    <div className="w-full">
                        <Image src={woodland_04_montaje} alt="Woodlands 04 Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={woodland_04_mural} alt="Woodlands 04 Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Mural <b className="font-semibold">Woodlands 05</b></h2>
                    <div className="w-full">
                        <Image src={woodland_05_montaje} alt="Woodlands 05 Montaje" className="w-full object-contain"/>
                    </div>
                    <div className="w-full">
                        <Image src={woodland_05_mural} alt="Woodlands 05 Mural" className="h-72 w-auto object-contain"/>
                    </div>
                </div>
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