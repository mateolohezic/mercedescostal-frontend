'use client'

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { NavLinkHome } from "@/interface";
import logo from '@/assets/logo.png'

const links:Array<NavLinkHome> = [
    {
        title:'Wallpapers',
        href:'/a'
    },
    {
        title:'Studio',
        href:'/a'
    },
    {
        title:'Highlights',
        href:'/a'
    },
    {
        title:'MC World',
        href:'/a'
    },
    {
        title:'Contact',
        href:'/a'
    },
];

export const Navbar = () => {

    return (
        <nav className="w-full px-12 fixed top-12 left-0 right-0 mx-auto z-50 overflow-hidden">
            <div className="w-full flex justify-between">
                <Link href={'/'} aria-label="Inicio">
                    <Image src={logo} alt='Logo Mercedes Costal' className="w-full max-w-xl relative"/>
                </Link>
                <div className="w-full flex justify-end items-start">
                    <ul className="flex justify-start gap-8">
                        {
                            links.map(({title, href}:NavLinkHome, i:number) => (
                                <motion.li
                                    key={i}
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -50, opacity: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link aria-label={`Navegar a ${title}`} href={href} className="uppercase text-lg text-white/90 font-medium tracking-widest">
                                        {title}
                                    </Link>
                                </motion.li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
