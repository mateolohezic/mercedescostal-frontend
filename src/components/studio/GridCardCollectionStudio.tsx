'use client'

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { MutableRefObject } from 'react';

interface Collection {
    img: StaticImageData;
    title: string;
    year: string;
}

interface Props {
    constraintsRef: MutableRefObject<null>;
    collection: Collection;
    i:number
}

export const GridCardCollectionStudio = ({constraintsRef, collection, i}:Props) => {

    const { title, year, img } = collection

    return (
        <motion.div
            className="w-full flex flex-col justify-center items-center group"
            drag={true}
            initial={{ cursor: 'grab'}}
            whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
            dragElastic={1}
            dragTransition={{ power: 1 }}
            dragConstraints={constraintsRef}
        >
            <div className="w-full flex justify-start items-end">
                <Link href={'/a'} draggable={false} className='w-full cursor-pointer'>
                    <h3 className="text-base opacity-0 group-hover:opacity-100"><span className="mr-2">{i+1}.</span>{title}, {year}</h3>
                </Link>
            </div>
            <Image src={img} alt={title} draggable={false} className="w-full" />
        </motion.div>
    )
}
