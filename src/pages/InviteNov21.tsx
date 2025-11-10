'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InviteNov21 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch('/api/invite-nov21', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Failed');
      alert('RSVP submitted successfully! Check your email for confirmation.');
    } catch (error) {
      console.error(error);
      alert('Failed to submit RSVP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20">
      <div className="container mx-auto px-4">
        {/* Invitation Banner */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            You're Invited
          </h1>
          <div className="max-w-4xl mx-auto space-y-6 text-lg leading-relaxed">
            <p>
              You're invited to the culmination of a journey a lifetime in the making. A synthesis of the sound, the poetry, the words, and the work that threads them all through the centre.
            </p>
            <p>
              Nothing too Serious is an acknowledgement of effort aggregated and constant expansion into new frontiers. A return to the passion that p___ the poetry. The soul that sired the sound. I
            </p>
            <p>
              Come open. Come comfortable. After all… It's Nothing Too Serious.
            </p>
          </div>
        </div>

            {/* Web Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-border mb-12">
              <div
                className="relative h-[360px] md:h-[420px] w-full"
                style={{
                  backgroundImage: `url(/ta8.webp)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="relative z-10 h-full w-full flex flex-col items-center justify-end text-center p-8">
                  <div className="text-white/90 text-sm tracking-widest uppercase">Special Event</div>
                  <h1 className="mt-2 text-4xl md:text-6xl font-bold text-white">Nothing Too Serious</h1>
                  <p className="mt-2 text-white/90">November 21 • Location: TBA</p>
                  <p className="mt-2 max-w-3xl text-white/80 text-sm">
                    An intimate evening celebrating the sound, the words, and the work. Come open. Come comfortable.
                  </p>
                </div>
              </div>
            </div>

            {/* RSVP Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-center">RSVP</CardTitle>
          </CardHeader>
          <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  type="text"
                  required
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g., Independent Creative, Organisation etc"
                />
              </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit RSVP'}
                  </Button>
                </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InviteNov21;
