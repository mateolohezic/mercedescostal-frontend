'use client'

import Image from "next/image";
import { motion } from 'framer-motion';
import foto from "@/assets/collections/basa_basa/basa_basa/basa_basa_mural.webp";
import foto2 from "@/assets/collections/basa_basa/basa_basa/basa_basa_montaje.webp";
import { useState } from "react";

export const MuralCardNew = () => {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    return (
        <div className="w-full flex flex-col">
            <h2 className="font-gillsans text-xl uppercase"><b className="font-bold">01.</b> Mural Basa Basa</h2>
            <motion.div
                className="w-full aspect-video relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                { isHovered ?
                    <Image src={foto2} alt="" className="size-full object-cover absolute top-0 left-0"/>
                :
                    <Image src={foto} alt="" className="size-full object-cover absolute top-0 left-0"/>
                }
            </motion.div>
        </div>
    )
}