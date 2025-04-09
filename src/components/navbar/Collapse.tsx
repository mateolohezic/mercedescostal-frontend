"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { NavLinkHome } from "@/interfaces";
import { MCLogo, NavbarLink, BuscadorNavbar, LanguageSelector } from "@/components";
import { CrossIcon, MenuIcon } from "@/icons";

interface Props {
    links: Array<NavLinkHome>;
}

export const Collapse = ({ links }: Props) => {
    const pathname = usePathname();
    const [isHome, setIsHome] = useState<boolean>(pathname === '/');
    const [isExpanded, setIsExpanded] = useState(false);
    const [expandedSection, setExpandedSection] = useState<"wallpapers" | "studio" | "highlights" | "mcuniverse" | "contact" | undefined>(undefined);
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        if(!window) return;
        setIsDesktop(window.innerWidth >= 1024);
    }, []);

    useEffect(() => {
        setIsExpanded(false);
        setExpandedSection(undefined);
        setIsHome(pathname === '/');
    }, [pathname]);

    if (isDesktop) return null;

    return (
        <div className="w-full lg:hidden flex items-center sticky top-0 z-50">
            { !isHome && <div className={`w-full h-14 bg-gradient-to-b from-white via-white/75 to-transparent absolute top-0 left-0 z-0 pointer-events-none ${ isExpanded && "opacity-100"} transition-200`}/> }
            <motion.div
                animate={{ left: isExpanded ? -304 : 16 }}
                transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                className="w-fit h-6 flex justify-center items-center absolute top-3 left-3 z-50 bg-transparent"
            >
                <Link href="/" aria-label="Inicio">
                    <MCLogo className={`w-64 stroke-2 ${ isHome ? "fill-white/90" : "fill-black/90"}`} />
                </Link>
            </motion.div>
            <motion.button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                animate={{ right: isExpanded ? 296 : 8 }}
                transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                className={`absolute top-2 right-2 z-50 p-1 rounded-lg ${ !isHome && isExpanded ? "bg-white/5" : "bg-transparent"}`}
                aria-label="Abrir menú"
            >
                <MenuIcon className={`size-6 ${ isHome ? "text-white/90" : "text-black/90"}`}/>
            </motion.button>
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsExpanded(false)}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {isExpanded && (
                    <motion.aside
                        className="w-72 h-full p-4 bg-white flex flex-col fixed top-0 right-0 z-50"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.25 }}
                    >
                        <div className="absolute top-4 left-4 z-50">
                            <LanguageSelector/>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="absolute top-4 right-4 z-50"
                            aria-label="Cerrar menú"
                        >
                            <CrossIcon className="size-4" />
                        </button>
                        <ul className="mt-12 w-full flex flex-col gap-4">
                            {links.map((navlink, i) => (
                                <NavbarLink
                                    key={i}
                                    navlink={navlink}
                                    index={i}
                                    menuExpanded={expandedSection}
                                    toggleMenu={(section) => setExpandedSection(prev => prev === section ? undefined : section)}
                                />
                            ))}
                        </ul>
                        <div className="mt-6 w-full">
                            <BuscadorNavbar insideCollapse/>
                        </div>
                        <div className="w-full grow flex justify-center items-end">
                            <Link href="/" aria-label="Inicio">
                                <MCLogo className="w-52 fill-black" />
                            </Link>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
};
