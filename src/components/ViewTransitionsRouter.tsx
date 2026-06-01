'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Activa View Transitions API en navegaciones del App Router.
//
// 1) Escuchamos en CAPTURE phase para correr antes que el handler de
//    <Link> (que llama preventDefault + router.push internamente).
// 2) next-intl en este proyecto NO usa createNavigation — los <Link>
//    escriben hrefs sin prefijo de locale ("/collections/x") y el
//    middleware redirige server-side a "/es/collections/x". Si llamamos
//    router.push() con el href sin locale, Next navega client-side a
//    una ruta que no matchea ningún [locale] y termina en home.
//    Solución: detectar el locale activo desde pathname y prependerlo.
export const ViewTransitionsRouter = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const startVT = (document as any).startViewTransition?.bind(document) as
      | ((cb: () => void) => unknown)
      | undefined;
    if (!startVT) return;

    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const anchor = (e.target as Element | null)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      const target = anchor.getAttribute('target');
      if (!href || target === '_blank') return;
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      const currentLocale = pathname.split('/')[1];
      const localeOk = (routing.locales as readonly string[]).includes(currentLocale);
      const activeLocale = localeOk ? currentLocale : routing.defaultLocale;

      const firstSeg = href.split('/')[1] ?? '';
      const hrefHasLocale = (routing.locales as readonly string[]).includes(firstSeg);
      const finalHref = hrefHasLocale ? href : `/${activeLocale}${href.startsWith('/') ? '' : '/'}${href}`;

      e.preventDefault();
      e.stopPropagation();

      startVT(() => {
        router.push(finalHref);
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router, pathname]);

  return null;
};
