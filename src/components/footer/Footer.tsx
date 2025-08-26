import Link from "next/link"
// import { FooterForm } from "@/components"
import firma from "@/assets/firma.webp";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full px-4 xl:px-0 flex flex-col justify-center items-center font-truetypewritter uppercase">
            <div className="w-full max-w-5xl 2xl:max-w-7xl h-px bg-black"></div>
            <div className="mt-8 w-full lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-8">
                {/* <FooterForm/> */}
                <div>Mercedes Costal - Todos los derechos reservados</div>
                <div className="flex flex-col items-center lg:items-end gap-4 lg:gap-0">
                    <div className="flex justify-center items-center gap-2">
                        <Link href={'https://www.instagram.com/mercedes.costal/'} target="_blank" className="">Instagram</Link>
                        <span className="text-sm">/</span>
                        <Link href={'https://web.facebook.com/costal.mercedes/?locale=es_LA&_rdc=1&_rdr#'} target="_blank" className="">Facebook</Link>
                        <span className="text-sm">/</span>
                        <Link href="https://wa.me/5491160208460" target="_blank" className="">WhatsApp</Link>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row gap-4 justify-end items-center lg:items-start text-center lg:text-end">
                        <Link href={"mailto:info@mercedescostal.com.ar"}>info@mercedescostal.com.ar</Link>
                        <Link href={"tel:+5491160208460"}>+5491160208460</Link>
                        <span>Tucumán, Argentina</span>
                    </div>
                </div>
            </div>
            <div className="mt-24 lg:mt-4 pb-8 w-full flex justify-center">
                <Image src={firma} alt="Firma" className="w-48 lg:w-full max-w-sm" />
            </div>
            <div className="w-full text-sm px-4 py-2 grid grid-cols-3">
                <div></div>
                
            </div>
        </footer>
    )
}