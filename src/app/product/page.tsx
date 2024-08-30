import Image from "next/image";
import Link from "next/link";
import logo from '@/assets/logo.png'
import { PortadaProduct } from "@/components";

export default function ProductPage() {
    return (
        <main className="grow w-full flex flex-col justify-start items-center bg-background">
            <h1 className="sr-only">Producto Mercedes Costal</h1>
            <Link href={'/'} aria-label="Inicio" className="absolute top-8 left-8 z-50">
                <Image src={logo} alt='Logo Mercedes Costal' className="w-96 relative hover:translate-x-4 transition-all duration-200 ease-in-out"/>
            </Link>
            <PortadaProduct/>
        </main>
    );
}