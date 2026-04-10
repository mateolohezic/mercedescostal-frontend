"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface ParallaxImageProps {
  src: StaticImageData;
  alt: string;
  speed?: number;
}

export const ParallaxImage = ({ src, alt, speed = 0.1 }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed * -100, speed * 100]);

  return (
    <div ref={ref} className="relative h-svh overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] -bottom-[10%]">
        <Image src={src} alt={alt} className="size-full object-cover" priority/>
      </motion.div>
      <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.08)] pointer-events-none"/>
    </div>
  );
};