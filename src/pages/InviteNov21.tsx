'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SparklesText } from '@/components/ui/sparkles-text';
import { Typewriter } from '@/components/ui/typewriter-text';
type ApiResponse = { success?: boolean; message?: string; error?: string };

const COMMUNITY_OPTIONS = [
  'The Maker (Fellow artists, designers, musicians)',
  'The Storyteller (Media, journalists, press)',
  'The Enabler (Patrons, investors, executives, sponsors)',
  'The Vibe (Community, friend, general supporter)',
];

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
  const initialFormState = {
    fullName: '',
    email: '',
    phone: '',
    community: '',
    affiliation: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const [isLoading, setIsLoading] = useState(false);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const inviteCopy = [
    'You’re invited to the culmination of a journey, a lifetime in the making. A synthesis of the sound, the poetry, the words, and the work that threads them all through the centre.',
    '“Nothing Too Serious” is an acknowledgement of effort aggregated and a venture into new frontiers. A return to the passion that painted the poetry. The soul that sired the sound. An ode to a time when we did things for the sake of it — when everything we did was a byproduct of who we were and not anything we were supposed to be.',
    'Relax, as we remove the veil between released and unreleased work. Perfection and symmetry will wait until we have had our fill of the night.',
  ];

  const flowOfEvents = [
    { time: '7:00 – 7:45 PM', detail: 'Arrivals' },
    { time: '8:00 – 8:20 PM', detail: 'First Performance' },
    { time: '8:30 – 9:00 PM', detail: 'Short Film Aired (“Before You Wake”)' },
    { time: '9:10 – 9:30 PM', detail: 'Fireside Chat (Q&A / Conversation)' },
    { time: '9:35 – 10:00 PM', detail: 'Final Performance' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!formData.community) {
      setMessage('Please select your creative archetype before you RSVP.');
      return;
    }

    if (!hasConfirmed) {
      setMessage('Please confirm your vibe before you RSVP.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(resolveApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const contentType = res.headers.get('content-type') || '';
      let data: ApiResponse | null = null;
      let text: string | null = null;

      if (contentType.includes('application/json')) {
        data = await res.json().catch(() => null);
      } else {
        text = await res.text().catch(() => null);
      }

      if (!res.ok || !data?.success) {
        const msg = data?.error
          ? `${String(data.error)}${data?.details ? ` — ${String(data.details)}` : ''}`
          : text || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      setMessage((data?.message as string) ?? 'RSVP submitted! Check your inbox.');
      setFormData(initialFormState);
      setHasConfirmed(false);
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setMessage(`Failed: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4 text-gray-200">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-14">
        <section className="text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.5em] text-amber-400">
            The Aesthetic.
          </p>
          <SparklesText text="Nothing Too Serious" className="text-5xl md:text-7xl font-bold text-gray-100" />
          <div className="space-y-4 text-base leading-relaxed text-gray-300">
            {inviteCopy.map((line, index) => (
              <p key={`${index}-${line.slice(0, 8)}`} className="opacity-90">
                {line}
              </p>
            ))}
           
          </div>
          <p className="text-lg font-semibold text-amber-200">
            <Typewriter
              text={["So come open, and come comfortable. After all… It’s Nothing Too Serious."]}
              speed={50}
              cursor="|"
              loop={false}
              deleteSpeed={50}
              delay={1000}
              className="text-lg font-semibold text-amber-200"
            />
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/5 bg-white/5 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <h3 className="text-lg font-semibold text-amber-200">Key Info</h3>
            <dl className="mt-6 space-y-5 text-sm text-gray-300">
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Date
                </dt>
                <dd className="text-base text-gray-50">
                  Friday, November 21st, 2025
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Time
                </dt>
                <dd className="text-base text-gray-50">7:00 PM – 10:00 PM</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Venue
                </dt>
                <dd className="text-base text-gray-50">Aqua Sports Club</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Dress Code
                </dt>
                <dd className="text-base text-gray-50">
                  Aesthetic Casual (Comfortable, Simple)
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  What to Expect
                </dt>
                <dd className="text-base text-gray-50">
                  <ul className="list-disc list-inside space-y-2">
                    <li>
                      An exclusive first peek at my first cinematic collaboration — a film
                      inspired by poetry.
                    </li>
                    <li>An intimate night of music, poetry and vibes</li>
                    <li>Real conversations with real people about art and its making</li>
                  </ul>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl border border-white/5 bg-white/5 bg-gradient-to-br from-white/5 via-transparent to-transparent p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <h3 className="text-lg font-semibold text-amber-200">Flow of Event</h3>
            <ul className="mt-6 space-y-5">
              {flowOfEvents.map((event) => (
                <li key={event.time}>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    {event.time}
                  </p>
                  <p className="text-base text-gray-50">{event.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Card
          id="rsvp-card"
          className="border border-white/10 bg-black/40 shadow-2xl shadow-black/30"
        >
          <CardHeader className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.5em] text-amber-400">
              Confirm Your Vibe
            </p>
            <CardTitle className="text-3xl text-gray-50">RSVP</CardTitle>
            <p className="text-sm text-gray-400">
              Please complete the form below to secure your spot in the space.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {(['fullName', 'email', 'phone'] as const).map(
                (field) => (
                  <div key={field}>
                    <Label htmlFor={field} className="text-gray-300">
                      {field === 'fullName'
                        ? 'Full Name'
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </Label>
                    <Input
                      id={field}
                      name={field}
                      type={
                        field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'
                      }
                      required
                      value={formData[field]}
                      onChange={handleChange}
                      className="bg-white/5 text-gray-100 placeholder:text-gray-500"
                    />
                  </div>
                )
              )}

              <div>
                <Label htmlFor="community" className="text-gray-300">
                  Community
                </Label>
                <Select
                  value={formData.community}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, community: value }))
                  }
                >
                  <SelectTrigger
                    id="community"
                    aria-required="true"
                    className="mt-2 h-12 border-white/10 bg-white/5 text-gray-100"
                  >
                    <SelectValue placeholder="Select Your Creative Archetype" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] text-gray-100">
                    {COMMUNITY_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="affiliation" className="text-gray-300">
                  Affiliation
                </Label>
                <Input
                  id="affiliation"
                  name="affiliation"
                  type="text"
                  required
                  value={formData.affiliation}
                  onChange={handleChange}
                  placeholder="e.g., Collective, Studio, Brand"
                  className="bg-white/5 text-gray-100 placeholder:text-gray-500"
                />
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <Checkbox
                  id="good-time"
                  checked={hasConfirmed}
                  onCheckedChange={(checked) => setHasConfirmed(Boolean(checked))}
                  aria-required="true"
                />
                <Label htmlFor="good-time" className="text-sm leading-relaxed text-gray-200">
                  I accept that by honoring this invitation, I confirm my willingness to
                  have a good time on a beautiful Friday night in Freetown.
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !hasConfirmed}
              >
                {isLoading ? 'Submitting…' : 'Submit RSVP'}
              </Button>

              {message && (
                <p
                  className={`text-center text-sm ${
                    message.startsWith('Failed') ? 'text-red-500' : 'text-green-400'
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
