import { motion } from "framer-motion";
import { 
  Building2, 
  Globe, 
  ShieldCheck, 
  TrendingUp, 
  Users, 
  Cpu,
  BarChart4,
  Briefcase
} from "lucide-react";
import architectureImage from "@/assets/architecture-detail.jpg";
import concreteTexture from "@/assets/concrete-texture.jpg";

const services = [
  {
    icon: TrendingUp,
    title: "Operations at Scale",
    description: "Helping companies transition from startup to enterprise. We design scalable operational frameworks that grow with your business ambition."
  },
  {
    icon: Cpu,
    title: "AI & Platform Intelligence",
    description: "Creation and delivery of integrated platform solutions. Leveraging AI and business intelligence to drive data-backed decision making."
  },
  {
    icon: Building2,
    title: "Hyperscale Construction",
    description: "Subject matter expertise in retail, commercial and mission critical construction."
  },
  {
    icon: Globe,
    title: "Program Controls",
    description: "In-depth global cost and schedule analysis. We bring rigorous control methodologies to ensure projects land on time and on budget."
  },
  {
    icon: ShieldCheck,
    title: "Risk & Governance",
    description: "Comprehensive risk mitigation strategies, governance frameworks, and compliance management for high-stakes environments."
  },
  {
    icon: BarChart4,
    title: "Financial Acumen",
    description: "Sound financial strategy and analysis. We align operational execution with fiscal goals to maximize ROI and efficiency."
  },
  {
    icon: Users,
    title: "Strategic Sourcing",
    description: "Global supply chain optimization and Supplier Management."
  },
  {
    icon: Briefcase,
    title: "Strategic Insights",
    description: "Management consulting rooted in Fortune 5 experience. We provide the roadmap for navigating industry shifts and market opportunities."
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={concreteTexture} 
          alt="Concrete Texture" 
          className="w-full h-full object-cover opacity-10 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-background/50 mix-blend-overlay" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 mb-16 items-end">
          <div className="max-w-3xl">
            <h2 className="text-sm font-bold text-primary tracking-widest uppercase mb-3">Our Expertise</h2>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Scaling Capabilities for <br />
              <span className="text-primary">The Modern Enterprise</span>
            </h3>
          </div>
          <p className="text-muted-foreground max-w-xl pb-2">
            We combine deep industry experience with cutting-edge technology to deliver integrated solutions for construction, operations, and strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background/80 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-all hover:-translate-y-1 group"
            >
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-display text-lg font-bold mb-3">{service.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Break */}
        <div className="mt-20 rounded-2xl overflow-hidden h-64 md:h-80 relative">
          <img 
            src={architectureImage} 
            alt="Architectural Detail" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h3 className="font-display text-3xl md:text-5xl font-bold text-white text-center px-4">
              From Strategy to Execution
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
