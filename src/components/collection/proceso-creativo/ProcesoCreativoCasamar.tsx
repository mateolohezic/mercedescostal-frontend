'use client'

import Image from "next/image";
import casamar_proceso_1 from "@/assets/proceso_creativo/casamar/casamar_proceso_1.webp";
import casamar_proceso_2 from "@/assets/proceso_creativo/casamar/casamar_proceso_2.webp";
import casamar_proceso_3 from "@/assets/proceso_creativo/casamar/casamar_proceso_3.webp";
import casamar_proceso_4 from "@/assets/proceso_creativo/casamar/casamar_proceso_4.webp";
import casamar_proceso_5 from "@/assets/proceso_creativo/casamar/casamar_proceso_5.webp";
import casamar_proceso_6 from "@/assets/proceso_creativo/casamar/casamar_proceso_6.webp";
import casamar_proceso_7 from "@/assets/proceso_creativo/casamar/casamar_proceso_7.webp";
import casamar_proceso_8 from "@/assets/proceso_creativo/casamar/casamar_proceso_8.webp";
import casamar_proceso_9 from "@/assets/proceso_creativo/casamar/casamar_proceso_9.webp";
import casamar_proceso_10 from "@/assets/proceso_creativo/casamar/casamar_proceso_10.webp";
import casamar_proceso_11 from "@/assets/proceso_creativo/casamar/casamar_proceso_11.webp";
import casamar_proceso_12 from "@/assets/proceso_creativo/casamar/casamar_proceso_12.webp";
import casamar_proceso_13 from "@/assets/proceso_creativo/casamar/casamar_proceso_13.webp";
import casamar_proceso_14 from "@/assets/proceso_creativo/casamar/casamar_proceso_14.webp";
import casamar_proceso_15 from "@/assets/proceso_creativo/casamar/casamar_proceso_15.webp";
import casamar_proceso_16 from "@/assets/proceso_creativo/casamar/casamar_proceso_16.webp";
import casamar_proceso_17 from "@/assets/proceso_creativo/casamar/casamar_proceso_17.webp";
import casamar_proceso_18 from "@/assets/proceso_creativo/casamar/casamar_proceso_18.webp";
import casamar_proceso_19 from "@/assets/proceso_creativo/casamar/casamar_proceso_19.webp";
import casamar_proceso_20 from "@/assets/proceso_creativo/casamar/casamar_proceso_20.webp";
import { PhotoSelector, Video } from "@/components";
import { useTranslations } from "next-intl";

export const ProcesoCreativoCasamar = () => {
    const t = useTranslations('pages.collections.casamar');

    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-[55%] flex flex-col">
                    <p className="text-lg text-justify">{t('p1')}</p>
                    <Image src={casamar_proceso_1} alt="Casamar Mercedes Costal" className="mt-8 lg:mt-48 w-full object-contain"/>
                    <p className="mt-4 text-lg underline">{t('p2')}</p>
                </div>
                <div className="mt-12 lg:mt-0 grow flex flex-col">
                    <Image src={casamar_proceso_2} alt="Casamar Mercedes Costal" className="w-full object-contain"/>
                    <Image src={casamar_proceso_3} alt="Casamar Mercedes Costal" className="mt-4 lg:mt-24 w-full object-contain"/>
                    <p className="mt-4 text-lg underline">{t('p3')}</p>
                </div>
            </div>
            <div className="mt-24 lg:mt-12 max-w-xl text-lg text-justify">
                <p className="pr-4">{t('quote')}</p>
                <p className="text-right relative">{t('quoteAuthor')}</p>
            </div>
            <div className="mt-24 lg:mt-12 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="w-full flex flex-col justify-between items-center gap-8 lg:gap-24">
                    <Image src={casamar_proceso_4} alt="Casamar Mercedes Costal" className="w-full object-contain"/>
                    <Image src={casamar_proceso_5} alt="Casamar Mercedes Costal" className="w-64 object-contain"/>
                </div>
                <div className="w-full flex flex-col">
                    <Image src={casamar_proceso_6} alt="Casamar Mercedes Costal" className="my-24 lg:my-36 px-12 w-full object-contain"/>
                    <Image src={casamar_proceso_7} alt="Casamar Mercedes Costal" className="w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 w-full max-w-xl">
                <Image src={casamar_proceso_8} alt="Casamar Mercedes Costal" className="w-full object-contain"/>
                <p className="mt-4 lg:mt-8 text-lg text-center">{t('p4')}</p>
            </div>
            <div className="mt-12 w-full max-w-3xl">
                <div className="w-full grid grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-8">
                    <Image src={casamar_proceso_9} alt="Casamar Mercedes Costal" className="w-full object-contain"/>
                    <Video video={"/assets/proceso_creativo/casamar/casamar_proceso_1.mp4"}/>
                </div>
                <p className="mt-8 text-lg text-justify"><b className="underline uppercase">{t('p5Title')}</b> {t('p5')}</p>
            </div>
            <PhotoSelector images={[casamar_proceso_11, casamar_proceso_12, casamar_proceso_13, casamar_proceso_14, casamar_proceso_15, casamar_proceso_16, casamar_proceso_17, casamar_proceso_18, casamar_proceso_19, casamar_proceso_20]} photoClassName="w-full lg:w-1/2 object-contain" className="mt-12 lg:mt-24 w-full max-w-3xl flex flex-col-reverse justify-center items-start gap-4" gridClassName="w-full grid grid-cols-5 gap-1 lg:gap-4" />
            <div className="mt-4 lg:-mt-12 w-full max-w-3xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="hidden lg:block"></div>
                <Image src={casamar_proceso_10} alt="Casamar Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-48 w-full flex justify-center">
                <Video video={"/assets/proceso_creativo/casamar/casamar_proceso_2.mp4"} className="max-w-md" buttonClassName="w-full justify-center bottom-4"/>
            </div>
        </section>
    )
}
