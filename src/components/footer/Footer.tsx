import Link from "next/link"
// import { FooterForm } from "@/components"
import firma from "@/assets/firma.webp";
import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="w-full px-4 xl:px-0 pb-24 flex flex-col justify-center items-center font-truetypewritter uppercase">
            <div className="w-full max-w-5xl 2xl:max-w-7xl h-px bg-black"></div>
            <div className="mt-8 w-full lg:px-8 flex flex-col lg:flex-row justify-end items-center">
                {/* <FooterForm/> */}
                <div className="mt-8 lg:mt-0 flex justify-center items-center gap-2">
                    <Link href={'/'} target="_blank" className="">Instagram</Link>
                    {/* <span className="text-sm">/</span>
                    <Link href={'/'} target="_blank" className="">Twitter</Link> */}
                </div>
            </div>
            <div className="mt-24 lg:mt-4 w-full flex justify-center">
                <Image src={firma} alt="Firma" className="w-48 lg:w-full max-w-sm" />
            </div>
        </footer>
    )
}