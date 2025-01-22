import Link from "next/link";
import Image from "next/image";
import basa_basa_icon_1 from "@/assets/collections/basa_basa/basa_basa/basa_basa_icon_1.webp";
import basa_basa_icon_2 from "@/assets/collections/basa_basa/basa_basa/basa_basa_icon_2.webp";
import { Footer } from "@/components";

export default function CollectionPage() {
    return (
    <>
        <main className="my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex justify-between">
                <h1 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">1. Murales</h1>
                <div className="w-full max-w-lg">
                    <p>We create to make ourselves infinite. Our objects are like bees that cross-pollimate the gardens of the galaxy.</p>
                    <p>You will witness the withering of the physicial piece and you will appreciate the responsibility of the beauty of the finite. As long as this digital piece will never stop flourishing, wherever we decide to live.</p>
                    <Link href={'/collection'} className="block mt-4 w-fit uppercase bg-yellow-300">
                        PDF 2025 Download
                    </Link>
                </div>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0">
                <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Por <b className="font-semibold">colecciones</b></h2>
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
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0">
                <h2 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Por <b className="font-semibold">categorías</b></h2>
                <div className="mt-8 w-full grid grid-cols-4 gap-8">
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_1} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Bótanicos</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_2} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Kids</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_1} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Clásicos</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_2} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Patrones</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_1} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Paisajes</h3>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full grow flex justify-center items-center">
                            <Image src={basa_basa_icon_2} alt="Colección Basa Basa" className="w-32 aspect-square object-contain"/>
                        </div>
                        <h3 className="w-fit font-gillsans text-xl tracking-[0.5rem] uppercase">Texturas</h3>
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