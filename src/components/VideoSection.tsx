'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beam-background"

gsap.registerPlugin(ScrollTrigger);

/* -------------------------------------------------
   Types & real videos from your channel
   ------------------------------------------------- */
interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

const videos: Video[] = [
  {
    id: "GxtAHSsYN3I",
    title: "No Sense - An Acoustic Reprise",
    thumbnail: "https://i.ytimg.com/vi/GxtAHSsYN3I/maxresdefault.jpg",
  },
  {
    id: "dtER6L9laog",
    title: "Work",
    thumbnail: "https://i.ytimg.com/vi/dtER6L9laog/maxresdefault.jpg",
  },
  {
    id: "iv7u5oEg3pc",
    title: "Patch Am (Freestyle)",
    thumbnail: "https://i.ytimg.com/vi/iv7u5oEg3pc/maxresdefault.jpg",
  },
  {
    id: "FI5eXzCbZmI",
    title: "Feel Am",
    thumbnail: "https://i.ytimg.com/vi/FI5eXzCbZmI/maxresdefault.jpg",
  },
  {
    id: "aCxrPZS1hxA",
    title: "Luv 2 Luv U",
    thumbnail: "https://i.ytimg.com/vi/aCxrPZS1hxA/maxresdefault.jpg",
  },
  {
    id: "CGSB9ty-wZE",
    title: "No Sense (Original)",
    thumbnail: "https://i.ytimg.com/vi/CGSB9ty-wZE/maxresdefault.jpg",
  },
];

/* -------------------------------------------------
   Component
   ------------------------------------------------- */
const VideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const [currentId, setCurrentId] = useState("GxtAHSsYN3I"); // Default: Acoustic Reprise

  /* ---- GSAP scroll animations ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from(playerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
        scale: 0.8,
        rotationX: 15,
      });

      gsap.from(carouselRef.current, {
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* ---- Scroll carousel ---- */
  const scrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.7;
    const target =
      direction === "left"
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;

    carouselRef.current.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <section
      id="videos"
      ref={sectionRef}
      className=" bg-secondary/30 relative"
    >
      <BeamsBackground intensity="subtle" >
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* ---------- Title ---------- */}
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Featured Tracks
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Listen to the latest from tar1k
          </p>

          {/* ---------- Main Player ---------- */}
          <div
            ref={playerRef}
            className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border mb-12 transform-gpu"
            style={{ perspective: "1000px" }}
          >
            <iframe
              key={currentId}
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${currentId}?autoplay=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* ---------- Thumbnail Carousel ---------- */}
          <div className="relative">
            {/* Left arrow */}
            <button
              onClick={() => scrollCarousel("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full p-2 shadow-md transition md:opacity-0 md:group-hover:opacity-100"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() => scrollCarousel("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background rounded-full p-2 shadow-md transition md:opacity-0 md:group-hover:opacity-100"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scroll container */}
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 py-2 px-12 group"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {videos.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => setCurrentId(vid.id)}
                  className={`group flex-shrink-0 w-64 snap-center rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 focus-visible:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                    vid.id === currentId ? "ring-4 ring-primary" : ""
                  }`}
                >
                  <div className="relative aspect-video bg-black">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>

                  <p className="mt-2 px-2 text-sm font-medium text-center line-clamp-2">
                    {vid.title}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      </BeamsBackground>
    </section>
  );
};

export default VideoSection;