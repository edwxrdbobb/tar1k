'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GridBackground } from "./ui/spotlight-new";
import { Component } from "./ui/ethernal-shadow";


gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance
      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0,
        scale: 0.9,
        rotationY: -20,
      });

      // Text entrance
      gsap.from(textRef.current?.children, {
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          end: "top 50%",
          scrub: true,
        },
        opacity: 0,
        y: 30,
        stagger: 0.1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
    <Component
      color="rgba(128, 128, 128, 1)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 1, scale: 1.2 }}
        sizing="fill"
         >
    <section id="about" ref={sectionRef} className="bg-secondary/10 py-20">

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
            About TAR1K
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div ref={textRef} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                TAR1K is a musical artist dedicated to pushing the boundaries of contemporary sound. 
                With a unique blend of rhythm, melody, and storytelling, each composition creates 
                an immersive experience that resonates with listeners across the globe.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                Drawing inspiration from diverse musical traditions and modern production techniques, 
                TAR1K crafts sonic landscapes that are both innovative and deeply personal. The music 
                explores themes of identity, connection, and the human experience.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                With performances spanning intimate venues to major stages, TAR1K continues to evolve 
                as an artist, constantly exploring new creative territories and connecting with audiences 
                through the universal language of music.
              </p>
            </div>

            {/* Image */}
            <div ref={imageRef} className="relative transform-gpu">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border border-border">
                <img
                  src="/ta1.jpeg"
                  alt="TAR1K - Musical Artist"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Overlay Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="text-white">
                  <div className="text-5xl md:text-6xl font-bold mb-1">TAR1K</div>
                  <p className="text-white/80 text-lg">Musical Artist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
 
    </section>
    </Component>
    </>
  );
};

export default AboutSection;