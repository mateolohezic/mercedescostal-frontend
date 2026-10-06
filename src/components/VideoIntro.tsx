'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";
import { useLazyVideo } from "@/hooks/useLazyVideo";

// Casa FOA 2026 (Palacio Molina). El horizontal es 16:9 y el mobile es el
// master vertical 9:16, no un recorte del horizontal.
const DESKTOP_SRC = "/assets/portada_foa.mp4";
const MOBILE_SRC = "/assets/portada_foa_mobile.mp4";
const DESKTOP_POSTER = "/assets/portada_foa_poster.webp";
const MOBILE_POSTER = "/assets/portada_foa_poster_mobile.webp";

export const VideoIntro = () => {
    const { videoRef, containerRef, shouldLoad, isMuted, isPlaying, toggleMute, togglePlayPause } = useLazyVideo({ eager: true });
    const [videoSrc, setVideoSrc] = useState<string | null>(null);
    const [posterSrc, setPosterSrc] = useState<string | undefined>(undefined);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 768px)');
        setVideoSrc(mq.matches ? MOBILE_SRC : DESKTOP_SRC);
        setPosterSrc(mq.matches ? MOBILE_POSTER : DESKTOP_POSTER);
    }, []);

    useEffect(() => {
        if (videoSrc && videoRef.current) {
            videoRef.current.load();
        }
    }, [videoSrc, videoRef]);

    return (
        <div ref={containerRef} className="size-full bg-black absolute top-0 left-0 z-0">
            <div className="size-full relative">
                <div className="absolute inset-0 lg:inset-auto lg:top-2/3 w-full flex items-center lg:items-start justify-center z-50 cta-video-appear">
                    <Link
                        href="/collections"
                        className="group flex flex-col items-center gap-2 transition-all duration-500"
                    >
                        <span className="text-white font-gillsans uppercase tracking-[0.5rem] text-sm lg:text-2xl transition-all duration-500 ease-out whitespace-nowrap [text-shadow:0_1px_4px_rgba(0,0,0,0.12)]">
                            Explorar Wallpapers
                        </span>
                        <span className="h-px w-8 group-hover:w-full bg-white/70 group-hover:bg-white transition-all duration-700 ease-out [filter:drop-shadow(0_1px_4px_rgba(0,0,0,0.5))]" />
                    </Link>
                </div>
                <div className="flex justify-center items-center gap-4 absolute bottom-4 lg:bottom-12 right-4 lg:right-12 z-50">
                    <button
                        type="button"
                        onClick={togglePlayPause}
                        className="text-white opacity-75 hover:opacity-100 lg:text-2xl pointer-events-auto cursor-pointer transition-150"
                    >
                        { isPlaying ? <PauseIcon/> : <PlayIcon/> }
                    </button>
                    <button
                        type="button"
                        onClick={toggleMute}
                        className="text-white opacity-75 hover:opacity-100 lg:text-2xl pointer-events-auto cursor-pointer transition-150"
                    >
                        { isMuted ? <SoundOffIcon/> : <SoundOnIcon/> }
                    </button>
                </div>
                <video
                    ref={videoRef}
                    controls={false}
                    playsInline
                    autoPlay
                    muted
                    loop
                    preload="none"
                    poster={posterSrc}
                    className="size-full object-cover object-bottom pointer-events-none select-none relative z-10"
                >
                    { shouldLoad && videoSrc && <source src={videoSrc} type="video/mp4" /> }
                    Tu navegador no soporta este video.
                </video>
            </div>
        </div>
    );
};
