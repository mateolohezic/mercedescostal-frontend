import { VideoIntro } from "@/components";
import home_1 from "@/assets/home/home_3.webp";
import home_2 from "@/assets/home/home_8.webp";
import home_3 from "@/assets/home/home_1.webp";
import home_4 from "@/assets/home/home_4.webp";
import home_5 from "@/assets/home/home_5.webp";
import home_6 from "@/assets/home/home_6.webp";
import home_7 from "@/assets/home/home_7.webp";
import home_8 from "@/assets/home/home_2.webp";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="w-full grow flex flex-col items-center">
      <h1 className="sr-only">Página Principal Mercedes Costal Prints & Patterns</h1>
      <section className="w-full min-h-svh relative">
        <VideoIntro/>
      </section>
      <section className="w-full grid grid-cols-1 md:grid-cols-2">
        <Image src={home_1} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_2} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_3} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_4} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_5} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_6} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_7} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
        <Image src={home_8} alt="Home Mercedes Costal" className="size-full object-cover aspect-[3/4] lg:aspect-auto lg:h-svh"/>
      </section>
    </main>
  );
}