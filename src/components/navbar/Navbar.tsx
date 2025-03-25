'use client'

import Link from "next/link";
import { NavLinkHome } from "@/interfaces";
import { MCLogo, NavbarLink, BuscadorNavbar, LanguageSelector } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    links: Array<NavLinkHome>;
}

export const Navbar = ({links}:Props) => {

    const pathname = usePathname();
    const [isHome, setIsHome] = useState<boolean>(pathname === '/');
    const [menuExpanded, setMenuExpanded] = useState<'wallpapers'|'studio'|'highlights'|'mcuniverse'|'contact'|undefined>();

    useEffect(() => {
        setMenuExpanded(undefined);
        setIsHome(pathname === '/');
    }, [pathname])
    
    const toggleMenu = (menu: 'wallpapers'|'studio'|'highlights'|'mcuniverse'|'contact') => {
        setMenuExpanded(menu === menuExpanded ? undefined : menu);
    }

    return (
        <nav className={`hidden w-full px-12 h-24 xl:h-40 lg:flex justify-center items-center fixed top-0 left-0 right-0 z-50 ${ isHome ? 'bg-transparent' : 'bg-gradient-to-b from-white via-white/75 to-transparent' } content-visibility-hidden lg:content-visibility-visible`}>
            <div className="w-full flex justify-between">
                <Link className="w-full lg:max-w-60 xl:max-w-md 2xl:max-w-xl" href={'/'} aria-label="Inicio">
                    <MCLogo className={`${ isHome ? 'fill-white' : 'fill-black' } w-full`}/>
                </Link>
                <div className="w-full flex justify-end items-start">
                    <LanguageSelector isHome={isHome}/>
                    <ul className="flex justify-start gap-4 xl:gap-8">
                        {
                            links.map((navlink:NavLinkHome, i:number) => (
                                <NavbarLink navlink={navlink} index={i} isHome={isHome} menuExpanded={menuExpanded} toggleMenu={toggleMenu} key={i}/>
                            ))
                        }
                        <BuscadorNavbar isHome={isHome}/>
                    </ul>
                </div>
            </div>
        </nav>
    )
}