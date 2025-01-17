'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { NavLinkHome } from "@/interface";
import { MCLogo } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

    const pathname = usePathname();
    const [isHome, setIsHome] = useState<boolean>(pathname === '/');

    useEffect(() => {
        setIsHome(pathname === '/');
    }, [pathname])
    

    return (
        <nav className="w-full px-12 h-40 flex justify-center items-center fixed top-0 left-0 right-0 z-50">
            <div className="w-full flex justify-between">
                <Link className="w-full max-w-xl" href={'/'} aria-label="Inicio">
                    <MCLogo className={`${ isHome ? 'fill-white' : 'fill-black' } w-full`}/>
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
                                    <Link aria-label={`Navegar a ${title}`} href={href} className={`${ isHome ? 'text-white/90' : 'text-black/90' } uppercase text-lg font-medium tracking-widest`}>
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
