'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "@/icons";

export const BookVideo = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    };

    return (
        <div className="size-full relative">
            <button
                type="button"
                onClick={toggleMute}
                className="text-white opacity-75 hover:opacity-100 text-3xl absolute bottom-4 right-4 pointer-events-auto cursor-pointer z-50 transition-150"
            >
                {
                    isMuted ? <SoundOffIcon/> : <SoundOnIcon/>
                }
            </button>
            <video
                ref={videoRef}
                controls={false}
                playsInline
                autoPlay
                muted
                loop
                className="size-full object-cover pointer-events-none select-none"
            >
                <source src="/assets/mc-universe/book_video.mp4" type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}