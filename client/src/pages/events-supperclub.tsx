import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EventWaitlist } from "@/components/events/EventWaitlist";

export default function EventsSupperClub() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/20">
      <Navbar />
      <main>
        <section className="relative min-h-[85vh] w-full overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-amber-950 to-slate-800" />
            <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
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
                An Exclusive, Invite-Only Experience
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                Supper Club
              </h1>
              <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light mb-10">
                An exclusive, invite-only dining experience bringing together a carefully
                curated group for meaningful conversation over a shared meal. Seats are
                limited and extended by personal invitation only.
              </p>
              <a
                href="#get-notified"
                className="inline-flex items-center justify-center rounded-full text-base font-medium h-12 px-8 bg-white/90 text-primary transition-all duration-200 hover:bg-white hover:shadow-lg"
              >
                Get Notified
              </a>
            </motion.div>
          </div>
        </section>

        <EventWaitlist
          eventName="Supper Club"
          source="supperclub"
          blurb="Want to be notified about the next Supper Club? Join our list."
          privacyNote="We'll only email you about upcoming Supper Club events. No spam, ever."
        />
      </main>
      <Footer />
    </div>
  );
}
