'use client'

import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import '../styles/swiper.css';
import { motion } from 'framer-motion';
import foto1 from '@/assets/home/portada/portada_1.webp'
import foto2 from '@/assets/home/portada/portada_2.webp'
import foto3 from '@/assets/home/portada/portada_3.webp'
import foto4 from '@/assets/home/portada/portada_4.webp'
import foto5 from '@/assets/home/portada/portada_5.webp'
import foto6 from '@/assets/home/portada/portada_6.webp'
import foto7 from '@/assets/home/portada/portada_7.webp'
import Link from "next/link";

interface Foto{
    img: StaticImageData;
    title: string
}

const fotos:Array<Foto> = [
    { img: foto1, title: 'Colección Vivero' },
    { img: foto2, title: 'Blue Willow' },
    { img: foto3, title: 'Colección Basa Basa' },
    { img: foto4, title: 'El Banquete' },
    { img: foto5, title: 'El descanso de las garzas' },
    { img: foto6, title: 'El jardín de edén' },
    { img: foto7, title: 'El bosque de los magos' },
]

export const PortadaHome = () => {
    
    const breakpoints = {
        // when window width is >= 320px
        320: {
          slidesPerView: 1
        }
    }

    return (
        <div className="w-full">
            <Swiper
                breakpoints={breakpoints}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: true,
                }}
                spaceBetween={16}
                freeMode={{
                    enabled: true,
                    momentumBounceRatio: 2,
                    momentumRatio: 2
                }}
                modules={[Autoplay, FreeMode]}
                className="w-full min-h-svh"
            >
                {
                    fotos.map(({img, title}:Foto, i:number) => (
                        <SwiperSlide key={i}>
                            {/* <Link href={'/'} aria-label={`Navegar a Colección`} className="group"> */}
                                <div className="w-full min-h-svh flex justify-center items-end group">
                                    <div className="size-full absolute top-0 left-0 overflow-hidden">
                                        <Image src={img} alt='Colección Mercedes Costal' className="size-full object-cover relative z-0 scale-[1.025] group-hover:scale-[1] transition-all duration-200 ease-in-out"/>
                                    </div>
                                    <div className="w-full max-w-7xl px-4 xl:px-0 flex flex-col justify-center items-center lg:items-start relative z-20 overflow-visible pb-24">
                                        <motion.div
                                            initial={{ opacity:0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ opacity:{ delay:0.25, duration: 0.25 }}}
                                            className="flex flex-col justify-center items-center lg:items-start"
                                        >
                                            <h2 className="w-full text-4xl lg:text-3xl text-start font-light bg-[rgba(255,255,255,0.5)] py-2 px-4">{title}</h2>
                                        </motion.div>
                                    </div>
                                </div>
                            {/* </Link> */}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
