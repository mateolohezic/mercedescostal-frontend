import Image from "next/image";
import Link from "next/link";
import { PortadaProduct } from "@/components";
import logo from '@/assets/logo.png'
import foto1 from '@/assets/coleccion_basa_basa_1.webp'


export default function ProductPage() {
    return (
        <main className="grow w-full flex flex-col justify-start items-center bg-background">
            <Link href={'/'} aria-label="Inicio" className="fixed top-8 left-8 z-50">
                <Image src={logo} alt='Logo Mercedes Costal' className="w-96 relative hover:translate-x-4 transition-all duration-200 ease-in-out"/>
            </Link>
            <PortadaProduct/>
            <h1 className="text-5xl font-light text-center">Colección  Basa Basa</h1>
            <p className="text-xl font-light text-center">Papel mural</p>
            <section className="mt-8 w-full max-w-7xl flex justify-center items-start">
                <div className="w-1/2 pr-12">
                    <div className="w-full aspect-[3/4] relative rounded overflow-hidden shadow-lg shadow-neutral-400">
                        <Image src={foto1} alt='Colección Basa Basa' className="absolute top-0 left-0"/>
                    </div>
                </div>
                <div className="w-1/2">
                    <p className="indent-4 text-lg ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate facere hic iure. Quia, vero nemo natus labore exercitationem doloribus quaerat quas. Consequatur aperiam aliquid tenetur illum, dolorum pariatur necessitatibus cum.</p>
                </div>
                </section>
            <div className='min-h-svh'></div>
        </main>
    );
}