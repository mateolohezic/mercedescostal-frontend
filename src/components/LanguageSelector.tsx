'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { WorldIcon } from "@/icons";

export const LanguageSelector = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [language, setLanguage] = useState<'en' | 'es' | null>(null);

    useEffect(() => {
        if (pathname.startsWith('/es')) {
            setLanguage('es');
        } else {
            setLanguage('en');
        }
    }, [pathname]);

    const changeLanguage = (lang: 'en' | 'es') => {
        let newPathname = pathname;
        if (lang === 'es' && !pathname.startsWith('/es')) {
            newPathname = pathname === '/' ? '/es' : `/es${pathname}`;
        } else if (lang === 'en' && pathname.startsWith('/es')) {
            newPathname = pathname === '/es' ? '/' : pathname.replace(/^\/es/, '');
        }
        router.replace(newPathname, { scroll: false });
    };

    return (
        <div className="flex justify-center items-center relative">
            <div className='absolute bottom-0.5 left-0.5 pointer-events-none'>
                <WorldIcon className='text-sm relative -top-[2px] text-neutral-600'/>
            </div>
            <label className='sr-only' htmlFor="language">Elegir Idioma | Select Language</label>
            <select
                className='w-[5.125rem] text-sm outline-none focus-visible:outline-none cursor-pointer pl-[18px] bg-white'
                name="language"
                id="language"
                value={language || ''}
                onChange={(e) => changeLanguage(e.target.value as 'en' | 'es')}
            >
                { !language && <option value=""></option> }
                <option value="es">Español</option>
                <option value="en">English</option>
            </select>
        </div>
    )
}
