'use client'

import Image from "next/image";
import basa_basa_proceso_1 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_1.webp";
import basa_basa_proceso_2 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_2.webp";
import basa_basa_proceso_3 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_3.webp";
import basa_basa_proceso_4 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_4.webp";
import basa_basa_proceso_5 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_5.webp";
import basa_basa_proceso_6 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_6.webp";
import basa_basa_proceso_7 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_7.webp";
import basa_basa_proceso_8 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_8.webp";
import basa_basa_proceso_9 from "@/assets/proceso_creativo/basa_basa/basa_basa_proceso_9.webp";
import { Video } from "@/components";
import { useTranslations } from "next-intl";

export const ProcesoCreativoBasaBasa = () => {
    const t = useTranslations('pages.collections.basaBasa');

    return (
        <section className="my-24 lg:my-48 w-full grow px-4 lg:px-0 flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-5xl flex flex-col lg:flex-row items-start gap-12">
                <Video video={"/assets/proceso_creativo/basa_basa/basa_basa_proceso_1.mp4"} className="w-full lg:max-w-sm shrink-0"/>
                <p className="grow text-lg text-justify">{t('p1')}</p>
            </div>
            <Image src={basa_basa_proceso_8} alt="Basa Basa Mercedes Costal" className="mt-12 lg:-mt-12 w-full max-w-2xl object-contain relative z-10"/>
            <div className="mt-12 lg:mt-24 max-w-3xl">
                <p className="text-lg text-center">{t('p2')}</p>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-4xl flex flex-col lg:flex-row gap-4">
                <div className="grow flex flex-col gap-4">
                    <Image src={basa_basa_proceso_1} alt="Basa Basa Mercedes Costal" className="w-full lg:w-auto lg:h-80 object-contain"/>
                    <p className="text-lg text-left">{t('p3')}</p>
                    <Image src={basa_basa_proceso_9} alt="Basa Basa Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full lg:w-80 shrink-0 flex flex-col gap-4">
                    <Image src={basa_basa_proceso_2} alt="Basa Basa Mercedes Costal" className="w-full lg:w-auto lg:h-80 object-contain"/>
                    <Image src={basa_basa_proceso_3} alt="Basa Basa Mercedes Costal" className="mt-20 lg:mt-0 w-full px-24 object-contain"/>
                </div>
            </div>
            <div className="mt-24 lg:mt-48 w-full max-w-md">
                <Video video={"/assets/proceso_creativo/basa_basa/basa_basa_proceso_2.mp4"} className="w-full"/>
            </div>
            <Image src={basa_basa_proceso_4} alt="Basa Basa Mercedes Costal" className="mt-4 lg:mt-48 w-full max-w-4xl object-contain"/>
            <p className="mt-4 lg:mt-8 max-w-5xl text-lg">{t('p4')}</p>
            <div className="mt-4 lg:mt-8 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <Image src={basa_basa_proceso_6} alt="Basa Basa Mercedes Costal" className="w-full object-contain"/>
                <Image src={basa_basa_proceso_7} alt="Basa Basa Mercedes Costal" className="w-full object-contain"/>
            </div>
            <p className="mt-8 max-w-5xl text-lg">{t('p5')}</p>
            <div className="mt-12 lg:mt-24 w-full grid grid-cols-1 lg:grid-cols-2 relative right-4">
                <Image src={basa_basa_proceso_5} alt="Basa Basa Mercedes Costal" className="w-full object-contain"/>
            </div>
        </section>
    )
}
