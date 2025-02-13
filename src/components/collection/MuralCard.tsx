'use client'

import { useState } from 'react';
import Image from "next/image";
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Mural } from '@/interfaces';
import Link from 'next/link';

interface Props{
    mural:Mural;
    showCollection?: boolean;
}

export const MuralCard = ({mural, showCollection}:Props) => {

    const [muralWritted, setMuralWritted] = useState<boolean>(false);
    const [muralTwoWritted, setMuralTwoWritted] = useState<boolean>(false);
    const [startAnimation, setStartAnimation] = useState<boolean>(false);

    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];

    return (
        <motion.div
            onViewportEnter={() => setStartAnimation(true)}
            className="w-full flex flex-col gap-4 overflow-x-hidden"
        >
            <h2 className="sr-only">Mural {mural.title}</h2>
            <div className='w-fit h-6'>
                { startAnimation &&
                    <div className='flex items-center gap-3'>
                        <TypeAnimation
                            aria-label="Mural"
                            role="title"
                            sequence={[
                                'Mural',
                                () => setMuralWritted(true),
                            ]}
                            speed={30}
                            cursor={false}
                            className={'inline-block font-gillsans text-xl tracking-[0.5rem] uppercase'}
                        />
                        {
                            muralWritted &&
                            <TypeAnimation
                                aria-label={mural.title}
                                role="title"
                                sequence={[
                                    mural.title,
                                    () => setMuralTwoWritted(true),
                                ]}
                                speed={20}
                                cursor={false}
                                className={'inline-block font-gillsans text-xl tracking-[0.5rem] uppercase font-semibold mr-4'}
                            />
                        }
                        {
                            muralTwoWritted && showCollection &&
                            <TypeAnimation
                                aria-label={mural.collectionTitle}
                                role="title"
                                sequence={[ 
                                    "/ Colección " + mural.collectionTitle,
                                ]}
                                speed={20}
                                cursor={false}
                                className={'inline-block font-gillsans text-sm tracking-[0.5rem] uppercase'}
                            />
                        }
                    </div>
                }
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ amount: 0.5, once: true }}
                className="w-full"
            >
                <Image src={baseVariant.montaje} alt={`${mural.title} Montaje`} width={1500} height={1500} className="w-full object-contain"/>
            </motion.div>
            <div className='w-full flex justify-between gap-4 flex-wrap items-start'>
                <motion.div
                    initial={{ x: '-50%', opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    viewport={{ amount: 0.5, once: true }}
                    className="grow"
                    >
                    <Image src={baseVariant.mural} alt={`${mural.title} Mural`} width={1500} height={1500} className={`h-72 w-auto object-contain`}/>
                </motion.div>
                <Link href={`/quote?mural=${mural.id}`} className='text-xl border-b border-b-black hover:opacity-75 transition-150'>Cotizar</Link>
            </div>
        </motion.div>
    )
}
