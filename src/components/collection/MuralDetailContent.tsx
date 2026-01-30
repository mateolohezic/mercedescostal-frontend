'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { IoChevronBack, IoChevronDown, IoChevronUp } from "react-icons/io5";
import { usePricing } from "@/hooks/usePricing";
import { MuralVariant, Mural, Collection } from "@/interfaces";

const VariantButton = ({ variant, isSelected, onClick }: {
    variant: MuralVariant;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative size-11 shrink-0 rounded-full transition-150 hover:opacity-75 group border-2 ${isSelected ? 'border-black/50' : 'border-transparent'}`}
        >
            <div className="size-full rounded-full overflow-hidden">
                {!isLoaded && <div className="size-full rounded-full bg-gray-300 animate-pulse" />}
                <Image src={variant.mural} alt={variant.colorName} width={120} height={120} className={`size-full object-cover ${isLoaded ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setIsLoaded(true)}/>
            </div>
            <span className="sr-only">{variant.colorName}</span>
            <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-black bg-white border border-black/10 px-2 py-0.5 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-10">
                {variant.colorName}
            </div>
        </button>
    );
};

const Accordion = ({ title, children, defaultOpen = false }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-black/10">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex items-center justify-between text-left">
                <span className="uppercase font-medium">{title}</span>
                {isOpen ? <IoChevronUp className="size-5" /> : <IoChevronDown className="size-5" />}
            </button>
            <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
            >
                <div className="pb-4">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

interface Props {
    mural: Mural;
    collection: Collection;
}

export const MuralDetailContent = ({ mural, collection }: Props) => {
    const locale = useLocale();
    const t = useTranslations('products');
    const tc = useTranslations('common');
    const { getPrice, formatPrice, getCurrencyByLocale } = usePricing();
    const currency = getCurrencyByLocale(locale);

    const [selectedVariant, setSelectedVariant] = useState<MuralVariant | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const baseVariant = mural.variants.find(v => v.base) || mural.variants[0];
    const currentVariant = selectedVariant || baseVariant;
    const price = getPrice(currentVariant, mural, collection, currency);

    const hasMultipleVariants = mural.variants.length > 1;

    const images = [currentVariant.mural, currentVariant.montaje];
    const relatedMurals = collection.murales.filter(m => m.id !== mural.id).sort(() => Math.random() - 0.5).slice(0, 4);

    return (
        <main className="w-full grow flex flex-col font-truetypewritter">
            <section className="w-full min-h-screen flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 h-[60vh] lg:h-screen relative lg:sticky lg:top-0">
                    <Image src={images[selectedImageIndex]} alt={`${mural.title} ${currentVariant.colorName}`} className="size-full object-cover" priority/>
                    <p className="absolute bottom-4 left-4 text-xs text-white/80">
                        {selectedImageIndex + 1} / {images.length}
                    </p>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                        {images.map((img, idx) => (
                            <button key={idx} type="button" onClick={() => setSelectedImageIndex(idx)} className={`w-12 h-10 relative border transition-150 ${selectedImageIndex === idx ? 'border-white' : 'border-white/30 hover:border-white/60'}`}>
                                <Image src={img} alt={`${mural.title} thumbnail ${idx + 1}`} className="size-full object-cover"/>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col">
                    <div className="px-6 lg:px-12 pt-8 lg:pt-28 xl:pt-36">
                        <Link href={`/collections/${collection.id}`} className="inline-flex items-center gap-1 text-xs uppercase tracking-wider text-black/50 hover:text-black transition-150">
                            <IoChevronBack className="size-3 relative -top-0.5" />
                            <span>{collection.title}</span>
                        </Link>
                    </div>
                    <div className="grow flex flex-col items-center justify-center px-6 lg:px-12 py-12 lg:py-0 text-center">
                        <p className="font-gillsans font-light text-sm text-black/40 uppercase tracking-[0.2em]">{tc('collection')} {collection.title}</p>
                        <h1 className="mt-3 text-4xl lg:text-5xl xl:text-6xl font-gillsans font-medium">{mural.title}</h1>
                    </div>
                    <div className="px-6 lg:px-12 pb-8 lg:pb-12 flex flex-col gap-6">
                        {price && (
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-medium">{formatPrice(price, currency, locale)}</span>
                                <span className="text-sm text-black/50">/ m²</span>
                            </div>
                        )}
                        {hasMultipleVariants && (
                            <div className="flex items-center gap-2 flex-wrap">
                                {mural.variants.sort((a, b) => a.colorName.localeCompare(b.colorName)).map((variant, idx) => {
                                    const isSelected = currentVariant.colorName === variant.colorName;
                                    return (
                                        <VariantButton
                                            key={`${mural.id}-variant-${idx}`}
                                            variant={variant}
                                            isSelected={isSelected}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (!isSelected) {
                                                    setSelectedVariant(variant);
                                                    setSelectedImageIndex(0);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                        <Link href={`/quote?mural=${mural.id}`} className="block w-full text-center px-6 py-4 bg-black font-gillsans font-medium text-white text-lg uppercase hover:bg-black/80 transition-150">
                            {locale === 'es' ? 'Cotizar' : 'Get Quote'}
                        </Link>
                    </div>
                </div>
            </section>
            {relatedMurals.length > 0 &&
                <section className="w-full px-6 lg:px-12 py-12 lg:py-16">
                    <h2 className="text-2xl font-gillsans font-medium uppercase mb-8">
                        {locale === 'es' ? `Más de ${collection.title}` : `More from ${collection.title}`}
                    </h2>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                        {relatedMurals.map((relatedMural) => {
                            const relatedBaseVariant = relatedMural.variants.find(v => v.base) || relatedMural.variants[0];
                            const relatedIsPattern = relatedMural.keywords.some(k => ['patrón', 'patron', 'pattern'].includes(k.toLowerCase()));
                            return (
                                <Link key={relatedMural.id} href={`/collections/${collection.id}/${relatedMural.id}`} className="group">
                                    <div className="w-full aspect-video relative overflow-hidden">
                                        <Image src={relatedBaseVariant.montaje} alt={relatedMural.title} className="size-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                                    </div>
                                    <p className="mt-2 text-sm uppercase">
                                        {relatedIsPattern ? 'Pattern' : 'Mural'} {relatedMural.title}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            }
            <section className="w-full px-6 lg:px-12 py-12 lg:py-16 border-t border-black/10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    <div className="lg:w-1/3">
                        <h2 className="text-2xl font-gillsans font-medium uppercase lg:sticky lg:top-24">
                            {locale === 'es' ? 'Información técnica' : 'Technical information'}
                        </h2>
                    </div>
                    <div className="lg:w-2/3">
                        <Accordion title={t('specifications.finish')} defaultOpen>
                            <ul className="flex flex-col gap-3 text-sm">
                                <li><b className="uppercase">{t('specifications.finish')}:</b> {t('specifications.finishValue')}</li>
                                <li><b className="uppercase">{t('specifications.substrate')}:</b> {t('specifications.substrateValue')}</li>
                                <li><b className="uppercase">{t('specifications.weight')}:</b> {t('specifications.weightValue')}</li>
                                <li><b className="uppercase">{t('specifications.width')}:</b> {t('specifications.widthValue')}</li>
                                <li><b className="uppercase">{t('specifications.dimensions')}:</b> {t('specifications.dimensionsValue')}</li>
                            </ul>
                        </Accordion>
                        <Accordion title={locale === 'es' ? 'Uso recomendado' : 'Recommended use'}>
                            <ul className="flex flex-col gap-3 text-sm">
                                <li><b className="uppercase">{t('specifications.suitableFor')}:</b> {t('specifications.suitableForValue')}</li>
                                <li><b className="uppercase">{t('specifications.deliveryTime')}:</b> {t('specifications.deliveryTimeValue')}</li>
                                <li className="uppercase">{t('specifications.customization')}</li>
                                <li className="uppercase">{t('specifications.shipping')}</li>
                            </ul>
                        </Accordion>
                        <Accordion title={locale === 'es' ? 'Documentación' : 'Documentation'}>
                            <Link href="/assets/ficha_tecnica_mercedes_costal.pdf" target="_blank" rel="noopener noreferrer" className="text-sm border-b border-black uppercase hover:opacity-70 transition-150">
                                {t('specifications.technicalSheet')}
                            </Link>
                        </Accordion>
                    </div>
                </div>
            </section>
        </main>
    );
};
