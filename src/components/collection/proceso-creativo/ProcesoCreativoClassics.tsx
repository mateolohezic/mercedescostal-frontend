'use client'

import Image from "next/image";
import the_classics_proceso_1 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_1.webp";
import the_classics_proceso_2 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_2.webp";
import the_classics_proceso_3 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_3.webp";
import the_classics_proceso_4 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_4.webp";
import the_classics_proceso_5 from "@/assets/proceso_creativo/the_classics/the_classics_proceso_5.webp";
import { Video } from "@/components";
import { useTranslations } from "next-intl";

export const ProcesoCreativoClassics = () => {
    const t = useTranslations('pages.collections.classics');

    return (
        <section className="my-24 lg:my-48 w-full grow px-4 flex flex-col items-center font-truetypewritter">
            <div className="max-w-7xl flex flex-col lg:flex-row items-center lg:items-start gap-12">
                <div className="w-full lg:w-[45%] shrink-0 flex flex-col gap-12">
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_1.mp4"} className="w-full aspect-square rounded-full overflow-hidden" buttonClassName="justify-center bottom-4 left-0 right-0 mx-auto"/>
                    <div className="lg:hidden">
                        <p className="text-lg text-justify">{t('title')}</p>
                        <p className="mt-[1lh] text-lg text-justify">{t('p1')}</p>
                        <p className="mt-[1lh] text-lg text-justify">{t('p2')}</p>
                    </div>
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_2.mp4"} className="relative left-4 lg:left-0" buttonClassName="left-4 bottom-4"/>
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_3.mp4"}/>
                    <Image src={the_classics_proceso_3} alt="The Classics Mercedes Costal" className="w-full object-contain"/>
                    <div>
                        <p className="text-lg text-justify">{t('p3')}</p>
                        <p className="mt-[1lh] text-lg text-justify">{t('p4')}</p>
                    </div>
                </div>
                <div className="lg:pt-36 grow">
                    <div className="hidden lg:block">
                        <p className="text-lg text-justify">{t('title')}</p>
                        <p className="mt-[1lh] text-lg text-justify">{t('p1')}</p>
                        <p className="mt-[1lh] text-lg text-justify">{t('p2')}</p>
                    </div>
                    <Image src={the_classics_proceso_1} alt="The Classics Mercedes Costal" className="lg:mt-24 w-full object-contain"/>
                    <div className="mt-12 lg:mt-72 flex flex-col gap-4">
                        <Image src={the_classics_proceso_2} alt="The Classics Mercedes Costal" className="w-full object-contain"/>
                        <p className="text-lg underline">{t('p5')}</p>
                    </div>
                    <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_4.mp4"} className="mt-24 lg:mt-48"/>
                </div>
            </div>
            <div className="mt-12 lg:mt-24 max-w-7xl flex flex-col gap-4">
                <Image src={the_classics_proceso_4} alt="The Classics Mercedes Costal" className="w-full aspect-[2] object-cover"/>
                <p className="text-lg">{t('p6')}</p>
            </div>
            <div className="mt-24 max-w-3xl flex flex-col items-center">
                <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_5.mp4"} className="w-full max-w-48" buttonClassName="bottom-4 left-0 w-full justify-center"/>
                <Image src={the_classics_proceso_5} alt="The Classics Mercedes Costal" className="mt-24 w-full object-contain"/>
                <p className="mt-8 text-lg text-justify">{t('p7')}</p>
            </div>
            <div className="mt-24 max-w-3xl flex flex-col lg:flex-row items-center lg:items-end gap-8">
                <Video video={"/assets/proceso_creativo/the_classics/the_classics_proceso_6.mp4"} className="w-full lg:w-[45%] shrink-0"/>
                <div>
                    <p className="text-lg text-justify">{t('p8')}</p>
                    <p className="mt-[1lh] text-lg text-justify">{t('p9')}</p>
                </div>
            </div>
        </section>
    )
}
