import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    {
      label: "Content",
      subItems: [
        { label: "Music", id: "music" },
        { label: "Videos", id: "videos" },
        { label: "Writings", id: "writings" },
        { label: "Gallery", id: "gallery" },
      ],
    },
    {
      label: "Community",
      subItems: [
        { label: "Events", id: "events" },
        { label: "Blog", id: "blog" },
      ],
    },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection("home")}
          className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors"
        >
          TAR1K
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.subItems ? (
              <div key={item.label} className="relative group">
                <button className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {item.label}
                </button>
                <div className="absolute left-0 mt-2 w-40 bg-background border border-border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity">
                  {item.subItems.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => scrollToSection(sub.id)}
                      className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-lg border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
