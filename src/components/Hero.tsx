'use client';

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Spotlight } from "@/components/ui/spotlight-new";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dramatic entrance animations
      gsap.from(labelRef.current, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(titleRef.current?.children || [], {
        opacity: 0,
        y: 200,
        stagger: 0.1,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.8,
        ease: "power3.out",
      });

      // Parallax effects
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 200,
        opacity: 0,
      });

      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.2,
        y: 100,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-end relative overflow-hidden pb-32"
    >
      {/* Spotlight background */}
      <Spotlight />

      <img
        src="/ta07.webp"
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
      
      {/* Gradient overlay - Adjusted for spotlight visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background z-[1]" />
      
      {/* Enhanced shader background visibility */}
      <div className="absolute inset-0 z-0" />
      
      <div 
        ref={overlayRef}
        className="container mx-auto px-6 md:px-12 relative z-10"
      >
        {/* Editorial label */}
        <div 
          ref={labelRef}
          className="mb-8 flex items-center gap-4"
        >
          <div className="h-px w-12 bg-primary" />
          <span className="text-xs md:text-sm font-semibold tracking-[0.3em] text-primary uppercase">
            More than music
          </span>
        </div>

        {/* Hero title with editorial style */}
        <h1
          ref={titleRef}
          className="text-[clamp(4rem,15vw,12rem)] font-black tracking-tighter leading-[0.85] mb-8 will-change-transform"
        >
          <div className="overflow-hidden">
            <TextHoverEffect text="TAR1K" />
          </div>
        </h1>

        {/* Subtitle with dramatic styling */}
        <div 
          ref={subtitleRef}
          className="max-w-2xl"
        >
          <p className="text-lg md:text-2xl text-foreground/80 font-light mb-12 leading-relaxed">
            Performing Artist, Poet, Multihyphenate
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => scrollToSection("music")}
              size="lg"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-bold rounded-full px-8 py-6 text-base transform hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]"
            >
              <Play className="w-5 h-5 mr-2" />
              Listen Now
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold rounded-full px-8 py-6 text-base transform hover:scale-105 transition-all"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection("videos")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Scroll</span>
          <ArrowDown className="w-5 h-5 text-primary animate-bounce" />
        </div>
      </button>
    </section>
  );
};

export default Hero;