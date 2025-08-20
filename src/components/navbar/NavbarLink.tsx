"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { NavLinkHome } from "@/interfaces";
import { useMediaQuery } from "react-responsive";

interface Props {
    navlink: NavLinkHome;
    index: number;
    isHome?: boolean;
    menuExpanded: "wallpapers" | "studio" | "highlights" | "mcuniverse" | "contact" | undefined;
    toggleMenu: (menu: "wallpapers" | "studio" | "highlights" | "mcuniverse" | "contact") => void;
}

export const NavbarLink = ({ navlink, index, isHome, menuExpanded, toggleMenu }: Props) => {
    const { title, links, href, menu } = navlink;
    const isMobile = useMediaQuery({ maxWidth: 1023 });

    const handleToggle = () => {
        toggleMenu(title as "wallpapers" | "studio" | "highlights" | "mcuniverse" | "contact");
    };

    if(menu && links){
        return (
            <motion.li
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full lg:w-auto relative flex flex-col lg:flex-row items-start lg:items-end"
            >
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-label={`Abrir menú ${title}`}
                    className={`w-fit lg:w-auto ${isHome ? "text-white/90" : "text-black/90"} ${ menuExpanded === title && !isMobile && (isHome ? "bg-white/25" : "bg-black/10") } leading-none text-left lg:text-center uppercase font-light tracking-widest transition-150`}
                >
                    {title}
                </button>
                <AnimatePresence>
                    { menuExpanded === title ? (
                        <motion.ul
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`flex flex-col items-start lg:items-end gap-2 ${isHome && !isMobile && " bg-white p-4"} ${ isMobile ? "pl-4 border-l border-gray-300" : "absolute top-full right-0 text-end" }`}
                        >
                            {links.map((link, i) => (
                                <motion.li
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.125 }}
                                    key={i}
                                >
                                    <Link
                                        href={link.href}
                                        className={`${isHome ? "text-white/90" : "text-black/90"} w-fit uppercase font-light tracking-widest whitespace-nowrap transition-150 block`}
                                    >
                                        {link.title}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    ) : null}
                </AnimatePresence>
            </motion.li>
        );
    } else {
        return(
            <motion.li
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full lg:w-auto relative flex items-end"
            >
                <Link
                    href={href||"/"}
                    aria-label={`Ir a ${title}`}
                    className={`w-fit lg:w-auto ${isHome ? "text-white/90" : "text-black/90"} ${ menuExpanded === title && !isMobile && (isHome ? "bg-white/25" : "bg-black/10") } leading-none text-left lg:text-center uppercase font-light tracking-widest transition-150`}
                >
                    {title}
                </Link>
            </motion.li>
        )
    }
};
