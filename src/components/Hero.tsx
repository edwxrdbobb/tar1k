import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 100,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(descRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });

      gsap.from(buttonsRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.7,
        ease: "power3.out",
      });

      // Parallax scroll effect
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 300,
        opacity: 0.3,
      });

      // Title scale on scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 1.5,
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent will-change-transform"
          >
            TAR1K
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-4"
          >
            Musical Artist
          </p>

          <p
            ref={descRef}
            className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Exploring sound, rhythm, and storytelling through innovative musical
            expression
          </p>

          <div
            ref={buttonsRef}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Button
              onClick={() => scrollToSection("music")}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold transform hover:scale-105 transition-transform"
            >
              Listen Now
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transform hover:scale-105 transition-transform"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("videos")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
      >
        <ArrowDown className="w-6 h-6 text-primary" />
      </button>
    </section>
  );
};

export default Hero;
