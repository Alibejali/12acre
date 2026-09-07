import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Building2,
  Film,
  Clapperboard,
  Sparkles,
  Users,
  Briefcase,
  Newspaper,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import eventsHero from "@/assets/events-hero.jpg";

const gallery = [
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/690d11ccdd85ff991823af59_08.jpg",
    alt: "Sanitas View exterior",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/690d11cc4bd2740ccbfd59aa_01.jpg",
    alt: "Sanitas View living space",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/690d11cc37de667e60d4b764_04.jpg",
    alt: "Sanitas View interior",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/690d11ccfd96d86087fcda0c_05.jpg",
    alt: "Sanitas View kitchen",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/690d11cc091fe25a822a57e2_09.jpg",
    alt: "Sanitas View bedroom",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/690d10e22568a170c075456d_03.jpg",
    alt: "Sanitas View detail",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/665e4c2e3336e8f3099e9372_3339%20Broadway%20Boulder%20(2).jpg",
    alt: "Sanitas View townhome",
  },
  {
    url: "https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/67ab872d6b693b170d52fee3_3303%20Broadway%20Boulder%20(10).jpg",
    alt: "Sanitas View bathroom",
  },
];

const stats = [
  { value: "90,000", label: "Expected Attendees" },
  { value: "2,900", label: "Hotel Rooms in Boulder" },
  { value: "11", label: "Luxury Homes at Sanitas View" },
  { value: "1", label: "Address Like This in Boulder" },
];

const comparison = {
  hotel: [
    "400 sq ft per room, shared hallways and elevators",
    "No private meeting or event space",
    "Scattered team across multiple floors",
    "Generic hospitality, lobby networking",
    "No kitchen, no private dining",
    "Zero brand activation capability",
  ],
  sanitas: [
    "3,000 sq ft per home — 7x a hotel room",
    "Living rooms, rooftop decks, and yards become event venues",
    "Your entire team under one roof or across adjacent homes",
    "24/7 on-site concierge, Black Car, private catering",
    "Restaurant-grade chef's kitchen in every unit",
    "Turn any home into a branded activation or screening lounge",
  ],
};

const amenities = [
  "Brand-new construction",
  "Never occupied",
  "Fully furnished",
  "3,000 sq ft per home",
  "Rooftop decks",
  "Gas fireplaces",
  "Chef's kitchens",
  "EV charging",
  "Mountain views",
];

const useCases = [
  {
    icon: Clapperboard,
    title: "Studio Basecamp",
    description:
      "House your team, host screenings, run meetings — all from a private compound one mile from Pearl Street.",
  },
  {
    icon: Sparkles,
    title: "Brand Activation",
    description:
      "Transform a home into a living showroom. Rooftop events, branded interiors, experiential hospitality for press and VIPs.",
  },
  {
    icon: Users,
    title: "Talent & Agency Housing",
    description:
      "Private residences for talent and executives who need space, security, and discretion — not a hotel lobby.",
  },
  {
    icon: Briefcase,
    title: "Corporate Buyout",
    description:
      "Lease the full compound — 11 homes, 33,000+ sq ft — as your private campus for the entire festival window.",
  },
  {
    icon: Newspaper,
    title: "Press & Production",
    description:
      "Dedicated units for press operations, interview suites, or production offices with high-speed connectivity and catering.",
  },
];

const bookingTiers = [
  {
    tier: "Individual",
    count: "1",
    unit: "Residence",
    description:
      "Perfect for talent, executives, or a small creative team. 3-4 bedrooms, full amenities, 24/7 concierge included.",
  },
  {
    tier: "Sub-Block",
    count: "3-5",
    unit: "Residences",
    description:
      "Adjacent homes for a studio, agency, or brand team. Shared outdoor space between units. Preferred block rates available.",
    featured: true,
  },
  {
    tier: "Full Compound",
    count: "11",
    unit: "Residences",
    description:
      "The ultimate festival footprint: 33,000+ sq ft, all contiguous, fully serviced. Your private campus at Sundance Boulder.",
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function PropertyGallery() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));

  return (
    <div className="relative">
      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-muted">
        <img
          src={gallery[index].url}
          alt={gallery[index].alt}
          className="w-full h-full object-cover transition-opacity duration-500"
        />
      </div>
      <button
        type="button"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
      >
        <ChevronRight className="w-5 h-5 text-foreground" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {gallery.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === index ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3">
        {gallery.slice(0, 4).map((shot, i) => (
          <button
            key={shot.url}
            type="button"
            onClick={() => setIndex(i)}
            className={`aspect-[4/3] rounded overflow-hidden border-2 transition-all ${
              i === index ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img src={shot.url} alt={shot.alt} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EventsSundance() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const mutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "sundance" }),
      });
      if (!response.ok) throw new Error("Failed to submit form");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent",
        description: "Thank you — we'll follow up about Sundance residences shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <main>
        <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src={eventsHero}
              alt="Sundance Boulder mountain backdrop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="container relative z-10 px-4 md:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Sundance Film Festival 2027 · Boulder, Colorado · January 21-31
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Boulder has one address
                <br />
                <span className="text-white/90">for Sundance.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                For the first time, Sundance comes to Boulder — and the city has just 2,900 hotel
                rooms for 90,000 expected attendees. Sanitas View is the only luxury compound
                available: 11 brand-new townhomes that can be leased individually, in blocks, or as
                a full private campus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#sundance-contact"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 bg-white/90 text-primary transition-all duration-200 hover:bg-white hover:shadow-lg"
                >
                  Inquire & Reserve
                </a>
                <a
                  href="#why-not-hotel"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 border border-white/50 text-white transition-all duration-200 bg-transparent hover:bg-white hover:text-primary hover:border-white"
                >
                  Why Not a Hotel?
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 md:py-16 border-b border-border">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="why-not-hotel" className="py-16 md:py-24 scroll-mt-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Why Not a Hotel?
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-lg border border-border bg-muted/30 p-8"
              >
                <h3 className="font-display text-xl font-bold mb-6 text-muted-foreground">
                  A Hotel Block
                </h3>
                <ul className="space-y-4">
                  {comparison.hotel.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <span className="text-muted-foreground text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-lg border-2 border-primary bg-card p-8 shadow-lg"
              >
                <h3 className="font-display text-xl font-bold mb-6 text-primary">
                  Sanitas View Compound
                </h3>
                <ul className="space-y-4">
                  {comparison.sanitas.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <PropertyGallery />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                  The Property
                </h2>
                <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Don't compete for Boulder.
                  <br />
                  Own a piece of it.
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Brand-new construction. Never occupied. Fully furnished. 3,000 sq ft per home.
                  Rooftop decks, gas fireplaces, chef's kitchens, EV charging, mountain views.
                </p>
                <div className="flex items-center gap-2 text-muted-foreground mb-8">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">3303-3339 Broadway, Newlands, Boulder CO</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {amenities.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground border-t border-border pt-6">
                  Homes also available for purchase from mid $2,400,000s — rental income applied to
                  price.
                  <br />
                  Purchase inquiries:{" "}
                  <a
                    href="mailto:lynn.ryan@milehimodern.com"
                    className="text-primary hover:underline"
                  >
                    lynn.ryan@milehimodern.com
                  </a>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                Built for How the Industry Actually Works
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {useCases.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-lg border border-border bg-card p-6 md:p-8 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-5">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                Flexible Booking
              </h2>
              <h3 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                One Home to the Entire Compound
              </h3>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {bookingTiers.map((tier, i) => (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`rounded-lg p-8 text-center ${
                    tier.featured
                      ? "border-2 border-primary bg-card shadow-lg scale-[1.02]"
                      : "border border-border bg-card"
                  }`}
                >
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                    {tier.tier}
                  </p>
                  <div className="mb-4">
                    <span className="font-display text-5xl font-bold">{tier.count}</span>
                    <p className="text-muted-foreground text-sm mt-1">{tier.unit}</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tier.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-0">
          <div className="grid md:grid-cols-3">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/665e4c2ecbbe4d54dc0175b4_3339%20Broadway%20Boulder%20(15).jpg"
                alt="Sanitas View exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/665e4c2e5c92e03d35a68f79_3339%20Broadway%20Boulder%20(7).jpg"
                alt="Sanitas View living area"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="https://cdn.prod.website-files.com/6467ed03888a40577fd512c6/693b2babd39ed51b7e464215_677c4d0095aa469f00ae4824_Sanitas%20View%203.jpeg"
                alt="Sanitas View mountain view"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <section
          id="sundance-contact"
          className="py-24 bg-primary text-primary-foreground relative overflow-hidden scroll-mt-24"
        >
          <div className="absolute inset-0 bg-primary opacity-90 z-0" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-3">
                  Inquire & Reserve
                </h2>
                <h3 className="font-display text-4xl md:text-5xl font-bold mb-8 text-white">
                  Don't compete <br /> for Boulder.
                </h3>
                <p className="text-white/80 text-lg mb-12 max-w-md">
                  Availability is limited. Secure your luxury townhome residence for the 2027
                  Sundance Film Festival — January 21-31.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Rental Inquiries</p>
                      <a
                        href="mailto:sundance@12acre.com"
                        className="text-lg font-medium hover:text-secondary transition-colors"
                      >
                        sundance@12acre.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Purchase Inquiries</p>
                      <a
                        href="mailto:lynn.ryan@milehimodern.com"
                        className="text-lg font-medium hover:text-secondary transition-colors"
                      >
                        lynn.ryan@milehimodern.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Location</p>
                      <p className="text-lg font-medium">3303-3339 Broadway, Newlands, Boulder CO</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                      <Film className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60">Festival Dates</p>
                      <p className="text-lg font-medium">January 21-31, 2027</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white text-foreground rounded-2xl p-8 shadow-2xl">
                <h3 className="font-display text-2xl font-bold mb-2">Send an Inquiry</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Tell us about your group, preferred booking tier, and any special requirements.
                </p>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="bg-muted/30 border-border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email address"
                              {...field}
                              className="bg-muted/30 border-border"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your team size, preferred booking tier (Individual / Sub-Block / Full Compound), and any special requirements..."
                              className="min-h-[120px] bg-muted/30 border-border"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full h-12 text-base font-semibold"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 bg-foreground text-center">
          <p className="text-xs text-background/60 uppercase tracking-[0.2em]">
            Sanitas View · 3303-3339 Broadway, Newlands, Boulder CO · January 21-31, 2027
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
