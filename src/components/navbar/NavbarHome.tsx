import Link from "next/link";
import styles from '../styles/navbarHome.module.css';
import Image from "next/image";
import logo from '@/assets/logo.png'
import { NavLinkHome } from "@/interface";

const links:Array<NavLinkHome> = [
    {
        title:'Dirección creativa',
        href:'/a'
    },
    {
        title:'Things we like',
        href:'/a'
    },
    {
        title:'Our studio',
        href:'/a'
    },
    {
        title:'The wallpapers',
        href:'/a'
    },
    {
        title:'El Café',
        href:'/a'
    },
    {
        title:'Contract',
        href:'/a'
    },
    {
        title:'FAQS',
        href:'/a'
    },
    {
        title:'The Book',
        href:'/a'
    },
    {
        title:'Collabs',
        href:'/a'
    },
];

export const NavbarHome = () => {
    return (
        <nav className="w-full px-4 absolute top-8 left-0 right-0 mx-auto z-50">
            <div className="w-full flex justify-between items-start">
                <Link href={'/'} aria-label="Inicio">
                    <Image src={logo} alt='Logo Mercedes Costal' className="w-full max-w-xl relative"/>
                </Link>
                <ul className="flex justify-start items-cemter gap-4">
                    {
                        links.map(({title, href}:NavLinkHome, i:number) => (
                            <Link key={i} aria-label={`Navegar a ${title}`} href={href} className={styles.link}>
                                {title}
                            </Link>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}
