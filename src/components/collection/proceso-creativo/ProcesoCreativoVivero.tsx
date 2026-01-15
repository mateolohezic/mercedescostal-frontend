'use client'

import Image from "next/image";
import vivero_proceso_1 from "@/assets/proceso_creativo/vivero/vivero_proceso_1.webp";
import vivero_proceso_2 from "@/assets/proceso_creativo/vivero/vivero_proceso_2.webp";
import vivero_proceso_3 from "@/assets/proceso_creativo/vivero/vivero_proceso_3.webp";
import vivero_proceso_4 from "@/assets/proceso_creativo/vivero/vivero_proceso_4.webp";
import vivero_proceso_5 from "@/assets/proceso_creativo/vivero/vivero_proceso_5.webp";
import vivero_proceso_6 from "@/assets/proceso_creativo/vivero/vivero_proceso_6.webp";
import vivero_proceso_7 from "@/assets/proceso_creativo/vivero/vivero_proceso_7.webp";
import vivero_proceso_8 from "@/assets/proceso_creativo/vivero/vivero_proceso_8.webp";
import { Video } from "@/components";
import { useTranslations } from "next-intl";

export const ProcesoCreativoVivero = () => {
    const t = useTranslations('pages.collections.vivero');

    return (
        <section className="my-24 lg:my-48 w-full grow flex flex-col items-center font-truetypewritter">
            <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Image src={vivero_proceso_1} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                <div className="w-full px-4">
                    <p className="text-lg text-justify">{t('p1')}</p>
                    <p className="mt-[1lh] text-lg text-justify">{t('p2')}</p>
                    <p className="mt-[1lh] text-lg text-justify">{t('p3')}</p>
                </div>
            </div>
            <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_3.mp4"} className="mt-12 lg:mt-24 max-w-3xl"/>
            <div className="mt-12 lg:mt-24 max-w-3xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="w-full flex flex-col gap-24">
                    <p className="text-lg text-justify">{t('p4')}</p>
                    <div className="px-12 flex flex-col gap-4">
                        <Image src={vivero_proceso_2} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg">{t('p5')}</p>
                        <Image src={vivero_proceso_3} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start gap-12">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_2.mp4"} className="h-auto"/>
                    <p className="text-lg text-justify">{t('p6')}</p>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 max-w-3xl flex flex-col gap-8">
                <Image src={vivero_proceso_4} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg text-center">{t('p7')}</p>
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_1.mp4"} className="h-auto"/>
            </div>
            <div className="mt-4 lg:mt-12 w-full max-w-4xl grid grid-cols-2 gap-4 lg:gap-12">
                <Image src={vivero_proceso_5} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_7.mp4"} className="h-auto"/>
                <div className="col-span-2 px-4 text-lg">
                    <p className="underline">{t('avistaje.title')}</p>
                    <p className="mt-[1lh]">{t('avistaje.p1')}</p>
                    <p className="mt-[1lh]">{t('avistaje.p2')}</p>
                </div>
            </div>
            <div className="mt-12 w-full max-w-4xl flex flex-col lg:flex-row items-start gap-4 lg:gap-12">
                <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_4.mp4"} className="w-full lg:max-w-xs shrink-0"/>
                <div className="grow px-4 text-lg">
                    <p className="underline">{t('reinaAna.title')}</p>
                    <p className="mt-[1lh]">{t('reinaAna.p1')}</p>
                    <p className="mt-[1lh]">{t('reinaAna.p2')}</p>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-4xl grid grid-cols-2 gap-1 lg:gap-12">
                <div className="w-full flex flex-col gap-1 lg:gap-12">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_6.mp4"}/>
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_5.mp4"}/>
                </div>
                <Image src={vivero_proceso_6} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                <div className="mt-11 lg:mt-0 col-span-2 px-4 text-lg">
                    <p className="underline">{t('laMaison.title')}</p>
                    <p className="mt-[1lh]">{t('laMaison.p1')}</p>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                <div className="w-full flex flex-col gap-4 lg:gap-8">
                    <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_8.mp4"}/>
                    <Image src={vivero_proceso_8} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                </div>
                <div className="w-full flex flex-col gap-4 lg:gap-8 text-lg">
                    <div className="lg:pt-72 px-4 lg:px-0">
                        <p>{t('laMaison.p2')}</p>
                        <p className="mt-[1lh]">{t('laMaison.p3')}</p>
                    </div>
                    <div className="w-full grow">
                        <Image src={vivero_proceso_7} alt="Vivero Mercedes Costal" className="w-full object-contain"/>
                    </div>
                    <p className="px-4 lg:px-0">{t('laMaison.p4')}</p>
                </div>
            </div>
            <Video video={"/assets/proceso_creativo/vivero/vivero_proceso_9.mp4"} className="mt-4 lg:mt-24 max-w-lg"/>
        </section>
    )
}
