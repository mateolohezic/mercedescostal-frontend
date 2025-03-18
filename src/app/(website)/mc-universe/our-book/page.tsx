import Image from "next/image";
import portada from "@/assets/mc-universe/book/portada.webp";
import book_1 from "@/assets/mc-universe/book/book_1.webp";
import book_2 from "@/assets/mc-universe/book/book_2.webp";
import book_3 from "@/assets/mc-universe/book/book_3.webp";
import book_4 from "@/assets/mc-universe/book/book_4.webp";
import book_5 from "@/assets/mc-universe/book/book_5.webp";
import book_6 from "@/assets/mc-universe/book/book_6.webp";
import { BookVideo } from "@/components";

export default function OurBookPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    MC Universe
                </h1>
                <Image src={portada} alt="Portada Buen Diseño Mercedes Costal" className="w-full h-96 object-cover"/>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Our <b className="font-semibold">Book</b>
                </h1>
                <div className="w-full max-w-2xl">
                    <p>Retrato de un atelier</p>
                    <p className="mt-8">Produced by <span className="block">Mercedes Costal Studio</span></p>
                    <p className="mt-8">Argentina, septiembre 2022</p>
                    <p className="mt-8">Printed in Argentina</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-lg px-4 xl:px-0">
                <BookVideo/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0">
                <Image src={book_1} alt="Meet the Makers Mercedes Costal" className="w-full max-w-lg object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 flex justify-end">
                <Image src={book_2} alt="Meet the Makers Mercedes Costal" className="w-full max-w-xl object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0 grid grid-cols-2 gap-4">
                <Image src={book_3} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
                <Image src={book_4} alt="Meet the Makers Mercedes Costal" className="w-full object-contain"/>
                <Image src={book_5} alt="Meet the Makers Mercedes Costal" className="w-full object-contain col-span-2"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl px-4 xl:px-0">
                <Image src={book_6} alt="Meet the Makers Mercedes Costal" className="w-full max-w-md object-contain"/>
            </section>
        </main>
    );
}