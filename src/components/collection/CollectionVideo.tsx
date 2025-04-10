'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";

interface Props{
    title: string;
}

export const CollectionVideo = ({title}:Props) => {

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
        <div className="w-full aspect-video relative">
            <div className="size-full flex justify-center items-center text-center absolute top-0 left-0 z-40">
                <span className="text-white font-gillsans font-light text-3xl uppercase"><span className="text-opacity-75">Colección</span> <b className="font-medium">{title}</b></span>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-4 z-50">
                <button
                    type="button"
                    onClick={togglePlayPause}
                    className="text-white opacity-75 hover:opacity-100 text-3xl pointer-events-auto cursor-pointer transition-150"
                >
                    { isPlaying ? <PauseIcon/> : <PlayIcon/> }
                </button>
                <button
                    type="button"
                    onClick={toggleMute}
                    className="text-white opacity-75 hover:opacity-100 text-3xl pointer-events-auto cursor-pointer transition-150"
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
                className="size-full object-cover pointer-events-none select-none"
            >
                <source src="/assets/portada_video.mp4" type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}