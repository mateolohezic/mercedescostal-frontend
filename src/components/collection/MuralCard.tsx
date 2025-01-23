'use client'

import { useState } from 'react';
import Image, { StaticImageData } from "next/image";
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

interface Props{
    title: string;
    montaje: StaticImageData;
    mural: StaticImageData;
    wide?: boolean;
}

export const MuralCard = ({title, montaje, mural, wide}:Props) => {

    const [muralWritted, setMuralWritted] = useState<boolean>(false);
    const [startAnimation, setStartAnimation] = useState<boolean>(false);

    return (
        <motion.div
            onViewportEnter={() => setStartAnimation(true)}
            className="w-full flex flex-col gap-4 overflow-x-hidden"
        >
            <h2 className="sr-only">Mural {title}</h2>
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
                                aria-label={title}
                                role="title"
                                sequence={[
                                    title
                                ]}
                                speed={20}
                                cursor={false}
                                className={'inline-block font-gillsans text-xl tracking-[0.5rem] uppercase font-semibold'}
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
                <Image src={montaje} alt={`${title} Montaje`} className="w-full object-contain"/>
            </motion.div>
            <motion.div
                initial={{ x: '-50%', opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                viewport={{ amount: 0.5, once: true }}
                className="w-full"
            >
                <Image src={mural} alt={`${title} Mural`} className={`h-72 ${ wide ? 'w-full object-cover' : 'w-auto object-contain'}`}/>
            </motion.div>
        </motion.div>
    )
}
