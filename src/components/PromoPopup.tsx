'use client'

import { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import Image from 'next/image';
import promoImage from '@/assets/preventa_art_screen.webp';

export const PromoPopup = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem('promo-popup-dismissed');
        if (dismissed) return;

        const timer = setTimeout(() => {
            setShow(true);
        }, 4000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = (value: boolean) => {
        setShow(value);
        if (!value) sessionStorage.setItem('promo-popup-dismissed', '1');
    };

    return (
        <Modal showModal={show} setShowModal={handleClose} className="max-w-3xl">
            <Image
                src={promoImage}
                alt="Preventa Art Screen - 15% OFF Lanzamiento"
                className="w-full h-auto"
                priority
            />
        </Modal>
    );
};
