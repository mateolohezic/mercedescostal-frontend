"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface HorizontalScrollSectionProps {
  images: StaticImageData[];
  alt?: string;
  scrollMultiplier?: number; // 1 = normal, 2 = más rápido, 0.5 = más lento
}

export const HorizontalScrollSection = ({ 
  images, 
  alt = "Mercedes Costal",
  scrollMultiplier = 1
}: HorizontalScrollSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const totalWidth = images.length * 100;
  const translateAmount = ((images.length - 1) / images.length) * 100;
  
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `-${translateAmount}%`]
  );

  // Altura del contenedor = controla cuánto scroll vertical necesitás
  const containerHeight = (images.length * 100) / scrollMultiplier;

  return (
    <div 
      ref={containerRef} 
      className="relative"
      style={{ height: `${containerHeight}vh` }}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div 
          className="h-full flex"
          style={{ x, width: `${totalWidth}%` }}
        >
          {images.map((src, index) => (
            <div 
              key={index} 
              className="relative h-full shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                className="size-full object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.08)] pointer-events-none"/>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};