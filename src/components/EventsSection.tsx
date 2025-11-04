import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";

const EventsSection = () => {
  const events = [
    {
      date: "Dec 15, 2025",
      time: "8:00 PM",
      title: "Live Performance - Winter Series",
      venue: "The Grand Theater",
      location: "New York, NY",
    },
    {
      date: "Jan 20, 2026",
      time: "7:30 PM",
      title: "Intimate Acoustic Session",
      venue: "Blue Note Jazz Club",
      location: "Los Angeles, CA",
    },
    {
      date: "Feb 14, 2026",
      time: "9:00 PM",
      title: "Valentine's Special Concert",
      venue: "Symphony Hall",
      location: "Chicago, IL",
    },
  ];

  return (
    <section id="events" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Upcoming Events</h2>
          <p className="text-muted-foreground text-center mb-12">
            Join me for live performances and special appearances
          </p>

          <div className="space-y-6">
            {events.map((event, index) => (
              <Card key={index} className="hover:border-primary transition-colors">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-8 h-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                        <div className="space-y-1 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.venue}, {event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Tickets
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
