'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';
import foto from '@/assets/home/portada/portada_2.webp'

export const PortadaProduct = () => {

    return (
        <section className="py-[6.5rem] w-full min-h-svh flex justify-center items-center relative overflow-hidden">
            <motion.div
                className="w-full max-w-6xl shadow-lg aspect-video relative overflow-hidden"
                // drag={true}
                // whileDrag={{ scale: 0.9 }}
                // dragElastic={1}
                // dragTransition={{ power: 1 }}
                // dragConstraints={constraintsRef}
            >
                <Image src={foto} draggable={false} alt='Coleccion' className="w-full max-w-6xl shadow-lg object-contain absolute top-0 left-0"/>
            </motion.div>
        </section>
    )
}