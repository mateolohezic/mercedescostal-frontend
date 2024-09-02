'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import foto from '@/assets/home/portada/portada_3.webp'

export const PortadaProduct = () => {

    return (
        <section className="py-[6.5rem] w-full min-h-svh flex justify-center items-center relative">
            <motion.div
                className="w-full max-w-6xl shadow-lg aspect-video relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ }}
            >
                <Image src={foto} draggable={false} alt='Coleccion' className="w-full max-w-6xl shadow-lg object-contain absolute top-0 left-0"/>
            </motion.div>
        </section>
    )
}