// Hero de la home. Antes era un <video> autoplay; ahora es imagen fija con dos
// variantes responsive (desktop apaisada, mobile vertical) porque el user prefiere
// mostrar el ad de lanzamiento -15% como portada del sitio.
// El nombre del archivo/export se mantiene ("VideoIntro") para no romper imports.

import Image from "next/image";

const DESKTOP_SRC = "/assets/hero_desktop.jpg";
const MOBILE_SRC = "/assets/hero_mobile.jpg";

export const VideoIntro = () => {
    return (
        <div className="size-full bg-black absolute top-0 left-0 z-0">
            <div className="size-full relative">
                {/* Mobile: imagen vertical */}
                <Image
                    src={MOBILE_SRC}
                    alt="Mercedes Costal — 15% OFF de lanzamiento"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center pointer-events-none select-none lg:hidden"
                />
                {/* Desktop: imagen apaisada */}
                <Image
                    src={DESKTOP_SRC}
                    alt="Mercedes Costal — 15% OFF de lanzamiento"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center pointer-events-none select-none hidden lg:block"
                />
            </div>
        </div>
    );
};
