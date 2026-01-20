'use client'

import { useEffect, useState, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { routing } from '@/i18n/routing';
import { GlobeIcon, ChevronDownIcon } from '@/icons';

interface Props {
    isHome?: boolean;
}

const localeNames: Record<string, string> = {
    es: 'ES',
    en: 'EN',
    fr: 'FR'
};

export const LanguageSelector = ({isHome}:Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [language, setLanguage] = useState<string>('es');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentLocale = routing.locales.find(locale => pathname.startsWith(`/${locale}`));
        setLanguage(currentLocale || 'es');
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const changeLanguage = (lang: string) => {
        if (lang === language) {
            setIsOpen(false);
            return;
        }

        // Remove current locale prefix to get the base path
        let basePath = pathname;
        for (const locale of routing.locales) {
            if (pathname.startsWith(`/${locale}`)) {
                basePath = pathname.replace(new RegExp(`^/${locale}`), '') || '/';
                break;
            }
        }

        // Add new locale prefix
        const newPathname = `/${lang}${basePath === '/' ? '' : basePath}`;

        setIsOpen(false);
        router.replace(newPathname, { scroll: false });
    };

    const textColor = isHome ? "text-white/90" : "text-black/90";
    const hoverBg = isHome ? "hover:bg-white/10" : "hover:bg-black/5";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="relative flex items-center"
            ref={dropdownRef}
        >
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center justify-center gap-1.5 ${textColor} uppercase font-light tracking-widest cursor-pointer transition-opacity hover:opacity-70`}
                aria-label="Elegir Idioma | Select Language | Choisir la langue"
            >
                <GlobeIcon className="w-4 h-4" />
                <span className="text-sm leading-none">{localeNames[language]}</span>
                <ChevronDownIcon className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className={`absolute top-full right-0 mt-2 py-1 min-w-[80px] ${isHome ? "bg-black/80 backdrop-blur-sm" : "bg-white"} shadow-lg rounded-sm z-50`}
                    >
                        {routing.locales.map((locale) => (
                            <button
                                key={locale}
                                type="button"
                                onClick={() => changeLanguage(locale)}
                                className={`w-full px-4 py-1.5 text-left text-sm uppercase tracking-widest font-light ${textColor} ${hoverBg} transition-colors ${locale === language ? 'opacity-50' : ''}`}
                            >
                                {localeNames[locale]}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}
