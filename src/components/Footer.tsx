import Link from "next/link"
import { MCLogo } from "@/components"

export const Footer = () => {
    return (
        <footer className="w-full pb-24 flex flex-col justify-center items-center font-typemachine uppercase">
            <div className="w-full max-w-7xl h-px bg-black"></div>
            <div className="mt-8 w-full px-8 flex justify-between items-center">
                <div className="w-full max-w-2xl flex justify-between">
                    <div className="w-fit flex gap-4">
                        <p>Suscribe to our newsletter:</p>
                        <p className="font-semibold">ENTER YOUR EMAIL</p>
                    </div>
                    <p>[ SUBMIT ]</p>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <Link href={'/'} target="_blank" className="">Instagram</Link>
                    <span className="text-sm">/</span>
                    <Link href={'/'} target="_blank" className="">Twitter</Link>
                </div>
            </div>
            <div className="mt-4 w-full flex justify-center">
                <MCLogo className="w-44 fill-black"/>
            </div>
        </footer>
    )
}
