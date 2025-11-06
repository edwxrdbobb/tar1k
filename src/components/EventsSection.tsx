'use client';

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Spotlight, GridBackground } from "@/components/ui/spotlight-new";

// import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const EventsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = eventsRef.current?.querySelectorAll(".event-card");

      cards?.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
        });

        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
            duration: 0.3,
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            boxShadow: "0 0 0 rgba(255, 255, 255, 0)",
            duration: 0.3,
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events = [
    {
      date: "Dec 15, 2025",
      time: "8:00 PM",
      title: "Live Performance - Winter Series",
      venue: "The Grand Theater",
      location: "New York, NY",
      thumbnail: "https://images.unsplash.com/photo-1540039156060-76da999c6a0c?w=800&h=600&fit=crop",
    },
    {
      date: "Jan 20, 2026",
      time: "7:30 PM",
      title: "Intimate Acoustic Session",
      venue: "Blue Note Jazz Club",
      location: "Los Angeles, CA",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
    },
    {
      date: "Feb 14, 2026",
      time: "9:00 PM",
      title: "Valentine's Special Concert",
      venue: "Symphony Hall",
      location: "Chicago, IL",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    },
  ];

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-secondary/5">

      <GridBackground />
      <Spotlight />
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Catch tar1k live — from intimate sessions to full-stage performances.
            </p>
          </div>

          <div ref={eventsRef} className="space-y-6">
            {events.map((event, index) => (
              <Card
                key={index}
                className="event-card hover:border-white/30 transition-all duration-300 transform-gpu bg-card/50 backdrop-blur-sm"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6">
                  {/* Thumbnail */}
                  <div className="w-full md:w-48 h-48 md:h-auto flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-white/70" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-white/70" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-white/70" />
                            <span>
                              {event.venue}, {event.location}
                            </span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all"
                      >
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* View All Events Button */}
          <div className="mt-12 text-center">
            <a href="/events">
              <Button
                size="lg"
                className="group bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm transition-all duration-300"
              >
                View All Events
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;