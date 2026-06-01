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
            title: t('collectibles'),
            menu: true,
            links: [
                {
                    title: t('artScreen'),
                    href:'/collectibles/art-screen'
                }
            ]
        },
        {
            title: t('studio'),
            menu: true,
            links: [
                {
                    title: t('meetTheMakers'),
                    href:'/meet-the-makers'
                },
                {
                    title: t('press'),
                    href:'/press'
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
                {
                    title: t('landmark'),
                    href:'/mc-universe/landmark'
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
    const checkIsMuralDetail = (path: string) => /^\/[a-z]{2}\/collections\/[^/]+\/[^/]+$/.test(path);
    // En home y detalle de mural, el navbar arranca transparente sobre el
    // hero oscuro. Apenas el usuario empieza a scrollear (≥ 60% del primer
    // viewport), pasa a fondo blanco sólido con texto/logo negros, así
    // queda siempre legible sobre las secciones claras del scroll.
    const [hasScrolledPastHero, setHasScrolledPastHero] = useState<boolean>(false);
    const allowsTransparent = checkIsHome(pathname) || checkIsMuralDetail(pathname);
    const onDark = allowsTransparent && !hasScrolledPastHero;
    const [menuExpanded, setMenuExpanded] = useState<'wallpapers'|'collectibles'|'studio'|'highlights'|'mcuniverse'|'contact'|undefined>();

    useEffect(() => {
        setMenuExpanded(undefined);
    }, [pathname])

    useEffect(() => {
        // Si la ruta no admite transparencia, igual mantenemos el listener
        // por consistencia (no causa renders innecesarios).
        const threshold = () => Math.max(window.innerHeight * 0.6, 200);
        const onScroll = () => setHasScrolledPastHero(window.scrollY > threshold());
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [pathname]);

    const toggleMenu = (menu: 'wallpapers'|'collectibles'|'studio'|'highlights'|'mcuniverse'|'contact') => {
        setMenuExpanded(menu === menuExpanded ? undefined : menu);
    }

    return (
        <nav className={`hidden w-full px-12 h-24 xl:h-32 lg:flex justify-center items-center fixed top-0 left-0 right-0 z-50 content-visibility-hidden lg:content-visibility-visible bg-transparent`}>
            <div className="w-full flex justify-between relative">
                <Link className="w-full lg:max-w-72 xl:max-w-sm 2xl:max-w-lg flex items-end" href={'/'} aria-label="Inicio">
                    <MCLogo className={`${ onDark ? 'fill-white' : 'fill-black' } w-full transition-colors duration-300 ease-out`}/>
                </Link>
                <div className="w-full flex justify-end items-end">
                    <ul className="flex justify-start items-center gap-2 xl:gap-4 2xl:gap-6">
                        {
                            links.map((navlink:NavLinkHome, i:number) => (
                                <NavbarLink navlink={navlink} index={i} isHome={onDark} menuExpanded={menuExpanded} toggleMenu={toggleMenu} key={i}/>
                            ))
                        }
                        <BuscadorNavbar isHome={onDark}/>
                        <LanguageSelector isHome={onDark}/>
                    </ul>
                </div>
            </div>
        </nav>
    )
}