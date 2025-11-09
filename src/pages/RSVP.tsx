'use client';

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, MapPin, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

type FormData = z.infer<typeof schema>;

interface Event {
  id: number;
  title: string;
  date: string;
  venue: string;
  location: string;
  description: string;
  attendees: number;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "TAR1K Live: Winter Fusion Tour",
    date: "Dec 15, 2025",
    venue: "The Grand Theater",
    location: "New York, NY",
    description: "Intimate afro-fusion performance with special guests.",
    attendees: 150,
  },
  {
    id: 2,
    title: "Acoustic Sessions: Feel Am",
    date: "Jan 20, 2026",
    venue: "Blue Note Jazz Club",
    location: "Los Angeles, CA",
    description: "Stripped-down set featuring fan favorites.",
    attendees: 80,
  },
  {
    id: 3,
    title: "Valentine's Afro-Soul Night",
    date: "Feb 14, 2026",
    venue: "Symphony Hall",
    location: "Chicago, IL",
    description: "Romantic evening of love songs and rhythms.",
    attendees: 200,
  },
];

const RSVPPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isAttending, setIsAttending] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: index * 0.2,
      });
    });
  }, []);

  const onSubmit = (data: FormData) => {
    if (selectedEvent && isAttending) {
      // Demo: Save to localStorage
      const rsvps = JSON.parse(localStorage.getItem("rsvps") || "[]");
      rsvps.push({ ...data, eventId: selectedEvent.id, attending: true });
      localStorage.setItem("rsvps", JSON.stringify(rsvps));
      reset();
      setSuccessOpen(true);
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      {/* Header */}
      <div className="container mx-auto px-4 mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">RSVP</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Secure your spot at upcoming TAR1K performances. Limited tickets available.
        </p>
      </div>

      {/* Events List */}
      <div className="container mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {mockEvents.map((event, index) => (
          <Card
            key={event.id}
            ref={(el) => (cardsRef.current[index] = el!)}
            className="h-full cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setSelectedEvent(event);
              setOpen(true);
            }}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                {/* <Badge variant="secondary">Live Event</Badge> */}
                <div className="text-sm text-muted-foreground">
                  {event.attendees} spots left
                </div>
              </div>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {event.date}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {event.venue}, {event.location}
              </div>
              <Button className="w-full">RSVP Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* RSVP Dialog */}
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>RSVP for {selectedEvent?.title}</AlertDialogTitle>
            <AlertDialogDescription>
              Confirm your attendance. We'll send a confirmation email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Switch checked={isAttending} onCheckedChange={setIsAttending} />
                Attending
              </Label>
              <div className="text-sm text-muted-foreground">
                <Users className="w-4 h-4 inline mr-1" />
                {selectedEvent?.attendees} capacity
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button type="submit" disabled={!isAttending}>
                Confirm RSVP
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>

      {/* Success Dialog */}
      <AlertDialog open={successOpen} onOpenChange={setSuccessOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>RSVP Confirmed!</AlertDialogTitle>
            <AlertDialogDescription>
              You're all set for {selectedEvent?.title}. Check your email for details.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setSuccessOpen(false)}>
              Awesome, Thanks!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RSVPPage;