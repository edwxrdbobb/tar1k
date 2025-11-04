import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 30%",
          scrub: true,
        },
        opacity: 0,
        y: 50,
      });

      gsap.from(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0,
        scale: 0.8,
        rotationX: 15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="videos" ref={sectionRef} className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
          >
            Latest Video
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Watch the most recent performance
          </p>

          <div
            ref={videoRef}
            className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border transform-gpu"
            style={{ perspective: "1000px" }}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
