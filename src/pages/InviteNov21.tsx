'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const resolveApiUrl = () => {
  const envBase = import.meta.env.VITE_API_BASE_URL?.trim();
  if (envBase) {
    return `${envBase.replace(/\/$/, '')}/api/invite-nov21`;
  }

  if (typeof window !== 'undefined') {
    return `${window.location.origin}/api/invite-nov21`;
  }

  return '/api/invite-nov21';
};

export default function InviteNov21() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    designation: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setIsLoading(true);

    try {
      const res = await fetch(resolveApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);

      setMessage(data?.message ?? 'RSVP submitted! Check your inbox.');
      setFormData({ fullName: '', email: '', phone: '', designation: '' });
    } catch (err: any) {
      console.error(err);
      setMessage(`Failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20">
              {/* Invitation Banner */}
          {/* ======================  FUN INVITATION TEXT  ====================== */}
          <div className="text-center mb-16 animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-700 to-gray-300 bg-clip-text text-transparent animate-slideUp">
              You’re Invited!
            </h1>

            <div className="max-w-3xl mx-auto mt-8 space-y-4 text-lg leading-relaxed">
              {[
                "A night where the music, poetry and vibes collide… but *nothing too serious*.",
                "First-look at my debut film **Before You Wake** (popcorn not included).",
                "Grab limited-edition & keepsakes – because who doesn’t love a souvenir?",
                "Real talks, real people, zero pretence. Just art, laughs and good company.",
                "Come comfy, come open – perfection can wait till tomorrow.",
              ].map((line, i) => (
                <p
                  key={i}
                  className="opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {line}
                </p>
              ))}
              <p className="mt-6 font-semibold text-xl text-gray-400">
                November 21 • Location: TBA • It’s **Nothing Too Serious**.
              </p>
            </div>
          </div>

          {/* ======================  ANIMATED HERO BANNER  ====================== */}
          <div className="relative overflow-hidden rounded-2xl border border-border mb-12 h-[360px] md:h-[480px] group">
            {/* Background image with subtle zoom */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-linear group-hover:scale-110"
              style={{ backgroundImage: `url(/ta8.webp)` }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-end p-8 text-center text-white">
              <p className="text-sm tracking-widest uppercase animate-fadeIn animation-delay-300">
                Special Event
              </p>

              <h2 className="mt-2 text-5xl md:text-7xl font-bold animate-slideUp animation-delay-500">
                Nothing Too Serious
              </h2>

              <p className="mt-2 text-lg animate-fadeIn animation-delay-700">
                November 21 • Location: TBA
              </p>

              <p className="mt-3 max-w-2xl text-sm md:text-base animate-fadeIn animation-delay-900">
                An intimate evening of sound, words, and pure vibes. Come as you are.
              </p>

              {/* Optional playful CTA button */}
              <button
                onClick={() => document.getElementById('rsvp-card')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-6 rounded-full bg-gray-700 px-6 py-2 text-sm font-medium transition-transform hover:scale-105 animate-fadeIn animation-delay-1100"
              >
                RSVP Now
              </button>
            </div>
          </div>


      {/* ... RSVP FOR THE EVENT ... */}

      <Card className="max-w-2xl mx-auto mt-12">
        <CardHeader>
          <CardTitle className="text-center text-2xl">RSVP</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {(['fullName', 'email', 'phone', 'designation'] as const).map(
              (field) => (
                <div key={field}>
                  <Label htmlFor={field}>
                    {field === 'fullName'
                      ? 'Full Name'
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                  </Label>
                  <Input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                    required
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={
                      field === 'designation'
                        ? 'e.g., Independent Creative, Organisation'
                        : ''
                    }
                  />
                </div>
              )
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Submitting…' : 'Submit RSVP'}
            </Button>

            {message && (
              <p
                className={`mt-4 text-center ${
                  message.startsWith('Failed') ? 'text-red-600' : 'text-green-600'
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
