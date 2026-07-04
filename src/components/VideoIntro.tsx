// Hero de la home. Antes era un <video> autoplay; ahora es imagen fija con dos
// variantes responsive (desktop apaisada, mobile vertical) porque el user prefiere
// mostrar el ad de lanzamiento -15% como portada del sitio.
// El nombre del archivo/export se mantiene ("VideoIntro") para no romper imports.

import Image from "next/image";
import heroDesktop from "@/assets/home/hero_desktop.webp";
import heroMobile from "@/assets/home/hero_mobile.webp";

export const VideoIntro = () => {
    return (
        <div className="size-full bg-black absolute top-0 left-0 z-0">
            <div className="size-full relative">
                {/* Mobile: imagen vertical */}
                <Image
                    src={heroMobile}
                    alt="Mercedes Costal — 15% OFF de lanzamiento"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center pointer-events-none select-none lg:hidden"
                />
                {/* Desktop: imagen apaisada. object-right para que el texto de la
                    derecha (15% OFF + fecha) SIEMPRE quede visible aunque el viewport
                    se angoste (tablets, ventanas chicas). Se recorta por la izquierda. */}
                <Image
                    src={heroDesktop}
                    alt="Mercedes Costal — 15% OFF de lanzamiento"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-right pointer-events-none select-none hidden lg:block"
                />
            </div>
        </div>
    );
};
