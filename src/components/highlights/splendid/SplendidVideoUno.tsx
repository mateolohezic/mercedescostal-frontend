'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";

export const SplendidVideoUno = () => {

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
        <div className="size-full max-w-3xl aspect-square rounded-full overflow-hidden relative">
            <div className="absolute bottom-4 right-0 left-0 mx-auto flex justify-center gap-4 z-50">
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
                className="size-full object-cover pointer-events-none select-none scale-125"
            >
                <source src="/assets/highlights/splendid/splendid_video_1.mp4" type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}