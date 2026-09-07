import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { eventCards } from "@/lib/events";
import eventsHero from "@/assets/events-hero.jpg";

export default function Events() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <main>
        <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <img
              src={eventsHero}
              alt="Mountain peaks above the clouds at sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          <div className="container relative z-10 px-4 md:px-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Community & Connection
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Events by 12Acre
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-light">
                We believe the best ideas emerge when remarkable people come together.
                Our events are designed to foster genuine connection, creative exchange,
                and community.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {eventCards.map((event, index) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                >
                  <Link href={`/events/${event.slug}`} className="group block h-full">
                    <div className="h-full rounded-lg border border-border bg-card p-8 md:p-10 transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <event.icon className="w-6 h-6" />
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                          {event.name}
                        </h2>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {event.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                        Learn more
                        <span className="ml-1 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
