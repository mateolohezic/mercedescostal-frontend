'use client'

import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

interface Collection {
    img: StaticImageData;
    title: string;
    year: string;
}

interface Props {
    collection: Collection;
    i:number
}

export const GridCardCollectionStudio = ({collection, i}:Props) => {

    const { title, year, img } = collection

    return (
        <Link href={'/a'} draggable={false} className='w-full cursor-pointer group'>
            <motion.div
                className="w-full flex flex-col justify-center items-center relative"
                // drag={true}
                // initial={{ cursor: 'grab'}}
                // whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                // dragElastic={1}
                // dragTransition={{ power: 1 }}
                // dragConstraints={constraintsRef}
            >
                <div className="w-full flex justify-start items-end absolute top-0 left-0">
                    <h3 className="text-base opacity-0 group-hover:opacity-100"><span className="mr-2">{i+1}.</span>{title}, {year}</h3>
                </div>
                <Image src={img} alt={title} draggable={false} className="w-full group-hover:opacity-0" />
            </motion.div>
        </Link>
    )
}
