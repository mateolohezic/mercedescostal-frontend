'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Mural } from "@/interfaces";
import { Modal } from "@/components";
import ejemplo1 from "@/assets/ejemplo/ejemplo1.webp";
import ejemplo2 from "@/assets/ejemplo/ejemplo2.webp";
import ejemplo3 from "@/assets/ejemplo/ejemplo3.webp";
import ejemplo4 from "@/assets/ejemplo/ejemplo4.webp";
import ejemplo5 from "@/assets/ejemplo/ejemplo5.webp";
import ejemplo6 from "@/assets/ejemplo/ejemplo6.webp";
interface Props {
    mural: Mural;
    index: number
}

export const MuralCardNew = ({ mural, index }: Props) => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];
    const isPattern = mural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const muralIndex = index + 1

    return (
        <>
        <div
            className="w-full flex flex-col cursor-pointer"
            onClick={ () => setShowModal(true) }
        >
            <h2 className="text-xl uppercase">{ muralIndex > 9 ? muralIndex : `0${muralIndex}` }. {isPattern ? 'Patrón' : 'Mural'} {mural.title}</h2>
            <motion.div
                className="w-full aspect-video relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                >
                <Image
                    src={isHovered ? baseVariant.mural : baseVariant.montaje}
                    alt={`${mural.title} ${isHovered ? 'montaje' : 'mural'}`}
                    className="size-full object-cover absolute top-0 left-0"
                    />
            </motion.div>
        </div>
        <Modal
            className="w-full h-screen"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className="size-full flex justify-center items-stretch">
                <div className="grow pr-12">
                    <div className="size-full relative overflow-y-auto">
                        <div className="size-full absolute top-0 left-0">
                            <Image src={ejemplo1} alt="Ejemplo" className="w-full object-contain"/>
                            <div className="w-full grid grid-cols-2">
                                <Image src={ejemplo2} alt="Ejemplo" className="w-full object-contain"/>
                                <Image src={ejemplo3} alt="Ejemplo" className="w-full object-contain"/>
                                <Image src={ejemplo4} alt="Ejemplo" className="w-full object-contain"/>
                                <Image src={ejemplo5} alt="Ejemplo" className="w-full object-contain"/>
                                <Image src={ejemplo6} alt="Ejemplo" className="w-full object-contain"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-xl pt-12 pb-4 px-4 flex flex-col">
                    <div className="w-full grow">
                        <p className="font-gillsans font-light text-sm text-black/50 uppercase tracking-widest">Colección {mural.collectionTitle}</p>
                        <h2 className="text-3xl font-gillsans font-medium uppercase">{mural.title}</h2>
                        <p className="mt-4 text-xl leading-none">$ { isPattern ? "66.000" : "85.800"}</p>
                        <p className="text-xs text-black/50 leading-none">Precio final por m²</p>
                        <ul className="mt-8 flex flex-col gap-4">
                            <li><b className="uppercase block">Terminación</b> canvas simil lino</li>
                            <li><b className="uppercase block">Tipo de sustrato</b> sustrato no tejido con recubrimiento de vinilo</li>
                            <li><b className="uppercase block">Gramaje</b> 220 grs/m² según partida</li>
                            <li><b className="uppercase block">Ancho de paño</b> 50cm / 100 cm</li>
                            <li><b className="uppercase block">Dimensiones</b> a medida (m²)</li>
                            <li><b className="uppercase block">Apto para</b> interiores, oficinas, hoteles, gimnasios, restaurantes, colegios, etc</li>
                            <li><b className="uppercase block">Plazo de entrega</b> a partir de 15 días</li>
                            <li className="uppercase">Consultar posibilidad de personalización</li>
                            <li className="uppercase">Envío e instalación no incluidos</li>
                            <li>
                                <Link href={"/"} className="w-fit border-b border-black">VER FICHA TÉCNICA</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full flex justify-end">
                        <Link href={`/quote?mural=${mural.id}`} className="mt-8 block w-fit px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">Take it home</Link>
                    </div>
                </div>
            </div>
        </Modal>
        </>
    )
}