import { motion } from "framer-motion";
import { CheckCircle2, Users, Network, Lock } from "lucide-react";
import profileImage from "@/assets/profile.png";

export function About() {
  const highlights = [
    "Fortune 5 Leadership Experience",
    "AI Agent Architecture — Built & Deployed",
    "CEO, AI-Native Agriculture Marketplace",
    "Founder-Operator: We Run What We Build",
    "Deep Bench of Industry Titans & Experts",
    "Strict Client Confidentiality Standards",
    "Small Business to Enterprise Scaling"
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
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Who We Are</h2>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Strategic Partners for <br/>
              <span className="text-primary">Operational Excellence</span>
            </h3>
            
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              12Acre is a premier management and technology firm dedicated to helping companies build, scale, and operate with precision and integrity. Founded by Ali Johnson-Levy, we bring decades of Fortune 5 leadership experience combined with hands-on AI platform development to businesses of every size.
            </p>

            <p className="text-muted-foreground mb-4 leading-relaxed">
              Ali is also CEO of an AI-native agriculture marketplace, leveraging producer data to deliver business intelligence that drives yield optimization and margin growth across the agricultural supply chain. She co-architects multi-agent AI orchestration systems and has built an operational intelligence platform that powers her own businesses—the same infrastructure 12Acre deploys for clients.
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              What makes us unique: we build what we sell, and we sell what we run. Our AI agent infrastructure manages our own operations daily—from research and legal analysis to financial monitoring and client communications.
              Our consultants are industry titans and experts—well-connected across multiple industries with
              the bench depth to participate meaningfully in your most critical projects. They don't just
              work for us; under strict client confidentiality, they are tasked specifically for their expertise.
            </p>

            <div className="grid gap-4 bg-muted/30 p-6 rounded-xl border border-border">
              <h4 className="font-display font-bold text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-secondary" />
                Trusted Expertise, Complete Confidentiality
              </h4>
              <p className="text-sm text-muted-foreground">
                Our network of consultants operates under the highest standards of client confidentiality. 
                Each engagement is tailored precisely to your needs—whether you need a CEO-level strategist, 
                a Six Sigma Black Belt, or a specialized electrical engineer, we have the right resource for your request.
              </p>
            </div>

            <div className="grid gap-3 mt-8">
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
                alt="Ali Johnson-Levy, Founder of 12Acre" 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                <p className="text-white font-display font-bold text-xl">Ali Johnson-Levy</p>
                <p className="text-white/80 text-sm">Founder & Principal</p>
              </div>
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
