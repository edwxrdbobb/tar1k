import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".gallery-item");

      items?.forEach((item, index) => {
        // Staggered entrance
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
          opacity: 0,
          scale: 0.8,
          rotationZ: index % 2 === 0 ? -5 : 5,
        });

        // Magnetic hover effect
        const itemElement = item as HTMLElement;
        itemElement.addEventListener("mousemove", (e) => {
          const rect = itemElement.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(item, {
            x: x * 0.1,
            y: y * 0.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        itemElement.addEventListener("mouseleave", () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const images = [
    { id: 1, alt: "Live performance" },
    { id: 2, alt: "Studio session" },
    { id: 3, alt: "Concert crowd" },
    { id: 4, alt: "Backstage moment" },
    { id: 5, alt: "Stage setup" },
    { id: 6, alt: "Festival appearance" },
  ];

  return (
    <section id="gallery" ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Gallery
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Moments from performances, studio sessions, and creative work
          </p>

          <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="gallery-item aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border overflow-hidden cursor-pointer transform-gpu"
              >
                <div className="w-full h-full flex items-center justify-center backdrop-blur-sm hover:backdrop-blur-none transition-all">
                  <span className="text-muted-foreground font-medium">
                    {image.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
