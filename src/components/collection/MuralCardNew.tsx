'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { Mural, MuralVariant } from "@/interfaces";
import { Modal } from "@/components";

interface Props {
    mural: Mural;
    index: number
}

export const MuralCardNew = ({ mural, index }: Props) => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isHoveredModal, setIsHoveredModal] = useState<boolean>(false)
    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];
    const [selectedVariant, setSelectedVariant] = useState<MuralVariant>(baseVariant)
    const isPattern = mural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const muralIndex = index + 1

    return (
        <>
        <div
            id={mural.id}
            className="w-full flex flex-col cursor-pointer"
            onClick={ () => setShowModal(true) }
        >
            <h2 className="grow text-xl uppercase">{ muralIndex > 9 ? muralIndex : `0${muralIndex}` }. {isPattern ? 'Pattern' : 'Mural'} {mural.title}</h2>
            <motion.div
                className="w-full aspect-video relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                >
                    <Image
                        priority
                        src={baseVariant.montaje}
                        alt={`Montaje ${mural.title}`}
                        className="size-full object-cover absolute top-0 left-0 z-0"
                    />
                    <Image
                        src={baseVariant.mural}
                        alt={`Mural ${mural.title}`}
                        className={`size-full object-cover absolute top-0 left-0 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`}
                    />
            </motion.div>
        </div>
        <Modal
            className="w-full min-h-screen lg:min-h-0"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className="size-full flex flex-col-reverse lg:flex-row justify-center items-stretch">
                <div className="w-full lg:w-auto lg:grow lg:pr-12">
                    <div className="size-full relative overflow-y-auto">
                        <motion.div
                            onHoverStart={() => setIsHoveredModal(true)}
                            onHoverEnd={() => setIsHoveredModal(false)}
                            className="size-full lg:absolute lg:top-0 lg:left-0"
                        >
                            <Image
                                src={selectedVariant.mural}
                                alt={`Mural ${selectedVariant.colorName} ${mural.title}`}
                                className="hidden lg:block size-full lg:absolute lg:top-0 lg:left-0 object-cover z-0"
                            />
                            <Image
                                src={selectedVariant.montaje}
                                alt={`Montaje ${selectedVariant.colorName} ${mural.title}`}
                                className={`hidden lg:block size-full lg:absolute lg:top-0 lg:left-0 object-cover z-10 ${isHoveredModal ? "opacity-100" : "opacity-0"}`}
                            />
                        </motion.div>
                    </div>
                </div>
                <div className="w-full max-w-xl lg:p-4 lg:pt-12 flex flex-col">
                    <Image src={selectedVariant.mural} alt={`Mural ${mural.title} ${selectedVariant.colorName}`} className="lg:hidden w-full object-contain"/>
                    <div className="w-full grow p-6 lg:p-0">
                        <p className="font-gillsans font-light text-sm text-black/50 uppercase tracking-widest">Colección {mural.collectionTitle}</p>
                        <h2 className="text-3xl font-gillsans font-medium uppercase">{mural.title}</h2>
                        {/* <p className="mt-4 text-xl leading-none">$ { isPattern ? "74.000" : "85.800"}</p>
                        <p className="text-xs text-black/50 leading-none">Precio final por m²</p> */}
                        {(mural.collectionId === "casamar" || mural.collectionId === "artisan") && mural.variants.length > 1 && (
                            <div className="mt-4 flex items-center gap-2">
                                {mural.variants.sort((a, b) => a.colorName.localeCompare(b.colorName)).map((variant, idx) => {
                                    const isSelected = variant.color === selectedVariant.color;
                                    return (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                !isSelected && setSelectedVariant(variant);
                                            }}
                                            key={`${mural.id}-variant-${idx}`}
                                            className={`relative size-8 lg:size-6 shrink-0 rounded-full transition-150 ${variant.color ?? ''} hover:opacity-75 group`} 
                                        >
                                            { !isSelected &&
                                                <div className="size-full flex justify-center items-center absolute top-0 left-0">
                                                    <div className="size-5 lg:size-4 rounded-full bg-white"/>
                                                </div>
                                            }
                                            <span className="sr-only">{variant.colorName}</span>
                                            <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-black bg-white border border-black/10 px-2 py-0.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200">
                                                {variant.colorName}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                        <ul className="mt-8 flex flex-col gap-4">
                            <li><b className="uppercase block">Terminación</b> canvas simil lino</li>
                            <li><b className="uppercase block">Tipo de sustrato</b> sustrato no tejido con recubrimiento de vinilo</li>
                            <li><b className="uppercase block">Gramaje</b> 220 grs/m² según partida</li>
                            <li><b className="uppercase block">Ancho de paño</b> 50cm / 100 cm</li>
                            <li><b className="uppercase block">Dimensiones</b> a medida (m²)</li>
                            <li><b className="uppercase block">Apto para</b> interiores, oficinas, hoteles, gimnasios, restaurantes, colegios, etc</li>
                            <li><b className="uppercase block">Plazo de entrega</b> a partir de 10 días hábiles</li>
                            <li className="uppercase">Consultar posibilidad de personalización</li>
                            <li className="uppercase">Envío e instalación no incluidos</li>
                            <li>
                                <Link
                                    href="/assets/ficha_tecnica_mercedes_costal.pdf" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="w-fit border-b border-black uppercase"
                                >Ver ficha técnica</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="lg:mt-8 w-full p-6 lg:p-0 flex justify-center lg:justify-end">
                        <Link href={`/quote?mural=${mural.id}`} className="px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">Cotizar</Link>
                    </div>
                </div>
            </div>
        </Modal>
        </>
    )
}