"use client";

import { useEffect, useRef, useState } from "react";
import { mockVideos } from "@/constants/mockData";
import VideoCard from "./VideoCard";

export default function VideoFeed() {
  const [activeVideoId, setActiveVideoId] = useState<string>(
    mockVideos.length > 0 ? mockVideos[0].id : ""
  );
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: feedRef.current,
      rootMargin: "0px",
      threshold: 0.6,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          const videoId = entry.target.getAttribute("data-video-id");
          if (videoId) {
            setActiveVideoId(videoId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    const cardElements = feedRef.current?.querySelectorAll("[data-video-id]");
    cardElements?.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={feedRef}
      className="w-full h-[100dvh] overflow-y-scroll snap-y snap-mandatory bg-black scroll-smooth"
    >
      {mockVideos.map((video) => (
        <div
          key={video.id}
          data-video-id={video.id}
          className="w-full h-[100dvh] snap-start"
        >
          <VideoCard video={video} isActive={activeVideoId === video.id} />
        </div>
      ))}
    </div>
  );
}
