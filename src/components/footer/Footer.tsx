import Link from "next/link"
import { FooterForm, MCLogo } from "@/components"

export const Footer = () => {
    return (
        <footer className="w-full px-4 xl:px-0 pb-24 flex flex-col justify-center items-center font-truetypewritter uppercase">
            <div className="w-full max-w-5xl 2xl:max-w-7xl h-px bg-black"></div>
            <div className="mt-8 w-full lg:px-8 flex flex-col lg:flex-row justify-between items-center">
                <FooterForm/>
                <div className="mt-8 lg:mt-0 flex justify-center items-center gap-2">
                    <Link href={'/'} target="_blank" className="">Instagram</Link>
                    <span className="text-sm">/</span>
                    <Link href={'/'} target="_blank" className="">Twitter</Link>
                </div>
            </div>
            <div className="mt-24 lg:mt-4 w-full flex justify-center">
                <MCLogo className="w-44 fill-black"/>
            </div>
        </footer>
    )
}
