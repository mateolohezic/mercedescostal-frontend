import Image from "next/image";
import portada from "@/assets/highlights/manantiales-popup/portada.webp";
import manantiales_1 from "@/assets/highlights/manantiales-popup/manantiales_1.webp";
import manantiales_2 from "@/assets/highlights/manantiales-popup/manantiales_2.webp";
import manantiales_3 from "@/assets/highlights/manantiales-popup/manantiales_3.webp";
import manantiales_4 from "@/assets/highlights/manantiales-popup/manantiales_4.webp";
import Link from "next/link";

export default function ManantialesPopupPage() {
    return (
        <main className="my-24 lg:my-40 w-full flex flex-col items-center font-truetypewritter">
            <section className="w-full max-w-7xl px-4 xl:px-0 flex flex-col gap-8">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    Highlights
                </h1>
                <Image src={portada} alt="Portada Feria Hábitat de Valencia Mercedes Costal" className="w-full h-96 object-cover object-[50%_85%]"/>
            </section>
            <section className="mt-24 w-full max-w-7xl px-4 xl:px-0 flex flex-col lg:flex-row justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-4">
                <h1 className="w-fit font-gillsans text-xl text-center lg:text-start tracking-[0.5rem] uppercase">
                    <b className="font-semibold block">Manantiales</b><span className="block"> Pop</span> Up
                </h1>
                <div className="w-full max-w-lg">
                    <p>Durante el verano 2019 y 2020 nuestro equipo se mudó a Uruguay, a un pequeño pueblo etéreo y lleno de magia, justo donde el mar se encuentra con los pastizales y el blanco se funde con el cielo: Manantiales.</p>
                    <p className="mt-8">Allí abrimos nuestra primera tienda PopUp, al son del viento y el agua salada adonde también presentamos nuestra colección de murales y empapelados &ldquo;Casamar&rdquo;.</p>
                    <p className="mt-8">Con un Azul Navegante como rector, inspirado en el fondo del mar y los viajes que uno emprende cuando se acerca a esta inmensidad.</p>
                    <p className="mt-8">Esta colección representa una ínfima proción de la vida marina con sus formas y texturas que tanto nos maravillan.</p>
                </div>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl flex justify-start px-4 md:px-0">
                <Image src={manantiales_1} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full max-w-lg h-auto object-contain"/>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl flex flex-col items-end gap-8 px-4 md:px-0">
                <Image src={manantiales_2} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full max-w-xl h-auto object-contain"/>
                <p className="w-full max-w-xl text-start text-lg">Manantiales, Uruguay, verano 2020.</p>
            </section>
            <section className="mt-12 lg:mt-24 w-full max-w-7xl flex justify-center px-4 md:px-0">
                <Image src={manantiales_3} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-full h-auto object-contain"/>
            </section>
            <section className="mt-6 lg:mt-12 w-full max-w-7xl flex flex-col justify-end items-end gap-8 px-4 md:px-0">
                <Image src={manantiales_4} alt="Feria Hábitat de Valencia Mercedes Costal" className="w-5/6 h-auto object-contain"/>
                <Link href="/collections/casamar" className='text-xl uppercase border-b border-b-black hover:opacity-75 transition-150'>Conocé la Colección Casamar completa*</Link>
            </section>
        </main>
    );
}