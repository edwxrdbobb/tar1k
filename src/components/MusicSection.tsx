'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Headphones } from "lucide-react";
import { BackgroundCells } from "./ui/background-ripple-effect";

gsap.registerPlugin(ScrollTrigger);

const MusicSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll(".music-card");

      cards?.forEach((card, index) => {
        gsap.from(card, { 
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
          opacity: 0,
          y: 100,
          rotationY: index % 2 === 0 ? -15 : 15,
        });

        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            rotationY: index % 2 === 0 ? -5 : 5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const discography = [
    {
      title: "Work",
      type: "Single",
      releaseDate: "October, 2022",
      cover: "/ta1.jpeg",
      credits: [
        "Written & Performed by tar1k & Dito Freaky",
        "Produced by Joshhbeatz",
        "Mixed & Mastered by Joshhbeatz",
      ],
    },
    {
      title: "Luv 2 Luv U (ft Dito Freaky)",
      type: "Single",
      releaseDate: "February, 2023",
      cover: "/ta2.jpeg",
      credits: [
        "Written & Performed by tar1k & Dito Freaky",
        "Produced by Josh Nack",
        "Additional Production by Banfy",
        "Mixed & Mastered by Banfy",
      ],
    },
    {
      title: "Alima",
      type: "Single",
      releaseDate: "June, 2024",
      cover: "/ta3.jpeg",
      credits: [
        "Written & Performed by tar1k",
        "Produced by Joshhbeatz",
        "Additional Production by Banfy",
        "Mixed & Mastered by Banfy",
      ],
    },
    {
      title: "Feel Am",
      type: "Single",
      releaseDate: "December, 2024",
      cover: "/ta4.jpeg",
      credits: [
        "Written & Performed by tar1k",
        "Produced by Joshhbeatz",
        "Mixed & Mastered by Joshhbeatz",
      ],
    },
    {
      title: "Patch Am (Freestyle)",
      type: "Single",
      releaseDate: "April, 2025",
      cover: "/ta5.jpeg",
      credits: [
        "Written & Performed by tar1k",
        "Produced by Josh Nack",
        "Backing Vocals by Adeola",
        "Mixed & Mastered by Medsul",
      ],
    },
  ];

  return (
    <section id="music" ref={sectionRef} className="py-8">
      <BackgroundCells className="bg-secondary/10" >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-borel">
              Music
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stream tar1k’s latest releases and explore the afro-fusion sound from Sierra Leone.
            </p>
          </div>

          <div
            ref={cardsRef}
            className="grid md:grid-cols-3 gap-8"
            style={{ perspective: "1000px" }}
          >
            {/* Spotify Card */}
            <div className="music-card space-y-4 transform-gpu">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Spotify</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-primary/20 transition-shadow">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/artist/6RhNko3SJyefSi7mO1fMi5?utm_source=generator&theme=0"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="tar1k on Spotify"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">47</span> monthly listeners • Popular: Work, Feel Am, Patch Am
              </p>
            </div>

            {/* Audiomack Card */}
            <div className="music-card space-y-4 transform-gpu">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Audiomack</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-primary/20 transition-shadow">
                <iframe
                  src="https://audiomack.com/onlytar1k/embed"
                  width="100%"
                  height="352"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="tar1k on Audiomack"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Follow for new releases and live sessions
              </p>
            </div>

            {/* Apple Music Card */}
            <div className="music-card space-y-4 transform-gpu">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Apple Music</h3>
              </div>
              <div className="rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-primary/20 transition-shadow">
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  frameBorder="0"
                  height="352"
                  style={{ width: '100%', maxWidth: '660px', overflow: 'hidden', borderRadius: '12px' }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src="https://embed.music.apple.com/us/artist/tar1k/1785986142"
                  title="tar1k on Apple Music"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Stream on Apple Music
              </p>
            </div>
          </div>
        </div>
          </div>
 
          </BackgroundCells>
        </section>
  );
};

export default MusicSection;
