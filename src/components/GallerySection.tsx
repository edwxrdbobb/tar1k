'use client';

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowRight } from "lucide-react";
import { BeamsBackground } from "@/components/ui/beam-background"
// import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gridRef.current?.querySelectorAll(".gallery-item");

      items?.forEach((item, index) => {
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
    { id: 1, src: "/ta1.jpeg", alt: "Live performance" },
    { id: 2, src: "/ta2.jpeg", alt: "Studio session" },
    { id: 3, src: "/ta3.jpeg", alt: "Concert crowd" },
    { id: 4, src: "/ta4.jpeg", alt: "Backstage moment" },
    { id: 5, src: "/ta5.jpeg", alt: "Stage setup" },
    { id: 6, src: "/ta6.jpeg", alt: "Festival appearance" },
  ];

  return (
    <>
    <BeamsBackground intensity="subtle">
      <section id="gallery" ref={sectionRef} className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-brittany">
                Gallery
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Moments from performances, studio sessions, and creative work
              </p>
            </div>

            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image.src)}
                  className="gallery-item group aspect-square rounded-xl overflow-hidden border border-border shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-white/30 transform-gpu"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium">{image.alt}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* View Full Gallery Button */}
            <div className="mt-12 text-center">
              <a href="/gallery">
                <button className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-semibold border border-white/30 backdrop-blur-sm transition-all duration-300 hover:shadow-lg">
                  View Full Gallery
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl w-full h-full max-h-screen">
            <img
              src={selectedImage}
              alt="Enlarged gallery image"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
      </BeamsBackground>
    </>
  );
};

export default GallerySection;
