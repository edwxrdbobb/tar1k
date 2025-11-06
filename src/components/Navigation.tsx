'use client';

import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    setOpenDropdown(null);
    window.location.href = href;
  };

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const navItems = [
    { label: "Home", href: "/" },
    {
      label: "Content",
      subItems: [
        { label: "Music", href: "/music" },
        { label: "Videos", href: "/videos" },
        { label: "Writing", href: "/writing" },
        { label: "Gallery", href: "/gallery" },
      ],
    },
    {
      label: "Community",
      subItems: [
        { label: "Events", href: "/events" },
        { label: "Blog", href: "/blog" },
      ],
    },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "/")}
          className="text-2xl font-bold tracking-tighter hover:text-primary transition-colors"
        >
          TAR1K
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8" ref={dropdownRef}>
          {navItems.map((item) =>
            item.subItems ? (
              <div key={item.label} className="relative">
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      openDropdown === item.label && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className={cn(
                    "absolute left-1/2 -translate-x-1/2 mt-3 w-48 bg-background/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl overflow-hidden transition-all duration-200",
                    openDropdown === item.label
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  )}
                  style={{ pointerEvents: openDropdown === item.label ? "auto" : "none" }}
                >
                  <div className="py-2">
                    {item.subItems.map((sub) => (
                      <a
                        key={sub.href}
                        href={sub.href}
                        onClick={(e) => handleNavClick(e, sub.href)}
                        className="block w-full text-left px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-all"
                      >
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
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
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-in slide-in-from-top-2 duration-300">
          <div className="container mx-auto px-4 py-6 space-y-6">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex items-center justify-between text-sm font-medium text-muted-foreground py-2"
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 transition-transform",
                          openDropdown === item.label && "rotate-180"
                        )}
                      />
                    </button>
                    {openDropdown === item.label && (
                      <div className="ml-4 mt-2 space-y-1 border-l-2 border-border/30 pl-4">
                        {item.subItems.map((sub) => (
                          <a
                            key={sub.href}
                            href={sub.href}
                            onClick={(e) => handleNavClick(e, sub.href)}
                            className="block w-full text-left text-sm text-muted-foreground hover:text-primary py-1.5 transition-colors"
                          >
                            {sub.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;