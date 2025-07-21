'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";

interface Props{
    video: string;
    className?: string;
    buttonClassName?: string;
}

export const VideoProcesoCreativo = ({video, className, buttonClassName = "bottom-4 right-4"}:Props) => {

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
        <div className={`size-full group relative ${className}`}>
            <div className={`opacity-0 group-hover:opacity-100 absolute flex gap-4 z-50 transition-all duration-200 ${buttonClassName}`}>
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
                <source src={video} type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}