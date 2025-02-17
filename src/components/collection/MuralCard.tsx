'use client'

import Link from 'next/link';
import Image from "next/image";
import { motion } from 'framer-motion';
import { Mural } from '@/interfaces';

interface Props{
    mural:Mural;
    showCollection?: boolean;
}

export const MuralCard = ({mural, showCollection}:Props) => {

    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];

    return (
        <div className="w-full flex flex-col justify-center lg:justify-start items-center lg:items-stretch gap-4 overflow-x-hidden">
            <h2 className="w-fit font-gillsans text-lg lg:text-xl text-center lg:text-start tracking-[0.5rem] uppercase relative overflow-hidden">
                Mural
                <b className='font-semibold'> {mural.title}</b>
                { showCollection &&
                    <span className='lg:ml-4 text-xs lg:text-sm block lg:inline-block'>
                        <span className="hidden lg:inline">/ </span>Colección {mural.collectionTitle}
                    </span>
                }
                <motion.div
                    className='absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent to-20% to-white'
                    initial={{ x: '-20%', width: '125%' }}
                    whileInView={{ x: "100%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                />
            </h2>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.5, once: true }}
                className="w-full"
            >
                <Image src={baseVariant.montaje} alt={`${mural.title} Montaje`} width={1280} height={1280} className="w-full object-contain"/>
            </motion.div>
            <div className='w-full flex justify-center lg:justify-between items-center lg:items-start flex-wrap gap-4'>
                <motion.div
                    initial={{ x: '-50%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    viewport={{ amount: 0.5, once: true }}
                    className="grow"
                    >
                    <Image src={baseVariant.mural} alt={`${mural.title} Mural`} width={1024} height={1024} className={`lg:h-72 w-full lg:w-auto object-contain`}/>
                </motion.div>
                <Link href={`/quote?mural=${mural.id}`} className='text-xl border-b border-b-black hover:opacity-75 transition-150'>Cotizar</Link>
            </div>
        </div>
    )
}