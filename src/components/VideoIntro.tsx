'use client'

import { useRef, useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "@/icons";

export const VideoIntro = () => {

    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
  
    const toggleMute = () => {
      if (videoRef.current) {
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
      }
    };

    return (
        <div className="size-full absolute top-0 left-0 z-0">
            <div className="size-full relative">
                <button
                    type="button"
                    onClick={toggleMute}
                    className="text-white opacity-75 hover:opacity-100 text-7xl absolute bottom-12 right-12 pointer-events-auto cursor-pointer z-50 transition-150"
                >
                    {
                        isMuted ? <SoundOffIcon/> : <SoundOnIcon/>
                    }
                </button>
                <div className="size-full bg-gradient-to-t from-black/75 to-transparent absolute top-0 left-0"></div>
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
        </div>
    )
}
