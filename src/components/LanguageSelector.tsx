'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface Props {
    isHome?: boolean;
}

export const LanguageSelector = ({isHome}:Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [language, setLanguage] = useState<'en' | 'es' | null>(null);

    useEffect(() => {
        setLanguage(pathname.startsWith('/en') ? 'en' : 'es');
    }, [pathname]);

    const changeLanguage = (lang: 'en' | 'es') => {
        if (lang === language) return;

        // Remove current locale prefix to get the base path
        let basePath = pathname;
        if (pathname.startsWith('/es')) {
            basePath = pathname.replace(/^\/es/, '') || '/';
        } else if (pathname.startsWith('/en')) {
            basePath = pathname.replace(/^\/en/, '') || '/';
        }

        // Add new locale prefix
        const newPathname = `/${lang}${basePath === '/' ? '' : basePath}`;

        router.replace(newPathname, { scroll: false });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex justify-center items-end"
        >
            <span className='sr-only'>Elegir Idioma | Select Language</span>
            <div className='flex justity-center items-end gap-1'>
                <button
                    type="button"
                    onClick={() => changeLanguage('es')}
                    disabled={language === 'es'}
                    className={`${isHome ? "text-white/90" : "text-black/90"} ${language === 'es' ? "opacity-100 cursor-default" : "opacity-50 hover:opacity-100 cursor-pointer"} lg:text-center uppercase font-light tracking-widest leading-none transition-150`}
                >
                    ES <span className='sr-only'>Español</span>
                </button>
                <span className={`mx-0.5 text-sm opacity-50 pointer-events-none ${isHome ? "text-white/90" : "text-black/90"}`}>/</span>
                <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    disabled={language === 'en'}
                    className={`${isHome ? "text-white/90" : "text-black/90"} ${language === 'en' ? "opacity-100 cursor-default" : "opacity-50 hover:opacity-100 cursor-pointer"} lg:text-center uppercase font-light tracking-widest leading-none transition-150`}
                >
                    EN <span className='sr-only'>English</span>
                </button>
            </div>
        </motion.div>
    )
}
