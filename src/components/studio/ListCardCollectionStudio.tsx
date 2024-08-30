'use client'

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image, { StaticImageData } from "next/image";
import Link from 'next/link';

interface Collection {
    img: StaticImageData;
    title: string;
    year: string;
}

interface Props{
    collection: Collection;
    i: number
}

export const ListCardCollectionStudio = ({collection, i}:Props) => {

    const { img, title, year } = collection;
    
    const [hoveredImage, setHoveredImage] = useState<StaticImageData | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseEnter = (img: StaticImageData) => {
        setHoveredImage(img);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const container = e.currentTarget.getBoundingClientRect();
        const imageWidth = 192;
        const imageHeight = 192;
        setMousePosition({ 
            x: e.clientX - container.left - imageWidth / 2,
            y: e.clientY - container.top - imageHeight / 2
        });
    };

    const handleMouseLeave = () => {
        setHoveredImage(null);
    };

    return (
        <div className='w-full relative'>
            <Link
                href={'/a'}
                className="flex justify-between items-center w-full"
                onMouseEnter={() => handleMouseEnter(img)}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                <h3 className="whitespace-nowrap overflow-hidden truncate pr-2">
                    <span className='mr-2'>{i + 1}.</span>{title}
                </h3>
                <span className="flex-grow border-b border-dotted border-gray-400 mx-2"></span>
                <span className="whitespace-nowrap">
                    {year}
                </span>
            </Link>
            <AnimatePresence>
                {hoveredImage && (
                    <motion.div
                        className="absolute pointer-events-none"
                        style={{ top: mousePosition.y, left: mousePosition.x }}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1, transition:{ duration: 0 }}}
                        exit={{ opacity: 0, scale: 0.5, transition:{ delay: 0.5, duration: 0.25, type: 'spring', bounce: 0 }}}
                    >
                        <Image src={hoveredImage} alt="Hovered Image" className="w-48 h-auto object-cover rounded-md" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
