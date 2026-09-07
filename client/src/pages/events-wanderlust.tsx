import { motion } from "framer-motion";
import {
  Map,
  Mail,
  Camera,
  CloudSun,
  Compass,
  MessageCircleHeart,
  Lock,
  Plane,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { EventWaitlist } from "@/components/events/EventWaitlist";
import eventsHero from "@/assets/events-hero.jpg";

const bullets = [
  {
    icon: Map,
    title: "Multi-leg journeys",
    description:
      "Plan connected itineraries with friends — from city weekends to cross-continent arcs, mapped as living dossiers.",
  },
  {
    icon: Mail,
    title: "Trip invites",
    description:
      "Invite your circle into a shared Travellers Club dossier with clear roles, RSVPs, and trip rhythm.",
  },
  {
    icon: Camera,
    title: "Place photos",
    description:
      "Collect the shots that matter — street corners, tables, trails — so the story of the place stays with the group.",
  },
  {
    icon: CloudSun,
    title: "7-day weather",
    description:
      "Glance ahead together with a week of local forecasts baked into the dossier, not buried in another tab.",
  },
  {
    icon: Compass,
    title: "Local know-how",
    description:
      "Drive side, customs, etiquette, and the small things that help you live like a local from day one.",
  },
  {
    icon: MessageCircleHeart,
    title: "Favorites & comments",
    description:
      "Star the places you love and leave notes for each other — a warm layer of community on every map pin.",
  },
];

const pilotStops = [
  {
    city: "London, Baby",
    tag: "United Kingdom",
  },
  {
    city: "Iceland",
    tag: "Nordic North",
  },
];

const inviteMailto =
  "mailto:ali@12acre.com?subject=" +
  encodeURIComponent("Wanderlust invite") +
  "&body=" +
  encodeURIComponent(
    "Hi Ali,\n\nI'd love an invite to the Wanderlust Travellers Club pilot (London → Iceland dossiers).\n\nThanks!",
  );

export default function EventsWanderlust() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <main>
        <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src={eventsHero}
              alt="Wanderlust mountain horizon"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-br from-sky-950/40 via-transparent to-amber-950/30" />
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
                12Acre Events · Travellers Club · Invite only
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Wanderlust
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                Travellers Club dossiers for friends — live like a local on multi-leg journeys,
                with maps, stories, invites, weather, and the know-how that turns a trip into a
                shared adventure. Part of the warm 12Acre Events family.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#get-notified"
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 bg-white/90 text-primary transition-all duration-200 hover:bg-white hover:shadow-lg"
                >
                  Request invite
                </a>
                <a
                  href={inviteMailto}
                  className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 border border-white/40 text-white transition-all duration-200 hover:bg-white/10"
                >
                  Email ali@12acre.com
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-14">
              <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">
                The Story
              </h2>
              <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Travel as a circle, not a checklist
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Wanderlust is where friends gather before the bags are packed. Build a living
                dossier together — destinations, photos, invites, and local wisdom — so when you
                land, you already feel a little at home. It belongs beside Sundance nights,
                Supper Club tables, Moreovers kitchens, and Crafternoon sessions: community first,
                always.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {bullets.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-lg border border-border bg-card p-6 md:p-8 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-5">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="pilot" className="py-16 md:py-24 bg-muted/30 scroll-mt-24">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Plane className="w-4 h-4" />
                Pilot · invite required
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
                London, Baby → Iceland
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our first multi-leg Travellers Club dossier. Teaser only on this page — full
                neighborhood tips and place cards open after you redeem an invite.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto mb-12">
              {pilotStops.map((stop, index) => (
                <motion.div
                  key={stop.city}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative rounded-lg border border-border bg-card p-8 shadow-sm overflow-hidden"
                >
                  <p className="text-sm font-bold text-primary uppercase tracking-widest mb-2">
                    {stop.tag}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold mb-6">
                    {stop.city}
                  </h3>
                  <div className="space-y-3 select-none pointer-events-none blur-[2.5px] opacity-50">
                    <div className="h-3 rounded bg-muted w-11/12" />
                    <div className="h-3 rounded bg-muted w-9/12" />
                    <div className="h-3 rounded bg-muted w-10/12" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-background/55 backdrop-blur-[1px]">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-4 py-2 text-sm font-medium shadow-sm">
                      <Lock className="w-4 h-4 text-primary" />
                      Invite required
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="max-w-2xl mx-auto text-center rounded-2xl border border-border bg-background p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold mb-3">
                Request an invite
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The interactive dossier isn’t a public dump — join the waitlist or email us and
                we’ll send a pilot invite when there’s a seat at the table.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button asChild className="rounded-full h-12 px-8">
                  <a href="#get-notified">Join the waitlist</a>
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 px-8">
                  <a href={inviteMailto}>Request invite</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <EventWaitlist
          eventName="Wanderlust"
          source="wanderlust"
          blurb="Want a seat at the Travellers Club pilot? Join the waitlist for an invite."
          privacyNote="We'll only email you about Wanderlust / Travellers Club invites. No spam, ever."
        />
      </main>
      <Footer />
    </div>
  );
}
