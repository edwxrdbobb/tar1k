import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import MusicSection from "@/components/MusicSection";
import AboutSection from "@/components/AboutSection";
import WritingsSection from "@/components/WritingsSection";
import CommunitySection from "@/components/CommunitySection";
import EventsSection from "@/components/EventsSection";
import GallerySection from "@/components/GallerySection";
import NewsletterSection from "@/components/NewsletterSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <Hero />
      <VideoSection />
      <MusicSection />
      <AboutSection />
      <WritingsSection />
      <CommunitySection />
      <EventsSection />
      <GallerySection />
      <NewsletterSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
