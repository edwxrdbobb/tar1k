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
                About <span className="font-brittany">Tar1k</span>
              </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div ref={textRef} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                tar1k is an outlier. A multifaceted singer, poet and songwriter from Sierra Leone weaving
                together afro-fusion, rap, soul and Caribbean influences into a distinct sound that is as raw
                as it is refined.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                At the core of tar1k's message is the unapologetic expression of aspirations and
                the unfiltered truth of navigating life. Telling stories of love, growth and the contemporary
                African condition, he showcases his versatility bouncing from the infectious uptempo percussions of his singles "Alima" &
                "Feel Am", to the jazz inspired melodic confession of "Patch Am (freestyle)".
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                tar1k's art is a testament to his relentless pursuit of excellence, driven by an
                unwavering desire to carve out a legacy that not only solidifies his place in the music
                industry but also fosters a community of dreamers and visionaries.
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
                      <div className="text-5xl md:text-6xl font-bold mb-1 font-brittany">Tar1k</div>
                  <p className="text-white/80 text-lg">Founder. Performing Artist. Creative.</p>
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
