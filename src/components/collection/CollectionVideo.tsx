'use client'

import { SoundOnIcon, SoundOffIcon, PlayIcon, PauseIcon } from "@/icons";
import { useLazyVideo } from "@/hooks/useLazyVideo";

interface Props{
    video: string;
}

export const CollectionVideo = ({video}:Props) => {
    const { videoRef, containerRef, shouldLoad, isMuted, isPlaying, toggleMute, togglePlayPause } = useLazyVideo();

    return (
        <div ref={containerRef} className="w-full aspect-video relative">
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
                preload="none"
                className="size-full object-cover pointer-events-none select-none bg-black/5"
            >
                { shouldLoad && <source src={video} type="video/mp4" /> }
                Tu navegador no soporta este video.
            </video>
        </div>
    )
}
