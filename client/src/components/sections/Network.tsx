import { motion } from "framer-motion";
import { 
  Store, 
  Utensils, 
  Leaf, 
  Radio, 
  Building, 
  Server, 
  HardDrive,
  UserCheck,
  Crown,
  GraduationCap,
  Zap,
  ClipboardCheck,
  Target,
  Award
} from "lucide-react";

const industries = [
  { icon: Store, name: "Retail" },
  { icon: Utensils, name: "Restaurant" },
  { icon: Leaf, name: "Agriculture" },
  { icon: Radio, name: "Wireless Telecom" },
  { icon: Building, name: "Commercial Construction" },
  { icon: Server, name: "Hyperscale Construction" },
  { icon: HardDrive, name: "Co-location Management" },
];

const fractionalRoles = [
  "Fractional CFOs",
  "Fractional CTOs",
  "Full-Stack Developers",
  "Sales Operations Executives",
  "Procurement Specialists",
  "Financial Experts & Accountants",
  "Legal Teams",
  "Business Development Executives",
];

const consultantTypes = [
  { icon: Crown, title: "CEOs & C-Suite Executives", description: "Strategic leadership for high-stakes initiatives" },
  { icon: GraduationCap, title: "Tenured Professors", description: "Academic rigor and research expertise" },
  { icon: Zap, title: "Electrical Engineers", description: "Technical specialists for infrastructure projects" },
  { icon: ClipboardCheck, title: "Owner's Representatives", description: "Your advocate throughout the project lifecycle" },
  { icon: Target, title: "Program Managers", description: "Execution excellence at scale" },
  { icon: Award, title: "Six Sigma Black Belts", description: "Process optimization and quality assurance" },
];

export function Network() {
  return (
    <section id="network" className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border border-white/20 rounded-full" />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-bold text-secondary tracking-widest uppercase mb-3">Our Network</h2>
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
            The Right Resource for <span className="text-secondary">Every Request</span>
          </h3>
          <p className="text-white/70 text-lg">
            With consultants across multiple industries and disciplines, you can engage at exactly the level you need. 
            Our network of industry titans operates under strict client confidentiality, tasked only for their expertise.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="mb-16">
          <h4 className="font-display font-bold text-xl mb-6 text-center">Industries We Serve</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-5 py-3 rounded-full border border-white/20 hover:bg-white/20 transition-colors"
              >
                <industry.icon className="w-5 h-5 text-secondary" />
                <span className="font-medium">{industry.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Consultant Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {consultantTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <type.icon className="w-6 h-6 text-secondary" />
              </div>
              <h5 className="font-display font-bold text-lg mb-2">{type.title}</h5>
              <p className="text-white/60 text-sm">{type.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Fractional Roles */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="flex items-center gap-3 mb-6">
            <UserCheck className="w-6 h-6 text-secondary" />
            <h4 className="font-display font-bold text-xl">Fractional & Specialized Talent</h4>
          </div>
          <p className="text-white/70 mb-6">
            Access world-class talent without full-time overhead. Our fractional executives and specialists 
            integrate seamlessly with your team, delivering executive-level expertise precisely when you need it.
          </p>
          <div className="flex flex-wrap gap-3">
            {fractionalRoles.map((role, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-secondary/20 text-secondary px-4 py-2 rounded-full text-sm font-medium"
              >
                {role}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
