import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroImage from "@/assets/hero-mountain.jpg";

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Misty Nordic Mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 md:px-6 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Management Consulting • AI-Native Platforms • Operational Intelligence
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Grounded Expertise, Infinite Scalability.<br />
            <span className="text-white/90">Welcome to 12Acre.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mb-10 leading-relaxed font-light">
            12Acre is a non-traditional consultancy built for the AI era. We partner with businesses—from startups to Fortune 100—to architect AI-native operations, build intelligent platforms, and scale with precision. We don't just advise on AI; we build, deploy, and run it ourselves every day.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button size="lg" className="rounded-full text-base h-12 px-8 bg-white text-primary hover:bg-white/90 border-0">
              Explore Our Services
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base h-12 px-8 border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent">
              Partner With Us
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
