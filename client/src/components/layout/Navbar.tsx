import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Experience", href: "#experience" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
            <img 
              src={isScrolled ? "/logo-dark.png" : "/logo-light.png"}
              alt="12Acre Logo" 
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105" 
            />
            <span className={cn(
              "font-display font-bold text-xl tracking-tight",
              isScrolled ? "text-foreground" : "text-foreground md:text-white"
            )}>
              12Acre
            </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isScrolled ? "text-muted-foreground" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <Button 
            variant={isScrolled ? "default" : "secondary"}
            className="rounded-full px-6"
            asChild
          >
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 md:hidden flex flex-col gap-4 shadow-lg animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-foreground font-medium py-2 px-4 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <Button className="w-full rounded-full" asChild>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Get in Touch
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
