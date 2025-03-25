'use client'

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
    isHome: boolean;
}

export const LanguageSelector = ({isHome}:Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [language, setLanguage] = useState<'en' | 'es' | null>(null);

    useEffect(() => {
        setLanguage(pathname.startsWith('/es') ? 'es' : 'en');
    }, [pathname]);

    const changeLanguage = (lang: 'en' | 'es') => {
        if (lang === language) return; // No hacemos nada si ya está seleccionado

        let newPathname = pathname;

        if (lang === 'es' && !pathname.startsWith('/es')) {
            newPathname = pathname === '/' ? '/es' : `/es${pathname}`;
        } else if (lang === 'en' && pathname.startsWith('/es')) {
            newPathname = pathname === '/es' ? '/' : pathname.replace(/^\/es/, '');
        }

        router.replace(newPathname, { scroll: false });
    };

    return (
        <div className="flex justify-center items-center mr-8">
            <span className='sr-only'>Elegir Idioma | Select Language</span>
            <div className='flex justity-center items-center gap-1'>
                <button
                    type="button"
                    onClick={() => changeLanguage('en')}
                    disabled={language === 'en'}
                    className={`${isHome ? "text-white/90" : "text-black/90"} ${language === 'en' ? "opacity-100 cursor-default" : "opacity-50 hover:opacity-100 cursor-pointer"} lg:text-center uppercase text-lg font-medium tracking-widest transition-150`}
                >
                    EN <span className='sr-only'>English</span>
                </button>
                <span className={`mx-1 opacity-50 pointer-events-none ${isHome ? "text-white/90" : "text-black/90"}`}>/</span>
                <button
                    type="button"
                    onClick={() => changeLanguage('es')}
                    disabled={language === 'es'}
                    className={`${isHome ? "text-white/90" : "text-black/90"} ${language === 'es' ? "opacity-100 cursor-default" : "opacity-50 hover:opacity-100 cursor-pointer"} lg:text-center uppercase text-lg font-medium tracking-widest transition-150`}
                >
                    ES <span className='sr-only'>Español</span>
                </button>
            </div>
        </div>
    )
}
