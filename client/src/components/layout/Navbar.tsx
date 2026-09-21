import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPlacesOpen, setIsPlacesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const places = [
    { name: "Map", href: "/sundance/guide/map" },
    { name: "Eat", href: "/sundance/guide/eat" },
    { name: "Shop", href: "/sundance/guide/shop" },
    { name: "Lodging", href: "/sundance/guide/lodging" },
    { name: "Transit", href: "/sundance/guide/transit" },
    { name: "Family", href: "/sundance/guide/family" },
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
        <div className="flex items-center gap-3">
          <Link href="/" className="group" aria-label="12Acre home">
            <img 
              src={isScrolled ? "/logo-dark.png" : "/logo-light.png"}
              alt="12Acre Logo" 
              className="h-10 w-10 object-contain transition-transform group-hover:scale-105" 
            />
          </Link>
          <Link
            href="/sundance"
            className={cn(
              "text-xs font-medium tracking-wide transition-colors hover:text-primary",
              isScrolled ? "text-muted-foreground" : "text-white/70 hover:text-white",
            )}
          >
            Sundance
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/sundance/guide/plan" className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white/90 hover:text-white")}>Your days</Link>
          <div className="relative">
            <button type="button" onClick={() => setIsPlacesOpen((open) => !open)} aria-expanded={isPlacesOpen} className={cn("inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white/90 hover:text-white")}>Places <ChevronDown className="h-4 w-4" /></button>
            {isPlacesOpen && <div className="absolute right-0 top-full mt-3 w-48 rounded-2xl border border-border bg-background p-2 shadow-xl">{places.map((place) => <Link key={place.href} href={place.href} onClick={() => setIsPlacesOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground hover:bg-muted">{place.name}</Link>)}</div>}
          </div>
          <Link href="/sundance/colorado-media" className={cn("text-sm font-medium transition-colors hover:text-primary", isScrolled ? "text-muted-foreground" : "text-white/90 hover:text-white")}>Colorado media</Link>
          <Button 
            variant={isScrolled ? "default" : "secondary"}
            className="rounded-full px-6"
            asChild
          >
            <a href="/sundance#sundance-contact">Inquire</a>
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
          <Link href="/sundance/guide/plan" className="text-foreground font-medium py-2 px-4 hover:bg-muted rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Your days</Link>
          <p className="px-4 pt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Places</p>
          {places.map((place) => <Link key={place.href} href={place.href} className="text-foreground font-medium py-2 px-6 hover:bg-muted rounded-md" onClick={() => setIsMobileMenuOpen(false)}>{place.name}</Link>)}
          <Link href="/sundance/colorado-media" className="text-foreground font-medium py-2 px-4 hover:bg-muted rounded-md" onClick={() => setIsMobileMenuOpen(false)}>Colorado media</Link>
          <Button className="w-full rounded-full" asChild>
            <a href="/sundance#sundance-contact" onClick={() => setIsMobileMenuOpen(false)}>
              Inquire
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
