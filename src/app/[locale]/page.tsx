// import { VideoIntro } from "@/components";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import biombo_background from "@/assets/biombo_background.webp";
import biombo_background_mobile from "@/assets/biombo_background_mobile.webp";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default function HomePage() {
  return (
    <main className="w-full grow flex flex-col items-center">
      <h1 className="sr-only">Página Principal Mercedes Costal Prints & Patterns</h1>
      <section className="w-full min-h-svh relative bg-black">
        {/* <VideoIntro/> */}
        <Image src={biombo_background_mobile} alt="Biombo Mercedes Costal" className="lg:hidden size-full object-cover object-[0%_50%] absolute top-0 left-0"/>
        <Image src={biombo_background} alt="Biombo Mercedes Costal" className="hidden lg:block size-full object-cover absolute top-0 left-0"/>
      </section>
    </main>
  );
}