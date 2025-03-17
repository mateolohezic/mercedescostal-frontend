'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "@/icons";

export const SplendidVideoUno = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    };

    return (
        <div className="size-full max-w-3xl aspect-square rounded-full overflow-hidden relative">
            <button
                type="button"
                onClick={toggleMute}
                className="w-fit text-white opacity-75 hover:opacity-100 text-3xl absolute bottom-4 right-0 left-0 mx-auto pointer-events-auto cursor-pointer z-50 transition-150"
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
                className="size-full object-cover pointer-events-none select-none scale-125"
            >
                <source src="/assets/highlights/splendid/splendid_video_1.mp4" type="video/mp4" />
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}