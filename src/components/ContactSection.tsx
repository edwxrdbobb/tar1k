'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Instagram, X, Youtube, Facebook, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ShaderBackground from "@/components/ShaderBackground";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "All fields required",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Prefill Gmail (web compose)
    const gmailBody = `${formData.message}\n\n─\n${formData.name}\n${formData.email}`;
    const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=edwardbobkamara@gmail.com&su=${encodeURIComponent(
      "New message from " + formData.name
    )}&body=${encodeURIComponent(gmailBody)}`;

    // Prefill WhatsApp
    const waText = `Hello TAR1K! 👋\n\n${formData.message}\n\n─\nName: ${formData.name}\nEmail: ${formData.email}`;
    const waUrl = `https://wa.me/23275053663?text=${encodeURIComponent(waText)}`;

    // Open both (allowed because it's direct user click)
    window.open(gmailUrl, "_blank");
    window.open(waUrl, "_blank");

    toast({
      title: "Opening Gmail & WhatsApp ✅",
      description: "Your message is pre-filled — just hit Send in each tab!",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsLoading(false);
  };

  const handleSubmitResend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "All fields required",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.success) throw new Error(data?.error || 'Failed');

      toast({
        title: "Message sent",
        description: "Thanks! I’ll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/onlytar1k/", label: "Instagram" },
    { icon: X, href: "https://x.com/onlytar1k", label: "X" },
    { icon: Facebook, href: "https://www.facebook.com/onlytar1k/", label: "Facebook" },
    { icon: Youtube, href: "https://www.youtube.com/channel/UCj1K0RgxbFB0OJVAdZcHTtw", label: "YouTube" },
    // { icon: Mail, href: "mailto:edwardbobkamara@gmail.com", label: "Email" },
  ];

  return (
    <section id="contact" className="py-20 bg-secondary/30">
      <ShaderBackground />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">Get in Touch</h2>
          <p className="text-muted-foreground text-center mb-12">
            For bookings, collabs, or just to say hello — messages go straight to my Gmail & WhatsApp
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmitResend} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <Textarea
                  placeholder="Your Message (bookings, collabs, love notes...)"
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                >
                  {isLoading ? "Preparing..." : "Send 🚀"}
                </Button>
              </form>
            </div>

            {/* Direct Connect */}
            <div>
              <h3 className="text-2xl font-semibold mb-6">Connect Instantly</h3>
              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
