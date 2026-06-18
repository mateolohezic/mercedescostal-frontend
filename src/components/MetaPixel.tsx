"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

// El Pixel ID es público (queda expuesto en el cliente). Se puede sobreescribir
// por entorno con NEXT_PUBLIC_FB_PIXEL_ID; si no, usa el ID de producción.
const PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "1905670500382545";

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }
}

export const MetaPixel = () => {
    const pathname = usePathname();
    const isFirstRender = useRef(true);

    // El primer PageView lo dispara el snippet inline al cargar la página.
    // En las navegaciones client-side de Next (router.push) la página NO se
    // recarga, así que disparamos PageView manualmente en cada cambio de ruta.
    // Esto es lo que permite que las custom conversions por URL de Meta
    // (ej: /quote/thank-you) se registren correctamente.
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (typeof window !== "undefined" && typeof window.fbq === "function") {
            window.fbq("track", "PageView");
        }
    }, [pathname]);

    if (!PIXEL_ID) return null;

    return (
        <Script id="meta-pixel" strategy="afterInteractive">
            {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${PIXEL_ID}');
fbq('track','PageView');
            `}
        </Script>
    );
};
