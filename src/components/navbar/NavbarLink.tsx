'use client'

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NavLinkHome } from "@/interface";

interface Props{
    navlink: NavLinkHome;
    index: number;
    isHome: boolean;
    menuExpanded: "wallpapers"|"studio"|"highlights"|"mcuniverse"|"contact"|undefined;
    toggleMenu: (menu: "wallpapers" | "studio" | "highlights" | "mcuniverse" | "contact") => void
}

export const NavbarLink = ({navlink, index, isHome, menuExpanded, toggleMenu}:Props) => {

    const { title, links } = navlink;
    
    return (
        <motion.li
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
        >
            <button
                type="button"
                onClick={() => toggleMenu(title as "wallpapers"|"studio"|"highlights"|"mcuniverse"|"contact")}
                aria-label={`Abrir menú ${title}`}
                className={`${isHome ? 'text-white/90' : 'text-black/90'} ${menuExpanded === title ? (isHome ? 'bg-white/25' : 'bg-black/10') : ''} uppercase text-lg font-medium tracking-widest transition-150`}
            >
                {title}
            </button>
            <AnimatePresence>
                { menuExpanded === title &&
                    <motion.ul
                        exit={{ y: 50, opacity: 0 }}
                        className="mt-2 flex flex-col justify-end items-end text-end gap-2 absolute top-full right-0"
                    >
                        {
                            links.map((link, i) => (
                                <motion.li
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.125 }}
                                    key={i}
                                >
                                    <Link
                                        href={link.href}
                                        className={`${ isHome ? 'text-white/90 hover:bg-white/25' : 'text-black/90' } uppercase text-lg font-medium tracking-widest whitespace-nowrap transition-150`}
                                    >
                                        {link.title}
                                    </Link>
                                </motion.li>
                            ))
                        }
                    </motion.ul>
                }
            </AnimatePresence>
        </motion.li>
    )
}
