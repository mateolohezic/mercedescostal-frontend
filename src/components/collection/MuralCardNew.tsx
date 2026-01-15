'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { usePricing } from '@/hooks/usePricing';
import { Mural, MuralVariant, Collection } from "@/interfaces";
import { Modal } from "@/components";

interface Props {
    mural: Mural;
    index: number;
    collection: Collection;
}

export const MuralCardNew = ({ mural, index, collection }: Props) => {

    const locale = useLocale();
    const t = useTranslations('products');
    const { getPrice, formatPrice, getCurrencyByLocale } = usePricing();
    const currency = getCurrencyByLocale(locale);

    const [showModal, setShowModal] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(false)
    const [isHoveredModal, setIsHoveredModal] = useState<boolean>(false)
    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];
    const [selectedVariant, setSelectedVariant] = useState<MuralVariant>(baseVariant)
    const isPattern = mural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
    const muralIndex = index + 1
    const price = getPrice(selectedVariant, mural, collection, currency);

    return ( <>
        <div id={mural.id} className="w-full flex flex-col cursor-pointer" onClick={ () => setShowModal(true) }>
            <h2 className="grow text-xl uppercase">{ muralIndex > 9 ? muralIndex : `0${muralIndex}` }. {isPattern ? 'Pattern' : 'Mural'} {mural.title}</h2>
            <motion.div
                className="w-full aspect-video relative"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                >
                    <Image priority src={baseVariant.montaje} alt={`Montaje ${mural.title}`} className="size-full object-cover absolute top-0 left-0 z-0"/>
                    <Image src={baseVariant.mural} alt={`Mural ${mural.title}`} className={`size-full object-cover absolute top-0 left-0 z-10 ${isHovered ? "opacity-100" : "opacity-0"}`}/>
            </motion.div>
        </div>
        <Modal
            className="w-full min-h-screen xl:min-h-0"
            showModal={showModal}
            setShowModal={setShowModal}
        >
            <div className="size-full flex flex-col-reverse xl:flex-row justify-center items-stretch">
                <div className="w-full xl:w-auto xl:grow xl:pr-12">
                    <div className="size-full relative overflow-y-auto">
                        <motion.div
                            onHoverStart={() => setIsHoveredModal(true)}
                            onHoverEnd={() => setIsHoveredModal(false)}
                            className="size-full xl:absolute xl:top-0 xl:left-0"
                        >
                            <Image src={selectedVariant.mural} alt={`Mural ${selectedVariant.colorName} ${mural.title}`} className="hidden xl:block size-full xl:absolute xl:top-0 xl:left-0 object-cover z-0"/>
                            <Image src={selectedVariant.montaje} alt={`Montaje ${selectedVariant.colorName} ${mural.title}`} className={`hidden xl:block size-full xl:absolute xl:top-0 xl:left-0 object-cover z-10 ${isHoveredModal ? "opacity-100" : "opacity-0"}`}/>
                        </motion.div>
                    </div>
                </div>
                <div className="w-full xl:max-w-xl xl:p-4 xl:pt-12 flex flex-col">
                    <Image src={selectedVariant.mural} alt={`Mural ${mural.title} ${selectedVariant.colorName}`} className="xl:hidden w-full object-contain"/>
                    <div className="w-full grow p-6 xl:p-0">
                        <p className="font-gillsans font-light text-sm text-black/50 uppercase tracking-widest">Colección {mural.collectionTitle}</p>
                        <h2 className="text-3xl font-gillsans font-medium uppercase">{mural.title}</h2>
                        {(mural.collectionId === "casamar" || mural.collectionId === "artisan" || mural.collectionId === "mesopotamia" || mural.collectionId === "tienda-marlo") && mural.variants.length > 1 && (
                            <div className="mt-4 w-full flex items-center gap-3 overflow-x-auto py-2">
                                {mural.variants.sort((a, b) => a.colorName.localeCompare(b.colorName)).map((variant, idx) => {
                                    const isSelected = selectedVariant.colorName === variant.colorName;
                                    return (
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                !isSelected && setSelectedVariant(variant);
                                            }}
                                            key={`${mural.id}-variant-${idx}`}
                                            className={`relative size-10 xl:size-8 shrink-0 rounded-full transition-150 hover:opacity-75 group border-2 ${isSelected ? 'border-black/50' : 'border-transparent'}`}
                                        >
                                            <div className="size-full rounded-full overflow-hidden">
                                                <Image
                                                    src={variant.mural}
                                                    alt={variant.colorName}
                                                    className="size-full object-cover"
                                                />
                                            </div>
                                            <span className="sr-only">{variant.colorName}</span>
                                            <div className="hidden xl:block absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-black bg-white border border-black/10 px-2 py-0.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10">
                                                {variant.colorName}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                        <ul className="mt-8 flex flex-col gap-4">
                            <li><b className="uppercase block">{t('specifications.finish')}</b> {t('specifications.finishValue')}</li>
                            <li><b className="uppercase block">{t('specifications.substrate')}</b> {t('specifications.substrateValue')}</li>
                            <li><b className="uppercase block">{t('specifications.weight')}</b> {t('specifications.weightValue')}</li>
                            <li><b className="uppercase block">{t('specifications.width')}</b> {t('specifications.widthValue')}</li>
                            <li><b className="uppercase block">{t('specifications.dimensions')}</b> {t('specifications.dimensionsValue')}</li>
                            <li><b className="uppercase block">{t('specifications.suitableFor')}</b> {t('specifications.suitableForValue')}</li>
                            <li><b className="uppercase block">{t('specifications.deliveryTime')}</b> {t('specifications.deliveryTimeValue')}</li>
                            <li className="uppercase">{t('specifications.customization')}</li>
                            <li className="uppercase">{t('specifications.shipping')}</li>
                            <li>
                                <Link
                                    href="/assets/ficha_tecnica_mercedes_costal.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-fit border-b border-black uppercase"
                                >{t('specifications.technicalSheet')}</Link>
                            </li>
                        </ul>
                        {price && (
                            <div className="mt-6 p-4 border border-black/10">
                                <div className="flex justify-between items-center">
                                    <span className="uppercase font-medium text-sm">
                                        {t('pricing.pricePerSqm')}
                                    </span>
                                </div>
                                <p className="mt-2 text-2xl font-medium">
                                    {formatPrice(price, currency, locale)}
                                </p>
                                <p className="text-xs text-black/50 mt-1">
                                    {t('pricing.indicativePrice')}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="xl:mt-8 w-full p-6 xl:p-0 flex justify-center xl:justify-end">
                        <Link href={`/quote?mural=${mural.id}`} className="px-4 py-2 bg-black font-gillsans font-medium text-white text-lg uppercase">Cotizar</Link>
                    </div>
                </div>
            </div>
        </Modal>
    </> )
}