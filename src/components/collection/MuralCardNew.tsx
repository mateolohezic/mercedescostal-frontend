'use client'

import { useState } from "react";
import Image from "next/image";
import { motion } from 'framer-motion';
import { Mural } from "@/interfaces";

interface Props {
    mural: Mural;
    index: number
}

export const MuralCardNew = ({ mural, index }: Props) => {

    const [isHovered, setIsHovered] = useState<boolean>(false)
    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];
    const isPattern = mural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const muralIndex = index + 1

    return (
        <div className="w-full flex flex-col">
            <h2 className="font-gillsans text-xl uppercase"><b className="font-bold">{ muralIndex > 9 ? muralIndex : `0${muralIndex}` }.</b> {isPattern ? 'Patrón' : 'Mural'} {mural.title}</h2>
            <motion.div
                className="w-full aspect-video relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Image
                    src={isHovered ? baseVariant.montaje : baseVariant.mural}
                    alt={`${mural.title} ${isHovered ? 'montaje' : 'mural'}`}
                    className="size-full object-cover absolute top-0 left-0"
                />
            </motion.div>
        </div>
    )
}