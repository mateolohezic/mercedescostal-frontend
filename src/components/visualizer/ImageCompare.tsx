"use client";

import { useState, useRef, useCallback } from "react";

interface Props {
    beforeSrc: string;
    afterSrc: string;
    beforeLabel?: string;
    afterLabel?: string;
}

export const ImageCompare = ({ beforeSrc, afterSrc, beforeLabel = "Antes", afterLabel = "Después" }: Props) => {
    const [position, setPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePosition = useCallback((clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setPosition(percent);
    }, []);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        updatePosition(e.clientX);
    }, [updatePosition]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        updatePosition(e.clientX);
    }, [isDragging, updatePosition]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        setIsDragging(true);
        updatePosition(e.touches[0].clientX);
    }, [updatePosition]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        updatePosition(e.touches[0].clientX);
    }, [isDragging, updatePosition]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full select-none cursor-col-resize overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* After image (full, sets the container size) */}
            <img src={afterSrc} alt={afterLabel} className="w-full aspect-[4/3] object-cover block" draggable={false} />

            {/* Before image (same size, clipped with clip-path) */}
            <img
                src={beforeSrc}
                alt={beforeLabel}
                className="absolute top-0 left-0 w-full h-full object-cover block"
                style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
                draggable={false}
            />

            {/* Slider line */}
            <div
                className="absolute top-0 h-full w-0.5 bg-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
                style={{ left: `${position}%`, transform: "translateX(-50%)" }}
            >
                {/* Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
                    </svg>
                </div>
            </div>

            {/* Labels */}
            <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 font-gillsans uppercase pointer-events-none">
                {beforeLabel}
            </div>
            <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 font-gillsans uppercase pointer-events-none">
                {afterLabel}
            </div>
        </div>
    );
};
