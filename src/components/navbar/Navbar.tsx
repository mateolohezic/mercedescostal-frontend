'use client'

import Link from "next/link";
import { NavLinkHome } from "@/interfaces";
import { MCLogo, NavbarLink, BuscadorNavbar, LanguageSelector } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

export const Navbar = () => {
    const t = useTranslations('common.nav');

    const links:Array<NavLinkHome> = [
        {
            title: t('wallpapers'),
            href:'/collections',
        },
        {
            title: t('studio'),
            menu: true,
            links: [
                {
                    title: t('meetTheMakers'),
                    href:'/meet-the-makers'
                }
            ]
        },
        {
            title: t('highlights'),
            menu: true,
            links: [
                {
                    title: t('goodDesign'),
                    href:'/highlights/good-design'
                },
                {
                    title: t('ateneoSplendid'),
                    href:'/highlights/ateneo-splendid'
                },
                {
                    title: t('uk'),
                    href:'/highlights/london-design-festival'
                },
                {
                    title: t('manantiales'),
                    href:'/highlights/manantiales-popup'
                },
                {
                    title: t('valencia'),
                    href:'/highlights/feria-habitat-valencia'
                },
            ]
        },
        {
            title: t('mcUniverse'),
            menu: true,
            links: [
                {
                    title: t('fragrances'),
                    href:'/mc-universe/fragrances'
                },
                {
                    title: t('theBook'),
                    href:'/mc-universe/the-book'
                },
                {
                    title: t('costalCafe'),
                    href:'/mc-universe/costal-coffee'
                },
            ]
        },
        {
            title: t('contact'),
            menu: true,
            links: [
                {
                    title: t('workWithUs'),
                    href:'/work-with-us'
                },
                {
                    title: t('sellMc'),
                    href:'/sell-mc'
                },
            ]
        },
        {
            title: t('quote'),
            href:'/quote',
        },
    ];

    const pathname = usePathname();
    const checkIsHome = (path: string) => /^\/[a-z]{2}$/.test(path);
    const [isHome, setIsHome] = useState<boolean>(checkIsHome(pathname));
    const [menuExpanded, setMenuExpanded] = useState<'wallpapers'|'studio'|'highlights'|'mcuniverse'|'contact'|undefined>();

    useEffect(() => {
        setMenuExpanded(undefined);
        setIsHome(checkIsHome(pathname));
    }, [pathname])
    
    const toggleMenu = (menu: 'wallpapers'|'studio'|'highlights'|'mcuniverse'|'contact') => {
        setMenuExpanded(menu === menuExpanded ? undefined : menu);
    }

    return (
        <nav className={`hidden w-full px-12 h-24 xl:h-32 lg:flex justify-center items-center ${ isHome ? 'bg-transparent' : 'bg-white'} fixed top-0 left-0 right-0 z-50 content-visibility-hidden lg:content-visibility-visible`}>
            <div className="w-full flex justify-between relative">
                <Link className="w-full lg:max-w-96 xl:max-w-sm 2xl:max-w-lg flex items-end" href={'/'} aria-label="Inicio">
                    <MCLogo className={`${ isHome ? 'fill-white' : 'fill-black' } w-full`}/>
                </Link>
                <div className="w-full flex justify-end items-end">
                    <ul className="flex justify-start items-center gap-4 xl:gap-6">
                        {
                            links.map((navlink:NavLinkHome, i:number) => (
                                <NavbarLink navlink={navlink} index={i} isHome={isHome} menuExpanded={menuExpanded} toggleMenu={toggleMenu} key={i}/>
                            ))
                        }
                        <BuscadorNavbar isHome={isHome}/>
                        <LanguageSelector isHome={isHome}/>
                    </ul>
                </div>
            </div>
        </nav>
    )
}