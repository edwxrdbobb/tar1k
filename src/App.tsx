import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
    import Navigation from "@/components/Navigation";
    import Footer from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import Video from "./pages/Video";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
    import Writing from "./pages/Writing";
    import RSVPPage from "./pages/RSVP";
    import Music from "./pages/Music";
    import InviteNov21 from "./pages/InviteNov21";
    import PressKit from "./pages/PressKit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/videos" element={<Video />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/rsvp" element={<RSVPPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/music" element={<Music />} />
          <Route path="/invite/nov21" element={<InviteNov21 />} />
          <Route path="/press-kit" element={<PressKit />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
