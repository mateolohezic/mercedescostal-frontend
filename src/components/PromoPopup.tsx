'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Modal } from '@/components/ui/Modal';
import promoImage from '@/assets/home/promo_popup.webp';

// Popup de bienvenida con la promo -15% de lanzamiento. Aparece a los 4s de estar
// explorando el sitio (una vez por sesión — sessionStorage lo recuerda).
// La imagen ya lleva todo el mensaje (título, %, vigencia). El CTA de abajo lleva
// a las colecciones para que arranquen a mirar productos.
export const PromoPopup = () => {
    const [show, setShow] = useState(false);
    const wasShown = useRef(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('promo-popup-dismissed');
        if (dismissed) return;

        const timer = setTimeout(() => {
            setShow(true);
            wasShown.current = true;
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (wasShown.current && !show) {
            sessionStorage.setItem('promo-popup-dismissed', '1');
        }
    }, [show]);

    return (
        <Modal showModal={show} setShowModal={setShow} className="max-w-md">
            <div className="flex flex-col">
                <Image
                    src={promoImage}
                    alt="Mercedes Costal — 15% OFF Lanzamiento hasta el 5 de julio"
                    sizes="(max-width: 640px) 100vw, 448px"
                    className="w-full h-auto"
                    priority
                />
                <Link
                    href="/collections"
                    onClick={() => setShow(false)}
                    className="block w-full text-center py-4 bg-black text-white font-gillsans font-medium uppercase tracking-wider hover:bg-black/85 transition-colors"
                >
                    Ver colecciones
                </Link>
            </div>
        </Modal>
    );
};
