import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import profileImage from "@/assets/profile.png";

export function About() {
  const highlights = [
    "Sr Manager, Global Program Controls at Google",
    "Strategic Sourcing Leader at Meta/Facebook",
    "Director of Sourcing at ViaWest",
    "Managed $21.7B+ in cumulative spend",
    "Led teams across global infrastructure & construction"
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">About The Founder</h2>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ali Johnson-Levy
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              I am an experienced Senior Strategic Leader with a proven track record of building and leading 
              global, scalable high-performing teams. I thrive in ambiguity and act as a catalyst for change, 
              driving operational rigor to enable reliability with keen business acumen.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              With deep understanding of controls and governance, I cultivate process and talent to deliver 
              impactful results. My career spans from start-ups to tenured Fortune 100 environments like 
              Google and Meta, managing multi-billion dollar programs.
            </p>

            <div className="grid gap-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span className="text-foreground/80 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl bg-muted relative z-10">
              <img 
                src={profileImage} 
                alt="Ali Johnson-Levy" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary/30 rounded-2xl z-0" />
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
