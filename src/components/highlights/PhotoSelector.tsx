'use client'

import Image, { type StaticImageData } from "next/image"
import { useState } from "react";

interface Props{
    className?: string;
    gridClassName?: string;
    photoClassName?: string;
    images: Array<StaticImageData>;
}

export const PhotoSelector = ({ images, className, gridClassName, photoClassName }: Props) => {
    const [selectedImage, setSelectedImage] = useState<StaticImageData>(images[0]);

    if(images.length === 0) return null;
    return (
        <section className={className}>
            <Image src={selectedImage} alt="Ateneo Splendid Mercedes Costal" sizes="(max-width: 1024px) 100vw, 1024px" className={photoClassName}/>
            <div className={gridClassName}>
                {images.map((image,i) => (
                    <button type="button" onClick={() => setSelectedImage(image)} className="hover:opacity-75 transition-200" key={i}>
                        <Image src={image} alt={`Mercedes Costal ${i}`} sizes="(max-width: 768px) 25vw, 150px" className="w-full aspect-[3/4] object-cover"/>
                    </button>
                ))}
            </div>
        </section>
    )
}
