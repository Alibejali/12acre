import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Mail,
  Film,
  Clapperboard,
  Users,
  Loader2,
} from "lucide-react";
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
import { SundanceFooter, SundanceHeader } from "@/components/sundance-guide-shell";

const sundanceTitle = "Sundance Boulder 2027 Lodging | Sanitas View Basecamp | 12Acre";
const sundanceDescription =
  "Base festival week in Boulder at Sanitas View — 11 contiguous townhomes on Broadway for teams and entourages, Jan 21–31, 2027. Independent lodging + companion guide.";

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
  { value: "Jan 21–31", label: "2027 Festival Week" },
  { value: "Broadway", label: "Newlands, Boulder" },
  { value: "11", label: "Luxury Homes at Sanitas View" },
  { value: "3–4", label: "Bedrooms per Residence" },
];

const amenities = [
  "Newly built",
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
      "Keep a creative pod together with room to prepare, meet, eat, and decompress between festival commitments.",
  },
  {
    icon: Users,
    title: "Talent, Family & Entourage",
    description:
      "Give talent and the people supporting them adjacent private residences, kitchens, and space for different schedules.",
  },
  {
    icon: Film,
    title: "Full-Campus Base",
    description:
      "Use all 11 contiguous homes as one cared-for Boulder base for a larger team across the full festival window.",
  },
];

const bookingTiers = [
  {
    tier: "Individual",
    count: "1",
    unit: "Residence",
    description:
      "A private residence for talent, family, executives, or a small creative team, with three to four bedrooms and a full kitchen.",
  },
  {
    tier: "Sub-Block",
    count: "3-5",
    unit: "Residences",
    description:
      "Adjacent homes for a studio, agency, or production team that needs separate bedrooms with a shared operating base.",
    featured: true,
  },
  {
    tier: "Full Compound",
    count: "11",
    unit: "Residences",
    description:
      "All 11 contiguous residences for one team across the full January 21–31 festival window.",
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

function SundanceDocumentHead() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = sundanceTitle;

    const tags = [
      { selector: 'meta[name="description"]', attribute: "name", key: "description", content: sundanceDescription },
      { selector: 'meta[property="og:title"]', attribute: "property", key: "og:title", content: sundanceTitle },
      { selector: 'meta[property="og:description"]', attribute: "property", key: "og:description", content: sundanceDescription },
      { selector: 'meta[property="og:url"]', attribute: "property", key: "og:url", content: "https://12acre.com/sundance" },
      { selector: 'meta[name="twitter:title"]', attribute: "name", key: "twitter:title", content: sundanceTitle },
      { selector: 'meta[name="twitter:description"]', attribute: "name", key: "twitter:description", content: sundanceDescription },
    ];

    const changes = tags.map(({ selector, attribute, key, content }) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      const created = !element;
      const previousContent = element?.content;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;

      return { element, created, previousContent };
    });

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalCreated = !canonical;
    const previousCanonical = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = "https://12acre.com/sundance";

    return () => {
      document.title = previousTitle;
      changes.forEach(({ element, created, previousContent }) => {
        if (created) {
          element.remove();
        } else {
          element.content = previousContent ?? "";
        }
      });
      if (canonicalCreated) {
        canonical.remove();
      } else {
        canonical.href = previousCanonical ?? "";
      }
    };
  }, []);

  return null;
}

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
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-clip selection:bg-primary/20">
      <SundanceDocumentHead />
      <SundanceHeader />
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
                First Boulder Sundance · January 21–31, 2027 · Keep your people together
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Base festival week
                <br />
                <span className="text-white/90">in Boulder.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                The first Boulder Sundance runs January 21–31, 2027. Sanitas View is a contiguous
                Broadway / Newlands campus of 11 townhomes where teams and entourages can stay,
                prepare, eat, and reset in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#sundance-contact"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 bg-white/90 text-primary transition-all duration-200 hover:bg-white hover:shadow-lg"
                >
                  Inquire
                </a>
                <a
                  href="/sundance/guide/plan"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 border border-white/50 text-white transition-all duration-200 bg-transparent hover:bg-white hover:text-primary hover:border-white"
                >
                  Plan your itinerary
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

        <section className="py-16 md:py-24 border-b border-border">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Festival week
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sundance Film Festival week runs January 21–31, 2027. The opening week carries
                  the densest arrival, premiere, press, and team movement. Use the official
                  Sundance program and your ticket details for current screenings.
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  For scale, Boulder officials have cited approximately 2,900 hotel rooms, while
                  recent festival years have drawn about 85,000 in-person attendees over the full
                  11-day run.
                </p>
                <a href="https://www.sundance.org/" target="_blank" rel="noreferrer" className="mt-4 inline-flex font-semibold text-primary underline underline-offset-4">
                  Official program and tickets
                </a>
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Keep the team together
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Adjacent residences give creative teams room to stay, meet, prepare, and recharge
                  in one place throughout the festival window.
                </p>
                <a href="/sundance/guide" className="mt-4 inline-flex font-semibold text-primary underline underline-offset-4">
                  Open the independent Boulder companion
                </a>
              </div>
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
              className="mx-auto max-w-5xl"
            >
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                The lodging problem
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">
                A contiguous base changes the week.
              </h2>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                Festival days pull people in different directions. Eleven adjacent residences let
                a team divide into smaller rhythms without scattering its operating base across
                town. Kitchens, living rooms, rooftops, and on-site hospitality create room for
                arrivals, meals, preparation, recovery, and private conversations.
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {["Stay together across adjacent homes", "Give talent, family, and crews separate rhythms", "Coordinate concierge, black car, and catering from one base"].map((item) => (
                  <div key={item} className="rounded-2xl bg-muted/40 p-5">
                    <CheckCircle2 className="mb-3 h-5 w-5 text-primary" />
                    <p className="font-medium leading-6">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
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
                <p className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                  Your Base · Sanitas View
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Eleven homes, one Broadway address.
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Eleven contiguous, fully furnished townhomes form a private campus on Broadway in
                  Boulder’s Newlands neighborhood. Each residence offers approximately 3,000 square
                  feet, with rooftop decks, gas fireplaces, chef's kitchens, EV charging, and
                  mountain views. Concierge coordination, black car service, and private catering
                  can support the week as hospitality care rather than a sales spectacle.
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
                How teams use it
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                A flexible Boulder base for the people making, supporting, and experiencing the
                week together.
              </p>
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
                One residence, a sub-block, or all 11
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

        <section className="border-t border-border bg-muted/30 py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl bg-card p-7 shadow-sm ring-1 ring-border md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-primary">Companion tools</p>
                <h2 className="mt-2 font-display text-2xl font-bold">Map venues, pace the day, ask the guide.</h2>
                <p className="mt-2 text-muted-foreground">The independent Boulder companion stays available in the header throughout your visit.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href="/sundance/guide/map" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Map</a>
                <a href="/sundance/guide/plan" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Itinerary</a>
                <a href="/sundance/guide/ask" className="rounded-full border border-border px-4 py-2 text-sm font-semibold">Ask</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 border-t border-border">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-10">
                Frequently asked questions
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                {[
                  {
                    question: "When is festival week?",
                    answer: "The 2027 Sundance Film Festival week runs January 21–31, 2027.",
                  },
                  {
                    question: "How many homes are available?",
                    answer: "Sanitas View includes 11 contiguous townhome residences.",
                  },
                  {
                    question: "Where is it?",
                    answer:
                      "The compound is located at 3303–3339 Broadway in Boulder’s Newlands neighborhood.",
                  },
                  {
                    question: "Can we lease one home or the whole campus?",
                    answer:
                      "Yes. Residences may be leased individually, in adjacent sub-blocks, or as the full 11-home campus.",
                  },
                  {
                    question: "How do we inquire?",
                    answer:
                      "Use the inquiry form below or email sundance@12acre.com with your group size and preferred number of residences.",
                  },
                ].map((item) => (
                  <div key={item.question}>
                    <h3 className="font-display text-xl font-bold mb-3">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
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
                  Tell us how your <br /> team moves.
                </h3>
                <p className="text-white/80 text-lg mb-12 max-w-md">
                  Share your dates, group size, and preferred number of residences. We’ll follow up
                  about a practical Sanitas View base for January 21–31.
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
      <SundanceFooter />
    </div>
  );
}
