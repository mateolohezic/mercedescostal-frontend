import Image from "next/image";
import portada from "@/assets/mc-universe/fragrances/portada.webp";
import fragances_1 from "@/assets/mc-universe/fragrances/fragances_1.webp";
import fragances_2 from "@/assets/mc-universe/fragrances/fragances_2.webp";
import fragances_3 from "@/assets/mc-universe/fragrances/fragances_3.webp";
import fragances_4 from "@/assets/mc-universe/fragrances/fragances_4.webp";
import fragances_5 from "@/assets/mc-universe/fragrances/fragances_5.webp";
import fragances_6 from "@/assets/mc-universe/fragrances/fragances_6.webp";
import fragances_7 from "@/assets/mc-universe/fragrances/fragances_7.webp";
import fragances_8 from "@/assets/mc-universe/fragrances/fragances_8.webp";
import fragances_9 from "@/assets/mc-universe/fragrances/fragances_9.webp";
import fragances_10 from "@/assets/mc-universe/fragrances/fragances_10.webp";
import fragances_11 from "@/assets/mc-universe/fragrances/fragances_11.webp";
import fragances_12 from "@/assets/mc-universe/fragrances/fragances_12.webp";
import fragances_13 from "@/assets/mc-universe/fragrances/fragances_13.webp";
import fragances_14 from "@/assets/mc-universe/fragrances/fragances_14.webp";
import Link from "next/link";

export default function FragrancesPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    MC Universe
                </h1>
                <Image src={portada} alt="Portada Buen Diseño Mercedes Costal" className="w-full object-contain"/>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">Fragrancias</b>
                </h1>
                <div className="w-full max-w-lg">
                    <p>De la necesidad de resignificar nuestro universo inspiracional surge nuestra línea de fragancias inspirdas en lo más noble de la naturaleza.</p>
                    <p className="mt-8">Siete estilos diferentes que buscan despertar los sentidos y envolvernos en un único vínculo con los manjares de la tierra y sus esencias.</p>
                    <p className="mt-8">
                        <Link href="/collections/casamar" className='border-b border-b-black hover:opacity-75 transition-150'>Pedílas aquí</Link>
                    </p>
                </div>
            </section>
            <section className="mt-8 lg:mt-12 w-full max-w-4xl px-4 md:px-0">
                <div className="w-full grid grid-cols-2 gap-4">
                    <Image src={fragances_1} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_2} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_3} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_4} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_5} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_6} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_7} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_8} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_9} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_10} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_11} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_12} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_13} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                    <Image src={fragances_14} alt="Fragrances Mercedes Costal" className="size-full object-contain"/>
                </div>
                <p className="mt-8 text-center">
                    <Link href="/collections/casamar" className='border-b border-b-black hover:opacity-75 transition-150'>Incorporalas a tu tienda.</Link>
                </p>
            </section>
        </main>
    );
}