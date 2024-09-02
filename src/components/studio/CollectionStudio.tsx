'use client'

import foto1 from '@/assets/home/portada/portada_1.webp'
import foto2 from '@/assets/home/portada/portada_2.webp'
import foto3 from '@/assets/home/portada/portada_3.webp'
import foto4 from '@/assets/home/portada/portada_4.webp'
import foto5 from '@/assets/home/portada/portada_5.webp'
import foto6 from '@/assets/home/portada/portada_6.webp'
import foto7 from '@/assets/home/portada/portada_7.webp'
import { StaticImageData } from "next/image"
import { LayoutHandlerStudio } from "./LayoutHandlerStudio"

interface Collection{
    img: StaticImageData;
    title: string;
    year: string
}

interface Option{
    title: 'Covers'|'Grid'|'List'|'Scroll';
    value: 'cover'|'grid'|'list'|'scroll'
}

const options: Array<Option> = [
    { title: 'Covers', value: 'cover' },
    { title: 'Grid', value: 'grid' },
    { title: 'List', value: 'list' },
    { title: 'Scroll', value:'scroll' },
];

const collections:Array<Collection> = [
    { img: foto1, title: 'Colección Vivero', year: '2023' },
    { img: foto2, title: 'Blue Willow', year: '2014' },
    { img: foto3, title: 'Colección Basa Basa', year: '2021' },
    { img: foto4, title: 'El Banquete', year: '2019' },
    { img: foto5, title: 'El descanso de las garzas', year: '2024' },
    { img: foto6, title: 'El jardín de edén', year: '2022' },
    { img: foto7, title: 'El bosque de los magos', year: '2001' },
]

export const CollectionStudio = () => {

    return (
        <section className="w-full grow relative mt-24 flex flex-col justify-start items-center">
            <LayoutHandlerStudio options={options} collections={collections}/>
        </section>
    )
}