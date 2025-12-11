'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";

export const VideoIntro = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
  
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

    return (
        <div className="size-full absolute top-0 left-0 z-0">
            <div className="size-full relative">
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
                <div className="size-full bg-black absolute top-0 left-0 z-0"></div>
                <video
                    ref={videoRef}
                    controls={false}
                    playsInline
                    autoPlay
                    muted
                    loop
                    className="size-full object-cover object-[50%_100%] pointer-events-none select-none relative z-10"
                >
                    <source src="/assets/portada_navidad.mp4" type="video/mp4" />
                    Tu navegador no soporta este video.
                </video>
            </div>
        </div>
    )
}