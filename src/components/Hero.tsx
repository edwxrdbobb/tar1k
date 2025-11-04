import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            TAR1K
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-4 animate-fade-up">
            Musical Artist
          </p>
          
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Exploring sound, rhythm, and storytelling through innovative musical expression
          </p>

          <div className="flex flex-wrap gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <Button
              onClick={() => scrollToSection("music")}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
            >
              Listen Now
            </Button>
            <Button
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold"
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
