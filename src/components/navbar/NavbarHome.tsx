import Link from "next/link";
import styles from '../styles/navbarHome.module.css';
import Image from "next/image";
import logo from '@/assets/logo.png'

interface LinkType{
    title: string;
    href: string
};

const links:Array<LinkType> = [
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
        <nav className="absolute top-8 left-8 z-50">
            <div className="flex flex-col justify-start items-start gap-2">
                <Link href={'/'} aria-label="Inicio">
                    <Image src={logo} alt='Logo Mercedes Costal' className="w-96 relative hover:translate-x-4 transition-all duration-200 ease-in-out"/>
                </Link>
                <ul className="mt-2 flex flex-col justify-start items-start gap-2">
                    {
                        links.map(({title, href}:LinkType, i:number) => (
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
