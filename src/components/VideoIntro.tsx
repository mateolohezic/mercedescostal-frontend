'use client'

import { useRef, useState } from "react";
import Link from "next/link";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";

// type DeviceType = "mobile" | "desktop" | "md" | null;

export const VideoIntro = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    // const [deviceType, setDeviceType] = useState<DeviceType>(null);

    // useEffect(() => {
    //     const checkDevice = () => {
    //         if (window.innerWidth < 1024) {
    //             setDeviceType("mobile");
    //         } else if (window.innerHeight < 914) {
    //             setDeviceType("md");
    //         } else {
    //             setDeviceType("desktop");
    //         }
    //     };
    //     checkDevice();
    // }, []);

    // useEffect(() => {
    //     const checkDevice = () => {
    //         if (window.innerWidth < 1024) {
    //             setDeviceType("mobile");
    //         } else {
    //             setDeviceType("desktop");
    //         }
    //     };
    //     checkDevice();
    // }, []);
  
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const togglePlayPause = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
                setIsPlaying(true);
            } else {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    // if (deviceType === null) {
    //     return (
    //         <div className="size-full absolute top-0 left-0 z-0 bg-black"/>
    //     );
    // }

    // const videoSrc = deviceType === "mobile" ? "/assets/portada_cuotas_mobile.mp4" : deviceType === "md" ? "/assets/portada_cuotas_md.mp4" : "/assets/portada_cuotas.mp4";
    // const videoSrc = deviceType === "mobile" ? "/assets/portada_cuotas_mobile.mp4" : "/assets/portada_cuotas.mp4";
    const videoSrc = "/assets/portada_video.mp4";

    return (
        <div className="size-full bg-black absolute top-0 left-0 z-0">
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
                    key={videoSrc}
                    ref={videoRef}
                    controls={false}
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="size-full object-cover object-left-bottom pointer-events-none select-none relative z-10"
                >
                    <source src={videoSrc} type="video/mp4" />
                    Tu navegador no soporta este video.
                </video>
            </div>
        </div>
    );
};