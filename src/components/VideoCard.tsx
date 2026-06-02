"use client";

import { useRef, useState, useEffect } from "react";
import { VideoData } from "@/constants/mockData";

interface VideoCardProps {
  video: VideoData;
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(video.likesCount);
  const [showPlayOverlay, setShowPlayOverlay] = useState<boolean>(false);

  // 1. Sync video play/pause with the isActive prop (Autoplay on Scroll)
  useEffect(() => {
    if (!videoRef.current) return;

    if (isActive) {
      videoRef.current.muted = isMuted;
      videoRef.current
        .play()
        .catch((error) => {
          // Silent catch for autoplay blocks
          void error;
        });
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isMuted]);

  // Cleanup timers on component unmount
  useEffect(() => {
    return () => {
      if (clickTimerRef.current) {
        clearTimeout(clickTimerRef.current);
      }
    };
  }, []);

  // 2. Handle Manual Click to Play/Pause (with optimized Click Timer Ref)
  const handleVideoClick = (): void => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current
        .play()
        .catch((err) => {
          void err;
        });
    }

    // Toggle flash overlay and clear existing timers to prevent overlapping
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    setShowPlayOverlay(true);
    clickTimerRef.current = setTimeout(() => {
      setShowPlayOverlay(false);
    }, 500);
  };

  // 3. Toggle Sound Control
  const handleMuteClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (!videoRef.current) return;

    const newMutedState = !isMuted;
    videoRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  // 4. Toggle Like State
  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (isLiked) {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }
  };

  // Formatter utility to display counts
  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="snap-start w-full h-[100dvh] relative flex items-center justify-center bg-black overflow-hidden select-none">
      {/* Aspect Ratio Frame */}
      <div className="w-full h-full max-w-[450px] aspect-[9/16] relative bg-zinc-950 flex items-center justify-center">
        
        {/* Video Player */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="w-full h-full object-cover cursor-pointer"
          loop
          playsInline
          muted={isMuted}
          onClick={handleVideoClick}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Action Flash Indicator */}
        {showPlayOverlay && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition-opacity duration-300 z-30">
            <div className="bg-black/60 p-4 rounded-full animate-ping">
              {!isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                >
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* Sound Controller Button */}
        <button
          onClick={handleMuteClick}
          className="absolute top-4 right-4 z-20 bg-black/50 p-2.5 rounded-full hover:bg-black/70 transition duration-150 border border-white/10"
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          )}
        </button>

        {/* Bottom Shadow Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-[5]" />

        {/* Text Details (Bottom Left - TikTok Style) */}
        <div className="absolute bottom-4 left-4 z-10 max-w-[70%]">
          <h3 className="font-bold text-base mb-1.5 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-100 border border-zinc-600 shrink-0">
              {video.authorName.charAt(0).toUpperCase()}
            </span>
            @{video.authorName}
          </h3>
          <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed drop-shadow">
            {video.description}
          </p>
        </div>

        {/* Floating Controls Bar (Right - TikTok Style) */}
        <div className="absolute right-3 bottom-20 z-10 flex flex-col items-center gap-5">
          
          {/* Like Heart */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleLikeClick}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-75 shadow-lg ${
                isLiked
                  ? "bg-red-500 text-white"
                  : "bg-black/50 text-zinc-200 hover:bg-black/70"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow select-none">
              {formatNumber(likesCount)}
            </span>
          </div>

          {/* Dummy Comment */}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full bg-black/50 text-zinc-200 hover:bg-black/70 flex items-center justify-center transition-all duration-200 active:scale-75 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a.598 0 0 1-.655-.705l.337-2.3c-2.081-1.664-3.342-4.116-3.342-6.963C1.25 7.444 5.28 3.75 10 3.75c4.72 0 8.75 3.694 8.75 8.25Z"
                />
              </svg>
            </button>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow select-none">
              0
            </span>
          </div>

          {/* Dummy Share */}
          <div className="flex flex-col items-center">
            <button className="w-12 h-12 rounded-full bg-black/50 text-zinc-200 hover:bg-black/70 flex items-center justify-center transition-all duration-200 active:scale-75 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </button>
            <span className="text-white text-xs font-semibold mt-1 drop-shadow select-none">
              0
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
