'use client'

import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";
import { useLazyVideo } from "@/hooks/useLazyVideo";

interface Props{
    video: string;
    className?: string;
    videoClassName?: string;
    buttonClassName?: string;
}

export const Video = ({video, className, videoClassName = "", buttonClassName = "bottom-4 right-4"}:Props) => {
    const { videoRef, containerRef, shouldLoad, isMuted, isPlaying, toggleMute, togglePlayPause } = useLazyVideo();

    return (
        <div ref={containerRef} className={`size-full group relative ${className}`}>
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
                preload="none"
                className={`size-full object-contain pointer-events-none select-none bg-black/5 ${videoClassName}`}
            >
                { shouldLoad && <source src={video} type="video/mp4" /> }
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}
