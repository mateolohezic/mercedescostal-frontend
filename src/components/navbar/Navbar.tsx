'use client'

import Link from "next/link";
import { NavLinkHome } from "@/interfaces";
import { MCLogo, NavbarLink, BuscadorNavbar } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links:Array<NavLinkHome> = [
    {
        title:'Wallpapers',
        links: [
            {
                title:'Murales',
                href:'/murals'
            },
            {
                title:'Patrones',
                href:'/patterns'
            },
            // {
            //     title:'New In',
            //     href:'/'
            // },
            {
                title:'Cotizá',
                href:'/quote'
            },
        ]
    },
    {
        title:'Studio',
        links: [
            {
                title:'Meet the makers',
                href:'/'
            },
            {
                title:'Puntos de venta',
                href:'/'
            },
        ]
    },
    {
        title:'Highlights',
        links: [
            {
                title:'Buen diseño',
                href:'/'
            },
            {
                title:'Ateneo Splendid',
                href:'/'
            },
            {
                title:'UK',
                href:'/'
            },
            {
                title:'Manantiales Popup',
                href:'/'
            },
        ]
    },
    {
        title:'MC Universe',
        links: [
            {
                title:'Fragances',
                href:'/'
            },
            {
                title:'Costal Café',
                href:'/'
            },
        ]
    },
    {
        title:'Contact',
        links: [
            {
                title:'Trabaja con nosotros',
                href:'/'
            },
            {
                title:'Vende M.C.',
                href:'/'
            },
        ]
    },
];

export const Navbar = () => {

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
        <nav className={`w-full px-12 h-40 flex justify-center items-center fixed top-0 left-0 right-0 z-50 ${ isHome ? 'bg-transparent' : 'bg-gradient-to-b from-white via-white/75 to-transparent' }`}>
            <div className="w-full flex justify-between">
                <Link className="w-full max-w-xl" href={'/'} aria-label="Inicio">
                    <MCLogo className={`${ isHome ? 'fill-white' : 'fill-black' } w-full`}/>
                </Link>
                <div className="w-full flex justify-end items-start">
                    <ul className="flex justify-start gap-8">
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