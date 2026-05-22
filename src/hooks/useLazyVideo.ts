'use client'

import { useCallback, useEffect, useRef, useState } from "react";

interface Options {
  rootMargin?: string;
  threshold?: number;
  eager?: boolean;
}

export const useLazyVideo = ({ rootMargin = "300px 0px", threshold = 0.01, eager = false }: Options = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const userPausedRef = useRef(false);
  const isVisibleRef = useRef(eager);
  const optionsRef = useRef({ rootMargin, threshold });
  optionsRef.current = { rootMargin, threshold };

  useEffect(() => {
    if (eager) {
      isVisibleRef.current = true;
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      isVisibleRef.current = true;
      setShouldLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisibleRef.current = entry.isIntersecting;
        const v = videoRef.current;
        if (entry.isIntersecting) {
          setShouldLoad(true);
          if (v && !userPausedRef.current && v.paused && v.readyState >= 2) {
            v.play().catch(() => {});
          }
        } else if (v && !v.paused) {
          v.pause();
        }
      },
      { rootMargin: optionsRef.current.rootMargin, threshold: optionsRef.current.threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!shouldLoad) return;
    const v = videoRef.current;
    if (!v) return;
    v.load();
  }, [shouldLoad]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedData = () => {
      if (!userPausedRef.current && isVisibleRef.current && v.paused) {
        v.play().catch(() => {});
      }
    };
    v.addEventListener("play", handlePlay);
    v.addEventListener("pause", handlePause);
    v.addEventListener("loadeddata", handleLoadedData);
    return () => {
      v.removeEventListener("play", handlePlay);
      v.removeEventListener("pause", handlePause);
      v.removeEventListener("loadeddata", handleLoadedData);
    };
  }, [shouldLoad]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, []);

  const togglePlayPause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      v.play().catch(() => {});
    } else {
      userPausedRef.current = true;
      v.pause();
    }
  }, []);

  return {
    videoRef,
    containerRef,
    shouldLoad,
    isMuted,
    isPlaying,
    toggleMute,
    togglePlayPause,
  };
};
