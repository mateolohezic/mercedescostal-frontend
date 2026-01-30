'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Mural, Collection } from "@/interfaces";

interface Props {
    mural: Mural;
    index: number;
    collection: Collection;
}

export const MuralCardNew = ({ mural, index, collection }: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];
    const isPattern = mural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const muralIndex = index + 1

    return (
        <Link
            href={`/collections/${collection.id}/${mural.id}`}
            id={mural.id}
            className="w-full flex flex-col cursor-pointer group"
        >
            <h2 className="grow text-xl uppercase">
                {muralIndex > 9 ? muralIndex : `0${muralIndex}`}. {isPattern ? 'Pattern' : 'Mural'} {mural.title}
            </h2>
            <motion.div
                className="w-full aspect-video relative overflow-hidden"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                <Image
                    priority
                    src={baseVariant.montaje}
                    alt={`Montaje ${mural.title}`}
                    className="size-full object-cover absolute top-0 left-0 z-0 group-hover:scale-105 transition-transform duration-300"
                />
                <Image
                    src={baseVariant.mural}
                    alt={`Mural ${mural.title}`}
                    className={`size-full object-cover absolute top-0 left-0 z-10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
                />
            </motion.div>
        </Link>
    )
}
