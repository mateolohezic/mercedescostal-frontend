'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import '../styles/swiper.css'
import Image, { StaticImageData } from 'next/image';
import { motion }  from 'framer-motion';
import foto1 from '@/assets/nosotros/nosotros_1.webp'
import foto2 from '@/assets/nosotros/nosotros_2.webp'
import foto3 from '@/assets/nosotros/nosotros_3.webp'
import foto4 from '@/assets/nosotros/nosotros_4.webp'
import foto5 from '@/assets/nosotros/nosotros_5.webp'
import foto6 from '@/assets/nosotros/nosotros_6.webp'
import foto7 from '@/assets/nosotros/nosotros_7.webp'

interface Foto{
    img: StaticImageData
}

export const NosotrosSwiper = () => {

    const breakpoints = {
        320: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        768: {
          slidesPerView: 2
        },
        1024: {
          slidesPerView: 3
        },
        1280: {
          slidesPerView: 3
        },
        1536: {
          slidesPerView: 4
        },
    }

    const fotos:Array<Foto> = [
        {img: foto1},
        {img: foto2},
        {img: foto3},
        {img: foto4},
        {img: foto5},
        {img: foto6},
        {img: foto7}
    ]

    return (
        <motion.section
            className='w-full mt-8'
            initial={{ opacity: 0, y: 300 }}
            whileInView={{ opacity: 1, y: 0}}
            viewport={{ once: true }}
            transition={{
                bounce: 0.5,
                duration: 0.75,
                type: 'spring',
            }}
        >
            <Swiper
                breakpoints={breakpoints}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: true,
                }}
                freeMode={{
                    enabled: true,
                    momentumBounceRatio: 2,
                    momentumRatio: 2
                }}
                modules={[Autoplay, FreeMode]}
                className="w-full h-full"
            >
                {
                    fotos.map( ({img}, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full">
                                <Image src={img} alt={'Nosotros Down is up'} className="size-full object-cover aspect-[4/3]"/>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </motion.section>
    )
}
