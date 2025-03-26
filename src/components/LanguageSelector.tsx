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

        let newPathname = pathname;

        if (lang === 'en' && !pathname.startsWith('/en')) {
            newPathname = pathname === '/' ? '/en' : `/en${pathname}`;
        } else if (lang === 'es' && pathname.startsWith('/en')) {
            newPathname = pathname === '/en' ? '/' : pathname.replace(/^\/en/, '');
        }

        router.replace(newPathname, { scroll: false });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
            className="flex justify-center items-center mr-6"
        >
            <span className='sr-only'>Elegir Idioma | Select Language</span>
            <div className='flex justity-center items-center gap-1'>
                <button
                    type="button"
                    onClick={() => changeLanguage('es')}
                    disabled={language === 'es'}
                    className={`${isHome ? "text-white/90" : "text-black/90"} ${language === 'es' ? "opacity-100 cursor-default" : "opacity-50 hover:opacity-100 cursor-pointer"} lg:text-center uppercase font-medium tracking-widest transition-150`}
                >
                    ES <span className='sr-only'>Español</span>
                </button>
                <span className={`mx-0.5 text-sm opacity-50 pointer-events-none ${isHome ? "text-white/90" : "text-black/90"}`}>/</span>
                <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    disabled={language === 'en'}
                    className={`${isHome ? "text-white/90" : "text-black/90"} ${language === 'en' ? "opacity-100 cursor-default" : "opacity-50 hover:opacity-100 cursor-pointer"} lg:text-center uppercase font-medium tracking-widest transition-150`}
                >
                    EN <span className='sr-only'>English</span>
                </button>
            </div>
        </motion.div>
    )
}
