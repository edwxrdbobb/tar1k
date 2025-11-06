import { useEffect } from "react";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import gsap from "gsap";

const Index = () => {
  useSmoothScroll();

  useEffect(() => {
    // Add cursor follow effect
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    document.addEventListener("mousemove", moveCursor);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll("a, button, .hover-scale");
    
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 1.5, duration: 0.3 });
      });
      
      el.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      document.removeEventListener("mousemove", moveCursor);
      cursor.remove();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Hero />
      <VideoSection />
      <AboutSection />
      <MusicSection />
      <EventsSection />
      <GallerySection />
      {/* <NewsletterSection /> */}
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
