'use client'

import Image from "next/image";
import morris_proceso_1 from "@/assets/proceso_creativo/morris/morris_proceso_1.webp";
import morris_proceso_2 from "@/assets/proceso_creativo/morris/morris_proceso_2.webp";
import morris_proceso_3 from "@/assets/proceso_creativo/morris/morris_proceso_3.webp";
import morris_proceso_4 from "@/assets/proceso_creativo/morris/morris_proceso_4.webp";
import morris_proceso_5 from "@/assets/proceso_creativo/morris/morris_proceso_5.webp";
import morris_proceso_6 from "@/assets/proceso_creativo/morris/morris_proceso_6.webp";
import morris_proceso_7 from "@/assets/proceso_creativo/morris/morris_proceso_7.webp";
import morris_proceso_8 from "@/assets/proceso_creativo/morris/morris_proceso_8.webp";
import morris_proceso_9 from "@/assets/proceso_creativo/morris/morris_proceso_9.webp";
import morris_proceso_10 from "@/assets/proceso_creativo/morris/morris_proceso_10.webp";
import morris_proceso_11 from "@/assets/proceso_creativo/morris/morris_proceso_11.webp";
import { useTranslations } from "next-intl";

export const ProcesoCreativoMorris = () => {
    const t = useTranslations('pages.collections.morris');

    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter">
            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24">
                <div>
                    <p className="text-lg text-justify">{t('p1')}</p>
                    <Image src={morris_proceso_3} alt="Morris Mercedes Costal" className="mt-8 lg:mt-24 lg:px-24 w-full object-contain"/>
                </div>
                <Image src={morris_proceso_1} alt="Morris Mercedes Costal" className="w-full object-contain"/>
            </div>
            <div className="mt-24 w-full max-w-5xl flex flex-col-reverse lg:flex-col gap-8">
                <Image src={morris_proceso_2} alt="Morris Mercedes Costal" className="w-full object-cover aspect-[2] object-[50%_10%]"/>
                <p className="text-lg text-justify">{t('p2')}</p>
            </div>
            <div className="mt-48 lg:mt-12 w-full max-w-2xl">
                <Image src={morris_proceso_4} alt="Morris Mercedes Costal" className="w-full object-contain"/>
                <p className="mt-8 text-lg text-center">{t('p3')}</p>
            </div>
            <div className="mt-24 w-full max-w-7xl flex flex-col lg:flex-row items-center gap-8 relative z-10">
                <Image src={morris_proceso_5} alt="Morris Mercedes Costal" className="w-full lg:w-[55%] object-contain"/>
                <p className="grow lg:pt-12 text-lg text-justify">{t('p4')}</p>
            </div>
            <div className="mt-12 lg:-mt-24 w-full flex justify-end">
                <Image src={morris_proceso_6} alt="Morris Mercedes Costal" className="w-full max-w-7xl object-contain relative left-4 lg:left-0"/>
            </div>
            <div className="mt-12 lg:-mt-24 w-full max-w-6xl flex justify-start relative z-10">
                <div className="w-full max-w-7xl flex items-center gap-8">
                    <Image src={morris_proceso_7} alt="Morris Mercedes Costal" className="max-w-2xl object-contain"/>
                    <p className="grow text-lg text-justify">{t('p5')}</p>
                </div>
            </div>
            <div className="mt-24 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="w-full flex flex-col gap-8">
                    <Image src={morris_proceso_9} alt="Morris Mercedes Costal" className="w-full object-contain"/>
                    <p className="text-lg text-justify">{t('p6')}</p>
                </div>
                <div className="lg:-mt-36 flex flex-col items-center gap-24">
                    <Image src={morris_proceso_8} alt="Morris Mercedes Costal" className="w-full object-contain"/>
                    <Image src={morris_proceso_11} alt="Morris Mercedes Costal" className="px-12 w-full object-contain"/>
                </div>
            </div>
            <div className="mt-24 w-full flex flex-col justify-center items-center gap-8">
                <Image src={morris_proceso_10} alt="Morris Mercedes Costal" className="max-w-xs object-contain"/>
                <p className="max-w-4xl text-lg text-center">{t('p7')}</p>
            </div>
        </section>
    )
}
