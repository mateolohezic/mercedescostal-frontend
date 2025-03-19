'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";

export const MeetTheMakersVideo = () => {

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
        <div className="size-full relative">
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
                <source src="/assets/highlights/meet_the_makers_video.mp4" type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}