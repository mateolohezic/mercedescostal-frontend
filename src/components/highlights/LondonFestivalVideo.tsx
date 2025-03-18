'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "@/icons";

export const LondonFestivalVideo = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    };

    return (
        <div className="size-full max-w-md relative left-9">
            <button
                type="button"
                onClick={toggleMute}
                className="text-white opacity-75 hover:opacity-100 text-3xl absolute top-4 left-4 pointer-events-auto cursor-pointer z-50 transition-150"
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
                <source src="/assets/highlights/london_festival_video.mp4" type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}