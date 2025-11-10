'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Headphones } from "lucide-react";
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

  return (
    <section id="music" ref={sectionRef} className="py-20 ">
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

          {/* Optional: Small footer note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              More platforms coming soon: Apple Music, YouTube Music, Boomplay
            </p>
          </div>
        </div>
          </div>
          
          {/* Discography Section */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl md:text-4xl font-bold mb-2">Discography</h3>
              <p className="text-muted-foreground">A selection from the press kit</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl border border-border p-5 hover:bg-secondary/20 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">Single</div>
                <div className="text-xl font-semibold">Alima</div>
              </div>
              <div className="rounded-xl border border-border p-5 hover:bg-secondary/20 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">Single</div>
                <div className="text-xl font-semibold">Feel Am</div>
              </div>
              <div className="rounded-xl border border-border p-5 hover:bg-secondary/20 transition-colors">
                <div className="text-sm text-muted-foreground mb-1">Freestyle</div>
                <div className="text-xl font-semibold">Patch Am (freestyle)</div>
              </div>
            </div>

            <div className="text-center mt-8">
              <a href={encodeURI('/tar1k august updated press kit.pdf')} target="_blank" rel="noreferrer" className="inline-block text-sm text-primary hover:underline">
                View full discography in the Press Kit
              </a>
            </div>
          </div>
          </BackgroundCells>
        </section>
  );
};

export default MusicSection;
