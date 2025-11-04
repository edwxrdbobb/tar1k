import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

        // Hover effect
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
    <section id="music" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Music
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Stream and listen to the latest releases
          </p>

          <div ref={cardsRef} className="grid md:grid-cols-2 gap-8" style={{ perspective: "1000px" }}>
            <div className="music-card space-y-4 transform-gpu">
              <h3 className="text-xl font-semibold">Spotify</h3>
              <div className="rounded-xl overflow-hidden border border-border shadow-lg hover:shadow-primary/20 transition-shadow">
                <iframe
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/artist/0TnOYISbd1XYRBk9myaseg?utm_source=generator"
                  width="100%"
                  height="380"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="music-card space-y-4 transform-gpu">
              <h3 className="text-xl font-semibold">Audiomack</h3>
              <div className="rounded-xl overflow-hidden border border-border bg-card p-6 shadow-lg hover:shadow-primary/20 transition-shadow h-[380px] flex flex-col justify-center">
                <p className="text-muted-foreground mb-4">
                  Listen on Audiomack for exclusive tracks and releases
                </p>
                <a
                  href="https://audiomack.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
                >
                  Listen on Audiomack
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MusicSection;
