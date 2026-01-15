'use client'

import Image from "next/image";
import landmark_proceso_1 from "@/assets/proceso_creativo/landmark/landmark_proceso_1.webp";
import landmark_proceso_2 from "@/assets/proceso_creativo/landmark/landmark_proceso_2.webp";
import landmark_proceso_3 from "@/assets/proceso_creativo/landmark/landmark_proceso_3.webp";
import { Video } from "@/components";
import { useTranslations } from "next-intl";

export const ProcesoCreativoLandmark = () => {
    const t = useTranslations('pages.collections.landmark');

    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter overflow-x-hidden">
            <div className="w-full max-w-4xl flex flex-col gap-8">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_1.mp4"} className="w-full"/>
                <p className="text-lg text-justify">{t('p1')}</p>
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_2.mp4"} className="w-full"/>
                <p className="text-lg text-justify">{t('p2')}</p>
            </div>
            <div className="mt-12 w-full flex flex-col-reverse lg:flex-row items-center gap-16">
                <div className="grow flex justify-end">
                    <div className="max-w-sm">
                        <p className="text-lg text-justify lg:text-left">{t('p3')}</p>
                    </div>
                </div>
                <Image src={landmark_proceso_1} alt="Landmark Mercedes Costal" className="w-full lg:w-1/2 shrink-0 object-contain relative left-8"/>
            </div>
            <div className="mt-12 lg:mt-12 w-full max-w-4xl flex justify-center">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_3.mp4"} className="w-full max-w-md"/>
            </div>
            <div className="mt-48 w-full max-w-4xl flex flex-col gap-12">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_4.mp4"} className="w-full"/>
                    <Image src={landmark_proceso_2} alt="Landmark Mercedes Costal" className="w-full object-contain"/>
                </div>
                <p className="text-lg text-justify">{t('p4')}</p>
            </div>
            <div className="mt-12 w-full max-w-4xl flex flex-col gap-4">
                <Image src={landmark_proceso_3} alt="Landmark Mercedes Costal" className="w-full object-contain"/>
                <p className="text-lg text-justify">{t('p5')}</p>
            </div>
            <div className="mt-12 w-full max-w-4xl">
                <Video video={"/assets/proceso_creativo/landmark/landmark_proceso_5.mp4"} className="w-full"/>
            </div>
        </section>
    )
}
